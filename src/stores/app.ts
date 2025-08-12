import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '@/services/api'
import type { Category, Topic, TopicHistory, Favorite } from '@/types'

export const useAppStore = defineStore('app', () => {
  // セッションID（ローカルストレージで永続化）
  const sessionId = ref<string>('')

  // データ
  const categories = ref<Category[]>([])
  const currentTopic = ref<Topic | null>(null)
  const selectedCategoryId = ref<number | null>(null)
  const history = ref<TopicHistory[]>([])
  const favorites = ref<Favorite[]>([])

  // ローディング状態
  const isLoading = ref(false)
  const isCategoriesLoading = ref(false)
  const isTopicLoading = ref(false)

  // エラー状態
  const error = ref<string>('')

  // 成功メッセージ状態
  const successMessage = ref<string>('')

  // Computed
  const selectedCategory = computed(() =>
    selectedCategoryId.value
      ? categories.value.find(c => c.id === selectedCategoryId.value)
      : null
  )

  // セッションIDの初期化
  function initializeSession() {
    // ローディング状態を明示的にリセット
    isLoading.value = false
    isCategoriesLoading.value = false
    isTopicLoading.value = false

    let storedSessionId = localStorage.getItem('odai-maker-session-id')
    if (!storedSessionId) {
      storedSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
      localStorage.setItem('odai-maker-session-id', storedSessionId)
    }
    sessionId.value = storedSessionId
  }

  // カテゴリ一覧取得
  async function fetchCategories() {
    try {
      isCategoriesLoading.value = true
      error.value = ''
      categories.value = await apiService.getCategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'カテゴリの取得に失敗しました'
      console.error('カテゴリ取得エラー:', err)
    } finally {
      isCategoriesLoading.value = false
    }
  }

  // ランダムお題取得
  async function fetchRandomTopic() {
    try {
      isTopicLoading.value = true
      isLoading.value = true
      error.value = ''
      const topic = await apiService.getRandomTopic(selectedCategoryId.value || undefined)
      currentTopic.value = topic

      // 履歴に追加
      await apiService.addToHistory(topic.id, sessionId.value)
      await fetchHistory() // 履歴を更新

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'お題の取得に失敗しました'
      console.error('お題取得エラー:', err)
    } finally {
      isTopicLoading.value = false
      isLoading.value = false
    }
  }

  // 履歴取得
  async function fetchHistory() {
    try {
      history.value = await apiService.getHistory(sessionId.value)
    } catch (err) {
      console.error('履歴取得エラー:', err)
    }
  }

  // お気に入り取得
  async function fetchFavorites() {
    try {
      favorites.value = await apiService.getFavorites(sessionId.value)
    } catch (err) {
      console.error('お気に入り取得エラー:', err)
    }
  }

  // お気に入りに追加
  async function addToFavorites(topicId: number) {
    try {
      error.value = ''
      successMessage.value = ''
      await apiService.addToFavorites(topicId, sessionId.value)
      await fetchFavorites() // お気に入りを更新

      // 成功メッセージを表示
      successMessage.value = 'お気に入りに追加しました！'

      // 3秒後に成功メッセージをクリア
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'お気に入りの追加に失敗しました'
      console.error('お気に入り追加エラー:', err)
    }
  }

  // お気に入りから削除
  async function removeFavorite(id: number) {
    try {
      await apiService.removeFavorite(id)
      await fetchFavorites() // お気に入りを更新
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'お気に入りの削除に失敗しました'
      console.error('お気に入り削除エラー:', err)
    }
  }

  // カテゴリ選択
  function selectCategory(categoryId: number | null) {
    selectedCategoryId.value = categoryId
  }

  // エラークリア
  function clearError() {
    error.value = ''
  }

  // 成功メッセージクリア
  function clearSuccessMessage() {
    successMessage.value = ''
  }

  return {
    // State
    sessionId,
    categories,
    currentTopic,
    selectedCategoryId,
    history,
    favorites,
    isLoading,
    isCategoriesLoading,
    isTopicLoading,
    error,
    successMessage,

    // Computed
    selectedCategory,

    // Actions
    initializeSession,
    fetchCategories,
    fetchRandomTopic,
    fetchHistory,
    fetchFavorites,
    addToFavorites,
    removeFavorite,
    selectCategory,
    clearError,
    clearSuccessMessage,
  }
})