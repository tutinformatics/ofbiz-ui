# `Authentication and Authorization`

### Authentication
1. run ofbiz locally
2. set up proxy or change all the base urls to localhost...

3. go to login page and log in via
    ```
    username: admin
    passwrod: ofbiz
    ```
4. response has to be 200
    ```
    as a result, jwt token is returned and is saved in localStorage (we replicate it to aurelia store in order to avoid additional need in page refresh)
    ```


### Authorization

You only need to add 'Authorization' header to each request (exampled in affiliate-marketing branch)

**This part is done in httpService, you do not need to care about it anymore. It intercepts all the request and inserts jwt**

```
'Authorization': `Bearer ${this.state.jwtToken}
```

### localStorage
both userLoginId and token are stored there (allows to restore data after page refresh)

this data is removed from localStorage when user logs out

### aurelia store
all the data needed is stored in aurelia store:
- userLoginId
- jwtToken

reason: store allows to work with this data dynamically (without page refresh)
