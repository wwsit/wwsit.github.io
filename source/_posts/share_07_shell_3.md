---
title: shell命令(三)
date: 2020-11-29  16:31:15
updated: 
tags: shell命令
categories: 分享
---

##### 本篇内容：
            函数使用/调用
            grep、sed、awk、find
          
    __
      
##### 具体内容

        # 函数
        
        #!/bin/bash
        fun(){
            echo '我被调用了'
        }
        fun
        ---------------------------
        # 传递参数
        fun(){
            echo '我被调用了' $1
        }
        
        fun $1
        
    
    # grep
    一个文本搜索命令
    
    参数
        -r  输出匹配到的行 
        -c  只输出匹配到的行 的个数
        -n  显示匹配行内容和行数
        -v  显示不匹配的内容
        
     eg: demo.txt
            cat demo.txt:
                    aaa
                    bbb
                    ccc
                    aaa
                    vvv
                    aaaabbb
                    aabbaabba
                    aaa
            
            grep -c aaa demo.txt 
            result : 4
            
            grep -n aaa demo.txt
            result:
                 1:aaa
                 4:aaa
                 6:aaaabbb
                 8:aaa   
                 
            grep -v aaa demo.txt
            result:
                bbb
                ccc
                vvv
                aabbaabba
                
            grep -r aa demo.txt
            result:
                aaa
                aaa
                aaaabbb
                aabbaabba
                aaa
    
    
    # sed 行文件编辑工具
    
        a 在匹配到的内容下一行增加内容
        i 在匹配到的内容当前行增加内容
        d 删除匹配到的内容
        s 替换匹配到的内容
        p 查看指定内容
        
        -n 取消静默输出
        -i 对文件进行编辑
        
        
       # cat demo.txt
            nihao1 seb1 seb2  seb3  seb4
            nihao2 seb5 seb6  seb7  seb8
            nihao2 seb5 seb6  seb7  seb8
        
        eg：sed -n '2p' demo.txt  # 打印第二行的内容
        result:  nihao2 seb5 seb6  seb7  seb8
        
        eg：sed -n '1,2p' demo.sh  # 打印第1~2行的内容
        result:  nihao1 seb1 seb2  seb3  seb4 
                 nihao2 seb5 seb6  seb7  seb8
                 
        格式: sed -i 's#要替换的内容#新内容#' 文件名
        eg:替换  每行开头第一个单词
        sed -i 's#seb#SEB#' demo.txt
        cat demo.txt
        result:
            nihao1 SEB1 seb2  seb3  seb4
            nihao2 SEB5 seb6  seb7  seb8
            nihao3 SEB9 seb10 seb11 seb12 
        
        eg:替换  所有的单词
        sed -i 's#seb#SEB#g' demo.txt
        cat demo.txt
        result:
            nihao1 SEB1 SEB2  SEB3  SEB4
            nihao2 SEB5 SEB6  SEB7  SEB8
            nihao3 SEB9 SEB10 SEB11 SEB12 
        
        eg:替换 指定行第一个单词
        seb -i '2s#seb#SEB#' demo.txt  # 替换第二行第一个单词
        cat demo.txt
        result:
            nihao1 seb1 seb2  seb3  seb4
            nihao2 SEB5 seb6  seb7  seb8
            nihao3 seb9 seb10 seb11 seb12 
        
        eg：替换 指定每行第二个单词
        sed -i 's#seb#SED#2' demo.txt
        cat demo.txt
        result 
            nihao1 seb1 SED2  seb3  seb4
            nihao2 seb5 SED6  seb7  seb8
            nihao3 seb9 SED10 seb11 seb12 
        
        sed -i 行号a\内容 文件名  在多少行下面添加内容
        eg:  sed -i '2a\haha' demo.txt  # 在第二行下面添加haha内容
        eg   sed -i '1,3a\haha' demo.txt # 在第1行和第3行下面
        
        # 删除
        sed -i '行号d' 文件名  删除指定的行
        sed -i '1,3d' 文件名  删除多行
        
        
    # awk 文档编辑工具
       eg: awk '{print $1}' 文件名 # 打印第一列的内容
       
    # 列出当前目录中大于500字节的信息
     ls -l | awk '{if (($5>=500)) print "\n" "文件: " $9 "\n" "大小: " $5 "B" "\n"}







