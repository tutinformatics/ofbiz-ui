# How to get connection to backend via Proxy
(Ubuntu guide)

## Why is it needed?
Aurelia doesn't allow CORS (to get information for other http page basically), so the back and front must
be on the same address and port. Nginx helps to make the virtually on the same address and port so it seems
that they are working in the same address.

## List of commands to get nginx set up for our project
`sudo apt install nginx`

`sudo service nginx restart`
This command must be run every time something changes in nginx configuration.

`cd /etc/nginx/sites-available/`

`sudo vim default`

Inside the file, modify, so it would have the following lines

`listen 80;`

and

         server_name localhost;

         location / {
                 # First attempt to serve request as file, then
                 # as directory, then fall back to displaying a 404.
                 proxy_pass http://localhost:6060;
         }

         location /api/ {
                 proxy_pass https://localhost:8443;
         }

After that the following endpoints should be used:

Front
`http://localhost/marketdata`

Back
`http://localhost/api/marketdata`

So all in all thanks to nginx proxy we don't need to use ports any more and the front and back are found straight from localhost.



