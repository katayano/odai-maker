<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <!-- ヘッダー -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">お題メーカー</h1>
      <p class="text-gray-600">ボタンを押してランダムなお題を生成しよう！</p>
    </div>

    <!-- エラー表示 -->
    <div v-if="appStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-800">{{ appStore.error }}</p>
        </div>
        <div class="ml-auto pl-3">
          <button 
            @click="appStore.clearError"
            class="text-red-400 hover:text-red-600"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 成功メッセージ表示 -->
    <div v-if="appStore.successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-fade-in">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-green-800">{{ appStore.successMessage }}</p>
        </div>
        <div class="ml-auto pl-3">
          <button 
            @click="appStore.clearSuccessMessage"
            class="text-green-400 hover:text-green-600"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- カテゴリ選択 -->
    <div class="mb-8">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        カテゴリを選択（任意）
      </label>
      <select 
        v-model="appStore.selectedCategoryId"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option :value="null">ランダム（全カテゴリ）</option>
        <option 
          v-for="category in appStore.categories" 
          :key="category.id" 
          :value="category.id"
        >
          {{ category.name }}
          <span v-if="category._count">({{ category._count.topics }}件)</span>
        </option>
      </select>
    </div>

    <!-- お題生成ボタン -->
    <div class="text-center mb-8">
      <button 
        @click="generateTopic"
        :disabled="appStore.isLoading"
        class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <div v-if="appStore.isLoading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          生成中...
        </div>
        <div v-else>お題を出す</div>
      </button>
    </div>

    <!-- お題表示エリア -->
    <div v-if="appStore.currentTopic" class="bg-white rounded-xl shadow-lg p-8 mb-6 border-l-4 border-blue-500">
      <div class="text-center">
        <div class="mb-4">
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {{ appStore.currentTopic.category.name }}
          </span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          {{ appStore.currentTopic.text }}
        </h2>
        <div class="flex justify-center space-x-4">
          <button 
            @click="addToFavorites"
            :disabled="appStore.isLoading || isAddingToFavorites || appStore.isCurrentTopicFavorited"
            :class="[
              'px-4 py-2 rounded-lg transition-all duration-200 flex items-center font-medium',
              {
                'bg-pink-500 hover:bg-pink-600 text-white hover:scale-105 hover:shadow-lg': !isAddingToFavorites && !appStore.isLoading && !appStore.isCurrentTopicFavorited,
                'bg-green-500 text-white scale-105 shadow-lg': isAddingToFavorites,
                'bg-gray-400 text-white cursor-not-allowed': appStore.isLoading || appStore.isCurrentTopicFavorited,
                'bg-gray-500 text-white': appStore.isCurrentTopicFavorited
              }
            ]"
          >
            <svg 
              :class="[
                'h-4 w-4 mr-2 transition-all duration-200',
                {
                  'animate-bounce fill-current': isAddingToFavorites,
                  'fill-current': appStore.isCurrentTopicFavorited
                }
              ]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="isAddingToFavorites">追加中...</span>
            <span v-else-if="appStore.isCurrentTopicFavorited">お気に入り済み</span>
            <span v-else>お気に入りに追加</span>
          </button>
          <button 
            @click="generateTopic"
            :disabled="appStore.isLoading"
            class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            別のお題
          </button>
        </div>
      </div>
    </div>

    <!-- 初回メッセージ -->
    <div v-else class="text-center py-16">
      <div class="text-gray-400 mb-4">
        <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-gray-500 text-lg">「お題を出す」ボタンを押してお題を生成してください</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// お気に入り追加中の状態管理
const isAddingToFavorites = ref(false)

// お題を生成する
async function generateTopic() {
  await appStore.fetchRandomTopic()
}

// お気に入りに追加
async function addToFavorites() {
  if (appStore.currentTopic && !isAddingToFavorites.value) {
    isAddingToFavorites.value = true
    
    try {
      await appStore.addToFavorites(appStore.currentTopic.id)
      
      // 成功時の追加アニメーション効果
      setTimeout(() => {
        isAddingToFavorites.value = false
      }, 1000)
      
    } catch (error) {
      isAddingToFavorites.value = false
    }
  }
}

// 初期化
onMounted(async () => {
  appStore.initializeSession()
  await appStore.fetchCategories()
  await appStore.fetchFavorites() // お気に入りも初期化時に取得
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
