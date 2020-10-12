---
title:  appium 常用命令
date: 2019-11-21 12:49:22
updated: 2019-11-21 13:23:10
tags: 测试
categories: 测试
---

#### 常用定位方式
* 前置代码


    from appium import webdriver
    # server 启动参数
    desired_caps = {}
    # 设备信息
    desired_caps['platforName'] = 'Android'   #平台名称
    desired_caps['paltformVersion'] = '5.1'    #平台版本
    desired_caps['deviceName'] = '192.168.56.101:5555'  #设备号
    # app信息
    desired_caps['appPackage'] = 'com.android.settings'  #应用的包名
    desired_caps['appActivity'] = '.Settings'  #代表启动的activity
    # 生命driver对象
    driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', desired_caps)
    
* id


    方法：find_element_by_id(id_value) # id_value:为元素的id属性值
    需求:
        通过id定位方式点击搜索按钮
    举例：
    driver.find_element_by_id("com.android.settings:id/search").click()
    driver.quit()
    
    
* class


    方法：find_element_by_class_name(class_value) # class_value:为元素的class属性值
    需求:
        1.进入设置页面
      2.点击搜索按钮
      3.通过class定位方式点击输入框的返回按钮
    
    举例:
    driver.find_element_by_id("com.android.settings:id/search").click()
    driver.find_element_by_class_name("android.widget.ImageButton").click()
    driver.quit()
    
* xpath


    方法:find_element_by_xpath(xpath_value) # xpath_value:为可以定位到元素的xpath语句
    
    Android端常用属性定位:
    1. id ://*[contains(@resource-id,'com.android.settings:id/search')]
    2. class ://*[contains(@class,'android.widget.ImageButton')]
    3. text ://*[contains(@text,'WLA')]
    
    模糊定位
    4. contains(@key,value): value可以是部分值
    
    需求:
        1. 进入设置页面
        2. 点击wlan菜单栏
    
    示例:
    driver.find_element_by_xpath("//*[contains(@text,'WLA')]").click()
    driver.quit()
 
#### 定位一组元素
> 应用场景为元素值重复，无法通过元素属性直接定位到某个元素，只能通过elements方式来选择，返回一个定位对象的列表.

> 通过Xpath定位一组元素

    方法: find_elements_by_xpath(xpath_value)
    需求:
        1. 进入设置页面
        2. 点击wlan菜单栏,xpath中class属性定位列表中第3个对象
    
    data = driver.find_elements_by_xpath("//*[contains(@class,'android.widget.TextView')]")
    data[3].click()

> 通过id定位一组元素

    方法: find_elements_by_id(id_value) 
    需求:
        1. 进入设置页面
        2. 点击wlan菜单栏,id定位对象列表中第2个
    
    title = driver.find_elements_by_id("com.android.settings:id/title")
    # 打印title类型，预期为list
    print(type(title))
    # 取title返回列表中的第一个定位对象，执行点击操作
    title[1].click()

> 通过class定位一组元素

    方法: find_elements_by_class_name(class_value)
    需求:
        1. 进入设置页面
        2. 点击wlan菜单栏,选择定位对象是第3个
    
    title = driver.find_elements_by_class_name("android.widget.TextView")
    # 打印title类型，预期为list
    print(type(title))
    # 取title返回列表中的第3个定位对象,执行点击操作
    title[3].click()


####  发送数据到输入框

    方法:send_keys(vaue) # value：需要发送到输入框内的文本
    
    需求:
        打开设置 点击搜索按钮 输入内容abc
    
    # 点击搜索按钮
    driver.find_element_by_id("com.android.settings:id/search").click()
    # 定位到输入框并输入abc
    driver.find_element_by_id("android:id/search_src_text").send_keys("abc")
    
    
    注: 如果插入中文,需要在desired_caps里面增加2个参数:
    desired_caps['unicodeKeyboard'] = True
    desired_caps['resetKeyboard'] = True


#### 获取元素的文本内容

    方法: text
    
    需求: 
        进入设置,获取所有元素class属性为"android.widget.TextView"的文本内容
    
    代码:
    text_vlaue = driver.find_elements_by_class_name("android.widget.TextView")
    for i in text_vlaue:
            print(i.text)
        
####  获取元素的属性值

    方法: get_attribute(value) # value:元素的属性
    1. value='name' 返回content-desc / text属性值
    2. value='text' 返回text的属性值
    3. value='className' 返回 class属性值，只有 API=>18 才能支持
    4. value='resourceId' 返回 resource-id属性值，只有 API=>18 才能支持
    
    需求:
        进入设置 获取wlan属性
    
    data = driver.find_element_by_id("com.android.settings:id/title")
    print(data.get_attribute(‘resourceId’))
    
#### 清空输入框内容

    方法:clear()
    
    需求:
        打开设置 点击搜索按钮  输入内容abc 删除已输入abc
    
    driver.find_element_by_id("com.android.settings:id/search").click()
    # 定位到输入框并输⼊abc
    input_text = driver.find_element_by_id("android:id/search_src_text")
    # 输入abc
    input_text.send_keys("abc")
    time.sleep(1)
    # 删除abc
    input_text.clear()
    
    
#### 将应用置于后台事件

    方法: background_app(seconds)
    参数:
     seconds: 停留在后台时间,单位,秒
    
    需求:
        进入设置,将app至于后台5s
    
    driver.background_app(5)
    
    
####  手机截图

    截取 手机当前屏幕,保存指定格式图片到指定位置
    
    方法:get_screenshot_as_file(filename)
    参数：
    filename：指定路径下，指定格式的图⽚.
    
    需求:
        打开设置页面,截图当前页面,命名为screen.png
    
    代码实现:
    import os
    driver.get_screenshot_as_file(os.getcwd() + os.sep + './screen.png')
    
    # os.getcwd()函数 获得当前的路径。
    
    # python是跨平台的。在Windows上，文件的路径分隔符是'\'，在Linux上是'/'。
    为了让代码在不同的平台上都能运行，那么路径应该写'\'还是'/'呢？
    使用os.sep的话，就不用考虑这个了，os.sep根据你所处的平台，自动采用相应的分隔符号。