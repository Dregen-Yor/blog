<script setup lang="ts">
import { footerData, navbarData } from '~/data'

// ==================== 个人信息配置 ====================
const profile = {
  name: 'Gengxin Sun',
  nameCn: '孙更欣',
  affiliation: 'Shandong University',
  avatar: 'avatar.jpeg',
  bio: 'I am a student of Shandong University, majoring in Computer Science and Technology. My research interests include Reinforcement learning and deep learning.',
  location: 'Qingdao, Shandong',
  motto: 'To boldly go where no one has gone before.',
}

// ==================== 社交链接配置 ====================
interface SocialLink {
  name: string
  url: string
  icon: string
  external?: boolean
}

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:gxin.sun@mail.sdu.edu.cn',
    icon: 'fa:envelope',
    external: false,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Dregen-Yor',
    icon: 'fa:github',
    external: true,
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=xxxxx',
    icon: 'fa:graduation-cap',
    external: true,
  },
  // {
  //   name: 'LinkedIn',
  //   url: 'https://www.linkedin.com/in/yourusername',
  //   icon: 'fa:linkedin',
  //   external: true,
  // },
  // ORCID 暂时注释，图标加载有问题
  // {
  //   name: 'ORCID',
  //   url: 'https://orcid.org/0000-0000-0000-0000',
  //   icon: 'fa:id-card',
  //   external: true,
  // },
]

// ==================== About Me 内容配置 ====================
// 支持 HTML 标签
const aboutMe: string[] = [
  `Hi there! I am a student of Shandong University, majoring in Computer Science and Technology. My research interests include Agentic Reinforcement learning, deep learning and emboidied Agent`,
  'Although I’m still at the beginning of my academic journey, I’m eager to explore more opportunities for collaboration across academia and industry, and I’d love to connect with more like-minded people. Feel free to reach out if you have any questions or would like to collaborate!',
]

// ==================== Publications 配置 ====================
interface Publication {
  title: string
  url: string
  venue: string
  authors: string
  githubRepo?: string
  githubStars?: string
}

const publications: Publication[] = []

// ==================== Honors and Awards 配置 ====================
interface Honor {
  date: string
  title: string
  description?: string
}

const honors: Honor[] = [
  {
    date: '2025.11',
    title: 'Silver Medal',
    description: 'International Collegiate Programming Contest (ICPC) Regional Contest (Nanjing)',
  },
  {
    date: '2025.11',
    title: 'Silver Medal',
    description: 'International Collegiate Programming Contest (ICPC) Regional Contest (Wuhan)',
  },
  {
    date: '2025.10',
    title: 'Sliver Medal',
    description: '中国计算机学会大学生计算机系统与程序设计竞赛',
  },
]

// ==================== Education 配置 ====================
interface Education {
  period: string
  degree: string
  school: string
  location: string
  supervisor?: string
}

const education: Education[] = [
  {
    period: '2023.09 - 2027.06',
    degree: 'Bachelor, Computer Science',
    school: 'Shandong University',
    location: 'Qingdao',
  },
]

// ==================== Internships 配置 ====================
interface Internship {
  period: string
  position: string
  company: string
}

const internships: Internship[] = [
  {
    period: '2025.12 - Present',
    position: 'Research Assistant',
    company: 'HKUST Peilab',
  },
  {
    period: '2024.9 - Present',
    position: 'Research Assistant',
    company: 'Shandong University IR Lab',
  },
]

// ==================== Others 配置 ====================
const others: string[] = ['Arch Linux User, Competitive Program contest Lover, Leader of the Shandong University ACM Team']

// 设置页面元信息
useHead({
  title: `${profile.name} - Homepage`,
  meta: [
    {
      name: 'description',
      content: footerData.aboutAuthor,
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: navbarData.homeTitle,
  description: 'Computer Science Student at Shandong University',
  link: '/avatar.jpeg',
})
</script>

<template>
  <div class="academic-page py-5">
    <div class="page-container px-6 container max-w-5xl mx-auto">
      <!-- 左侧个人信息栏 -->
      <aside class="sidebar">
        <div class="profile-box">
          <!-- 头像 -->
          <div class="author-avatar">
            <NuxtImg
              :src="profile.avatar"
              :alt="profile.name"
              width="180"
              height="180"
              class="avatar-img border border-gray-300 dark:border-gray-600"
            />
          </div>

          <!-- 姓名和单位 -->
          <div class="author-content">
            <h1 class="author-name text-gray-900 dark:text-gray-100">
              {{ profile.name }}
              <br />
              <span class="author-name-cn text-gray-600 dark:text-gray-400">{{ profile.nameCn }}</span>
            </h1>
            <p class="author-affiliation text-gray-600 dark:text-gray-400">{{ profile.affiliation }}</p>
          </div>

          <!-- 个人简介 -->
          <div class="author-bio">
            <p class="text-gray-700 dark:text-gray-300">{{ profile.bio }}</p>
          </div>

          <!-- 座右铭 -->
          <blockquote v-if="profile.motto" class="author-motto text-gray-700 dark:text-gray-300">
            <p>{{ profile.motto }}</p>
          </blockquote>

          <!-- 位置信息 -->
          <div class="author-location text-gray-600 dark:text-gray-400">
            <Icon name="fa:map-marker" size="14" />
            <span>{{ profile.location }}</span>
          </div>

          <!-- 社交链接 -->
          <ul v-if="Array.isArray(socialLinks) && socialLinks.length > 0" class="social-links">
            <li v-for="link in socialLinks" :key="link.name">
              <a
                :href="link.url"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="social-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Icon :name="link.icon" size="18" class="social-icon" />
                <span>{{ link.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右侧主内容区 -->
      <div class="main-content">
        <article class="page-article">
          <!-- About Me 区域 -->
          <section id="about-me" class="content-section">
            <p
              v-for="(paragraph, index) in aboutMe"
              :key="index"
              class="intro-text text-gray-800 dark:text-gray-200"
              v-html="paragraph"
            />
          </section>

          <!-- Publications 区域 -->
          <section v-if="publications.length > 0" id="publications" class="content-section">
            <h2 class="section-title text-gray-900 dark:text-gray-100"><span class="section-icon">📝</span> Publications</h2>

            <div class="paper-list">
              <div v-for="(paper, index) in publications" :key="index" class="paper-item">
                <p class="paper-content text-gray-800 dark:text-gray-200">
                  [{{ index + 1 }}]
                  <strong>
                    <a :href="paper.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">{{
                      paper.title
                    }}</a>
                    - {{ paper.venue }}
                  </strong>
                  <a v-if="paper.githubRepo" :href="paper.githubRepo" target="_blank" rel="noopener noreferrer" class="paper-badge">
                    <img :src="`https://img.shields.io/github/stars/${paper.githubStars}?style=social`" alt="GitHub stars" />
                  </a>
                </p>
                <p class="paper-authors text-gray-600 dark:text-gray-400">
                  <em v-html="paper.authors" />
                </p>
              </div>
            </div>
          </section>

          <!-- Honors and Awards 区域 -->
          <section v-if="honors.length > 0" id="honors" class="content-section">
            <h2 class="section-title text-gray-900 dark:text-gray-100"><span class="section-icon">🎖</span> Honors and Awards</h2>

            <ul class="info-list">
              <li v-for="(honor, index) in honors" :key="index" class="text-gray-800 dark:text-gray-200">
                <em class="text-gray-600 dark:text-gray-400">{{ honor.date }}</em>
                <strong>{{ honor.title }}</strong
                >{{ honor.description ? `, ${honor.description}` : '' }}
              </li>
            </ul>
          </section>

          <!-- Education 区域 -->
          <section v-if="education.length > 0" id="education" class="content-section">
            <h2 class="section-title text-gray-900 dark:text-gray-100"><span class="section-icon">📖</span> Education</h2>

            <ul class="info-list">
              <li v-for="(edu, index) in education" :key="index" class="text-gray-800 dark:text-gray-200">
                <em class="text-gray-600 dark:text-gray-400">{{ edu.period }}</em
                >, {{ edu.degree }}, {{ edu.school }}, {{ edu.location
                }}{{ edu.supervisor ? `. (Supervised by ${edu.supervisor})` : '' }}
              </li>
            </ul>
          </section>

          <!-- Internships 区域 -->
          <section v-if="internships.length > 0" id="internships" class="content-section">
            <h2 class="section-title text-gray-900 dark:text-gray-100"><span class="section-icon">💻</span> Internships</h2>

            <ul class="info-list">
              <li v-for="(intern, index) in internships" :key="index" class="text-gray-800 dark:text-gray-200">
                <em class="text-gray-600 dark:text-gray-400">{{ intern.period }}</em
                >, {{ intern.position }}, {{ intern.company }}.
              </li>
            </ul>
          </section>

          <!-- Others 区域 -->
          <section v-if="others.length > 0" id="others" class="content-section">
            <h2 class="section-title text-gray-900 dark:text-gray-100"><span class="section-icon">💬</span> Others</h2>

            <ul class="info-list">
              <li v-for="(item, index) in others" :key="index" class="text-gray-800 dark:text-gray-200">
                {{ item }}
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========== 页面整体布局 ========== */
.page-container {
  display: flex;
  gap: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* ========== 左侧边栏样式 ========== */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.profile-box {
  text-align: center;
}

/* 头像样式 */
.author-avatar {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.avatar-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

/* 姓名样式 */
.author-content {
  margin-bottom: 12px;
}

.author-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.author-name-cn {
  font-size: 1rem;
  font-weight: 400;
}

.author-affiliation {
  font-size: 0.95rem;
  margin: 0;
}

/* 个人简介 */
.author-bio {
  margin: 16px 0;
  text-align: left;
}

.author-bio p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

/* 座右铭 */
.author-motto {
  margin: 16px 0;
  padding-left: 12px;
  border-left: 3px solid #d1d5db;
  text-align: left;
}

html.dark .author-motto {
  border-left-color: #4b5563;
}

.author-motto p {
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.5;
}

/* 位置信息 */
.author-location {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

/* 社交链接 */
.social-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.social-links li {
  margin-bottom: 8px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 6px 0;
  transition: color 0.2s;
}

.social-icon {
  width: 20px;
  text-align: center;
}

/* ========== 右侧主内容区样式 ========== */
.main-content {
  flex: 1;
  min-width: 0;
}

.page-article {
  max-width: 800px;
}

/* 内容区块 */
.content-section {
  margin-bottom: 32px;
}

/* 区块标题 */
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  font-size: 1.3rem;
}

/* 介绍文字 */
.intro-text {
  font-size: 1rem;
  line-height: 1.8;
  margin: 0 0 12px 0;
}

/* ========== 论文列表样式 ========== */
.paper-list {
  font-size: 1rem;
}

.paper-item {
  margin-bottom: 16px;
  padding-left: 0;
}

.paper-content {
  margin: 0 0 4px 0;
  line-height: 1.6;
}

.paper-badge {
  margin-left: 8px;
  vertical-align: middle;
}

.paper-badge img {
  vertical-align: middle;
}

.paper-authors {
  margin: 0;
  font-size: 0.95rem;
}

/* ========== 信息列表样式 ========== */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  margin-bottom: 10px;
  font-size: 1rem;
  line-height: 1.6;
}

.info-list li em {
  font-style: normal;
  margin-right: 8px;
}

/* ========== 响应式设计 ========== */
@media (max-width: 900px) {
  .page-container {
    flex-direction: column;
    padding: 16px;
  }

  .sidebar {
    width: 100%;
    position: static;
    margin-bottom: 32px;
  }

  .profile-box {
    text-align: center;
  }

  .author-bio,
  .author-location {
    justify-content: center;
    text-align: center;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .social-links li {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .author-name {
    font-size: 1.3rem;
  }

  .avatar-img {
    width: 150px;
    height: 150px;
  }

  .section-title {
    font-size: 1.3rem;
  }
}
</style>

<style>
/* ========== 深色模式下 v-html 内容样式（非 scoped） ========== */
/* 介绍文字中的链接 */
.intro-text a {
  color: #2563eb;
  text-decoration: none;
}

.intro-text a:hover {
  text-decoration: underline;
}

html.dark .intro-text a {
  color: #60a5fa;
}

/* 论文作者中的强调文字 */
.paper-authors strong {
  font-weight: 600;
}

html.dark .paper-authors strong {
  color: #e5e7eb;
}
</style>
