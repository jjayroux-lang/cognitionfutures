'use client'

import { useState } from 'react'
import { Board, Column, Card } from '@/lib/mock-data'
import { Plus } from 'lucide-react'
import { Button } from './ui/simple-button'

interface SimpleKanbanProps {
  board: Board
}

export default function SimpleKanban({ board }: SimpleKanbanProps) {
  const [columns, setColumns] = useState<Column[]>(board.columns)

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
          <p className="text-gray-600">{board.description}</p>
        </div>
        <Button onClick={handleAddColumn} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Column
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-72">
            <div className="bg-gray-50 rounded-lg p-4 h-full flex flex-col">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{column.name}</h3>
                  <div className="text-xs text-gray-500">
                    {column.cards.length} card{column.cards.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAddCard(column.id)}
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
                      onClick={() => handleAddCard(column.id)}
                      className="text-sm"
                    >
                      + Add first card
                    </Button>
                  </div>
                ) : (
                  column.cards.map((card) => (
                    <div key={card.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-gray-900">{card.title}</h4>
                      {card.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {card.description}
                        </p>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          {card.todos.length > 0 && (
                            <span>
                              ✅ {card.todos.filter(t => t.completed).length}/{card.todos.length}
                            </span>
                          )}
                          {card.notes.length > 0 && (
                            <span>💬 {card.notes.length}</span>
                          )}
                          {card.documents.length > 0 && (
                            <span>📎 {card.documents.length}</span>
                          )}
                        </div>
                      </div>
                    </div>
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
                    onClick={() => handleAddCard(column.id)}
                    className="text-xs h-7"
                  >
                    + Add card
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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