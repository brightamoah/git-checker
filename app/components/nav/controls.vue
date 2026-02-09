<script setup lang="ts">
const { template, updateTemplate } = useNavigationState();

const templateOptions = ref([
  { value: "github", label: "GitHub Style" },
  { value: "bento", label: "Bento Grid" },
  { value: "minimal", label: "Minimal" },
]);

const selected = computed({
  get: () => template.value,
  set: val => updateTemplate(val),
});
</script>

<template>
  <USelect
    v-model="selected"
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
