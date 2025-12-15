<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Generate Course with AI</h1>
      <p class="mt-2 text-sm text-gray-600">
        Let AI create a personalized course for you
      </p>
    </div>

    <!-- Generate Form -->
    <div class="bg-white shadow-xl rounded-xl border border-gray-100">
      <div class="px-6 py-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Subject -->
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700">
              Course Subject *
            </label>
            <div class="mt-1">
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900"
                placeholder="e.g., Introduction to JavaScript, Photosynthesis, World War II"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">
              What topic would you like to learn about?
            </p>
          </div>

          <!-- Optional Fields -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label for="level" class="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                id="level"
                v-model="form.level"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Any level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label for="age_range" class="block text-sm font-medium text-gray-700">
                Age Range
              </label>
              <select
                id="age_range"
                v-model="form.age_range"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Any age</option>
                <option value="6-12">6-12 years</option>
                <option value="13-17">13-17 years</option>
                <option value="18+">18+ years</option>
              </select>
            </div>

            <div>
              <label for="language" class="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                v-model="form.language"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-6 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500">
                AI will generate 4 lessons and 2 quiz questions
              </div>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-else>Generate Course</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Generating Course</h3>
        <p class="mt-2 text-sm text-gray-500">
          AI is creating your course content. This may take a moment...
        </p>
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
    error.value = 'Please enter a subject';
    return;
  }

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
      throw new Error(errorData.message || 'Failed to generate course');
    }
    
    const data = await response.json();
    
    // Redirect to the new course
    router.push(`/courses/${data.course_id}`);
    
  } catch (err: any) {
    error.value = err.message || 'Failed to generate course';
    console.error('Error generating course:', err);
  } finally {
    loading.value = false;
  }
};
</script>