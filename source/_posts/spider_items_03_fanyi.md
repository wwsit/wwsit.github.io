---
title: 爬虫 实现中英文翻译
date: 2020-04-03 20:03:05
updated: 2020-04-03 21:28:17
tags: 爬虫
categories: 爬虫项目
---

#### 爬取内容
     实现中英文翻译

        
#### 示例代码
        
        
        import js2py
        import requests
        import re
        
        def input_zh_en(word):
            """自动识别中英文语言"""
        
            # 提取第一个字符
            first_word = word[0]
            lower_word = first_word.lower()
        
            if lower_word.encode('UTF-8').isalpha():
                print('***翻译类型：英文--->中文***')
                start = 'en'
                end = 'zh'
                return start, end
            else:
                print('***翻译类型：中文--->英文***')
                start = 'zh'
                end = 'en'
                return start, end
        
        
        class FanYiSpider():
        
            def __init__(self, query, start, end):
                self.query = query
                self.start = start
                self.end = end
                self.url = 'https://fanyi.baidu.com/v2transapi'
                self.headers = {
                    "cookie": "PSTM=1585755055; BAIDUID=6A16072D0A6C3F4164481386F331EE45:FG=1; BIDUPSID=B929053A339387396FB97CD27AEDB008; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; H_PS_PSSID=30963_1447_31123_21091_30826_31187_30824_31163; delPer=0; PSINO=7; __yjsv5_shitong=1.0_7_83e8171872d436824f0e08a401f686e1c545_300_1585993564091_223.104.63.193_a8785d9e; Hm_lvt_afd111fa62852d1f37001d1f980b6800=1585995580; Hm_lpvt_afd111fa62852d1f37001d1f980b6800=1585995580; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1585969517,1585993643,1585993672,1585995580; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1585995580; yjs_js_security_passport=cd6ce785cd904d1df137d586f6eb9de2670cb61f_1585995477_js",
                    "user-agent": "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Mobile Safari/537.36",
                }
        
            def execute_js(self):
                """执行js文件"""
                context = js2py.EvalJs()
                with open('./fanyi.js', 'r', encoding='utf-8') as f:
                    context.execute(f.read())
                sign = context.e(self.query)
        
                data = {
                    "from": self.start,
                    "to": self.end,
                    "query": self.query,
                    "sign": sign,
                    "token": "09c51992657cb9fb60b6dd5cee144ddc",
                    "domain": "common",
                    "simple_means_flag": "3"
                }
                return data
        
            def run(self):
                data = self.execute_js()
                resp = requests.post(url=self.url, headers=self.headers, data=data)
                # 将unicoude编码转成正常类型
                # print(json.loads(resp.text))
                print('翻译结果为：%s' % resp.json()['trans_result']['data'][0]['dst'])
                print('*' * 66)
                print(' ')
                pass
        
        
        def main():
            while True:
        
                print('***默认自动翻译,如需中文转英文请输入:zh, 英文转中文请输入:en ***')
                word = input('请输入单词:')
                start = 'en'
                end = 'zh'
        
                if word == 'y':
                    print('程序结束')
                    break
        
                if word == 'zh':
                    start = 'zh'
                    end = 'en'
                    print('***将进行:中文转成英文***')
                    word = input('请输入单词:')
        
                elif word == 'en':
                    start = 'en'
                    end = 'zh'
                    print('***将进行:英文转成中文***')
                else:
                    start, end = input_zh_en(word)
                print('如需结束请输入:y,否则继续翻译')
        
        
                user = FanYiSpider(word, start, end)
                user.run()
        
        main()



#### js代码
    function n(r, o) {
        for (var t = 0; t < o.length - 2; t += 3) {
            var e = o.charAt(t + 2);
            e = e >= "a" ? e.charCodeAt(0) - 87 : Number(e),
            e = "+" === o.charAt(t + 1) ? r >>> e : r << e,
            r = "+" === o.charAt(t) ? r + e & 4294967295 : r ^ e
        }
        return r
    }
    
     function e(r) {
            var i = '320305.131321201'  // 需自己添加
            var o = r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g);
            if (null === o) {
                var t = r.length;
                t > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(t / 2) - 5, 10) + r.substr(-10, 10))
            } else {
                for (var e = r.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/), C = 0, h = e.length, f = []; h > C; C++)
                    "" !== e[C] && f.push.apply(f, a(e[C].split(""))),
                    C !== h - 1 && f.push(o[C]);
                var g = f.length;
                g > 30 && (r = f.slice(0, 10).join("") + f.slice(Math.floor(g / 2) - 5, Math.floor(g / 2) + 5).join("") + f.slice(-10).join(""))
            }
            var u = void 0
              , l = "" + String.fromCharCode(103) + String.fromCharCode(116) + String.fromCharCode(107);
            u = null !== i ? i : (i = window[l] || "") || "";
            for (var d = u.split("."), m = Number(d[0]) || 0, s = Number(d[1]) || 0, S = [], c = 0, v = 0; v < r.length; v++) {
                var A = r.charCodeAt(v);
                128 > A ? S[c++] = A : (2048 > A ? S[c++] = A >> 6 | 192 : (55296 === (64512 & A) && v + 1 < r.length && 56320 === (64512 & r.charCodeAt(v + 1)) ? (A = 65536 + ((1023 & A) << 10) + (1023 & r.charCodeAt(++v)),
                S[c++] = A >> 18 | 240,
                S[c++] = A >> 12 & 63 | 128) : S[c++] = A >> 12 | 224,
                S[c++] = A >> 6 & 63 | 128),
                S[c++] = 63 & A | 128)
            }
            for (var p = m, F = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(97) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(54)), D = "" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(51) + ("" + String.fromCharCode(94) + String.fromCharCode(43) + String.fromCharCode(98)) + ("" + String.fromCharCode(43) + String.fromCharCode(45) + String.fromCharCode(102)), b = 0; b < S.length; b++)
                p += S[b],
                p = n(p, F);
            return p = n(p, D),
            p ^= s,
            0 > p && (p = (2147483647 & p) + 2147483648),
            p %= 1e6,
            p.toString() + "." + (p ^ m)
        }

#### 效果展示
![](1.PNG)