---
title: shell命令(二)
date: 2020-11-22  11:18:10
updated: 
tags: shell命令
categories: 分享
---

#### 本篇内容：
            
           计算表达式、符号、if语句、循环语句
            tip：  '=='号两边需要有空格，
                    '='号两边不需要空格
    
      
#### 具体内容

    1.计算表达式
    方式一
        $((计算表达式))  只能做 +-*/ ()运算，并且只能做整数运算,否则会报错
        eg: echo $((5-1))
        eg: echo $((5*5))
        
    方式二 
        let 计算表达式
        let 变量名=数值+数值
        eg:
            i=1
            let i = i+9
            ehco $i
        result:10
        
        eg:
            a=3
            let a=10+20
            echo $a
         result:30
    
    
    
    2.符号&命令
        等待 sleep
        eg: 等待2s  sleep 2
        
        & 将一个命令从前台转到后台   
        1 代表正确输出的信息
        2 代表错误输出的信息
        2>&1 代表所有输出信息    
        eg:
            sh demo.sh 2>&1 >> ./demo.txt 
        
        查看当前系统环境支持的shell
            cat /etc/shells
            
         判断两个数值关系
            n1 -eq n2  等于
            n1 -gt n2  大于
            n1 -lt n2  小于
            n1 -ne n2  不等于
         
         字符串比较
           == ,！=
           
    
    3. if 语句
         # 单分支:
                if [ 条件 ]
                then
                    指令
                fi 
          eg:
            if [ $1 == "nan" ]
            then
                echo "你是男的"   
                
          
         # 双分支:
            if [ 条件 ]
            then 
                指令1
            else
                指令2
            fi
            
            eg:
            if [ $1 -eq $2]
            then
                echo 两个数相等
            else
                echo 两个数不相等
            fi
            
            执行:sh demo.sh 2 3
            result: 两个数不相等
            
    
        # 多分支
        
            if [ $1 == "nan" ]  # == 两边需要有空格
            then 
                echo "你是男性"
            elif [ $1 == "nv"]
            then 
                echo "你是女性"
            else
                echo "性别未知"
            fi
            
            执行: sh demo.sh nan
            result: 你是男性
    
            
    4. 循环语句
       # for 
        语法格式:
            for 值 in 列表
            do
                执行语句
            done
            
            eg: 打印 /root目录下所有内容
            for i in $(ls /root)
            do
                echo ${1}
            done
      
      # while
            while 条件
            do
                执行语句
            done
    
    
#### 练习

        # 1.
             name='x i a o b a i'  # =两边不能有空格
             for i in $name
             do
                echo $i
             done
             
             说名:以空格进行拆分
             result: x
                     i
                     a
                     o
                     ....
             
             
         # 2.
             if [ $1 == 10 ]
             then
                echo '你猜对了'
             elif [ $1 -gt 10 ]
             then
                echo '你猜的数字大了'
             else
                echo '你猜的数字小了'
             fi
    
        # 3.
            a=1
            while [ "${a}" -lt 5 ]
            do
            echo "${a}"
            a=$((a+1))  # 一个等号两边不能有空格
            done   
            
       # 4.
            a=$1
            while [ $a -gt 5 ]
            do
               echo $a
               a=$(($a-1))
            done                          
        
                
                        
            











