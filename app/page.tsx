import ClassroomDraw from './draw'
import { cookies } from 'next/headers'

export default function Home() {
  const cookieNames = cookies().get('availableNames')
  return (
    <ClassroomDraw names={JSON.parse(cookieNames?.value || '[]')} />
  )
}
