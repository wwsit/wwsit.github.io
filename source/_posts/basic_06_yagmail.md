---
title: Python实现发邮件功能
date: 2020-6-11 9:57:51
updated:  
tags: 基础
categories: 基础
---

#### 一、前提步骤  先获取163邮箱的授权码

![](1.PNG   )
![](2.png)


####  二、代码


    import yagmail
    
    to_send = '*******@163.com'  # 发件人的邮箱
    passwd = '*******'  # 163邮箱授权码
    host = 'smtp.163.com'  # 发送的主机
    yag = yagmail.SMTP(user=to_send, password=passwd, host=host)
    
    # 直接发送HTML内容
    # 读取邮件模板
    file_object = open('./report.html')
    try:
        contentsbody = file_object.read()
    finally:
        file_object.close()
    contents = contentsbody
    
    # 收件人
    to_receive = '*******@163.com'   # 也可以发往QQ邮箱
    # 标题
    subject = '测试报告'
    # 附件内容
    fujian = ['./report.html']  # 文件的路径
    # yag.send(to=to_receive, subject=subject, contents=contents)
    yag.send(to_receive, subject, contents, fujian)


#### 三、效果展示
![](3.png)
![](4.png)