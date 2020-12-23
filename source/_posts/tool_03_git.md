---
title: git命令
date: 2019-11-2 14:02:10
updated: 2019-11-2 14:20:23
tags: 分享
categories: 分享
---

#### Git介绍
    Git 是目前世界上最先进的分布式版本控制系统
    方便多人协同开发
    方便版本控制
    
#### git 常用命令
    
    # 克隆项目
    git clone 项目地址
    
    # 工作区添加到暂存区
    git add 项目名
    
    # 暂存区提交到仓库区
    git commit -m '给本次提交 起名字'
    
    # 推送到远程仓库
    git push
    
    # 在本地创建一个dev分支
    git checkout -b  dev
    
    # 将本地的dev分支推送到远程
    git push -u origin dev
    
    # 查看当前处于分支情况
    git branch
    
    # 每次开发前拉取最新代码 
    git pull
    
    # 合并 dev 分支内容
    git merge dev 

#### 用的比较少的命令

    # 如果在每次 push 都需要设置账号与密码，那么可以设置记住密码
    设置记住密码（默认15分钟）：
    git config --global credential.helper cache
    如果想自己设置时间，可以这样做(1小时后失效)：
    git config credential.helper 'cache --timeout=3600'
    长期存储密码：
    git config --global credential.helper store
    
    # 版本回退
    git reset --hard 版本号
     
    # 查看当前仓库地址
    git remote -v
    git remote show origin
    
    # 将本地文件提交到远程仓库
    1.本地初始化 git init
    2.---git remote add origin  <仓库的url>
	eg:git remote add origin   https://github.com/xiaobaiwws/-.git

    3.--git push origin <branch 分支名 >
	eg:git push origin master  （已经存在的分支）
	or git push -u origin wws （新建一个分支）
	
	# 删除本地dev分支
	git branch -d dev 
	
	# 删除远程dev缓存分支
	git branch -dr dev 
