#!/bin/bash

#使用说明，用来提示输入参数
usage() {
	echo "Usage: sh 执行脚本.sh [port|mount|monitor|base|start|stop|stop-all|rm|rmiNoneTag]"
	exit 1
}

#开启所需端口(生产环境不推荐开启)
port(){
    # mysql 端口
	firewall-cmd --add-port=3306/tcp --permanent
	# redis 端口
	firewall-cmd --add-port=6379/tcp --permanent
	# minio api 端口
	firewall-cmd --add-port=9000/tcp --permanent
	# minio 控制台端口
	firewall-cmd --add-port=9001/tcp --permanent
	# 重启防火墙
	service firewalld restart
}

##放置挂载文件
mount(){
	#挂载 nginx 配置文件
	if test ! -f "/docker/nginx/conf/nginx.conf" ;then
		mkdir -p /docker/nginx/conf
		cp nginx/nginx.conf /docker/nginx/conf/nginx.conf
	fi
	#挂载 redis 配置文件
	if test ! -f "/docker/redis/conf/redis.conf" ;then
		mkdir -p /docker/redis/conf
		cp redis/redis.conf /docker/redis/conf/redis.conf
	fi
}

#启动基础模块
base(){
	docker-compose up -d mysql nginx-web redis minio
}

#启动基础模块
monitor(){
	docker-compose up -d tixwork-monitor-admin
}

#启动程序模块
start(){
	docker-compose up -d tixwork-server1 tixwork-server2
}

#停止程序模块
stop(){
	docker-compose stop tixwork-server1 tixwork-server2
}

#关闭所有模块
stop-all(){
	docker-compose stop
}

#删除所有模块
rm(){
	docker-compose rm
}

#删除Tag为空的镜像
rmiNoneTag(){
	docker images|grep none|awk '{print $3}'|xargs docker rmi -f
}

#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
"port")
	port
;;
"mount")
	mount
;;
"base")
	base
;;
"monitor")
	monitor
;;
"start")
	start
;;
"stop")
	stop
;;
"stopall")
	stopall
;;
"rm")
	rm
;;
"rmiNoneTag")
	rmiNoneTag
;;
*)
	usage
;;
esac
