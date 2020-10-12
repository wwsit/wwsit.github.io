---
title:  ADB常用命令
date: 2019-10-27 18:31:22
updated: 2019-10-27 16:56:15
tags: 测试
categories: 测试
---

> ADB全名Andorid Debug Bridge。 是一个Debug工具。为何称之为Bridge呢? 
  因为adb是一个标准的C/S结构的工具, 是要连接开发电脑和调试手机的

#### ADB常用命令
    
    # 获取设备号
    adb devices
    
    # 获取当前正在运行的应用包名
    adb shell dumpsys window | findstr mCurrentFocus
    
    # 获取app启动包名和启动名(⚠手机需要先打开对应app)
    adb shell dumpsys window windows | findstr mFocusedApp
    
    # 获取系统版本
    adb shell getprop ro.build.version.release

    # 启动adb 服务
    adb start-server
    
    # 关闭adb 服务
    adb kill-server
    
    # 发送文件到手机
    adb push 电脑端⽂件路径/需要发送的文件,手机端存储的路径
    adb push C:\Users\win\Desktop\xx.png /sdcard
    
    # 从手机拉取文件
    adb pull 手机端的路径/拉取文件名 电脑端存储文件路径
    adb pull /sdcard/xx.png C:\Users\win\Desktop
    
    # 查看手机运行日志
    adb logcat
    
    # 安装app到手机
    adb install 路径/xxx.apk
    
    # 卸载手机app
    adb uninstall app
    
    # 进入到手机终端
    adb shell  /   adb -s 设备id  shell(有多台设备)
        
    # 获取app启动时间
    adb shell am start -W 包名/.启动名
    
    # 列出手机装的所有app的包名： 
    adb shell pm list packages
    
    # 列出系统应用的所有包名： 
    adb shell pm list packages -s
    
    # 列出除了系统应用的第三方应用包名： 
    adb shell pm list packages -3 
    
    # 查看屏幕分辨率 
    adb shell wm size 
    
    # 获取应用的Pid值
    adb shell ps | findstr 包名
    
    # 获取想要的text内容
    result = d(text='版本号').right(resourceId='android:id/summary').info.get('text')
    获取'版本号'右边 resourceId是'android:id/summary' 的text内容，还可以获取down()、up()、left()的值
    
    # 进行滑动
    adb shell input swipe x1 y1 x2 y2 v(多久完成，该值越大，速度越慢)
    adb shell input swipe 600 1500 600 700 10
    
    # 查看手机储存
    adb shell df(单位是KB)   or  adb shell df -h  (将单位转成G)
    
    # 查看手机内存
    adb shell dumpsys meminfo 
    adb shell cat /proc/meminfo
    
    # 模拟键盘输入
    adb shell input keyboard text 'aa'(只能输入ASCII中的字符，无法输入中文)
    
    # 模拟点击指定的位置
    adb shell input tap x y
    
    # 出现remote Read-only file system
    先进行手机终端 adb shell
    然后在命令行输入 mount -o remount -w /
    
    # 当Uiauutomator.bat工具用不了 ,进行图片导入
    1.截取uix资源文件
    adb shell uiautomator dump /sdcard/screen.uix
    adb pull /sdcard/screen.uix D:/screen.uix
    
    2.截取截图
    adb shell screencap -p /sdcard/screen.png
    adb pull /sdcard/screen.png D:/screen.png
    
    # adb shell input keyevent 数字
    数字对应的按键事件可以参考:

[点我吧](https://blog.csdn.net/qq_39697254/article/details/83017265)