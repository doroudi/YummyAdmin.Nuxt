<script setup lang="ts">
interface Props {
  debounceTime?: number
}
const props = withDefaults(defineProps<Props>(), { debounceTime: 500 })
const model = defineModel()
const emits = defineEmits(['search'])

const focused = ref(false)
let searchTimerId: any = null

function searchInListDebounced(value: string) {
  model.value = value
  clearTimeout(searchTimerId)
  searchTimerId = setTimeout(() => {
    emits('search')
  }, props.debounceTime)
}
</script>

<template>
    <n-input v-model="model" :placeholder="$t('common.search')" autosize clearable
        class="w-100 transition-property-all transition-ease-in transition-duration-200" :class="{ 'md:w-120': focused }"
        @input="searchInListDebounced" @focus="focused = true" @blur="focused = false">
        <template #prefix>
            <Icon name="fluent:search-24-regular" />
        </template>
    </n-input>
</template>