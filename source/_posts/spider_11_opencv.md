---
title: 用OpenCV识别出缺省图片
date: 2019-10-20 15:20:01
updated: 2019-10-20 16:40:25
tags: 爬虫
categories: 爬虫
---


#### 模块安装
> OpenCV  ------ pip install opencv-python
> Numpy   ------ pip install numpy 

#### 图片

![full_picture.png](/full_picture.png)
![portion_picture.png](/portion_picture.png)
![show.PNG](/show.PNG)


#### 代码实例
    
    import cv2
    import numpy as np
    
    
    def main():
        # 定义打开图片路径
        otemp = './picture/full_picture.png'  # 完整的图片
        otarget = './picture/portion_picture.jpg'  # 滑块
    
        # 读取图片  进行灰度处理
        target = cv2.imread(otarget, 0)
        template = cv2.imread(otemp, 0)
        # 图片尺寸
        w, h = target.shape[::-1]
    
        # 定义保存图片的路径
        temp = './picture/full_picture1.png'
        targ = './picture/portion_picture1.png'
    
        # 图片保存
        # 参数1  要保存的名字
        # 参数2  要保存那张图片
        cv2.imwrite(temp, template)
        cv2.imwrite(targ, target)
    
        # 显示图片  这步可以跳过
        # cv2.imshow('temp', template)  # 显示图片
        # cv2.imshow('tar', target)
        # cv2.waitKey(0)
    
        # 读图像
        target = cv2.imread(targ)
        # 颜色空间转换函数
        # 参数1是需要转换的图片，
        # 参数2是转换成何种格式。
        target = cv2.cvtColor(target, cv2.COLOR_BGR2GRAY)
        target = abs(255 - target)
        cv2.imwrite(targ, target)  # 保存
    
        target = cv2.imread(targ)
        template = cv2.imread(temp)
        # 模板匹配
        # 该函数第一个参数是源图像，第二个参数是模板图像，第三个参数是匹配的结果图像，第四个参数是用于指定比较的方法。
        result = cv2.matchTemplate(target, template, cv2.TM_CCOEFF_NORMED)
       
        # 获取一个/组int类型的索引值在一个多维数组中的位置
        x, y = np.unravel_index(result.argmax(), result.shape)
        print(x, y)  # 圈出来的区域  左上角的坐标
        # 展示圈出来的区域
        cv2.rectangle(template, (y, x), (y + w, x + h), (7, 249, 151), 2)
        # 显示图片
        cv2.imshow('Show', template)
        cv2.waitKey(0)  # 等待键盘输入 必须加  不然会出现图片一闪的情况
        cv2.destroyAllWindows()  # 删除建立的窗口。
    
    
    if __name__ == '__main__':
        main()
    
    
    """
    然后利用cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)画出矩行
    参数解释
    第一个参数：img是原图
    第二个参数：（x，y）是矩阵的左上点坐标
    第三个参数：（x+w，y+h）是矩阵的右下点坐标
    第四个参数：（0,255,0）是画线对应的rgb颜色
    第五个参数：2是所画的线的宽度
    """


#### OpenCV学习教程
> https://blog.csdn.net/zichen_ziqi/article/details/80531124