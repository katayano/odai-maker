<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">お題メーカー</h1>
          <nav class="flex space-x-6">
            <RouterLink 
              to="/" 
              class="text-gray-600 hover:text-gray-900 font-medium"
              active-class="text-blue-600"
            >
              ホーム
            </RouterLink>
            <RouterLink 
              to="/history" 
              class="text-gray-600 hover:text-gray-900 font-medium"
              active-class="text-blue-600"
            >
              履歴
            </RouterLink>
            <RouterLink 
              to="/favorites" 
              class="text-gray-600 hover:text-gray-900 font-medium"
              active-class="text-blue-600"
            >
              お気に入り
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

