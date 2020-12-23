---
title: Jmeter核心知识
date: 2019-10-26 21:06:26
updated: 2019-10-26 21:55:28
tags: 测试
categories: 测试
---

### 一、参数化
####  什么是参数化
    是自动化测试脚本的一种常用技巧，可将脚本中的某些输入使用参数来代替,
    在脚本运行时指定参数的取值范围和规则 
    
####  如何实现参数化
1. CSV Data SetConfig: 一种从外部读取数据功能的组件
2. 函数助手: 函数是完成某个指定功能代码的封装。 
3. 用户参数: 一种参数设置方式，用户可设置参数名称以及参数值; 
4. 用户自定义变量: 用户可根据需求自定义相应的变量，一般做全局变量使用 

#### 参数配置图
![](/1.PNG)

1. Filename:文件路径+文件名+后缀名    如：d:/a.txt;
2. File Encoding:文件编译字符编码，一般设置utf-8;
3. Vaiable Names:读取参数后保存的变量名称;
4. Delimiter:如文件中使用的是逗号分隔，则填写逗号；如使用的是TAB，则填写\t;
5. Allow quoted data: 是否允许引用数据，默认false，选项选为“true”的时候对全角字符的处理出现乱码 ;
6. Recycle on EOF？：是否循环读取参数文件内容；True是循环读取; False时,读取文件末尾就不在继续读取.
7. Stop thread on EOF?：当Recycle on EOF为False时（读取文件到结尾），停止进程，当Recycle on EOF为True时，此项无意义;
8. Sharing mode:共享模式，即参数文件的作用域.

![](2.PNG)
1. Content-Type:指定请求信息格式-类型名称
2. application/json:指定请求信息为-JSON格式
3. charset=utf-8:字符编码


#### 函数配置
![](3.PNG)

    1. 选择一个功能：选择_counter计数函数
    2. 第一个参数：TRUE，每个用户有自己的计数器；FALSE，使用全局计数器 我们选FALSE
    3. 点击生成
    4. 选择复制生成的函数
![](4.PNG)

#### 二、数据库
#### 从数据库中获取数据
1.操作步骤
添加数据库jar包, 添加数据库驱动(mysql-connector-java-5.1.35-bin.jar)
![](5.PNG)

2.配置连接信息
> database url--->jdbc:mysql://IP地址:数据库端口号(mysql:3306)/连接的数据库名字
jdbc driver class--->com.mysql.jdbc.Driver

![](6.PNG)
![](7.PNG)

3.发送sql语句请求
![](8.PNG)
![](9.PNG)

    1. Variable Name：数据库连接池的名字，需要与JDBC Connection Configuration的Variable Name【保持一致】
    2. Query Type:Select Statement、Update Statement
        1) Select Statement:查询语句时使用
        2) Update Statement:(新增、更新、删除)语句时使用
    3. Variable names：count 保存sql语句返回结果的变量名;
 
4.驱动
![](10.PNG)