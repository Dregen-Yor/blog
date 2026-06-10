<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1 class="text-black dark:text-zinc-300 font-semibold leading-tight text-4xl md:text-5xl my-5">
          {{ t('homeTitle') }}
        </h1>
        <blockquote class="hero-motto border-l-4 border-sky-700 dark:border-sky-400 pl-3 my-4">
          <p class="italic text-zinc-700 dark:text-zinc-300">{{ t('motto') }}</p>
        </blockquote>
        <p class="dark:text-zinc-300 max-w-prose">
          {{ t('homeDescription') }}
        </p>
        <div class="flex flex-wrap gap-3 mt-6">
          <NuxtLink
            to="/blogs"
            class="rounded-full bg-sky-700 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-800 transition-colors"
          >
            {{ t('primaryCta') }}
          </NuxtLink>
          <NuxtLink
            to="/categories"
            class="rounded-full border border-sky-700 px-5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:border-sky-400 dark:hover:bg-slate-900 transition-colors"
          >
            {{ t('secondaryCta') }}
          </NuxtLink>
        </div>
        <p class="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {{ t('topicHint') }}
        </p>
      </div>
      <div class="px-6 justify-self-center">
        <LogoDog />
      </div>
    </div>
  </div>
</template>
