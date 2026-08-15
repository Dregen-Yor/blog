[Root Directory](../CLAUDE.md) > **public**

# Module Responsibilities

`public` 模块保存 Nuxt 直接公开托管的静态资源，包括 favicon、头像、博客封面图、文章内图片与其它无需构建处理即可按路径访问的文件。

# Entry and Startup

- Nuxt 会将 `public/**` 以站点根路径公开，例如 `public/avatar.jpeg` 可通过 `/avatar.jpeg` 访问。
- 文章 frontmatter 中的 `image`、`ogImage` 和正文图片通常引用这里的资源。
- `app/pages/about.vue` 使用头像资源；博客卡片和 OG image 使用文章配置中的图片路径。

# External Interfaces

- 静态 URL：`/<asset-path>`。
- 博客 frontmatter：`image`, `ogImage`, `alt` 字段引用静态图片。
- 页面组件：`NuxtImg` 和普通 Markdown 图片引用静态资源。

# Key Dependencies and Configuration

- Nuxt public directory 约定。
- `@nuxt/image`：页面中通过 `NuxtImg` 消费部分静态资源。
- `nuxt-og-image`：可能使用公开图片生成分享图。

# Data Models

本模块无代码层数据模型。约定层面需要保持：

- 图片路径稳定，避免破坏文章历史链接。
- 资源命名可读，建议按用途分组，例如博客封面放在 `public/blogs-img/`，文章内图片按文章主题分目录。
- frontmatter 的 `alt` 应描述图片内容，利于可访问性和 SEO。

# Asset Path Index

按本次内容深挖发现的引用建立路径索引；根据规则未读取二进制内容，仅记录路径：

- `public/avatar.jpeg`：个人主页和首页 OG image 引用。
- `public/blogs-img/blog1.jpg`：transformer 文章封面/OG 图。
- `public/blogs-img/blog2.jpg`：PPO 文章封面/OG 图。
- `public/blogs-img/blog3.jpg`：zsh 文章封面/OG 图。
- `public/blogs-img/blog4.jpg`：Agent 与 OpenMP 文章封面/OG 图。
- `public/blogs-img/blog5.jpg`、`blog6.jpg`、`blog7.png`、`blog8.png`、`blog.jpg`：当前已枚举但未在已读文章 frontmatter 中确认引用。
- `public/transformer/transformer.png`、`attention.png`、`MHA.png`：transformer 文章正文图片。
- `public/zsh/git.png`：zsh 文章正文图片，展示 git 插件 alias。
- `public/zsh/fastfetch.png`：zsh 文章正文图片。
- `public/zsh/onefetch.png`：zsh 文章正文图片。
- `public/not-found.jpg`：`app/pages/blogs/index.vue` 的缺省/空状态图片引用，已确认存在。
- `public/favicon.ico`：RSS feed favicon 引用，已确认存在。
- `public/logos/icpc.png`：ICPC 官方 logo（取自 icpc.global 官网 `/icpc-logo.png`，横向 "ICPC" 字标 + 蓝地球标记，透明底），`about.vue` Honors 条目徽章。
- `public/logos/huawei.svg`：华为官方标识（simple-icons 红标），`about.vue` Honors 条目徽章。
- `public/logos/ccf.png`：CCF（中国计算机学会）官方单一图像标识，`about.vue` Honors 条目徽章。

# Testing and Quality

- 未发现资产完整性测试。
- 初始化与本次深挖均按要求未读取二进制图片内容，仅记录路径。
- 建议补充：
  - 检查 `content/**/*.md` 中引用的图片是否存在；
  - 检查 frontmatter `image`/`ogImage` 是否存在；
  - 检查 `public/blogs-img` 中未引用的大型图片，避免仓库膨胀；
  - 检查封面复用是否符合预期，例如 OpenMP 与 Agent 当前都引用 `/blogs-img/blog4.jpg`；
  - 检查未引用资源 `blog5.jpg`、`blog6.jpg`、`blog7.png`、`blog8.png`、`blog.jpg` 是否仍需保留；
  - 检查正文相对图片 `zsh/*.png` 与 `transformer/*.png` 是否在最终渲染路径下可访问。

# Frequently Asked Questions (FAQ)

## 为什么不直接读取图片内容？

初始化规则要求对二进制/大文件只记录路径，不读取内容，以降低扫描成本并避免无意义上下文消耗。

## 新增博客封面图放在哪里？

优先放在 `public/blogs-img/`，然后在文章 frontmatter 中使用 `/blogs-img/xxx` 引用。

## 如何确认图片没有断链？

建议增加脚本或测试，解析 `content/blogs/*.md` 的 frontmatter 和正文 Markdown 图片链接，并检查对应 `public/**` 路径是否存在。

# Related File List

- `public/**`
- `public/blogs-img/**`
- `public/transformer/**`
- `public/zsh/**`
- `public/avatar.jpeg`
- `public/not-found.jpg`
- `public/favicon.ico`
- `content/blogs/*.md`
- `app/pages/about.vue`
- `app/pages/blogs/index.vue`
- `app/data/index.ts`

# Change Log (Changelog)

- 2026-08-15: 新增 `public/logos/`，存放 Honors 条目使用的 ICPC 官方 logo（取自 icpc.global） / 华为 / CCF 官方标识（`icpc.png`、`huawei.svg`、`ccf.png`），由 `app/pages/about.vue` 引用。
- 2026-05-02T16:50:53: 基于 `content/blogs`、页面引用与目录枚举补充 `public` 资产路径索引和静态资源质量风险；未读取二进制内容。
- 2026-05-02T16:37:48: 初始化 `public` 模块 AI 上下文，记录静态资源职责和资产完整性缺口。
