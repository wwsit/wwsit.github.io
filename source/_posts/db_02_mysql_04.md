---
title: Mysql常用命令(下)
date: 2019-10-24 21:20:36
updated: 2019-10-24 22:13:42
tags: 数据库
categories: 数据库


---

    # 聚合函数
    
    常用的聚合函数:
    count(col): 表示求指定列的总行数
    max(col): 表示求指定列的最大值
    min(col): 表示求指定列的最小值
    sum(col): 表示求指定列的和
    avg(col): 表示求指定列的平均值
    
    # 1.求总行数
    返回总行数;
    select count(*) from students;
    
    # 2.求最大值
    查询女生的编号最大值
    select max(id) from students where gender = 2;
    
    # 3.求最小值
    查询未删除的学生最小编号
    select min(id) from students where is_delete = 0;
    
    # 4.求和
    查询男生的总身高
    select sum(height) from students where gender = 1;
    
    # 5.求平均值
    求男生的平均身高, 聚合函数不统计null值，平均身高有误
    select avg(height) from students where gender = 1;
    求男生的平均身高, 包含身高是null的
    select avg(ifnull(height,0)) from students where gender = 1;
    
    聚合函数默认忽略字段为null的记录 要想列值为null的记录也参与计算，必须使用ifnull函数对null值做替换。
    
    # 6.分组查询
    根据gender字段来分组 group by
    select gender from students group by gender
    
    # group by + having的使用 
    having作用和where类似都是过滤数据的，但having是过滤分组数据的，只能用于group by 
    根据gender字段进行分组，统计分组条数大于2的
    select gender,count(*) from students group by gender having count(*)>2;
    
    # 7.内连接 查询共有的数据
    elect 字段 from 表1 inner join 表2 on 表1.字段1 = 表2.字段2
    使用内连接查询学生表与班级表:
    select * from students as s inner join classes as c on s.cls_id = c.id;
![](1.PNG)

    # 8.左连接查询
    以左表为主，根据条件查询右表数据，如果根据条件查询右表数据不存在使用null值填充；
    会显示左边的所有内容，右表会显示符合条件的内容
    select 字段 from 表1 left join 表2 on 表1.字段1 = 表2.字段2
![](2.PNG)

    # 9.右连接
    以右表为主根据条件查询左表数据，如果根据条件查询左表数据不存在使用null值填充；
    会显示右边的所有内容，左表会显示符合条件的内容
    select 字段 from 表1 right join 表2 on 表1.字段1 = 表2.字段2
![](3.PNG)   

    # 10.自连接查询
    左表和右表是同一个表，根据连接查询条件查询两个表中的数据。
    自连接查询必须对表起别名