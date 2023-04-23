import create from 'zustand'
import { ApiCore } from '../ApiCore'
import { NOTIFIES_ENDPOINT, NOTIFY_ENDPOINT } from '../constant/APIEndpoint'

export const useNotificationStore = create((set, get) => {
  return {
    notification: { type: '', label: '', description: '' },
    notifies: [],
    dispatchNotification: (type, label, description) => {
      set({ notification: { type, label, description } })
      setTimeout(() => set({ notification: undefined }), 5000)
    },
    createNotify: async ({ params, auth, socket }) => {
      const response = await ApiCore.post(NOTIFY_ENDPOINT, params, {
        headers: { Authorization: auth.access_token }
      })
      set({
        notification: {
          type: 'info', label: response.data.notify.title, description
            : response.data.notify.body
        },
      })
      socket.emit('createNotify', {
        ...response.data.notify,
        user: {
          username: auth.user.fullname,
          avatar: auth.user.avatar
        }
      })
    },
    removeNotify: async ({ params, auth, socket }) => {
      try {
        const response = await ApiCore.delete(`${NOTIFY_ENDPOINT
          }/${params.id}`, {
          headers: { Authorization: auth.access_token }
        })
        socket.emit('removeNotify', {
          ...response.data.notify,
          user: {
            username: auth.user.fullname,
            avatar: auth.user.avatar
          }
        })
      } catch (err) {
        console.log(err);
      }
    },
    getNotifies: async ({ auth }) => {
      try {
        const response = await ApiCore.get(NOTIFIES_ENDPOINT, {
          headers: { Authorization: auth.access_token }
        })
        set({ notifies: response.data.notifies })
      } catch (error) {
        console.log(error)
      }
    },
    updateNotifies: (notify) => {
      if (notify) {
        const notifies = get().notifies
        set({ notifies: notifies.push(notify) })
      }
    }
  }
})
