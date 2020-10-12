---
title: Python程序操作MySQL数据库
date: 2020-2-5 12:01:03
updated: 2020-2-5 13:06:25
tags: 数据库
categories: 数据库


---


##### 一、安装pymysql第三方包:
> pip install pymysql

##### 二、pymysql的使用

    1.导入 pymysql 包
     import pymysql
     
    2.创建连接对象
    调用pymysql模块中的connect()函数来创建连接对象
    conn=connect(参数列表)
    
     * 参数host：连接的mysql主机，如果本机是'localhost'
     * 参数port：连接的mysql主机的端口，默认是3306
     * 参数user：连接的用户名
     * 参数password：连接的密码
     * 参数database：数据库的名称
     * 参数charset：通信采用的编码方式，推荐使用utf8
     连接对象操作说明:
        关闭连接 conn.close()
        提交数据 conn.commit()
        撤销数据 conn.rollback()
     
     3.获取游标对象
     获取游标对象的目标就是要执行sql语句，完成对数据库的增、删、改、查操作
     
      # 调用连接对象的cursor()方法获取游标对象   
      cur =conn.cursor()
      
     游标操作说明:
        使用游标执行SQL语句: execute(operation [parameters ]) 执行SQL语句，返回受影响的行数，主要用于执行insert、update、delete、select等语句
        获取查询结果集中的一条数据:cur.fetchone()返回一个元组, 如 (1,'张三')
        获取查询结果集中的所有数据: cur.fetchall()返回一个元组,如((1,'张三'),(2,'李四'))
        关闭游标: cur.close(),表示和数据库操作完成
        
##### 三、pymysql完成数据的查询操作

    import pymysql
    # 创建连接对象
    conn = pymysql.connect(host='localhost', port=3306, user='root', password='mysql',database='python', charset='utf8')
    # 获取游标对象
    cursor = conn.cursor()
    # 查询 SQL 语句
    sql = "select * from students;"
    # 执行 SQL 语句 返回值就是 SQL 语句在执行过程中影响的行数
    row_count = cursor.execute(sql)
    print("SQL 语句执行影响的行数%d" % row_count)
    # 取出结果集中一行数据,　例如:(1, '张三')
    # print(cursor.fetchone())
    # 取出结果集中的所有数据, 例如:((1, '张三'), (2, '李四'), (3, '王五'))
    for line in cursor.fetchall():
        print(line)
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()

##### 四、pymysql完成对数据的增删改
    import pymysql
    # 创建连接对象
    conn = pymysql.connect(host='localhost', port=3306, user='root', password='mysql',database='python', charset='utf8')
    # 获取游标对象
    cursor = conn.cursor()
    try:
        # 添加 SQL 语句
        sql = "insert into students(name) values('刘璐'), ('王美丽');"
        # 删除 SQ L语句
        # sql = "delete from students where id = 5;"
        # 修改 SQL 语句
        sql = "update students set name = '王铁蛋' where id = 6;"
        # 执行 SQL 语句
        row_count = cursor.execute(sql)
        print("SQL 语句执行影响的行数%d" % row_count)
        # 提交数据到数据库
        conn.commit()
    except Exception as e:
        # 回滚数据， 即撤销刚刚的SQL语句操作
        conn.rollback()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
  
##### 五、什么是SQL注入?
    用户提交带有恶意的数据与SQL语句进行字符串方式的拼接，从而影响了SQL语句的语义，最终产生数据泄露的现象。
    如何防止SQL注入?
    SQL语句参数化：
            SQL语言中的参数使用%s来占位，此处不是python中的字符串格式化操作
            将SQL语句中%s占位所需要的参数存在一个列表中，把参数列表传递给execute方法中第二个参数