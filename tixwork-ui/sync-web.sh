# remote setting
remote="tiandtech@139.186.155.122"

# build
yarn build

dateexpr="$(date +%m%dT%H%M)"
echo "sync web(${dateexpr}) to ${remote}"

# sync and deploy
ssh ${remote} "mkdir -p ~/software/nginx/content/libs"
rsync -avz ./dist/*  ${remote}:~/software/nginx/content/libs/${dateexpr}/
ssh ${remote} "cd ~/software/nginx/content && rm -rf current && ln -s ./libs/${dateexpr} current"
