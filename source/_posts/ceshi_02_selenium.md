---
title: Selenium(上)
date: 2019-10-25 10:20:22
updated: 2019-10-25 11:01:25
tags: 测试
categories: 测试
---

#### 介绍
    Selenium是一个Web的自动化测试工具，最初是为网站自动化测试而开发的，
    Selenium 可以直接运行在浏览器上，它支持所有主流的浏览器
    （包括PhantomJS这些无界面的浏览器），可以接收指令，
    让浏览器自动加载页面，获取需要的数据，甚至页面截屏。
    
#### 安装
    https://npm.taobao.org/mirrors/chromedriver
    必须下载chrome 版本对应的驱动
    pip install selenium
    在系统变量 添加selenium驱动的位置
    
#### 命令
    find_element_by_xxx 返回第一个符合条件 WebElement
    find_elements_by_xxx 返回符合条件所有元素的WebEelemnt列表
    
    find函数系列说明
    find_element_by_class_name 通过class 查询元素
    find_element_by_id 通过 ID 查询元素
    find_element_by_name 通过name 
    find_element_by_tag_name 通过标签名称
    find_element_by_css_selector css样式选择
    find_element_by_link_text 通过链接（ <a>标签 ）内容查找
    find_element_by_partial_link_text 通过链接内容包含的内容查找，模糊查询
    find_element_by_xpath 通过xpath查找数据
    获取元素属性和文本内容
  
    # 获取属性
    element.get_attribute('属性名')
    # 获取文本内容
    element.text
    # 获取网页源码
    browser.page_source
    
    
    # 无界面模式
    options = webdriver.ChromeOptions()
    options.add_argument('--headless') # 开启无界面模式
    options.add_argument('--disable-gpu') # 禁用gpu，解决一些莫名的问题
    browser = webdriver.Chrome('./chromedriver',chrome_options=options)
    
    # 启动设置User-Agent和代理
    options = webdriver.ChromeOptions()
    # 切换User-Agent
    options.add_argument('--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
    # 设置代理
    options.add_argument('--proxy-server=代理服务器地址') # 设置代理
    browser = webdriver.Chrome('./chromedriver',chrome_options=options)
    
#### 通过CSS定位
    定位方法
    driver.find_element_by_css_selector()
    常用的策略(方法)
    1. id选择器   
    2. class选择器
    3. 元素选择器
    4. 属性选择器
    5. 层级选择器
    
#### 文件
    链接：https://pan.baidu.com/s/17e834dVFO3PpmyV1XLbCqA 
    提取码：0nv0 

#### 练习
> 用面向对象的思想编程
    
    import time
    from selenium import webdriver
    from selenium.webdriver.common.action_chains import ActionChains
    
    
    class ZhuCeA():
        def __init__(self):
            self.url = 'file:///D:/py_files/ruance/day_01/素材/注册A.html'
            self.url2 = 'file:///D:/py_files/ruance/day_01/%E7%B4%A0%E6%9D%90/drag.html'
            self.browser = webdriver.Chrome()
            pass
    
        def tag_name(self):
            """1.通过tag标签定位"""
            input_content = ['wws', 'xiaowws', 13566666666, '103@qq.com']
            inputs = self.browser.find_elements_by_tag_name('input')
            for i in range(4):
                inputs[i].send_keys(input_content[i])
            pass
    
        def css_selector(self):
            """2.通过CSS定位"""
            # 通过CSS里面得ID定位
            self.browser.find_element_by_css_selector('#userA').send_keys('wws')
    
            # 通过CSS里面得class属性定位  class属性里面有两个值 telA haha  只需填一个
            self.browser.find_element_by_css_selector('.telA').send_keys(13592855317)
            pass
    
        def operation(self):
            """3.操作命令"""
            # 前进 后退  刷新
            self.browser.find_element_by_partial_link_text("AA 百度 网站").click()
            time.sleep(2)
            self.browser.back()
            time.sleep(2)
            self.browser.refresh()
            time.sleep(2)
            self.browser.forward()
    
        def click_operation(self):
            """4.常用操作方法"""
            username = self.browser.find_element_by_id('userA')
            username.send_keys('wws')
            time.sleep(2)
            username.clear()  # 内容清除
            print(username.size)  # 获取文本框的大小
            print(self.browser.title)  # 获取页面title(标题)
            print(self.browser.current_url)  # 获取当前页面URL
    
        def mouse_oper(self):
            """5.鼠标操作"""
            # context_click()
            # 此方法模拟鼠标右键点击效果
            username = self.browser.find_element_by_id('userA')
            action = ActionChains(self.browser)
            action.context_click(username).perform()  # 在账号附近右键
    
            # 进行拖动
            self.browser.get(self.url2)
            div1 = self.browser.find_element_by_id('div1')
            div2 = self.browser.find_element_by_id('div2')
            time.sleep(2)
            action = ActionChains(self.browser)
            action.drag_and_drop(div1, div2).perform()  # 将div1滑块 拖到div2中
    
        def run(self):
            """运行程序"""
            self.browser.get(self.url)
            try:
                # self.tag_name()
                # self.css_selector()
                # self.operation()
                # self.click_operation()
                self.mouse_oper()
                pass
            except Exception as e:
                print(e)
            finally:
                time.sleep(8)
                self.browser.quit()
            pass
    
    
    if __name__ == '__main__':
        client = ZhuCeA()
        client.run()
