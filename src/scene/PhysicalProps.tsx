import { RoundedBox, useTexture } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  ExtrudeGeometry,
  Quaternion,
  Shape,
  SRGBColorSpace,
  Vector3,
  type Texture,
} from 'three'
import {
  FIND_A_WORD_DEPTH,
  FIND_A_WORD_FACE_Z,
  FIND_A_WORD_SIZE,
} from './propSpecs'

type V3 = [number, number, number]

const SHADOWS = { castShadow: true, receiveShadow: true } as const
const Y_AXIS = new Vector3(0, 1, 0)

const PROP_COLORS = {
  cream: '#fff7de',
  paper: '#fffdf6',
  ink: '#493b35',
  softBlue: '#9ed1ea',
  blue: '#5aa7d5',
  blueEdge: '#4c8fb7',
  lilac: '#c9b6ee',
  pink: '#f3bfd5',
  peach: '#f0a26c',
  yellow: '#f4c652',
  orange: '#e9a13e',
  orangeDark: '#b97828',
  mint: '#b9dfc0',
  aqua: '#addddd',
  metal: '#aeb8bd',
  darkMetal: '#68747b',
  record: '#26282a',
  wood: '#b77f3c',
} as const

type RoundedPartProps = {
  size: V3
  at: V3
  color: string
  rotation?: V3
  radius?: number
  roughness?: number
  metalness?: number
  name?: string
}

function RoundedPart({
  size,
  at,
  color,
  rotation,
  radius = 0.018,
  roughness = 0.7,
  metalness = 0,
  name,
}: RoundedPartProps) {
  return (
    <RoundedBox
      {...SHADOWS}
      name={name}
      args={size}
      position={at}
      rotation={rotation}
      radius={Math.min(radius, Math.min(...size) * 0.35)}
      smoothness={2}
    >
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </RoundedBox>
  )
}

type RodBetweenProps = {
  start: V3
  end: V3
  radius: number
  color: string
  radialSegments?: number
  roughness?: number
  metalness?: number
  name?: string
}

/** A real cylinder aligned between two arbitrary local-space points. */
function RodBetween({
  start,
  end,
  radius,
  color,
  radialSegments = 10,
  roughness = 0.58,
  metalness = 0,
  name,
}: RodBetweenProps) {
  const transform = useMemo(() => {
    const from = new Vector3(...start)
    const to = new Vector3(...end)
    const direction = to.clone().sub(from)
    const length = direction.length()
    const quaternion = new Quaternion().setFromUnitVectors(Y_AXIS, direction.normalize())
    return { length, midpoint: from.add(to).multiplyScalar(0.5), quaternion }
  }, [end, start])

  return (
    <mesh
      {...SHADOWS}
      name={name}
      position={transform.midpoint}
      quaternion={transform.quaternion}
    >
      <cylinderGeometry args={[radius, radius, transform.length, radialSegments]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  )
}

function configurePaperTexture(texture: Texture) {
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
}

function usePrintedLabel(kind: 'selected-work' | 'contact' | 'skills') {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 768
    canvas.height = kind === 'selected-work' ? 560 : kind === 'skills' ? 480 : 360
    const context = canvas.getContext('2d')
    if (!context) return new CanvasTexture(canvas)

    context.fillStyle =
      kind === 'selected-work' ? '#fff1c6' : kind === 'skills' ? '#f8fbf7' : '#fffdf6'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle =
      kind === 'selected-work' ? '#dc9a40' : kind === 'skills' ? '#9bd9dc' : '#cabfb1'
    context.lineWidth = 14
    context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36)

    if (kind === 'selected-work') {
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = '900 96px Georgia, serif'
      context.fillStyle = '#db743a'
      context.fillText('SELECTED', canvas.width / 2, 145)
      context.fillStyle = '#45aeca'
      context.fillText('WORK', canvas.width / 2, 255)
      context.font = '800 86px sans-serif'
      context.fillStyle = '#d97c3a'
      context.fillText('作品展示', canvas.width / 2, 405)
    } else if (kind === 'skills') {
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = '800 104px sans-serif'
      context.fillStyle = '#36afc4'
      context.fillText('个人技能', canvas.width / 2, 178)
      context.font = '900 112px Georgia, serif'
      context.fillStyle = '#df7b42'
      context.fillText('SKILLS', canvas.width / 2, 315)
      context.strokeStyle = '#d8c7aa'
      context.lineWidth = 5
      context.beginPath()
      context.moveTo(150, 382)
      context.lineTo(618, 382)
      context.stroke()
    } else {
      context.textAlign = 'left'
      context.textBaseline = 'alphabetic'
      context.font = '700 50px Georgia, serif'
      context.fillStyle = '#3e3935'
      context.fillText('CONTACT', 62, 92)
      context.strokeStyle = '#b8aea2'
      context.lineWidth = 4
      context.beginPath()
      context.moveTo(62, 124)
      context.lineTo(706, 124)
      context.stroke()
      context.font = '500 26px sans-serif'
      context.fillStyle = '#7f756d'
      context.fillText('LET\u2019S MAKE SOMETHING TOGETHER', 62, 180)
      context.fillText('HELLO@KEESU.DESIGN', 62, 236)
    }

    const output = new CanvasTexture(canvas)
    configurePaperTexture(output)
    return output
  }, [kind])

  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

const BOOKS = [
  { x: -0.34, w: 0.074, h: 0.46, color: '#758fdf', tilt: 0 },
  { x: -0.262, w: 0.066, h: 0.42, color: '#f1b692', tilt: 0 },
  { x: -0.191, w: 0.064, h: 0.41, color: '#ffe2b3', tilt: 0 },
  { x: -0.12, w: 0.07, h: 0.39, color: '#fff2b2', tilt: 0 },
  { x: -0.044, w: 0.068, h: 0.44, color: '#efa478', tilt: 0 },
  { x: 0.034, w: 0.065, h: 0.46, color: '#fff0a9', tilt: 0 },
  { x: 0.108, w: 0.067, h: 0.43, color: '#f8f4d5', tilt: 0 },
  { x: 0.181, w: 0.068, h: 0.41, color: '#d5eef1', tilt: 0 },
  { x: 0.26, w: 0.07, h: 0.36, color: '#f5e9dc', tilt: 0 },
  { x: 0.337, w: 0.06, h: 0.32, color: '#ec9ac4', tilt: -0.13 },
] as const

/** Bottom-centred row of individually modelled books (front faces +Z). */
export function BooksModel() {
  return (
    <group name="BooksModel">
      {BOOKS.map((book, index) => (
        <group
          key={`${book.color}-${index}`}
          position={[book.x, book.h / 2, 0]}
          rotation={[0, 0, book.tilt]}
        >
          <RoundedPart
            name={`Book_${index + 1}`}
            size={[book.w, book.h, 0.19]}
            at={[0, 0, 0]}
            color={book.color}
            radius={0.01}
            roughness={0.82}
          />
          <RoundedPart
            size={[book.w * 0.7, 0.011, 0.198]}
            at={[0, book.h * 0.34, 0.006]}
            color={PROP_COLORS.cream}
            radius={0.003}
            roughness={0.9}
          />
          <RoundedPart
            size={[book.w * 0.7, 0.011, 0.198]}
            at={[0, -book.h * 0.34, 0.006]}
            color={PROP_COLORS.cream}
            radius={0.003}
            roughness={0.9}
          />
        </group>
      ))}
    </group>
  )
}

/** Thin printed paper mounted to a rigid, shadow-casting board. Bottom-centred. */
export function FindAWordBoardModel() {
  const texture = useTexture('/assets/obj/findaword2.webp')
  useEffect(() => configurePaperTexture(texture), [texture])

  return (
    <group name="FindAWordBoardModel">
      <RoundedPart
        name="FindAWord_Backboard"
        size={[FIND_A_WORD_SIZE[0], FIND_A_WORD_SIZE[1], FIND_A_WORD_DEPTH]}
        at={[0, FIND_A_WORD_SIZE[1] / 2, 0]}
        color="#f2e9cf"
        radius={0.012}
        roughness={0.9}
      />
      <mesh
        {...SHADOWS}
        name="FindAWord_Print"
        position={[0, FIND_A_WORD_SIZE[1] / 2, FIND_A_WORD_FACE_Z]}
      >
        <planeGeometry args={[0.64, 0.388]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.92}
          metalness={0}
          alphaTest={0.08}
          alphaToCoverage
        />
      </mesh>
      {[-0.29, 0.29].map((x) => (
        <mesh {...SHADOWS} key={x} position={[x, 0.365, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.012, 12]} />
          <meshStandardMaterial color="#c75045" roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/** Suitcase record player. Bottom-centred, front faces +Z. */
export function TurntableModel() {
  const skillsLabel = usePrintedLabel('skills')

  return (
    <group name="TurntableModel">
      <RoundedPart
        name="Turntable_Base"
        size={[0.7, 0.22, 0.4]}
        at={[0, 0.11, 0]}
        color={PROP_COLORS.softBlue}
        radius={0.045}
        roughness={0.62}
      />
      <group name="Turntable_OpenLid" position={[0, 0.23, -0.185]} rotation={[-0.12, 0, 0]}>
        <RoundedPart
          size={[0.62, 0.39, 0.035]}
          at={[0, 0.195, 0]}
          color={PROP_COLORS.softBlue}
          radius={0.025}
          roughness={0.66}
        />
        <RoundedPart
          size={[0.54, 0.31, 0.012]}
          at={[0, 0.195, 0.024]}
          color={PROP_COLORS.cream}
          radius={0.012}
          roughness={0.9}
        />
        <mesh {...SHADOWS} name="Turntable_SkillsCard" position={[0, 0.195, 0.031]}>
          <planeGeometry args={[0.49, 0.27]} />
          <meshStandardMaterial map={skillsLabel} roughness={0.92} metalness={0} />
        </mesh>
      </group>

      {/* 参考视角几乎是正面，完全水平的盘面只会剩一条线。真实结构
          仍然保留，但将盘面组朝观众倾斜 20°，让唱片、唱针和箱体前脸
          同时可见，不再用一张预烘焙的俯视图假装立体。 */}
      <group name="Turntable_TiltedDeck" position={[0, 0.225, 0.02]} rotation={[0.35, 0, 0]}>
        <RoundedPart
          name="Turntable_Deck"
          size={[0.64, 0.035, 0.35]}
          at={[0, 0, 0]}
          color="#e7f5f4"
          radius={0.018}
          roughness={0.7}
        />
        <mesh {...SHADOWS} name="Turntable_Record" position={[-0.085, 0.026, 0.005]}>
          <cylinderGeometry args={[0.145, 0.145, 0.016, 48]} />
          <meshStandardMaterial color={PROP_COLORS.record} roughness={0.38} />
        </mesh>
        <mesh {...SHADOWS} position={[-0.085, 0.037, 0.005]}>
          <cylinderGeometry args={[0.034, 0.034, 0.012, 24]} />
          <meshStandardMaterial color="#f5e5bb" roughness={0.75} />
        </mesh>
        <mesh {...SHADOWS} position={[0.22, 0.035, -0.115]}>
          <cylinderGeometry args={[0.038, 0.042, 0.04, 18]} />
          <meshStandardMaterial color={PROP_COLORS.metal} roughness={0.32} metalness={0.54} />
        </mesh>
        <RodBetween
          name="Turntable_Tonearm"
          start={[0.22, 0.06, -0.11]}
          end={[0.08, 0.06, 0.09]}
          radius={0.009}
          color={PROP_COLORS.metal}
          metalness={0.6}
          roughness={0.28}
        />
        <RoundedPart
          size={[0.052, 0.025, 0.035]}
          at={[0.065, 0.062, 0.105]}
          color="#f4f0e5"
          radius={0.006}
        />
      </group>

      {[-0.225, 0.225].map((x) => (
        <RoundedPart
          key={x}
          size={[0.19, 0.095, 0.025]}
          at={[x, 0.105, 0.208]}
          color="#38434a"
          radius={0.014}
          roughness={0.56}
        />
      ))}
      {[-0.33, 0.33].map((x) => (
        <RoundedPart
          key={x}
          size={[0.04, 0.055, 0.035]}
          at={[x, 0.17, 0.195]}
          color={PROP_COLORS.metal}
          radius={0.01}
          roughness={0.4}
          metalness={0.35}
        />
      ))}
      <mesh {...SHADOWS} name="Turntable_Handle" position={[0, 0.075, 0.222]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.105, 0.015, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#47535a" roughness={0.45} metalness={0.18} />
      </mesh>
      {[-0.105, 0.105].map((x) => (
        <mesh {...SHADOWS} key={x} position={[x, 0.075, 0.222]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.04, 12]} />
          <meshStandardMaterial color="#47535a" roughness={0.45} metalness={0.18} />
        </mesh>
      ))}
    </group>
  )
}

/** Orange document pouch with real pages, flap and printed paper label. */
export function SelectedWorkModel() {
  const label = usePrintedLabel('selected-work')

  return (
    <group name="SelectedWorkModel">
      <RoundedPart
        name="SelectedWork_Case"
        size={[0.62, 0.5, 0.13]}
        at={[0, 0.25, 0]}
        color={PROP_COLORS.yellow}
        radius={0.045}
        roughness={0.78}
      />
      {[-0.035, 0, 0.035].map((z, index) => (
        <RoundedPart
          key={z}
          name={`SelectedWork_Page_${index + 1}`}
          size={[0.52 - index * 0.012, 0.028, 0.09]}
          at={[0, 0.455 + index * 0.018, z]}
          color={index === 2 ? '#f8eed6' : PROP_COLORS.paper}
          radius={0.007}
          roughness={0.94}
        />
      ))}
      <RoundedPart
        name="SelectedWork_Flap"
        size={[0.57, 0.12, 0.045]}
        at={[0, 0.43, 0.082]}
        color="#efb754"
        rotation={[-0.08, 0, 0]}
        radius={0.018}
        roughness={0.78}
      />
      <mesh {...SHADOWS} name="SelectedWork_Label" position={[0, 0.245, 0.067]}>
        <planeGeometry args={[0.48, 0.35]} />
        <meshStandardMaterial map={label} roughness={0.92} />
      </mesh>
      <mesh {...SHADOWS} position={[0.22, 0.405, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.027, 20]} />
        <meshStandardMaterial color={PROP_COLORS.orangeDark} roughness={0.5} />
      </mesh>
      <RodBetween
        start={[0.22, 0.405, 0.124]}
        end={[0.16, 0.46, 0.124]}
        radius={0.006}
        color="#9d6c32"
        roughness={0.7}
      />
    </group>
  )
}

/** Soft low-poly backpack. Bottom-centred, with real straps and stationery. */
export function BackpackModel() {
  return (
    <group name="BackpackModel">
      <RodBetween
        name="Backpack_LeftStrap"
        start={[-0.19, 0.05, -0.1]}
        end={[-0.25, 0.56, -0.1]}
        radius={0.027}
        color="#9b87cb"
        roughness={0.9}
      />
      <RodBetween
        name="Backpack_RightStrap"
        start={[0.19, 0.05, -0.1]}
        end={[0.25, 0.56, -0.1]}
        radius={0.027}
        color="#9b87cb"
        roughness={0.9}
      />
      <RoundedPart
        name="Backpack_Body"
        size={[0.56, 0.68, 0.22]}
        at={[0, 0.34, 0]}
        color="#e8e1f6"
        radius={0.11}
        roughness={0.88}
      />
      <RoundedPart
        name="Backpack_Pocket"
        size={[0.43, 0.3, 0.115]}
        at={[0, 0.235, 0.145]}
        color={PROP_COLORS.lilac}
        radius={0.065}
        roughness={0.88}
      />
      <mesh {...SHADOWS} name="Backpack_Handle" position={[0, 0.68, 0]}>
        <torusGeometry args={[0.105, 0.024, 9, 24, Math.PI]} />
        <meshStandardMaterial color="#9b87cb" roughness={0.9} />
      </mesh>
      <RoundedPart
        size={[0.28, 0.024, 0.025]}
        at={[0, 0.34, 0.207]}
        color="#9078bd"
        radius={0.009}
        roughness={0.75}
      />
      {[
        { x: -0.105, color: '#ef9eb8', h: 0.23 },
        { x: -0.035, color: '#f2c75b', h: 0.26 },
        { x: 0.04, color: '#6fa8d6', h: 0.24 },
        { x: 0.11, color: '#92c9ba', h: 0.22 },
      ].map((pen) => (
        <group key={pen.x} position={[pen.x, 0.49, 0.2]} rotation={[0, 0, pen.x * 0.5]}>
          <mesh {...SHADOWS}>
            <cylinderGeometry args={[0.014, 0.014, pen.h, 10]} />
            <meshStandardMaterial color={pen.color} roughness={0.65} />
          </mesh>
          <mesh {...SHADOWS} position={[0, pen.h / 2 + 0.012, 0]}>
            <coneGeometry args={[0.014, 0.025, 10]} />
            <meshStandardMaterial color="#eee2cd" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

const TYPEWRITER_KEY_ROWS = [10, 10, 9] as const
const TYPEWRITER_KEY_Z = [-0.065, 0, 0.065] as const
const TYPEWRITER_KEYS = TYPEWRITER_KEY_ROWS.flatMap((count, row) =>
  Array.from({ length: count }, (_, inRow) => ({
    x: (inRow - (count - 1) / 2) * 0.058 + (row === 1 ? 0.014 : 0),
    z: TYPEWRITER_KEY_Z[row],
    row,
    inRow,
  })),
)

/**
 * Door-mounted typewriter. Local Z=0 is its magnetic mounting surface;
 * every solid part protrudes toward +Z so it follows the door hinge correctly.
 */
export function TypewriterModel() {
  const contactLabel = usePrintedLabel('contact')

  return (
    <group name="TypewriterModel">
      {[-0.27, 0.27].map((x) => (
        <RoundedPart
          key={x}
          name="Typewriter_Magnet"
          size={[0.12, 0.19, 0.025]}
          at={[x, 0.02, 0.014]}
          color="#59646b"
          radius={0.015}
          roughness={0.42}
          metalness={0.48}
        />
      ))}
      <RoundedPart
        name="Typewriter_Backplate"
        size={[0.72, 0.49, 0.055]}
        at={[0, 0, 0.043]}
        color={PROP_COLORS.cream}
        radius={0.035}
        roughness={0.8}
      />
      <RoundedPart
        name="Typewriter_PaperSupport"
        size={[0.56, 0.3, 0.035]}
        at={[0, 0.095, 0.082]}
        color="#f4ead8"
        radius={0.018}
        roughness={0.86}
      />
      <mesh {...SHADOWS} name="Typewriter_Paper" position={[0, 0.1, 0.101]}>
        <planeGeometry args={[0.5, 0.255]} />
        <meshStandardMaterial map={contactLabel} roughness={0.95} />
      </mesh>
      <mesh {...SHADOWS} name="Typewriter_Platen" position={[0, -0.045, 0.13]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.61, 18]} />
        <meshStandardMaterial color="#59463c" roughness={0.5} />
      </mesh>
      {[-0.325, 0.325].map((x) => (
        <mesh {...SHADOWS} key={x} position={[x, -0.045, 0.13]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.035, 16]} />
          <meshStandardMaterial color={PROP_COLORS.orangeDark} roughness={0.55} />
        </mesh>
      ))}
      <RoundedPart
        name="Typewriter_Body"
        size={[0.7, 0.17, 0.18]}
        at={[0, -0.16, 0.145]}
        color="#f5efe0"
        radius={0.035}
        roughness={0.76}
      />
      {/* 键床、键帽和空格键必须属于同一个局部总成：只旋转白色托板、把键帽
          留在 Typewriter 根坐标里的话，前两排会埋进机身、末排与空格会悬空。 */}
      <group
        name="Typewriter_KeyboardAssembly"
        position={[0, -0.235, 0.295]}
        rotation={[0.38, 0, 0]}
      >
        <RoundedPart
          name="Typewriter_KeyDeck"
          size={[0.67, 0.1, 0.265]}
          at={[0, 0, 0]}
          color="#f4eee0"
          radius={0.025}
          roughness={0.78}
        />
        <RoundedPart
          name="Typewriter_KeyWell"
          size={[0.6, 0.012, 0.25]}
          at={[0, 0.056, 0]}
          color="#d8cfc2"
          radius={0.012}
          roughness={0.82}
        />
        {TYPEWRITER_KEYS.map((key, index) => (
          <RoundedPart
            key={`${key.row}-${key.inRow}`}
            name={`Typewriter_Key_${index + 1}`}
            size={[0.043, 0.018, 0.034]}
            at={[key.x, 0.073, key.z]}
            color={PROP_COLORS.ink}
            radius={0.008}
            roughness={0.52}
          />
        ))}
        <RoundedPart
          name="Typewriter_Spacebar"
          size={[0.25, 0.018, 0.035]}
          at={[0, 0.073, 0.105]}
          color={PROP_COLORS.ink}
          radius={0.008}
          roughness={0.52}
        />
      </group>
      <RodBetween
        name="Typewriter_ReturnArm"
        start={[-0.29, -0.035, 0.145]}
        end={[-0.4, 0.035, 0.17]}
        radius={0.01}
        color={PROP_COLORS.darkMetal}
        roughness={0.3}
        metalness={0.62}
      />
    </group>
  )
}

function makeGuitarBodyShape() {
  const shape = new Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(-0.2, -0.01, -0.34, 0.08, -0.33, 0.27)
  shape.bezierCurveTo(-0.33, 0.43, -0.2, 0.44, -0.18, 0.54)
  shape.bezierCurveTo(-0.16, 0.66, -0.29, 0.7, -0.24, 0.82)
  shape.bezierCurveTo(-0.2, 0.94, -0.07, 0.9, 0, 0.83)
  shape.bezierCurveTo(0.07, 0.9, 0.2, 0.94, 0.24, 0.82)
  shape.bezierCurveTo(0.29, 0.7, 0.16, 0.66, 0.18, 0.54)
  shape.bezierCurveTo(0.2, 0.44, 0.33, 0.43, 0.33, 0.27)
  shape.bezierCurveTo(0.34, 0.08, 0.2, -0.01, 0, 0)
  return shape
}

function makePickguardShape() {
  const shape = new Shape()
  shape.moveTo(-0.035, 0.13)
  shape.bezierCurveTo(-0.17, 0.15, -0.22, 0.26, -0.19, 0.39)
  shape.bezierCurveTo(-0.16, 0.5, -0.09, 0.57, -0.08, 0.7)
  shape.lineTo(0.09, 0.7)
  shape.bezierCurveTo(0.09, 0.56, 0.18, 0.49, 0.18, 0.35)
  shape.bezierCurveTo(0.18, 0.22, 0.12, 0.15, -0.035, 0.13)
  return shape
}

/** Full-thickness stylised electric guitar. Bottom-centred and front-facing +Z. */
export function GuitarModel() {
  const bodyGeometry = useMemo(() => {
    const geometry = new ExtrudeGeometry(makeGuitarBodyShape(), {
      depth: 0.09,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.022,
      bevelThickness: 0.014,
      curveSegments: 16,
      steps: 1,
    })
    geometry.translate(0, 0, -0.045)
    return geometry
  }, [])
  const pickguardGeometry = useMemo(() => {
    const geometry = new ExtrudeGeometry(makePickguardShape(), {
      depth: 0.012,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.008,
      bevelThickness: 0.004,
      curveSegments: 12,
      steps: 1,
    })
    geometry.translate(0, 0, 0.052)
    return geometry
  }, [])

  useEffect(
    () => () => {
      bodyGeometry.dispose()
      pickguardGeometry.dispose()
    },
    [bodyGeometry, pickguardGeometry],
  )

  return (
    <group name="GuitarModel">
      <mesh {...SHADOWS} name="Guitar_Body" geometry={bodyGeometry}>
        <meshStandardMaterial color={PROP_COLORS.blue} roughness={0.56} />
      </mesh>
      <mesh {...SHADOWS} name="Guitar_Pickguard" geometry={pickguardGeometry}>
        <meshStandardMaterial color={PROP_COLORS.cream} roughness={0.72} />
      </mesh>
      <RoundedPart
        name="Guitar_Neck"
        size={[0.13, 0.86, 0.075]}
        at={[0, 1.09, 0]}
        color={PROP_COLORS.wood}
        radius={0.018}
        roughness={0.58}
      />
      <RoundedPart
        name="Guitar_Fretboard"
        size={[0.103, 0.83, 0.026]}
        at={[0, 1.08, 0.052]}
        color="#d79c50"
        radius={0.008}
        roughness={0.62}
      />
      <RoundedPart
        name="Guitar_Headstock"
        size={[0.19, 0.29, 0.085]}
        at={[0.025, 1.65, 0]}
        rotation={[0, 0, -0.08]}
        color={PROP_COLORS.cream}
        radius={0.035}
        roughness={0.68}
      />
      {Array.from({ length: 10 }, (_, index) => (
        <RoundedPart
          key={index}
          name={`Guitar_Fret_${index + 1}`}
          size={[0.108, 0.008, 0.009]}
          at={[0, 0.74 + index * 0.074, 0.071]}
          color="#d8dcda"
          radius={0.002}
          roughness={0.3}
          metalness={0.68}
        />
      ))}
      {[-0.045, -0.027, -0.009, 0.009, 0.027, 0.045].map((x, index) => (
        <RodBetween
          key={x}
          name={`Guitar_String_${index + 1}`}
          start={[x, 0.28, 0.084]}
          end={[x * 0.72, 1.74, 0.084]}
          radius={0.0012 + index * 0.00012}
          color="#d7d4c9"
          radialSegments={6}
          roughness={0.22}
          metalness={0.82}
        />
      ))}
      {[0.36, 0.51].map((y, index) => (
        <RoundedPart
          key={y}
          name={`Guitar_Pickup_${index + 1}`}
          size={[0.19, 0.065, 0.035]}
          at={[0, y, 0.085]}
          color="#aeb5b5"
          radius={0.014}
          roughness={0.38}
          metalness={0.42}
        />
      ))}
      <RoundedPart
        name="Guitar_Bridge"
        size={[0.18, 0.045, 0.035]}
        at={[0, 0.245, 0.085]}
        color={PROP_COLORS.metal}
        radius={0.01}
        roughness={0.35}
        metalness={0.5}
      />
      {[
        [-0.12, 0.19],
        [0.14, 0.2],
        [0.16, 0.3],
      ].map(([x, y], index) => (
        <mesh {...SHADOWS} key={`${x}-${y}`} name={`Guitar_Knob_${index + 1}`} position={[x, y, 0.095]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.027, 0.027, 0.025, 16]} />
          <meshStandardMaterial color="#d4d0bf" roughness={0.48} />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1
        const y = 1.57 + Math.floor(index / 2) * 0.075
        return (
          <group key={index} position={[side * 0.12, y, 0]}>
            <mesh {...SHADOWS} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.024, 0.024, 0.07, 12]} />
              <meshStandardMaterial color={PROP_COLORS.metal} roughness={0.3} metalness={0.62} />
            </mesh>
            <RoundedPart
              size={[0.06, 0.032, 0.025]}
              at={[side * 0.045, 0, 0]}
              color="#e5e0cf"
              radius={0.009}
              roughness={0.45}
            />
          </group>
        )
      })}
      <mesh {...SHADOWS} position={[0, 0.012, 0]}>
        <sphereGeometry args={[0.018, 12, 8]} />
        <meshStandardMaterial color={PROP_COLORS.metal} roughness={0.35} metalness={0.55} />
      </mesh>
    </group>
  )
}

/**
 * A thin magnetic poster board. The supplied artwork is only the printed front;
 * the pale backing and edge thickness are real geometry, so it can cast a clean
 * contact shadow on the locker door instead of intersecting the vent slats.
 */
export function PosterCardModel({
  url = '/assets/obj/posterwall.webp',
}: {
  url?: string
}) {
  const texture = useTexture(url)
  useEffect(() => configurePaperTexture(texture), [texture])

  return (
    <group name="PosterCardModel">
      <RoundedPart
        name="PosterCard_Back"
        size={[0.6, 0.84, 0.009]}
        at={[0, 0, 0.0055]}
        color="#f7f3ea"
        radius={0.008}
        roughness={0.94}
      />
      <mesh {...SHADOWS} name="PosterCard_Print" position={[0, 0, 0.011]}>
        <planeGeometry args={[0.575, 0.805]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.95}
          metalness={0}
          alphaTest={0.08}
          alphaToCoverage
        />
      </mesh>
      {[
        [-0.265, 0.37, -0.08],
        [0.265, 0.37, 0.07],
        [-0.265, -0.37, 0.05],
        [0.265, -0.37, -0.06],
      ].map(([x, y, rotation], index) => (
        <RoundedPart
          key={`${x}-${y}`}
          name={`PosterCard_Tape_${index + 1}`}
          size={[0.105, 0.035, 0.009]}
          at={[x, y, 0.016]}
          rotation={[0, 0, rotation]}
          color="#d9cbea"
          radius={0.004}
          roughness={0.92}
        />
      ))}
    </group>
  )
}

const POLAROID_SOURCE_SIZE = [760, 704] as const

/** Pixel rectangle in the unmodified 760x704 source image, measured from top-left. */
export type PolaroidCrop = Readonly<{
  x: number
  y: number
  width: number
  height: number
}>

/**
 * Real photograph regions inside the supplied three-card composite.
 *
 * These rectangles deliberately stop inside each printed image window instead of
 * sampling the baked white frames/shadows.  The frame and its contact shadow are
 * recreated by geometry below, so every card can move independently without a
 * fragment of either neighbouring card travelling with it.
 */
export const POLAROID_CROPS = {
  friends: { x: 290, y: 70, width: 240, height: 190 },
  beach: { x: 65, y: 325, width: 225, height: 185 },
  camera: { x: 465, y: 350, width: 205, height: 190 },
} as const satisfies Record<string, PolaroidCrop>

function usePolaroidCrop(crop: PolaroidCrop) {
  const source = useTexture('/assets/obj2/polaroids.webp')
  const { x, y, width, height } = crop
  const cropped = useMemo(() => {
    const texture = source.clone()
    const [sourceWidth, sourceHeight] = POLAROID_SOURCE_SIZE

    // Three uses bottom-left UVs, while the measured source rectangles use the
    // normal image top-left origin.  Repeat/offset selects the pixels directly;
    // the physical print plane below uses the same width/height ratio, so there
    // is no horizontal or vertical stretching.
    texture.wrapS = ClampToEdgeWrapping
    texture.wrapT = ClampToEdgeWrapping
    texture.repeat.set(width / sourceWidth, height / sourceHeight)
    texture.offset.set(x / sourceWidth, 1 - (y + height) / sourceHeight)
    configurePaperTexture(texture)
    return texture
  }, [height, source, width, x, y])

  useEffect(() => () => cropped.dispose(), [cropped])
  return cropped
}

/**
 * One independently movable, full-thickness Polaroid card.
 *
 * `size` is the real card body's width/height.  The source crop is fitted inside
 * its photo window with the crop's native aspect ratio; any spare room remains
 * white border instead of distorting the supplied photograph.
 */
export function PolaroidCardModel({
  name,
  crop,
  size,
}: {
  name: string
  crop: PolaroidCrop
  size: readonly [width: number, height: number]
}) {
  const texture = usePolaroidCrop(crop)
  const [cardWidth, cardHeight] = size
  const sourceAspect = crop.width / crop.height
  const maxPhotoWidth = cardWidth - 0.046
  const maxPhotoHeight = cardHeight - 0.084
  const photoWidth = Math.min(maxPhotoWidth, maxPhotoHeight * sourceAspect)
  const photoHeight = photoWidth / sourceAspect
  const photoY = cardHeight / 2 - 0.023 - photoHeight / 2

  return (
    <group name={`${name}_Model`}>
      <RoundedPart
        name={`${name}_Magnet`}
        size={[0.082, 0.082, 0.012]}
        at={[0, 0.02, 0.006]}
        color="#87949a"
        radius={0.028}
        roughness={0.38}
        metalness={0.5}
      />
      <RoundedPart
        name={`${name}_Back`}
        size={[cardWidth, cardHeight, 0.024]}
        at={[0, 0, 0.019]}
        color="#fffdf7"
        radius={0.014}
        roughness={0.94}
      />
      <RoundedPart
        name={`${name}_PhotoBed`}
        size={[photoWidth + 0.008, photoHeight + 0.008, 0.006]}
        at={[0, photoY, 0.034]}
        color="#eee8dc"
        radius={0.006}
        roughness={0.95}
      />
      <mesh {...SHADOWS} name={`${name}_Print`} position={[0, photoY, 0.038]}>
        <planeGeometry args={[photoWidth, photoHeight]} />
        <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
      </mesh>
    </group>
  )
}

export type DoorTrayContent = 'paper' | 'stationery' | 'empty'

/**
 * A door-mounted magnetic tray with real back, floor, front lip and side walls.
 * Its local origin is the centre of the magnetic back surface (Z=0).
 */
export function DoorTrayModel({ content = 'paper' }: { content?: DoorTrayContent }) {
  return (
    <group name={`DoorTrayModel_${content}`}>
      {[-0.18, 0.18].map((x) => (
        <RoundedPart
          key={x}
          name="DoorTray_Magnet"
          size={[0.085, 0.12, 0.022]}
          at={[x, 0.02, 0.012]}
          color="#808b91"
          radius={0.012}
          roughness={0.38}
          metalness={0.5}
        />
      ))}
      <RoundedPart
        name="DoorTray_Back"
        size={[0.48, 0.22, 0.035]}
        at={[0, -0.01, 0.035]}
        color="#f7f5ec"
        radius={0.025}
        roughness={0.86}
      />
      <RoundedPart
        name="DoorTray_Floor"
        size={[0.48, 0.038, 0.18]}
        at={[0, -0.105, 0.11]}
        color="#fbf8ef"
        radius={0.012}
        roughness={0.86}
      />
      <RoundedPart
        name="DoorTray_Lip"
        size={[0.48, 0.095, 0.035]}
        at={[0, -0.065, 0.195]}
        color="#f4f1e7"
        radius={0.016}
        roughness={0.86}
      />
      {[-0.222, 0.222].map((x) => (
        <RoundedPart
          key={x}
          name="DoorTray_Side"
          size={[0.035, 0.2, 0.18]}
          at={[x, -0.01, 0.11]}
          color="#f7f4eb"
          radius={0.012}
          roughness={0.86}
        />
      ))}

      {content === 'paper' && (
        <group name="DoorTray_Papers" position={[0, 0.05, 0.125]} rotation={[-0.08, 0, 0]}>
          {[-0.085, -0.025, 0.045].map((x, index) => (
            <RoundedPart
              key={x}
              size={[0.19, 0.25 + index * 0.018, 0.016]}
              at={[x, 0.025 + index * 0.012, index * 0.012]}
              rotation={[0, 0, (index - 1) * 0.08]}
              color={index === 1 ? '#f8e9ee' : PROP_COLORS.paper}
              radius={0.006}
              roughness={0.95}
            />
          ))}
        </group>
      )}

      {content === 'stationery' && (
        <group name="DoorTray_Stationery">
          {[
            { x: -0.16, w: 0.055, h: 0.2, color: '#f7e59c' },
            { x: -0.1, w: 0.052, h: 0.18, color: '#f3c4d4' },
            { x: -0.042, w: 0.05, h: 0.19, color: '#eef2f3' },
            { x: 0.013, w: 0.052, h: 0.18, color: '#b9dce8' },
          ].map((item) => (
            <RoundedPart
              key={item.x}
              size={[item.w, item.h, 0.07]}
              at={[item.x, item.h / 2 - 0.09, 0.135]}
              color={item.color}
              radius={0.01}
              roughness={0.84}
            />
          ))}
          <mesh {...SHADOWS} name="DoorTray_Ball" position={[0.145, 0.015, 0.145]}>
            <sphereGeometry args={[0.07, 20, 12]} />
            <meshStandardMaterial color="#f2b8c2" roughness={0.72} />
          </mesh>
        </group>
      )}
    </group>
  )
}

/**
 * The self-adhesive door hook the ID badge hangs from.
 *
 * The reference shot has a real wall hook above the badge: a plate stuck on the
 * door, an arm running down it, and a J-curl that comes forward through the
 * badge's ring. The badge itself is a flat cut-out in the decal atlas, so the
 * illusion only holds if the arm crosses the badge plane *inside* the printed
 * ring's hole — hence the exact numbers below:
 *
 *   local origin = centre of the plate's back face, sitting on the door;
 *   +Z leaves the door, so the badge decal plane is at z = +0.0061 and the arm
 *   stays at z = 0.002 (behind it, hidden by the printed ring band) until the
 *   curl carries it out to z = 0.030 in front, inside the hole.
 *
 * The badge can be dragged off; the hook is door hardware and stays put.
 */
export function IdCardHookModel() {
  return (
    <group name="IdCardHook_Model">
      <RoundedPart
        name="IdCardHook_Plate"
        size={[0.066, 0.062, 0.012]}
        at={[0, 0, 0.006]}
        color="#e2e8ec"
        radius={0.012}
        roughness={0.52}
        metalness={0.08}
      />
      {/* Arm runs down flat against the door, hidden behind the printed ring band. */}
      <RodBetween
        name="IdCardHook_Arm"
        start={[0, -0.026, 0.002]}
        end={[0, -0.087, 0.002]}
        radius={0.006}
        color={PROP_COLORS.metal}
        roughness={0.34}
        metalness={0.55}
      />
      {/* Half-torus curl: sweeps from the door side out through the ring's hole. */}
      <group name="IdCardHook_Curl" position={[0, -0.087, 0.016]} rotation={[0, Math.PI / 2, 0]}>
        <mesh {...SHADOWS} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.014, 0.006, 10, 26, Math.PI]} />
          <meshStandardMaterial color={PROP_COLORS.metal} roughness={0.34} metalness={0.55} />
        </mesh>
      </group>
      <RodBetween
        name="IdCardHook_Tip"
        start={[0, -0.087, 0.03]}
        end={[0, -0.062, 0.03]}
        radius={0.006}
        color={PROP_COLORS.metal}
        roughness={0.34}
        metalness={0.55}
      />
    </group>
  )
}
