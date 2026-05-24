<script setup lang="ts">
import { useToDoApp } from '~/composables/useTodo';
import type { TaskGroup } from '~/models/Todo'
import EmojiPicker from './EmojiPicker'

const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['close', 'created'])
const showModal = computed(() => props.show)
const colors = useColorsUtility().primaryColors
const selectedColorIndex = ref(-1)
const defaultTaskGroup = { icon: '📁' } as TaskGroup
const groupItem = ref<TaskGroup>(defaultTaskGroup)
function setColor(index: number) {
    selectedColorIndex.value = index
}

const store = useToDoApp()

function createGroup() {
    if (groupItem.value.title.length === 0) return

    const color =
        selectedColorIndex.value >= 0 ? colors[selectedColorIndex.value] : null
    groupItem.value.bgColor = color ?? 'transparent'
    store.createGroup(groupItem.value)
    emits('created')
    window.umami?.track('Todo:CreateGroup', { title: groupItem.value.title })
    groupItem.value = defaultTaskGroup
    selectedColorIndex.value = -1
}
</script>


<template>
    <div>
        <n-modal v-model:show="showModal" @close="emits('close')" preset="card" style="width: 500px"
            :title="$t('todoApp.createGroup.title')">
            <div class="flex">
                <EmojiPicker v-model="groupItem.icon" class="me-1" />
                <n-input v-model:value="groupItem.title" :placeholder="$t('todoApp.createGroup.groupTitle')" />
            </div>

            <div class="py-4">
                <div>
                    <NTag type="primary" :bordered="false" size="small" class="mb-3 font-bold">
                        {{ $t('todoApp.createGroup.theme') }}
                    </NTag>
                </div>
                <div>
                    <NButton key="-1" color="#EEE" size="medium" circle class="mx-1"
                        @click="setColor(-1)">
                        <template #icon>
                            <Icon name="fluent:checkmark-48-filled" color="#333" v-if="selectedColorIndex === -1" />
                            <span v-else />
                        </template>
                    </NButton>
                    <NButton v-for="(color, index) of colors" :key="index" :color="color" size="medium" circle class="mx-1" @click="setColor(index)">
                        <template #icon>
                            <Icon name="fluent:checkmark-48-filled" v-if="selectedColorIndex === index" />
                            <span v-else />
                        </template>
                    </NButton>
                </div>
            </div>

            <div pt-4>
                <n-button attr-type="submit" size="large" type="primary" @click="createGroup">
                    {{ $t('common.create') }}
                </n-button>
            </div>
        </n-modal>
    </div>
</template>

<style scoped></style>