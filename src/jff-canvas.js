import { Canvas} from 'jff-canvas'
import ConfettiView from './jff-canvas/ConfettiView.js'
import Blob from './jff-canvas/Blob.js'
import LayoutView from './jff-canvas/LayoutView.js'

const animationCanvas = new Canvas('animation-canvas', 'auto')
const layoutCanvas = new Canvas('layout-canvas', 'auto')
animationCanvas.rootview.backgroundColor = layoutCanvas.rootview.backgroundColor = '#DDD'

const cursor = { down: false }

const addConfeffi = (v, e) => {
    const point = v.getPointInView(e.layerX, e.layerY)
    const size = 30
    const confetti = new ConfettiView({ x: point.x - size / 2, y: point.y - size / 2, width: size, height: size })
    v.addSubview(confetti)
    confetti.startAnimation()
}

animationCanvas.rootview.onMousedown = (e) => {
    cursor.down = true
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
    
    addConfeffi(animationCanvas.rootview, e)
}
function onMousemove(e) {
    if (cursor.down) {
        addConfeffi(animationCanvas.rootview, e)
    }
}
function onMouseup(e) {
    cursor.down = false
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
}

const blob = new Blob({ x: animationCanvas.rootview.frame.width / 2 - 50, y: 75, width: 100, height: 100 })
animationCanvas.rootview.addSubview(blob)

const layoutView = new LayoutView(layoutCanvas.rootview.frame)
layoutCanvas.rootview.addSubview(layoutView)

