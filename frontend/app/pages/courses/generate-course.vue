<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative">
      <!-- Hero Section -->
      <div class="text-center mb-12 pt-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-6 shadow-lg">
          <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Your AI Course
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Describe what you want to learn, and our AI will craft a personalized course with interactive lessons and quizzes.
        </p>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Form Card -->
        <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          <div class="px-8 py-10 md:px-10 md:py-12">
            <!-- Form Steps Indicator -->
            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                    <span class="text-white font-semibold">1</span>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Describe Topic</p>
                    <p class="text-xs text-gray-500">Tell us what you want to learn</p>
                  </div>
                </div>
                <div class="hidden md:block w-16 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200"></div>
                <div class="hidden md:flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                    <span class="text-gray-500 font-semibold">2</span>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-400">AI Generation</p>
                    <p class="text-xs text-gray-400">Creating your content</p>
                  </div>
                </div>
              </div>
              <div class="hidden md:block px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full">
                <span class="text-sm font-semibold text-indigo-700">🎯 Personalized Learning</span>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-8">
              <!-- Subject Input -->
              <div class="group">
                <label for="subject" class="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  What do you want to learn about? *
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    required
                    class="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-indigo-500 focus:border-2 transition-all duration-300 text-lg shadow-sm hover:border-indigo-300 hover:shadow"
                    placeholder="Try 'Blockchain Basics', 'Japanese for Beginners', 'Machine Learning Fundamentals'..."
                  />
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span v-if="form.subject.length > 0" class="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                      {{ form.subject.length }}/100
                    </span>
                  </div>
                </div>
                <p class="mt-3 text-sm text-gray-500 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Be specific for better results! Example: "Python for Data Science" or "Meditation Techniques"
                </p>
              </div>

              <!-- Optional Fields Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Level -->
                <div class="group">
                  <label for="level" class="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Difficulty Level
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <select
                      id="level"
                      v-model="form.level"
                      class="block w-full pl-10 pr-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 focus:border-2 transition-all duration-300 appearance-none shadow-sm hover:border-indigo-300 hover:shadow"
                    >
                      <option value="" class="text-gray-500">Select difficulty</option>
                      <option value="beginner" class="text-gray-900">👶 Beginner</option>
                      <option value="intermediate" class="text-gray-900">📚 Intermediate</option>
                      <option value="advanced" class="text-gray-900">🎓 Advanced</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Age Range -->
                <div class="group">
                  <label for="age_range" class="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Age Group
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <select
                      id="age_range"
                      v-model="form.age_range"
                      class="block w-full pl-10 pr-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 focus:border-2 transition-all duration-300 appearance-none shadow-sm hover:border-indigo-300 hover:shadow"
                    >
                      <option value="" class="text-gray-500">All ages</option>
                      <option value="6-12" class="text-gray-900">🧒 6-12 years</option>
                      <option value="13-17" class="text-gray-900">👦 13-17 years</option>
                      <option value="18+" class="text-gray-900">👨‍🎓 18+ years</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Language -->
                <div class="group">
                  <label for="language" class="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Language
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <select
                      id="language"
                      v-model="form.language"
                      class="block w-full pl-10 pr-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 focus:border-2 transition-all duration-300 appearance-none shadow-sm hover:border-indigo-300 hover:shadow"
                    >
                      <option value="en" class="text-gray-900">🇬🇧 English</option>
                      <option value="es" class="text-gray-900">🇪🇸 Spanish</option>
                      <option value="fr" class="text-gray-900">🇫🇷 French</option>
                      <option value="de" class="text-gray-900">🇩🇪 German</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Course Preview -->
              <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-4 shadow-md">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">What You'll Get</h3>
                    <p class="text-sm text-gray-600">Your AI-generated course includes:</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="text-center">
                    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <span class="text-xl font-bold text-indigo-600">4</span>
                    </div>
                    <p class="text-xs font-medium text-gray-700">Interactive Lessons</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <span class="text-xl font-bold text-indigo-600">2</span>
                    </div>
                    <p class="text-xs font-medium text-gray-700">Quiz Questions</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </div>
                    <p class="text-xs font-medium text-gray-700">Audio Support</p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p class="text-xs font-medium text-gray-700">Instant Feedback</p>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 p-6 border border-red-200 animate-shake">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                    <p class="text-red-700">{{ error }}</p>
                  </div>
                </div>
              </div>

              <!-- Submit Section -->
              <div class="pt-8 border-t border-gray-200">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div class="text-center md:text-left">
                    <p class="text-sm font-medium text-gray-700 mb-1">Ready to create your course?</p>
                    <p class="text-xs text-gray-500">AI will personalize content based on your preferences</p>
                  </div>
                  <button
                    type="submit"
                    :disabled="loading || !form.subject.trim()"
                    class="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden min-w-[220px]"
                    :class="loading || !form.subject.trim() 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500' 
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700'"
                  >
                    <!-- Animated Background -->
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <!-- Button Content -->
                    <div class="relative flex items-center">
                      <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="mr-3 h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span class="relative">
                        {{ loading ? 'Generating Your Course...' : '✨ Generate Course Now' }}
                      </span>
                    </div>
                    
                    <!-- Shine Effect -->
                    <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Tips Section -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Fast Generation</h4>
            <p class="text-sm text-gray-600">Courses created in under 30 seconds with advanced AI</p>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Quality Content</h4>
            <p class="text-sm text-gray-600">Educational, accurate, and engaging material every time</p>
          </div>
          
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Save & Share</h4>
            <p class="text-sm text-gray-600">Access your courses anytime and share with others</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Modal -->
    <div v-if="loading" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 max-w-lg w-full mx-4 transform transition-all duration-500 scale-95 animate-scale-in">
        <div class="text-center">
          <!-- Animated Spinner -->
          <div class="relative mb-8">
            <div class="w-32 h-32 mx-auto">
              <div class="absolute inset-0 rounded-full border-8 border-indigo-200 animate-pulse"></div>
              <div class="absolute inset-4 rounded-full border-8 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
              <div class="absolute inset-8 rounded-full border-8 border-transparent border-b-pink-500 border-l-blue-500 animate-spin-reverse"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg class="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Crafting Your Course</h3>
          
          <div class="mb-8">
            <div class="text-sm text-gray-600 mb-3">AI is working on:</div>
            <div class="space-y-3">
              <div class="flex items-center animate-fade-in" style="animation-delay: 0.2s">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                <span class="text-gray-700">Analyzing your topic...</span>
              </div>
              <div class="flex items-center animate-fade-in" style="animation-delay: 0.4s">
                <div class="w-3 h-3 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
                <span class="text-gray-700">Structuring lessons...</span>
              </div>
              <div class="flex items-center animate-fade-in" style="animation-delay: 0.6s">
                <div class="w-3 h-3 rounded-full bg-purple-500 mr-3 animate-pulse"></div>
                <span class="text-gray-700">Creating quiz questions...</span>
              </div>
              <div class="flex items-center animate-fade-in" style="animation-delay: 0.8s">
                <div class="w-3 h-3 rounded-full bg-pink-500 mr-3 animate-pulse"></div>
                <span class="text-gray-700">Finalizing course...</span>
              </div>
            </div>
          </div>
          
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full animate-progress"></div>
          </div>
          <p class="mt-4 text-sm text-gray-600">This usually takes 10-20 seconds...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const form = ref({
  subject: '',
  level: '',
  age_range: '',
  language: 'en',
});

const loading = ref(false);
const error = ref('');
const router = useRouter();

const handleSubmit = async () => {
  if (!form.value.subject.trim()) {
    error.value = 'Please enter a subject for your course';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    // Get session for auth token
    const supabase = useSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Please log in to create a course');
    }
    
    // Call backend API
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.backendUrl}/courses/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: form.value.subject,
        level: form.value.level || undefined,
        age_range: form.value.age_range || undefined,
        language: form.value.language,
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate course. Please try again.');
    }
    
    const data = await response.json();
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to the new course
    router.push(`/courses/${data.course_id}`);
    
  } catch (err: any) {
    error.value = err.message || 'Failed to generate course. Please check your connection and try again.';
    console.error('Error generating course:', err);
  } finally {
    loading.value = false;
  }
};
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
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

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-shine {
  animation: shine 2s infinite;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
  opacity: 0;
}

.animate-progress {
  animation: progress 20s ease-in-out infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 3s linear infinite;
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

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              transform 0.3s ease,
              box-shadow 0.3s ease;
}
</style>