<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Floating Blobs -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <!-- Floating Shapes -->
      <div class="absolute top-20 left-10 w-32 h-32 border-4 border-indigo-200/50 rounded-3xl transform rotate-12 animate-float"></div>
      <div class="absolute bottom-32 right-20 w-24 h-24 border-4 border-purple-200/50 rounded-full animate-float animation-delay-1500"></div>
      <div class="absolute top-1/2 left-1/3 w-16 h-16 border-4 border-pink-200/50 rounded-2xl transform -rotate-45 animate-float animation-delay-3000"></div>
    </div>

    <div class="relative">
      <!-- Navigation -->
      <div class="absolute top-0 left-0 right-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BrainBite
              </span>
            </div>
            <div v-if="!user" class="hidden md:block">
              <NuxtLink
                to="/login"
                class="px-6 py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
              >
                Sign In
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center pt-16">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-8 animate-fade-in">
            <div class="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse mr-2"></div>
            <span class="text-sm font-semibold text-indigo-700">AI-Powered Learning Platform</span>
          </div>

          <!-- Main Headline -->
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 animate-fade-in" style="animation-delay: 0.2s">
            <span class="block text-gray-900">Learn Anything,</span>
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="mt-6 max-w-3xl mx-auto text-xl sm:text-2xl md:text-3xl text-gray-600 leading-relaxed animate-fade-in" style="animation-delay: 0.4s">
            Transform your learning experience with AI-generated courses that adapt to your pace and preferences.
          </p>

          <!-- Features Grid -->
          <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style="animation-delay: 0.6s">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-4 mx-auto">
                <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p class="text-sm text-gray-600">Courses generated in under 30 seconds</p>
            </div>
            
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4 mx-auto">
                <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Intelligent</h3>
              <p class="text-sm text-gray-600">AI-powered content tailored for you</p>
            </div>
            
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center mb-4 mx-auto">
                <svg class="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Interactive</h3>
              <p class="text-sm text-gray-600">Audio lessons and quizzes included</p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style="animation-delay: 0.8s">
            <NuxtLink
              to="/courses"
              class="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1 min-w-[240px]"
            >
              <!-- Button Background -->
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-pink-700"></div>
              
              <!-- Shine Effect -->
              <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              
              <!-- Button Content -->
              <div class="relative flex items-center">
                <svg class="mr-3 w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="relative">Browse Courses</span>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/generate-course"
              class="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1 min-w-[240px]"
            >
              <!-- Button Background -->
              <div class="absolute inset-0 bg-white rounded-2xl group-hover:bg-gray-50"></div>
              
              <!-- Border Gradient -->
              <div class="absolute inset-0 rounded-2xl p-[2px]">
                <div class="w-full h-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <!-- Button Content -->
              <div class="relative flex items-center">
                <svg class="mr-3 w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="relative bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700">
                  Generate Course
                </span>
              </div>
            </NuxtLink>
          </div>

          <!-- Trust Indicators -->
          <div class="mt-20 pt-12 border-t border-gray-200/50 animate-fade-in" style="animation-delay: 1s">
            <p class="text-sm text-gray-500 mb-8">Trusted by learners worldwide</p>
            <div class="flex flex-wrap items-center justify-center gap-8">
              <div class="text-center">
                <div class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
                <div class="text-sm text-gray-600">Courses Created</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">50K+</div>
                <div class="text-sm text-gray-600">Lessons Learned</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">99%</div>
                <div class="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </div>

    <!-- Wave Divider -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg class="w-full h-auto" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="url(#gradient)" fill-opacity="0.1"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#4f46e5" />
            <stop offset="50%" stop-color="#7c3aed" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// Redirect authenticated users to courses
const user = useSupabaseUser();
const router = useRouter();

onMounted(() => {
  if (user.value) {
    router.push('/courses');
  }
});
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}

.animate-shine {
  animation: shine 2s infinite;
}

.animate-scroll {
  animation: scroll 1.5s ease-in-out infinite;
}

.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              transform 0.3s ease,
              box-shadow 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #c7d2fe, #a5b4fc);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #a5b4fc, #818cf8);
}

/* Selection color */
::selection {
  background-color: rgba(139, 92, 246, 0.2);
  color: #4f46e5;
}
</style>