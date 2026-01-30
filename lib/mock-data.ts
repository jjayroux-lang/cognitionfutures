export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'agent' | 'partner'
  status: 'online' | 'offline' | 'busy'
  avatar?: string
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  created_at: string
}

export interface Note {
  id: string
  content: string
  created_by: string
  created_at: string
}

export interface Document {
  id: string
  filename: string
  size: number
  type: string
  uploaded_at: string
}

export interface Card {
  id: string
  title: string
  description: string
  column_id: string
  order: number
  created_by: string
  created_at: string
  todos: Todo[]
  notes: Note[]
  documents: Document[]
}

export interface Column {
  id: string
  name: string
  board_id: string
  order: number
  cards: Card[]
}

export interface Board {
  id: string
  name: string
  description: string
  color: string
  order: number
  columns: Column[]
}

// Mock data for development
export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Jay',
    email: 'jay@cognitionfutures.com',
    role: 'admin',
    status: 'online',
  },
  {
    id: 'user_2',
    name: 'Dao',
    email: 'dao@cognitionfutures.com',
    role: 'agent',
    status: 'online',
  },
  {
    id: 'user_3',
    name: 'Pushpak',
    email: 'pushpak@cognitionfutures.com',
    role: 'agent',
    status: 'offline',
  },
]

export const mockBoards: Board[] = [
  {
    id: 'board_1',
    name: 'Research & Analysis',
    description: 'Academic research and literature analysis',
    color: '#3b82f6',
    order: 1,
    columns: [
      {
        id: 'col_1',
        name: 'Backlog',
        board_id: 'board_1',
        order: 1,
        cards: [
          {
            id: 'card_1',
            title: 'Why Love Matters Analysis',
            description: 'Deep dive into Sue Gerhardt\'s neuroscience of attachment and brain development',
            column_id: 'col_1',
            order: 1,
            created_by: 'user_1',
            created_at: '2024-01-30T10:00:00Z',
            todos: [
              { id: 'todo_1', text: 'Read chapters 1-3', completed: true, created_at: '2024-01-30T10:00:00Z' },
              { id: 'todo_2', text: 'Summarize key concepts', completed: false, created_at: '2024-01-30T10:00:00Z' },
              { id: 'todo_3', text: 'Connect to curriculum framework', completed: false, created_at: '2024-01-30T10:00:00Z' },
            ],
            notes: [
              { id: 'note_1', content: 'Started reading - fascinating neuroscience insights!', created_by: 'user_1', created_at: '2024-01-30T10:30:00Z' },
            ],
            documents: [],
          },
          {
            id: 'card_2',
            title: 'Chinese Curriculum Analysis',
            description: 'Analyze Chinese educational standards for market adaptation',
            column_id: 'col_1',
            order: 2,
            created_by: 'user_1',
            created_at: '2024-01-30T11:00:00Z',
            todos: [
              { id: 'todo_4', text: 'Research Chinese EYFS equivalent', completed: false, created_at: '2024-01-30T11:00:00Z' },
              { id: 'todo_5', text: 'Analyze cultural values integration', completed: false, created_at: '2024-01-30T11:00:00Z' },
            ],
            notes: [],
            documents: [],
          },
        ],
      },
      {
        id: 'col_2',
        name: 'In Progress',
        board_id: 'board_1',
        order: 2,
        cards: [
          {
            id: 'card_3',
            title: 'EYFS Framework Analysis',
            description: 'Compare UK Early Years Foundation Stage with our approach',
            column_id: 'col_2',
            order: 1,
            created_by: 'user_2',
            created_at: '2024-01-29T09:00:00Z',
            todos: [
              { id: 'todo_6', text: 'Download EYFS documents', completed: true, created_at: '2024-01-29T09:00:00Z' },
              { id: 'todo_7', text: 'Create comparison matrix', completed: true, created_at: '2024-01-29T10:00:00Z' },
              { id: 'todo_8', text: 'Identify gaps and opportunities', completed: false, created_at: '2024-01-29T11:00:00Z' },
            ],
            notes: [
              { id: 'note_2', content: 'EYFS has strong emphasis on communication and language development', created_by: 'user_2', created_at: '2024-01-29T14:00:00Z' },
            ],
            documents: [
              { id: 'doc_1', filename: 'EYFS_Framework.pdf', size: 2450000, type: 'pdf', uploaded_at: '2024-01-29T09:30:00Z' },
            ],
          },
        ],
      },
      {
        id: 'col_3',
        name: 'Review',
        board_id: 'board_1',
        order: 3,
        cards: [],
      },
      {
        id: 'col_4',
        name: 'Done',
        board_id: 'board_1',
        order: 4,
        cards: [
          {
            id: 'card_4',
            title: 'Project Setup',
            description: 'Initial project infrastructure and research plan',
            column_id: 'col_4',
            order: 1,
            created_by: 'user_1',
            created_at: '2024-01-28T08:00:00Z',
            todos: [
              { id: 'todo_9', text: 'Create project structure', completed: true, created_at: '2024-01-28T08:00:00Z' },
              { id: 'todo_10', text: 'Set up research database', completed: true, created_at: '2024-01-28T09:00:00Z' },
              { id: 'todo_11', text: 'Define initial research questions', completed: true, created_at: '2024-01-28T10:00:00Z' },
            ],
            notes: [],
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 'board_2',
    name: 'Curriculum Development',
    description: 'Age-specific curriculum design and prototyping',
    color: '#8b5cf6',
    order: 2,
    columns: [
      {
        id: 'col_5',
        name: 'Phase 1 (0-3)',
        board_id: 'board_2',
        order: 1,
        cards: [
          {
            id: 'card_5',
            title: 'Attachment Framework',
            description: 'Design secure attachment activities for 0-3 years',
            column_id: 'col_5',
            order: 1,
            created_by: 'user_1',
            created_at: '2024-01-30T09:00:00Z',
            todos: [
              { id: 'todo_12', text: 'Research existing attachment programs', completed: false, created_at: '2024-01-30T09:00:00Z' },
              { id: 'todo_13', text: 'Design parent-child bonding activities', completed: false, created_at: '2024-01-30T09:00:00Z' },
            ],
            notes: [],
            documents: [],
          },
        ],
      },
      {
        id: 'col_6',
        name: 'Phase 2 (3-6)',
        board_id: 'board_2',
        order: 2,
        cards: [],
      },
      {
        id: 'col_7',
        name: 'Phase 3 (6-12)',
        board_id: 'board_2',
        order: 3,
        cards: [],
      },
    ],
  },
  {
    id: 'board_3',
    name: 'Business Development',
    description: 'Investor materials and business planning',
    color: '#10b981',
    order: 3,
    columns: [
      {
        id: 'col_8',
        name: 'To Do',
        board_id: 'board_3',
        order: 1,
        cards: [
          {
            id: 'card_6',
            title: 'Investor Pitch Deck',
            description: 'Create presentation for funding rounds',
            column_id: 'col_8',
            order: 1,
            created_by: 'user_1',
            created_at: '2024-01-30T12:00:00Z',
            todos: [
              { id: 'todo_14', text: 'Define company vision slide', completed: false, created_at: '2024-01-30T12:00:00Z' },
              { id: 'todo_15', text: 'Create market analysis section', completed: false, created_at: '2024-01-30T12:00:00Z' },
            ],
            notes: [],
            documents: [],
          },
        ],
      },
      {
        id: 'col_9',
        name: 'In Progress',
        board_id: 'board_3',
        order: 2,
        cards: [],
      },
      {
        id: 'col_10',
        name: 'Done',
        board_id: 'board_3',
        order: 3,
        cards: [],
      },
    ],
  },
  {
    id: 'board_4',
    name: 'Technical Infrastructure',
    description: 'Hardware specs and software architecture',
    color: '#f59e0b',
    order: 4,
    columns: [
      {
        id: 'col_11',
        name: 'Hardware',
        board_id: 'board_4',
        order: 1,
        cards: [
          {
            id: 'card_7',
            title: 'Learning Device Prototype',
            description: 'Design connected learning toy for 3-6 age group',
            column_id: 'col_11',
            order: 1,
            created_by: 'user_1',
            created_at: '2024-01-30T13:00:00Z',
            todos: [
              { id: 'todo_16', text: 'Research existing educational toys', completed: true, created_at: '2024-01-30T13:00:00Z' },
              { id: 'todo_17', text: 'Sketch initial design concepts', completed: false, created_at: '2024-01-30T13:00:00Z' },
            ],
            notes: [],
            documents: [],
          },
        ],
      },
      {
        id: 'col_12',
        name: 'Software',
        board_id: 'board_4',
        order: 2,
        cards: [],
      },
      {
        id: 'col_13',
        name: 'AI Integration',
        board_id: 'board_4',
        order: 3,
        cards: [],
      },
    ],
  },
]