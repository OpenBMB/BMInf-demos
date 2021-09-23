# 设置基础镜像
FROM nginx:stable
# 工作目录
WORKDIR /app
# 定义作者
MAINTAINER zcf
#
COPY ./nginx.conf /etc/nginx/nginx.conf
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/

EXPOSE 30000

# 运行的命令
CMD ["nginx", "-g", "daemon off;"]
