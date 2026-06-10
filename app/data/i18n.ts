export type Lang = 'zh' | 'en'

type StaticEntry = { zh: string; en: string }
type FnEntry = (n: number) => { zh: string; en: string }

const messages = {
  navArchive: { zh: '归档', en: 'Archive' },
  navCategories: { zh: '分类', en: 'Categories' },
  navAbout: { zh: '关于', en: 'About' },
  switchToDark: { zh: '切换到深色主题', en: 'Switch to dark theme' },
  switchToLight: { zh: '切换到浅色主题', en: 'Switch to light theme' },
  skipToMain: { zh: '跳到主要内容', en: 'Skip to main content' },
  homeTitle: { zh: '欢迎来到我的博客', en: 'Welcome To My Blog' },
  motto: { zh: '勇踏前人未至之境。', en: 'To boldly go where no one has gone before.' },
  homeDescription: { zh: '这里记录强化学习、深度学习、Agent、Linux 折腾和并行计算相关内容。', en: 'Notes on RL, Deep Learning, Agent, Linux and Parallel Computing.' },
  primaryCta: { zh: '阅读文章', en: 'Read posts' },
  secondaryCta: { zh: '浏览分类', en: 'Browse categories' },
  topicHint: { zh: '强化学习 · 深度学习 · Agent · Linux · 并行计算', en: 'RL · Deep Learning · Agent · Linux · Parallel Computing' },
  recentTitle: { zh: '最新文章', en: 'Recent Posts' },
  featuredTitle: { zh: '精选文章', en: 'Featured Posts' },
  blogsTitle: { zh: '全部文章', en: 'All Blogs' },
  blogsDescription: { zh: '这里收录了我写过并发布的博客文章。', en: 'Here you will find all the blog posts I have written and published.' },
  searchLabel: { zh: '搜索文章', en: 'Search posts' },
  searchPlaceholder: { zh: '搜索标题或摘要…', en: 'Search title or description…' },
  postsCount: (n: number): StaticEntry => ({ zh: `共 ${n} 篇文章`, en: `${n} posts` }),
  searchResultsCount: (n: number): StaticEntry => ({ zh: `找到 ${n} 个结果`, en: `${n} results found` }),
  clearButton: { zh: '清空', en: 'Clear' },
  noPostsFound: { zh: '没有找到相关文章', en: 'No posts found' },
  prevPage: { zh: '上一页', en: 'Previous page' },
  nextPage: { zh: '下一页', en: 'Next page' },
  categoryTitle: { zh: '分类', en: 'Categories' },
  categoryDescription: { zh: '按文章标签浏览不同主题。', en: 'Browse topics generated from blog tags.' },
  readMore: { zh: '阅读全文', en: 'Read More' },
  previous: { zh: '上一篇', en: 'Previous' },
  next: { zh: '下一篇', en: 'Next' },
  noPostAvailable: { zh: '暂无文章', en: 'No Post Available' },
  backToHome: { zh: '返回首页', en: 'Back To Home' },
} satisfies Record<string, StaticEntry | FnEntry>

type MessageMap = typeof messages
type MessageKey = keyof MessageMap
type StaticKey = { [K in MessageKey]: MessageMap[K] extends StaticEntry ? K : never }[MessageKey]
type FnKey = { [K in MessageKey]: MessageMap[K] extends FnEntry ? K : never }[MessageKey]

export function t(key: StaticKey, lang: Lang): string
export function t(key: FnKey, lang: Lang, arg: number): string
export function t(key: MessageKey, lang: Lang, arg?: number): string {
  const entry = messages[key]
  if (typeof entry === 'function') return (entry as FnEntry)(arg!)[lang]
  return (entry as StaticEntry)[lang]
}

export type { StaticKey, FnKey, MessageKey }
