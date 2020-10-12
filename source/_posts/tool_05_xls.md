---
title: Python 与 excel表格的操作
date: 2020-1-12 15:04:53
updated: 2020-1-12 15:20:38
tags: 分享
categories: 分享
---

#### 需要安装的模块
   
    pip install xlwt     写入数据
    pip isntall xlrd     读取数据
    pip install xlutils  追加数据
    对于已有的excel文件，想要追加或者修改，只能通过 xlutils模块 进行操作，
    xlutils模块 也仅仅是通过复制一个副本进行操作后保存

#### 操作

    # -*- coding: UTF-8 -*-
    # !/usr/bin/python
    import xlwt
    import xlrd
    from xlutils.copy import copy
    
    # --- 写入文件 ---
    
    # 设置编码 创建对象
    workbook = xlwt.Workbook(encoding='utf-8')
    # 添加sheet(工作表)
    worksheet = workbook.add_sheet('节日')
    # 添加一个单元格不会报错 cell_overwrite_ok=True
    worksheet_1 = workbook.add_sheet('人名', cell_overwrite_ok=True)
    
    # 添加行列
    worksheet.write(0, 0, '名称')  # 第一行第一列
    worksheet.write(0, 1, '时间')  # 第一行第二列
    worksheet.write(1, 0, '元旦')  # 第二行第一列
    worksheet.write(1, 1, '1-1')  # 第二行第二列
    worksheet.write(2, 0, '五一')
    worksheet.write(2, 1, '5-1')
    
    worksheet_1.write(0, 0, '名称')
    worksheet_1.write(0, 1, '年龄')
    worksheet_1.write(1, 0, '张三')
    worksheet_1.write(1, 1, ' 18')
    worksheet_1.write(2, 0, '李四')
    worksheet_1.write(2, 1, ' 19')
    
    # 保存
    # workbook.save('./festival.xls')

    
![](1.png)
![](2.png)

    # ----读取文件 ------
    
    workbook = xlrd.open_workbook('./festival.xls')
    # 读取sheet标题
    print('sheet的标题:%s' % workbook.sheet_names())

![](3.png) 
   
    
    # 根据sheet索引或者名称获取sheet内容
    data_sheet = workbook.sheets()[0]
    data_name = workbook.sheet_by_name(u'人名')
    
    # 获取sheet名称、行数和列数
    print('sheet的名称:%s---有%s行---%s列' % (data_sheet.name, data_sheet.nrows, data_sheet.ncols))
    
![](4.png)     

    #获取整行和整列的值（列表）
    rows = data_sheet.row_values(0)  # 获取第一行数据
    cols = data_sheet.col_values(1)  # 获取第二列数据
    print(rows)
    print(cols)
    
![](5.png) 
    
    # 获取单元格的内容
    cell_a = data_sheet.cell(0, 0).value # 获取第一个单元格内容
    cell_b = data_sheet.cell(1, 0).value  # 获取第二个单元格内容
    print(cell_a)
    print(cell_b)
 
![](6.png) 
 
    
    # ----- xlutils -----------
    
    import xlrd
    import xlwt
    from xlutils.copy import copy
    
    # 打开excel
    workbook = xlrd.open_workbook('./festival.xls')
    # 将xlrd的对象转化为xlwt的对象
    new_excel = copy(workbook)
    # 获取想要操作的sheet
    data_sheet = new_excel.get_sheet(0)
    # 获取原来有多少行
    rows = data_sheet.get_rows()
    print(len(rows))

    data_sheet.write(3, 0, '儿童节')
    data_sheet.write(3, 1, '6-1')
    data_sheet.write(4, 0, '国庆')
    data_sheet.write(4, 1, '10-1')
   
    new_excel.save('./festival.xls')
![](7.png) 


##### 更多教程 请参考 [点我](https://blog.csdn.net/weixin_42246511/article/details/100808648)