---
title: redis 命令(下)---列表、集合、有序集合
date:    2019-11-18 22:12:09
updated: 2019-11-18 22:39:57
tags: 数据库
categories: 数据库


---

#### redis的类型
    字符串string
    哈希hash
    列表list
    集合set
    有序集合zset
    
#### 列表list
> 增加

    # 在左侧插⼊数据
    lpush key value1 value2 ...
    从键为'a1'的列表左侧加⼊数据a 、 b 、c
    eg:lpush a1 a b c
    
    # 在右侧插⼊数据
    rpush key value1 value2 ...
    例2：从键为'a1'的列表右侧加⼊数据0 1
    eg:rpush a1 0 1
    
    # 在指定元素的前或后插⼊新元素
    linsert key before或after 现有元素 新元素
    在键为'a1'的列表中元素'b'前加⼊'3'
    eg:linsert a1 before b 3

> 获取
> 返回列表⾥指定范围内的元素
> start、stop为元素的下标索引
> 索引从左侧开始，第⼀个元素为0
> 索引可以是负数，表示从尾部开始计数，如-1表示最后⼀个元素

lrange key start stop
获取键为'a1'的列表所有元素
eg:lrange a1 0 -1

> 删除
> 删除指定元素
> 将列表中前count次出现的值为value的元素移除
> count > 0: 从头往尾移除
> count < 0: 从尾往头移除
> count = 0: 移除所有

    lrem key count value
    #向列表'a2'中加⼊元素'a'、'b'、'a'、'b'、'a'、'b'
    eg:lpush a2 a b a b a b
    
    #从'a2'列表右侧开始删除2个'b'
    eg:lrem a2 -2 b
    
    #查看列表'a2'的所有元素
    eg:lrange a2 0 -1
![](1.png)

#### 集合set
> 增加

    # 添加元素
    sadd key member1 member2 ...
    向键'a3'的集合中添加元素'guangzhou'、'shenzhen'、'beijing'
    eg:sadd a3 guangzhou shenzhen beijing

> 获取

    返回所有的元素
    smembers key
    
    获取键'a3'的集合中所有元素
    smembers a3
    
> 删除

    删除指定元素
    srem key
    删除键'a3'的集合中元素'guangzhou'
    eg: srem a3 guangzhou
![](2.png)

#### 有序集合zset
> 增加

    添加
    zadd key score1 member1 score2 member2 ...
    向键'a4'的集合中添加元素'lisi'、'wangwu'、'zhaoliu'、'zhangsan'，权重分别为4、5、6、3
    eg:zadd a4 4 lisi 5 wangwu 6 zhaoliu 3 zhangsan

> 获取

    zrange key start stop
    获取键'a4'的集合中所有元素
    eg:zrange a4 0 -1
    
    返回score值在min和max之间的成员
    zrangebyscore key min max
    获取键'a4'的集合中权限值在5和6之间的成员
    eg:zrangebyscore a4 5 6
    
    返回成员member的score值
    zscore key member
    获取键'a4'的集合中元素'zhangsan'的权重
    eg:zscore a4 zhangsan

> 删除

    删除指定元素
    zrem key member1 member2 ...
    删除集合'a4'中元素'zhangsan'
    eg:zrem a4 zhangsan

    删除权重在指定范围的元素
    zremrangebyscore key min max
    删除集合'a4'中权限在5、6之间的元素
    eg:zremrangebyscore a4 5 6
![](3.png)