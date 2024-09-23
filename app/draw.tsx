'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { History, MonitorUp } from "lucide-react"
import { uploadNames } from './server'
import { Drawer } from './random-draw'
import { Plus } from '@phosphor-icons/react'
import { vibrantColors } from '@/lib/arrays'

type DrawType = 'name' | 'column' | 'row' | 'columns'

interface HistoryItem {
  type: DrawType
  value: string | number | number[]
}

export default function ClassroomDraw({ names }: { names: string[] }) {
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null)
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null)
  const [drawnName, setDrawnName] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [availableNames, setAvailableNames] = useState<string[]>(names)
  const [showType, setShowType] = useState<DrawType>('name')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [highlightedColumns, setHighlightedColumns] = useState<number[]>([])
  const [drawnFeature, setDrawnFeature] = useState<typeof Drawer.features[number] | null>(null)
  const [featureColor, setFeatureColor] = useState<string>('')

  const updateHistory = (type: DrawType, value: string | number) => {
    setHistory(prev => [{ type, value }, ...prev.slice(0, 4)])
  }

  const drawColumn = () => {
    setDrawnFeature(null)
    setIsAnimating(true)
    setTimeout(() => {
      const result = Drawer.drawColumn()
      const newColumn = result.name
      setHighlightedColumn(newColumn)
      setHighlightedRow(null)
      setShowType('column')
      updateHistory('column', newColumn)
      setIsAnimating(false)
    }, 300)
  }

  const drawRow = () => {
    setDrawnFeature(null)
    setIsAnimating(true)
    setTimeout(() => {
      const result = Drawer.drawRow()
      const newRow = result.name
      setHighlightedRow(newRow)
      setHighlightedColumn(null)
      setShowType('row')
      updateHistory('row', newRow)
      setIsAnimating(false)
    }, 300)
  }

  const drawName = () => {
    setDrawnFeature(null)
    if (availableNames.length === 0) return

    setIsAnimating(true)
    setTimeout(() => {
      const result = Drawer.drawName(availableNames)
      const newName = result.name
      setDrawnName(newName)
      setShowType('name')
      updateHistory('name', newName)
      setIsAnimating(false)
    }, 300)
  }

  const drawColumns = (count: number) => {
    setDrawnFeature(null)
    setIsAnimating(true)
    setTimeout(() => {
      const result = Drawer.drawColumns(count)
      const newColumns = result.map(column => column.name)
      setHighlightedColumns(newColumns)
      setHighlightedColumn(null)
      setHighlightedRow(null)
      setShowType('columns')
      updateHistory('columns', newColumns.toString())
      setIsAnimating(false)
    }, 300)
  }

  const drawFeature = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const result = Drawer.drawFeature();
      const newFeature = result.name
      setDrawnFeature(newFeature)
      const randomColorIndex = Math.floor(Math.random() * vibrantColors.length)
      setFeatureColor(vibrantColors[randomColorIndex])
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
        <div className="w-full text-2xl text-gray-600 text-center">
          <History className="inline-block mr-2 pb-1 align-middle" />
          {history.map((item, index) => (
            <span key={index}>
              {item.type === 'name' ? item.value : item.type === 'column' ? `第${item.value}列` : `第${item.value}行`}
              {index < history.length - 1 ? ' → ' : ''}
            </span>
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-4">
          {showType === 'name' && (
            <div className="text-9xl font-bold text-center transition-opacity duration-300 ease-in-out mb-4" aria-live="polite">
              {drawnName}
            </div>
          )}
          {(showType === 'column' || showType === 'row' || showType === 'columns') && (
            <div className="flex flex-row-reverse mt-4">
              {[1, 2, 3, 4, 5, 6].map((column) => (
                <div key={column} className="flex flex-col">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                    <div
                      key={`${column}-${row}`}
                      className={`w-6 h-5 md:w-8 md:h-6 border border-gray-300 m-1 transition-colors duration-300 ease-in-out
                        ${(showType === 'column' && highlightedColumn === column) ||
                          (showType === 'row' && highlightedRow === row) ||
                          (showType === 'columns' && highlightedColumns.includes(column)) ? 'bg-gray-800' : 'bg-white'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="flex mt-4 space-x-4 items-center justify-center z-10">
            {drawnFeature && (
              <div className={`px-4 py-2 ${featureColor} rounded-full text-lg md:text-2xl text-gray-800 transition-all duration-300 ease-in-out flex items-center`} aria-live="polite">
                <drawnFeature.icon className="w-10 h-10 mr-2" />
                {drawnFeature.name}
              </div>
            )}
            <Button
              onClick={drawFeature}
              className="w-14 h-14 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              disabled={isAnimating}
            >
              <Plus className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-lg flex items-end justify-center space-x-4 px-8 bg-white bg-opacity-80 rounded-full shadow-lg backdrop-blur-sm fixed bottom-8 left-1/2 transform -translate-x-1/2 h-20">
        <Button
          onClick={() => drawColumns(2)}
          className="w-20 h-20 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center text-2xl font-medium transform -translate-y-8 shadow-md hover:shadow-lg hover:scale-110 hover:-translate-y-10"
          disabled={isAnimating}
        >
          ⅓
        </Button>
        <Button
          onClick={drawColumn}
          className="w-20 h-20 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center text-2xl font-medium transform -translate-y-8 shadow-md hover:shadow-lg hover:scale-110 hover:-translate-y-10"
          disabled={isAnimating}
        >
          ⅙
        </Button>
        <Button
          onClick={drawName}
          className="w-36 h-28 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 flex items-center justify-center text-5xl shadow-lg hover:shadow-xl transform -translate-y-10 hover:scale-110 hover:-translate-y-12"
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
        <Button
          onClick={() => drawColumns(3)}
          className="w-20 h-20 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center text-2xl font-medium transform -translate-y-8 shadow-md hover:shadow-lg hover:scale-110 hover:-translate-y-10"
          disabled={isAnimating}
        >
          ½
        </Button>
      </div>
    </div >
  )
}