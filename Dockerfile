FROM nginx

COPY ./dist/* /usr/share/nginx/html/

ADD nginx.conf /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]
