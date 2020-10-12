---
title: 闭包、装饰器
date: 2020-2-7 20:29:06
updated:  2020-2-7 20:29:06
tags: 基础
categories: 基础
---

##### 一、闭包
    构成条件：
    在函数嵌套(函数里面再定义函数)的前提下
    内部函数使用了外部函数的变量(还包括外部函数的参数)
    外部函数返回了内部函数
    
    闭包的作用：
    闭包可以保存外部函数内的变量，不会随着外部函数调用完而销毁。
    
    # 定义一个外部函数
    def func_out(num1):
        # 定义一个内部函数
        def func_inner(num2):
            # 内部函数使用了外部函数的变量(num1)
            result = num1 + num2
            print("结果是:", result)
        # 外部函数返回了内部函数，这里返回的内部函数就是闭包
        return func_inner
    
    # 创建闭包实例    
    f = func_out(1)
    # 执行闭包
    f(2)
    f(3)
    
    结果是: 3
    结果是: 4


##### 二、装饰器的定义
> 就是给已有函数增加额外功能的函数，它本质上就是一个闭包函数。
    
    语法糖用法: @装饰器名称
    示例代码：
    # 添加一个登录验证的功能
    def check(fn):
        print("装饰器函数执行了")
        def inner():
            print("请先登录....")
            fn()
        return inner
    
    # 使用语法糖方式来装饰函数
    @check
    def comment():
        print("发表评论")
    
    comment()
    
    1.通用装饰器的语法格式:

    def logging(fn):
      def inner(*args, **kwargs):
          print("--正在努力计算--")
          result = fn(*args, **kwargs)
          return result
    
      return inner
      
    2.带有参数的装饰器介绍
    def decorator(fn):
        print('第1执行')
        def inner(num1, num2):
            print('第2执行')
            result = fn(num1, num2)
            print('第5执行')
            return result
    
        return inner
    
    
    @decorator
    def add(a, b):
        print('第3执行')
        result = a + b
        print('第4执行')
        return result
    
    result = add(1, 3)
    print(result)
    
    结果：
    第1执行
    第2执行
    第3执行
    第4执行
    第5执行
    4