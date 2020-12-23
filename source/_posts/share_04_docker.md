---
title: 在docker中安装CentOs,并设置远程连接
date: 2020-5-22 18:39:06
updated: 
tags: 分享
categories: 分享
---

#### 安装docker

    # 使用yum命令在线安装
     yum install docker
    # 安装后查看Docker版本
     docker -v
    # 启动与停止Docker
        启动docker：systemctl start docker
        停止docker：systemctl stop docker
        重启docker：systemctl restart docker
        查看docker状态：systemctl status docker
        
#### 安装、启动CentOs
    
    # 拉取centos镜像(尽量使用centos 7的版本，否则在安装nginx、mysql会出现一些版本)
    docker pull centos:centos7
    
    # 查看centos版本 
    cat /etc/redhat-release 
    
    # 查看镜像
    docker image  ls 
    
    # 运行镜像，并进行端口映射
    docker run -d -p 7022:22 --name centos --privileged=true docker.io/centos   /usr/sbin/init
    参数解释： 
    -it 交互式运行容器   -d 后台运行   --name 名称   给容器器名称  
    --privileged=true  给容器拥有真正的root权限   docker.io/centos 要使用的镜像名称
    # 容器相关命令
    查看所有容器   docker container ls --all    
    停止容器运行   docker container stop  容器ID
    删除容器       docker container rm  容器ID
    启动容器       docker container start  容器ID
    # 进入容器
     docker exec -it 容器名称（容器ID） /bin/bash
     eg：docker exec -it centos /bin/bash
    # 退出容器  exit  
    
#### 安装工具
        
        1.service安装
        yum install initscripts -y
        2.ifconfig安装
        yum install net-tools.x86_64 -y
        3.安装常用工具
        yum install -y openssh-server vim lrzsz wget gcc-c++ pcre pcre-devel zlib zlib-devel ruby openssl openssl-devel patch bash-completion zlib.i686 libstdc++.i686 lsof unzip zip
        4.ssh安装
         yum install openssh-server
         service sshd restart  启动
         netstat -natp | grep sshd  查看是否启动22端口 
   
   
#### 开启centos ssh远程连接  
    
    1.修改sshd_config 文件
    vi /etc/ssh/sshd_config
    #打开注释 PermitRootLogin yes, 允许密码登录,保存退出
    2.设置密码
    可能会 bash: passwd: command not found
    所以需要先输入
    yum search passwd
    passwd.x86_64 : An utility for setting or changing passwords using PAM  
    yum install passwd.x86_64 
    
    3.最后再输入passwd
    输入两次密码 既可以成功
   
#### ssh连接
    
    在终端输入  ssh root@ip地址  -p 7022
    然后需要输入密码，即成功
    
    
#### 给运行中的容器添加端口
    
    利用docker commit新构镜像
    1.停止docker容器
    docker stop  容器ID
    eg:docker stop 6899e28d8210 
    
    2.commit该docker容器
    docker commit 容器ID   新的镜像名称
    eg:docker commit 6899e28d8210 centos
    通过docker image ls  可以查看新的镜像
    
    3.用前一步新生成的镜像重新起一个容器
    docker run --name 起个名字 -p 6080:80 镜像
    将容器中的80端口映射到宿主机的6080端口上
    给新的镜像添加3个端口映射    
    eg:docker run --name centos -p 6080:80 -p 6022:22 -p 6060:3306 centos
    
    查看容器端口映射情况
    docker container port 容器ID
    
#### 导出、导入容器
    # 导出容器
    docker export 容器ID > 文件名.tar
    eg: docker export 9aa3e4907407 > ./centos.tar
    
    # 导入容器
    cat 文件名 | docker import  新的镜像名：TAG的名称 
    eg:cat centos.tar | sudo docker import - centos1:latest
    centos1:latest   centos1镜像的名称，  latest：TAG的名称 
    
