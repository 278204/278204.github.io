import { View } from 'jff-canvas'

export default class RectangleView extends View {
    constructor(frame) {
        super(frame)

        this.handles = []
        this.backgroundColor = 'white'
        this.cursor = { x: 0, y: 0 }
    }
}
