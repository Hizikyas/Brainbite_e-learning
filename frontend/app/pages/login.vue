<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <AppLogo class="justify-center" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          {{ showSignUp ? 'Create your account' : 'Sign in to your account' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400" @click.prevent="showSignUp = !showSignUp">
            {{ showSignUp ? 'sign in' : 'create a new account' }}
          </a>
        </p>
      </div>
      
      <div class="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-100 dark:border-gray-700">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>{{ showSignUp ? 'Sign up' : 'Sign in' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser();

const form = ref({
  email: '',
  password: ''
});
const showSignUp = ref(false);
const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    if (showSignUp.value) {
      // Sign up
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.value.email,
        password: form.value.password,
        options: {
          emailRedirectTo: `${window.location.origin}/courses`
        }
      });

      if (signUpError) throw signUpError;
      
      if (data.user && !data.session) {
        error.value = 'Please check your email to confirm your account before signing in.';
      showSignUp.value = false;
        return;
      }
      
      // If session exists, redirect
      if (data.session) {
        router.push('/courses');
      }
    } else {
      // Sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: form.value.email,
        password: form.value.password,
      });

      if (signInError) {
        if (signInError.message.includes('email_not_confirmed') || signInError.message.includes('Email not confirmed')) {
          error.value = 'Please check your email and confirm your account before signing in.';
        } else {
          throw signInError;
        }
        return;
      }
      
      // Redirect to courses
      if (data.session) {
      router.push('/courses');
      }
    }
  } catch (err: any) {
    if (err.message && !err.message.includes('email_not_confirmed')) {
    error.value = err.message || 'Authentication failed';
    }
  } finally {
    loading.value = false;
  }
};

// Redirect if already logged in
onMounted(() => {
  if (user.value) {
    router.push('/courses');
  }
});
</script>