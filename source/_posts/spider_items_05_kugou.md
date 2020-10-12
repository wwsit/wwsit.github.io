---
title: 爬虫 酷狗音乐爬虫2.0版本
date: 2020-10-06 10:06:24
updated: 
tags: 爬虫
categories: 爬虫项目
---

#### 项目介绍
     1.在控制台可以输入 歌手或者歌名
     2.能进行单曲下载或者 全部歌曲下载
 
    
        
#### 示例代码
        
    # -*-coding:utf-8-*-
    import os
    import math
    import time
    import json
    import js2py
    import requests
    from urllib import parse, request
    
    
    class KuGouSpider(object):
    
        def __init__(self, name):
            self.name = name
            self.start_flag = 1
            self.end_flag = 10
            self.recent_page = 1
            self.url = ""
            self.list_data = []
    
        def fun(self, blocknum, bs, size):
            """显示下载的进度"""
    
            percent = blocknum * bs / size
            percent = percent * 100
            int_data = int(percent)
            if int_data % 20 == 0:
                if int_data not in self.list_data:
                    print("download: %d%%" % (int_data))
                    self.list_data.append(int_data)
    
        def save_song(self, lyrics_cotent, items, url):
            """保存歌词和下载音频"""
    
            self.list_data = []
            print("正在下载的内容:"+ items['SingerName'] + '-' + items['song_name'])
            file_path = './music'
            path = './music/' + items['SingerName'] + '-' + items['song_name'] + '.txt'
            print('文件路径:%s' % os.getcwd() + '\\music')
    
            if not os.path.exists(file_path):
                os.mkdir('./music')
            # 保存歌词
            with open(path, 'w+', encoding='utf-8') as f:
                f.write(lyrics_cotent + '\n')
            # 下载音频
            request.urlretrieve(url=url, filename='./music/' + items['SingerName'] + '-' + items['song_name'] + '.mp3',
                                reporthook=self.fun)
    
        def execute_js(self):
            """获取url地址"""
    
            # 获取毫秒的时间戳
            time_result = time.time() * 1000
            context = js2py.EvalJs()
            js_time = round(time_result)
    
    
            signature_value = "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwtbitrate=0callback=callback123clienttime=%sclientver=2000dfid" \
                              "=-inputtype=0iscorrection=1isfuzzy=0keyword=%smid=%spage=1pagesize=30platform" \
                              "=WebFilterprivilege_filter=0srcappid=2919tag=emuserid=-1uuid=%sNVPh5oo715z5DIWAeQlhMDsWXXQV4hwt" \
                              % (
                                  js_time, self.name, js_time, js_time)
    
            with open('./kugou.js', 'r', encoding='utf-8') as f:
                context.execute(f.read())
            # 执行JS代码，获取signature值
            result = context.faultylabs.MD5(signature_value)
    
            # 进行字符串编码
            parser_name = parse.quote(self.name)
    
            # 获取url(获取搜索列表)
            self.url = "https://complexsearch.kugou.com/v2/search/song?callback=callback123&keyword=%s&page=1&pagesize=30" \
                       "&bitrate=0&isfuzzy=0&tag=em&inputtype=0&platform=WebFilter&userid=-1&clientver=2000&iscorrection" \
                       "=1&privilege_filter=0&srcappid=2919&clienttime=%s&mid=%s&uuid=%s&dfid=-&signature=%s" % (
                           parser_name, js_time, js_time, js_time, result)
    
        def get_response(self):
            """获取响应内容"""
    
            resp = requests.get(self.url)
            result = resp.text
    
            # 去掉左右括号,转成字典类型
            result_str = result[12:-2]
            result_dict = json.loads(result_str)
            result_dict = result_dict["data"]["lists"]
    
            # 向上取整数
            page_num = math.ceil(len(result_dict) / 10)
    
            down_item_list = []
            while True:
                i = 0
    
                for single_content in result_dict:
    
                    items = {}
                    items["AlbumID"] = single_content['AlbumID']
                    # 专辑
                    items["AlbumName"] = single_content['AlbumName']
                    # 歌曲名
                    items["song_name"] = single_content['SongName'].replace('<em>', '').replace('</em>', '')
                    # 歌手
                    items["SingerName"] = single_content['SingerName'].replace('<em>', '').replace('</em>', '')
                    # 普通音质
                    items["FileHash"] = single_content['FileHash']
                    # HQF音质
                    items["HQFileHash"] = single_content['HQFileHash']
    
                    down_item_list.append(items)
    
                    i += 1
                    if self.start_flag <= i <= self.end_flag:
                        print(
                            '序号:%s  歌手:%s  歌名:%s  专辑:%s' % (i, items["SingerName"], items["song_name"], items["AlbumName"]))
    
                if self.display_page(page_num, down_item_list):
                    break
                print()
    
        def display_page(self, page_num, down_item_list):
            """展示内容"""
    
            #  当前是第一页
            if self.recent_page == 1:
                input_content = input('共%s页，当前是第1页,下载音频(输入:d),下一页(请输入:n),返回(输入b):' % page_num)
                if input_content.lower() == 'n':
                    self.start_flag = 11
                    self.end_flag = 20
                    self.recent_page = 2
                elif input_content.lower() == 'd':
                    down_num = input('请输入需要下载歌词的序号，0代表全部:')
                    if 1 <= int(down_num) <= 10:
                        self.get_page_response(down_item_list[int(down_num)])
                    elif int(down_num) == 0:
                        self.get_page_response(down_item_list[:10])
                    else:
                        print('输入有误,请输入1--10之间的数字')
                elif input_content.lower() == 'b':
                    print()
                    return True
    
            else:
                # 不是第一页
                input_content = input(
                    '共%s页，当前是第%s页,下载音频(输入:d),上一页(请输入:u),下一页(请输入:n),返回(输入b):' % (page_num, self.recent_page))
                if input_content.lower() == 'u':
    
                    self.start_flag = self.start_flag - 10
                    self.end_flag = self.end_flag - 10
                    self.recent_page = self.recent_page - 1
    
                elif self.recent_page == page_num:
    
                    if input_content.lower() == 'd':
                        down_num = input('请输入需要下载歌词的序号，0代表全部:')
                        if self.start_flag <= int(down_num) <= self.end_flag:
                            self.get_page_response(down_item_list[int(down_num)])
                        elif int(down_num) == 0:
                            self.get_page_response(down_item_list[self.start_flag-1:self.end_flag])
                        else:
                            print('输入有误,请输入%s--%s之间的数字' % (self.start_flag, self.end_flag))
    
                elif input_content.lower() == 'n':
                    self.start_flag = 10 * self.recent_page + 1
                    self.end_flag = 10 * self.recent_page + 10
                    self.recent_page = self.recent_page + 1
    
                elif input_content.lower() == 'd':
    
                    down_num = input('请输入需要下载歌词的序号，0代表全部:')
                    if self.start_flag <= int(down_num) <= self.end_flag:
                        self.get_page_response(down_item_list[int(down_num)])
                    elif int(down_num) == 0:
                        self.get_page_response(down_item_list[self.start_flag - 1:self.end_flag])
                    else:
                        print('输入有误,请输入%s--%s之间的数字' % (self.start_flag, self.end_flag))
    
                elif input_content.lower() == 'b':
                    return True
    
        def get_page_response(self, items):
            """进入歌曲页面"""
    
            # 只下载一首歌
            if len(items) == 6:
                # 歌曲页面的url
                song_url = 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&hash=%s&album_id=%s&dfid=07uEDT2bAFsd0uOUa529rw1t&mid=baf581192a4beeb14d5a1c6934a6acfb' % (
                    items['FileHash'], items['AlbumID'])
    
                resp = requests.get(song_url).text
                # unicode编码转换成中文
                resp = resp.encode('utf8').decode('unicode_escape')
    
                # 歌词
                lyrics_cotent = resp[resp.find('lyrics') + 9:resp.find('author_id') - 3]
    
                resp_str = '{"' + resp[resp.find('play_url":'):-1]
                # 转成字典
                resp_dict = json.loads(resp_str)
                # 音频地址
                down_music_url = resp_dict['play_url']
                print(down_music_url)
    
                self.save_song(lyrics_cotent, items, down_music_url)
    
            # 下载所有歌
            elif len(items) >1:
                for item in items:
                    # 歌曲页面的url
                    song_url = 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&hash=%s&album_id=%s&dfid=07uEDT2bAFsd0uOUa529rw1t&mid=baf581192a4beeb14d5a1c6934a6acfb' % (
                        item['FileHash'], item['AlbumID'])
    
                    resp = requests.get(song_url).text
                    # unicode编码转换成中文
                    resp = resp.encode('utf8').decode('unicode_escape')
    
                    # 歌词
                    lyrics_cotent = resp[resp.find('lyrics') + 9:resp.find('author_id') - 3]
    
                    resp_str = '{"' + resp[resp.find('play_url":'):-1]
                    # 转成字典
                    resp_dict = json.loads(resp_str)
                    # 音频地址
                    down_music_url = resp_dict['play_url']
                    print(down_music_url)
    
                    self.save_song(lyrics_cotent, item, down_music_url)
                    time.sleep(5)
    
        def run(self):
    
            self.execute_js()
            self.get_response()
    
    
    if __name__ == '__main__':
        while True:
            name = input('请输入歌手/歌名:')
            if name == 'y':
                break
            user = KuGouSpider(name)
            user.run()
            print('结束程序请输入:y')







   
   
   
##### js 文件

    "undefined" == typeof faultylabs && (faultylabs = {}),
    faultylabs.MD5 = function(a) {
        function b(a) {
            var b = (a >>> 0).toString(16);
            return "00000000".substr(0, 8 - b.length) + b
        }
        function c(a) {
            for (var b = [], c = 0; c < a.length; c++)
                b = b.concat(k(a[c]));
            return b
        }
        function d(a) {
            for (var b = [], c = 0; 8 > c; c++)
                b.push(255 & a),
                a >>>= 8;
            return b
        }
        function e(a, b) {
            return a << b & 4294967295 | a >>> 32 - b
        }
        function f(a, b, c) {
            return a & b | ~a & c
        }
        function g(a, b, c) {
            return c & a | ~c & b
        }
        function h(a, b, c) {
            return a ^ b ^ c
        }
        function i(a, b, c) {
            return b ^ (a | ~c)
        }
        function j(a, b) {
            return a[b + 3] << 24 | a[b + 2] << 16 | a[b + 1] << 8 | a[b]
        }
        function k(a) {
            for (var b = [], c = 0; c < a.length; c++)
                if (a.charCodeAt(c) <= 127)
                    b.push(a.charCodeAt(c));
                else
                    for (var d = encodeURIComponent(a.charAt(c)).substr(1).split("%"), e = 0; e < d.length; e++)
                        b.push(parseInt(d[e], 16));
            return b
        }
        function l() {
            for (var a = "", c = 0, d = 0, e = 3; e >= 0; e--)
                d = arguments[e],
                c = 255 & d,
                d >>>= 8,
                c <<= 8,
                c |= 255 & d,
                d >>>= 8,
                c <<= 8,
                c |= 255 & d,
                d >>>= 8,
                c <<= 8,
                c |= d,
                a += b(c);
            return a
        }
        function m(a) {
            for (var b = new Array(a.length), c = 0; c < a.length; c++)
                b[c] = a[c];
            return b
        }
        function n(a, b) {
            return 4294967295 & a + b
        }
        function o() {
            function a(a, b, c, d) {
                var f = v;
                v = u,
                u = t,
                t = n(t, e(n(s, n(a, n(b, c))), d)),
                s = f
            }
            var b = p.length;
            p.push(128);
            var c = p.length % 64;
            if (c > 56) {
                for (var k = 0; 64 - c > k; k++)
                    p.push(0);
                c = p.length % 64
            }
            for (k = 0; 56 - c > k; k++)
                p.push(0);
            p = p.concat(d(8 * b));
            var m = 1732584193
              , o = 4023233417
              , q = 2562383102
              , r = 271733878
              , s = 0
              , t = 0
              , u = 0
              , v = 0;
            for (k = 0; k < p.length / 64; k++) {
                s = m,
                t = o,
                u = q,
                v = r;
                var w = 64 * k;
                a(f(t, u, v), 3614090360, j(p, w), 7),
                a(f(t, u, v), 3905402710, j(p, w + 4), 12),
                a(f(t, u, v), 606105819, j(p, w + 8), 17),
                a(f(t, u, v), 3250441966, j(p, w + 12), 22),
                a(f(t, u, v), 4118548399, j(p, w + 16), 7),
                a(f(t, u, v), 1200080426, j(p, w + 20), 12),
                a(f(t, u, v), 2821735955, j(p, w + 24), 17),
                a(f(t, u, v), 4249261313, j(p, w + 28), 22),
                a(f(t, u, v), 1770035416, j(p, w + 32), 7),
                a(f(t, u, v), 2336552879, j(p, w + 36), 12),
                a(f(t, u, v), 4294925233, j(p, w + 40), 17),
                a(f(t, u, v), 2304563134, j(p, w + 44), 22),
                a(f(t, u, v), 1804603682, j(p, w + 48), 7),
                a(f(t, u, v), 4254626195, j(p, w + 52), 12),
                a(f(t, u, v), 2792965006, j(p, w + 56), 17),
                a(f(t, u, v), 1236535329, j(p, w + 60), 22),
                a(g(t, u, v), 4129170786, j(p, w + 4), 5),
                a(g(t, u, v), 3225465664, j(p, w + 24), 9),
                a(g(t, u, v), 643717713, j(p, w + 44), 14),
                a(g(t, u, v), 3921069994, j(p, w), 20),
                a(g(t, u, v), 3593408605, j(p, w + 20), 5),
                a(g(t, u, v), 38016083, j(p, w + 40), 9),
                a(g(t, u, v), 3634488961, j(p, w + 60), 14),
                a(g(t, u, v), 3889429448, j(p, w + 16), 20),
                a(g(t, u, v), 568446438, j(p, w + 36), 5),
                a(g(t, u, v), 3275163606, j(p, w + 56), 9),
                a(g(t, u, v), 4107603335, j(p, w + 12), 14),
                a(g(t, u, v), 1163531501, j(p, w + 32), 20),
                a(g(t, u, v), 2850285829, j(p, w + 52), 5),
                a(g(t, u, v), 4243563512, j(p, w + 8), 9),
                a(g(t, u, v), 1735328473, j(p, w + 28), 14),
                a(g(t, u, v), 2368359562, j(p, w + 48), 20),
                a(h(t, u, v), 4294588738, j(p, w + 20), 4),
                a(h(t, u, v), 2272392833, j(p, w + 32), 11),
                a(h(t, u, v), 1839030562, j(p, w + 44), 16),
                a(h(t, u, v), 4259657740, j(p, w + 56), 23),
                a(h(t, u, v), 2763975236, j(p, w + 4), 4),
                a(h(t, u, v), 1272893353, j(p, w + 16), 11),
                a(h(t, u, v), 4139469664, j(p, w + 28), 16),
                a(h(t, u, v), 3200236656, j(p, w + 40), 23),
                a(h(t, u, v), 681279174, j(p, w + 52), 4),
                a(h(t, u, v), 3936430074, j(p, w), 11),
                a(h(t, u, v), 3572445317, j(p, w + 12), 16),
                a(h(t, u, v), 76029189, j(p, w + 24), 23),
                a(h(t, u, v), 3654602809, j(p, w + 36), 4),
                a(h(t, u, v), 3873151461, j(p, w + 48), 11),
                a(h(t, u, v), 530742520, j(p, w + 60), 16),
                a(h(t, u, v), 3299628645, j(p, w + 8), 23),
                a(i(t, u, v), 4096336452, j(p, w), 6),
                a(i(t, u, v), 1126891415, j(p, w + 28), 10),
                a(i(t, u, v), 2878612391, j(p, w + 56), 15),
                a(i(t, u, v), 4237533241, j(p, w + 20), 21),
                a(i(t, u, v), 1700485571, j(p, w + 48), 6),
                a(i(t, u, v), 2399980690, j(p, w + 12), 10),
                a(i(t, u, v), 4293915773, j(p, w + 40), 15),
                a(i(t, u, v), 2240044497, j(p, w + 4), 21),
                a(i(t, u, v), 1873313359, j(p, w + 32), 6),
                a(i(t, u, v), 4264355552, j(p, w + 60), 10),
                a(i(t, u, v), 2734768916, j(p, w + 24), 15),
                a(i(t, u, v), 1309151649, j(p, w + 52), 21),
                a(i(t, u, v), 4149444226, j(p, w + 16), 6),
                a(i(t, u, v), 3174756917, j(p, w + 44), 10),
                a(i(t, u, v), 718787259, j(p, w + 8), 15),
                a(i(t, u, v), 3951481745, j(p, w + 36), 21),
                m = n(m, s),
                o = n(o, t),
                q = n(q, u),
                r = n(r, v)
            }
            return l(r, q, o, m).toUpperCase()
        }
        var p = null
          , q = null;
        return "string" == typeof a ? p = k(a) : a.constructor == Array ? 0 === a.length ? p = a : "string" == typeof a[0] ? p = c(a) : "number" == typeof a[0] ? p = a : q = typeof a[0] : "undefined" != typeof ArrayBuffer ? a instanceof ArrayBuffer ? p = m(new Uint8Array(a)) : a instanceof Uint8Array || a instanceof Int8Array ? p = m(a) : a instanceof Uint32Array || a instanceof Int32Array || a instanceof Uint16Array || a instanceof Int16Array || a instanceof Float32Array || a instanceof Float64Array ? p = m(new Uint8Array(a.buffer)) : q = typeof a : q = typeof a,
        q && alert("MD5 type mismatch, cannot process " + q),
        o()
    }

##### 效果展示
![](1.png)
![](2.png)
