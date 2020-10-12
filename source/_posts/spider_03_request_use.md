---
title: requests模块的使用(下)
date: 2019-8-24 21:10:46
updated: 2019-8-24 21:55:24
tags: 爬虫requests
categories: 爬虫
---


#### 一、使用代理服务器

作用
>让服务器以为不是同一个客户端在请求
>防止我们的真实地址被泄露，防止被追究

代理分类

    透明代理(Transparent Proxy)：透明代理虽然可以直接“隐藏”你的IP地址，但是还是可以查到你是谁。
    匿名代理(Anonymous Proxy)：匿名代理比透明代理进步了一点：别人只能知道你用了代理，无法知道你是谁。
    混淆代理(Distorting Proxies)：与匿名代理相同，如果使用了混淆代理，别人还是能知道你在用代理，但是会得到一个假的IP地址，伪装的更逼真
    高匿代理(Elite proxy或High Anonymity Proxy)：可以看出来，高匿代理让别人根本无法发现你是在用代理，所以是最好的选择。

> 在使用的使用，毫无疑问使用高匿代理效果最好

> 从使用的协议：代理ip可以分为http代理，https代理，socket代理等，使用的时候需要根据抓取网站的协议来选择

    # 导入模块
    import requests
    # 定义请求地址
    url = 'https://www.baidu.com/'
    # 定义自定义请求头
    headers = {
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
    }
    # 定义 代理服务器
    proxies = {
      "http":"http://IP地址:端口号",  # 二选一  什么协议就用什么协议
      "https":"https://IP地址:端口号"
    }
    # 使用 POST 请求参数发送请求
    response = requests.get(url,headers=headers,proxies=proxies)
    # 获取响应的 html 内容
    html = response.text


#### 二、发送请求携带 Cookies

> 直接在自定义请求头中携带 Cookie
> 通过请求参数携带 Cookie 对象

    # 导入模块
    import requests
    # 定义请求地址
    url = 'https://www.baidu.com/'
    # 定义自定义请求头
    headers = {
      "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
      # 方式一：直接在请求头中携带Cookie内容
      "Cookie": "Cookie值"
    }
    # 方式二：定义 cookies 值
    cookies = {
      "xx":"yy"
    }
    # 使用 POST 请求参数发送请求
    response = requests.get(url,headers=headers,cookies=cookies)
    # 获取响应的 html 内容
    html = response.text

#### 三、错误证书处理

![](/spider_01.PNG)

    # 导入模块
    import requests

    url = "https://www.12306.cn/mormhweb/"
    # 设置忽略证书
    response = requests.get(url,verify=False)

    # 发送请求时 verify 参数设置为 False 表示不验证CA证书

#### 四、超时处理

    # 导入模块
    import requests

    url = "https://www.baidu.com/"
    # 设置忽略证书
    response = requests.get(url,timeout=5)

    # 发送请求时 timeout 参数设置为超时秒数


#### 五、重试处理


    可以使用第三方模块 retrying 模块
    1. pip install retrying


    import requests
    # 1. 导入模块
    from retrying import retry

    # 2. 使用装饰器进行重试设置
    # stop_max_attempt_number 表示重试次数
    @retry(stop_max_attempt_number=3)
    def parse_url(url):
        print("访问url:",url)
        headers = {
            "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
        }
        # 设置代理
        proxies = {
            "http":"http://124.235.135.210:80"
        }
        # 设置超时参数
        response = requests.get(url,headers=headers,proxies=proxies,timeout=5)
        return response.text

    if __name__ == '__main__':
        url = "https://www.baidu.com/"
        try:
            html = parse_url(url)
            print(html)
        except Exception as e:
            # 把 url 记录到日志文件中，未来进行手动分析，然后对url进行重新请求
            print(e)

> 安装 retrying 模块
> retrying 模块可以通过装饰器模式对某个函数进行监控，如果该函数引发异常就会触发重试操作
> pip install retrying

    对需要重试的函数进行装饰器设置
    通过 @retry(stop_max_attempt_number=重试次数) 参数设置重试次数
    # 1. 导入模块
    from retrying import retry
    # 2. 装饰器设置重试函数
    @retry(stop_max_attempt_number=3)
    def exec_func():
        pass