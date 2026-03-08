<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
})

const languageMap: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  vue: 'Vue',
  py: 'Python',
  python: 'Python',
  rb: 'Ruby',
  ruby: 'Ruby',
  go: 'Go',
  rs: 'Rust',
  rust: 'Rust',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  cs: 'C#',
  csharp: 'C#',
  php: 'PHP',
  swift: 'Swift',
  kt: 'Kotlin',
  kotlin: 'Kotlin',
  sh: 'Shell',
  shell: 'Shell',
  bash: 'Bash',
  zsh: 'Zsh',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  less: 'Less',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  toml: 'TOML',
  xml: 'XML',
  md: 'Markdown',
  markdown: 'Markdown',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  docker: 'Docker',
  makefile: 'Makefile',
  nginx: 'Nginx',
  lua: 'Lua',
  r: 'R',
  dart: 'Dart',
  elixir: 'Elixir',
  ex: 'Elixir',
  zig: 'Zig',
  tex: 'LaTeX',
  latex: 'LaTeX',
}

const displayLabel = computed(() => {
  if (props.filename) return props.filename
  if (!props.language) return ''
  return languageMap[props.language] ?? props.language.toUpperCase()
})

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="prose-code-block not-prose group relative my-6 overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-700"
  >
    <!-- Header bar -->
    <div
      class="flex items-center justify-between bg-neutral-200 px-4 py-2 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
    >
      <span class="font-medium">{{ displayLabel }}</span>
      <button
        :aria-label="copied ? 'Copied' : 'Copy code'"
        class="flex items-center gap-1 rounded px-2 py-1 transition-colors hover:bg-neutral-300 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
        @click="copyCode"
      >
        <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" size="16" />
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>
    <!-- Code block with line numbers -->
    <pre v-bind="$attrs"><slot /></pre>
  </div>
</template>

<style>
/* Unscoped — use wrapper class .prose-code-block for isolation */
.prose-code-block pre {
  margin: 0 !important;
  border-radius: 0 !important;
  padding: 1rem 1rem 1rem 0 !important;
  overflow-x: auto;
}

.prose-code-block pre code {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
  font-size: 0.875rem !important;
  counter-reset: line;
}

.prose-code-block pre code .line {
  display: block;
  min-height: 1.5rem;
  line-height: 1.5rem;
  padding-left: 1rem;
}

.prose-code-block pre code .line::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 1rem;
  margin-right: 1rem;
  text-align: right;
  color: #6b7280;
  user-select: none;
  pointer-events: none;
}
</style>
