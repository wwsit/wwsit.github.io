---
title: Mysql常用命令(中)
date: 2019-10-24 20:25:16
updated: 2019-10-24 20:56:42
tags: 数据库
categories: 数据库


---


    # 1.可以通过 as 给表起别名 
    select students.id,students.name,students.gender from students;
    select s.id,s.name,s.gender from students as s;
    
    # 2. distinct可以去除重复数据行
    select distinct name, gender from students;
    
    # 3.where条件查询语法格式如下:
    select * from 表名 where 条件;
    eg:
    select * from students where id = 1;
    
    # 4.比较运算符查询
        等于: =
        大于: >
        大于等于: >=
        小于: <
        小于等于: <=
        不等于: != 或 <>
        
    查询编号大于3的学生:
    select * from students where id > 3;
    查询编号不大于4的学生:
    select * from students where id <= 4;
    查询姓名不是“小明”的学生:
    select * from students where name != '小明';

    # 5.逻辑运算符查询
    
    查询编号大于3的女同学:
    select * from students where id > 3 and gender=0;
    查询编号小于4或没被删除的学生:
    select * from students where id < 4 or is_delete=0;
    查询年龄不在10岁到15岁之间的学生:
    select * from students where not (age >= 10 and age <= 15);
    
    # 6.模糊查询
    like是模糊查询关键字
    %表示任意多个任意字符
    _表示一个任意字符
    
    查询姓黄的学生:
    select * from students where name like '黄%';
    查询姓黄并且“名”是一个字的学生:
    select * from students where name like '黄_';
    查询姓黄或叫靖的学生:
    select * from students where name like '黄%' or name like '%靖';
    
    # 7.范围查询
    between .. and .. 表示在一个连续的范围内查询
    in 表示在一个非连续的范围内查询
    
    查询编号为3至8的学生:
    select * from students where id between 3 and 8;
    查询编号不是3至8的男生:
    select * from students where (not id between 3 and 8) and gender='男';
    
    # 8.空判断查询
    判断为空使用: is null
    判断非空使用: is not null
    
    查询没有填写身高的学生:
    select * from students where height is null;
    
    # 9.排序查询语法
    select * from 表名 order by 列1 asc|desc [,列2 asc|desc,...]
    说明：
    asc从小到大排列，即升序
    desc从大到小排序，即降序
    默认按照列值从小到大排序（即asc关键字）
    
    查询未删除男生信息，按学号降序:
    select * from students where gender=1 and is_delete=0 order by id desc;
    显示所有的学生信息，先按照年龄从大-->小排序，当年龄相同时 按照身高从高-->矮排序
    select * from students  order by age desc,height desc;
    
    # 10.分页查询的语法
    select * from 表名 limit start,count
    
    查询前3行男生信息
    select * from students where gender=1 limit 0,3;
    简写
    select * from students where gender=1 limit 3;