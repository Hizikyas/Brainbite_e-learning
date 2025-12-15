<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <AppLogo />
            <div class="hidden md:block ml-6">
              <TemplateMenu />
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div v-if="user" class="hidden md:block">
              <span class="text-sm font-medium text-gray-700">Hi, {{ user.email?.split('@')[0] }}</span>
            </div>
            <button
              v-if="user"
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform transition-all hover:scale-105"
            >
              Logout
            </button>
            <NuxtLink
              v-else
              to="/login"
              class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform transition-all hover:scale-105"
            >
              Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile menu -->
    <div class="md:hidden bg-white/80 backdrop-blur-md border-t border-gray-100">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <TemplateMenu />
      </div>
    </div>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push('/login');
};
</script>