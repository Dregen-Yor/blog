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

const publications: Publication[] = [
  {
    title: 'Do Generative Recommenders Deepen the Information Cocoon? A Closed-Loop Simulation with LLM-powered User Simulators',
    url: 'https://arxiv.org/abs/2606.17707',
    venue: 'arXiv preprint arXiv:2606.17707, 2026',
    authors: 'Jiyuan Yang, <strong>Gengxin Sun</strong>, Mengqi Zhang, Lingjie Wang, Yuanzi Li, Hongxi Cui, Xin Xin, Pengjie Ren',
  },
]

// ==================== Projects 配置 ====================
interface Project {
  name: string
  url: string
  description?: string
  language?: string
  stars?: string // "owner/repo"，用于 shields.io star 徽章
}

const projects: Project[] = [
  {
    name: 'sdu-touying-simpl',
    url: 'https://github.com/Dregen-Yor/sdu-touying-simpl',
    description: '基于 touying 库，参考 SDU-Beamer、diatypst、touying-pres-ustc 等模板制作而成的演示模板',
    language: 'Typst',
    stars: 'Dregen-Yor/sdu-touying-simpl',
  },
  {
    name: 'raspi-car',
    url: 'https://github.com/Dregen-Yor/raspi-car',
    description: '树莓派小车',
    language: 'C',
    stars: 'Dregen-Yor/raspi-car',
  },
  {
    name: 'SDU-QD-Electricity-Query-Script',
    url: 'https://github.com/Dregen-Yor/SDU-QD-Electricity-Query-Script',
    description: '山东大学青岛校区更新山大V卡通2.0后的全新宿舍电量查询脚本',
    language: 'Python',
    stars: 'Dregen-Yor/SDU-QD-Electricity-Query-Script',
  },
  {
    name: 'RecLoop',
    url: 'https://github.com/Dregen-Yor/RecLoop',
    description:
      'Official code for "Do Generative Recommenders Deepen the Information Cocoon? A Closed-Loop Simulation with LLM-Powered Agents"',
    language: 'Python',
    stars: 'Dregen-Yor/RecLoop',
  },
  {
    name: 'blog',
    url: 'https://github.com/Dregen-Yor/blog',
    description: 'Personal blog built with Nuxt 4, Vue, Nuxt Content, and Tailwind CSS',
    language: 'Vue',
    stars: 'Dregen-Yor/blog',
  },
  {
    name: 'competitive-programming-library',
    url: 'https://github.com/Dregen-Yor/competitive-programming-library',
    description: '📚 A modern and efficient C++ library for ICPC and competitive programming',
    language: 'C++',
    stars: 'Dregen-Yor/competitive-programming-library',
  },
]

// 主要语言颜色（GitHub 语言色，用于卡片语言圆点）
const languageColors: Record<string, string> = {
  Typst: '#239dad',
  C: '#555555',
  Python: '#3572a5',
  Vue: '#41b883',
  'C++': '#f34b7d',
}

function langColor(lang?: string): string {
  return (lang && languageColors[lang]) || '#8b949e'
}

// ==================== Honors and Awards 配置 ====================
interface Honor {
  date: string
  title: string
  description?: string
  org?: 'ICPC' | 'Huawei' | 'CCF'
}

// 奖项组织官方 logo 路径（用于条目后的图标）
const orgLogos: Record<NonNullable<Honor['org']>, string> = {
  ICPC: '/logos/icpc.png',
  Huawei: '/logos/huawei.svg',
  CCF: '/logos/ccf.png',
}

const honors: Honor[] = [
  {
    date: '2026.4',
    title: 'Champion',
    description: 'Huawei CodeCraft Preliminary Competition (Jiangshan Site)',
    org: 'Huawei',
  },
  {
    date: '2025.11',
    title: 'Silver Medal',
    description: 'International Collegiate Programming Contest (ICPC) Regional Contest (Nanjing)',
    org: 'ICPC',
  },
  {
    date: '2025.11',
    title: 'Silver Medal',
    description: 'International Collegiate Programming Contest (ICPC) Regional Contest (Wuhan)',
    org: 'ICPC',
  },
  {
    date: '2025.10',
    title: 'Sliver Medal',
    description: 'CCF Collegiate Computer Systems & Programming Contest (CCSP)',
    org: 'CCF',
  },
  {
    date: '2025.5',
    title: 'Gold Medal',
    description: 'Shandong Provincial Collegiate Programming Contest',
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
  supervisor?: string
}

const internships: Internship[] = [
  {
    period: '2024.9 - Present',
    position: 'Research Assistant',
    company: 'Shandong University GAI Lab (General Artificial Intelligence Lab)',
    supervisor: 'Xin Xin',
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
    <div class="page-container px-6 container max-w-6xl mx-auto">
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
                    <a
                      :href="paper.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 dark:text-blue-400 hover:underline"
                      >{{ paper.title }}</a
                    >
                    - {{ paper.venue }}
                  </strong>
                  <a
                    v-if="paper.githubRepo"
                    :href="paper.githubRepo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="paper-badge"
                  >
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
                <span v-if="honor.org" class="honor-org">
                  <img :src="orgLogos[honor.org]" :alt="honor.org" loading="lazy" />
                </span>
              </li>
            </ul>
          </section>

          <!-- Projects 区域 -->
          <section v-if="projects.length > 0" id="projects" class="content-section">
            <h2 class="section-title text-gray-900 dark:text-gray-100"><span class="section-icon">🚀</span> Projects</h2>

            <div class="project-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                v-for="(project, index) in projects"
                :key="index"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="project-card"
              >
                <div class="project-card-header">
                  <span class="project-name">{{ project.name }}</span>
                  <img
                    v-if="project.stars"
                    :src="`https://img.shields.io/github/stars/${project.stars}?style=social`"
                    :alt="`${project.name} stars`"
                    loading="lazy"
                    class="project-stars"
                  />
                </div>
                <p v-if="project.description" class="project-desc">{{ project.description }}</p>
                <div v-if="project.language" class="project-meta">
                  <span class="lang-dot" :style="{ backgroundColor: langColor(project.language) }" />
                  <span class="project-lang">{{ project.language }}</span>
                </div>
              </a>
            </div>
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
                >, {{ intern.position }}, {{ intern.company
                }}{{ intern.supervisor ? `. (Supervised by ${intern.supervisor})` : '' }}
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

/* ========== 项目卡片样式 ========== */
.project-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

html.dark .project-card {
  border-color: #374151;
}

.project-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

html.dark .project-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.project-name {
  font-weight: 600;
  font-size: 1.05rem;
  color: #2563eb;
  word-break: break-word;
}

html.dark .project-name {
  color: #60a5fa;
}

.project-stars {
  flex-shrink: 0;
}

.project-desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #4b5563;
  flex: 1;
}

html.dark .project-desc {
  color: #9ca3af;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lang-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.project-lang {
  font-size: 0.85rem;
  color: #6b7280;
}

html.dark .project-lang {
  color: #9ca3af;
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

/* 奖项组织 logo 徽章 */
.honor-org {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 3px 4px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  vertical-align: middle;
}

html.dark .honor-org {
  background: #f4f4f5;
  border-color: #52525b;
}

.honor-org img {
  height: 16px;
  width: auto;
  display: block;
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
