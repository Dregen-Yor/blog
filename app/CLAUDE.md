[Root Directory](../CLAUDE.md) > **app**

# Module Responsibilities

`app` 是 Nuxt 前端应用模块，负责页面路由、布局、Vue 组件、组合式逻辑、站点元数据、类型定义与前端交互。它承载首页、博客归档、分类页、个人主页等用户可见体验，并通过 Nuxt Content 查询 `content` 模块中的 Markdown 数据。

# Entry and Startup

- `app/app.vue`：应用级入口，设置 HTML lang、全局 meta、加载指示器、布局和页面出口。
- `app/layouts/default.vue`：默认布局，组合 `MainHeader`、页面 slot 与 `MainFooter`。
- `app/pages/index.vue`：首页入口，设置 Home SEO/OG，并组合 `MainHero`、`MainRecent`、`MainTrending`。
- `app/pages/blogs/index.vue`：归档页入口，查询全部内容、格式化文章元数据、提供 Fuse 搜索与分页。
- `app/pages/categories/index.vue`：标签页入口，查询全部内容并聚合 `blog.meta.tags` 生成标签计数。
- `app/pages/about.vue`：个人主页入口，在页面内维护 profile、socialLinks、education、honors、internships 等结构化配置并渲染学术主页布局。
- `nuxt.config.ts`：虽然位于根目录，但定义了本模块运行所需的 Nuxt 模块、head、页面过渡、内容处理、深色模式与预渲染规则。

# External Interfaces

- 页面路由：
  - `/`：首页。
  - `/blogs`：博客归档和搜索分页页面，读取 `queryCollection('content').all()`。
  - `/categories`：分类/标签聚合页面，读取文章 `meta.tags`。
  - `/about`：个人学术主页，包含简介、社交链接、教育、荣誉、实习等结构化内容。
- 内容查询接口：通过 Nuxt Content 的 `queryCollection('content')` 读取 Markdown collection。
- SEO/OG 接口：页面使用 `useHead`, `defineOgImage`, `defineOgImageComponent`, `useSiteConfig`。
- 静态资产接口：页面使用 `/avatar.jpeg`、文章图片和 `NuxtImg`；`about.vue` 的 `profile.avatar` 当前为 `avatar.jpeg`。

# Key Dependencies and Configuration

- Nuxt/Vue：页面、布局、组件自动导入与 SSR/SSG。
- Nuxt Content：Markdown collection 查询。
- Fuse.js：`/blogs` 归档页标题和描述搜索，当前阈值为 `0.4`。
- `@formkit/auto-animate`：`/blogs` 文章列表使用 `v-auto-animate`。
- Nuxt OG Image、Sitemap、Robots：页面分享和爬虫元数据。
- Tailwind CSS：样式系统，配置见根目录 `tailwind.config.js`；`about.vue` 同时包含较多 scoped CSS。
- `app/data/index.ts`：导航标题、页脚、SEO、社交链接和页面文案等中心化数据；注意 `about.vue` 也维护了独立个人主页数据，存在配置分散。
- `app/types/blog.ts`：博客 frontmatter 与 content item 的类型接口。

# Data Models

- `BlogPost`：描述文章元数据，字段包括 `title`, `date`, `description`, `image`, `alt`, `ogImage`, `tags`, `published`。
- `/blogs` 页面格式化后的文章项：`path`, `title`, `description`, `image`, `alt`, `ogImage`, `date`, `tags`, `published`，缺省图片回退为 `/not-found.jpg`。
- `/categories` 页面标签聚合：以 `Map<tag, count>` 统计每篇文章的 `meta.tags`。
- `about.vue` 页面内结构：`profile`, `SocialLink`, `Publication`, `Honor`, `Education`, `Internship`, `others`。
- `app/data/index.ts` 中的 `navbarData`, `footerData`, `homePage`, `blogsPage`, `categoryPage`, `aboutPage`, `seoData`, `socialLinks`, `siteMetaData` 是站点配置型数据。

# Testing and Quality

- 已发现质量脚本：根目录 `package.json` 中的 `lint`, `lint:fix`, `format`, `format:fix`。
- 已发现 ESLint 配置：根目录 `eslint.config.mjs`，关闭 `vue/html-self-closing` 与 `vue/multi-word-component-names`。
- 未发现 `app` 专用测试目录、Vitest 配置或 Playwright/Cypress 配置。
- 深挖发现的质量风险：
  - `/blogs` 搜索词改变时未显式重置页码，可能出现当前页超过搜索结果总页数导致空列表。
  - `/blogs` `totalPage` 在无结果时为 `0`，UI 可能显示 `1 / 0`。
  - `/categories` 使用未泛型化 `new Map()`，且只做 `(blog.meta.tags as string[]) || []`，若 tags 不是数组会有运行时风险。
  - `about.vue` 使用 `v-html` 渲染 `aboutMe` 和作者字段，当前数据为本地常量，若未来接入外部内容需补充消毒策略。
  - `about.vue` 与 `app/data/index.ts` 同时保存站点/个人信息，后续修改可能出现不一致。
  - `app/components` 已枚举到 33 个 Vue 组件，覆盖 archive、blog、category、content、footer、logo、main、OgImage 等分组；`app/composables` 已确认包含 2 个组合式函数。
- 建议补充：博客搜索分页逻辑单元测试、标签聚合测试、关键页面渲染 smoke test、About 页面链接可访问性检查。

# Frequently Asked Questions (FAQ)

## 修改站点标题、作者、SEO 文案应看哪里？

优先查看 `app/data/index.ts` 与根目录 `nuxt.config.ts`；个人主页内容还需查看 `app/pages/about.vue`。

## 新增页面应放在哪里？

遵循 Nuxt 文件路由，新增到 `app/pages` 下；复用组件放到 `app/components`。

## 博客页面数据从哪里来？

来自 `content` collection，即 `content/**/*.md`，由根目录 `content.config.ts` 定义。

## `/blogs` 的搜索逻辑在哪里？

在 `app/pages/blogs/index.vue`，使用 Fuse.js 对格式化后的文章 `title` 和 `description` 做模糊搜索。

# Related File List

- `app/app.vue`
- `app/layouts/default.vue`
- `app/pages/index.vue`
- `app/pages/blogs/index.vue`
- `app/pages/categories/index.vue`
- `app/pages/about.vue`
- `app/data/index.ts`
- `app/types/blog.ts`
- `app/utils/helper.ts`
- `app/components/archive/card.vue`
- `app/components/archive/hero.vue`
- `app/components/blog/card.vue`
- `app/components/blog/empty.vue`
- `app/components/blog/Header.vue`
- `app/components/blog/Navigation.vue`
- `app/components/blog/ReadingProgress.vue`
- `app/components/blog/Toc.vue`
- `app/components/category/card.vue`
- `app/components/category/hero.vue`
- `app/components/category/topic.vue`
- `app/components/content/ProseCode.vue`
- `app/components/content/ProsePre.vue`
- `app/components/footer/*.vue`
- `app/components/logo/*.vue`
- `app/components/main/*.vue`
- `app/components/OgImage/*.vue`
- `app/composables/useBlogNavigation.ts`
- `app/composables/useBlogSeo.ts`
- `nuxt.config.ts`
- `content.config.ts`
- `tailwind.config.js`
- `eslint.config.mjs`

# Change Log (Changelog)

- 2026-08-15: `about.vue` 社交链接新增小红书（Xiaohongshu）；为此安装 `@iconify-json/simple-icons` 图标集合，使用 `simple-icons:xiaohongshu`。
- 2026-08-15: `about.vue` Honors 分区上移到 Projects 之前，并在每条奖项后追加官方 logo 徽章（ICPC/Huawei/CCF，浅色底板适配暗色模式，资源见 `public/logos/`）；`Internship.company` 更新为 GAI Lab 全称并新增 `supervisor` 字段。
- 2026-08-15: `about.vue` 新增 Projects 分区（🚀），以静态配置展示 GitHub 仓库（名称、描述、语言、shields.io star 徽章）；采用两列卡片网格布局（`.project-card` + 语言色圆点），并将页面容器从 `max-w-5xl` 放宽至 `max-w-6xl`、移除 `.page-article` 的 800px 宽度上限。
- 2026-05-02T16:50:53: 增量深挖 `app/pages`、`app/components` 与 `app/composables`，补充页面职责、组件清单、组合式函数和质量风险。
- 2026-05-02T16:37:48: 初始化 `app` 模块 AI 上下文，记录入口、页面接口、依赖、数据模型与质量缺口。
