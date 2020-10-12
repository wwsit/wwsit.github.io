---
title: 爬取微信公众号文章
date: 2020-03-14 10:15:35
updated: 2020-03-15 16:55:02
tags: 爬虫
categories: 爬虫项目
---

#### 爬取内容

    文章标题
    文章url
    文章首页图片

#### 项目分析

      首先通过Fiddle获取想要爬虫的公众号 url
      url = 'http://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MzA4OTIzMjYzMg==&f=json&offset=0&count=10&is_ok=1&scene=124&uin=MjYyMzUzNzI2NA%3D%3D&key=d2f6d1264672f56cf0cb89a1fc7920d703af2978814a098e4533279c6558efc6f69bac96c7c525f8bae2da8e6c89bb05b68beed4e8a141ca468128b4ed277b0feb28f192873cb337197293138a34057f&wxtoken=&appmsg_token=1052_DGT28BkTjTpIpsx1CXB7fWjLPaZQEnrNtDA2CA~~&x5=0&f=json'
      
      key=d2f6d1264672f56cf0cb89a1fc7920d703af2978814a098e4533279c6558efc6f69bac96c7c525f8bae2da8e6c89bb05b68beed4e8a141ca468128b4ed277b0feb28f192873cb337197293138a34057f
      因为key这个参数，没办法分析出来，所以这个url每半个小时会失效，需要重新获取这个url，然后只需替换key这个参数
      
      offset=0：如果想要获取更多的文章，可以通过修改这个"offset"参数，来获取更多的文章
      


#### 示例代码

   
    import re
    import requests
    import json
    from lxml import etree
    
    
    class WeiXinSpider():
        def __init__(self):
            self.url = 'http://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MzA4OTIzMjYzMg==&f=json&offset=0&count=10&is_ok=1&scene=124&uin=MjYyMzUzNzI2NA%3D%3D&key=d2f6d1264672f56cf0cb89a1fc7920d703af2978814a098e4533279c6558efc6f69bac96c7c525f8bae2da8e6c89bb05b68beed4e8a141ca468128b4ed277b0feb28f192873cb337197293138a34057f&wxtoken=&appmsg_token=1052_DGT28BkTjTpIpsx1CXB7fWjLPaZQEnrNtDA2CA~~&x5=0&f=json'
            self.headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
            }
            pass
    
        def get_content(self):
            """提取js内容"""
    
            resp = requests.get(url=self.url, headers=self.headers)
            # 将字符串转成字典
            dict_content = json.loads(resp.text)
            list_content = dict_content['general_msg_list']
            # 再次转成字典
            dict2_content = json.loads(list_content)
            list_content = dict2_content['list']
            # print(list_content)
            items = {}
            num = 0
            for content in list_content:
    
                # 获取首篇文章
                items['title'] = content['app_msg_ext_info']['title']
                items['content_url'] = content['app_msg_ext_info']['content_url']
                items['picture'] = content['app_msg_ext_info']['cover']
                print(items)
                num += 1
                # 获取剩余的文章
                list3_content = (content['app_msg_ext_info']['multi_app_msg_item_list'])
                for content1 in list3_content:
                    items['title'] = content1['title']
                    items['content_url'] = content1['content_url']
                    items['picture'] = content1['cover']
                    print(items)
                    num += 1
                    # break
            print('总共有%s篇文章' % num)
            pass
    
        def run(self):
            self.get_content()
            pass
    
    
    if __name__ == '__main__':
        user = WeiXinSpider()
        user.run()


#### 效果展示
![](1.png)