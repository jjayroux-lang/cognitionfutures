'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/lib/mock-data'
import { FileText, CheckSquare, MessageSquare, Paperclip, GripVertical } from 'lucide-react'
import { Button } from './ui/button'

interface CardComponentProps {
  card: Card
}

export default function CardComponent({ card }: CardComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const completedTodos = card.todos.filter(t => t.completed).length
  const totalTodos = card.todos.length
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50 ring-2 ring-cf-blue-300' : ''
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="text-gray-300 hover:text-gray-500 cursor-move -ml-1"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <h4 className="font-medium text-gray-900">{card.title}</h4>
          </div>
          {card.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {totalTodos > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{completedTodos}/{totalTodos}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cf-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {totalTodos > 0 && (
            <div className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              <span>{completedTodos}/{totalTodos}</span>
            </div>
          )}
          {card.notes.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{card.notes.length}</span>
            </div>
          )}
          {card.documents.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              <span>{card.documents.length}</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {new Date(card.created_at).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs flex-1"
          onClick={() => alert('Edit card: ' + card.title)}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs flex-1"
          onClick={() => alert('View details: ' + card.title)}
        >
          Details
        </Button>
      </div>
    </div>
  )
}