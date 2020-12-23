---
title: requests--豆瓣电影爬虫
date: 2019-8-25 19:22:24
updated: 2019-8-25 19:40:23
tags: 爬虫
categories: 爬虫
---

#### 爬取豆瓣热门页 电影的数据

接口信息

![](/spider_douban_01.PNG)
![](/spider_douban_02.PNG)


    import requests
    import json
    from pprint import pprint
    import jsonpath


    class DouBanSpider():
        """豆瓣热门页电影 爬虫"""

        def __init__(self):
            """初始化操作"""

            self.url = 'https://movie.douban.com/j/search_subjects'
            self.headers = {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 \
                (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
            }
            self.number = 1  # 爬取的数量


        def run(self, pages):
            """启动爬虫"""

            # 参数1：要从第几个数据开始爬
            # 参数2：到第几个数据结束
            # 参数3：因为每次增加的数据是20个 所以步长20
            for page in range(0, pages * 20, 20):
                resp = requests.get(
                    url=self.url.format(page),
                    headers=self.headers,
                    # 请求参数
                    params={
                        "type": "movie",
                        "tag": "热门",
                        "sort": "recommend",
                        "page_limit": "20",
                        "page_start": page
                    }
                )
                # 返回的数据是一个json数据, 转成字典格式
                result = json.loads(resp.text)
                # pprint(result) # pprint让控制台打印更好看

                result = result['subjects']
                for movie in result:
                     print("数量:{}---标题：{}--评分:{}--地址:{}".    # <---这里有个点  一行太长了
                          format(self.number,movie['title'], movie['rate'], movie['url']))
                    self.number += 1


    if __name__ == '__main__':
        client = DouBanSpider()
        # 要爬几页数据  就写多少页  下面是爬两页数据
        client.run(2)

效果图
![](/spider_douban_03.PNG)