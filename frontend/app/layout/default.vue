<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
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
              <span class="text-sm text-gray-700">Hi, {{ user.email?.split('@')[0] }}</span>
            </div>
            <button
              v-if="user"
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
            <NuxtLink
              v-else
              to="/login"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile menu -->
    <div class="md:hidden bg-white border-t">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <TemplateMenu />
      </div>
    </div>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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