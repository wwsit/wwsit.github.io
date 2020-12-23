---
title: redis 主从配置
date: 2019-10-3 20:20:11
updated: 2019-10-3 20:55:05
tags: 数据库
categories: 数据库


---

#### 主从概念

* ⼀个master可以拥有多个slave，⼀个slave⼜可以拥有多个slave
* master用来写数据，slave用来读数据，经统计：网站的读写比率是10:1
* 通过主从配置可以实现读写分离

#### 主从配置
1. 说明：我的redis.conf 里的ip地址是 127.0.0.1 

![](/db_redis_1.PNG)
2. 复制 /usr/local/redis/redis.conf文件  (我的redis.conf文件是放在这里 
   如果你不知道在哪 可以 sudo find / -name redis.conf 进行搜索)
> sudo cp redis.conf  ./slave.conf

3.修改redis/slave.conf文件
> 将端口 port 6379 改成 6378(也可以其它端口)
> 添加从属关系 slaveof 主数据库ip地址 主数据库端口号
> slaveof 127.0.0.1 6379
> 保存关闭 wq

![](/db_redis_2.PNG)

4.运行 slave.conf文件
> ./src/redis-server   ./slave.conf  (说明: 当前我位于redis目录下)

5.查看从客户端是否运行
> ps -aux | grep redis

![](/db_redis_5_port.PNG)

>进入从客户端
>redis-cli -p 6378

![](/db_redis_4.PNG)

>查看主从关系

![](/db_redis_3_slave.PNG)
