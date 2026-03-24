import express from "express";
 
var app = express();
var DEFAULTPORT = 3003;
var port = process.env.PORT || DEFAULTPORT;

app.get('/', function(req, res){
/*    const heartHtml = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>古风付费模式</title>
        <style>
            //全局古风样式 
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "SimHei", "Microsoft YaHei", serif;
            }
            body {
                // 古风宣纸背景 
                background: #f5e9d8 url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4b886' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
            }

            // 画布容器 - 古风边框 
            .canvas-container {
                position: relative;
                border: 8px solid #8b5a2b;
                border-radius: 10px;
                padding: 10px;
                background: rgba(255, 248, 230, 0.8);
                box-shadow: 0 0 20px rgba(0,0,0,0.3);
            }

            canvas {
                display: block;
            }

            // 古风按钮样式 
            .pay-btn {
                margin-top: 40px;
                padding: 15px 40px;
                background: linear-gradient(#d9a566, #b87333);
                border: 2px solid #8b4513;
                border-radius: 8px;
                color: #fff;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 5px 0 #8b4513;
                transition: all 0.2s ease;
                text-shadow: 1px 1px 2px #333;
            }
            .pay-btn:active {
                transform: translateY(3px);
                box-shadow: 0 2px 0 #8b4513;
            }

            // 弹窗遮罩 
            .modal-mask {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }

            // 古风弹窗样式 
            .modal-content {
                width: 400px;
                padding: 30px;
                background: #f9f1e6;
                border: 5px solid #8b5a2b;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 0 30px rgba(0,0,0,0.5);
                position: relative;
            }
            .modal-content p {
                font-size: 22px;
                color: #8b0000;
                font-weight: bold;
                line-height: 1.8;
            }
            .close-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 30px;
                height: 30px;
                background: #8b4513;
                color: #fff;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <!-- 爱心画布容器 -->
        <div class="canvas-container">
            <canvas id="heartCanvas" width="300" height="300"></canvas>
        </div>

        <!-- 付费模式按钮 -->
        <button class="pay-btn" id="payButton">一键进入付费模式</button>

        <!-- 弹窗遮罩 -->
        <div class="modal-mask" id="modalMask">
            <div class="modal-content">
                <button class="close-btn" id="closeBtn">×</button>
                <p>我是秦始皇，V我50听我讲复仇大计。</p>
            </div>
        </div>

        <script>
            // ========== 爱心动画逻辑 ==========
            const canvas = document.getElementById('heartCanvas');
            const ctx = canvas.getContext('2d');

            function drawHeart(scale = 1) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#8b0000'; // 古风暗红色爱心
                ctx.beginPath();
                for (let t = 0; t < 2 * Math.PI; t += 0.01) {
                    const x = 16 * Math.pow(Math.sin(t), 3);
                    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
                    ctx.lineTo(150 + x * 6 * scale, 150 - y * 6 * scale);
                }
                ctx.closePath();
                ctx.fill();
            }

            let scale = 1;
            let growing = true;
            function beat() {
                if (growing) {
                    scale += 0.02;
                    if (scale >= 1.1) growing = false;
                } else {
                    scale -= 0.02;
                    if (scale <= 0.9) growing = true;
                }
                drawHeart(scale);
                requestAnimationFrame(beat);
            }
            beat();

            // ========== 弹窗逻辑 ==========
            const payButton = document.getElementById('payButton');
            const modalMask = document.getElementById('modalMask');
            const closeBtn = document.getElementById('closeBtn');

            // 点击按钮打开弹窗
            payButton.addEventListener('click', () => {
                modalMask.style.display = 'flex';
            });

            // 点击关闭按钮/遮罩关闭弹窗
            closeBtn.addEventListener('click', () => {
                modalMask.style.display = 'none';
            });
            modalMask.addEventListener('click', (e) => {
                if (e.target === modalMask) {
                    modalMask.style.display = 'none';
                }
            });

            // 按ESC键关闭弹窗
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalMask.style.display === 'flex') {
                    modalMask.style.display = 'none';
                }
            });
        </script>
    </body>
    </html>`;

    res.send(heartHtml);
//res.send("随橙想呢");*/
const heartHtml = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>古风付费模式</title>
        <style>
            /* 全局古风样式 */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                /* 替换为书法字体，无衬线字体兜底 */
                font-family: "Ma Shan Zheng", "SimHei", "Microsoft YaHei", serif;
            }
            body {
                /* 古风宣纸背景 + 祥云暗纹 */
                background: #f5e9d8 url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4b886' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
                position: relative;
            }

            /* 新增：祥云装饰 - 页面角落 */
            .cloud-decoration {
                position: absolute;
                width: 150px;
                height: 150px;
                opacity: 0.2;
                z-index: 1;
            }
            .cloud-top-left {
                top: 20px;
                left: 20px;
            }
            .cloud-bottom-right {
                bottom: 20px;
                right: 20px;
                transform: rotate(180deg);
            }

            /* 卷轴样式容器 - 核心古风装饰 */
            .scroll-container {
                position: relative;
                width: 400px;
                padding: 30px;
                background: #f9f1e6;
                border: 1px solid #d4b886;
                box-shadow: 0 0 30px rgba(139, 90, 43, 0.3);
                /* 卷轴上下边框 */
                border-top: 20px solid #8b5a2b;
                border-bottom: 20px solid #8b5a2b;
                z-index: 2;
            }
            /* 卷轴侧边装饰 */
            .scroll-container::before, .scroll-container::after {
                content: "";
                position: absolute;
                top: 0;
                width: 15px;
                height: 100%;
                background: linear-gradient(to right, #8b5a2b, #a67c52);
            }
            .scroll-container::before {
                left: 0;
            }
            .scroll-container::after {
                right: 0;
            }

            /* 画布容器 - 居中 */
            .canvas-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            canvas {
                display: block;
                filter: drop-shadow(0 0 5px rgba(139, 0, 0, 0.3));
            }

            /* 新增：印章装饰 - 爱心下方 */
            .seal {
                width: 60px;
                height: 60px;
                background: #8b0000;
                border-radius: 5px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                font-weight: bold;
                transform: rotate(15deg);
                margin: 10px auto 0;
                box-shadow: 3px 3px 0 #d4b886;
            }

            /* 优化古风按钮样式 */
            .pay-btn {
                margin-top: 60px;
                padding: 18px 50px;
                background: linear-gradient(#d9a566, #b87333);
                border: 2px solid #8b4513;
                border-radius: 8px;
                color: #fff;
                font-size: 22px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 8px 0 #8b4513;
                transition: all 0.2s ease;
                text-shadow: 1px 1px 2px #333;
                position: relative;
                z-index: 2;
                /* 按钮纹理 */
                background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0z' fill='%23fff' fill-opacity='0.1'/%3E%3C/svg%3E");
            }
            .pay-btn:active {
                transform: translateY(5px);
                box-shadow: 0 3px 0 #8b4513;
            }
            /* 按钮古风花纹装饰 */
            .pay-btn::before {
                content: "❖";
                margin-right: 8px;
                color: #fff8dc;
            }
            .pay-btn::after {
                content: "❖";
                margin-left: 8px;
                color: #fff8dc;
            }

            /* 弹窗遮罩 */
            .modal-mask {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                /* 弹窗背景暗纹 */
                background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            }

            /* 优化古风弹窗样式 - 仿奏折 */
            .modal-content {
                width: 450px;
                padding: 40px 30px;
                background: #f9f1e6;
                border: 8px solid #8b5a2b;
                border-radius: 5px;
                text-align: center;
                box-shadow: 0 0 50px rgba(0,0,0,0.6);
                position: relative;
                /* 奏折纹理 */
                background-image: url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%238b5a2b' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
            }
            /* 弹窗顶部装饰 - 圣旨头 */
            .modal-content::before {
                content: "";
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 30px;
                background: #d9a566;
                border: 3px solid #8b5a2b;
                border-radius: 8px;
            }
            .modal-content p {
                font-size: 26px;
                color: #8b0000;
                font-weight: bold;
                line-height: 2;
                letter-spacing: 2px; /* 字间距更符合古风 */
                text-shadow: 1px 1px 0 #fff;
            }
            .close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 35px;
                height: 35px;
                background: #8b4513;
                color: #fff;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
                transition: all 0.2s;
            }
            .close-btn:hover {
                background: #a0522d;
                transform: scale(1.1);
            }

            /* 引入在线书法字体 */
            @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');
        </style>
    </head>
    <body>
        <!-- 新增：祥云装饰 -->
        <svg class="cloud-decoration cloud-top-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M75,65 C75,80 50,85 50,70 C50,55 75,50 75,65 Z M35,60 C35,75 10,80 10,65 C10,50 35,45 35,60 Z" fill="#d4b886"/>
        </svg>
        <svg class="cloud-decoration cloud-bottom-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M75,65 C75,80 50,85 50,70 C50,55 75,50 75,65 Z M35,60 C35,75 10,80 10,65 C10,50 35,45 35,60 Z" fill="#d4b886"/>
        </svg>

        <!-- 卷轴容器 - 替代原画布容器 -->
        <div class="scroll-container">
            <div class="canvas-wrapper">
                <canvas id="heartCanvas" width="300" height="300"></canvas>
            </div>
            <!-- 新增：古风印章 -->
            <div class="seal">秦·秘闻</div>
        </div>

        <!-- 付费模式按钮 -->
        <button class="pay-btn" id="payButton">一键进入付费模式</button>

        <!-- 弹窗遮罩 -->
        <div class="modal-mask" id="modalMask">
            <div class="modal-content">
                <button class="close-btn" id="closeBtn">×</button>
                <p>我是秦始皇，V我50听我讲复仇大计。</p>
            </div>
        </div>

        <script>
            // ========== 爱心动画逻辑 ==========
            const canvas = document.getElementById('heartCanvas');
            const ctx = canvas.getContext('2d');

            function drawHeart(scale = 1) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#8b0000'; // 古风暗红色爱心
                ctx.beginPath();
                for (let t = 0; t < 2 * Math.PI; t += 0.01) {
                    const x = 16 * Math.pow(Math.sin(t), 3);
                    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
                    ctx.lineTo(150 + x * 6 * scale, 150 - y * 6 * scale);
                }
                ctx.closePath();
                ctx.fill();
            }

            let scale = 1;
            let growing = true;
            function beat() {
                if (growing) {
                    scale += 0.02;
                    if (scale >= 1.1) growing = false;
                } else {
                    scale -= 0.02;
                    if (scale <= 0.9) growing = true;
                }
                drawHeart(scale);
                requestAnimationFrame(beat);
            }
            beat();

            // ========== 弹窗逻辑 ==========
            const payButton = document.getElementById('payButton');
            const modalMask = document.getElementById('modalMask');
            const closeBtn = document.getElementById('closeBtn');

            // 点击按钮打开弹窗
            payButton.addEventListener('click', () => {
                modalMask.style.display = 'flex';
            });

            // 点击关闭按钮/遮罩关闭弹窗
            closeBtn.addEventListener('click', () => {
                modalMask.style.display = 'none';
            });
            modalMask.addEventListener('click', (e) => {
                if (e.target === modalMask) {
                    modalMask.style.display = 'none';
                }
            });

            // 按ESC键关闭弹窗
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalMask.style.display === 'flex') {
                    modalMask.style.display = 'none';
                }
            });
        </script>
    </body>
    </html>`;

    res.send(heartHtml);
});
app.listen(port, function(){
     console.log("App listens on port: " + port);
});  