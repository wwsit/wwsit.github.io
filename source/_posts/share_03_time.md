---
title: 时间比较和怎么转成时间戳
date: 2020-4-18 20:01:26
updated: 2020-4-18 20:56:20
tags: 分享
categories: 分享
---


    import time
    from datetime import datetime
    
    # 获取当前时间
    now_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print("现在时间:%s" % now_time)
    
    # 目标时间
    target_time = '2020-04-16 20:27:41'
    print("目标时间:%s " % target_time)
    
    # 转换成时间戳
    s_now_time = time.mktime(time.strptime(now_time, '%Y-%m-%d %H:%M:%S'))
    s_target_time = time.mktime(time.strptime(target_time, '%Y-%m-%d %H:%M:%S'))
    
    # time.strptime(string, format) 根据指定格式把一个时间字符串解析成时间元组
    # time.mktime(p_tuple) 返回用秒表示的浮点数
    
    print(s_target_time)
    print(s_now_time)
    
    # 进行比较
    result = s_now_time - s_target_time
    print("结果:%s" % result)
    
    # 或者直接比较
    if now_time > target_time:
        print('现在的时间大:%s' % now_time)
    else:
        print('目标时间大:%s' %target_time)

![](1.PNG)