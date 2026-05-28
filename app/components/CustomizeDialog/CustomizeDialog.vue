<script setup lang="ts">
import { useColorsUtility } from '~/composables/useColorsUtility'
import { useLayout } from '~/composables/useLayout'
const { primaryColors } = useColorsUtility()
const customColor = ref('')
const { isRtl, isFluid, flatDesign, isDark, toggleTheme, setThemeColor, themeColor } = useLayout()
function setLight() {
  if (isDark.value) toggleTheme()
}

function setDark() {
  if (!isDark.value) toggleTheme()
}

const colors = primaryColors
const selectedColorIndex = ref(0)
function setColor(index: number) {
  selectedColorIndex.value = index
  setThemeColor(colors[index]!)
}

onMounted(() => {
  selectedColorIndex.value = colors.indexOf(themeColor.value)
})

const colorPickerRef = ref()
async function selectColor() {
  colorPickerRef.value.click()
}

let updateInterval : any = null;
watch(
  customColor,
  (newColor: any) => {
    selectedColorIndex.value = 100
    updateInterval = setTimeout(() => {
      setThemeColor(newColor)
      clearTimeout(updateInterval)
    }, 200)
  },
  // { lazy: true },
)
</script>

<template>
  <div class="section">
    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
      {{ $t('customize.theme') }}
    </NTag>

    <n-space justify="start" size="large">
      <NButton ghost class="p-7" :type="isDark === false ? 'primary' : 'default'" size="large" @click="setLight">
        <template #icon>
          <Icon name="fluent:weather-sunny-48-regular" />
        </template>
      </NButton>

      <NButton ghost class="w-full p-7" :type="isDark ? 'primary' : 'default'" size="large" @click="setDark">
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
      <NButton v-for="(color, index) of colors" :key="index" :color="color" size="small" circle class="mx-1 my-1"
        @click="setColor(index)">
        <template #icon>
          <Icon name="fluent:checkmark-48-filled" v-if="selectedColorIndex === index" />
          <span v-else />
        </template>
      </NButton>
      <label for="colorPicker">
        <NButton class="color-picker mx-1" size="small" circle color="#FFF" @click="selectColor()">
          <template #icon>
            <Icon name="fluent:checkmark-48-filled" v-if="selectedColorIndex === 100" />
            <span v-else />
          </template>
        </NButton>
      </label>
      <input type="color" ref="colorPickerRef" class="invisible" style="width:15px"
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
