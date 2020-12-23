---
title: Django创建子应用
date: 2019-10-2 21:10:19
updated: 2019-8-20 21:35:21
tags: Django
categories: 后端
---

#### 创建子应用命令
    
    python manage.py startapp 子应用名称
    eg:
    python manage.py startapp users

执行后，可以看到工程目录中多出了一个名为users的子目录。
查看此时的工程目录，结构如下
![](/1.PNG)
* admin.py 文件跟网站的后台管理站点配置相关。
* apps.py 文件用于配置当前子应用的相关信息。
* migrations 目录用于存放数据库迁移历史文件。
* models.py 文件用户保存数据库模型类。
* tests.py 文件用于开发测试用例，编写单元测试。
* views.py 文件用于编写Web应用视图。

注册安装子应用

    创建出来的子应用目录文件虽然被放到了工程项目目录中，
    但是django工程并不能立即直接使用该子应用，需要注册安装后才能使用。
    
    在工程配置文件settings.py中，INSTALLED_APPS项保存了工程中已经
    注册安装的子应用，初始工程中的INSTALLED_APPS如下：
    
    注册安装一个子应用的方法，即是将子应用的配置信息文件apps.py中的
    Config类添加到INSTALLED_APPS列表中。

    例如，将刚创建的users子应用添加到工程中，可在INSTALLED_APPS列表
    中添加'users.apps.UsersConfig'。
![](/2.png)
