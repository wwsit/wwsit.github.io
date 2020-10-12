---
title: Mysql数据库介绍
date: 2019-10-24 18:22:31
updated: 2019-10-24 18:50:05
tags: 数据库
categories: 数据库


---

#### MySQL数据库的介绍
    MySQL是一个关系型数据库管理系统，在 WEB 应用方面，MySQL是最好的
    RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件，
    它是由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下产品，
    MySQL 是最流行的关系型数据库管理系统中的一个。
    
#### MySQL的特点
* MySQL是开源的，所以你不需要支付额外的费用。
* MySQL支持大型的数据库。可以处理拥有上千万条记录的大型数据库。
* MySQL使用标准的SQL数据语言形式。
* MySQL可以安装在不同的操作系统，并且提供多种编程语言的操作接口。这些编程语言包括C、C++、Python、Java、Ruby等等。


#### 操作命令
    # 查看MySQL服务状态
    sudo service mysql status
    
    # 启动MySQL服务
    sudo service mysql start
    
    # 停止MySQL服务
    sudo service mysql stop
    
    # 重启MySQL服务
    sudo service mysql restart
    
    # 新建MySQL数据库：demon
    create database demon charset=utf8;
    
    # 新建MySQL用户
    create user '账号'@'ip地址' identified by '密码';
    create user root'@'%' identified by 'mysql';
    create user 'wws'@'%' identified by 'wws';
    
    # 授权itcast用户访问meiduo_mall数据库
    grant all on 数据库名称.表名称 to 用户名@用户地址 ;
    grant all on demon.* to 'root'@'%';
    grant all on demon.* to 'wws'@'192.168.36.1';
	
	授权 root 用户在任何IP地址都能访问demon数据库里面所有表
	授权 wws 用户在192.168.36.1 IP地址才能访问demon数据库里面所有表
	.* 能访问demon所有表				
	% 任意IP都能登录
    
    # 授权结束后刷新特权
    flush privileges;
    
#### 数据类型
* 整数：int，bit
* 小数：decimal
* 字符串：varchar,char
* 日期时间: date, time, datetime
* 枚举类型(enum)

数据类型说明:
    
    decimal表示浮点数，如 decimal(5, 2) 表示共存5位数，小数占 2 位.
    char表示固定长度的字符串，如char(3)，如果填充'ab'时会补一个空格为'ab '，3表示字符数
    varchar表示可变长度的字符串，如varchar(3)，填充'ab'时就会存储'ab'，3表示字符数
    对于图片、音频、视频等文件，不存储在数据库中，而是上传到某个服务器上，然后在表中存储这个文件的保存路径.
    字符串 text 表示存储大文本，当字符大于 4000 时推荐使用, 比如技术博客.
    
#### 数据约束
* 主键 primary key: 物理上存储的顺序. MySQL 建议所有表的主键字段都叫 id, 类型为 int unsigned.
* 非空 not null: 此字段不允许填写空值.
* 惟一 unique: 此字段的值不允许重复.
* 默认 default: 当不填写字段对应的值会使用默认值，如果填写时以填写为准.
* 外键 foreign key: 对关系字段进行约束, 当为关系字段填写值时, 会到关联的表中查询此值是否存在, 如果存在则填写成功, 如果不存在则填写失败并抛出异常.