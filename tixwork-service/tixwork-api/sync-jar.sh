#!/bin/bash -e
set -e
# remote setting
remote="tiandtech@139.186.155.122"
project="tixwork"

# build
cd .. && gradle clean && cd tixwork-api && gradle -Pprod clean bootJar

dateexpr="$(date +%m%dT%H%M)"
echo "sync jar(${dateexpr}) to ${remote}"

# sync and deploy
ssh ${remote} "mkdir -p ~/${project}/app/libs"
rsync -azv --progress ./build/libs/tixwork-api-0.0.2.jar ${remote}:~/${project}/app/libs/${dateexpr}.jar
ssh ${remote} "cd ~/${project}/app && rm -rf app.jar && ln -s ./libs/${dateexpr}.jar app.jar"
# restart
ssh ${remote} "docker restart tixwork-service"

