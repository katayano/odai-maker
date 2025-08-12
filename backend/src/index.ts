import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// 環境変数を読み込み
dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

// ミドルウェア
app.use(cors())
app.use(express.json())

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// カテゴリ一覧取得
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { topics: true }
        }
      }
    })
    res.json(categories)
  } catch (error) {
    console.error('カテゴリ取得エラー:', error)
    res.status(500).json({ error: 'カテゴリの取得に失敗しました' })
  }
})

// お題一覧取得（カテゴリでフィルタ可能）
app.get('/api/topics', async (req, res) => {
  try {
    const { categoryId } = req.query
    const where = categoryId ? { categoryId: parseInt(categoryId as string) } : {}

    const topics = await prisma.topic.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json(topics)
  } catch (error) {
    console.error('お題取得エラー:', error)
    res.status(500).json({ error: 'お題の取得に失敗しました' })
  }
})

// ランダムお題取得
app.get('/api/topics/random', async (req, res) => {
  try {
    const { categoryId } = req.query
    const where = categoryId ? { categoryId: parseInt(categoryId as string) } : {}

    // お題の総数を取得
    const count = await prisma.topic.count({ where })
    if (count === 0) {
      return res.status(404).json({ error: 'お題が見つかりません' })
    }

    // ランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * count)

    const randomTopic = await prisma.topic.findMany({
      where,
      skip: randomIndex,
      take: 1,
      include: {
        category: true
      }
    })

    res.json(randomTopic[0])
  } catch (error) {
    console.error('ランダムお題取得エラー:', error)
    res.status(500).json({ error: 'ランダムお題の取得に失敗しました' })
  }
})

// お題履歴追加
app.post('/api/history', async (req, res) => {
  try {
    const { topicId, sessionId } = req.body

    const history = await prisma.topicHistory.create({
      data: {
        topicId: parseInt(topicId),
        sessionId: sessionId || null
      }
    })

    res.json(history)
  } catch (error) {
    console.error('履歴追加エラー:', error)
    res.status(500).json({ error: '履歴の追加に失敗しました' })
  }
})

// お題履歴取得
app.get('/api/history', async (req, res) => {
  try {
    const { sessionId } = req.query
    const where = sessionId ? { sessionId: sessionId as string } : {}

    const history = await prisma.topicHistory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50 // 最新50件まで
    })

    // お題情報も一緒に取得
    const topicIds = history.map(h => h.topicId)
    const topics = await prisma.topic.findMany({
      where: { id: { in: topicIds } },
      include: { category: true }
    })

    const historyWithTopics = history.map(h => ({
      ...h,
      topic: topics.find(t => t.id === h.topicId)
    }))

    res.json(historyWithTopics)
  } catch (error) {
    console.error('履歴取得エラー:', error)
    res.status(500).json({ error: '履歴の取得に失敗しました' })
  }
})

// お気に入り追加
app.post('/api/favorites', async (req, res) => {
  try {
    const { topicId, sessionId } = req.body
    const parsedTopicId = parseInt(topicId)

    // 既に同じお題がお気に入りに追加されているかチェック
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        topicId: parsedTopicId,
        sessionId: sessionId || null
      }
    })

    if (existingFavorite) {
      return res.status(409).json({
        error: 'このお題は既にお気に入りに追加されています',
        code: 'ALREADY_FAVORITED'
      })
    }

    const favorite = await prisma.favorite.create({
      data: {
        topicId: parsedTopicId,
        sessionId: sessionId || null
      }
    })

    res.json(favorite)
  } catch (error) {
    console.error('お気に入り追加エラー:', error)
    res.status(500).json({ error: 'お気に入りの追加に失敗しました' })
  }
})

// お気に入り取得
app.get('/api/favorites', async (req, res) => {
  try {
    const { sessionId } = req.query
    const where = sessionId ? { sessionId: sessionId as string } : {}

    const favorites = await prisma.favorite.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    // お題情報も一緒に取得
    const topicIds = favorites.map(f => f.topicId)
    const topics = await prisma.topic.findMany({
      where: { id: { in: topicIds } },
      include: { category: true }
    })

    const favoritesWithTopics = favorites.map(f => ({
      ...f,
      topic: topics.find(t => t.id === f.topicId)
    }))

    res.json(favoritesWithTopics)
  } catch (error) {
    console.error('お気に入り取得エラー:', error)
    res.status(500).json({ error: 'お気に入りの取得に失敗しました' })
  }
})

// お気に入り削除
app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.favorite.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'お気に入りを削除しました' })
  } catch (error) {
    console.error('お気に入り削除エラー:', error)
    res.status(500).json({ error: 'お気に入りの削除に失敗しました' })
  }
})

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 サーバーがポート ${PORT} で起動しました`)
})

// Prismaクライアントのクリーンアップ
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})