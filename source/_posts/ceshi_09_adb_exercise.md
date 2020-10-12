---
title:  adb--UI自动化
date: 2019-12-29 20:04:01
updated: 
tags: 测试
categories: 测试
---

    import os
    import json
    import time
    import re
    
    from uiautomator import Device
    
    
    class Mobile_UI():
    
        def __init__(self, id, d):
    
            self.id = id
            self.d = d
            pass
    
        def get_mobile_size(self):
            """获取屏幕大小"""
    
            result = self.d.info
            height = result['displayHeight']
            width = result['displayWidth']
            # print('高度:%s' % height)
            # print('宽度:%s' % width)
            return width, height
    
        def input_screen_data(self):
            """进行屏幕解锁"""
    
            data_list = ['x', 'x', 'x', 'x', 'x', 'x'](解锁的密码)
            for data in data_list:
                if self.d(text=data).exists:
                    self.d(text=data).click()
                    time.sleep(1)
                else:
                    raise ('找不到按键')
    
        def mobile_swipe(self, swipe):
            """屏幕滑动"""
    
            w, h = self.get_mobile_size()
    
            if swipe == 'right':
                # 由左向右滑动
                self.d.swipe(w / 100, h / 2, w / 2, h / 2)
            elif swipe == 'left':
                # 由右向左滑动
                self.d.swipe(w / 2, h / 2, w / 100, h / 2)
            elif swipe == 'up':
                # 由下向上滑动
                self.d.swipe(w / 2, h / 100, w / 2, h / 2)
            elif swipe == 'down':
                # 由上向下滑动
                self.d.swipe(w / 2, h / 2, w / 2, h / 100)
            else:
                print('输入有误')
    
        def unlock(self):
            """屏幕解锁"""
    
            # 判断屏幕是否亮屏
            if self.d.screen == 'on':
                print('屏幕已经亮了')
            else:
                print('屏幕正在亮...')
                self.d.screen.on()
            time.sleep(1)
    
            while True:
                # 进行解锁
                if self.d(resourceId='com.android.systemui:id/keyguard_message_area').exists:
                    print('屏幕需要解锁')
                    self.input_screen_data()
                    time.sleep(3)
    
                elif self.d(resourceId='com.android.systemui:id/backdrop_back').exists:
                    print('处于屏保界面,需要进行滑动..')
                    self.mobile_swipe('up')
                    time.sleep(1)
                else:
                    print('屏幕无需解锁')
                    break
    
        def mobile_reboot_time(self):
            """手机开机时间"""
    
            print('正在开机中。。。')
            # os.system('adb -s %s shell reboot' % self.id)
            
            os.system('adb -s %s shell logcat -b all -t 50000 >./log.txt' % self.id)
            with open('log.txt', 'r', encoding='utf-8') as f:
                content = f.readlines()
                
            # 可以通过'wm_boot_animation_done'参数 查看开机时间
            for data in content:
                if 'wm_boot_animation_done' in data:
                    time_data = data[data.rfind(":") + 1:]
                    time_data = int(time_data.replace(' ', '')) / 1000
                    print('开始时间用了:%ss' % time_data)
    
        def mobile_clean_recent(self):
            """手机清理"""
    
            time.sleep(1)
            self.d.press('home')
            time.sleep(1)
            self.d.press('recent')
            time.sleep(1)
            if self.d(text='最近无运行应用').exists:
                print('已经很干净了，无需清理')
                time.sleep(1)
                self.d.press('home')
                time.sleep(1)
            else:
                print('清理后台成功')
                self.d.click(704, 2250)
                time.sleep(1)
    
        def get_mobile_info(self):
            """获取手机信息"""
    
            # self.mobile_clean_recent()
            os.system('adb -s %s shell cat /proc/cpuinfo > ./cpu_log.txt' % id)
            with open('cpu_log.txt', 'r', encoding='utf-8') as f:
                content = f.read()
            num_data = re.findall('processor', content)
            print('手机是:%s核' % len(num_data))
    
            # 电量信息
            result = os.popen('adb -s %s shell dumpsys battery' % self.id).read()
            # print(result)
            level_data = re.findall('level: (\d+)', result)
            status_data = re.findall('health: (\d)', result)
            if status_data[0] == '2':
                print('手机正在充电')
            print('手机剩余电量：%s%%' % level_data[0])
    
            # 内存信息
            meminfo = os.popen('adb -s %s shell dumpsys meminfo' % self.id).read()
            # print(meminfo)
            # 获取Free RAM中的值，并将K值装换成G值
            meminfo_data = re.findall('Free RAM: (\S+)K', meminfo)
            meminfo_data = int(meminfo_data[0].replace(',', ''))
            meminfo_data = meminfo_data / 1024 / 1024
            print('手机剩余内存(RAM)：%.2fG' % meminfo_data)
            pass
    
        def run(self):
    
            self.mobile_reboot_time()
            self.unlock()
            self.mobile_clean_recent()
            self.get_mobile_info()
            pass
    
    
    if __name__ == '__main__':
        # 可以通过 adb devices 查看
       
        id = '设置的id'
        d = Device(id)
        user = Mobile_UI(id, d)
        user.run()
