FROM nginx

## Copy our default deploy config
COPY deploy/nginx/* /etc/nginx/conf.d/

## Remove default deploy website

SHELL ["/bin/bash", "-c", "rm -rf /usr/share/nginx/html/"]
## From ‘builder’ stage copy over the artifacts in dist folder to default deploy public folde
COPY dist/ /usr/share/nginx/html

EXPOSE 6060

CMD ["nginx", "-g", "daemon off;"]
