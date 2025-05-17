// 可编辑的配置文件 - 即使不懂代码也可以轻松修改

// 图片路径配置
const IMAGES = {
    love1: 'assets/爱你1.jpeg',
    love2: 'assets/爱你2.jpeg',
    love3: 'assets/爱你3.jpeg',
    invitation: 'assets/邀请1.jpeg',
    ritual: 'assets/仪式感.jpeg',
    money520: 'assets/转520.jpg',
    money1314: 'assets/1314.jpeg'
};

// 各阶段的标题和按钮文本配置
const STAGES = {
    1: {
        title: "检测到心动NPC！是否确认组队？",
        yesText: "接受",
        noText: "拒绝",
        yesBtnTextAfterClicks: "是的",
        noBtnTexts: {
            1: "不要",
            3: "真的不要",
            5: "绝对不要"
        },
        images: ['love1', 'love2', 'love3'],
        nextStage: 2
    },
    2: {
        title: "你同意我的恋爱申请了，要不要跟我约会？",
        yesText: "当然要了！",
        noText: "不要",
        yesBtnTextAfterClicks: "你不可以拒绝",
        noBtnTexts: {
            1: "不约",
            3: "不想约",
            5: "约不动"
        },
        images: ['invitation'],
        nextStage: 3
    },
    3: {
        title: "你愿意给我一个仪式感吗？",
        yesText: "愿意",
        noText: "不愿意",
        yesBtnTextAfterClicks: "我就想要一个仪式感嘛",
        noBtnTexts: {
            1: "不给",
            3: "别想了",
            5: "想都别想"
        },
        images: ['ritual'],
        nextStage: 4
    },
    4: {
        title: "可不可以转520？",
        yesText: "可以",
        noText: "不可以",
        yesBtnTextAfterClicks: "那我就当你同意了",
        noBtnTexts: {
            1: "只是一个仪式感啦",
            3: "我不是真要钱",
            5: "就象征性的"
        },
        images: ['money520', 'money1314'],
        nextStage: 'success'
    }
};

// 按钮难度配置
const BUTTON_DIFFICULTY = {
    // 前三次点击的按钮逃离距离倍数 (越小越容易点击)
    initialEscapeMultiplier: 0.15, // 初始距离倍数
    difficultyIncreaseRate: 0.03, // 每次点击增加的距离倍数
    normalDifficultyAfterClicks: 3, // 第几次点击后开始正常难度
    normalEscapeMultiplier: 0.3, // 正常难度的距离倍数
    maxEscapeMultiplierPercent: 0.8, // 最大距离为屏幕尺寸的百分比
    
    // 按钮缩小率
    initialShrinkRate: 0.03, // 每次点击缩小的比例
    minButtonScale: 0.2, // 按钮最小可缩小到的比例
    
    // 按钮移动速度
    initialTransitionTime: 0.3, // 初始过渡时间(秒)
    transitionReductionRate: 0.025, // 每次点击减少的过渡时间
    minTransitionTime: 0.05 // 最小过渡时间(秒)
};

// 自定义追求难度的消息
const CHASE_MESSAGES = [
    { threshold: 5, message: "终于追到你了！" }, // 0-5次拒绝
    { threshold: 10, message: "追你还挺费劲的！" }, // 6-10次拒绝
    { threshold: 15, message: "追你真是太不容易了..." }, // 11-15次拒绝
    { threshold: 20, message: "我都快放弃了，幸好坚持住了！" }, // 16-20次拒绝
    { threshold: 30, message: "这是我人生中最艰难的追求！" }, // 21-30次拒绝
    { threshold: 40, message: "我的坚持终于打动了你的心！" }, // 31-40次拒绝
    { threshold: Infinity, message: "这段追求的经历，我永生难忘！" } // 41+次拒绝
];

// 成功页面的配置
const SUCCESS_PAGE = {
    title: "追你好难啊！",
    datePrefix: "纪念日：",
    statsTitle: "表白路上的艰辛历程：",
    totalRejectsPrefix: "总共拒绝了我 ",
    totalRejectsSuffix: " 次",
    statsItems: [
        "你拒绝了我的告白",
        "你拒绝了我的约会邀请",
        "你拒绝了我的仪式感",
        "你拒绝了给我转520"
    ],
    heartCount: 10, // 成功页面的漂浮心形数量
};

// 导出所有配置
const CONFIG = {
    IMAGES,
    STAGES,
    BUTTON_DIFFICULTY,
    CHASE_MESSAGES,
    SUCCESS_PAGE
}; 