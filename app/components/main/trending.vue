<script lang="ts" setup>
import type { BlogPost } from '~/types/blog'

const { t } = useLang()

const { data } = await useAsyncData('trending-post', () =>
  queryCollection('content')
    .all()
    .then((articles) => {
      const publishedArticles = articles.filter(
        (article) => article.meta?.date && article.meta?.published !== false && article.meta?.draft !== true,
      )
      const featuredArticles = publishedArticles.filter((article) => article.meta?.featured === true)
      const source = featuredArticles.length > 0 ? featuredArticles : publishedArticles

      return source
        .sort((a, b) => {
          const aDate = new Date(String(a.meta?.date || '').replace(/(\d+)(st|nd|rd|th)/, '$1')).getTime() || 0
          const bDate = new Date(String(b.meta?.date || '').replace(/(\d+)(st|nd|rd|th)/, '$1')).getTime() || 0
          return bDate - aDate
        })
        .slice(0, 3)
    }),
)

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    const meta = articles.meta as unknown as BlogPost
    return {
      path: articles.path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: meta.image || '/not-found.jpg',
      alt: meta.alt || 'no alter data available',
      ogImage: meta.ogImage || '/not-found.jpg',
      date: meta.date || 'not-date-available',
      tags: meta.tags || [],
      published: meta.published || false,
    }
  })
})

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.',
    },
  ],
})
</script>

<template>
  <div class="px-4">
    <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
      <Icon name="mdi:star-three-points-outline" size="2em" class="text-black dark:text-zinc-300" />
      <h2 class="text-4xl font-semibold text-black dark:text-zinc-300">{{ t('featuredTitle') }}</h2>
    </div>
    <div class="grid grid-cols-1">
      <template v-for="post in formattedData" :key="post.title">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :image="post.image"
          :alt="post.alt"
          :og-image="post.ogImage"
          :tags="post.tags"
          :published="post.published"
        />
      </template>
      <template v-if="data?.length === 0">
        <BlogEmpty />
      </template>
    </div>
  </div>
</template>
