FROM findepi/graalvm:java17-native

MAINTAINER Kala

RUN mkdir -p /tixwork/xxljob/logs

WORKDIR /tixwork/xxljob

ENV TZ=PRC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 9100

ADD ./target/tixwork-xxl-job-admin.jar ./app.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
