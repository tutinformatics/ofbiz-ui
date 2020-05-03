This approach allows you to run NGINX as a reverse proxy on Windows

1. remove 'network_mode: "host"' from docker-compose-dev.yml (only Linux supports host mode)

2. add the following config to proxy/config-dev:
    ```
    server {
           listen 80;
           server_name localhost;

           location / {
             proxy_pass http://host.docker.internal:6060;
           }

           location /api/ {
             proxy_pass https://host.docker.internal:8443;
           }
       }
    ```
3. add to webpack.config.js  disableHostCheck: true  (devServer config),

4. run in docker
    ```
    docker-compose -f docker-compose-dev.yml up -d
    ```
