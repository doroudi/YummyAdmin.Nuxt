<script lang="ts" setup>
import { useToDoApp } from '~/composables/useTodo';
import type { TaskGroup } from '~/models/Todo'

interface Props {
  groups: TaskGroup[]
  selectedGroup?: TaskGroup
}

const props = defineProps<Props>()
const emits = defineEmits(['select'])
// const innerSelectedGroup = ref<TaskGroup>()
watch(
  () => props.selectedGroup,
  () => selectGroup(props.selectedGroup),
  { immediate: true },
)
const { renderIcon } = useRender()

const options = [
  {
    label: $t('common.delete'),
    key: 'delete',
    icon: renderIcon('fluent:delete-20-regular'),
  },
]

function selectGroup(item: TaskGroup | undefined) {
  if (item === undefined) return
  if (props.selectedGroup && item && props.selectedGroup.id === item.id) return
  emits('select', item)

  if (item!.id !== 1)
    window.umami?.track('Todo:SelectGroup', { title: item!.title })
}

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const selectedMenuId = ref(null)
function handleContextMenu(item: any, e: MouseEvent) {
  selectedMenuId.value = item.id
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
const store = useToDoApp()
function handleSelect(action: string) {
  if (action === 'delete') {
    store.deleteGroup(selectedMenuId.value)
    emits('select', undefined)
  }
  showDropdown.value = false
}

// function getCount(groupId: number) {
//   const items = [store.tasks.value]
//   return items.filter((x: TaskItem) => x.groupId === groupId && !x.isDone).length
// }
</script>

<template>
  <div>
    <NList hoverable clickable class="px-1">
      <NListItem v-for="item of groups" :key="item.id" @click="selectGroup(item)"
        @contextmenu="(e: MouseEvent) => handleContextMenu(item, e)"
        :class="{ selected: item.id === selectedGroup?.id }">
        <template #prefix>
          <span class="icon text-lg">{{ item.icon }}</span>
        </template>
        <div class="flex flex-row justify-between">
          <span class="text-sm text-gray-800 dark:text-white">
            {{ item.title }}
          </span>

          <n-badge  color="var(--primary-color)" />
        </div>

      </NListItem>
      <!-- context menu -->
      <n-dropdown :on-clickoutside="() => showDropdown = false" placement="bottom-start" trigger="manual" :x="x" :y="y"
        :options="options" :show="showDropdown" @select="handleSelect" />
    </NList>
  </div>
</template>


<style scoped lang="scss">
.icon {
  position: relative;
}

.selected {
  font-weight: bold;
  background: var(--n-merged-color-hover);

  .icon {
    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 2px;
      height: 18px;
      width: 3px;
      border-radius: 3px;
      background: var(--primary-color);
    }
  }
}
</style>