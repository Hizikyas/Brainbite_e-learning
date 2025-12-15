<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 overflow-hidden relative">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Floating Blobs -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <!-- Floating Orbs -->
      <div class="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full animate-float shadow-lg"></div>
      <div class="absolute bottom-32 right-20 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-float animation-delay-1500 shadow-lg"></div>
      <div class="absolute top-2/3 left-1/3 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-float animation-delay-3000 shadow-lg"></div>
    </div>

    <div class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div class="w-full max-w-lg">
        <!-- Back to Home Link -->
        <div class="absolute top-8 left-8">
          <NuxtLink
            to="/"
            class="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-300 group"
          >
            <svg class="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </NuxtLink>
        </div>

        <!-- Login Card -->
        <div class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden animate-fade-in">
          <!-- Card Header -->
          <div class="px-8 pt-10 pb-8">
            <!-- Logo & Brand -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-xl">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p class="mt-3 text-gray-600">
                {{ showSignUp ? 'Create your account to start learning' : 'Sign in to continue your learning journey' }}
              </p>
            </div>

            <!-- Toggle Switch -->
            <div class="flex items-center justify-center mb-8">
              <div class="relative bg-gray-100 rounded-2xl p-1 flex">
                <button
                  @click="showSignUp = false"
                  class="relative px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 z-10"
                  :class="!showSignUp ? 'text-white' : 'text-gray-700 hover:text-gray-900'"
                >
                  Sign In
                </button>
                <button
                  @click="showSignUp = true"
                  class="relative px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 z-10"
                  :class="showSignUp ? 'text-white' : 'text-gray-700 hover:text-gray-900'"
                >
                  Sign Up
                </button>
                <!-- Slider -->
                <div
                  class="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl transition-all duration-300"
                  :class="showSignUp ? 'translate-x-full' : 'translate-x-0'"
                ></div>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Email Input -->
              <div class="group">
                <label for="email" class="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-indigo-500 focus:border-2 transition-all duration-300 text-lg shadow-sm hover:border-indigo-300"
                    placeholder="you@example.com"
                    autocomplete="email"
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div class="group">
                <label for="password" class="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="block w-full pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-indigo-500 focus:border-2 transition-all duration-300 text-lg shadow-sm hover:border-indigo-300"
                    placeholder="••••••••"
                    :autocomplete="showSignUp ? 'new-password' : 'current-password'"
                    @input="validatePassword"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      @click="togglePasswordVisibility"
                      class="text-gray-400 hover:text-indigo-500 focus:outline-none transition-colors duration-300"
                    >
                      <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    {{ showSignUp ? 'Minimum 8 characters' : '' }}
                  </div>
                  <div v-if="showSignUp && form.password.length > 0" class="flex items-center">
                    <div class="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full transition-all duration-300"
                        :class="{
                          'w-full bg-green-500': isPasswordValid,
                          'w-2/3 bg-yellow-500': form.password.length >= 8 && !isPasswordValid,
                          'w-1/3 bg-red-500': form.password.length < 8
                        }"
                      ></div>
                    </div>
                    <span class="ml-2 text-xs font-medium" :class="{
                      'text-red-600': form.password.length < 8,
                      'text-yellow-600': form.password.length >= 8 && !isPasswordValid,
                      'text-green-600': isPasswordValid
                    }">
                      {{ form.password.length < 8 ? 'Too short' : (isPasswordValid ? 'Strong' : 'Good') }}
                    </span>
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
                    <h3 class="text-sm font-semibold text-red-800 mb-1">Authentication Error</h3>
                    <p class="text-red-700 text-sm">{{ error }}</p>
                  </div>
                </div>
              </div>

              <!-- Success Message (for sign up) -->
              <div v-if="successMessage" class="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 border border-green-200 animate-fade-in">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-sm font-semibold text-green-800 mb-1">Success!</h3>
                    <p class="text-green-700 text-sm">{{ successMessage }}</p>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="group relative w-full flex justify-center items-center py-5 px-6 text-lg font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                :class="loading 
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500' 
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700'"
              >
                <!-- Shine Effect -->
                <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                
                <!-- Button Content -->
                <div class="relative flex items-center">
                  <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="mr-3 h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="showSignUp" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span class="relative">
                    {{ loading ? 'Processing...' : showSignUp ? 'Create Account' : 'Sign In' }}
                  </span>
                </div>
              </button>

              <!-- Terms -->
              <div v-if="showSignUp" class="text-center">
                <p class="text-xs text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Terms</a> and
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </p>
              </div>
            </form>

          </div>

          <!-- Footer -->
          <div class="bg-gradient-to-r from-gray-50 to-indigo-50/30 px-8 py-6 border-t border-gray-200">
            <p class="text-center text-sm text-gray-600">
              {{ showSignUp ? 'Already have an account?' : "Don't have an account?" }}
              <button
                @click="showSignUp = !showSignUp"
                class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
              >
                {{ showSignUp ? 'Sign in' : 'Sign up' }}
              </button>
            </p>
          </div>
        </div>
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
const successMessage = ref('');
const showPassword = ref(false);
const isPasswordValid = ref(false);

const validatePassword = () => {
  const password = form.value.password;
  
  // Accept any password that's 8 characters or more
  if (password.length >= 8) {
    isPasswordValid.value = true;
  } else {
    isPasswordValid.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  // Only validate password length for sign up
  if (showSignUp.value && form.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters long.';
    return;
  }

  loading.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    if (showSignUp.value) {
      // Sign up - accept any password 8 characters or longer
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.value.email,
        password: form.value.password,
        options: {
          emailRedirectTo: `${window.location.origin}/courses`,
          data: {
            email: form.value.email
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          throw new Error('This email is already registered. Please sign in instead.');
        }
        if (signUpError.message.includes('Password should be at least')) {
          // Override the default password error message
          throw new Error('Password must be at least 8 characters long.');
        }
        throw signUpError;
      }
      
      if (data.user && !data.session) {
        successMessage.value = 'Account created! Please check your email to confirm your account before signing in.';
        // Clear form
        form.value = { email: '', password: '' };
        // Switch to sign in after successful sign up
        setTimeout(() => {
          showSignUp.value = false;
          successMessage.value = '';
        }, 5000);
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
          throw new Error('Please check your email and confirm your account before signing in.');
        }
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw signInError;
      }
      
      // Redirect to courses
      if (data.session) {
        router.push('/courses');
      }
    }
  } catch (err: any) {
    error.value = err.message || 'Authentication failed. Please try again.';
    console.error('Auth error:', err);
  } finally {
    loading.value = false;
  }
};

// Reset validation when switching between sign in/up
watch(showSignUp, () => {
  error.value = '';
  successMessage.value = '';
});

// Redirect if already logged in
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
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
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
  animation: fade-in 0.5s ease-out;
}

.animate-shine {
  animation: shine 2s infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              transform 0.3s ease,
              box-shadow 0.3s ease,
              opacity 0.3s ease;
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

/* Password strength colors */
input:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
</style>