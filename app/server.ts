'use server'

import { cookies } from 'next/headers'

export async function uploadNames(names: string[]): Promise<string[]> {
  const cookieStore = cookies()
  cookieStore.set('availableNames', JSON.stringify(names), {
    path: '/',
    maxAge: 31536000, // 1 year in seconds
  })
  return names
}
