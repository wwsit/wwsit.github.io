---
title: Pandas命令(一)
date: 2019-11-5 19:26:18
updated: 2019-11-5 20:14:51
tags: 机器学习
categories: 机器学习
---

    # DataFrame的创建
    pd.DataFrame(data=None, index=None, columns=None)
    S
    # 生成10名同学，5门功课的数据
    score = np.random.randint(40, 100, (10, 5))
    df = pd.DataFrame(score)
    
    ## 增加行、列索引
    # 构造行索引序列
    subjects = ["语文", "数学", "英语", "政治", "体育"]
    # 构造列索引序列
    stu = ['同学' + str(i) for i in range(score_df.shape[0])]
    # 添加行索引
    data = pd.DataFrame(score, columns=subjects, index=stu)
    
    data.shape  # 维度大小
    data.index # DataFrame的行索引列表
    data.columns # DataFrame的列索引列表
    data.values # 直接获取其中array的值
    head(5)：显示前5行内容  如果不补充参数，默认5行。填入参数N则显示前N行
    tail(5):显示后5行内容  如果不补充参数，默认5行。填入参数N则显示后N行
    

    # 判断是否有空置 
     df.isnull() 
    
    # 缺省值个数
    df.isnull().sum() 
    
    
    # 删除缺省值所在的那行数据   axis = 1  删除的是那列数据 
    df.dropna(axis = 0) 
    
    # 读取文件乱码
    加个 encoding='UTF-8'
	pd.read_json(path,  encoding='UTF-8')
	
	# 去重
	new_df = pf.drop_duplicates(subset=None,keep='first',inplace=False)
	说明：
	subset : column label or sequence of labels, optional 
	当subset=None,默认按照所有列进行去重   
	用来指定特定的列，默认所有列
    keep : {‘first’, ‘last’, False}, default ‘first’ 
    删除重复项并保留第一次出现的项
    inplace : boolean, default False 
    是直接在原来数据上修改还是保留一个副本
    
    # 统计出现次数    
    a = ['a','v',1,1,3,'a']
    result = pd.value_counts(a)
    print(result)
    
       
        