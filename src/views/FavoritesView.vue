<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- ヘッダー -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">お気に入り</h1>
      <p class="text-gray-600">お気に入りに追加したお題を管理できます</p>
    </div>

    <!-- ローディング状態 -->
    <div v-if="appStore.isLoading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
    </div>

    <!-- お気に入りが空の場合 -->
    <div v-else-if="appStore.favorites.length === 0" class="text-center py-16">
      <div class="text-gray-400 mb-4">
        <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <p class="text-gray-500 text-lg mb-4">お気に入りに追加されたお題はありません</p>
      <router-link 
        to="/" 
        class="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
      >
        お題を生成してお気に入りに追加
      </router-link>
    </div>

    <!-- お気に入りリスト -->
    <div v-else class="space-y-4">
      <!-- 統計情報 -->
      <div class="bg-pink-50 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-pink-800">
            <span class="font-medium">{{ appStore.favorites.length }}件</span>のお気に入りお題があります
          </div>
          <div class="text-xs text-pink-600">
            💖 大切なお題コレクション
          </div>
        </div>
      </div>

      <!-- お気に入りアイテム -->
      <div
        v-for="favorite in appStore.favorites"
        :key="favorite.id"
        class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 border-l-4 border-l-pink-400"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- カテゴリバッジ -->
            <div class="mb-3">
              <span 
                v-if="favorite.topic?.category"
                class="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
              >
                {{ favorite.topic.category.name }}
              </span>
            </div>
            
            <!-- お題テキスト -->
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ favorite.topic?.text || 'お題が見つかりません' }}
            </h3>
            
            <!-- お気に入り追加日時 -->
            <p class="text-sm text-gray-500">
              お気に入り登録: {{ formatDate(favorite.createdAt) }}
            </p>
          </div>
          
          <!-- アクションボタン -->
          <div class="flex space-x-2 ml-4">
            <button
              @click="removeFavorite(favorite.id)"
              :disabled="appStore.isLoading"
              class="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center"
              title="お気に入りから削除"
            >
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              削除
            </button>
          </div>
        </div>
        
        <!-- お気に入りの特別な装飾 -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center text-pink-600 text-sm">
            <svg class="h-4 w-4 mr-1 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            このお題はお気に入りに登録されています
          </div>
        </div>
      </div>
    </div>

    <!-- 削除確認モーダル（将来の拡張用コメント） -->
    <!-- TODO: 削除確認ダイアログを実装する場合はここに追加 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 日付フォーマット
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return `今日 ${date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`
  } else if (diffDays === 1) {
    return `昨日 ${date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`
  } else if (diffDays < 7) {
    return `${diffDays}日前 ${date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}`
  } else {
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

// お気に入りから削除
async function removeFavorite(id: number) {
  if (confirm('このお気に入りを削除しますか？')) {
    await appStore.removeFavorite(id)
  }
}

// 初期化
onMounted(async () => {
  if (!appStore.sessionId) {
    appStore.initializeSession()
  }
  await appStore.fetchFavorites()
})
</script>