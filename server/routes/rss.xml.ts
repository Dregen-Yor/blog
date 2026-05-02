import { Feed } from 'feed'
import { seoData } from '~/data'

const basePath = seoData.mySite.replace(/\/$/, '')

function parseDate(date: unknown) {
  const raw = String(date || '')
  const cleaned = raw.replace(/(\d+)(st|nd|rd|th)/, '$1')
  const parsed = new Date(cleaned)
  return Number.isFinite(parsed.getTime()) ? parsed : null
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  const docs = await queryCollection(event, 'content').all()
  const publishedDocs = docs
    .filter((doc) => doc.path && doc.meta?.published !== false && doc.meta?.draft !== true && parseDate(doc.meta?.date))
    .sort((a, b) => {
      const aDate = parseDate(a.meta?.date)?.getTime() || 0
      const bDate = parseDate(b.meta?.date)?.getTime() || 0
      return bDate - aDate
    })

  const feed = new Feed({
    title: "Sunupdate's personal blog site",
    description: "Sunupdate's personal blog site",
    id: basePath,
    link: basePath,
    language: 'en',
    favicon: `${basePath}/favicon.ico`,
    copyright: 'MIT',
    author: {
      name: 'Gengxin Sun',
      email: 'gxin.sun@mail.sdu.edu.cn',
      link: basePath,
    },
  })

  publishedDocs.forEach((doc) => {
    feed.addItem({
      title: doc.title || '',
      id: `${basePath}${doc.path}`,
      link: `${basePath}${doc.path}`,
      description: doc.description,
      content: doc.description,
      date: parseDate(doc.meta?.date) || new Date(),
    })
  })

  return feed.rss2()
})
