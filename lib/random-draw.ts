const sepHistory = {
    column: new Array<number>(),
    row: new Array<number>(),
    name: new Array<number>(),
}

const PROB_FUNC = (x: number) => x + 1e-15

function draw(type: keyof typeof sepHistory, total: number) {
    const history = sepHistory[type]
    const weights = new Array(total).fill(0).map((_, i) => {
        const index = history.indexOf(i)
        return index === -1 ? 1.0 : PROB_FUNC(index / total)
    })
    const sum = weights.reduce((acc, cur) => acc + cur, 0)
    const rand = Math.random() * sum
    let r = rand
    const result = weights.findIndex(w => {
        r -= w
        return r < 0
    })
    history.unshift(result)
    console.log(rand, weights[result], weights)
    if (history.length > total) {
        history.pop()
    }
    return result === -1 ? (total - 1) : result
}

function drawColumn() {
    return draw('column', 6) + 1
}

function drawRow() {
    return draw('row', 8) + 1
}

function drawName(nameList: string[]) {
    return nameList[draw('name', nameList.length)]
}

function drawFeature() {

}

export default {
    drawColumn,
    drawRow,
    drawName,
    drawFeature,
}
