---
title: Scrapy 框架介绍
date: 2019-9-1 19:00:11
updated: 2019-9-1 19:21:05
tags: 爬虫、scrapy
categories: 爬虫
---

#### 一、scrapy 框架介绍

> Scrapy是一个为了爬取网站数据，提取结构性数据而编写的应用框架，
 我们只需实现少量的代码，就能够快速的抓取。
 Scrapy 使用了Twisted异步网络框架，可以加快我们的下载速度。
 
#### 二、scrapy 安装
>pip install scrapy
> 安装完成后在命令行，如果信息显示说明安装成功
>scrapy --help
 
  
#### 三、scrapy 快速体验

使用流程
    
    # 创建项目 (在终端操作)
    scrapy startproject 项目名称
    
    # 创建爬虫
    cd 项目目录
    scrapy genspider 爬虫名称 允许域名
    eg: scrapy genspider movies douban.com
    
    # 编写爬虫组件（解析数据）和管道组件（保存数据）
    import scrapy
    class MoviesSpider(scrapy.Spider):
       name = 'movies' # 爬虫名称
       allowed_domains = ['douban.com']
       # 输入首个爬取网址
       start_urls = ['https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0']
    
       def parse(self, response):
           """解析函数"""
           pass
    
    
    # 启动爬虫(在终端操作)
    scrapy crawl 爬虫名称
    eg: scrapy crawl movies


#### 实现多个请求
    删除 start_urls参数
    
    url = 'https://www.baidu.com/s?wd={}'
    
    def start_requests(self):
        """实现多个请求"""
        for page in range(1, 10):
            # 通过scrapy.Request将请求交给引擎
            yield scrapy.Request(
                self.url.format(page)
            )
     
    