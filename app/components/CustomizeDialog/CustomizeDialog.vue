<script setup>
import { useColorsUtility } from '~/composables/useColorsUtility'
const { primaryColors  } = useColorsUtility()
const customColor = ref('')
const { isRtl, isFluid, flatDesign } = useLayout()
function setLight() {
  if (isDark.value) layout.toggleTheme()
}

function setDark() {
  if (!layout.isDark.value) layout.toggleTheme()
}

const colors = primaryColors
const selectedColorIndex = ref(0)
function setColor(index) {
  selectedColorIndex.value = index
  layout.setThemeColor(colors[index])
}

onMounted(() => {
  selectedColorIndex.value = colors.indexOf(layout.themeColor)
})

const colorPickerRef = ref()
async function selectColor() {
  colorPickerRef.value.click()
}

let updateInterval = ref()
watch(
  customColor,
  (newColor) => {
    selectedColorIndex.value = 100
    updateInterval = setTimeout(() => {
      layout.setThemeColor(newColor)
      clearTimeout(updateInterval)
    }, 200)
  },
  { lazy: true },
)
</script>

<template>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ $t('customize.theme') }}
    </NTag>

    <n-space justify="start" size="large">
      <NButton ghost class="p-7" :type="layout.isDark === false ? 'primary' : 'default'" size="large" @click="setLight">
        <template #icon>
          <Icon name="fluent:weather-sunny-48-regular" />
        </template>
      </NButton>

      <NButton ghost class="w-full p-7" :type="layout.isDark ? 'primary' : 'default'" size="large" @click="setDark">
        <template #icon>
          <Icon name="fluent:weather-moon-48-regular" />
        </template>
      </NButton>
    </n-space>
  </div>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ $t('customize.color') }}
    </NTag>

    <div>
      <NButton v-for="(color, index) of colors" :key="index" :color="color" size="medium" circle class="mx-1"
        @click="setColor(index)">
        <template #icon>
          <Icon name="fluent:checkmark-48-filled" v-if="selectedColorIndex === index" />
          <span v-else />
        </template>
      </NButton>
      <label for="colorPicker">
        <NButton class="color-picker mx-1" size="medium" circle color="#FFF" @click="selectColor()">
          <template #icon>
            <Icon name="fluent:checkmark-48-filled" v-if="selectedColorIndex === 100" />
            <span v-else />
          </template>
        </NButton>
      </label>
      <input type="color" ref="colorPickerRef" v-model="customColor" class="invisible" style="width:15px"
        value="#1dbbce" id="colorPicker">
    </div>
  </div>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ $t('customize.layout') }}
    </NTag>

    <div class="py-3">
      <n-switch v-model:value="isFluid" />
      {{ $t('customize.fluid') }}
    </div>
    <div class="py-3">
      <n-switch v-model:value="isRtl" />
      {{ $t('customize.rtl') }}

    </div>
    <div class="py-3">
      <n-switch v-model:value="flatDesign" />
      {{ $t('customize.flatDesign') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  padding: .8rem 0;

  .section-title {
    font-weight: 500;
    padding: 0.2rem 0;
    border-bottom: solid 1px #CCC;
    margin-bottom: 1rem;
  }
}

.color-picker {
  background: conic-gradient(from 90deg,
      violet,
      indigo,
      blue,
      green,
      yellow,
      orange,
      red,
      violet);
}
</style>
