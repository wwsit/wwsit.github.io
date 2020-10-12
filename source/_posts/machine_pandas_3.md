---
title: Pandas--Mysql操作
date: 2019-10-25 20:55:46
updated: 2019-10-25 21:28:41
tags: 机器学习
categories: 机器学习
---

#### 将CSV文件导入到Mysql中

    import pandas as pd
    from sqlalchemy import create_engine
    
    # 创建连接
    engine = create_engine('mysql+pymysql://wws:wws@192.168.36.151:3306/db_wws')
                                      # 数据库账号:密码@数据库IP地址:端口号/数据库名
    # 读取文件                                        
    df = pd.read_csv('./new_data.csv', encoding='utf-8')
    
    # 可用进行打印                     
    # print(df)
    con = engine.connect()
    df.to_sql(name='tb_ebay', con=con, if_exists='append', index=False)
    
    参数说明：
    name='tb_ebay'    表名   
    if_exists='append'
            源码如下：
            if_exists : {'fail', 'replace', 'append'}, default 'fail'
                    How to behave if the table already exists.(如果存在这张表 我们怎么处理)
            * fail: Raise a ValueError.（报错）
            * replace: Drop the table before inserting new values.(在插入新值之前，删掉那张表)
            * append: Insert new values to the existing table.(如果存在这张表,直接插入新值)
    

#### 从Mysql中读文件
    # 写入文件
    engine = create_engine('mysql+pymysql://wws:wws@192.168.36.151:3306/wws')
    sql ='select * from tb_ebay ;'
    con = engine.connect()
    content = pd.read_sql(sql,con)
    print(content)