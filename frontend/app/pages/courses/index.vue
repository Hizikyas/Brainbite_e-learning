<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative">
      <!-- Hero Header -->
      <div class="pt-8 pb-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-4 shadow-lg">
                  <svg class="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Your Courses
                  </h1>
                  <p class="mt-2 text-lg text-gray-600">
                    Learn, grow, and master new skills with AI-powered courses
                  </p>
                </div>
              </div>
              
              <!-- Stats -->
              <div class="flex flex-wrap items-center gap-4 mt-6">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse mr-2"></div>
                  <span class="text-sm font-medium text-gray-700">{{ courses.length }} total courses</span>
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse mr-2"></div>
                  <span class="text-sm font-medium text-gray-700">{{ publishedCount }} published</span>
                </div>
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse mr-2"></div>
                  <span class="text-sm font-medium text-gray-700">{{ totalLessons }} total lessons</span>
                </div>
              </div>
            </div>
            
            <!-- Generate Button -->
            <NuxtLink
              to="/generate-course"
              class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1 min-w-[220px]"
            >
              <!-- Button Background -->
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-pink-700"></div>
              
              <!-- Shine Effect -->
              <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              
              <!-- Button Content -->
              <div class="relative flex items-center">
                <svg class="mr-3 w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="relative">
                  Create New Course
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px]">
          <div class="relative mb-8">
            <div class="w-24 h-24 rounded-full border-8 border-indigo-200 animate-pulse"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 rounded-full border-8 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
            </div>
            <div class="absolute inset-6 flex items-center justify-center">
              <div class="w-8 h-8 rounded-full border-8 border-transparent border-b-pink-500 border-l-blue-500 animate-spin-reverse"></div>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Loading Your Courses</h3>
          <p class="text-gray-600 max-w-md text-center">Fetching your personalized learning content...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="max-w-3xl mx-auto">
          <div class="bg-gradient-to-r from-red-50 to-rose-50 rounded-3xl p-8 border border-red-200 shadow-lg">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-6">
                <h3 class="text-2xl font-bold text-red-900 mb-3">Unable to Load Courses</h3>
                <p class="text-red-800 mb-6">{{ error }}</p>
                <div class="flex space-x-4">
                  <button
                    @click="fetchCourses"
                    class="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Try Again
                  </button>
                  <NuxtLink
                    to="/generate-course"
                    class="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Create First Course
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="courses.length === 0" class="max-w-2xl mx-auto">
          <div class="text-center pt-16 pb-24">
            <div class="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-8 shadow-xl">
              <svg class="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">No Courses Yet</h2>
            <p class="text-lg text-gray-600 mb-10 max-w-md mx-auto">
              Your learning journey starts here. Create your first AI-powered course in seconds.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <NuxtLink
                to="/generate-course"
                class="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1 min-w-[240px]"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-pink-700"></div>
                <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                <div class="relative flex items-center">
                  <svg class="mr-3 w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="relative">✨ Create First Course</span>
                </div>
              </NuxtLink>
              <div class="text-sm text-gray-500">
                It's fast, easy, and powered by AI
              </div>
            </div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div v-else class="space-y-8">
          <!-- Filters & Search -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex-1">
                <div class="relative max-w-md">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    class="block w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                    placeholder="Search courses..."
                  />
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-700">Filter by:</span>
                  <select
                    v-model="statusFilter"
                    class="text-sm border-2 border-gray-200 rounded-lg px-3 py-2 focus:ring-0 focus:border-indigo-500 transition-all duration-300"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div class="text-sm text-gray-500">
                  {{ filteredCourses.length }} of {{ courses.length }} courses
                </div>
              </div>
            </div>
          </div>

          <!-- Courses Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="course in filteredCourses"
              :key="course.id"
              class="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
              @click="$router.push(`/courses/${course.id}`)"
            >
              <!-- Course Card -->
              <div class="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden h-full hover:shadow-2xl transition-all duration-500">
                <!-- Card Header -->
                <div class="relative">
                  <!-- Gradient Banner -->
                  <div class="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                  
                  <!-- Course Info -->
                  <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                      <div class="flex-1">
                        <!-- Subject Badge -->
                        <span class="inline-block px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 mb-3">
                          {{ course.subject }}
                        </span>
                        
                        <!-- Title -->
                        <h3 class="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
                          {{ course.title }}
                        </h3>
                      </div>
                      
                      <!-- Status Badge -->
                      <span
                        class="flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm"
                        :class="course.is_published 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
                          : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'"
                      >
                        {{ course.is_published ? '✓ Published' : '✎ Draft' }}
                      </span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-600 line-clamp-2 mb-6 leading-relaxed">
                      {{ course.description || 'No description available' }}
                    </p>
                    
                    <!-- Stats -->
                    <div class="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mr-2">
                            <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div>
                            <div class="text-sm font-bold text-gray-900">{{ course.course_pages?.length || 0 }}</div>
                            <div class="text-xs text-gray-500">Lessons</div>
                          </div>
                        </div>
                        
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mr-2">
                            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div class="text-sm font-bold text-gray-900">{{ course.questions?.length || 0 }}</div>
                            <div class="text-xs text-gray-500">Questions</div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- View Button -->
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-50 to-white flex items-center justify-center group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-300 border border-gray-200 group-hover:border-indigo-200">
                          <svg class="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Hover Effect -->
                <div class="absolute inset-0 border-2 border-transparent group-hover:border-indigo-200 rounded-3xl pointer-events-none transition-all duration-500"></div>
              </div>
            </div>
          </div>

          <!-- Generate New Course Card -->
          <div class="group">
            <NuxtLink
              to="/generate-course"
              class="block h-full"
            >
              <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl border-2 border-dashed border-indigo-200 overflow-hidden h-full hover:shadow-2xl transition-all duration-500 hover:border-indigo-300">
                <div class="p-8 text-center">
                  <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-6 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-500 shadow-lg">
                    <svg class="w-10 h-10 text-indigo-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">Create New Course</h3>
                  <p class="text-gray-600 mb-6">
                    Generate a personalized AI course in seconds
                  </p>
                  <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg">
                    <span>Start Creating</span>
                    <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const courses = ref<any[]>([]);
const loading = ref(true);
const error = ref('');
const searchQuery = ref('');
const statusFilter = ref('all');

// Computed properties
const publishedCount = computed(() => {
  return courses.value.filter(course => course.is_published).length;
});

const totalLessons = computed(() => {
  return courses.value.reduce((total, course) => total + (course.course_pages?.length || 0), 0);
});

const filteredCourses = computed(() => {
  let filtered = courses.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query) ||
      (course.description?.toLowerCase() || '').includes(query)
    );
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(course => 
      statusFilter.value === 'published' ? course.is_published : !course.is_published
    );
  }
  
  // Sort by creation date (newest first)
  return filtered.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
});

const fetchCourses = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Get session for auth token
    const supabase = useSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Please log in to view your courses');
    }
    
    // Call backend API
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.backendUrl}/courses`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Session expired. Please log in again.');
      } else if (response.status === 403) {
        throw new Error('You do not have permission to view courses.');
      } else {
        throw new Error(`Unable to load courses (${response.status})`);
      }
    }
    
    const data = await response.json();
    courses.value = data;
  } catch (err: any) {
    error.value = err.message || 'Failed to load courses. Please check your connection and try again.';
    console.error('Error fetching courses:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourses();
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

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
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

.animate-shine {
  animation: shine 2s infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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