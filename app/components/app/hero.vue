<script lang="ts" setup>
const { count = 10 } = defineProps<{
  search: () => void;
  isLoading: boolean;
  count?: number;
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
      container: 'animate-fade-in',
    }"
  >
    <template #headline>
      <div class="flex justify-center items-center gap-4 w-full animate-fade-in-delay-1">
        <UBadge
          color="neutral"
          size="sm"
          variant="solid"
          class="flex items-center bg-muted dark:bg-black drop-shadow-sm backdrop-blur-3xl mb-1 px-2 border-[0.2px] border-muted rounded-full font-medium text-sm"
        >
          <UChip
            standalone
            inset
            color="success"
            size="xl"
            class="mr-1 border-0 outline-0"
          />

          <span class="font-bold text-highlighted">{{ formatNumber(count) }}</span>

          <span class="text-highlighted">portfolios generated</span>
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
          icon="i-simple-icons-github"
          placeholder="Enter GitHub username..."
          size="xl"
          class="w-full"
          :ui="{
            base: 'rounded-full py-5 pl-12 pr-32 w-full',
            leadingIcon: 'size-7',
          }"
        >
          <template #trailing>
            <UButton
              class="rounded-full cursor-pointer"
              size="xl"
              label="Generate"
              type="submit"
              :loading="isLoading"
            />
          </template>
        </UInput>
      </UFormField>
    </UForm>
  </UPageHero>
</template>

<style scoped>

</style>
