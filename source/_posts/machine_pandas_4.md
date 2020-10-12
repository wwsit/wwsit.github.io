---
title: Pandas命令(二)
date: 2019-11-5 21:00:12
updated: 2019-11-5 21:40:41
tags: 机器学习
categories: 机器学习
---

    # 生成一个DataFrame
    
    import pandas as pd
    import numpy as np
    
    # 生成一个 3行4列  取值范围在 [-1，5)之间的数据
    array = np.random.randint(-1, 5, size=(3,4))
    df = pd.DataFrame(array)

![](./1.png)
    
    # 打印想要的列数或者调整列的位置
    # 打印第1,3列的内容
    print(df[[1,3]])
![](./2.png)

    # 更改列索引值  字典格式
    df = df.rename(columns={0:'A',1:'B',2:'C',3:'D',})
    or：
    df.columns=['A','B','C','D']
![](./3.png)

    # 打印列索引值
    df.columns
![](./4.png)
    
    # 更改行索引值
    stu=['stu_1','stu_2','stu_3']
    df.index=stu
    # 打印行索引值
    df.index
![](./5.png)

    
    # 生成NaN值   将所有 0 替换成NaN值
    df = df.replace(to_replace=0, value=np.nan)
![](./6.png)


    # 删除缺省值
    DataFrame.dropna(axis=0, how='any', thresh=None, subset=None, inplace=False)
         axis:维度，axis=0表示index行,  axis=1表示columns列，默认为0
         how:"all"表示这一行或列中的元素全部缺失（为nan）才删除这一行或列，"any"表示这一行或列中只要有元素缺失，就删除这一行或列
         thresh:一行或一列中至少出现了thresh个才删除。
         subset：在某些列的子集中选择出现了缺失值的列删除，不在子集中的含有缺失值得列或行不会删除（有axis决定是行还是列）
         inplace：是存为副本还是直接在原数据上进行修改。

    df.dropna(axis=1) # 删除列
    df.dropna(axis=0) # 删除行
![](./7.png)
    
     df.dropna(axis=0,subset=['D']) 删除D存在缺省数据 的那行数据
     df.dropna(axis=0,subset=['C',D']) 删除C,D存在缺省数据 的那行数据
![](./8.png)