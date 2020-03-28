/**
*这个为docker准备
*/

# redis操作
启动  docker run -itd --name redis-test -p 6379:6379 redis
进入  docker exec -it redis-test /bin/bash
redis-cli
查看  keys *
清空  flushall


# nginx反向代理配置步骤

docker run -d -p 80:80 --name nginx  nginx

mkdir -p  docker/nginx/conf.d


docker cp nginx:/etc/nginx/conf.d/default.conf /Users/wangtao/docker/nginx/conf.d/default.conf

docker cp nginx:/etc/nginx/nginx.conf /Users/wangtao/docker/nginx/nginx.conf

vi /Users/wangtao/docker/nginx/nginx.conf

server {
    listen 80;
    server_name 192.168.16.67; 
    location / {
          proxy_set_header Host $host;  
          proxy_pass http://192.168.16.67:8001; 
    }
    location /api/ {
          proxy_set_header Host $host;  
          proxy_pass http://192.168.16.67:8000; 
    }
}



docker run -d -p 80:80 --name nginx -v /Users/wangtao/docker/nginx/nginx.conf:/etc/nginx/nginx.conf -v /Users/wangtao/docker/nginx/conf.d:/etc/nginx/conf.d -v /Users/wangtao/docker/nginx/logs:/var/log/nginx nginx


# crontab 定时任务
crontab -e   添加定时任务
crontab -l   查询当前机器的定时任务

# pm2
pm2 start
pm2 stop
pm2 delete app
pm2 list
pm2 log app
pm2 info app