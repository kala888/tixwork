# remote setting
remote="tiandtech@139.186.155.122"
project="tixwork"
# build
yarn build

dateexpr="$(date +%m%dT%H%M)"
echo "sync web(${dateexpr}) to ${remote}"

# sync and deploy
ssh ${remote} "mkdir -p ~/${project}/nginx/content/libs"
rsync -avz --progress ./dist/*  ${remote}:~/${project}/nginx/content/libs/${dateexpr}/
ssh ${remote} "cd ~/${project}/nginx/content && rm -rf current && ln -s ./libs/${dateexpr} current"
