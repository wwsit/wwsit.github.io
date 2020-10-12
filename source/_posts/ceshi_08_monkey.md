---
title:  Monkey测试
date: 2019-12-15 19:40:28
updated: 2019-12-15 20:51:20
tags: 测试
categories: 测试
---


#### Monkey测试

    “猴子测试”是指没有测试经验的人 甚至对计算机根本不了解的人（就像猴子一样），不需要知道程序任何方面的知识，
    如果给他一个程序，他就会针对他看到的界面进行操作，其操作是无目的的、乱点乱按的。
    这种测试方式在产品周期中的早期阶段会找到很多很好的bug，为用户节省不少的时间
    
    它是Android系统自带一个命令行工具，可以运行在模拟器里或者真是设备中运行。
    monkey向系统发送伪随机的用户事件流，实现对正在开发的应用程序进行压力测试。
 
 
#### 命令
    
    # 查看帮助命令
    adb shell monkey --help
    
    adb shell monkey -p 包名 -v  需要运行的次数
    
#### Monkey命令参数
    
      -s <seed>
      伪随机数生成seed值。如果用相同的seed值再次运行Monkey，它将生成相同的事件序列
      
      --throttle <milliseconds>
      在事件之间插入固定延迟。通过这个选项可以减缓Monkey的执行速度。如果不指定该选项，Monkey将不会被延迟，事件将尽可能快地被产成。一般业内标准是每秒操作2-3次，
       
        
      #各种事件
    
        0：点击事件百分比，即参数--pct-touch
        1：滑动事件百分比，即参数--pct-motion
        2：缩放事件百分比，即参数--pct-pinchzoom
        3：轨迹球事件百分比，即参数--pct-trackball
        4：屏幕旋转事件百分比，即参数--pct-rotation
        5：基本导航事件百分比，即参数--pct-nav
        6：主要导航事件百分比，即参数--pct-majornav
        7：系统按键事件百分比，即参数--pct-syskeys
        8：Activity启动事件百分比，即参数--pct-appswitch
        9：键盘唤出隐藏事件百分比，即参数--pct-flip
        10：其他事件百分比，即参数--pct-anyevent
        
        eg:
        adb shell monkey -p com.android.browser --pct-motion 80  -v  2000> monkey_log.txt
        启动浏览器2000次  其中滑动事件占 80%,并输出日志
    
#### 报错单词解释
    ANR   应用程序无响应（ANR：Application Not Responding
    Crash  崩溃
    
#### monkey更多介绍请参考
    https://blog.csdn.net/github_2011/article/details/79031339