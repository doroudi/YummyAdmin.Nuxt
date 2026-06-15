<script setup lang="ts">
import { useChatApp } from '~/composables/useChatApp'
import type { ChatItem } from '~/models/Chat'
const collapsed = ref(false)
const { chats, status, connect, disconnect, loadChatMessages } = useChatApp()

onMounted(() => {
  connect()
})

onBeforeUnmount(() => {
  if (status.value === 'OPEN') disconnect()
})

function handleLoadChatMessages(chatId: string) {
  loadChatMessages(chatId)
}

const searchKeyword = ref('')
const filteredChats = ref<ChatItem[]>([])

function searchInList(keyword: string) {
  searchKeyword.value = keyword
  if (!keyword.trim()) {
    filteredChats.value = []
  }

  filteredChats.value = chats.value.filter(
    (x: ChatItem) =>
      x.from.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0,
  )
}
</script>

<template>
  <NLayout has-sider sider-placement="left" class="chat-layout">
    <NLayoutSider bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false">
      <div class="p-3">
        <NInput round :placeholder="$t('common.search')" @input="searchInList" clearable />
      </div>
      <div class="chat-sidebar">
        <NScrollbar>
          <ChatList :items="searchKeyword.length ? filteredChats : chats" @select="handleLoadChatMessages" />
        </NScrollbar>
      </div>
    </NLayoutSider>
    <NLayoutContent>
      <ChatMessages />
    </NLayoutContent>
  </NLayout>
</template>

<style lang="scss" scoped>
.n-layout {
  padding: 0;
}

.chat-layout {
  height: calc(100vh - 30px);
}

.chat-sidebar {
  height: calc(100vh - 150px);
}
</style>
