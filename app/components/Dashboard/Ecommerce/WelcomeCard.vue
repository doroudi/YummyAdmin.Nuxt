<script setup lang="ts">
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const total = randomInRange(2000, 4000)
</script>

<template>
  <div class="h-auto flex flex-col justify-end relative">
    <div class="p-2">
      <Card>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row md:pt-4">
            <span class="text-xlg me-2">👋 </span>
            <div>
              <h3 class="text-lg font-bold">
                {{ $t('dashboard.welcome.title') }}
              </h3>

              <p class="description">
                {{ $t('dashboard.welcome.greeting_message') }}
              </p>
              <p class="description pt-7">
                {{ $t('dashboard.welcome.congratulations1') }}
                <b class="inline-block min-w-12 px-1 text-size-lg">
                  <n-number-animation show-separator :from="0" :to="total" /></b>
                {{ $t('dashboard.welcome.congratulations2') }}
              </p>
            </div>
          </div>
          <img src="@/assets/images/3d-female-character-waving.png" width="140px"
            class="hidden md:block -mt-24 -mb-4 me-6 cursor-pointer">
        </div>
      </card>
    </div>
  </div>
</template>

<style scoped>
.description {
  font-size: .99rem;
}
</style>
