FROM ubuntu:14.04.3

MAINTAINER yujilow1220<adgjmbehkncfilo1234@gmail.com>

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update -y
RUN apt-get install -y wget curl git mongodb-10gen supervisor
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
RUN source /root/.nvm/nvm.sh
RUN nvm install v6.2.2
RUN git clone https://github.com/yujilow1220/alarm.git
RUN cd alarm && npm install

RUN touch /etc/supervisor/conf.d/supervisord.conf
RUN echo "[supervisord]" >> /etc/supervisor/conf.d/supervisord.conf
RUN echo "nodaemon=true" >> /etc/supervisor/conf.d/supervisord.conf
RUN echo "[program:mongod]" >> /etc/supervisor/conf.d/supervisord.conf
RUN echo "command=mongod" --dbpath=/db >> /etc/supervisor/conf.d/supervisord.conf
RUN echo "[program:alarm]" >> /etc/supervisor/conf.d/supervisord.conf
RUN echo "command=node /alarm/bin/www" >> /etc/supervisor/conf.d/supervisord.conf

EXPOSE 3000
VOLUME /db /alarm/files
CMD /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
