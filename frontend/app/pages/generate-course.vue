<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex items-center justify-center">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Loading Animation -->
    <div class="relative text-center">
      <div class="mb-8">
        <!-- Animated Logo -->
        <div class="relative inline-block">
          <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl animate-pulse">
            <div class="absolute inset-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg class="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <!-- Orbital Rings -->
          <div class="absolute -inset-8 border-2 border-indigo-200/30 rounded-full animate-ping"></div>
          <div class="absolute -inset-12 border-2 border-purple-200/20 rounded-full animate-ping animation-delay-1000"></div>
        </div>
      </div>

      <!-- Loading Text -->
      <div class="space-y-4">
        <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Generating Your Course
        </h2>
        <p class="text-gray-600 max-w-md mx-auto">
          Our AI is crafting your personalized learning material
        </p>
        
        <!-- Progress Bar -->
        <div class="max-w-xs mx-auto">
          <div class="w-full bg-gray-200 rounded-full h-2 mt-6 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full animate-progress"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-2">
            <span>Starting</span>
            <span>Processing</span>
            <span>Almost Ready</span>
          </div>
        </div>

        <!-- Tips -->
        <div class="mt-8 max-w-sm mx-auto">
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-gray-600">
                <span class="font-medium">Tip:</span> This usually takes 30-60 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute bottom-8 left-8 animate-float">
      <div class="flex items-center text-sm text-gray-500">
        <div class="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></div>
        <span>e-Learning AI</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  // Get subject from query parameter
  const subject = route.query.subject as string;
  
  // Add a small delay for better UX
  setTimeout(() => {
    if (subject) {
      router.push(`/courses/generate-course?subject=${encodeURIComponent(subject)}`);
    } else {
      router.push('/courses/generate-course');
    }
  }, 1500); // Reduced to 1.5 seconds for better UX
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
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes progress {
  0% {
    width: 0%;
    transform: translateX(0);
  }
  50% {
    width: 70%;
    transform: translateX(0);
  }
  100% {
    width: 100%;
    transform: translateX(0);
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

.animation-delay-1000 {
  animation-delay: 1s;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}
</style>