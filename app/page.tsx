import ClassroomDraw from './draw'
import { cookies } from 'next/headers'

export default function Home() {
  const mockNames = [
    "爱丽丝", "鲍勃", "查理", "戴安娜", "伊桑", "菲奥娜", "乔治", "汉娜",
    "伊恩", "朱莉娅", "凯文", "连姆", "米娅", "诺亚", "奥利维亚", "保罗",
    "奎因", "瑞秋", "山姆", "蒂娜", "尤玛", "维克多", "温蒂", "泽维尔",
    "雅拉", "扎克", "亚当", "贝拉", "科迪", "黛西", "艾玛", "弗兰克",
    "格蕾丝", "亨利", "艾薇", "杰克", "凯特", "里奥", "玛雅", "内特",
    "奥斯卡", "佩妮", "昆西", "罗斯", "西蒙", "汤姆", "乌苏拉", "维奥莱特"
  ]
  const cookieNames = cookies().get('availableNames')
  return (
    <ClassroomDraw names={JSON.parse(cookieNames?.value || '[]') || mockNames} />
  )
}
