---
title: 各种安装包的命令
date: 2020-11-7 16:25:16
updated: 
tags: shell脚本、Python、Mysql、Nginx
categories: 分享
---

    echo  -----------------------安装Python-----------------------------------
   
    echo 安装Python
    yum -y groupinstall "Development tools"
    yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
    
    echo 获取python3.7的安装包
    wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tgz
    
    echo 解压
    tar -xvf Python-3.7.3.tgz
    
    echo 配置python3的安装目录并安装
    cd Python-3.7.3/
    ./configure --prefix=/usr/local/bin/python3
    make
    make install
    
    echo 创建软链接
    ln -s /usr/local/bin/python3/bin/python3 /usr/bin/python3
    ln -s /usr/local/bin/python3/bin/pip3 /usr/bin/pip3
    
    
    echo  -----------------------开启centos ssh远程连接,还需参考教程-----------------------------------
    echo  1.service安装
    yum install initscripts -y
    
    echo 2.ifconfig安装
    yum install net-tools.x86_64 -y
    
    echo 3.安装常用工具
    yum install -y openssh-server vim lrzsz wget gcc-c++ pcre pcre-devel zlib zlib-devel ruby openssl openssl-devel patch bash-completion zlib.i686 libstdc++.i686 lsof unzip zip
        
    echo 4.ssh安装
    yum install openssh-server
    
    echo 启动
    service sshd restart 
    echo netstat -natp | grep sshd  查看是否启动22端口 
    yum search passwd
    yum install passwd.x86_64 
   
   
    echo  -----------------------安装Nginx-----------------------------------
    echo 安装gcc gcc-c++
    yum install -y gcc gcc-c++
    
    echo 安装PCRE库
    cd /usr/local/
    wget http://jaist.dl.sourceforge.net/project/pcre/pcre/8.33/pcre-8.33.tar.gz
    tar -zxvf pcre-8.36.tar.gz
    cd pcre-8.36
    ./configure
    make && make install
    
    echo 安装SSL库
    cd /usr/local/
    wget http://www.openssl.org/source/openssl-1.0.1j.tar.gz
    tar -zxvf openssl-1.0.1j.tar.gz
    cd openssl-1.0.1j
    ./config
    make && make install
    
    echo 安装zlib库存
    cd /usr/local/
    wget http://zlib.net/zlib-1.2.11.tar.gz
    tar -zxvf zlib-1.2.11.tar.gz
    ./configure
    make && make install
    
    echo 安装nginx
    cd /usr/local/
    wget http://nginx.org/download/nginx-1.8.0.tar.gz
    tar -zxvf nginx-1.8.0.tar.gz
    cd nginx-1.8.0
    ./configure --user=nobody --group=nobody --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_gzip_static_module --with-http_realip_module --with-http_sub_module --with-http_ssl_module
    make && make install
    
    echo 启动
    /usr/local/nginx/sbin/nginx
    
    echo  -----------------------安装Mysql-----------------------------------
    echo 进入目录
    cd /usr/local/src/
    
    echo 安装mysql
    wget http://repo.mysql.com/mysql57-community-release-el7-8.noarch.rpm
    rpm -ivh mysql57-community-release-el7-8.noarch.rpm
    yum -y install mysql-server
    
    echo 重启mysql
    service mysqld restartecho 安装Python
   