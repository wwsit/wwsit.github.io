---
title: 正则表达式
date: 2020-1-27 16:00:11
updated: 2019-1-27 16:40:47
tags: 基础
categories: 基础
---


#### 1.re模块的介绍
> 在Python中需要通过正则表达式对字符串进行匹配的时候，可以使用一个 re 模块

    # 导入re模块
    import re
    # 使用match方法进行匹配操作
    result = re.match(正则表达式,要匹配的字符串)
    # 如果上一步匹配到数据的话，可以使用group方法来提取数据
    result.group()
    
#### 2. re模块的使用

    import re
    # 使用match方法进行匹配操作
    result = re.match("hello","helloworld")
    # 获取匹配结果
    info = result.group()
    print(info)
    
    运行结果:
    hello
    
    re.match()    从头开始匹配字符串数据
    re.findall()  不是从开头开始匹配的，而是从第一个匹配上的字符开始，返回所有的可以匹配上的字符（返回列表格式）
    re.search()   从全文开始匹配，找到一个符合的就结束
    
#### 3.匹配单个字符
![](1.png)

#### 4. 匹配多个字符
![](2.png)


#### 5.匹配开头和结尾
![](3.png)

    import re
    # 匹配以数字开头的数据
    match_obj = re.match("^\d.*", "3hello")
    if match_obj:
        # 获取匹配结果
        print(match_obj.group())
    else:
        print("匹配失败")
     运行结果  :3hello 
 
#### 6.除了指定字符以外都匹配
    
    [^指定字符]: 表示除了指定字符都匹配
    需求: 第一个字符除了aeiou的字符都匹配
    
    import re
    match_obj = re.match("[^aeiou]", "h")
    if match_obj:
        # 获取匹配结果
        print(match_obj.group())
    else:
        print("匹配失败")
    运行结果  :h
    
  
  
#### 7. 匹配分组相关正则表达式
![](4.png)

    匹配出163、126、qq等邮箱
   
    import re
    match_obj = re.match("[a-zA-Z0-9_]{4,20}@(163|126|qq|sina|yahoo)\.com", "hello@163.com")
    if match_obj:
        print(match_obj.group())
        # 获取分组数据
        print(match_obj.group(1))
    else:
        print("匹配失败")
        
    运行结果： 
        hello@163.com
        163