---
title: requests模块的使用(上)
date: 2019-8-24 20:10:45
updated: 2019-8-24 20:40:21
tags: 爬虫、requests
categories: 爬虫
---


### 1. requests 模块介绍

    requests 模块可以模拟浏览器发送请求获取响应。

### 2. requests 模块安装

    pip install requests

### 3.requests 模块使用

**一、基本使用**

    *使用方式
    # 导入模块
    import requests
    # 定义请求地址
    url = 'https://www.baidu.com/'
    # 发送 GET 请求获取响应
    response = requests.get(url)
    # 获取响应的 html 内容
    html = response.text



**代码讲解**

> response 常用属性

        response.text 返回响应内容，响应内容为 str 类型
        respones.content 返回响应内容,响应内容为 bytes 类型
        response.status_code 返回响应状态码
        response.request.headers 返回请求头
        response.headers 返回响应头
        response.cookies 返回响应的 RequestsCookieJar 对象
      


> `response.content` 转换 `str` 类型 

 		# 获取字节数据
        content = response.contents
        # 转换成字符串类型
        html = content.decode('utf-8')


> response.cookies 操作

    # 返回 RequestsCookieJar 对象
    cookies = response.cookies
    # RequestsCookieJar 转 dict
    requests.utils.dict_from_cookiejar(cookies)
    # dict 转 RequestsCookieJar
    requests.utils.cookiejar_from_dict()
    # 对cookie进行操作,把一个字典添加到cookiejar中
    requests.utils.add_dict_to_cookiejar()


#### 二、自定义请求头


    # 导入模块
    import requests
    # 定义请求地址
    url = 'https://www.baidu.com/'
    # 定义自定义请求头
    headers = {
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }
    # 发送自定义请求头
    response = requests.get(url,headers=headers)
    # 获取响应的 html 内容
    html = response.text


#### 三、发送 GET 请求


    # 导入模块
    import requests
    # 定义请求地址
    url = 'https://www.baidu.com/'
    # 定义自定义请求头
    headers = {
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }
    # 定义 GET 请求参数
    params = {
      "wd":"csdn"
    }
    # 使用 GET 请求参数发送请求
    response = requests.get(url,headers=headers,params=params)
    # 获取响应的 html 内容
    html = response.text


#### 四、发送 POST 请求



    # 导入模块
    import requests
    # 定义请求地址
    url = 'https://www.baidu.com/'
    # 定义自定义请求头
    headers = {
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }
    # 定义post请求参数
    data = {
       "wd":"csdn"
    }

    # 使用 POST 请求参数发送请求
    response = requests.post(url,headers=headers,data=data)
    # 获取响应的 html 内容
    html = response.text


#### 五、保存图片

    # 导入模块
    import requests
    # 下载图片地址
    url = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3433375665,1448816841&fm=26&gp=0.jpg"
    # 发送请求获取响应
    response = requests.get(url)
    # 保存图片
    with open('image.png','wb') as f:
      f.write(response.content)