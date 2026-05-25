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
        class="w-[200px] transition-all ease-in duration-200" :class="{ 'md:w-[250px]': focused }"
        @input="searchInListDebounced" @focus="focused = true" @blur="focused = false">
        <template #prefix>
            <Icon name="fluent:search-24-regular" />
        </template>
    </n-input>
</template>