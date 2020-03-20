FROM nginx

## Copy our default deploy config
COPY config/* /etc/nginx/conf.d/

## Remove default deploy website
SHELL ["/bin/bash", "-c", "rm -rf /usr/share/nginx/html/"]

CMD ["nginx", "-g", "daemon off;"]
