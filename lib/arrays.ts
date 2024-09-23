import { ArrowsDownUp, At, Calculator, CaretUpDown, Eyeglasses, Eyes, GlobeHemisphereEast, Microscope, Person, PersonSimpleRun, PersonSimpleSwim, Racquet, Student, Brain, OfficeChair, Triangle, Square, PaintBrush, Exam, Article, Sun, Cloud, NumberNine, NumberSeven } from "@phosphor-icons/react"

export const vibrantColors = [
  'bg-red-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-indigo-100', 'bg-purple-100',
  'bg-pink-100', 'bg-orange-100', 'bg-teal-100', 'bg-cyan-100', 'bg-lime-100', 'bg-emerald-100'
]

export const features = [
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
  { name: "戴眼镜", icon: Eyeglasses },
  { name: "不戴眼镜", icon: Eyes },
  { name: "深色系鞋子", icon: Cloud },
  { name: "浅色系鞋子", icon: Sun },

  // Inherent
  { name: "姓名第二个字为左右结构", icon: ArrowsDownUp },
  { name: "姓名第二个字为上下结构", icon: CaretUpDown },
  { name: "姓名第二个字既不是上下结构也不是左右结构", icon: At },
  { name: "学号为奇数", icon: Triangle },
  { name: "学号为偶数", icon: Square },

  // Status
  { name: "非课代表", icon: Person },
  { name: "学生会成员", icon: OfficeChair },
  { name: "非学生会成员", icon: Student },
]
