<template>
  <div class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
          Welcome to <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">e-Learning</span>
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl md:text-2xl">
          AI-powered e-learning platform. Generate courses instantly, learn at your own pace.
        </p>
        <div class="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 gap-4">
          <NuxtLink
            to="/courses"
            class="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-5 md:text-lg md:px-12 transform transition-all hover:scale-105"
          >
            Browse Courses
          </NuxtLink>
          <NuxtLink
            to="/courses/generate-course"
            class="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-4 border-2 border-indigo-600 text-base font-semibold rounded-xl shadow-lg text-indigo-600 bg-white hover:bg-indigo-50 md:py-5 md:text-lg md:px-12 transform transition-all hover:scale-105"
          >
            Generate Course
          </NuxtLink>
        </div>
      </div>
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