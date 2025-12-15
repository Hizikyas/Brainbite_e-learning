<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const router = useRouter();

onMounted(() => {
  router.replace('/courses/generate-course');
});
</script>
