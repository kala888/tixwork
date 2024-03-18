#!/bin/sh
# 通过脚本控制应用程序的start，stop，restart以及获取status
APP_NAME=tixwork-app.jar
JVM_OPTS="-Dname=$APP_NAME -Dfile.encoding=UTF-8 -Xms2G -Xmx4G -XX:MetaspaceSize=512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=4 -XX:ConcGCThreads=2 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=./log/ -XX:InitiatingHeapOccupancyPercent=70 -XX:ErrorFile=./log/error.log -Duser.timezone=Asia/Shanghai "

if [ "$1" = "" ]; then
    echo -e "\033[0;31m 操作参数错误，仅支持 \033[0m  \033[0;34m {start|stop|restart|status} \033[0m"
    exit 1
fi

if [ "$APP_NAME" = "" ]; then
    echo -e "\033[0;31m 未输入应用名 \033[0m"
    exit 1
fi

findPID() {
    PID=$(ps -ef | grep java | grep $APP_NAME | grep -v grep | awk '{print $2}')
    echo "pid is $PID"
}

start() {
    findPID
    if [ x"$PID" != x"" ]; then
        echo "$APP_NAME still is running, pid is $PID"
    else
        nohup java "$JVM_OPTS" -jar $APP_NAME >/dev/null 2>&1 &
        echo "Start $APP_NAME success."
    fi
}

stop() {
    echo "Stop $APP_NAME"
    findPID
    if [ x"$PID" != x"" ]; then
        kill -TERM "$PID"
        echo "$APP_NAME (pid:$PID) is stopping, wait seconds"
        while [ x"$PID" != x"" ]; do
            sleep 1
            findPID
        done
        echo "$APP_NAME stopped."
    else
        echo "$APP_NAME already stopped."
    fi
}

restart() {
    stop
    sleep 2
    start
}

status() {
    findPID
    if [ x"$PID" != x"" ]; then
        echo "The application \"$APP_NAME\" is RUNNING, pid is $PID"
    else
        echo "The application \"$APP_NAME\" is STOPPED."
    fi
}

case $1 in
start)
    start
    ;;
stop)
    stop
    ;;
restart)
    restart
    ;;
status)
    status
    ;;
*) ;;
esac
