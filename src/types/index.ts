export interface Category {
  id: number
  name: string
  _count?: {
    topics: number
  }
}

export interface Topic {
  id: number
  text: string
  categoryId: number
  category: Category
  createdAt: string
  updatedAt: string
}

export interface TopicHistory {
  id: number
  topicId: number
  sessionId?: string
  createdAt: string
  topic?: Topic
}

export interface Favorite {
  id: number
  topicId: number
  sessionId?: string
  createdAt: string
  topic?: Topic
}