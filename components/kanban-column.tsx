'use client'

import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Column, Card } from '@/lib/mock-data'
import CardComponent from './kanban-card'
import { Plus, GripVertical } from 'lucide-react'
import { Button } from './ui/button'

interface ColumnComponentProps {
  column: Column
  onAddCard: () => void
}

export default function ColumnComponent({ column, onAddCard }: ColumnComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
  })

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: column.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const cardIds = column.cards.map(card => card.id)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex-shrink-0 w-72 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div
        ref={setDroppableRef}
        className={`bg-gray-50 rounded-lg p-4 h-full flex flex-col ${
          isOver ? 'ring-2 ring-cf-blue-300 ring-inset' : ''
        }`}
      >
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="text-gray-400 hover:text-gray-600 cursor-move"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <div>
              <h3 className="font-semibold text-gray-900">{column.name}</h3>
              <div className="text-xs text-gray-500">
                {column.cards.length} card{column.cards.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddCard}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Cards List */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-4 scrollbar-thin">
          {column.cards.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="mb-2">No cards yet</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddCard}
                className="text-sm"
              >
                + Add first card
              </Button>
            </div>
          ) : (
            column.cards.map((card) => (
              <CardComponent key={card.id} card={card} />
            ))
          )}
        </div>

        {/* Column Footer */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span>
                📝 {column.cards.flatMap(c => c.todos).filter(t => t.completed).length}/
                {column.cards.flatMap(c => c.todos).length}
              </span>
              <span>
                📎 {column.cards.flatMap(c => c.documents).length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddCard}
              className="text-xs h-7"
            >
              + Add card
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}