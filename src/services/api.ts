import type { Category, Topic, TopicHistory, Favorite } from '@/types'

const API_BASE_URL = 'http://localhost:3000/api'

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`

      try {
        const errorData = await response.json()
        if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch {
        // JSONパースに失敗した場合はデフォルトメッセージを使用
      }

      const error = new Error(errorMessage)
        // エラーオブジェクトにステータスコードを追加
        ; (error as any).status = response.status
      throw error
    }

    return response.json()
  }

  // カテゴリ関連
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories')
  }

  // お題関連
  async getTopics(categoryId?: number): Promise<Topic[]> {
    const params = categoryId ? `?categoryId=${categoryId}` : ''
    return this.request<Topic[]>(`/topics${params}`)
  }

  async getRandomTopic(categoryId?: number): Promise<Topic> {
    const params = categoryId ? `?categoryId=${categoryId}` : ''
    return this.request<Topic>(`/topics/random${params}`)
  }

  // 履歴関連
  async addToHistory(topicId: number, sessionId?: string): Promise<TopicHistory> {
    return this.request<TopicHistory>('/history', {
      method: 'POST',
      body: JSON.stringify({ topicId, sessionId }),
    })
  }

  async getHistory(sessionId?: string): Promise<TopicHistory[]> {
    const params = sessionId ? `?sessionId=${sessionId}` : ''
    return this.request<TopicHistory[]>(`/history${params}`)
  }

  // お気に入り関連
  async addToFavorites(topicId: number, sessionId?: string): Promise<Favorite> {
    return this.request<Favorite>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ topicId, sessionId }),
    })
  }

  async getFavorites(sessionId?: string): Promise<Favorite[]> {
    const params = sessionId ? `?sessionId=${sessionId}` : ''
    return this.request<Favorite[]>(`/favorites${params}`)
  }

  async removeFavorite(id: number): Promise<void> {
    await this.request(`/favorites/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()