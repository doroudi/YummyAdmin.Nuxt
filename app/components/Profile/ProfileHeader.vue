<script setup lang="ts">
const { profile } = useProfile()
</script>

<template>
  <div class="profile-header flex flex-col items-center pb-8">
    <NAvatar class="my-3" round :size="75" :src="profile?.avatar" alt="avatar" />
    <div class="profile-section__info">
      <h4 class="text-center font-bold text-5">
        {{ `${profile?.firstName} ${profile?.lastName}` }}
      </h4>
      <p class="font-light text-center">
        {{ profile?.role }} | {{ profile?.location }}
      </p>
    </div>
  </div>
</template>
