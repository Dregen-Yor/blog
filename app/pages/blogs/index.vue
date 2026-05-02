<script lang="ts" setup>
import Fuse from 'fuse.js'
import type { BlogPost } from '~/types/blog'

const { t } = useLang()

const { data } = await useAsyncData('all-blog-post', () =>
  queryCollection('content')
    .all()
    .then((articles) => articles.filter((a) => a.meta?.published !== false && a.meta?.draft !== true)),
)

const elementPerPage = ref(5)
const pageNumber = ref(1)
const searchText = ref('')

const formattedData = computed(() => {
  return (
    data.value?.map((articles) => {
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
    }) || []
  )
})

const fuse = computed(() => {
  return new Fuse(formattedData.value, {
    keys: ['title', 'description'],
    threshold: 0.4,
    includeScore: false,
  })
})

const searchData = computed(() => {
  if (!searchText.value.trim()) {
    return formattedData.value
  }

  const results = fuse.value.search(searchText.value)
  return results.map((result) => result.item)
})

const paginatedData = computed(() => {
  const startInd = (pageNumber.value - 1) * elementPerPage.value
  const endInd = pageNumber.value * elementPerPage.value

  return searchData.value.slice(startInd, endInd)
})

function onPreviousPageClick() {
  if (pageNumber.value > 1) pageNumber.value -= 1
}

const totalPage = computed(() => {
  const ttlContent = searchData.value.length || 0
  return Math.max(1, Math.ceil(ttlContent / elementPerPage.value))
})

const resultSummary = computed(() => {
  const count = searchData.value.length
  if (searchText.value.trim()) return t('searchResultsCount', count)
  return t('postsCount', count)
})

function clearSearch() {
  searchText.value = ''
  pageNumber.value = 1
}

watch(searchText, () => {
  pageNumber.value = 1
})

function onNextPageClick() {
  if (pageNumber.value < totalPage.value) pageNumber.value += 1
}

useHead({
  title: t('blogsTitle'),
  meta: [
    {
      name: 'description',
      content: t('blogsDescription'),
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: t('blogsTitle'),
    description: t('blogsDescription'),
    siteName: siteData.url,
  },
})
</script>

<template>
  <div class="container max-w-5xl mx-auto text-zinc-600">
    <ArchiveHero />

    <div class="px-6 space-y-3">
      <label for="archive-search" class="block text-sm font-semibold text-zinc-700 dark:text-zinc-200">
        {{ t('searchLabel') }}
      </label>
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          id="archive-search"
          v-model="searchText"
          :placeholder="t('searchPlaceholder')"
          type="search"
          class="block w-full bg-[#F1F2F4] dark:bg-slate-900 dark:placeholder-zinc-500 text-zinc-900 dark:text-zinc-100 rounded-md border-gray-300 dark:border-gray-800 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <button
          v-if="searchText"
          type="button"
          class="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-slate-900 transition-colors"
          @click="clearSearch"
        >
          {{ t('clearButton') }}
        </button>
      </div>
      <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ resultSummary }}</p>
    </div>

    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in paginatedData" :key="post.title">
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

      <ArchiveCard v-if="paginatedData.length <= 0" :title="t('noPostsFound')" image="/not-found.jpg" />
    </div>

    <div v-if="searchData.length > 0" class="flex justify-center items-center space-x-6">
      <button type="button" :disabled="pageNumber <= 1" :aria-label="t('prevPage')" @click="onPreviousPageClick">
        <Icon name="mdi:code-less-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber > 1 }" />
      </button>
      <p>{{ pageNumber }} / {{ totalPage }}</p>
      <button type="button" :disabled="pageNumber >= totalPage" :aria-label="t('nextPage')" @click="onNextPageClick">
        <Icon name="mdi:code-greater-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber < totalPage }" />
      </button>
    </div>
  </div>
</template>
