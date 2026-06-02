<script setup lang="ts">
import { LazyEnglandIcon, LazyChineseIcon, LazyPersianIcon } from '#components';

// import ChineseIcon from '../CustomIcons/ChineseIcon.vue'
// import EnglandIcon from '../CustomIcons/EnglandIcon.vue'
// import PersianIcon from '../CustomIcons/PersianIcon.vue'

defineProps<{ showTitle?: boolean }>()

const { activeLanguage, changeLanguage, resetWelcomeState } = useLayout()
const { availableLocales } = useI18n()
const language = ref(activeLanguage)
const languages = availableLocales.sort(sortLangs).map((x) => {
  return {
    label: () => renderLabel($t(`languages.${x}`), x),
    value: x,
  }
})

function update(lang: string) {
  changeLanguage(lang)
  resetWelcomeState()
  setTimeout(() => window.location.reload(), 1500)
}

function renderLabel(label: string, language: string) {
  return h('div', { class: 'flex items-center gap-2' }, [
    h(getLanguageIcon(language)),
    h('span', null, { default: () => label }),
  ])
}

function getLanguageIcon(language: string) {
  switch (language) {
    case 'en':
      return LazyEnglandIcon
    case 'fa':
      return LazyPersianIcon
    case 'zh':
      return LazyChineseIcon
    default:
      return LazyEnglandIcon
  }
}

function sortLangs(a: string, b: string): number {
  const ordered = ['en', 'fa', 'zh']
  return ordered.indexOf(a) - ordered.indexOf(b)
}
</script>

<template>
  <div v-bind="$attrs">
    <n-tooltip placement="top" trigger="hover">
      <template #trigger>
        <n-popselect v-model:value="language" trigger="click" :options="languages" @update-value="update">
          <n-button quaternary :circle="!showTitle">
            <template #icon>
              <Icon name="fluent:globe-20-regular" size="1.4rem" />
            </template>
            <span v-if="showTitle">{{ $t(`languages.${activeLanguage}`) }}</span>
          </n-button>
        </n-popselect>
      </template>
      <span>{{ $t('button.toggle_langs') }}</span>
    </n-tooltip>
  </div>
</template>

<style lang="scss" scoped></style>
