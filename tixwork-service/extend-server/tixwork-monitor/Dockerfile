FROM findepi/graalvm:java17-native

RUN mkdir -p /tixwork/monitor/logs

WORKDIR /tixwork/monitor

EXPOSE 8090

ADD ./target/tixwork-monitor.jar ./app.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
