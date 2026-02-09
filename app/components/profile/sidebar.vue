<script lang="ts" setup>
interface Props {
  profile: GitHubProfile;
  views?: number;
}

const { profile, views = 0 } = defineProps<Props>();

const tags = computed(() => generateProfileTags(profile));
const joinDate = computed(() => formatJoinDate(profile.user.createdAt));

const metaInfo = computed(() => {
  const info = [];

  if (profile.user.company) info.push({ icon: "i-lucide-building-2", text: profile.user.company, type: "text" as const });
  if (profile.user.location) info.push({ icon: "i-lucide-map-pin", text: profile.user.location, type: "text" as const });
  if (profile.user.websiteUrl) {
    info.push({ icon: "i-lucide-link", text: profile.user.websiteUrl.replace(/^https?:\/\//, ""), type: "link" as const, url: profile.user.websiteUrl.startsWith("http")
      ? profile.user.websiteUrl
      : `https://${profile.user.websiteUrl}` });
  }
  if (profile.user.twitterUsername) info.push({ icon: "i-simple-icons-x", text: `@${profile.user.twitterUsername}`, type: "link" as const, url: `https://twitter.com/${profile.user.twitterUsername}` });
  if (joinDate.value) info.push({ icon: "i-lucide-calendar", text: joinDate.value, type: "text" as const });

  return info;
});
</script>

<template>
  <aside class="flex flex-col items-center lg:items-start gap-4 lg:text-left text-center">
    <div class="relative">
      <NuxtImg
        :src="profile.user.avatarUrl"
        :alt="profile.user.login"
        class="bg-primary-50 border-4 border-default rounded-full w-74 h-74"
      />
    </div>

    <div class="space-y-1">
      <h1
        v-if="profile.user.name"
        class="font-semibold text-2xl"
      >
        {{ profile.user.name }}
      </h1>

      <p class="text-muted text-xl">
        @{{ profile.user.login }}
      </p>
    </div>

    <p
      v-if="profile.user.bio"
      class="text-muted text-base"
    >
      {{ profile.user.bio }}
    </p>

    <UButton
      size="xl"
      label="Follow on Github"
      variant="subtle"
      color="neutral"
      icon="i-simple-icons-github"
      class="flex justify-center items-center rounded-xl w-full"
      :to="`https://github.com/${profile.user.login}`"
    />

    <div
      v-if="tags.length > 0"
      class="flex flex-wrap justify-center lg:justify-start gap-2"
    >
      <span
        v-for="tag in tags"
        :key="tag"
        class="shrink-0"
      >
        <UBadge
          variant="subtle"
          color="neutral"
          size="lg"
          class="rounded-full"
        >{{ tag }}
        </UBadge>
      </span>
    </div>

    <div class="space-y-2 text-muted text-base">
      <div
        v-for="item in metaInfo"
        :key="item.text"
        class="flex justify-center lg:justify-start items-center gap-2"
      >
        <UIcon
          :name="item.icon"
          class="size-5"
        />

        <span v-if="item.type === 'text'">{{ item.text }}
        </span>

        <ULink
          v-if="item.type === 'link'"
          :to="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item.text }}
        </ULink>
      </div>
    </div>

    <div class="flex justify-center lg:justify-start items-center gap-4 text-base">
      <ULink
        :to="`https://github.com/${profile.user.login}?tab=followers`"
        class="flex items-center gap-2 hover:text-highlighted"
      >
        <UIcon
          name="i-lucide-users"
          class="size-5"
        />

        <span><span class="font-semibold text-highlighted">{{ profile.stats.followers }}</span> followers</span>
      </ULink>

      <span class="text-highlighted">·</span>

      <ULink
        :to="`https://github.com/${profile.user.login}?tab=following`"
        class="flex items-center gap-2 hover:text-highlighted"
      >
        <span><span class="font-semibold text-highlighted">{{ profile.stats.following }}</span> following</span>
      </ULink>
    </div>

    <div class="flex justify-center lg:justify-start items-center gap-2 text-base">
      <UIcon
        name="i-lucide-eye"
        class="size-5"
      />

      <span><span class="font-semibold text-highlighted">{{ views.toLocaleString() }}</span> views</span>
    </div>
  </aside>
</template>

<style scoped>

</style>
