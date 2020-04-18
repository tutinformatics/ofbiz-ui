# Ofbiz frontend

In order to start project run:

```bash
npm install -g aurelia-cli
npm install
au run
```

Repo link:
https://gitlab.cs.ttu.ee/aroosi/ofbiz-frontend.git

#### Quick guide:
Made separate navbar files, to ease managing.
Did the second tutorial from Aurelia homepage, to test front and REST workflow.

Frontend user flow guide:
User wants to create a workspace
Click on workspaces
Choose from 3 default workspaces
User workspace_group_id of 1 or 2
Hit save
Your workspace is now saved in the database


# Ofbiz backend

Our project is in “ui_demo_endpoint” branch at:
https://github.com/tutinformatics/ofbiz/tree/ui_demo_endpoint

Default delegator Derby for testing purposes was replaced with MySQL. We use Docker to emulate Mysql.

In order to avoid CORS we have used Nginx reverse proxy, because Aurelia doesn’t support this *out of the box*:

We have used following nginx.conf:
```bash
events {
    worker_connections  1024;
}


http {
    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://localhost:4000;
        }

        location /ofbizDemo/ {
            proxy_pass https://localhost:8443;
        }
    }
}
```


#### Run Docker and type in these commands:
```bash
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest
docker exec -ti  <container-id> bash
mysql --user=root --password=admin --host=localhost --port=3306 mysql
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 25
Server version: 8.0.19 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its allAffiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
allAffiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql> create database ofbiz;
Query OK, 1 row affected (0.04 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| ofbiz              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

```

In entityengine.xml changed derby to mysql:
```xml
<delegator name="default" entity-model-reader="main" entity-group-reader="main" entity-eca-reader="main" distributed-cache-clear-enabled="false">
        <group-map group-name="org.apache.ofbiz" datasource-name="localmysql"/>
        <group-map group-name="org.apache.ofbiz.olap" datasource-name="localmysql"/>
        <group-map group-name="org.apache.ofbiz.tenant" datasource-name="localmysql"/>
    </delegator>
    <!-- May be used when you create a service that manages many data for massive imports, this for performance reason or to escape functional cases -->
    <delegator name="default-no-eca" entity-model-reader="main" entity-group-reader="main" entity-eca-reader="main" entity-eca-enabled="false" distributed-cache-clear-enabled="false">
        <group-map group-name="org.apache.ofbiz" datasource-name="localmysql"/>
        <group-map group-name="org.apache.ofbiz.olap" datasource-name="localmysql"/>
        <group-map group-name="org.apache.ofbiz.tenant" datasource-name="localmysql"/>
    </delegator>

    <!-- Be sure that your default delegator (or the one you use) uses the same datasource for test. You must run "gradlew loadAll" before running "gradlew testIntegration" -->
    <delegator name="test" entity-model-reader="main" entity-group-reader="main" entity-eca-reader="main">
        <group-map group-name="org.apache.ofbiz" datasource-name="localmysql"/>
        <group-map group-name="org.apache.ofbiz.olap" datasource-name="localmysql"/>
        <group-map group-name="org.apache.ofbiz.tenant" datasource-name="localmysql"/>
    </delegator>
```

Default user and password were changed in "localmysql" datasource:
```xml
<datasource name="localmysql"
            helper-class="org.apache.ofbiz.entity.datasource.GenericHelperDAO"
            field-type-name="mysql"
            check-on-start="true"
            add-missing-on-start="true"
            check-pks-on-start="false"
            use-foreign-keys="true"
            join-style="ansi-no-parenthesis"
            alias-view-columns="false"
            drop-fk-use-foreign-key-keyword="true"
            table-type="InnoDB"
            character-set="utf8"
            collate="utf8_general_ci">
        <read-data reader-name="tenant"/>
        <read-data reader-name="seed"/>
        <read-data reader-name="seed-initial"/>
        <read-data reader-name="demo"/>
        <read-data reader-name="ext"/>
        <read-data reader-name="ext-test"/>
        <read-data reader-name="ext-demo"/>
        <inline-jdbc
                jdbc-driver="com.mysql.jdbc.Driver"
                jdbc-uri="jdbc:mysql://127.0.0.1/ofbiz?autoReconnect=true&amp;characterEncoding=UTF-8"
                jdbc-username="root"
                jdbc-password="admin"
                isolation-level="ReadCommitted"
                pool-minsize="2"
                pool-maxsize="250"
                time-between-eviction-runs-millis="600000"/><!-- Please note that at least one person has experienced a problem with this value with MySQL
                and had to set it to -1 in order to avoid this issue.
                For more look at http://markmail.org/thread/5sivpykv7xkl66px and http://commons.apache.org/dbcp/configuration.html-->
        <!-- <jndi-jdbc jndi-server-name="localjndi" jndi-name="java:/MySqlDataSource" isolation-level="Serializable"/> -->
    </datasource>
```

From Ofbiz Database tab add new Database named "Ofbiz"

![Image of InellijOfbiz](https://cdn.discordapp.com/attachments/672519848517042186/680746421347156167/unknown.png)

Start loadAll from gradle (might take 5 min to 4h 16 min)
:smile:

To avoid mysql driver error, add this to build.gradle:

```groovy
dependencies {
    pluginLibsRuntime "mysql:mysql-connector-java:8.0.13"
}
```

Just in case run as well **gradle clean** and **gradle assemble**

#### Our database model right now
![Image of Databasecat](https://cdn.discordapp.com/attachments/672519848517042186/681785911544905738/workspace_diagram.png)
