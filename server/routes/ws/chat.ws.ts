import { faker } from '@faker-js/faker/locale/en'
import { times } from '../../mocks/handler-utilities'
import type { ChatItem } from '../../../app/models/Chat'

const chatMessages: Array<ChatItem> = times(10, createFakeChatMessage)
const activeConnections = new Map<WebSocket, NodeJS.Timeout>()

export default defineWebSocketHandler({
  async open(peer : any) {
    // Send initial messages
    peer.send(JSON.stringify({
      type: 'INIT',
      payload: chatMessages,
    }))

    // Set up periodic updates
    const updateInterval = setInterval(() => {
      updateMessages()
      peer.send(JSON.stringify({ type: 'UPDATE', payload: chatMessages }))
    }, 6000)

    // Store the interval with the connection
    activeConnections.set(peer, updateInterval)

    console.log(`Chat WebSocket connected: ${peer.id}`)
  },

  async message(peer, message) {
    try {
      const content = JSON.parse(message.text())

      switch (content.action) {
        case 'DETAILS':
          await sendInitialMessages(content.id, peer)
          break
        case 'MESSAGE':
          await sendMessages(content, peer)
          break
      }
    } catch (error) {
      console.error('Error processing message:', error)
    }
  },

  async close(peer: any) {
    // Clean up interval when connection closes
    const interval = activeConnections.get(peer)
    if (interval) {
      clearInterval(interval)
      activeConnections.delete(peer)
    }
    console.log(`Chat WebSocket disconnected: ${peer.id}`)
  },

  async error(peer : any, error) {
    console.error(`WebSocket error for ${peer.id}:`, error)
    // Clean up on error as well
    const interval = activeConnections.get(peer)
    if (interval) {
      clearInterval(interval)
      activeConnections.delete(peer)
    }
  }
})

async function sendInitialMessages(_id: string, peer: any) {
  const message = {
    id: faker.string.uuid(),
    senderId: faker.string.uuid(),
    content: 'Welcome to the chat! How can I assist you today?',
    created: new Date(),
    updated: new Date(),
  }

  peer.send(JSON.stringify({ type: 'MESSAGE', payload: message }))

  setTimeout(() => {
    const secondMessage = {
      id: faker.string.uuid(),
      senderId: faker.string.uuid(),
      content: `Please support this project by giving a star in <a target="_blank" href='https://github.com/doroudi/yummyadminnuxt'>Github</a>`,
      created: new Date(),
      updated: new Date(),
    }
    peer.send(JSON.stringify({ type: 'MESSAGE', payload: secondMessage }))
  }, 1500)
}

async function sendMessages(content: any, peer: any) {
  const message = {
    id: faker.string.uuid(),
    senderId: faker.string.uuid(),
    content: `You said: ${content.message.content}`,
    created: new Date(),
    updated: new Date(),
  }

  setTimeout(() => {
    peer.send(JSON.stringify({ type: 'MESSAGE', payload: message }))
  }, 300)
}

function createFakeChatMessage(): ChatItem {
  const randomCount = faker.number.int({ min: -10, max: 10 })
  return {
    from: {
      avatar: `/assets/images/user-avatar/${faker.number.int({
        min: 1,
        max: 20,
      })}.png`,
      name: faker.person.fullName(),
      id: faker.string.uuid(),
    },
    title: faker.lorem.sentence(4),
    updated: randomCount > 0 ? new Date() : faker.date.recent(),
    id: faker.string.uuid(),
    badge: randomCount > 0 ? randomCount : undefined,
    isUnread: randomCount > 0,
  }
}

function updateMessages() {
  const randomIndex = faker.number.int({
    min: 0,
    max: chatMessages.length - 1,
  })
  const randomMessage = chatMessages[randomIndex]!
  randomMessage.updated = faker.date.recent()
  randomMessage.badge = faker.number.int({ min: 1, max: 10 })
  randomMessage.isUnread = true
}