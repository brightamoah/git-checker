<script lang="ts" setup>
defineProps<{
  search: () => void;
  isLoading: boolean;
}>();
const state = defineModel<GetProfileSchema>("state", { required: true });
</script>

<template>
  <UPageHero
    title="Transform Your GitHub Profile into a Stunning Portfolio"
    description="Check the GitHub profile of any user and get insights into their repositories, stars, and more."
    :ui="{
      title: 'font-newsreader font-semibold w-full md:max-w-5xl mx-auto',
      description: 'animate-fade-in-up animation-delay-600 mt-2.5',
    }"
  >
    <template #headline>
      <div class="flex justify-center items-center gap-4 w-full">
        <UBadge
          color="neutral"

          size="sm"
          variant="solid"
          class="flex items-center bg-inverted mb-1 px-2 rounded-full font-medium text-sm"
        >
          <UChip
            standalone
            inset
            color="success"
            size="xl"
            class="mr-1 border-0 outline-0"
          />

          <span class="font-bold">{{ formatNumber(4600) }}</span>

          <span class="text-inverted/75">portfolios generated</span>
        </UBadge>
      </div>
    </template>

    <UForm
      class="flex flex-col justify-center items-center -mt-6 w-full"
      :schema="getProfileSchema"
      :state
      @submit="search"
    >
      <UFormField
        size="lg"
        name="username"
        class="relative w-full max-w-lg"
        :ui="{
          error: 'text-center',
        }"
      >
        <UInput
          v-model="state.username"
          icon="i-lucide-github"
          placeholder="Enter GitHub username..."
          size="xl"
          class="w-full"
          :ui="{
            base: 'rounded-full py-5 pl-12 pr-32 w-full',
          }"
        >
          <template #trailing>
            <UButton
              class="rounded-full cursor-pointer"
              size="xl"
              label="Generate"
              type="submit"
            />
          </template>
        </UInput>
      </UFormField>
    </UForm>
  </UPageHero>
</template>

<style scoped>

</style>
