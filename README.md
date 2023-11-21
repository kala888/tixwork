原来nice-router-taro项目已迁移到tixwork/tixwork-taro

# 项目Tixwork
版本3.0.5

### 项目结构

目前系统包含6个大的模块。

|  模块    |  说明  |
|  ----  |  ----  |
| datav-app       |  大屏用App      |
| datav-web       |  数据大屏应用      |
| models          |  模型定义   |
| tixwork-service |  基于Springboot的后台应用     |
| tixwork-taro    |  基于taro的小程序跨多端移动框架     |
| tixwork-ui      |  基于Antd的中台框架     |



### 如何开始新的项目"demo"

##### 1.准备代码

```shell

echo "1. copy files"
cp -R -H tixwork demo
cd demo
git checkout master
rm -rf .git

echo "2. should create project at github"

echo "3. init project"
git init
git add *.* 
git commit -am "first commit"

echo "4. push code to remote"
git remote add origin git@github.com:kala888/demo.git
git push

echo "5.add code gen base remote: tixwork "
git remote add tixwork git@github.com:kala888/tixwork.git
git fetch tixwork
git merge --allow-unrelated-histories tixwork/dev

```

##### 2.修改模型并生成

2.1. 在tixwork-generator目录中建立软连接
```shell
cd tixwork-generator/code-service/models
ln -s ~/tiandtech/demo/models demo
```

2.2 修改code-service/models/demo/index.xml 模型

2.3 修改项目属性，clientid, logo, 数据库schema TODO


##### 3.本地开发测试

1.启动redis和pgsql
```shell
cd tixwork-service/docker
docker-compose -f docker-compose-dev.yml up -d  
````

2.启动后台服务
```shell
cd tixwork-service/tixwork-api
gradle clean bR 
````

3.启动前台服务
```shell
cd tixwork-ui
yarn && yarn start
````

4.访问

    http://localhost:8000
    tixwork/tixwork998


##### 4.准备远程部署

1. 修改script/init-remote-server.sh
2. 处理nginx和端口 TODO
3. 处理sync-jar TODO
4. 处理sync-web TODO


##### 5.远程部署



##### 如何merge remote code

```shell
echo " merge code"
git fetch tixwork
git merge --allow-unrelated-histories tixwork/dev
 ## git merge tixwork/dev
```
