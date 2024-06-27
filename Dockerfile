FROM harbor.miop.com.cn/common/nginx:1.21

MAINTAINER zhusj <zsj@zatko.cnm>

ADD dist /usr/share/nginx/html
ADD dist /usr/share/nginx/html/static


EXPOSE 80
