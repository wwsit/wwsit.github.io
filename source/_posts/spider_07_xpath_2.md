---
title: XPath 数据提取(下)
date: 2019-8-26 19:55:54
updated: 2019-8-26 20:30:08
tags: 爬虫、xpath
categories: 爬虫
---


#### 一、lxml模块介绍与使用

lxml 模块介绍
> lxml 模块中实现了 XPath 的功能

安装
>pip install lxml

#### 二、lxml 基本使用

调试内容

    <div>
        <ul>
             <li class="item-0"><a href="link1.html">first item</a></li>
             <li class="item-1"><a href="link2.html">second item</a></li>
             <li class="item-inactive"><a href="link3.html">third item</a></li>
             <li class="item-1"><a href="link4.html">fourth item<span>abc</span></a></li>
             <li class=" item-0"><a href="link5.html" class="cls">fifth item</a>
         </ul>
    </div>

代码流程

    # 导入lxml 的 etree 库 (导入没有提示不代表不能用)
    from lxml import etree

    # 使用 etree.HTML 将字符串转化为Element对象,Element对象具有xpath的方法,
    # 返回结果的列表，能够接受bytes类型的数据和str类型的数据
    eroot = etree.HTML(text)
    result = eroot.xpath("xpath字符串")

    # 把转化后的element对象转化为字符串，返回bytes类型结果
    etree.tostring(element)


代码练习

    # 1. 获取所有的 <li> 标签
    result = eroot.xpath('//li')

    # 2.获取所有 <a> 标签的内容
    result = eroot.xpath('//a/text()')

    # 3.继续获取 <li> 标签的所有 class 属性
    result = eroot.xpath('//li/@class')

    # 4.继续获取 <li> 标签下 href 为 link1.html 的 <a> 标签
    result = eroot.xpath('//li/a[@href="link1.html"]')

    # 5.获取 <li> 标签下的所有 <span> 标签
    result = eroot.xpath('//li//span')

    # 6.获取 <li> 标签下的 <a> 标签里的所有 class
    result = eroot.xpath('//li/a/@class')

    # 7.获取最后一个 <li> 的 <a> 的 href
    result = eroot.xpath('//li[last()]/a/@href')

    # 8.获取倒数第二个li元素的内容
    result = eroot.xpath('//li[last()-1]//text()')
    
    # 9.去除内容里得空格(最后一个li元素)  加个 normalize-space
    eroot.xpath('normalize-space(//li[last()-1]//text()')
