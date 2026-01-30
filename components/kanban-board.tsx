'use client'

import { useState } from 'react'
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Board, Column, Card } from '@/lib/mock-data'
import ColumnComponent from './kanban-column'
import CardComponent from './kanban-card'
import { Plus, GripVertical } from 'lucide-react'
import { Button } from './ui/button'

interface KanbanBoardProps {
  board: Board
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>(board.columns)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    
    // Find if it's a card or column
    const cardId = active.id as string
    const columnId = active.id as string
    
    // Check if it's a card
    let foundCard: Card | null = null
    columns.forEach(col => {
      const card = col.cards.find(c => c.id === cardId)
      if (card) foundCard = card
    })
    
    if (foundCard) {
      setActiveCard(foundCard)
    } else {
      // Check if it's a column
      const foundColumn = columns.find(col => col.id === columnId)
      if (foundColumn) {
        setActiveColumn(foundColumn)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      setActiveCard(null)
      setActiveColumn(null)
      return
    }

    // Handle card movement
    if (activeCard) {
      const activeId = active.id as string
      const overId = over.id as string
      
      // Find source and destination columns
      let sourceColumn: Column | null = null
      let destinationColumn: Column | null = null
      let cardIndex = -1
      
      // Find source column and card index
      columns.forEach(col => {
        const cardIndexInCol = col.cards.findIndex(c => c.id === activeId)
        if (cardIndexInCol > -1) {
          sourceColumn = col
          cardIndex = cardIndexInCol
        }
      })
      
      // Find destination column (could be same or different column)
      columns.forEach(col => {
        if (col.id === overId || col.cards.some(c => c.id === overId)) {
          destinationColumn = col
        }
      })
      
      if (sourceColumn && destinationColumn) {
        const newColumns = [...columns]
        const sourceColIndex = newColumns.findIndex(col => col.id === sourceColumn!.id)
        const destColIndex = newColumns.findIndex(col => col.id === destinationColumn!.id)
        
        // Remove card from source column
        const [movedCard] = newColumns[sourceColIndex].cards.splice(cardIndex, 1)
        
        // Add to destination column
        let newIndex = 0
        if (destinationColumn.cards.length > 0) {
          // Find position in destination column
          const overCardIndex = destinationColumn.cards.findIndex(c => c.id === overId)
          newIndex = overCardIndex > -1 ? overCardIndex : destinationColumn.cards.length
        }
        
        movedCard.column_id = destinationColumn.id
        newColumns[destColIndex].cards.splice(newIndex, 0, movedCard)
        
        setColumns(newColumns)
      }
    }
    
    // Handle column reordering
    if (activeColumn) {
      const oldIndex = columns.findIndex(col => col.id === active.id)
      const newIndex = columns.findIndex(col => col.id === over.id)
      
      if (oldIndex !== newIndex) {
        const newColumns = arrayMove(columns, oldIndex, newIndex)
          .map((col, idx) => ({ ...col, order: idx + 1 }))
        
        setColumns(newColumns)
      }
    }
    
    setActiveCard(null)
    setActiveColumn(null)
  }

  const handleAddColumn = () => {
    const name = prompt('Enter column name:')
    if (name) {
      const newColumn: Column = {
        id: `col_${Date.now()}`,
        name,
        board_id: board.id,
        order: columns.length + 1,
        cards: [],
      }
      setColumns([...columns, newColumn])
    }
  }

  const handleAddCard = (columnId: string) => {
    const title = prompt('Enter card title:')
    if (title) {
      const newCard: Card = {
        id: `card_${Date.now()}`,
        title,
        description: '',
        column_id: columnId,
        order: 0,
        created_by: 'user_1',
        created_at: new Date().toISOString(),
        todos: [],
        notes: [],
        documents: [],
      }
      
      const newColumns = columns.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            cards: [...col.cards, newCard],
          }
        }
        return col
      })
      
      setColumns(newColumns)
    }
  }

  const columnIds = columns.map(col => col.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
          <p className="text-gray-600">{board.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <GripVertical className="h-4 w-4" />
            Reorder Columns
          </Button>
          <Button onClick={handleAddColumn} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Column
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          <SortableContext items={columnIds} strategy={verticalListSortingStrategy}>
            {columns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                onAddCard={() => handleAddCard(column.id)}
              />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeCard && (
            <div className="bg-white border-2 border-cf-blue-300 rounded-lg shadow-xl p-4 w-64">
              <div className="font-medium">{activeCard.title}</div>
              {activeCard.description && (
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {activeCard.description}
                </div>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>📝 {activeCard.todos.filter(t => t.completed).length}/{activeCard.todos.length}</span>
                <span>📎 {activeCard.documents.length}</span>
              </div>
            </div>
          )}
          {activeColumn && (
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 w-72 opacity-80">
              <div className="font-medium">{activeColumn.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {activeColumn.cards.length} cards
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Board Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Total Cards</div>
          <div className="text-2xl font-bold text-gray-900">
            {columns.reduce((acc, col) => acc + col.cards.length, 0)}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Completed Tasks</div>
          <div className="text-2xl font-bold text-gray-900">
            {columns
              .flatMap(col => col.cards)
              .flatMap(card => card.todos)
              .filter(todo => todo.completed).length}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Documents</div>
          <div className="text-2xl font-bold text-gray-900">
            {columns
              .flatMap(col => col.cards)
              .flatMap(card => card.documents).length}
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Columns</div>
          <div className="text-2xl font-bold text-gray-900">
            {columns.length}
          </div>
        </div>
      </div>
    </div>
  )
}