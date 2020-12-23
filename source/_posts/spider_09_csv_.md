---
title: json 与 csv 文件转换
date: 2019-8-27 19:01:24
updated: 2019-8-27 19:20:18
tags: 爬虫、csv
categories: 爬虫
---

#### 一、csv 文件格式

定义
> 逗号分隔值（Comma-Separated Values，CSV，有时也称为字符分隔值，
因为分隔字符也可以不是逗号），其文件以纯文本形式存储表格数据（数字和文本）

作用
> 可以使用 excel 转换打开

使用流程

    # 导入 csv 模块
    import csv
    # 创建文件写入对象
    f = open('demo.csv','w',encoding='utf-8')
    # 创建 csv 写入对象
    csv_writer = csv.writer(f)
    # 写入 json 数据的 key 作为标题
    csv_writer.writerow(results[0].keys())
    # 循环写入数据
    for result in results:
        csv_writer.writerow(result.values())
    # 使用office 导入 csv 数据转换成 excel 数据


实现代码

    import csv
    import json
    results = None
    with open('demon_1.json','r',encoding='utf-8') as f:
        results = json.load(f)
    # 创建文件写入对象
    f = open('demon.csv','w',encoding='utf-8')
    # 通过文件对象创建 csv 写入对象
    csv_writer = csv.writer(f)
    # 把数据写入到 csv 文件中
    # 写入标题

    # 说明:对象是一个列表嵌套一个字典 results=[{"age":18},{"age":19}..]
    # results[0].keys() 获取列表里第一个字典里的所有键的名字
    csv_writer.writerow(results[0].keys())

    for result in results:
        # result.values() 获取字典里的值
        csv_writer.writerow(result.values())
    f.close()