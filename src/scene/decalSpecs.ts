/* ============================================================================
 * 柜门贴花的位置表
 *
 * ── 坐标用的是门面百分比 ────────────────────────────────────
 *   left / top  = 贴花左上角相对门面左上角的比例
 *   width       = 贴花宽度相对门宽的比例
 *   高度不写   —— 由贴图 alpha 包围盒的宽高比算，换素材自动跟着变
 *
 * 门内侧那一组的百分比是**镜像坐标系**里的值：`Door_02_InnerContent`
 * 整组绕 Y 转了 180°，法线才朝外，所以它的 left 从门的右边算起。
 *
 * ── 缺的几张 ────────────────────────────────────────────────
 * 参考里还有几张手写纸条和气泡，仓库里没有对应贴图资源，
 * 不能凭空造一张进 3D，这几张就先空着。
 * ========================================================================== */

export type DecalSpec = {
  /** 稳定 id：热点绑定和拖拽状态都按它索引，可交互节点必须稳定命名 */
  id: string
  url: string
  /** 左上角相对门面的比例 */
  left: number
  top: number
  /** 宽度相对门宽的比例 */
  width: number
  /** 面内旋转（度） */
  rot?: number
  /** 是否允许在门板平面内拖动 */
  draggable?: boolean
}

/** 第 1 扇门（关着）外表面 */
// 海报与两个托盘已经换成独立、有厚度的实体组件（Props.tsx）；这里不再保留
// 透明平面副本，否则会与实体重叠并重新产生穿过通风槽的视觉问题。
export const DOOR1_DECALS: readonly DecalSpec[] = []

/** 第 4 扇门（关着）外表面 */
// 原先一张复合 polaroids.webp 已拆成五张可单独拖动的实体磁吸卡。
export const DOOR4_DECALS: readonly DecalSpec[] = []

/**
 * 第 2 扇门的内侧 —— 翻开后正对观众的那一面，贴纸最密的地方。
 *
 * `idcard` 就是 ABOUT 的入口，既是热点也可拖。
 */
export const DOOR2_INNER_DECALS: readonly DecalSpec[] = [
  // 门顶那两张文字贴纸，在参考里左右框住工牌、占满上半屏。
  // 位置按门面 x 657–800 / y 35–665 线性反解给出，同一套反解在工牌上
  // 与参考逐像素吻合。倾角（−3°/+4°）已烘进贴图，不再给 rot。
  { id: 'stk-jad', url: '/assets/obj2/stk10.webp', left: 0.06, top: 0.1, width: 0.34, draggable: true },
  { id: 'stk-nowadays', url: '/assets/obj2/stk11.webp', left: 0.49, top: 0.09, width: 0.34, draggable: true },
  { id: 'idcard', url: '/assets/obj/idcard2.webp', left: 0.26, top: 0.18, width: 0.38, draggable: true },
  { id: 'tapes', url: '/assets/obj/tapes.webp', left: 0.03, top: 0.46, width: 0.26, draggable: true },
  { id: 'stk-love', url: '/assets/obj2/stk6.webp', left: 0.04, top: 0.14, width: 0.21, rot: -4, draggable: true },
  { id: 'stk-wizard', url: '/assets/obj2/stk5.webp', left: 0.72, top: 0.18, width: 0.18, rot: 6, draggable: true },
  { id: 'stk-girl', url: '/assets/obj2/stk1.webp', left: 0.04, top: 0.29, width: 0.17, rot: -2, draggable: true },
  { id: 'stk-cat', url: '/assets/obj2/stk3.webp', left: 0.71, top: 0.3, width: 0.17, rot: 3, draggable: true },
  { id: 'stk-photo', url: '/assets/obj2/stk4.webp', left: 0.13, top: 0.45, width: 0.14, rot: -5, draggable: true },
  { id: 'stk-duo', url: '/assets/obj2/stk2.webp', left: 0.42, top: 0.435, width: 0.25, rot: 2, draggable: true },
  { id: 'stk-red', url: '/assets/obj2/stk7.webp', left: 0.49, top: 0.57, width: 0.24, rot: -3, draggable: true },
  { id: 'stk-omg', url: '/assets/obj2/stk8.webp', left: 0.26, top: 0.605, width: 0.23, rot: 4, draggable: true },
  { id: 'stk-flower', url: '/assets/obj2/stk9.webp', left: 0.73, top: 0.54, width: 0.13, rot: -6, draggable: true },

  // 原版的门内侧从中段一直铺到打字机上沿。现有资源没有那些手写纸条和
  // 破碎爱心的独立纹理，因此复用同一图集里的小贴纸做第二组拼贴；尺寸、
  // 倾角和疏密都刻意错开，避免看起来像规则重复的贴纸墙。0.85 以下留给
  // 吸附在门板底部的实体打字机，拖动时也不会被这些默认位置挡住。
  { id: 'stk-love-lower', url: '/assets/obj2/stk6.webp', left: 0.06, top: 0.69, width: 0.16, rot: 7, draggable: true },
  { id: 'stk-photo-lower', url: '/assets/obj2/stk4.webp', left: 0.25, top: 0.72, width: 0.11, rot: 5, draggable: true },
  { id: 'stk-duo-lower', url: '/assets/obj2/stk2.webp', left: 0.4, top: 0.735, width: 0.2, rot: -5, draggable: true },
  { id: 'stk-wizard-lower', url: '/assets/obj2/stk5.webp', left: 0.69, top: 0.7, width: 0.15, rot: -8, draggable: true },
  { id: 'stk-girl-lower', url: '/assets/obj2/stk1.webp', left: 0.04, top: 0.775, width: 0.13, rot: 4, draggable: true },
  { id: 'stk-omg-lower', url: '/assets/obj2/stk8.webp', left: 0.59, top: 0.79, width: 0.18, rot: 6, draggable: true },
  { id: 'stk-flower-lower', url: '/assets/obj2/stk9.webp', left: 0.82, top: 0.79, width: 0.1, rot: -8, draggable: true },
]

/**
 * 工牌吊环挂点在门内侧内容组里的局部坐标。
 *
 * 参考里工牌是挂在一枚门贴挂钩上的，不是直接贴在门上。挂钩是实体
 * （PhysicalProps 的 IdCardHookModel），位置必须和 `idcard` 这张贴花的
 * 印刷吊环对齐，所以在这里由同一组百分比反算，换素材时一处改动：
 *
 *   贴片宽  w = 0.38 × DOOR_W(0.924)                = 0.35112
 *   贴片高  h = w ÷ 图集宽高比(0.565789)             = 0.62059
 *   贴片中心 x = (0.26 + 0.38/2) × DOOR_W − DOOR_W/2 = −0.0462
 *          y = DOOR_H/2 − (0.18 × DOOR_H + h/2)     =  0.55307
 *   吊环孔在 430×760 原图里的透明区中心 (214.5, 65)：
 *          x = −0.0462 + (214.5/430 − 0.5) × w      = −0.04661
 *          y =  0.55307 + (0.5 − 65/760) × h        =  0.81028
 *   孔洞净空 0.061 × 0.070，勾体直径 0.012，穿得过去。
 *
 * 挂钩底板压在孔上沿之上，所以锚点给的是**底板中心**：
 * y = 孔心 0.810 + 0.087（模型里手臂到底板的距离），z 落在门内侧面上。
 */
export const ID_CARD_HOOK_AT: readonly [number, number, number] = [-0.0466, 0.897, -0.0045]

/** 图集要打包的全部贴图（去重后） */
export const DECAL_URLS: readonly string[] = [
  ...new Set(
    [...DOOR1_DECALS, ...DOOR4_DECALS, ...DOOR2_INNER_DECALS].map((d) => d.url),
  ),
]
