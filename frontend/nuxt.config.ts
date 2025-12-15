// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@pinia/nuxt'],
  
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: ['/login'],
    },
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      // Backend currently runs on port 3002; override with NUXT_PUBLIC_BACKEND_URL if different
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://localhost:3002',
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  compatibilityDate: '2024-11-01',
  
  app: {
    head: {
      title: 'e-Learning Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI-powered e-learning platform' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})