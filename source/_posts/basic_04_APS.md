---
title: APScheduler使用
date: 2020-2-5 13:35:16
updated: 2020-2-5 14:16:55
tags: 基础
categories: 基础
---


##### 一、安装
> pip install apscheduler
    
##### 二、调度器 Scheduler
>负责管理定时任务

    * BlockingScheduler: 作为独立进程时使用
         from apscheduler.schedulers.blocking import BlockingScheduler
         scheduler = BlockingScheduler()
    * BackgroundScheduler: 在框架程序（如Django、Flask）中使用
    
        from apscheduler.schedulers.background import BackgroundScheduler
        scheduler = BackgroundScheduler()

##### 三、执行器 executors
> 在定时任务该执行时，以进程或线程方式执行任务

    * ThreadPoolExecutor
              
              from apscheduler.executors.pool import ThreadPoolExecutor
              ThreadPoolExecutor(max_workers)  
              ThreadPoolExecutor(20) # 最多20个线程同时执行
              使用方法:
              executors = {
              'default': ThreadPoolExecutor(20)
                 }
              scheduler = BackgroundScheduler(executors=executors)
          
    * ProcessPoolExecutor
    
          from apscheduler.executors.pool import ProcessPoolExecutor
          ProcessPoolExecutor(max_workers)
          ProcessPoolExecutor(5) # 最多5个进程同时执行
          使用方法:
          executors = {
              'default': ProcessPoolExecutor(3)
          }
          scheduler = BackgroundScheduler(executors=executors)

##### 四、触发器 Trigger
> 指定定时任务执行的时机

1)、 date 在特定的时间日期执行
    
    from datetime import date
    # 在2019年11月6日00:00:00执行
    sched.add_job(my_job, 'date', run_date=date(2009, 11, 6))
    
    # 在2019年11月6日16:30:05
    sched.add_job(my_job, 'date', run_date=datetime(2009, 11, 6, 16, 30, 5))
    sched.add_job(my_job, 'date', run_date='2009-11-06 16:30:05')
    
    # 立即执行
    sched.add_job(my_job, 'date')  
    sched.start()

2） interval 经过指定的时间间隔执行

    weeks (int) – number of weeks to wait
    days (int) – number of days to wait
    hours (int) – number of hours to wait
    minutes (int) – number of minutes to wait
    seconds (int) – number of seconds to wait
    start_date (datetime|str) – starting point for the interval calculation
    end_date (datetime|str) – latest possible date/time to trigger on
    timezone (datetime.tzinfo|str) – time zone to use for the date/time calculations

    from datetime import datetime
    # 每两小时执行一次
    sched.add_job(job_function, 'interval', hours=2)
    # 在2010年10月10日09:30:00 到2014年6月15日的时间内，每两小时执行一次
    sched.add_job(job_function, 'interval', hours=2, start_date='2010-10-10 09:30:00', end_date='2014-06-15 11:00:00')

3） cron 按指定的周期执行

    year (int|str) – 4-digit year
    month (int|str) – month (1-12)
    day (int|str) – day of the (1-31)
    week (int|str) – ISO week (1-53)
    day_of_week (int|str) – number or name of weekday (0-6 or mon,tue,wed,thu,fri,sat,sun)
    hour (int|str) – hour (0-23)
    minute (int|str) – minute (0-59)
    second (int|str) – second (0-59)
    start_date (datetime|str) – earliest possible date/time to trigger on (inclusive)
    end_date (datetime|str) – latest possible date/time to trigger on (inclusive)
    timezone (datetime.tzinfo|str) – time zone to use for the date/time calculations (defaults to scheduler timezone)
    
    # 在6、7、8、11、12月的第三个周五的00:00, 01:00, 02:00和03:00 执行
    sched.add_job(job_function, 'cron', month='6-8,11-12', day='3rd fri', hour='0-3')
    # 在2014年5月30日前的周一到周五的5:30执行
    sched.add_job(job_function, 'cron', day_of_week='mon-fri', hour=5, minute=30, end_date='2014-05-30')

##### 五、使用方式

    from apscheduler.schedulers.background import BackgroundScheduler
    # 创建定时任务的调度器对象
    scheduler = BlockingScheduler()
    # 定义定时任务
    def my_job(param1, param2):
        pass
    # 向调度器中添加定时任务
    scheduler.add_job(my_job, 'date', args=[100, 'python'])
    # 启动定时任务调度器工作
    scheduler.start()