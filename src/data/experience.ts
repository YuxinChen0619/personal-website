export type ExperienceId = 'alibaba' | 'xiaohongshu' | 'tiktok' | 'douyin'

export type ImpactCard = { value: string; label: string; detail?: string }

export type ExperienceProject = {
  id: string
  title: string
  tagline: string
  background: string
  objective: string
  approach: string[]
  flow?: string[]
  impacts?: ImpactCard[]
  status?: { title: string; metrics: string[] }
  closing: string
}

export type Experience = {
  id: ExperienceId
  no: string
  eyebrow: string
  company: string
  companyCn: string
  role: string
  time: string
  location?: string
  summary: string
  cardScope: string
  cardSummary: string
  projects: ExperienceProject[]
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'alibaba', no: '01', eyebrow: 'TAOBAO FLASH SALE', company: 'Alibaba', companyCn: '淘宝闪购', role: 'AI Agent 产品经理', time: '2026.06 — Present', location: '杭州',
    summary: '负责骑手端 AI 助手「小饿 AI」的场景方案设计与评测基建，围绕真实履约场景，将产品从知识库问答 Chatbot 升级为具备意图理解、状态感知与工具调用能力的任务型 AI Agent。',
    cardScope: '骑手端AI助手「小饿AI」',
    cardSummary: '负责骑手端AI助手「小饿AI」的场景方案设计与评测基建，围绕真实履约场景，将产品从知识库问答Chatbot升级为具备意图理解、状态感知和工具调用能力的任务型AI Agent。',
    projects: [
      {
        id: 'xiaoe-agent', title: '小饿 AI Agent', tagline: '从“告诉骑手怎么办”，到“直接帮骑手把事情办完”',
        background: '原有「小饿」主要是知识库问答 Chatbot。骑手遇到商家出餐慢、联系不上顾客、地址异常等跑单问题时，小饿只能告诉骑手规则，却无法感知骑手当前正在处理哪笔订单，也无法直接执行操作。骑手仍需自行找到订单、进入异常报备页面、选择异常原因、上传凭证并等待校验。真正的问题不是“骑手不知道规则”，而是“知道怎么办之后，事情仍然没有被解决”。',
        objective: '将小饿从只能回答规则的 Chatbot 升级为能够理解当前配送情境、调用业务能力并推动任务完成的 AI Agent。一期优先选择出餐慢、联系不上顾客、地址异常三类高频异常报备场景。',
        approach: ['核心产品判断：模型负责理解，规则负责决策，Tool 负责执行。参与整体 Agent 架构升级，将能力拆分为主 Agent、业务域 / Subagent、Skill 与 Tool，并基于订单、位置、配送状态和历史会话实现上下文感知。', '独立设计端到端执行链路。LLM 负责口语化表达理解、上下文关联与自然语言解释；责任、权益、处罚和金额判断全部交给确定性规则与业务 API。', '以结构化卡片承接订单选择、凭证上传和用户确认；一期外的长尾异常由传统报备大厅兜底。'],
        flow: ['Rider Query', 'Intent', 'Order', 'Rule Check', 'Evidence', 'Tool', 'Result'],
        impacts: [{ value: '−6.04%', label: '跑单异常 CPO' }, { value: '51.5% → 64.7%', label: '异常报备端到端优质率' }, { value: '+13.2pp', label: '场景质量提升', detail: '在部分城市及运力线的 5% 灰度实验中获得统计显著的正向信号。' }],
        closing: '让 AI 从“会回答”进一步变成能够在真实履约场景中安全完成任务的产品能力。',
      },
      {
        id: 'agent-evaluation', title: 'AI Agent 评测基建', tagline: '让 AI 的好坏可量化、可定位、可回归',
        background: 'Agent 最终效果同时受模型、Prompt、知识库、Tool 和业务编排影响。整体准确率无法回答“哪里不好、为什么不好、应该由谁来修”；一次 Prompt 或 Skill 修改也可能解决 Case A、却使 Case B 回归。',
        objective: '从 0→1 建立覆盖日常开发、版本准入和线上监控的质量体系，使每次迭代都能回答：是否解决目标问题、是否伤害其他能力、Badcase 应归因到哪个环节。',
        approach: ['评测不是为了得到一个分数，而是为了指导下一步改什么。建立完整 Trace 观测，记录 Query、最终回复、意图识别、知识检索、Tool 调用与最终结果。', '将评价拆成“问题理解 × 问题解决”，设计三档评分与 13 类负向标签，统一归因到：意图 / 知识 / Tool / Prompt / 装配。', '形成 Trace 观测 → 离线评测 → LLM-as-Judge → 人工复核 → Badcase 回流 → Golden Set → 版本准入闭环。'],
        impacts: [{ value: '940 Cases / Day', label: '日均自动评测量' }, { value: '89.79%', label: '人机评测一致率' }, { value: '91.3%', label: '问答完全正确率' }, { value: '100% → 0%', label: '演绎型幻觉专项' }],
        closing: '把 Agent 迭代从“修一个 Case 算一个 Case”，升级成持续观测、归因、验证和回归的质量工程。',
      },
    ],
  },
  {
    id: 'xiaohongshu', no: '02', eyebrow: 'XIAOHONGSHU COMMERCIALIZATION', company: 'Xiaohongshu', companyCn: '小红书商业化', role: '品牌广告 AI 产品经理', time: '2025.11 — 2026.06',
    summary: '负责品牌广告非标、信息流与开屏产品迭代，围绕 AIGC 创意供给、AI 广告策略与创意样式创新，提升内容供给质量、广告投放效率与品牌商业价值。',
    cardScope: 'UGC促产广告（非标广告）/信息流广告/开屏广告',
    cardSummary: '负责品牌广告非标、信息流与开屏产品迭代，围绕AIGC创意供给、AI广告策略与创意样式创新，提升内容供给质量、广告投放效率与品牌商业价值。',
    projects: [
      {
        id: 'ugc-growth', title: 'UGC 促产到投流', tagline: '让 UGC 从“被生产出来”，走向“被筛选、被放大、被商业化”',
        background: '品牌可通过商业话题与流量激励获得大量用户 UGC，但存在三个断点：用户未必产得出好内容；品牌预算未必流向好内容；优质 UGC 未必能被品牌再次用于广告投放。',
        objective: '将以“话题 + 激励”为核心的单点促产产品，升级为促产 → 筛优分发 → 授权投流的商业闭环。',
        approach: ['AIGC 促产：将品牌 Brief、素材、KV 和创意方向拆为 Prompt、参考图、模型参数和固定组件，形成可规模化复用的品牌「创意包」。用户路径为上传图片 → AI 生成 → 结果预览 → 直接发布；以真实输入测试集和质量准出机制验证人物一致性、主体稳定性、风格遵循、清晰度和安全性。', '筛优分发：将以阅读量为主的阶梯激励升级为 AI 相关性准入 + CTR / 互动率评分 + 新内容加权，先过滤弱相关内容，再集中预算给优质品牌笔记。', '授权投流：设计“发布前主动授权 + 发布后优质内容补授权”两条 C 端路径，在 B 端建设授权 UGC 素材池，供品牌选择优质用户内容继续投放。'],
        impacts: [{ value: '91%–94.2%', label: 'AIGC 生成成功率' }, { value: '95%', label: '内容激励准确率' }, { value: '+20.5%', label: '笔记 CTR' }, { value: '+158%', label: '授权 UGC 广告消耗', detail: 'UGC 自然转广率：<1% → ~8%' }],
        closing: '让 AIGC 不只负责生成一张图片，而是真正成为品牌 UGC 内容生产、分发与商业放大的前端引擎。',
      },
      {
        id: 'gd-retargeting', title: 'GD AI 追投', tagline: '从“这个人是谁”，升级到“他现在是不是正处于决策窗口”',
        background: '传统 GD 广告依靠静态标签判断“这个用户是谁”。品牌需求常是“精致妈妈第一次挑抗老面霜”这类场景化商业命题；标签叠得过细会库存不足，放宽又失去场景精准度，GD 的差异化价值减弱。',
        objective: '将单纯人群定向升级为场景与决策时机定向，既判断用户是谁，也判断“他此刻是否正处于值得品牌触达的决策窗口”。',
        approach: ['客户输入产品、卖点、目标人群与营销诉求后，AI 策略 Skill 自动生成 8-10 个可投放场景；每个场景提供名称、推荐理由、对应内容池和可投量，使输出成为可进入询量和售卖链路的策略资产。', '用户阅读对应内容后进入有效触发窗口，复用 GD 的召回、排序、调价、频控与保量能力。', '新增层为：客户 Brief → AI 策略 → 内容场景 → 用户行为信号。'],
        status: { title: 'STATUS / Product & Technical Review Completed / In Development', metrics: ['CTR', 'Delivery Rate', 'Premium Rate'] },
        closing: '把客户模糊的营销 Brief 转化为真正可以询量、售卖并进入投放链路的 AI 策略资产。',
      },
      {
        id: 'light-curtain', title: '流光映幕', tagline: '从一次性创意广告，到可持续复用的动态化产品能力',
        background: '开屏是高注意力资源位，但标准样式长期同质化；每增加一个互动创意需多端重新开发与联调，单个新样式周期约一个月，热点窗口可能只有几周。',
        objective: '先验证品牌是否愿意为差异化互动开屏买单，再解决创意广告难以规模化复用的问题。',
        approach: ['第一步，从 0→1 设计「流光映幕」互动开屏，以品牌 KV、节日祝福语、品牌氛围色和烟花互动，将静态曝光变为参与式品牌体验；固定核心互动，仅开放素材、颜色和表达层配置。', '第二步，推动 Predy 动态化，将点击 / 上滑 / 跳转 / 基础渲染沉淀为框架层，将素材 / 色彩 / 文案 / 主题特效 / 参数化动效放在模板层；稳定能力一次开发，变化内容配置下发。'],
        impacts: [{ value: '15 Orders', label: '春节首发' }, { value: '¥9.71M', label: '项目收入' }, { value: '+30%', label: 'CTR vs. 常规开屏' }, { value: '1 Month → 1 Week', label: '新样式上线周期', detail: '世界杯版本 CTR：6%' }],
        closing: '先证明一个创意值得卖，再把成功项目中反复出现的能力沉淀为平台。',
      },
    ],
  },
  {
    id: 'tiktok', no: '03', eyebrow: 'TIKTOK FOR BUSINESS', company: 'TikTok', companyCn: 'TikTok 商业化', role: '广告创意 AIGC 产品经理', time: '2025.04 — 2025.11',
    summary: '负责 TikTok 商业化 AIGC 广告创意的产品评测与全球 GTM，围绕 AI 素材质量、本地化体验与产品 Adoption，连接市场需求、产品能力与算法迭代。',
    cardScope: '广告创意AIGC生产与评估/AI产品全球GTM',
    cardSummary: '负责TikTok商业化AIGC广告创意的产品评测与全球GTM，围绕AI素材质量、本地化体验与产品渗透，链接市场需求、产品能力与算法迭代。',
    projects: [
      {
        id: 'creative-evaluation', title: 'AIGC 广告创意评测', tagline: 'AI 生成广告到底什么叫“好”？',
        background: 'TikTok Symphony 已具备 Product-to-Video、AI Avatar、TTS 等 AIGC 创意能力，但“模型能生成”并不等于广告主愿意使用。市场与算法团队对好创意的标准不一致，策略迭代缺少统一可靠的质量标准。',
        objective: '建立跨策略、跨市场的 AIGC 广告创意评测与准出体系，拉齐市场标准和算法标准。',
        approach: ['将创意拆为三维：Script（内容准确性、叙事、Hook、卖点表达）、Visual（安全性、视觉质量、叙事一致性、平台审美）、Audio（TTS 自然度、BGM、口型同步、本地化听感）。', '建立试标 → 业务复核 → 规模化测评 → 市场准出 → 数据复盘流程。', '主导全球 20 个语种、100+ 音色的 TTS 系统测评，将不同市场对语气、节奏、口音与商业表达的偏好转为算法可优化指标。'],
        impacts: [{ value: '20 Languages', label: '全球语种覆盖' }, { value: '100+', label: 'TTS 音色测评' }, { value: '+150%', label: '评测标注一致率' }, { value: '−60%', label: '相关策略优化后客诉', detail: '推动 5 款精品音色上线。' }],
        closing: 'AI 产品经理的重要工作之一，是把“用户觉得好”翻译成模型能够持续优化的标准。',
      },
      {
        id: 'global-gtm', title: '全球市场 GTM', tagline: '从模型能力到市场 Adoption',
        background: 'AIGC 广告创意能力需要进入不同市场的真实广告主工作流；仅完成产品或模型能力，无法保证市场理解、采纳和持续使用。',
        objective: '连接市场需求、产品能力与算法迭代，推动全球市场对 AIGC 广告创意能力的理解与 Adoption。',
        approach: ['以本地市场反馈为输入，围绕产品价值理解、素材质量与本地化体验组织市场协同。', '将市场侧的用户声音和典型案例回流，转译为产品与算法能够处理的优先级与优化方向。', '配合评测、准出和产品材料，降低市场使用门槛。'],
        closing: '全球化产品的落地，不止是语言覆盖，更是将本地市场的判断转化为可被产品持续吸收的能力。',
      },
    ],
  },
  {
    id: 'douyin', no: '04', eyebrow: 'DOUYIN E-COMMERCE', company: 'Douyin E-commerce', companyCn: '抖音电商', role: '服饰行业 策略 & 行业 & 营销活动运营', time: '2024–2025',
    summary: '围绕服饰行业经营问题，连接行业运营、平台产品和流量策略，以数据和机制推动价格竞争力与交易转化。',
    cardScope: '高价率治理、热点捕捉、营销活动运营',
    cardSummary: '围绕服饰行业经营问题，连接行业运营、平台产品和流量策略，以数据和机制推动价格竞争力与交易转化。',
    projects: [
      {
        id: 'price-governance', title: '高价率治理', tagline: '行业 × 产品 × 流量三线协同',
        background: '平台需要提升商品价格竞争力；问题不是单纯要求商家降价，而是同款商品在抖音价格高于其他平台的高价率，可能来自供给、比价识别或流量分配。',
        objective: '将高价率问题拆为行业、产品、流量三条可行动路径，提升行业价格竞争力。',
        approach: ['行业侧，以高价商品清单持续运营干预，并为源头工厂、供应链和优质白牌等低价格带供给制定分型策略。', '产品侧，针对比价模型 Bad Case 建立金字塔式分类与优先级 SOP，推进规格识别、材质判断、款式识别等问题。', '流量侧，联合猜你喜欢、搜索与推荐 Feed 做“扶优打差”AB 实验，对高价商品降权、优质低价商品提权。'],
        impacts: [{ value: '−17pp', label: '相关高价率月内下降' }, { value: '−8pp', label: '自然流高价率进一步下降' }, { value: '#1', label: '所在行业由大组倒数提升至大组第一' }],
        closing: '复杂业务指标很少由单一产品功能解决；关键是判断问题发生在哪一层，再选择对应的产品、策略或运营杠杆。',
      },
      {
        id: 'trend-marketing', title: '热点营销', tagline: '48 小时跑通内容到交易链路',
        background: '热点营销窗口短，只有在有限时间内同时完成内容承接、行业运营、流量协同与交易转化，热点才可能成为实际经营结果。',
        objective: '在 48 小时内跑通从热点内容到电商交易的链路。',
        approach: ['围绕热点节点组织内容、商品、商家与流量协同。', '快速识别可承接热点的行业供给与转化路径，并根据实时反馈推进后续运营动作。'],
        closing: '热点的价值不在于追上话题，而在于在窗口期内把内容注意力真正接入交易链路。',
      },
    ],
  },
]

export const experienceById = (id: ExperienceId) => EXPERIENCES.find((item) => item.id === id)
