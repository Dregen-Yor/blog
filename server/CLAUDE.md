[Root Directory](../CLAUDE.md) > **server**

# Module Responsibilities

`server` 模块保存 Nuxt/Nitro 服务端路由。当前已扫描到的核心职责是提供 `/rss.xml`，根据 Nuxt Content 中的文章生成 RSS 2.0 feed。

# Entry and Startup

- `server/routes/rss.xml.ts`：Nitro event handler，设置 XML content-type，读取 `content` collection，并用 `feed` 包生成 RSS XML。
- 根目录 `nuxt.config.ts` 中 `nitro.prerender.routes` 包含 `/rss.xml`，因此 RSS 会参与预渲染。

# External Interfaces

- HTTP 路由：`GET /rss.xml`。
- 内容依赖：`queryCollection(event, 'content').all()`。
- 输出格式：`text/xml` RSS 2.0 字符串。
- 外部消费者：RSS 阅读器、搜索引擎或站点订阅工具。

# Key Dependencies and Configuration

- `feed`：RSS feed 构造库。
- Nuxt/Nitro：`defineEventHandler`, `setHeader` 与服务端路由约定。
- Nuxt Content：服务端读取 Markdown collection。
- 站点 base URL 当前在 `server/routes/rss.xml.ts` 中硬编码为 `https://sunupdate.icu`；全局 SEO 数据也在 `app/data/index.ts` 和 `nuxt.config.ts` 中出现。
- RSS favicon 依赖 `${basePath}/favicon.ico`，需确认 public 中对应资源存在。

# Data Models

RSS feed 顶层配置：

- `title`: `Sunupdate's personal blog site`
- `description`: `Sunupdate's personal blog site`
- `id`/`link`: `https://sunupdate.icu`
- `language`: `en`
- `favicon`: `https://sunupdate.icu/favicon.ico`
- `author`: `Gengxin Sun`, `gxin.sun@mail.sdu.edu.cn`

RSS item 当前从 Nuxt Content 文档映射：

- `title`: `doc.title || ''`
- `id`: `basePath + doc.path`
- `link`: `basePath + doc.path`
- `description`: `doc.description`
- `content`: `doc.description`
- `date`: `new Date(doc.meta?.date as string)`

# Testing and Quality

- 未发现 `server` 模块专用测试。
- 深挖发现的质量风险：
  - RSS 未显式过滤 `published: false` 的文章；若草稿进入 content collection，可能被发布到 feed。
  - `new Date(doc.meta?.date as string)` 依赖自然语言日期解析；当前文章使用 `28 April 2026` 等格式，建议固定 ISO 或统一解析策略。
  - `basePath` 与 Nuxt site config/SEO 数据重复维护，存在域名变更时不一致风险。
  - `description`/`content` 仅使用摘要，不包含正文内容，是否符合 RSS 预期需确认。
  - 未排序 feed items；输出顺序取决于 Nuxt Content 查询返回顺序。
- 建议补充：
  - RSS 路由 smoke test，确认返回 XML 且 content-type 正确；
  - feed item 快照测试；
  - 日期解析异常测试；
  - `published` 过滤策略测试；
  - base URL 与 `seoData.mySite`/Nuxt site config 一致性检查。

# Frequently Asked Questions (FAQ)

## RSS 地址是什么？

`/rss.xml`。

## RSS 内容来自哪里？

来自 `content` collection，即 `content/**/*.md`。

## 修改站点域名时要注意什么？

同时检查 `server/routes/rss.xml.ts` 的 `basePath`、`app/data/index.ts` 的 `seoData.mySite`、`nuxt.config.ts` 的 sitemap/site/llms 配置。

# Related File List

- `server/routes/rss.xml.ts`
- `nuxt.config.ts`
- `content.config.ts`
- `app/data/index.ts`
- `content/blogs/*.md`
- `public/favicon.ico`

# Change Log (Changelog)

- 2026-05-02T16:50:53: 深挖 `server/routes/rss.xml.ts`，补充 RSS feed 顶层配置、item 映射、发布过滤/排序/日期解析等质量风险。
- 2026-05-02T16:37:48: 初始化 `server` 模块 AI 上下文，记录 RSS 路由接口、依赖与测试缺口。
