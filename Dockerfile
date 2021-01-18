FROM nginx

RUN apt-get update && apt-get install -y \
  wget

RUN nginx -v && nginx -V

RUN wget -O init-deb.sh https://www.linode.com/docs/assets/660-init-deb.sh \
  && mv init-deb.sh /etc/init.d/nginx \
  && chmod +x /etc/init.d/nginx

RUN mkdir -p /var/lib/nginx

COPY ./dist/* /usr/share/nginx/html/

ADD nginx.conf /etc/nginx/
RUN mkdir -p /etc/nginx/conf.d/includes
ADD 404to200index.conf /etc/nginx/conf.d/includes
ENV BE_URL="http://localhost:4040"
ENV NGINX_CONFIG="/etc/nginx/nginx.conf"

RUN echo "daemon off;" >> /etc/nginx/nginx_no_ssl.conf

# Tell Docker about the port we'll run on.
EXPOSE 8000 8000

CMD ((sed -i 's|BE_URL|'$BE_URL'|g' $NGINX_CONFIG) \
  && /usr/sbin/nginx -c $NGINX_CONFIG)
