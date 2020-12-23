---
title: redis的介绍
date: 2019-10-3 15:12:21
updated: 2019-10-3 15:51:25
tags: 数据库
categories: 数据库


---

#### 一、Redis简介

* Redis是一个开源的使用ANSI C语言编写、支持网络、
  可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。
  从2010年3月15日起，Redis的开发工作由VMware主持。
  从2013年5月开始，Redis的开发由Pivotal赞助。
  
* Redis是 NoSQL技术阵营中的一员，它通过多种键值数据类型来适应不同场景下的存储需求，
  借助一些高层级的接口使用其可以胜任，如缓存、队列系统的不同角色
  

#### 二、Redis特性
* Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
* Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
* Redis支持数据的备份，即master-slave模式的数据备份。


####  三、Redis 优势

* 用来做缓存(ehcache/memcached)——redis的所有数据是放在内存中的（内存数据库）
* 可以在某些特定应用场景下替代传统数据库——比如社交类的应用
* 在一些大型系统中，巧妙地实现一些特定的功能：session共享、购物车

#### 四、五种基本类型

* 字符串string
* 哈希hash
* 列表list
* 集合set
* 有序集合zset

#### 五、安装教程

> https://www.jianshu.com/p/79737bc39396   

