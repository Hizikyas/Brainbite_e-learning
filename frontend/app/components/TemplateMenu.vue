<template>
  <nav class="flex space-x-4">
    <NuxtLink 
      to="/courses" 
      class="px-3 py-2 rounded-md text-sm font-medium"
      :class="{ 'bg-gray-100 text-gray-900': $route.path.startsWith('/courses') && $route.path !== '/courses/generate-course', 'text-gray-700 hover:text-gray-900 hover:bg-gray-100': !($route.path.startsWith('/courses') && $route.path !== '/courses/generate-course') }"
    >
      Courses
    </NuxtLink>
    <NuxtLink 
      to="/courses/generate-course" 
      class="px-3 py-2 rounded-md text-sm font-medium"
      :class="{ 'bg-gray-100 text-gray-900': $route.path === '/courses/generate-course', 'text-gray-700 hover:text-gray-900 hover:bg-gray-100': $route.path !== '/courses/generate-course' }"
    >
      Generate Course
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
</script>