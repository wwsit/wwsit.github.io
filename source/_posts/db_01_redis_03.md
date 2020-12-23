---
title: redis 命令(上)---字符串、键命令、哈希
date: 2019-11-18 21:32:24
updated: 2019-11-18 22:06:10
tags: 数据库
categories: 数据库


---

#### redis的类型
    字符串string
    哈希hash
    列表list
    集合set
    有序集合zset
    
#### 字符串string
    # 设置键值
    set key value
    eg: set name a
    
    # 设置键值及过期时间，以秒为单位
    setex key seconds value
    设置键为name 值为a过期时间为10秒
    eg: setex name 10 a
    
    # 查看有效时间，以秒为单位
    ttl key
    ttl name
    
    # 设置多个键值
    mset key1 value1 key2 value2 ...
    设置键为'a1'值为'python'、键为'a2'值为'java'、键为'a3'值为'c'
    eg: mset a1 python a2 java a3 c
    
    # 根据键获取值，如果不存在此键则返回nil
    get key
    eg: get name
    
    # 根据多个键获取多个值
    mget key1 key2 ...
    eg: mget a1 a2 a3
![](/1.png)

#### 键命令
    # 查看所有键
    keys *
    
    # 判断键是否存在，如果存在返回1，不存在返回0
    exists key1
    eg: exists a1

    # 查看键对应的value的类型
    type key
    eg: type a1
    
    # 删除键及对应的值
    del key
    eg: del a1
![](/2.png)

#### hash类型
> 增加、修改

    # 设置单个属性
    hset key field value
    设置键 user的属性name为 abc
    eg: hset user name abc
    
    # 设置多个属性
    hmset key field1 value1 field2 value2 ...
    设置键user2的属性name为aaa、属性age为11
    eg:hmset user2 name aaa age 11

> 获取

    # 获取指定键所有的属性
    hkeys key
    获取键user2的所有属性
    hkeys user2
    
    # 获取⼀个属性的值
    hget key field
    获取键user2属性'name'的值
    eg:hget user2 'name'
    
    # 获取多个属性的值
    hmget key field1 field2 ...
    获取键user2属性'name'、'age的值
    eg:hmget user2 name age
    
    # 获取所有属性的值
    hvals key
    获取键'user2'所有属性的值
    eg:hvals user2
![](/3.png)
![](/4.png)
> 删除

    # 删除属性，属性对应的值会被⼀起删除
    hdel key field1 field2 ...
    删除键'user2'的属性'age'
    eg:hdel user2 age