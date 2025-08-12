import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: '観光地' },
  { name: '映画' },
  { name: '食べ物' },
  { name: 'ゲーム' },
  { name: '音楽' },
  { name: '歴史' },
  { name: 'エンターテイメント' },
  { name: 'スポーツ' },
  { name: 'アニメ・漫画' },
  { name: '動物' },
  { name: '有名人' },
  { name: '色・形容詞' },
  { name: 'その他' },
]

const topics = [
  // 観光地
  { text: '3文字で有名観光地といえば？', categoryName: '観光地' },
  { text: '世界遺産といえば？', categoryName: '観光地' },
  { text: '温泉地といえば？', categoryName: '観光地' },
  { text: '京都の観光スポットといえば？', categoryName: '観光地' },
  { text: '沖縄の名所といえば？', categoryName: '観光地' },
  { text: '有名観光地といえば？', categoryName: '観光地' },
  { text: '日本の観光地といえば？', categoryName: '観光地' },
  { text: '世界の観光地といえば？', categoryName: '観光地' },
  { text: '山といえば？', categoryName: '観光地' },
  { text: '海といえば？', categoryName: '観光地' },
  { text: '島といえば？', categoryName: '観光地' },
  { text: '城といえば？', categoryName: '観光地' },
  { text: '神社といえば？', categoryName: '観光地' },
  { text: '漢字2文字の地名といえば？', categoryName: '観光地' },
  { text: '北海道といえば？', categoryName: '観光地' },
  { text: '沖縄といえば？', categoryName: '観光地' },
  { text: '東京といえば？', categoryName: '観光地' },
  { text: '関西といえば？', categoryName: '観光地' },
  { text: 'ヨーロッパの都市といえば？', categoryName: '観光地' },
  { text: 'アジアの都市といえば？', categoryName: '観光地' },
  { text: 'アメリカの都市といえば？', categoryName: '観光地' },
  { text: '観光列車といえば？', categoryName: '観光地' },
  { text: '夜景がきれいな場所といえば？', categoryName: '観光地' },
  { text: '桜の名所といえば？', categoryName: '観光地' },
  { text: '紅葉の名所といえば？', categoryName: '観光地' },
  { text: '夏祭りといえば？', categoryName: '観光地' },
  { text: '冬の観光地といえば？', categoryName: '観光地' },
  
  // 映画
  { text: 'ジブリ映画といえば？', categoryName: '映画' },
  { text: 'ディズニー映画といえば？', categoryName: '映画' },
  { text: '泣ける映画といえば？', categoryName: '映画' },
  { text: 'ホラー映画といえば？', categoryName: '映画' },
  { text: 'アクション映画といえば？', categoryName: '映画' },
  { text: '有名映画といえば？', categoryName: '映画' },
  { text: '洋画といえば？', categoryName: '映画' },
  { text: '邦画といえば？', categoryName: '映画' },
  { text: '恋愛映画といえば？', categoryName: '映画' },
  { text: 'コメディ映画といえば？', categoryName: '映画' },
  { text: 'ミュージカル映画といえば？', categoryName: '映画' },
  { text: 'アニメ映画といえば？', categoryName: '映画' },
  { text: '実写化映画といえば？', categoryName: '映画' },
  { text: '3文字の映画タイトルといえば？', categoryName: '映画' },
  { text: '漢字2文字の映画タイトルといえば？', categoryName: '映画' },
  { text: '映画監督といえば？', categoryName: '映画' },
  { text: '映画音楽といえば？', categoryName: '映画' },
  { text: '映画の名台詞といえば？', categoryName: '映画' },
  
  // 食べ物
  { text: 'ラーメンの種類といえば？', categoryName: '食べ物' },
  { text: '寿司ネタといえば？', categoryName: '食べ物' },
  { text: '和菓子といえば？', categoryName: '食べ物' },
  { text: 'イタリア料理といえば？', categoryName: '食べ物' },
  { text: 'コンビニスイーツといえば？', categoryName: '食べ物' },
  { text: '漢字2文字の食べ物といえば？', categoryName: '食べ物' },
  { text: '白い食べ物といえば？', categoryName: '食べ物' },
  { text: '甘い食べ物といえば？', categoryName: '食べ物' },
  { text: '苦い食べ物といえば？', categoryName: '食べ物' },
  { text: '辛い食べ物といえば？', categoryName: '食べ物' },
  { text: '日本料理といえば？', categoryName: '食べ物' },
  { text: '洋食といえば？', categoryName: '食べ物' },
  { text: 'B級グルメといえば？', categoryName: '食べ物' },
  { text: '夏に食べたいものといえば？', categoryName: '食べ物' },
  { text: '冬に食べたいものといえば？', categoryName: '食べ物' },
  { text: '朝ごはんといえば？', categoryName: '食べ物' },
  { text: 'おやつといえば？', categoryName: '食べ物' },
  { text: '丼ものといえば？', categoryName: '食べ物' },
  { text: '麺料理といえば？', categoryName: '食べ物' },
  { text: '3文字の食べ物といえば？', categoryName: '食べ物' },
  { text: '漢字1文字の食べ物といえば？', categoryName: '食べ物' },
  { text: '魚料理といえば？', categoryName: '食べ物' },
  { text: '肉料理といえば？', categoryName: '食べ物' },
  { text: '揚げ物といえば？', categoryName: '食べ物' },
  { text: '発酵食品といえば？', categoryName: '食べ物' },
  { text: '健康食品といえば？', categoryName: '食べ物' },
  { text: '緑色の食べ物といえば？', categoryName: '食べ物' },
  { text: '冷たい食べ物といえば？', categoryName: '食べ物' },
  { text: '温かい飲み物といえば？', categoryName: '食べ物' },
  { text: '甘い飲み物といえば？', categoryName: '食べ物' },
  { text: '炭酸飲料といえば？', categoryName: '食べ物' },
  { text: 'フルーツといえば？', categoryName: '食べ物' },
  { text: '皮をむいて食べるものといえば？', categoryName: '食べ物' },
  { text: '缶詰食品といえば？', categoryName: '食べ物' },
  
  // ゲーム
  { text: 'ゲームの主人公といえば？', categoryName: 'ゲーム' },
  { text: 'ポケモンといえば？', categoryName: 'ゲーム' },
  { text: 'RPGゲームといえば？', categoryName: 'ゲーム' },
  { text: 'アクションゲームといえば？', categoryName: 'ゲーム' },
  { text: 'ボードゲームで盛り上がる瞬間といえば？', categoryName: 'ゲーム' },
  { text: '有名ゲームタイトルといえば？', categoryName: 'ゲーム' },
  { text: 'シューティングゲームといえば？', categoryName: 'ゲーム' },
  { text: '対戦格闘ゲームといえば？', categoryName: 'ゲーム' },
  { text: 'パズルゲームといえば？', categoryName: 'ゲーム' },
  { text: 'オンラインゲームといえば？', categoryName: 'ゲーム' },
  { text: 'カードゲームといえば？', categoryName: 'ゲーム' },
  { text: 'ボードゲームといえば？', categoryName: 'ゲーム' },
  { text: 'マリオシリーズといえば？', categoryName: 'ゲーム' },
  { text: '3文字のゲームタイトルといえば？', categoryName: 'ゲーム' },
  { text: '漢字2文字のゲームタイトルといえば？', categoryName: 'ゲーム' },
  { text: '昔のゲームといえば？', categoryName: 'ゲーム' },
  { text: '新しいゲームといえば？', categoryName: 'ゲーム' },
  { text: 'アーケードゲームといえば？', categoryName: 'ゲーム' },
  { text: 'インディーゲームといえば？', categoryName: 'ゲーム' },
  { text: 'ゲームのラスボスといえば？', categoryName: 'ゲーム' },
  { text: 'ゲームのアイテムといえば？', categoryName: 'ゲーム' },
  { text: 'ゲーム音楽といえば？', categoryName: 'ゲーム' },
  
  // 音楽
  { text: '昭和の名曲といえば？', categoryName: '音楽' },
  { text: 'Mr.Childrenの曲といえば？', categoryName: '音楽' },
  { text: 'カラオケで盛り上がる曲といえば？', categoryName: '音楽' },
  { text: 'バンド名といえば？', categoryName: '音楽' },
  { text: 'アニメソングといえば？', categoryName: '音楽' },
  { text: '有名アーティストといえば？', categoryName: '音楽' },
  { text: 'ソロ歌手といえば？', categoryName: '音楽' },
  { text: 'ゲーム音楽といえば？', categoryName: '音楽' },
  { text: '映画音楽といえば？', categoryName: '音楽' },
  { text: '英語タイトルの曲といえば？', categoryName: '音楽' },
  { text: '日本語タイトルの曲といえば？', categoryName: '音楽' },
  { text: 'ヒット曲といえば？', categoryName: '音楽' },
  { text: 'バラード曲といえば？', categoryName: '音楽' },
  { text: '盛り上がる曲といえば？', categoryName: '音楽' },
  { text: '冬に聴きたい曲といえば？', categoryName: '音楽' },
  { text: '夏に聴きたい曲といえば？', categoryName: '音楽' },
  { text: '平成の名曲といえば？', categoryName: '音楽' },
  { text: '令和のヒット曲といえば？', categoryName: '音楽' },
  { text: 'デビュー曲といえば？', categoryName: '音楽' },
  { text: 'アルバムタイトルといえば？', categoryName: '音楽' },
  { text: 'ライブの定番曲といえば？', categoryName: '音楽' },
  
  // 歴史
  { text: '戦国武将といえば？', categoryName: '歴史' },
  { text: '江戸時代のものといえば？', categoryName: '歴史' },
  { text: '歴史上の偉人といえば？', categoryName: '歴史' },
  { text: '古代文明といえば？', categoryName: '歴史' },
  { text: '日本の城といえば？', categoryName: '歴史' },
  
  // エンターテイメント
  { text: '笑えるテレビ番組といえば？', categoryName: 'エンターテイメント' },
  { text: 'お笑い芸人といえば？', categoryName: 'エンターテイメント' },
  { text: 'バラエティ番組といえば？', categoryName: 'エンターテイメント' },
  { text: 'ドラマといえば？', categoryName: 'エンターテイメント' },
  { text: 'YouTuberといえば？', categoryName: 'エンターテイメント' },
  { text: 'スリル満点の体験といえば？', categoryName: 'エンターテイメント' },
  { text: '夏の思い出といえば？', categoryName: 'エンターテイメント' },
  { text: '学校の行事といえば？', categoryName: 'エンターテイメント' },
  { text: '子供の頃の遊びといえば？', categoryName: 'エンターテイメント' },
  { text: '懐かしいものといえば？', categoryName: 'エンターテイメント' },
  
  // スポーツ
  { text: '野球チームといえば？', categoryName: 'スポーツ' },
  { text: 'サッカー選手といえば？', categoryName: 'スポーツ' },
  { text: 'オリンピック競技といえば？', categoryName: 'スポーツ' },
  { text: 'スポーツの名場面といえば？', categoryName: 'スポーツ' },
  { text: '格闘技といえば？', categoryName: 'スポーツ' },
  { text: '有名スポーツ選手といえば？', categoryName: 'スポーツ' },
  { text: 'アスリートといえば？', categoryName: 'スポーツ' },
  
  // アニメ・漫画
  { text: '少年漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: 'アニメキャラクターといえば？', categoryName: 'アニメ・漫画' },
  { text: 'ドラゴンボールのキャラといえば？', categoryName: 'アニメ・漫画' },
  { text: 'ワンピースのキャラといえば？', categoryName: 'アニメ・漫画' },
  { text: '感動するアニメといえば？', categoryName: 'アニメ・漫画' },
  { text: '有名アニメといえば？', categoryName: 'アニメ・漫画' },
  { text: '有名漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: '主人公が強いアニメといえば？', categoryName: 'アニメ・漫画' },
  { text: '主人公が弱いアニメといえば？', categoryName: 'アニメ・漫画' },
  { text: 'スポーツ漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: 'バトル漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: '恋愛漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: 'ギャグ漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: '名セリフがある漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: '実写化された漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: '漫画の名脇役といえば？', categoryName: 'アニメ・漫画' },
  { text: '漫画の悪役といえば？', categoryName: 'アニメ・漫画' },
  { text: '長寿アニメといえば？', categoryName: 'アニメ・漫画' },
  { text: '短編アニメといえば？', categoryName: 'アニメ・漫画' },
  { text: '少女漫画といえば？', categoryName: 'アニメ・漫画' },
  { text: '漫画家といえば？', categoryName: 'アニメ・漫画' },
  { text: 'アニメ映画といえば？', categoryName: 'アニメ・漫画' },
  { text: 'ロボットアニメといえば？', categoryName: 'アニメ・漫画' },
  { text: 'ファンタジーアニメといえば？', categoryName: 'アニメ・漫画' },

  // 動物
  { text: 'ペットといえば？', categoryName: '動物' },
  { text: '速い動物といえば？', categoryName: '動物' },
  { text: '小さい動物といえば？', categoryName: '動物' },
  { text: '大きい動物といえば？', categoryName: '動物' },
  { text: '水の中の生き物といえば？', categoryName: '動物' },
  { text: '森に住む動物といえば？', categoryName: '動物' },
  { text: '草食動物といえば？', categoryName: '動物' },
  { text: '肉食動物といえば？', categoryName: '動物' },
  { text: '鳴き声が特徴的な動物といえば？', categoryName: '動物' },
  { text: '夜行性の動物といえば？', categoryName: '動物' },
  { text: '空を飛ぶ動物といえば？', categoryName: '動物' },
  { text: '3文字の動物といえば？', categoryName: '動物' },
  { text: '漢字2文字の動物といえば？', categoryName: '動物' },
  { text: '哺乳類といえば？', categoryName: '動物' },
  { text: '卵を産む動物といえば？', categoryName: '動物' },
  { text: '爬虫類といえば？', categoryName: '動物' },
  { text: '両生類といえば？', categoryName: '動物' },
  { text: '冬眠する動物といえば？', categoryName: '動物' },
  { text: '危険な動物といえば？', categoryName: '動物' },
  { text: '動物園にいる動物といえば？', categoryName: '動物' },

  // 有名人
  { text: '有名歌手といえば？', categoryName: '有名人' },
  { text: 'お笑い芸人といえば？', categoryName: '有名人' },
  { text: '漫才コンビといえば？', categoryName: '有名人' },
  { text: '女優といえば？', categoryName: '有名人' },
  { text: '俳優といえば？', categoryName: '有名人' },
  { text: '声優といえば？', categoryName: '有名人' },
  { text: 'アイドルグループといえば？', categoryName: '有名人' },
  { text: '昭和の有名人といえば？', categoryName: '有名人' },
  { text: '平成の有名人といえば？', categoryName: '有名人' },
  { text: '海外の俳優といえば？', categoryName: '有名人' },
  { text: '海外の歌手といえば？', categoryName: '有名人' },
  { text: '政治家といえば？', categoryName: '有名人' },
  { text: '実業家といえば？', categoryName: '有名人' },
  { text: '発明家といえば？', categoryName: '有名人' },
  { text: '小説家といえば？', categoryName: '有名人' },
  { text: '有名YouTuberといえば？', categoryName: '有名人' },

  // 色・形容詞
  { text: '青いものといえば？', categoryName: '色・形容詞' },
  { text: '赤いものといえば？', categoryName: '色・形容詞' },
  { text: '黄色いものといえば？', categoryName: '色・形容詞' },
  { text: '白いものといえば？', categoryName: '色・形容詞' },
  { text: '黒いものといえば？', categoryName: '色・形容詞' },
  { text: '丸いものといえば？', categoryName: '色・形容詞' },
  { text: '四角いものといえば？', categoryName: '色・形容詞' },
  { text: '長いものといえば？', categoryName: '色・形容詞' },
  { text: '短いものといえば？', categoryName: '色・形容詞' },
  { text: '軽いものといえば？', categoryName: '色・形容詞' },
  { text: '重いものといえば？', categoryName: '色・形容詞' },
  { text: '速いものといえば？', categoryName: '色・形容詞' },
  { text: '遅いものといえば？', categoryName: '色・形容詞' },
  { text: '柔らかいものといえば？', categoryName: '色・形容詞' },
  { text: '固いものといえば？', categoryName: '色・形容詞' },

  // その他
  { text: '学校にあるものといえば？', categoryName: 'その他' },
  { text: '冬といえば？', categoryName: 'その他' },
  { text: '夏といえば？', categoryName: 'その他' },
  { text: '春といえば？', categoryName: 'その他' },
  { text: '秋といえば？', categoryName: 'その他' },
  { text: 'お祭りといえば？', categoryName: 'その他' },
  { text: '家にあるものといえば？', categoryName: 'その他' },
  { text: '電化製品といえば？', categoryName: 'その他' },
  { text: '文房具といえば？', categoryName: 'その他' },
  { text: '乗り物といえば？', categoryName: 'その他' },
  { text: '宇宙といえば？', categoryName: 'その他' },
  { text: '天気といえば？', categoryName: 'その他' },
  { text: '危険なものといえば？', categoryName: 'その他' },
  { text: '高いものといえば？', categoryName: 'その他' },
  { text: '安いものといえば？', categoryName: 'その他' },
]

async function main() {
  console.log('🌱 データベースのシードを開始します...')

  // 既存データをクリア
  await prisma.favorite.deleteMany()
  await prisma.topicHistory.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.category.deleteMany()

  // カテゴリを作成
  console.log('📂 カテゴリを作成中...')
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category
      })
    )
  )

  // カテゴリ名からIDを取得するマップを作成
  const categoryMap = new Map(
    createdCategories.map(cat => [cat.name, cat.id])
  )

  // お題を作成
  console.log('💡 お題を作成中...')
  await Promise.all(
    topics.map(topic =>
      prisma.topic.create({
        data: {
          text: topic.text,
          categoryId: categoryMap.get(topic.categoryName)!
        }
      })
    )
  )

  console.log('✅ シードが完了しました!')
  console.log(`📊 作成されたデータ:`)
  console.log(`   - カテゴリ: ${categories.length}件`)
  console.log(`   - お題: ${topics.length}件`)
}

main()
  .catch((e) => {
    console.error('❌ シード実行エラー:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })