<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- ヘッダー -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">お題履歴</h1>
      <p class="text-gray-600">過去に生成されたお題の履歴を確認できます</p>
    </div>

    <!-- ローディング状態 -->
    <div v-if="appStore.isLoading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- 履歴が空の場合 -->
    <div v-else-if="appStore.history.length === 0" class="text-center py-16">
      <div class="text-gray-400 mb-4">
        <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-gray-500 text-lg mb-4">まだお題を生成していません</p>
      <router-link 
        to="/" 
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
      >
        お題を生成する
      </router-link>
    </div>

    <!-- 履歴リスト -->
    <div v-else class="space-y-4">
      <!-- 統計情報 -->
      <div class="bg-blue-50 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-blue-800">
            <span class="font-medium">{{ appStore.history.length }}件</span>のお題を生成しました
          </div>
          <div class="text-xs text-blue-600">
            セッション: {{ appStore.sessionId.substring(0, 12) }}...
          </div>
        </div>
      </div>

      <!-- 履歴アイテム -->
      <div
        v-for="historyItem in appStore.history"
        :key="historyItem.id"
        class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- カテゴリバッジ -->
            <div class="mb-3">
              <span 
                v-if="historyItem.topic?.category"
                class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {{ historyItem.topic.category.name }}
              </span>
            </div>
            
            <!-- お題テキスト -->
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ historyItem.topic?.text || 'お題が見つかりません' }}
            </h3>
            
            <!-- 生成日時 -->
            <p class="text-sm text-gray-500">
              {{ formatDate(historyItem.createdAt) }}
            </p>
          </div>
          
          <!-- アクションボタン -->
          <div class="flex space-x-2 ml-4">
            <button
              v-if="historyItem.topic"
              @click="addToFavorites(historyItem.topic.id)"
              :disabled="appStore.isLoading"
              class="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center"
              title="お気に入りに追加"
            >
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              お気に入り
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- もっと見るボタン（将来の拡張用） -->
    <div v-if="appStore.history.length >= 50" class="text-center mt-8">
      <p class="text-gray-500 text-sm">最新50件まで表示されています</p>
    </div>
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

// お気に入りに追加
async function addToFavorites(topicId: number) {
  await appStore.addToFavorites(topicId)
}

// 初期化
onMounted(async () => {
  if (!appStore.sessionId) {
    appStore.initializeSession()
  }
  await appStore.fetchHistory()
})
</script>