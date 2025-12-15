<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Back Navigation -->
    <div class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <button
            @click="$router.back()"
            class="group flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          >
            <svg class="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Courses
          </button>
          
          <div class="flex items-center space-x-4">
            <button
              @click="toggleSpeech"
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow"
              :class="isSpeaking 
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'"
              :disabled="!course?.course_pages?.[activeTab]?.content_md"
            >
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isSpeaking" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path v-if="isSpeaking" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
              </svg>
              {{ isSpeaking ? 'Stop Listening' : 'Listen' }}
            </button>
            
            <div v-if="course" class="hidden md:flex items-center space-x-2">
              <span class="px-3 py-1 text-xs font-semibold rounded-full"
                :class="course.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'">
                {{ course.is_published ? 'Published' : 'Draft' }}
              </span>
              <span class="text-sm text-gray-500">|</span>
              <span class="text-sm text-gray-600">{{ course.course_pages?.length || 0 }} lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-lg font-medium text-gray-700">Loading course content...</p>
        <p class="mt-2 text-sm text-gray-500">Preparing your learning experience</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Unable to load course</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">{{ error }}</p>
        <button
          @click="$router.push('/courses')"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Browse All Courses
        </button>
      </div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Course Header -->
      <div class="mb-10">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-4">
              <span class="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-sm">
                {{ course.subject }}
              </span>
              <div class="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ formatDate(course.created_at) }}</span>
              </div>
            </div>
            
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {{ course.title }}
            </h1>
            
            <p class="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl">
              {{ course.description }}
            </p>
            
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center space-x-2">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-700">AI Generated</span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="text-sm text-gray-600">{{ course.course_pages?.length || 0 }} Lessons</span>
              </div>
            </div>
          </div>
          
          <div class="lg:text-right">
            <div class="inline-flex flex-col items-center lg:items-end space-y-3">
              <div v-if="score !== null" class="text-center lg:text-right">
                <div class="text-xs font-medium text-gray-500 mb-1">QUIZ SCORE</div>
                <div class="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  {{ score }}/{{ course.questions?.length || 0 }}
                </div>
              </div>
              <div class="w-px h-8 bg-gray-200 hidden lg:block"></div>
              <button
                @click="checkAnswers"
                :disabled="Object.keys(selectedAnswers).length !== course.questions?.length || showAnswers"
                class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
              >
                {{ showAnswers ? 'Answers Checked' : 'Check Answers' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Lesson Navigation Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="mr-2 w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Course Content
              </h3>
              
              <nav class="space-y-2">
                <button
                  v-for="(page, index) in course.course_pages"
                  :key="page.id"
                  @click="activeTab = index"
                  class="w-full text-left px-4 py-3 rounded-xl transition-all duration-200"
                  :class="activeTab === index 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-sm' 
                    : 'hover:bg-gray-50 border border-transparent'"
                >
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                      :class="activeTab === index 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600'">
                      {{ index + 1 }}
                    </div>
                    <div>
                      <div class="text-sm font-medium"
                        :class="activeTab === index ? 'text-indigo-700' : 'text-gray-900'">
                        {{ page.title }}
                      </div>
                      <div class="text-xs mt-1"
                        :class="activeTab === index ? 'text-indigo-500' : 'text-gray-500'">
                        {{ estimateReadingTime(page.content_md) }}
                      </div>
                    </div>
                    <div v-if="activeTab === index" class="ml-auto flex-shrink-0">
                      <div class="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                    </div>
                  </div>
                </button>
              </nav>
              
              <!-- Progress Indicator -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Progress</span>
                  <span class="text-sm font-semibold text-indigo-600">
                    {{ Math.round((activeTab + 1) / course.course_pages.length * 100) }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${(activeTab + 1) / course.course_pages.length * 100}%` }">
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  Lesson {{ activeTab + 1 }} of {{ course.course_pages.length }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <!-- Lesson Content -->
            <div class="p-8">
              <div v-if="course.course_pages && course.course_pages[activeTab]">
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold rounded-full">
                        Lesson {{ activeTab + 1 }}
                      </span>
                      <span class="text-sm text-gray-500">{{ estimateReadingTime(course.course_pages[activeTab].content_md) }}</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900">
                      {{ course.course_pages[activeTab].title }}
                    </h2>
                  </div>
                  <button
                    @click="toggleSpeech"
                    class="flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-200 border shadow-sm"
                    :class="isSpeaking
                      ? 'bg-gradient-to-r from-red-50 to-rose-50 text-rose-700 border-rose-200 hover:from-red-100 hover:to-rose-100 hover:border-rose-300'
                      : 'bg-gradient-to-r from-gray-50 to-white text-gray-700 border-gray-300 hover:from-gray-100 hover:to-gray-50 hover:border-gray-400'"
                    :disabled="!course.course_pages[activeTab]?.content_md"
                  >
                    <svg class="mr-2 w-5 h-5" :class="isSpeaking ? 'text-rose-600' : 'text-indigo-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="!isSpeaking" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path v-if="isSpeaking" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                    </svg>
                    {{ isSpeaking ? 'Stop Listening' : 'Listen to Lesson' }}
                  </button>
                </div>
                
                <!-- Markdown Content -->
                <div class="prose prose-lg max-w-none">
                  <div class="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 mb-8">
                    <div class="text-gray-800 leading-relaxed" v-html="renderMarkdown(course.course_pages[activeTab].content_md)"></div>
                  </div>
                </div>

                <!-- Navigation Between Lessons -->
                <div class="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                  <button
                    v-if="activeTab > 0"
                    @click="activeTab -= 1"
                    class="flex items-center px-5 py-3 bg-gradient-to-r from-gray-50 to-white text-gray-700 font-medium rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow"
                  >
                    <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Lesson
                  </button>
                  <div v-else></div>
                  
                  <button
                    v-if="activeTab < course.course_pages.length - 1"
                    @click="activeTab += 1"
                    class="flex items-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Next Lesson
                    <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quiz Section -->
            <div class="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-8 border-t border-gray-200">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                    <svg class="mr-3 w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Knowledge Check
                  </h3>
                  <p class="text-gray-600 mt-2">Test your understanding of the material</p>
                </div>
                <div v-if="showAnswers && score !== null" class="text-center">
                  <div class="text-xs font-medium text-gray-500 mb-1">YOUR SCORE</div>
                  <div class="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    {{ score }}/{{ course.questions?.length || 0 }}
                  </div>
                </div>
              </div>
              
              <div class="space-y-8">
                <div
                  v-for="(question, qIndex) in course.questions"
                  :key="question.id"
                  class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-200"
                >
                  <div class="flex items-start mb-6">
                    <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mr-4">
                      <span class="text-sm font-semibold text-indigo-700">{{ qIndex + 1 }}</span>
                    </div>
                    <p class="text-lg font-medium text-gray-900 flex-1">
                      {{ question.question_text }}
                    </p>
                  </div>
                  
                  <div class="space-y-3">
                    <div
                      v-for="option in question.question_options"
                      :key="option.id"
                      @click="selectAnswer(question.id, option.id)"
                      class="group cursor-pointer"
                      :class="{ 'pointer-events-none': showAnswers }"
                    >
                      <div class="flex items-start p-4 rounded-xl transition-all duration-200"
                        :class="{
                          'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200': showAnswers && option.is_correct,
                          'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200': showAnswers && selectedAnswers[question.id] === option.id && !option.is_correct,
                          'bg-gray-50 border border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50': !showAnswers,
                          'border-2 border-indigo-300 bg-indigo-50/50': !showAnswers && selectedAnswers[question.id] === option.id
                        }"
                      >
                        <div class="flex items-center h-6">
                          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                            :class="{
                              'border-green-500 bg-green-500': showAnswers && option.is_correct,
                              'border-red-500 bg-red-500': showAnswers && selectedAnswers[question.id] === option.id && !option.is_correct,
                              'border-gray-400 group-hover:border-indigo-500': !showAnswers && selectedAnswers[question.id] !== option.id,
                              'border-indigo-500 bg-indigo-500': !showAnswers && selectedAnswers[question.id] === option.id
                            }"
                          >
                            <svg v-if="selectedAnswers[question.id] === option.id || (showAnswers && option.is_correct)" 
                              class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <label class="ml-4 text-gray-800 cursor-pointer flex-1">
                          {{ option.option_text }}
                        </label>
                        <div v-if="showAnswers && option.is_correct" class="ml-4 flex-shrink-0">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Correct Answer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quiz Actions -->
              <div class="mt-10 pt-8 border-t border-gray-300/50">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="text-sm text-gray-600">
                    <span v-if="!showAnswers">
                      {{ Object.keys(selectedAnswers).length }} of {{ course.questions?.length || 0 }} questions answered
                    </span>
                    <span v-else class="flex items-center">
                      <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Quiz completed! Review your answers above.
                    </span>
                  </div>
                  
                  <div class="flex items-center space-x-4">
                    <button
                      v-if="showAnswers"
                      @click="resetQuiz"
                      class="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Retake Quiz
                    </button>
                    
                    <button
                      @click="checkAnswers"
                      :disabled="Object.keys(selectedAnswers).length !== course.questions?.length || showAnswers"
                      class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
                    >
                      {{ showAnswers ? '✓ Quiz Submitted' : 'Submit Answers' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';

definePageMeta({
  middleware: 'auth'
});

const route = useRoute();
const courseId = route.params.id as string;

const course = ref<any>(null);
const activeTab = ref(0);
const selectedAnswers = ref<Record<string, string>>({});
const showAnswers = ref(false);
const score = ref<number | null>(null);
const loading = ref(true);
const error = ref('');
const isSpeaking = ref(false);
let speechUtterance: SpeechSynthesisUtterance | null = null;

const renderMarkdown = (content: string) => {
  return marked(content || '');
};

const estimateReadingTime = (content: string) => {
  const words = content?.split(/\s+/).length || 0;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const selectAnswer = (questionId: string, optionId: string) => {
  if (showAnswers.value) return;
  selectedAnswers.value[questionId] = optionId;
};

const checkAnswers = () => {
  if (showAnswers.value) return;
  
  let correct = 0;
  course.value.questions?.forEach((question: any) => {
    const selectedOptionId = selectedAnswers.value[question.id];
    const selectedOption = question.question_options.find((opt: any) => opt.id === selectedOptionId);
    if (selectedOption?.is_correct) {
      correct++;
    }
  });
  
  score.value = correct;
  showAnswers.value = true;
  
  // Scroll to quiz section to show results
  setTimeout(() => {
    const quizSection = document.querySelector('.bg-gradient-to-br');
    quizSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
};

const resetQuiz = () => {
  selectedAnswers.value = {};
  showAnswers.value = false;
  score.value = null;
};

const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  isSpeaking.value = false;
  speechUtterance = null;
};

const toggleSpeech = () => {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech is not supported in your browser');
    return;
  }

  const currentPage = course.value?.course_pages?.[activeTab.value];
  if (!currentPage?.content_md) {
    alert('No content available to read');
    return;
  }

  // If already speaking, stop it
  if (isSpeaking.value) {
    stopSpeech();
    return;
  }

  // Stop any ongoing speech
  speechSynthesis.cancel();

  // Remove markdown for cleaner speech
  const text = currentPage.content_md
    .replace(/[#*`\[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) {
    alert('No readable text found in this lesson');
    return;
  }

  speechUtterance = new SpeechSynthesisUtterance(text);
  speechUtterance.rate = 0.9;
  speechUtterance.pitch = 1.0;
  speechUtterance.volume = 1.0;
  
  speechUtterance.onstart = () => {
    isSpeaking.value = true;
  };
  
  speechUtterance.onend = () => {
    isSpeaking.value = false;
    speechUtterance = null;
  };
  
  speechUtterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    isSpeaking.value = false;
    speechUtterance = null;
    alert('Error reading text. Please try again.');
  };

  speechSynthesis.speak(speechUtterance);
};

// Stop speech when changing tabs or leaving page
watch(activeTab, () => {
  stopSpeech();
});

onBeforeUnmount(() => {
  stopSpeech();
});

const fetchCourse = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const supabase = useSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Please log in to view this course');
    }
    
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.backendUrl}/courses/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Course not found');
      } else if (response.status === 403) {
        throw new Error('You do not have permission to view this course');
      } else {
        throw new Error(`Error loading course (${response.status})`);
      }
    }
    
    const data = await response.json();
    course.value = data;
  } catch (err: any) {
    error.value = err.message || 'Failed to load course. Please try again.';
    console.error('Error fetching course:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourse();
});
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-top: 1rem;
  margin-bottom: 1rem;
  line-height: 1.75;
}

.prose ul {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
}

.prose li::before {
  content: "•";
  color: #4f46e5;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'SF Mono', Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', monospace;
}

.prose pre {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #374151;
}

.prose pre code {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.9em;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1.5rem;
  font-style: italic;
  color: #6b7280;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #f9fafb, transparent);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
}

/* Smooth transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #c7d2fe, #a5b4fc);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #a5b4fc, #818cf8);
}
</style>