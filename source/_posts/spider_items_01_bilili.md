---
title: 爬取B站某UP主视频信息
date: 2020-03-08 16:10:20
updated: 2020-03-08 17:22:53
tags: 爬虫
categories: 爬虫项目
---

#### 爬取内容

    视频标题
    视频描述
    视频播放量
    视频长度
    视频弹幕数
    视频url地址
    
 ---
 
 
  
    
    import requests
    import json
    from pprint import pprint
    
   
    
    class BililiSpider():
        def __init__(self, page):
            self.url = 'https://api.bilibili.com/x/space/arc/search?mid=9824766&ps=30&tid=0&pn={}&keyword=&order=pubdate&jsonp=jsonp'
            self.headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
            }
            self.page = page
            pass
    
        def save_content(self, content):
            """保存数据"""
            with open('./bilili.txt', 'a', encoding='utf-8') as f:
                f.write(str(content) + '\n')
    
        def get_content(self):
            """数据提取"""
    
            for i in range(1, int(self.page) + 1):
                url = self.url.format(i)
                resp = requests.get(url=url, headers=self.headers, verify=False)
    
                # 将json转成字典类型
                dict_resp = json.loads(resp.text)
                # pprint(dict_resp['data']['list']['vlist'])
                content_list = dict_resp['data']['list']['vlist']
    
                items = {}
                for content in content_list:
                    items['title'] = content['title']
                    items['description'] = content['description']  # 描述
                    items['play'] = content['play']  # 播放量
                    items['length'] = content['length']  # 视频长度
                    items['video_review'] = content['video_review']  # 弹幕
                    items['url'] = 'https://www.bilibili.com/video/av' + str(content['aid'])
    
                    print(items)
                    # 保存数据
                    # self.save_content(items)
    
                print("*" * 80)
            pass
    
        def run(self):
            """启动"""
            self.get_content()
            pass
    
    
    if __name__ == '__main__':
        page = input('请输入要爬取几页数据--1-30:')
        user = BililiSpider(page)
        user.run()


#### 效果展示
![](1.png)

