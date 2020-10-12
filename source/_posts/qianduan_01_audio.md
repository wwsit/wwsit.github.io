---
title: 实现播放、暂停、重放音频
date: 2020-6-14 22:12:52
updated: 
tags: 前端
categories: 前端
---

#### 通过进度条去控制

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>播放音频</title>
    </head>
    <body>
    
    <!-- 1.mp3音频位置 跟 HTML文件在同个路径下 -->
    <audio src="1.mp3" controls autoplay> </audio>
    
    </body>
    </html>

#### 效果
![](1.png)

#### 通过按钮去实现

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>播放音频</title>
    </head>
    <body>
    
    <audio id="audio1" src="1.mp3"></audio>
    <!--src值也可以是地址-->
    <audio id="https://webfs.yun.kugou.com/202006142232/22b00bff5106389416c5f211dd260252/G196/M05/0E/1F/pJQEAF5tHuSAQEjQAE1WSP1cvro534.mp3" src="1.mp3"></audio>
    
    <!-- onclikc 点击事件，会去执行要执行的函数-->
    <button onclick="bf()">播放/暂停</button>
    <button onclick="rbf();">重播</button>
    
    <script>
        function bf() {
            // 实现播放/暂替
            var audio = document.getElementById('audio1'); // 获取要操作的ID
    
            if (audio.paused){    //如果检测到是暂停状态
                alert('准备播放')
                audio.play();     //播放
            }else {
                alert('准备暂停')
                audio.pause();    //否则暂停
            }
        }
    
        function rbf(){
            // 实现重新播放
            var audio = document.getElementById('audio1');
         alert('准备重播')
         audio.currentTime = 0;
        }
    
    </script>
    
    </body>
    </html>

#### 效果
![](2.png)