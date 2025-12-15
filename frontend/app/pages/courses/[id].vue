<template>
  <div>
    <!-- Back Button -->
    <div class="mb-6">
      <button
        @click="$router.back()"
        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <svg class="mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Courses
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading course...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading course</h3>
          <p class="text-sm text-red-700 mt-2">{{ error }}</p>
          <div class="mt-4">
            <button
              @click="$router.push('/courses')"
              class="text-sm font-medium text-red-800 hover:text-red-900"
            >
              Return to courses
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="bg-white shadow overflow-hidden rounded-lg">
      <!-- Course Header -->
      <div class="px-6 py-5 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ course.title }}</h1>
            <div class="mt-2 flex items-center space-x-4">
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ course.subject }}
              </span>
              <span class="text-sm text-gray-500">{{ course.course_pages?.length || 0 }} lessons</span>
            </div>
          </div>
          <span
            class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
            :class="course.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
          >
            {{ course.is_published ? 'Published' : 'Draft' }}
          </span>
        </div>
        <p class="mt-4 text-gray-700">{{ course.description }}</p>
      </div>

      <!-- Content Tabs -->
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            v-for="(page, index) in course.course_pages"
            :key="page.id"
            @click="activeTab = index"
            class="px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap"
            :class="activeTab === index ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            Lesson {{ index + 1 }}: {{ page.title }}
          </button>
        </nav>
      </div>

      <!-- Lesson Content -->
      <div class="px-6 py-8">
        <div v-if="course.course_pages && course.course_pages[activeTab]" class="prose max-w-none">
          <h2 class="text-xl font-bold text-gray-900 mb-4">
            {{ course.course_pages[activeTab].title }}
          </h2>
          <div class="text-gray-700 leading-relaxed" v-html="renderMarkdown(course.course_pages[activeTab].content_md)"></div>
          
          <!-- TTS Button -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <button
              @click="speakCurrentPage"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Listen to this lesson
            </button>
          </div>
        </div>
      </div>

      <!-- Quiz Section -->
      <div class="px-6 py-8 bg-gray-50 border-t border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-6">Quiz</h3>
        
        <div v-for="(question, qIndex) in course.questions" :key="question.id" class="mb-8">
          <p class="text-base font-medium text-gray-900 mb-4">
            {{ qIndex + 1 }}. {{ question.question_text }}
          </p>
          <div class="space-y-3">
            <div
              v-for="option in question.question_options"
              :key="option.id"
              class="flex items-start p-4 border rounded-lg"
              :class="{
                'bg-green-50 border-green-200': showAnswers && option.is_correct,
                'bg-red-50 border-red-200': showAnswers && selectedAnswers[question.id] === option.id && !option.is_correct,
                'hover:bg-gray-50': !showAnswers,
                'border-gray-300': !showAnswers
              }"
              @click="selectAnswer(question.id, option.id)"
            >
              <div class="flex items-center h-5">
                <input
                  type="radio"
                  :name="'question-' + question.id"
                  :value="option.id"
                  v-model="selectedAnswers[question.id]"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  :disabled="showAnswers"
                />
              </div>
              <label class="ml-3 text-sm text-gray-700 cursor-pointer">
                {{ option.option_text }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            @click="checkAnswers"
            :disabled="Object.keys(selectedAnswers).length !== course.questions?.length"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answers
          </button>
          <div v-if="score !== null" class="text-lg font-medium text-gray-900">
            Score: <span class="text-indigo-600">{{ score }}</span>/{{ course.questions?.length || 0 }}
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

const renderMarkdown = (content: string) => {
  return marked(content || '');
};

const selectAnswer = (questionId: string, optionId: string) => {
  selectedAnswers.value[questionId] = optionId;
  showAnswers.value = false;
};

const checkAnswers = () => {
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
};

const speakCurrentPage = () => {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech is not supported in your browser');
    return;
  }

  const currentPage = course.value?.course_pages?.[activeTab.value];
  if (!currentPage?.content_md) {
    return;
  }

  // Stop any ongoing speech
  speechSynthesis.cancel();

      // Remove markdown for cleaner speech
  const text = currentPage.content_md
    .replace(/[#*`\[\]()]/g, '') // Remove markdown syntax
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (!text) {
    return;
  }

      const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
      utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    alert('Error reading text. Please try again.');
  };

      speechSynthesis.speak(utterance);
};

const fetchCourse = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Get session for auth token
    const supabase = useSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // Call backend API
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.backendUrl}/courses/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    course.value = data;
  } catch (err: any) {
    error.value = err.message || 'Failed to load course';
    console.error('Error fetching course:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourse();
});
</script>