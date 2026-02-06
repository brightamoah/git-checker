<script setup lang="ts">
const template = defineModel<TemplateType>("template", { required: false, default: "github" });

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
    class="mx-auto w-full max-w-xs"
  />
</template>

<style scoped>

</style>
