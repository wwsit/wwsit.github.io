---
title: XPath 数据提取(上)
date: 2019-8-26 19:20:34
updated: 2019-8-26 19:50:18
tags: 爬虫、xpath
categories: 爬虫
---

#### 一、XPath 介绍与语法

定义
> XPath (XML Path Language) 是一门在 HTML\XML 文档中查找信息的语言，
  可用来在 HTML\XML 文档中对元素和属性进行遍历。

作用
> 通过一定的语法规则从 HTML/XML 文件中提取数据。


下载插件
> 使用 Chrome 插件 XPath Helper
  下载地址:https://pan.baidu.com/s/1UM94dcwgus4SgECuoJ-Jcg 密码：337b

>环境搭建

>创建 HTML 测试文件

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>语法学习</title>
    </head>
    <body>
        <bookstore>
            <book category="COOKING">
              <title lang="en">Everyday Italian</title>
              <author>Giada De Laurentiis</author>
              <year>2005</year>
              <price>30.00</price>
            </book>
            <book category="CHILDREN">
              <title lang="en">Harry Potter</title>
              <author>J K. Rowling</author>
              <year>2005</year>
              <price>29.99</price>
            </book>
            <book category="WEB">
              <title lang="en">Learning XML</title>
              <author>Erik T. Ray</author>
              <year>2003</year>
              <price>39.95</price>
            </book>
        </bookstore>
    </body>
    </html>

>使用 Pycharm 运行文件
调试环境介绍


![](/spider_06_01.PNG)

XPath 语法
![](/spider_06_02.PNG)

案例
![](/spider_06_03.PNG)


* 选择所有的h1下的文本
    * //h1/text()
* 获取所有的a标签的href
    * //a/@href
* 获取html下的head下的title的文本
    * /html/head/title/text()
* 获取html下的head下的link标签的href
    * /html/head/link/@href
    
查找特定的节点
![](/spider_06_04.PNG)