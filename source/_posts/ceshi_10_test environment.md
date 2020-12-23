---
title:  测试环境搭建(CentOS+Apache+PHP+Mysql)
date: 2020-06-02 16:15:02
updated: 2020-06-06 19:13:25
tags: 测试
categories: 测试
---


#### 安装Apache
    yum -y install httpd*
    #启动Apache
    systemctl start httpd.service
    在浏览器上输入 ip:端口 查看Apache是否启动成功
    
    ps:
    # 查看安装的httpd包
    rpm -qa | grep httpd 
    # 配置文件 /etc/httpd/conf/httpd.conf  （修改端口）
    # 默认网站家目录 /var/www/html  
    # apache 相关操作 https://www.cnblogs.com/VseYoung/p/10018317.html

#### 安装PHP
     yum -y install php
     # php各项服务安装：
     yum -y install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel php-mysql
     # 在/var/www/html/ 下的index.php输入 <?php phpinfo(); ?>  
     echo '<?php phpinfo(); ?>' >/var/www/html/index.php
     # 然后访问  ip:端口/index.php
     # 出现这个界面，说明PHP配置成功
![](1.png)


#### 安装Mysql
    # 进入目录
    cd /usr/local/src/
    # 安装mysql
    wget http://repo.mysql.com/mysql57-community-release-el7-8.noarch.rpm
    rpm -ivh mysql57-community-release-el7-8.noarch.rpm
    yum -y install mysql-server
    # 重启mysql
    service mysqld restart
     
    #详细步骤可以参考下面文档
    https://www.cnblogs.com/Jomini/p/10749657.html
    https://blog.csdn.net/danykk/article/details/80137223(修改密码的长度)
 
 #### PHP项目
     # 我可以在网上搜索'PHP源码' 去寻找PHP项目
     # 我们以这个网站为例  https://www.a5xiazai.com/php/，在里面下载你想要的项目
     # 我们下载 ‘良精商城网店购物系统’ https://www.a5xiazai.com/php/142829.html#link
     # 然后根据安装包里面的内容进行操作  
           1.将安装包里面的内容 解压到一个新的文件夹 LJCMS，然后存在  /var/www/html 目录下
           （或者直接将全部内容 存放在 /var/www/html 目录下）
           2.然后修改 apche配置文件  /etc/httpd/conf/httpd.conf
           在 DocumentRoot "/var/www/html"后添加 文件夹的名称
           DocumentRoot "/var/www/html/LJCMS"
           3.重启Apache
           service mysqld restart
           4.在浏览器上输入 ip:端口 就可以进行项目安装
![](2.png)
![](3.png)

#### 注意
    在安装过程如出现 不可写
    我们可以直接对单个文件进行授权 或者直接对整个文件进行授权
    对整个文件夹下的所有文件进行授权
    来到 /var/www/html 目录下输入 chmod 777 LJCMS -R 即可以解决
![](4.png)
![](5.png)
    
    然后继续根据要求进行配置、下一步.....
    最终这样
![](6.png)