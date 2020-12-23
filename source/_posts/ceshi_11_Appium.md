---
title:  使用Appium进行自动化测试
date: 2020-06-10 17:19:15
updated: 
tags: 测试
categories: 测试
---
#### 一、要求
     打开凤凰新闻APP，然后在搜索框中输入Python进行搜索，获取第二篇文章
     打印文章作者、标题、发布时间、所有内容

#### 二、代码（还可以继续优化，加一些判断条件）
    import time
    from appium import webdriver
    
    def mobile_info():
        """设备信息"""
        desired_caps = {}
        desired_caps['platformName'] = 'Android'  # 平台名称
        desired_caps['platformVersion'] = '5.1.1'  # 平台版本
        desired_caps['deviceName'] = '127.0.0.1:62001'  # 设备号
        # app信息
        desired_caps['appPackage'] = 'com.ifeng.news2'  # 应用的包名
        desired_caps['appActivity'] = 'com.ifeng.news2.activity.IfengTabMainActivity'  # 代表启动的activity
        driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)  # 声明driver对象,让手机完成脚本操作
        print('已经启动凤凰新闻APP')
        return driver
    
    
    def click_search_box(driver):
        """点击搜索框"""
        print('准备点击搜索框')
        while True:
            # 判断页面是否加载完成，来到主界面
            time.sleep(5)
            print('页面正在加载中...')
            # 出现弹窗
            window_content = '个人信息保护政策概要'
            if window_content in driver.page_source:
                driver.find_element_by_id('com.ifeng.news2:id/tv_privacy_agree').click()
                print('点击首页弹窗成功')
                time.sleep(2)
    
            if '置顶' in driver.page_source:
                print('首页已经加载完成')
                break
    
        time.sleep(2)
        # 点击搜索框
        driver.find_element_by_id('com.ifeng.news2:id/center_view_group').click()
    
    
    def input_content(driver):
        """输入内容"""
        print('准备在搜索框输入内容')
        driver.find_element_by_id('com.ifeng.news2:id/search_edit').send_keys('Python')
        time.sleep(2)
        # 点击搜索按钮
        driver.find_element_by_id('com.ifeng.news2:id/tv_search_action').click()
        time.sleep(2)
    
    
    def get_content(driver):
        """获取文章内容"""
        # 点击文章
        print('获取文章内容')
        time.sleep(2)
        content = driver.find_elements_by_id('com.ifeng.news2:id/channel_list_new_item_wrapper')
        content[1].click()  # 获取第二篇文章
        time.sleep(10)
        print('获取文章内容...')
        # 文章标题
        content_title = driver.find_element_by_id('title').text
        print('文章标题:%s' % content_title)
        # 作者
        content_article = driver.find_element_by_id('source').text
        print('文章作者:%s' % content_article)
        # 发布时间
        content_time = driver.find_element_by_id('time').text
        print('文章发布时间:%s' % content_time)
        # 文章内容
        print('***********文章所有内容***********' + '\n')
        all_content = driver.find_elements_by_class_name('android.view.View')
        for i in all_content:
            # 将整行都为空的内容去除
            if len((i.text).strip()) != 0:
                print(i.text)
    
    
    def main():
        """主程序"""
        print('*' * 30)
        print('程序开始')
        # 调用设备信息
        driver = mobile_info()
        # 点击搜索框
        click_search_box(driver)
        # 输入内容
        input_content(driver)
        # 获取文章内容
        get_content(driver)
        time.sleep(5)
        # 关闭app
        driver.close_app()
        # 关闭驱动
        driver.quit()
        print('*************程序结束*************')
    
    
    if __name__ == '__main__':
        main()
        
#### 三、效果展示
![](1.png)
