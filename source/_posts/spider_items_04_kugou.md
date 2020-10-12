---
title: 爬虫 酷狗音乐爬虫
date: 2020-08-09 15:03:08
updated: 2020-08-09 17:01:16
tags: 爬虫
categories: 爬虫项目
---

#### 项目介绍
     1.在控制台输入 歌手名 可以获取到歌名（待改进：只能输入歌手,不能输入歌名,会报错，）
     2.能进行单曲下载或者 全部歌曲下载
     3.可以显示下载的进度
    
        
#### 示例代码
        
    import os
    
    import requests
    import json
    import re
    from urllib import request
    
    
    class KUGOUSpider():

    def __init__(self, name):

        self.url_js = 'https://searchrecommend.kugou.com/get/complex?callback=jQuery112409454911830803683_1596705923765&word={}'.format(
            name)
        self.get_donwn_url = 'https://www.kugou.com/song/#hash=694E7E4298626B2BCD36EB20E014CB90&album_id=38726380'

        self.list_data = []
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Mobile Safari/537.36"
        }

    def fun(self, blocknum, bs, size):
        """显示下载的进度"""

        percent = blocknum * bs / size
        percent = percent * 100
        int_data = int(percent)
        if int_data % 20 == 0:
            if int_data not in self.list_data:
                print("download: %d%%" % (int_data))
                self.list_data.append(int_data)

    @staticmethod
    def save_song(list_content, audio_name):
        """保存歌词"""
        for content in list_content:
            content = content[str(content).rfind(']') + 1:]
            with open('./music/' + audio_name + '.txt', 'a+', encoding='utf-8') as f:
                f.write(content + '\n')

    def down_music(self, url, lyrics_list, audio_name):
        """下载音乐"""
        if not os.path.exists('./music'):
            os.mkdir('./music')
        self.list_data = []
        self.save_song(lyrics_list, audio_name)
        
        request.urlretrieve(url=url, filename='./music/' + audio_name + '.mp3', reporthook=self.fun)

    def get_music_url(self, want_down_list):
        """获取音乐下载地址"""
        for content in want_down_list:
            hash = content[0]
            album_id = content[1]
            url = 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&hash=%s&album_id=%s&mid=c1f611ec72bf4d3e507608e6d5fde30e' % (
                hash, album_id)
            resp = requests.get(url, self.headers)

            # 详细内容
            dict_content = json.loads(resp.text)['data']

            # 获取音频地址
            url_mp3_download = dict_content['play_url']

            # 获取作者和歌名
            audio_name = dict_content['audio_name']
            print(audio_name)

            # 获取歌词
            str_content = dict_content['lyrics']
            list_content = str_content.split('\r\n')
            del list_content[0:10]
            del list_content[-1]
            lyrics_list = list_content

            self.down_music(url_mp3_download, lyrics_list, audio_name)

    def get_hash_id(self):
        """获取hash值和id值"""
        resp = requests.get(url=self.url_js, headers=self.headers)
        result = resp.text[resp.text.find('['):resp.text.rfind(']') + 1]

        # 转成Python类型
        try:
            dict_content = json.loads(result)[0]['data']['song']
        except Exception as e:
            dict_content = json.loads(result)

        while True:
            want_down_list = []  # 存放需要下载的歌词
            print('*' * 50)
            print('请输入需要下载歌词的序号，0代表全部')

            n = 1
            for i in dict_content:
                print('序号:%s  歌手:%s  歌名:%s' % (n, i['singername'], i['songname']))
                n += 1

            print('返回上一级，请输入:b')
            num = input('请输入需要下载的数字:')
            print('*' * 50)

            if num == 'b':
                break

            # 判断是否为数字
            result = re.findall('^\d+$', num)
            if len(result) == 0:
                print('格式不正确，请输入数字')
                return

            num = int(num)
            if num != 0:
                hash = dict_content[num - 1]['hash']
                AlbumID = dict_content[num - 1]['AlbumID']
                want_down_list.append([hash, AlbumID])
                self.get_music_url(want_down_list)

            if num == 0:
                for content in dict_content:
                    hash = content['hash']
                    AlbumID = content['AlbumID']
                    want_down_list.append([hash, AlbumID])
                self.get_music_url(want_down_list)

    def run(self):
        self.get_hash_id()


    if __name__ == '__main__':
    
        while True:
            name_sing = input('请输入歌手名称:')
            if name_sing == 'y':
                break
            user = KUGOUSpider(name_sing)
            user.run()
            print('结束程序请输入:y')







   
#### 效果展示
![](1.png)
![](2.png)