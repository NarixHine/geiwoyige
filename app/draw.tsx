'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { History, MonitorUp } from "lucide-react"
import { uploadNames } from './server'

type DrawType = 'name' | 'column' | 'row'

interface HistoryItem {
  type: DrawType
  value: string | number
}

export default function ClassroomDraw({ names }: { names: string[] }) {
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null)
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null)
  const [drawnName, setDrawnName] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [availableNames, setAvailableNames] = useState<string[]>(names)
  const [showType, setShowType] = useState<DrawType>('name')
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    drawName()
  }, [])

  const updateHistory = (type: DrawType, value: string | number) => {
    setHistory(prev => [{ type, value }, ...prev.slice(0, 4)])
  }

  const drawColumn = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const newColumn = Math.floor(Math.random() * 6) + 1 // 1 to 6
      setHighlightedColumn(newColumn)
      setHighlightedRow(null)
      setShowType('column')
      updateHistory('column', newColumn)
      setIsAnimating(false)
    }, 300)
  }

  const drawRow = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const newRow = Math.floor(Math.random() * 8) + 1 // 1 to 8
      setHighlightedRow(newRow)
      setHighlightedColumn(null)
      setShowType('row')
      updateHistory('row', newRow)
      setIsAnimating(false)
    }, 300)
  }

  const drawName = () => {
    console.log(availableNames)
    if (availableNames.length === 0) return

    setIsAnimating(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableNames.length)
      const newName = availableNames[randomIndex]
      const updatedNames = availableNames.filter(name => name !== newName)
      setDrawnName(newName)
      setAvailableNames(updatedNames)
      document.cookie = `availableNames=${encodeURIComponent(JSON.stringify(updatedNames))}; path=/; max-age=31536000`
      setShowType('name')
      updateHistory('name', newName)
      setIsAnimating(false)
    }, 300)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target?.result as string
        const newNames = content.split('\n').map(name => name.trim()).filter(name => name)
        const updatedNames = await uploadNames(newNames)
        setAvailableNames(updatedNames)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 text-gray-800 p-4 pb-24 relative">
      <div className="absolute top-4 right-4">
        <label className="w-12 h-12 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center cursor-pointer">
          <MonitorUp className="w-5 h-5" />
          <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center justify-center flex-grow">
        <div className="w-full flex flex-col items-center justify-center mb-4">
          {showType === 'name' && (
            <div className="text-9xl font-bold text-center transition-opacity duration-300 ease-in-out mb-4" aria-live="polite">
              {drawnName}
            </div>
          )}
          {(showType === 'column' || showType === 'row') && (
            <div className="flex flex-col items-center mb-4">
              <div className="text-7xl font-bold mb-4 text-center" aria-live="polite">
                {showType === 'column' ? `第 ${highlightedColumn} 列` : `第 ${highlightedRow} 行`}
              </div>
              <div className="flex">
                {[6, 5, 4, 3, 2, 1].map((column) => (
                  <div key={column} className="flex flex-col-reverse">
                    {[8, 7, 6, 5, 4, 3, 2, 1].map((row) => (
                      <div
                        key={`${column}-${row}`}
                        className={`w-6 h-6 md:w-8 md:h-8 border border-gray-300 m-1 transition-colors duration-300 ease-in-out
                          ${(showType === 'column' && highlightedColumn === column) || (showType === 'row' && highlightedRow === row) ? 'bg-gray-800' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="w-full text-2xl text-gray-600 mt-5 text-center">
            <History className="inline-block mr-2 pb-1 align-middle" />
            {history.map((item, index) => (
              <span key={index}>
                {item.type === 'name' ? item.value : item.type === 'column' ? `第${item.value}列` : `第${item.value}行`}
                {index < history.length - 1 ? ' → ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-lg flex items-end justify-center space-x-4 px-8 bg-white bg-opacity-80 rounded-full shadow-lg backdrop-blur-sm fixed bottom-8 left-1/2 transform -translate-x-1/2 h-20">
        <Button
          onClick={drawColumn}
          className="w-20 h-20 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center text-2xl font-medium transform -translate-y-8 shadow-md hover:shadow-lg hover:scale-110 hover:-translate-y-10"
          disabled={isAnimating}
        >
          ⅙
        </Button>
        <Button
          onClick={drawName}
          className="w-28 h-28 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 flex items-center justify-center text-5xl shadow-lg hover:shadow-xl transform -translate-y-10 hover:scale-110 hover:-translate-y-12"
          disabled={isAnimating || availableNames.length === 0}
        >
          ¹⁄₄₈
        </Button>
        <Button
          onClick={drawRow}
          className="w-20 h-20 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center text-2xl font-medium transform -translate-y-8 shadow-md hover:shadow-lg hover:scale-110 hover:-translate-y-10"
          disabled={isAnimating}
        >
          ⅛
        </Button>
      </div>
    </div>
  )
}