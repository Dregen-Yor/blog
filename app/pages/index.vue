<script lang="ts" setup>
import { navbarData } from '~/data'

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Welcome To My Blog Site. Get Reinforcement learning, deep learning, Agentic AI, Related Articles, Tips, Learning resources and more.',
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: navbarData.homeTitle,
  description:
    'Dive into reinforcement learning and deep learning with me and learn Agentic AI, Related Articles, Tips, Learning resources and more.',
  link: '/avatar.jpeg',
})
</script>

<template>
  <div class="container max-w-5xl mx-auto text-zinc-600">
    <MainHero />
    <MainRecent />
    <MainTrending />
  </div>
</template>
