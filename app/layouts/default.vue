<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <div class="gd-container font-spacegrotesk">
    <a href="#main" class="skip-link">{{ t('skipToMain') }}</a>
    <header class="fixed w-full bg-[#F1F2F4] dark:bg-slate-950 z-10">
      <MainHeader />
    </header>
    <main id="main" tabindex="-1">
      <div class="p-9" />
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
