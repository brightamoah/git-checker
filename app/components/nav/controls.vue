<script setup lang="ts">
const { template } = useNavigationState();

const templateOptions = ref([
  { value: "github", label: "GitHub Style" },
  { value: "bento", label: "Bento Grid" },
  { value: "minimal", label: "Minimal" },
]);
</script>

<template>
  <USelect
    v-model="template"
    :items="templateOptions"
    class="mx-auto w-48 cursor-pointer"
    size="lg"
    :ui="{
      item: 'cursor-pointer',
      base: 'focus:ring-muted',
    }"
  />
</template>

<style scoped>

</style>
