FROM ubuntu:22.04

ARG PB_VERSION=0.22.17

RUN apt-get update && apt-get install unzip ca-certificates -y

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

EXPOSE 8000

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
