document.addEventListener('DOMContentLoaded', () => {
    // 初始化应用
    initializeApp();

    // 初始化函数 - 设置所有页面内容和事件监听器
    function initializeApp() {
        // 生成所有阶段的HTML
        generateAllStages();
        
        // 预加载所有图片
        preloadImages();
        
        // 记录每个阶段的点击次数
        const clickCounts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };
        
        // 获取所有DOM元素引用
        const stages = gatherStageElements();
        
        // 添加事件监听器
        setupEventListeners(stages, clickCounts);
    }
    
    // 生成所有阶段的HTML
    function generateAllStages() {
        const container = document.getElementById('main-container');
        let html = '';
        
        // 生成阶段1-4的HTML
        for (let stageNum = 1; stageNum <= 4; stageNum++) {
            const stageConfig = CONFIG.STAGES[stageNum];
            
            html += `
            <!-- Stage ${stageNum} -->
            <div id="stage-${stageNum}" class="stage${stageNum === 1 ? ' active' : ''}">
                <h1 class="title">${stageConfig.title}</h1>
                <div class="buttons">
                    <button id="yes-btn-${stageNum}" class="yes-btn">${stageConfig.yesText}</button>
                    <button id="no-btn-${stageNum}" class="no-btn">${stageConfig.noText}</button>
                </div>
                ${stageNum === 1 ? '<div id="love-images" class="love-images"></div>' : ''}
            </div>`;
        }
        
        // 生成成功阶段的HTML
        html += `
        <!-- Final Success Stage -->
        <div id="stage-success" class="stage">
            <h1 class="title success-title">${CONFIG.SUCCESS_PAGE.title}</h1>
            <div class="rejection-stats">
                <p>${CONFIG.SUCCESS_PAGE.statsTitle}</p>
                <ul>`;
        
        // 生成统计项
        CONFIG.SUCCESS_PAGE.statsItems.forEach((item, index) => {
            html += `<li>${item} <span id="count-${index+1}" class="reject-count">0</span> 次</li>`;
        });
                
        html += `
                </ul>
                <p class="total-count">${CONFIG.SUCCESS_PAGE.totalRejectsPrefix}<span id="count-total" class="reject-count-total">0</span>${CONFIG.SUCCESS_PAGE.totalRejectsSuffix}</p>
                <p class="chase-message"></p>
            </div>
            <div class="heart-container">
                <div class="heart"></div>
            </div>
            <p class="date-message">${CONFIG.SUCCESS_PAGE.datePrefix}<span id="date-text"></span></p>
        </div>`;
        
        // 设置容器的HTML
        container.innerHTML = html;
    }
    
    // 收集所有阶段的DOM元素引用
    function gatherStageElements() {
        const stages = {
            1: {
                container: document.getElementById('stage-1'),
                yesBtn: document.getElementById('yes-btn-1'),
                noBtn: document.getElementById('no-btn-1')
            },
            2: {
                container: document.getElementById('stage-2'),
                yesBtn: document.getElementById('yes-btn-2'),
                noBtn: document.getElementById('no-btn-2')
            },
            3: {
                container: document.getElementById('stage-3'),
                yesBtn: document.getElementById('yes-btn-3'),
                noBtn: document.getElementById('no-btn-3')
            },
            4: {
                container: document.getElementById('stage-4'),
                yesBtn: document.getElementById('yes-btn-4'),
                noBtn: document.getElementById('no-btn-4')
            },
            success: {
                container: document.getElementById('stage-success'),
                dateText: document.getElementById('date-text'),
                chaseMessage: document.querySelector('.chase-message'),
                counts: {
                    1: document.getElementById('count-1'),
                    2: document.getElementById('count-2'),
                    3: document.getElementById('count-3'),
                    4: document.getElementById('count-4'),
                    total: document.getElementById('count-total')
                }
            }
        };
        
        return stages;
    }
    
    // 设置事件监听器
    function setupEventListeners(stages, clickCounts) {
        // 监听全局鼠标移动，对活动阶段的"否"按钮生效
        document.addEventListener('mousemove', function(e) {
            const activeStageNum = getActiveStageNum();
            if (activeStageNum >= 1 && activeStageNum <= 4) {
                const noBtn = stages[activeStageNum].noBtn;
                if (isMouseNear(e, noBtn, 100)) {
                    runAway(noBtn, clickCounts[activeStageNum]);
                }
            }
        });
        
        // 为每个阶段的按钮添加事件监听器
        for (let stageNum = 1; stageNum <= 4; stageNum++) {
            // 获取当前阶段的元素和配置
            const stage = stages[stageNum];
            const config = CONFIG.STAGES[stageNum];
            
            // 为"否"按钮添加点击事件
            stage.noBtn.addEventListener('click', function() {
                handleNoButtonClick(stages, clickCounts, stageNum);
            });
            
            // 为"是"按钮添加点击事件
            stage.yesBtn.addEventListener('click', function() {
                const nextStage = config.nextStage;
                if (nextStage === 'success') {
                    // 处理成功阶段的特殊逻辑
                    handleSuccessStage(stages, clickCounts);
                } else {
                    goToNextStage(stage.container, stages[nextStage].container);
                }
            });
        }
    }
    
    // 处理"否"按钮点击的函数
    function handleNoButtonClick(stages, clickCounts, stageNum) {
        // 获取当前阶段的元素和配置
        const stage = stages[stageNum];
        const config = CONFIG.STAGES[stageNum];
        
        // 增加点击计数
        clickCounts[stageNum]++;
        const clickCount = clickCounts[stageNum];
        
        // 添加随机数量的图片 (1-3张)
        const numImages = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numImages; i++) {
            // 从当前阶段的图片列表中随机选择一张
            const imageKey = config.images[Math.floor(Math.random() * config.images.length)];
            addSpecificRandomImage(CONFIG.IMAGES[imageKey]);
        }
        
        // 根据点击次数更改按钮文本
        if (config.noBtnTexts[clickCount]) {
            stage.noBtn.textContent = config.noBtnTexts[clickCount];
        }
        
        // 缩小"否"按钮
        const shrinkRate = CONFIG.BUTTON_DIFFICULTY.initialShrinkRate;
        const newScale = 1 - (clickCount * shrinkRate);
        if (newScale > CONFIG.BUTTON_DIFFICULTY.minButtonScale) {
            stage.noBtn.style.transform = `scale(${newScale})`;
        } else {
            stage.noBtn.style.transform = `scale(${CONFIG.BUTTON_DIFFICULTY.minButtonScale})`;
        }
        
        // 保存点击次数到按钮数据属性
        stage.noBtn.dataset.clicks = clickCount;
        
        // 点击后立即移动按钮
        runAway(stage.noBtn, clickCount);
        
        // 对于所有阶段，如果点击次数足够多，显示"是"按钮的旋转文本
        if (clickCount >= 5) {
            stage.yesBtn.classList.add('enlarged');
            stage.yesBtn.textContent = config.yesBtnTextAfterClicks;
            stage.yesBtn.classList.add('rotating-text');
        } else {
            // 所有阶段都让"是"按钮随着"否"按钮的点击而变大
            stage.yesBtn.classList.add('enlarged');
            const growScale = 1 + (clickCount * 0.05);
            stage.yesBtn.style.transform = `scale(${Math.min(growScale, 1.5)})`;
        }
    }
    
    // 处理成功阶段的函数
    function handleSuccessStage(stages, clickCounts) {
        // 设置当前日期作为纪念日
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
        stages.success.dateText.textContent = formattedDate;
        
        // 显示每个阶段的拒绝次数
        let totalRejects = 0;
        for (let i = 1; i <= 4; i++) {
            const count = clickCounts[i];
            stages.success.counts[i].textContent = count;
            totalRejects += count;
        }
        
        // 根据总拒绝次数选择适当的追求难度消息
        const messageObj = CONFIG.CHASE_MESSAGES.find(item => totalRejects <= item.threshold);
        stages.success.chaseMessage.textContent = messageObj ? messageObj.message : CONFIG.CHASE_MESSAGES[0].message;
        
        // 添加庆祝效果 - 漂浮的心形
        for (let i = 0; i < CONFIG.SUCCESS_PAGE.heartCount; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 300);
        }
        
        // 跳转到成功阶段
        goToNextStage(stages[4].container, stages.success.container);
        
        // 添加数字增长动画
        animateCounts(stages, clickCounts);
    }
    
    // 数字增长动画函数
    function animateCounts(stages, clickCounts) {
        // 为每个计数器添加增长动画
        for (let i = 1; i <= 4; i++) {
            animateValue(stages.success.counts[i], 0, clickCounts[i], 1000);
        }
        
        // 计算总拒绝次数
        const totalRejects = clickCounts[1] + clickCounts[2] + clickCounts[3] + clickCounts[4];
        
        // 总数动画略慢一些，给人一种累加的感觉
        setTimeout(() => {
            animateValue(stages.success.counts.total, 0, totalRejects, 1500);
        }, 1000);
    }
    
    // 数值增长动画辅助函数
    function animateValue(element, start, end, duration) {
        if (start === end) return;
        const range = end - start;
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // 获取当前活动阶段的编号
    function getActiveStageNum() {
        for (let i = 1; i <= 4; i++) {
            if (document.getElementById(`stage-${i}`).classList.contains('active')) {
                return i;
            }
        }
        return -1;
    }
    
    // 检查鼠标是否靠近按钮
    function isMouseNear(e, button, distance) {
        if (!button) return false;
        
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const dx = e.clientX - buttonCenterX;
        const dy = e.clientY - buttonCenterY;
        const distanceSquared = dx * dx + dy * dy;
        
        return distanceSquared < distance * distance;
    }
    
    // 预加载图片函数
    function preloadImages() {
        for (const key in CONFIG.IMAGES) {
            const img = new Image();
            img.src = CONFIG.IMAGES[key];
        }
    }
    
    // 让按钮逃离的函数
    function runAway(button, clicks) {
        if (!button || button.classList.contains('hidden')) return;
        
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        
        // 使用配置中的难度设置
        const difficulty = CONFIG.BUTTON_DIFFICULTY;
        
        // 根据点击次数计算基础移动距离
        let baseDistanceMultiplier;
        if (clicks < difficulty.normalDifficultyAfterClicks) {
            // 前三次点击使用较低的难度
            baseDistanceMultiplier = difficulty.initialEscapeMultiplier + (clicks * difficulty.difficultyIncreaseRate);
        } else {
            // 第四次及以后使用正常难度
            baseDistanceMultiplier = difficulty.normalEscapeMultiplier + 
                (clicks - difficulty.normalDifficultyAfterClicks) * difficulty.difficultyIncreaseRate;
        }
        
        // 确保移动距离不超过最大值
        baseDistanceMultiplier = Math.min(
            baseDistanceMultiplier,
            difficulty.maxEscapeMultiplierPercent
        );
        
        // 计算实际移动距离
        const baseDistance = Math.max(window.innerWidth, window.innerHeight) * baseDistanceMultiplier;
        
        // 获取当前位置
        const rect = button.getBoundingClientRect();
        let currentX = rect.left;
        let currentY = rect.top;
        
        // 生成随机角度进行移动
        const angle = Math.random() * Math.PI * 2; // 随机角度（0到2π）
        
        // 使用三角函数计算新位置
        let newX = currentX + Math.cos(angle) * baseDistance;
        let newY = currentY + Math.sin(angle) * baseDistance;
        
        // 确保按钮不会移出屏幕
        newX = Math.max(0, Math.min(maxX, newX));
        newY = Math.max(0, Math.min(maxY, newY));
        
        // 设置新位置，随点击次数增加而加快过渡时间
        const transitionTime = Math.max(
            difficulty.initialTransitionTime - (clicks * difficulty.transitionReductionRate), 
            difficulty.minTransitionTime
        );
        
        button.style.transition = `left ${transitionTime}s, top ${transitionTime}s`;
        button.style.position = 'fixed';
        button.style.left = newX + 'px';
        button.style.top = newY + 'px';
        
        // 在第一次移动后添加"追逐"文本
        if (!button.classList.contains('no-btn-text')) {
            button.classList.add('no-btn-text');
        }
    }
    
    // 添加特定图片到随机位置
    function addSpecificRandomImage(imagePath) {
        // 创建并添加图片
        const img = document.createElement('img');
        img.src = imagePath;
        img.classList.add('love-img');
        
        // 随机位置（整个屏幕范围）
        const randomX = Math.floor(Math.random() * (window.innerWidth - 150));
        const randomY = Math.floor(Math.random() * (window.innerHeight - 150));
        
        // 随机旋转但限制在±90度内
        const randomRotation = Math.floor(Math.random() * 181) - 90; // 范围从-90到90
        
        img.style.left = randomX + 'px';
        img.style.top = randomY + 'px';
        img.style.transform = `rotate(${randomRotation}deg)`;
        
        document.body.appendChild(img);
        
        // 强制浏览器重绘以确保图片可见
        void img.offsetWidth;
    }
    
    // 创建漂浮的心形
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        
        // 随机位置
        const startPosX = Math.random() * window.innerWidth;
        
        // 设置样式
        heart.style.left = startPosX + 'px';
        heart.style.fontSize = Math.floor(20 + Math.random() * 30) + 'px';
        heart.style.color = '#ff1493';
        heart.style.position = 'fixed';
        heart.style.bottom = '-50px';
        heart.style.zIndex = '10';
        heart.style.opacity = '0.7';
        heart.style.animation = 'float 5s ease-in forwards';
        
        document.body.appendChild(heart);
        
        // 动画结束后移除
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // 添加漂浮动画
    function addFloatAnimation() {
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes float {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-${window.innerHeight}px) rotate(${Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // 切换到下一个阶段
    function goToNextStage(currentStage, nextStage) {
        currentStage.classList.remove('active');
        nextStage.classList.add('active');
    }
    
    // 添加漂浮动画
    addFloatAnimation();
}); 