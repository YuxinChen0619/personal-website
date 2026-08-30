/* 站点全部文案与作品数据 —— 与参考逐帧核对整理 */

export const SITE = {
  owner: 'YUXIN CHEN',
  tagline: "YUXIN CHEN — PORTFOLIO '26",
  year: '2026',
}

/* ── 顶部导航 ─────────────────────────────────────────── */
export const NAV = [
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'EXPERIENCE' },
  { id: 'work', label: 'SELECTED WORK' },
  { id: 'contact', label: 'CONTACT' },
] as const

/* ── ABOUT：工牌 ─────────────────────────────────────── */
export const ABOUT = {
  cardNo: 'NO. YC-2026',
  title: ['YUXIN', 'CHEN'],
  titleCn: '个人简介',
  sub: 'AI PRODUCT · AGENT · COMMERCIALIZATION',
  fields: [
    { k: 'NAME / 姓名', v: '陈羽心 / Yuxin Chen' },
    { k: 'LOCATION / 城市', v: '上海，中国' },
    { k: 'STATUS / 状态', v: '求职中 / Open to opportunities' },
    { k: 'FOCUS / 方向', v: 'AI Product · AI Agent · AIGC' },
    { k: 'EDUCATION / 教育', v: '南京大学 · 考古学硕士' },
    { k: 'BACKGROUND / 背景', v: '阿里巴巴/字节跳动/小红书AI产品经历，练习时长两年半' },
  ],
  email: '1370149335@qq.com',
  phone: '+86 150 6869 9079',
  stampTop: 'OPEN TO',
  stampMid: 'WORK',
  stampRing: 'YUXIN CHEN · PRODUCT PORTFOLIO ·',
  footL: 'BUILDING AI FOR REAL BUSINESS',
  footR: 'PERSONAL PORTFOLIO · 2026',
}

/* ── SELECTED WORK：四个文件夹 ───────────────────────── */
export const FOLDERS = [
  {
    id: 'video',
    en: ['AI', 'AGENT'],
    cn: '小饿 AI',
    bg: '#0b0b0d',
    fg: '#e0322a',
    cnFg: '#e0322a',
    x: -30,
    y: 12,
    rot: -6,
    z: 1,
  },
  {
    id: 'design',
    en: ['DESIGN', 'BOOK'],
    cn: '个人设计作品集',
    bg: '#c8f322',
    fg: '#1b28d8',
    cnFg: '#1b28d8',
    x: 0,
    y: 0,
    rot: -7,
    z: 3,
  },
  {
    id: 'photograph',
    en: ['UGC', 'GROWTH'],
    cn: '小红书商业化',
    bg: '#1b28d8',
    fg: '#c8f322',
    cnFg: '#ffffff',
    x: 30,
    y: -18,
    rot: 3,
    z: 2,
  },
  {
    id: 'website',
    en: ['GLOBAL', 'AIGC'],
    cn: 'TikTok 与增长策略',
    bg: '#f8f8f6',
    fg: '#14161a',
    cnFg: '#14161a',
    x: 22,
    y: 20,
    rot: 2,
    z: 2,
  },
  {
    id: 'strategy',
    en: ['GROWTH', 'STRATEGY'],
    cn: '抖音电商增长策略',
    bg: '#f5c8ab',
    fg: '#17242c',
    cnFg: '#17242c',
    x: 68,
    y: 38,
    rot: 6,
    z: 4,
  },
] as const

export type CaseStudy = {
  id: 'video' | 'photograph' | 'website' | 'strategy'
  no: string
  kicker: string
  title: string
  subtitle: string
  summary: string
  context: string
  role: string
  approach: string[]
  outcomes: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'video',
    no: '01',
    kicker: 'TAOBAO FLASH · AI PRODUCT',
    title: '小饿 AI',
    subtitle: '骑手端 AI 助手的 Agent 化升级与评测基建',
    summary: '从关键词问答升级为具备意图理解、状态感知与工具调用能力的骑手 AI Agent。',
    context: '面向日均服务 200w+ 骑手的物流场景，核心目标是降低骑手跑单 CPO（进线成本）。',
    role: '负责场景方案设计、Agent 架构升级、异常报备 subagent 与评测基建。',
    approach: ['定义 Agent 五层产品架构与主被动双触发策略', '围绕出餐慢、联系不上顾客、地址异常设计端到端对话方案', '建立 Trace 观测、离线回归、在线监控与版本准入闭环'],
    outcomes: ['异常场景骑手 CPO 下降 5.6%', '日均 940 Case 自动评测', '人机一致率 89.79%，问答完全正确率 91.3%'],
  },
  {
    id: 'photograph',
    no: '02',
    kicker: 'XIAOHONGSHU · COMMERCIALIZATION',
    title: 'UGC 促产与广告闭环',
    subtitle: '从 AIGC 共创到授权投流的品牌广告增长方案',
    summary: '围绕供给、分发与资产放大，重构品牌 UGC 促产到投流的完整链路。',
    context: '服务非标、信息流与开屏广告迭代，以 AIGC 创意供给、精准投放和样式创新提升广告收入。',
    role: '负责 UGC 促产产品矩阵、流量激励重构、授权投流闭环与广告样式创新。',
    approach: ['设计“B 端定制 AI 特效 - C 端生成 - 直连发布器”共创链路', '以相关性模型准入与多维评分重构流量激励', '打通“促产 - 授权 - 投流 - 分成”商业化闭环'],
    outcomes: ['笔记发布转化率提升 17.2%', '激励准确率提升至 95%，预算消耗率 98.2%', '授权笔记广告消耗增长 158%，自然转广率提升至 8%'],
  },
  {
    id: 'website',
    no: '03',
    kicker: 'TIKTOK · GLOBAL AIGC',
    title: '广告创意 AIGC',
    subtitle: '全球化评测、本地化需求与产品 GTM',
    summary: '从创意能力评测到全球市场增长，让 AIGC 产品能力在本地需求中实现可规模化落地。',
    context: '负责商业化广告创意 AIGC 的策略迭代与 GTM，提升创意能力的广告收入渗透与投放效果。',
    role: '主导多维评测体系、沙特 TTS 本地化需求落地与全球市场用户增长分析。',
    approach: ['设计脚本、视觉、音频三维评测框架', '结合市场收入、反馈与访谈定义本地化产品需求', '整合 30+ 渠道、10+ 国家市场数据及用户反馈，建立增长闭环'],
    outcomes: ['覆盖全球 20 个语种、100+ TTS 音色测评', '标注一致率提升 150%，支撑策略效果优化 40%', '沙特广告客诉降低 60%，业务季环比增长 120%'],
  },
  {
    id: 'strategy',
    no: '04',
    kicker: 'DOUYIN E-COMMERCE · GROWTH',
    title: '电商增长策略',
    subtitle: '服饰行业经营、营销专项与数据分析',
    summary: '连接行业、产品与流量团队，把经营问题拆解为可验证的增长策略。',
    context: '在抖音电商服饰行业参与经营、营销专项与数据分析，支持行业增长与优质供给引入。',
    role: '主导高价率治理专项、热点营销联动与 618、双 11 等策略分析。',
    approach: ['建立 Badcase 金字塔 SOP，按投产比推进大模型比价化', '联动猜你喜欢、搜索、推荐 Feed 三场域开展 AB 实验', '48 小时跑通短视频种草、直播转化、搜索承接与货架铺货'],
    outcomes: ['月内高价率下降 17pp，自然流高价率下降 8pp', '热点营销话题热榜 Top 5', '行业 GMV 环比提升 46%'],
  },
]

/* ── DESIGN › 01 POSTERS ─────────────────────────────── */
export const POSTERS = [
  { src: 'greenapple', title: 'GREEN APPLE' },
  { src: 'happynewyear', title: 'HAPPY NEW YEAR' },
  { src: 'streamnow', title: 'STREAM NOW' },
  { src: 'butterfly', title: '无人之境 · UNMANNED REALM' },
  { src: 'frangipani', title: 'WHERE FRANGIPANI FALLS' },
  { src: 'chocaward', title: '年度创新糖巧奖' },
  { src: 'childhood', title: 'HELLO CHILDHOOD MEMORIES' },
  { src: 'yexing', title: '夜行之梦 · DREAM IN FLIGHT' },
  { src: 'chocmint', title: '薄荷味夹心黑巧克力' },
  { src: 'grassfest', title: '草地音乐节 · GRASS FEST' },
  { src: 'research', title: 'US-CHINA RESEARCH TRENDS' },
]

/* ── DESIGN › 02 MAGAZINE ────────────────────────────── */
/* 封面 / 封底是单页；中间素材原本按左右跨页导出，拆成单张横版页后按阅读顺序排入。 */
export const MAGAZINE_PAGES = [
  'portfolio-01',
  ...Array.from({ length: 17 }, (_, i) => {
    const no = String(i + 2).padStart(2, '0')
    return [`portfolio-${no}-left`, `portfolio-${no}-right`]
  }).flat(),
  'portfolio-19',
]

/* ── DESIGN › 03 IP DESIGN ───────────────────────────── */
export const IP_DESIGN = {
  kicker: '03 / IP DESIGN',
  title: 'IP DESIGN',
  cn: 'IP 形象设计',
  desc: '围绕一个圆润的原创角色展开：从基础形体、材质到延展物料，建立一套可复用的形象语言。',
  swatches: [
    { name: 'CLAY', hex: '#e3d3bb' },
    { name: 'SAND', hex: '#d6c3a5' },
    { name: 'CREAM', hex: '#f2eadd' },
    { name: 'INK', hex: '#2c2925' },
  ],
  specs: [
    { k: 'FORM', v: '球体 / 圆角几何体' },
    { k: 'MATERIAL', v: '哑光陶土 · 微磨砂' },
    { k: 'OUTPUT', v: '3D 模型 / 表情包 / 周边' },
  ],
}

/* ── PHOTOGRAPH ──────────────────────────────────────── */
export const PHOTOS = [
  'p01', 'p02', 'p03', 'p04', 'p05',
  'p06', 'p07', 'p08', 'p09', 'p10',
  'p11', 'p12', 'p13', 'p14', 'p15',
  'p16', 'p17', 'p18', 'p19', 'p20',
  'p21', 'p22', 'p23', 'p24', 'p25',
  'p26', 'p27', 'p28', 'p29', 'p30',
]

/* ── VIDEO ───────────────────────────────────────────── */
export const VIDEOS = [
  {
    no: '01',
    en: 'CHARACTER PV',
    cn: '动漫单人角色 PV',
    desc: 'Minimax 辅助生成制作二次元风格单人角色宣传短片',
    cover: 'pv1',
    href: 'https://www.feicut.com/fv/FVf0hc366wam?cm=1&fc=2&p=0',
  },
  {
    no: '02',
    en: 'ACTION CUT',
    cn: '动作向动漫 PV',
    desc: '多角色动作分镜与节奏剪辑试验',
    cover: 'pv2',
    href: 'https://www.feicut.com/fv/FVbhfppjrege?cm=1&fc=1&p=0',
  },
]

/* ── WEBSITE & WRITING ───────────────────────────────── */
/* href 是占位：三个站点还没有可公开的正式地址，一律先指向 '#'，
   面板上的 OPEN PROJECT 同时带 aria-disabled。拿到真实链接后只改这三处。
   glow 是每张封面的主色，用来喂 .wsc__glow 的背景光晕 —— 原来那三个值
   （#f6e9c8 / #f7dcd8 / #dceccd）是掺了大量白的浅色，铺在 --paper #f8f7fa 上
   几乎没有色差，看不出光晕；这里往各自封面的主色方向加饱和度。 */
export const WEBSITES = [
  {
    no: '01',
    slug: 'TIKTOK / AIGC',
    title: ['TikTok /', 'AIGC'],
    kicker: 'GLOBAL PRODUCT · GTM',
    desc: '广告创意 AIGC 的全球化评测、本地化产品需求与市场增长闭环。',
    cover: 'coffee',
    glow: '#f2d49a', // 咖啡封面的焦糖黄
    href: '#',
  },
  {
    no: '02',
    slug: 'DOUYIN / GROWTH',
    title: ['Douyin /', 'Growth'],
    kicker: 'STRATEGY · OPERATIONS',
    desc: '从高价率治理、营销活动到行业策略的增长实践。',
    cover: 'drama',
    glow: '#f0bfa4', // 短剧封面的暖橘
    href: '#',
  },
  {
    no: '03',
    slug: 'WECHAT / ARTICLE',
    title: ['WeChat /', 'Article'],
    kicker: 'EDITORIAL · 图文',
    desc: '公众号长图文写作与版式：把调研转成可读、可传播的叙事。',
    cover: 'wechat',
    glow: '#d7e3a4', // 图文封面的草绿
    href: '#',
  },
]

/* ── CONTACT：软木板便签 ─────────────────────────────── */
export const NOTE_COLORS = ['#cfe0c3', '#f0e6a8', '#e8b7b7', '#a9c9dd', '#e5cfe0', '#d8cdb8']

export const SEED_NOTES = [
  { id: 's1', text: 'EMAIL\n1370149335@qq.com', color: '#cfe0c3', x: 14, y: 42, rot: -2 },
  { id: 's2', text: 'GITHUB\ngithub.com/yuxinchen0619', color: '#f0e6a8', x: 70, y: 12, rot: 3 },
  { id: 's3', text: 'WECHAT\ncyx1370149335\nPHONE 15068699079', color: '#e8b7b7', x: 80, y: 33, rot: -3 },
]
