---
title: bat和shell命令(一)
date: 2020-11-13  20:58:16
updated: 
tags: bat命令、shell命令
categories: 分享
---

#### bat命令

    1. echo 和 @
        @ 用于隐藏@后面的命令，不会显示,
        echo 显示内容
        eg：@echo off 
    
    2.rem 和 ::
        文本注释
        eg：rem 注释作用
    
    3.pause
        暂停作用,需要按任意键才能继续
        eg: pause
        
    4. 
        /p 让你输入内容,相当于input()方法
        /a 相当于一个变量
        %变量名% 使用变量


   
        eg:
        @echo off
        set /p b=输入一个数字：
        echo %b% 
        set /a a=2*%b%
        echo %b%+%b%=%a%
        pause
    
        eg:两个数相加
        @echo off
        set /a var = 10
        set /a var2 =20
        set /a num = %var%+%var2%
        echo %num%
        pause
    
    5.goto 跳转到标记处
        :xxx 设置标记
    
        eg:
        @echo off
        :start
        set /a  num+=1
        echo %num%
        if %num% leq 4 goto start  :如果这个数小于等于4,会跳到标记处执行
        pause
    
    6.for 命令
    
        eg：
        @echo off
        for %%i in (ABC) do echo %%i    :: %%i 形式变量
        pause
        # result: ABC
        --------------------------
        # 搜索当前目录下有哪些文件
        @echo off
        for %%i in (*.*) do echo "%%i"
        pause
        ------------------------------
        # 搜索当前目录下所有的文本文件
        @echo off
        for %%i in (*.txt) do echo "%%i"
        pause
        ---------------------------------
        @echo off
        for  %%I in (A,B,C) do echo %%I
        pause
        # result：
        A
        B
        C
        -------------------------------------
        
       equ（等于） neq（不等于） lss（小于） leq（小于等于） gtr（大于）geq（大于等于)



#### shell命令

    1.定义变量
        1. 变量名 = 变量值
        2. 变量名 = '变量值'
        3. 变量名 = "变量值"
    习惯：
        数字不加引号，其它的都加引号
        
    2.全局变量
     方式一、
        变量名 = 变量值
        export 变量
     方法二、
        export 变量名 = 变量值
      查看
        echo $变量名   or  echo ${变量名}
       取消变量
       unset 变量名
       
    3. 内置变量
        $0 获取脚本的名称
        $n 获取当前脚本第N个值,如果N>=10,需要用括号括起来 ${n}
        $# 获取参数的个数
        $? 返回命令执行的结果(0为成功,非0为失败)
    
        eg:  vi demo.sh
    
          #!/bin/bash
          echo "脚本名称:" $0
          echo "第一个位置参数是:" $1
          echo "第二个位置参数是:" $2
          echo "总共有:" $# "个参数"
    
          输入:
            sh demo.sh haha 2333
    
          结果：
            脚本名称: demo.sh
            第一个位置参数是: haha
            第二个位置参数是: 2333
            总共有: 2 个参数


​    
​        











