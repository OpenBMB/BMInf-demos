FROM node:lts-alpine
WORKDIR /build
COPY demo-front demo-front
RUN cd demo-front && npm install --registry=https://registry.npm.taobao.org && npm run build

FROM openbmb/bminf:latest
WORKDIR /app
COPY --from=0 /build/demo-front/dist statics
ADD requirements.txt requirements.txt
RUN pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir 
ADD . .
ENTRYPOINT ["python3", "main.py"]
