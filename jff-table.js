import { Canvas, TableView, DataModel } from './node_modules/jff-table/main.js'

const columns = new Array(2000).fill(null).map((e, i) => ({ title: `Column ${i}`, mapper: a => `${a.a}${i}`, visible: true, width: 70 }))
let index = 0
const cells = new Array(2000).fill(null)
    .map(c => new Array(2000).fill(null).map((e, i) => {
        const value = index++
        return { value, formattedValue: value }
    }))

const canvas = new Canvas('canvas', 'auto')
const tableView = new TableView(canvas.rootview.frame, DataModel.spreadsheet(columns, cells))

canvas.rootview.addSubview(tableView)