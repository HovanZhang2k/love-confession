# 爱的表白 (Love Confession)

一个互动式表白网页，带有有趣的动画和游戏元素。

## 项目介绍

这个网页设计为一个有趣的表白/求爱体验，有四个互动阶段，每个阶段都有"接受"和"拒绝"按钮。当用户尝试点击"拒绝"时，按钮会躲避鼠标并移动到随机位置，同时会展示随机的图片。"接受"按钮会进入下一阶段。

## 主要功能

- **四个互动阶段**：表白、约会邀请、仪式感、转账请求
- **调皮的按钮行为**：
  - "拒绝"按钮会逃避鼠标光标
  - 随点击次数增加，按钮会变小并且移动更快
  - 前三次点击有较低难度，从第四次开始增加难度
- **视觉效果**：
  - 当点击"拒绝"时会显示随机图片
  - 按钮文字会在多次点击后旋转变化
  - "接受"按钮随着"拒绝"的点击次数而变大
- **成功页面**：
  - 显示每个阶段被拒绝的次数统计
  - 根据总拒绝次数显示不同的追求难度消息
  - 动画计数器效果
  - 漂浮的心形动画

## 文件结构

- `index.html` - 网页基本结构
- `styles.css` - 样式表
- `config.js` - 配置文件（文本、图片路径、难度设置等）
- `script.js` - 主要JavaScript代码
- `assets/` - 图片文件夹（如果你想要换图最好使用英文名否则会出现无法读取图片的情况）

## 如何使用和自定义

### 运行项目

1. 使用Visual Studio Code打开项目文件夹
2. 安装"Live Server"插件
3. 右键点击`index.html`文件，选择"Open with Live Server"
4. 浏览器将自动打开项目

### 自定义配置

要自定义内容和行为，只需编辑`config.js`文件：

#### 修改文本内容

```javascript
// 各阶段的标题和按钮文本配置
const STAGES = {
    1: {
        title: "检测到心动NPC！是否确认组队？", // 修改标题
        yesText: "接受",                     // 修改"接受"按钮文本
        noText: "拒绝",                      // 修改"拒绝"按钮文本
        yesBtnTextAfterClicks: "是的",       // 修改多次点击后的"接受"按钮文本
        noBtnTexts: {
            1: "不要",                       // 修改第1次点击后的"拒绝"按钮文本
            3: "真的不要",                   // 修改第3次点击后的文本
            5: "绝对不要"                    // 修改第5次点击后的文本
        },
        images: ['love1', 'love2', 'love3'], // 修改该阶段显示的图片
        nextStage: 2                         // 下一阶段编号
    },
    // 其他阶段...
}
```

#### 修改图片路径

```javascript
// 图片路径配置
const IMAGES = {
    love1: 'assets/爱你1.jpeg',       // 更改图片路径
    love2: 'assets/爱你2.jpeg',
    // 更多图片...
}
```

#### 调整按钮难度

```javascript
// 按钮难度配置
const BUTTON_DIFFICULTY = {
    // 前三次点击的按钮逃离距离倍数 (越小越容易点击)
    initialEscapeMultiplier: 0.15,      // 初始距离系数 (较小值更容易点击)
    difficultyIncreaseRate: 0.03,       // 每次点击增加的难度
    normalDifficultyAfterClicks: 3,     // 第几次点击后启用正常难度
    normalEscapeMultiplier: 0.3,        // 正常难度的距离系数
    maxEscapeMultiplierPercent: 0.8,    // 最大逃离距离 (屏幕尺寸的百分比)
    
    // 按钮缩小率
    initialShrinkRate: 0.03,            // 每次点击缩小比例
    minButtonScale: 0.2,                // 按钮可缩小到的最小比例
    
    // 按钮移动速度
    initialTransitionTime: 0.3,         // 初始过渡时间(秒)
    transitionReductionRate: 0.025,     // 每次点击减少的过渡时间
    minTransitionTime: 0.05             // 最小过渡时间(秒)
}
```

#### 修改成功页面消息

```javascript
// 自定义追求难度的消息
const CHASE_MESSAGES = [
    { threshold: 5, message: "终于追到你了！" }, // 0-5次拒绝
    { threshold: 10, message: "追你还挺费劲的！" }, // 6-10次拒绝
    // 更多消息...
]

// 成功页面的配置
const SUCCESS_PAGE = {
    title: "追你好难啊！",               // 修改标题
    datePrefix: "纪念日：",             // 修改日期前缀
    statsTitle: "表白路上的艰辛历程：",  // 修改统计标题
    // 更多设置...
    heartCount: 10,                    // 成功页面的漂浮心形数量
}
```

## 添加自定义图片

1. 将你的图片文件添加到`assets/`文件夹
2. 在`config.js`文件的`IMAGES`对象中添加新图片路径
3. 在相应阶段的`images`数组中添加新图片的键名

## 兼容性

此项目在现代浏览器中运行良好，包括 Chrome、Firefox、Edge 和 Safari 的最新版本。

## 注意事项

- 确保启用 JavaScript
- 图片路径必须正确，否则图片将无法显示
- 为获得最佳体验，建议使用全屏模式 

## 版权与使用声明

- 本项目仅供个人学习和非商业用途，请勿用于任何商业活动
- 项目中使用的图片来源于百度图片搜索，版权归原作者所有
- 如果您是图片版权所有者并希望我们移除相关内容，请联系我们
- 欢迎分享本项目代码，但请保留此版权声明