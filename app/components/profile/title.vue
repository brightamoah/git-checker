<script lang="ts" setup>
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <UIcon
      :name="icon"
      class="size-6 text-muted"
    />

    <h3 class="font-semibold text-highlighted text-xl">
      {{ title }}
    </h3>
  </div>
</template>

<style scoped>

</style>
