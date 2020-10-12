---
title: Scrapy中间件
date: 2019-11-1 14:33:27
updated: 2019-11-1 15:04:19
tags: 爬虫
categories: 爬虫
---

#### Scrapy中间件分类

    * 爬虫中间件 引擎和爬虫组件交互时触发中间件
    * 下载中间件 引擎和下载器交互时出发中间件

#### 实现中间件的流程
    在 middlewares.py 创建中间件类
    实现所需要拦截的函数
    在 settings.py 中配置开启中间件
    在配置中数字越小越优先执行
    

#### 下载中间件模版

    class DownloadMiddleware(object):      
        """下载中间件"""
        @classmethod
        def from_crawler(cls, crawler):
            """当爬虫被创建时执行  首先执行的方法"""
            pass
            
        def spider_opened(self, spider):
            """当爬虫被打开时回调，初始化一些内容时可以放在这里 """
           pass
    
        def process_request(self, request, spider):
            """当 引擎 把 请求提交给下载器时回调 """
           pass
          
        def process_response(self, request, response, spider):
           """ 当下载组件把响应交给引擎时回调 """
           pass
             
        def process_exception(self, request, exception, spider):
            """ 当下载中间件引发异常时回调  """
           pass

#### 爬虫中间件
    class SpiderMiddleware(object):
        ""爬虫中间件"""
        
        @classmethod
        def from_crawler(cls, crawler):
            """当爬虫创建时回调"""
           pass
    
        def spider_opened(self, spider):
            """ 当爬虫初始化时回调"""
            pass
         
        def process_spider_input(self, response, spider):
            """当引擎把响应交给爬虫组件时回调"""
            pass
           
        def process_spider_output(self, response, result, spider):
            """当爬虫组件把数据或者请求提交给引擎时回调"""
            pass
           
        def process_spider_exception(self, response, exception, spider):
           """当 process_spider_input 引发异常时回调"""
            pass
    
        def process_start_requests(self, start_requests, spider):
            """当引擎 从爬虫获取 启动 请求时回调"""
            pass
            
            
#### 随机UA下载中间件
    import random
    
    def get_ua():
        """生成UA"""
        first_num = random.randint(55, 62)
        third_num = random.randint(0, 3200)
        fourth_num = random.randint(0, 140)
        os_type = [
            '(Windows NT 6.1; WOW64)', '(Windows NT 10.0; WOW64)', '(X11; Linux x86_64)',
            '(Macintosh; Intel Mac OS X 10_12_6)'
        ]
        chrome_version = 'Chrome/{}.0.{}.{}'.format(first_num, third_num, fourth_num)
    
        ua = ' '.join(['Mozilla/5.0', random.choice(os_type), 'AppleWebKit/537.36',
                       '(KHTML, like Gecko)', chrome_version, 'Safari/537.36']
                      )
        
        # 将生成UA 返回出去
        return ua
    
    class RandomUserAgentDownloadMiddleware(object):
        
        def process_request(self, request, spider):
            """当 引擎 把 请求提交给下载器时回调"""
            
            requests.headers["User-Agent"] = get_ua()
    
            return None
            
 
#### 代理中间件

    class RandomProxyDownloadMiddleware(object):
        def process_request(self, request, spider):
    
            # request.meta["http_proxy"] = random.choice(PROXIES)
            
            # http://127.0.0.1:6868/proxies/random  你自己代理池的地址
            proxy = requests.get('http://127.0.0.1:6868/proxies/random').text
            requests.meta["http_proxy"] = proxy
            return None
    
    # 注意
    scrapy框架中不要用 requests.meta['proxy'] = proxy
    会一直有问题，什么主机失去响应啊什么的
    