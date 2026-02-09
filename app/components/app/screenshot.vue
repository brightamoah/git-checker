<script setup lang="ts">
import { useElementBounding, useWindowScroll } from "@vueuse/core";

const sectionEl = useTemplateRef("sectionEl");

const { y: scrollY } = useWindowScroll();
const { top: sectionTop } = useElementBounding(sectionEl);

const rotateX = computed(() => {
  if (!sectionEl || typeof window === "undefined") return 20;

  const viewportHeight = window.innerHeight;

  const startPoint = viewportHeight;
  const endPoint = sectionTop.value * 0.3;

  const progress = Math.min(Math.max((startPoint - sectionTop.value) / (startPoint - endPoint), 0), 1);

  return 20 * (1 - progress);
});

function handleScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <ClientOnly>
    <section
      ref="sectionEl"
      class="z-10 relative -mt-10 px-4 sm:px-6 pb-20"
    >
      <div
        class="mx-auto max-w-6xl"
        style="perspective: 1200px;"
      >
        <div
          class="relative transition-transform duration-75 ease-out"
          :style="{
            transform: `rotateX(${rotateX}deg)`,
            transformOrigin: 'center bottom',
            willChange: 'transform',
          }"
        >
          <div class="-bottom-6 absolute inset-x-16 bg-primary/40 opacity-70 blur-3xl h-20" />

          <div class="relative bg-neutral-50 shadow-2xl border border-muted rounded-2xl md:rounded-3xl overflow-hidden">
            <UColorModeImage
              light="/images/screenshot-light.png"
              dark="/images/screenshot-dark.png"
              alt="Screenshot of the generated GitHub portfolio"
              class="block w-full h-auto"
            />

            <div class="bottom-0 absolute inset-x-0 bg-linear-to-t from-bg-primary/50 to-transparent h-20" />
          </div>
        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<style scoped>

</style>
