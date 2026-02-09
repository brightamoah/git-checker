<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui";

defineProps<{
  sortOptions: SelectMenuItem[];
}>();

const modelValue = defineModel<"stars" | "pinned">({ required: true });
</script>

<template>
  <USelect
    v-model="modelValue"
    :items="sortOptions"
    placeholder="Select ..."
    value-key="value"
    class="cursor-pointer"
    arrow
    :ui="{
      item: 'cursor-pointer',
      base: 'focus:ring-muted',
    }"
  />
</template>

<style scoped>

</style>
