import express from "express";
 
var app = express();
var DEFAULTPORT = 3003;
var port = process.env.PORT || DEFAULTPORT;

app.get('/', function(req, res){

  const pageHtml = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>秦皇密令</title>
    <style>
      body {
        cursor: url(https://blog-static.cnblogs.com/files/zhangshuhao1116/1.ico), auto;
      }
      a,a:visited,button {
          cursor:url(https://blog-static.cnblogs.com/files/zhangshuhao1116/2.ico),auto;
      }

      * {
        margin:0;
        padding:0;
        box-sizing:border-box;
      }
      html,body{
        width:100%;
        height:100%;
        overflow:hidden;
      }

      #stars-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #020212;
        z-index: 1;
      }
      #meteor-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
      }

      .content{
        position:relative;
        z-index:10;
        width:100%;
        height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      }

      /* ========== 地球 由远及近 由小到大 动画 ========== */
      .earth-box {
        width: 100px;
        height: 100px;
        border: 6px solid #d4b886;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;

        /* 初始状态：透明、极小、遥远 */
        opacity: 0;
        transform: scale(0.2);
        animation: earthZoomIn 1.6s ease-out forwards 0.6s;
      }

      /* 地球动画关键帧 */
      @keyframes earthZoomIn {
        0% {
          opacity: 0;
          transform: scale(0.2);
        }
        60% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* 纯 CSS 绘制地球 —— 无图片、无链接、永远不会错！ */
      .earth-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #4fc3f7, #1976d2);
        position: relative;
        overflow: hidden;
      }
      .earth-icon::before {
        content: '';
        position: absolute;
        width: 38px;
        height: 18px;
        background: #2e7d32;
        border-radius: 50px;
        top: 16px;
        left: 8px;
      }
      .earth-icon::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 12px;
        background: #2e7d32;
        border-radius: 50px;
        top: 8px;
        right: 6px;
      }

      .btn{
        padding:14px 36px;
        background:#d4b886;
        border:none;
        border-radius:6px;
        font-size:16px;
        color:#000;
        font-weight:bold;
      }
      .modal{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.9);
        display:none;
        align-items:center;
        justify-content:center;
        z-index:9999;
      }
      .modal-box{
        background:#fff;
        padding:40px;
        border-radius:10px;
        text-align:center;
        border:6px solid #d4b886;
      }
      .modal-text{
        font-size:22px;
        margin-bottom:30px;
        color:#a82c2c;
        font-weight:bold;
      }
      .modal-buttons{
        display:flex;
        gap:20px;
        justify-content:center;
      }
      .modal-btn{
        padding:10px 20px;
        background:#d4b886;
        border:none;
        border-radius:6px;
        font-weight:bold;
      }
    </style>
  </head>
  <body>

    <div id="stars-bg"></div>
    <canvas id="meteor-canvas"></canvas>

    <div class="content">
      <!-- 地球 替换原来的秦皇密令 -->
      <div class="earth-box">
        <div class="earth-icon"></div>
      </div>

      <button class="btn" id="openBtn">不要走开，精彩马上来</button>
    </div>

    <div class="modal" id="modal">
      <div class="modal-box">
        <div class="modal-text">我是秦始皇，V我50听我讲复仇大计。</div>
        <div class="modal-buttons">
          <button class="modal-btn" id="btn1">扣一周一见</button>
          <button class="modal-btn" id="btn2">懂的都懂</button>
        </div>
      </div>
    </div>

    <script>
      // 满天星空
      const starBg = document.getElementById('stars-bg');
      for(let i=0;i<300;i++){
        const s = document.createElement('div');
        s.style.cssText = 'position:absolute;'+
        'width:'+(Math.random()*2)+'px;'+
        'height:'+(Math.random()*2)+'px;'+
        'background:#fff;'+
        'border-radius:50%;'+
        'left:'+Math.random()*100+'%;'+
        'top:'+Math.random()*100+'%;'+
        'opacity:'+(Math.random()*0.7+0.3);
        starBg.appendChild(s);
      }

      // ====================== 超柔滑渐变流星 ======================
      const canvas = document.getElementById('meteor-canvas');
      const ctx = canvas.getContext('2d');
      let w = canvas.width = innerWidth;
      let h = canvas.height = innerHeight;

      class Meteor {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * w;
          this.y = Math.random() * h * 0.5;
          this.speed = Math.random() * 2 + 1.5;
          this.length = Math.random() * 180 + 80;
          this.opacity = Math.random() * 0.5 + 0.2;
          this.angle = 0.25;
          this.glow = Math.random() * 3 + 1;

          this.color = [
            'rgba(79, 195, 247, ALPHA)',
            'rgba(240, 98, 146, ALPHA)',
            'rgba(149, 117, 255, ALPHA)',
            'rgba(255, 238, 88, ALPHA)',
            'rgba(77, 231, 191, ALPHA)'
          ][Math.floor(Math.random() * 5)];
        }
        update() {
          this.x += this.speed;
          this.y += this.speed * this.angle;
          if (this.x > w || this.y > h) this.reset();
        }
        draw() {
          // 渐变发光拖尾
          const g = ctx.createLinearGradient(
            this.x, this.y,
            this.x - this.length, this.y - this.length * this.angle
          );
          g.addColorStop(0, this.color.replace('ALPHA', this.opacity));
          g.addColorStop(1, this.color.replace('ALPHA', 0));

          ctx.save();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = this.glow;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - this.length, this.y - this.length * this.angle);
          ctx.stroke();
          ctx.restore();
        }
      }

      const meteors = Array.from({length: 40}, () => new Meteor());

      function draw() {
        ctx.clearRect(0, 0, w, h);
        meteors.forEach(m => {
          m.update();
          m.draw();
        });
        requestAnimationFrame(draw);
      }
      draw();

      window.onresize = () => {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
      };

      // 弹窗
      const openBtn = document.getElementById('openBtn');
      const modal = document.getElementById('modal');
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');

      openBtn.onclick = () => modal.style.display = 'flex';
      btn1.onclick = () => { modal.style.display = 'none'; alert('扣一周一见～'); };
      btn2.onclick = () => { modal.style.display = 'none'; alert('懂的都懂😏'); };
      modal.onclick = (e) => e.target === modal && (modal.style.display = 'none');
    </script>
  </body>
  </html>
  `;

  res.send(pageHtml);


/*    const heartHtml = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>古风付费模式</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: "SimHei", "Microsoft YaHei", serif;
            }
            body {
                background: #f5e9d8 url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4b886' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
                position: relative;
            }

            .cloud {
                position: absolute;
                width: 180px;
                height: 180px;
                opacity: 0.2;
                z-index: 1;
            }
            .cloud-tl { top: 10px; left: 10px; }
            .cloud-br { bottom: 10px; right: 10px; transform: rotate(180deg); }

            .canvas-container {
                position: relative;
                border: 10px solid #8b5a2b;
                border-radius: 10px;
                padding: 20px;
                background: rgba(255, 248, 230, 0.95);
                box-shadow: 0 0 30px rgba(0,0,0,0.4);
                z-index: 2;
            }
            .canvas-container::before,
            .canvas-container::after {
                content: "";
                position: absolute;
                top: 0;
                width: 12px;
                height: 100%;
                background: #a67c52;
            }
            .canvas-container::before { left: -12px; }
            .canvas-container::after { right: -12px; }

            canvas {
                display: block;
            }

            .seal {
                width: 60px;
                height: 60px;
                background: #8b0000;
                border-radius: 6px;
                margin: 15px auto 0;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: rotate(15deg);
                box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
            }

            .pay-btn {
                margin-top: 40px;
                padding: 18px 45px;
                background: linear-gradient(#d9a566, #b87333);
                border: 2px solid #8b4513;
                border-radius: 8px;
                color: #fff;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 6px 0 #8b4513;
                transition: all 0.2s ease;
                text-shadow: 1px 1px 2px #333;
                z-index: 2;
            }
            .pay-btn:active {
                transform: translateY(3px);
                box-shadow: 0 2px 0 #8b4513;
            }
            .pay-btn::before { content: "❖ "; }
            .pay-btn::after { content: " ❖"; }

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
            }

            .modal-content {
                width: 420px;
                padding: 40px 30px;
                background: #f9f1e6;
                border: 8px solid #8b5a2b;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 0 40px rgba(0,0,0,0.6);
                position: relative;
            }
            .modal-content p {
                font-size: 24px;
                color: #8b0000;
                font-weight: bold;
                line-height: 2;
                letter-spacing: 1px;
                margin-bottom: 30px;
            }
            .close-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 36px;
                height: 36px;
                background: #8b4513;
                color: #fff;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                font-weight: bold;
            }

            .modal-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
            }
            .modal-btn {
                padding: 12px 25px;
                background: linear-gradient(#d9a566, #b87333);
                border: 2px solid #8b4513;
                border-radius: 6px;
                color: #fff;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
            }
            .modal-btn:hover {
                opacity: 0.9;
            }
        </style>
    </head>
    <body>

        <svg class="cloud cloud-tl" viewBox="0 0 100 100">
            <path d="M25 40Q10 40 10 55Q10 70 30 70H70Q90 70 90 55Q90 40 70 40Q60 30 45 30Q30 30 25 40z" fill="#d4b886"/>
        </svg>
        <svg class="cloud cloud-br" viewBox="0 0 100 100">
            <path d="M25 40Q10 40 10 55Q10 70 30 70H70Q90 70 90 55Q90 40 70 40Q60 30 45 30Q30 30 25 40z" fill="#d4b886"/>
        </svg>

        <div class="canvas-container">
            <canvas id="heartCanvas" width="300" height="300"></canvas>
            <div class="seal">秦皇密令</div>
        </div>

        <button class="pay-btn" id="payButton">一键进入付费模式</button>

        <div class="modal-mask" id="modalMask">
            <div class="modal-content">
                <button class="close-btn" id="closeBtn">×</button>
                <p>我是秦始皇，V我50,复国金库我3你7。</p>
                
                <div class="modal-buttons">
                    <button class="modal-btn" id="btn1">扣一周一见</button>
                    <button class="modal-btn" id="btn2">懂的都懂</button>
                </div>
            </div>
        </div>

<script>
     
            const canvas = document.getElementById('heartCanvas');
            const ctx = canvas.getContext('2d');

            function drawHeart(scale = 1) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#8b0000';
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

            const payButton = document.getElementById('payButton');
            const modalMask = document.getElementById('modalMask');
            const closeBtn = document.getElementById('closeBtn');
            const btn1 = document.getElementById('btn1');
            const btn2 = document.getElementById('btn2');

            payButton.addEventListener('click', () => {
                modalMask.style.display = 'flex';
            });
            closeBtn.addEventListener('click', () => {
                modalMask.style.display = 'none';
            });
            btn1.addEventListener('click', () => {
                alert('扣一周一见～');
                modalMask.style.display = 'none';
            });
            btn2.addEventListener('click', () => {
                alert('懂的都懂😏');
                modalMask.style.display = 'none';
            });
            modalMask.addEventListener('click', (e) => {
                if (e.target === modalMask) {
                    modalMask.style.display = 'none';
                }
            });
        </script>
    </body>
    </html>`;

    res.send(heartHtml); 




    const heartHtml = `
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

    res.send(heartHtml);*/
//res.send("随橙想呢");
//res.send(process.env.HELLO || "default");
});
app.listen(port, function(){
     console.log("App listens on port: " + port);
});  