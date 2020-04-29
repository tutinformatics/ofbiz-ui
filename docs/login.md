# `Authentication and Authorization`

### Authentication
1. run ofbiz locally
2. set up proxy or change all the base urls to localhost...
    ```
   In case if you cannot/don't want to run ofbiz in docker, you can set up only nginx proxy.

   I personally had problems with this approach but here is soltuion (windows):

   - remove 'network_mode: "host"' from docker-compose-dev.yml
   - add the following config to proxy/config-dev:

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

   - docker-compose -f docker-compose-dev.yml up -d
   - add to webpack.config.js disableHostCheck: true (it is commented out),

    ```
3. go to login page and log in via
    ```
    username: admin
    passwrod: ofbiz
    ```
4. response has to be 200
    ```
    as a result, jwt token is returned and is saved in localStorage (we cannot store it in aurelia store since store is destroyed after page refresh)
    ```


### Authorization

You only need to add 'Authorization' header to each request

```
constructor(httpClient, store) {
    this.httpClient = httpClient;
    this.httpClient.configure(config => {
        config
          .withBaseUrl('api/')
          .withDefaults({
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.state.jwtToken}`
              }
            }
          )
      }
    );

```

### localStorage
both userLoginId and token are stored there

this data is removed from localStorage when user logs out

### aurelia store
all the data needed is stored in aurelia store:
- userLoginId
- jwtToken

reason: store allows to dynamically update this data
