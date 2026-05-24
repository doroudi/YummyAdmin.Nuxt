// import type { NotificationType } from "naive-ui/es/notification"
// import { useNotification } from "naive-ui/es/notification"
// export interface ToastNotification {
//     type: 'default' | 'error' | 'info' | 'success' | 'warning'
//     duration?: number
//     permanent?: boolean
//     body: string
//     title?: string
// }

// export const useNotify = () => {
//     const notification = useNotification()
//     function notify(toast: ToastNotification) {
//         notification.create({ })
//     }

//     // function notify(notification: ToastNotification) {
//     //     useWebNotification().noti
//     //     notification.id = this.messages.length
//     //         ? Math.max(...this.messages.map((x) => x.id)) + 1
//     //         : 0
//     //     notification.duration = notification.duration || 5000
//     //     this.messages.push(notification)
//     //     if (!notification.permanent) {
//     //         setTimeout(() => {
//     //             const messageIndex = this.messages.findIndex(
//     //                 (x) => x.id === notification.id,
//     //             )
//     //             this.messages.splice(messageIndex, 1)
//     //         }, notification.duration ?? 3000)
//     //     }
//     // }

//     function error(body: string, title ?: string, permanent = false) {
//         notify({ type: 'error', body, title, permanent })
//     }

//     function success(body: string, title ?: string, permanent = false) {
//         notify({ type: 'success', body, title, permanent })
//     }

//     function clear() {
//         messages = []
//     }


//     return {
//         notify,
//         error,
//         success,
//         clear,
//     }
// }