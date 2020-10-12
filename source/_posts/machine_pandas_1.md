---
title: Pandas介绍
date: 2019-10-25 18:21:15
updated: 2019-10-25 18:58:19
tags: 机器学习
categories: 机器学习
---

#### Pandas介绍
    * 以Numpy为基础，提供了高性能矩阵的运算
    * 提供了大量能够快速便捷地处理数据的函数和方法
    * 基于matplotlib，能够简便的画图
    * 提供数据清洗功能
    * 专门用于数据挖掘的开源python库

#### Pandas数据结构
    Pandas中一共有三种数据结构，分别为：Series、DataFrame和MultiIndex
    
    Series是一维数据结构
    DataFrame是二维的表格型数据结构
    MultiIndex是三维的数据结构
    
#### Series
> Series是一个类似于一维数组的数据结构，它能够保存任何类型的数据，
  比如整数、字符串、浮点数等，主要由一组数据和与之相关的索引两部分构成
> 为了更方便地操作Series对象中的索引和数据，Series中提供了两个属性index和values


#### DataFrame
> DataFrame是一个类似于二维数组或表格(如excel)的对象，既有行索引，又有列索引
> 行索引，表明不同行，横向索引，叫index，0轴，axis=0
> 列索引，表名不同列，纵向索引，叫columns，1轴，axis=1

#### MultiIndex
> 多级索引（也称层次化索引）是pandas的重要功能，可以在Series、DataFrame对象上拥有2个以及2个以上的索引。