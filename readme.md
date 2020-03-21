/**
*这个为docker容器映射宿主机的配置目录
*
*
*/




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