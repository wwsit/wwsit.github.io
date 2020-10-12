---
title: Appiun的安装(windows环境)
date: 2019-10-27 15:12:20
updated: 2019-10-27 16:38:26
tags: 测试
categories: 测试
---

#### 所需安装包
      java jdk1.8
      Android sdk
      andorid模拟器(这里用夜神模拟器)
     
      所需安装包：
      链接：https://pan.baidu.com/s/1Mg9ciUFmmLMcDTxnZ4Z2WQ 
      提取码：vair 

  
#### 安装java  jdk
    1.运行jdk-8u151-windows-x64.exe⽂件,默认安装即可
![](1.png)
    
    2.配置java环境变量
    进入我的电脑-->属性-->高级系统设置--->环境变量
    在系统变量下点击新建 -> 变量名: JAVA_HOME -> 变量值: C:\Program Files (x86)\Java\jdk1.8.0_161
    添加 CLASSPATH 变量名--->变量值:  .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;   (开头的.;符号和结尾;符号必须加)
    在 Path变量里添加   %JAVA_HOME%\bin   和  %JAVA_HOME%\jre\bin
![](2.png)
![](3.png)
![](4.png)
     
    3. 验证环境变量
    1.打开dos 快捷键win+r
    2.输入java -version
    出现下图,说明安装成功
![](5.png)

#### 安装Android sdk 
    注意:路径中不要有中文, 确保文件夹下有一下两个文件
![](6.png)

    配置到系统环境变量下.
    在系统变量下点击新建 -> 变量名: ANDROID_HOME -> 变量值: E:\android-sdk -> 点击确定按钮
    在系统变量下找到系统的path变量，最后添加 E:\android-sdk\platform-tools  和  E:\android-sdk\tools
![](4.png)

    验证环境变量是否配置成功
    在dos中输入adb指令,如下图配置成功 
![](7.png)
    

#### 安装andorid模拟器
    运行  nox_setup_v6.3.0.6_full.exe (夜神模拟器)
    将 android-sdk\platform-tools里的adb.exe文件 复制两份
    分别起名 nox_adb.exe 和 adb.exe
    然后将这两个文件复制到 yeshen\Nox\bin 下  (夜神模拟器bin目录下  进行替换)
    
![](8.png)

#### Appium环境搭建
    运行appium-desktop-Setup-1.2.7.exe，默认安装即可
    启动客户端，按图⽚步骤 1 -> 2 -> 3 -> 4 设置
![](9.png)

#### 安装nodejs
    nodejs:官网下载地址: https://nodejs.org/en/download/
    安装完成后 命令行运行npm或node -v 来查看是否安装成功,如下图:
![](10.png)
    
    安装cnpm
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    npm国内一般被墙，所以选择淘宝镜像安装,官网:http://npm.taobao.org
    cnpm安装appium
    cnpm install -g appium
    启动appium服务
    在dos中输入  appium
![](11.png)
    
    Appium-python库安装
    安装命令: pip install Appium-Python-Client
     
 
#### 启动流程
    先运行appium
    在运行夜神模拟器


#### 会遇到的一些问题
![](12.png)
![](13.png)

    大致解决方案：
    查看开发者模式是否打开
    模拟器是否有启动
    或则重启打开