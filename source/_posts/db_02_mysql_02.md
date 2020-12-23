---
title: Mysql常用命令(上)
date: 2019-10-24 19:12:20
updated: 2019-10-24 19:55:16
tags: 数据库
categories: 数据库


---


#### 操作命令(初级)
    # 登录数据库
    mysql -uroot -p密码
    
    # 退出数据库
    quit或者exit或者ctr+d
    
    # 创建数据库
    create database 数据库名 charset=utf8;  # <---  结尾必须写分号;
    
    # 使用数据库
    use 数据库名;
    
    # 删除数据库
    drop database 数据库名;
    
    # 创建表
    create table 表名(
    字段名1  数据类型  约束条件,
    字段名2  数据类型  约束条件,
    字段名3  数据类型  约束条件    # <----最后一个不要加逗号 ,
    );
    
    # 修改表-添加字段
    alter table 表名 add 字段名 类型  约束;
    eg: alter table students add birthday datetime;
    
    # 修改表-修改字段类型
    alter table 表名 modify 字段名 类型 约束;
    # modify: 只能修改字段类型或者约束，不能修改字段名
    eg: alter table students modify birthday date not null;
    
    # 修改表-修改字段名和字段类型
    alter table 表名 change 原字段名 新字段名 类型 约束
    eg: alter table students change birthday birth datetime not null;
    
    # 修改表-删除字段
    alter table 表名 drop 字段名;
    
    # 删除表
    drop table 表名;
     
    # 查询数据
    select * from 表名;
    
    # 插入数据
    insert into 表名 values (值1，值2),(...)...;
    or: insert into 表名(字段名,..) values(..);
    
    # 修改数据
    update 表名 set 字段名1=值1，字段名2=值2  where 条件;
    update students set age = 18, gender = '女' where id = 6;
    
    # 删除数据
    delete from 表名 where 条件;
    
    # 查看创库SQL语句
    show create database 数据库名;
    
    # 查看创表SQL语句
    show create table 表名;