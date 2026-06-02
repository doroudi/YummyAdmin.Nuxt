<script setup lang="ts">
import { NCheckbox } from 'naive-ui'
import type { TaskItem } from '~/models/Todo'

interface Props {
  task: TaskItem
}

const { renderIcon } = useRender()
const props = defineProps<Props>()
const isDone = ref<boolean>(props.task.isDone!)
const isChecked = ref(isDone.value)
const emits = defineEmits(['toggle', 'fav', 'delete'])

function update() {
  emits('toggle', isChecked.value)
}
function toggleFav() {
  emits('fav')
}

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

const options = [
  {
    label: $t('common.delete'),
    key: 'delete',
    icon: renderIcon('fluent:delete-20-regular'),
  },
]

function handleSelect(action: string) {
  if (action === 'delete') {
    emits('delete')
  }
  showDropdown.value = false
}
</script>

<template>
    <div class="task-item flex justify-between items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-3.5 rounded-md"
        :class="{ done: isDone, favorite: task.isFavorite }" @contextmenu="handleContextMenu">
        <div class="flex items-center todo-item">
            <NCheckbox v-model:checked="isDone" @update:checked="update" class="me-2">
                <span>{{ task.title }}</span>
            </NCheckbox>
        </div>
        <NButton text @click="toggleFav" me-1>
            <template #icon>
                <Icon size="1.3rem" name="fluent:star-24-filled" color="gold" v-if="task.isFavorite" />
                <Icon size="1.3rem" name="fluent:star-24-regular" v-else />
            </template>
        </NButton>

        <n-dropdown v-if="showDropdown" :on-clickoutside="() => showDropdown = false" placement="bottom-start"
            trigger="manual" :x="x" :y="y" :options="options" :show="showDropdown" @select="handleSelect" />
    </div>

</template>

<style lang="scss">
.todo-item {
    --n-border-radius: 50%;
    --n-size: 22px;
    --n-border: 2px solid #FFF;

    .n-checkbox .n-checkbox-box{
        border-radius: 50% !important;
    }
}

.task-item {
    cursor: pointer;
    opacity: 0.9;
    border: solid 1px transparent;

    &.done {
        text-decoration: line-through;
    }

    &.favorite {
        border: solid 1px rgb(223, 191, 12);
    }
}
</style>