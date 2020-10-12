---
title: 进程、线程、协程代码
date: 2019-10-31 20:12:35
updated: 2019-10-31 20:43:56
tags: 基础
categories: 基础
---
### 多进程代码
    import multiprocessing
    import time
    import os
    
    
    def run():
        for i in range(5):
            print("当前进程:{}".format(os.getpid()), end='---')
            print('跑步')
            time.sleep(1)
    
    
    def swim():
        for i in range(5):
            print("当前进程:{}".format(os.getpid()), end='---')
            print('游泳')
            time.sleep(1)
    
    
    if __name__ == '__main__':
        data_1 = multiprocessing.Process(target=run)
        data_2 = multiprocessing.Process(target=swim)
    
        data_1.start()
        data_2.start()
![](/1.PNG)       
        
#### 多线程代码

    import threading
    import time
    import os
    
    def run():
        for i in range(5):
            print("当前进程:{}".format(os.getpid()), end='---')
            print('跑步')
            time.sleep(1)
    
    
    def swim():
        for i in range(5):
            print("当前进程:{}".format(os.getpid()), end='---')
            print('游泳')
            time.sleep(1)
    
    if __name__ == '__main__':
        thread_1 = threading.Thread(target=run)
        thread_2 = threading.Thread(target=swim)
    
        thread_1.start()
        thread_2.start()
![](/2.PNG)   
    
    
#### 协程代码

    from gevent import monkey
    # 猴子补丁
    monkey.patch_all()
    import time
    import gevent
    import os
    
    
    def run():
        for i in range(5):
            print("当前进程:{}".format(os.getpid()), end='---')
            print('跑步')
            gevent.sleep(1)
    
    
    def swim():
        for i in range(5):
            print("当前进程:{}".format(os.getpid()), end='---')
            print('游泳')
            gevent.sleep(1)
    
    # 创建携程并指派任务
    sp1 = gevent.spawn(run)
    sp2 = gevent.spawn(swim)
    
    # 等待协程执行完成再关闭主线程
    sp1.join()
    sp2.join()



