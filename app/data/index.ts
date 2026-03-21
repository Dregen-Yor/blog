export const navbarData = {
  homeTitle: "SunUpdate's Blog",
}

export const footerData = {
  author: 'Gengxin Sun',
  aboutAuthor:
    'Hi! I am Gengxin Sun, a Tech enthusiast, problem solver and software engineer. Currently studying in Shandong University',
  authorInterest:
    "I have a fair amount of knowledge of Reinforcement learning and deep learning. If you have an interesting idea, either open source or paid let's connect.",
  aboutTheSite:
    "This is a personal blog site built with Nuxt3, TailwindCSS, NuxtContent, Nuxt Icon. Currently it's deployed in Vercel.",
}

export const homePage = {
  title: 'Welcome To My Blog Site',
  description: 'Get Reinforcement learning, deep learning, Related Articles, Tips, Learning resources and more.',
}

export const blogsPage = {
  title: 'All Blogs',
  description: 'Here you will find all the blog posts I have written & published on this site.',
}

export const categoryPage = {
  title: 'Categories',
  description: 'Blow this category is generated from all the tags are mentioned in the different blog post',
}

export const aboutPage = {
  title: 'Gengxin Sun',
  description:
    'Student of Shandong University, majoring in Computer Science and Technology. My research interests include Reinforcement learning and deep learning.',
  aboutMe:
    "Hello, fellow human! I'm a student of Shandong University, majoring in Computer Science and Technology. My research interests include Reinforcement learning and deep learning.",
}

export const seoData = {
  title: `SunUpdate's Blog | SunUpdate's Blog`,
  ogTitle: `Let's learn Javascript, Typescript, Vue, Nuxt, & Problem Solving - SunUpdate's Blog | SunUpdate's Blog`,
  description: `Hi I am SunUpdate. A student of Shandong University, majoring in Computer Science and Technology. My research interests include Reinforcement learning and deep learning. - SunUpdate's Blog | SunUpdate's Blog`,
  twitterDescription: `SunUpdate's Blog, where I play around with Nuxt, Vue, and more and showcase my blog, resources, etc - SunUpdate's Blog | SunUpdate's Blog`,
  image: 'https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp',
  mySite: 'https://sunupdate.icu',
  twitterHandle: '@qdnvubp',
  mailAddress: 'gxin.sun@mail.sdu.edu.cn',
}

export const socialLinks = {
  githubLink: 'https://github.com/Dregen-Yor',
  // linkedinLink: 'https://www.linkedin.com/in/nur-riyad/',
  // twitterLink: 'https://twitter.com/qdnvubp',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
