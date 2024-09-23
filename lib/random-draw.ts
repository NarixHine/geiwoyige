import dayjs from 'dayjs';
import { features } from '@/lib/arrays';

const sepHistory = {
    column: new Array<number>(),
    row: new Array<number>(),
    name: new Array<number>(),
    feature: new Array<number>(),
}

const PROB_FUNC = (x: number) => x + 1e-15

const COLUMNS = 6
const ROWS = 8

function draw<T extends string | number | { name: string }>(type: keyof typeof sepHistory, names: T[]) {
    const history = sepHistory[type]
    const total = names.length
    const weights = new Array(total).fill(0).map((_, i) => {
        const index = history.indexOf(i)
        return index === -1 ? 1.0 : PROB_FUNC(index / total)
    })
    const { result, process } = drawCore({ names, weights, date: dayjs() })
    const index = result.index
    history.unshift(index)
    if (history.length > total) {
        history.pop()
    }
    console.log({
        ...process,
        items: process.items.map(item => {
            return {
                ...item,
                originalName: undefined,
            }
        }),
    })
    return {
        name: result.originalName,
        process,
    }
}

function drawColumn() {
    return draw('column', new Array(COLUMNS).fill(0).map((_, i) => i + 1))
}

function drawColumns(count: number) {
    return new Array(count).fill(0).map(() => drawColumn()).sort((a, b) => a.name - b.name)
}

function drawRow() {
    return draw('row', new Array(ROWS).fill(0).map((_, i) => i + 1))
}

function drawName(nameList: string[]) {
    return draw('name', nameList)
}

function drawFeature() {
    return draw('feature', features)
}

export const Drawer = {
    drawColumn,
    drawColumns,
    drawRow,
    drawName,
    drawFeature,
    features,
}

function drawCore<T extends string | number | { name: string }>({ names, weights, date }: { names: T[], weights: number[], date: dayjs.Dayjs }) {
    const dateFormatted = date.format("MM-DD HH:mm:ss.SSS")
    const parts = [date.format("MMDDHH"), date.format("mmssSSS").slice(0, 5)]
    const totalResult = parts.reduce((acc, cur) => acc + parseInt(cur), 0)
    const totalWeight = weights.reduce((acc, cur) => acc + cur, 0)
    const modulus = totalResult % totalWeight
    let acc = 0
    const items = names.map((name, index) => {
        const weight = weights[index]
        acc += weight
        return {
            index,
            originalName: name,
            name: (name instanceof Object ? name.name : name.toString()),
            weight,
            acc,
        }
    })
    const result = items.find(item => item.acc >= modulus)
    if (!result) {
        throw new Error("No result found")
    }

    return {
        process: {
            date: dateFormatted,
            parts,
            totalResult,
            totalWeight,
            modulus,
            items,
        },
        result,
    }
}
