import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { useSocketStore } from 'src/@core/store/socket-store'
import { useLightStore } from 'src/@core/store/light-store'
import { useNotificationStore } from 'src/@core/store'

const SocketClient = () => {
  const socket = useSocketStore((s) => s.socket)
  const dispatchNotification = useNotificationStore((s) => s.dispatchNotification)

  // const removeNotify = useNotificationStore((s) => s.removeNotify)
  const updateNotifies = useNotificationStore((s) => s.updateNotifies)

  const setIsTurnOn = useLightStore((s) => s.setIsTurnOn)

  const session = useSession()
  const { data: user } = session

  useEffect(() => {
    if (socket && user) {
      socket?.emit('joinUser', user?.user.user)
    }
  }, [socket, user])

  useEffect(() => {
    if (socket) {
      socket.on('testLight', (newLedStatus) => {
        setIsTurnOn(newLedStatus)
      })

      return () => {
        socket.off('testLight')
      }
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on('createNotifyToClient', (msg) => {
        console.log(msg);
        dispatchNotification('info', msg.title, msg.body)
        updateNotifies(msg)
      })

      return () => {
        socket.off('createNotifyToClient')
      }
    }
  }, [socket])

  return (
    <>
      {/* <audio controls ref={audioRef} style={{ display: 'none' }}>
        <source src={audiobell} type='audio/mp3' />
      </audio> */}
    </>
  )
}

export default SocketClient
