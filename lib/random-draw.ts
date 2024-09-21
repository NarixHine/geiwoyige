import { ArrowsDownUp, At, Calculator, CaretUpDown, Clock, Eyeglasses, Eyes, GlobeHemisphereEast, Microscope, Person, PersonSimpleRun, PersonSimpleSwim, Racquet, Student, Watch, Brain, OfficeChair, Triangle, Square, Cake, Bread, PaintBrush, Exam, Article, Sun, Cloud, NumberNine, NumberSeven } from "@phosphor-icons/react"

const sepHistory = {
    column: new Array<number>(),
    row: new Array<number>(),
    name: new Array<number>(),
    feature: new Array<number>(),
}

const features = [
    // Desk
    { name: "笔袋或计算器在桌上", icon: Calculator },

    // Lesson
    { name: "体育类社团", icon: Racquet },
    { name: "理科类社团", icon: Brain },
    { name: "文艺类社团", icon: PaintBrush },
    { name: "室外专项（篮球、排球）", icon: PersonSimpleRun },
    { name: "室内专项（乒乓球、羽毛球、游泳）", icon: PersonSimpleSwim },
    { name: "选生物", icon: Microscope },
    { name: "选地理或历史", icon: GlobeHemisphereEast },
    { name: "参加过理科竞赛或正在培训", icon: Exam },
    { name: "未参加理科竞赛且不在培训", icon: Article },
    { name: "上晚自习", icon: NumberNine },
    { name: "不上晚自习", icon: NumberSeven },

    // Appearance
    { name: "戴表", icon: Watch },
    { name: "不戴表", icon: Clock },
    { name: "戴眼镜", icon: Eyeglasses },
    { name: "不戴眼镜", icon: Eyes },
    { name: "深色系鞋子", icon: Cloud },
    { name: "浅色系鞋子", icon: Sun },

    // Inherent
    { name: "姓为左右结构", icon: ArrowsDownUp },
    { name: "姓为上下结构", icon: CaretUpDown },
    { name: "姓既不是上下结构也不是左右结构", icon: At },
    { name: "学号为奇数", icon: Triangle },
    { name: "学号为偶数", icon: Square },
    { name: "距离下一个生日≤6个月", icon: Cake },
    { name: "距离下一个生日>6个月", icon: Bread },

    // Status
    { name: "非课代表", icon: Person },
    { name: "学生会成员", icon: OfficeChair },
    { name: "非学生会成员", icon: Student },
]

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
    if (history.length > total) {
        history.pop()
    }
    const returnValue = result === -1 ? (total - 1) : result;
    console.log(type, result, rand, weights[result], weights)
    return returnValue
}

function drawColumn() {
    return draw('column', 6) + 1
}

function drawColumns(count: number) {
    return new Array(count).fill(0).map(() => drawColumn()).sort((a, b) => a - b)
}

function drawRow() {
    return draw('row', 8) + 1
}

function drawName(nameList: string[]) {
    return nameList[draw('name', nameList.length)]
}

function drawFeature() {
    return features[draw('feature', features.length)]
}

export default {
    drawColumn,
    drawColumns,
    drawRow,
    drawName,
    drawFeature,
    features,
}
