import { useEffect, useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { POST_TYPES } from './redux/actions/postAction'
// import { GLOBALTYPES } from './redux/actions/globalTypes'
// import { NOTIFY_TYPES } from './redux/actions/notifyAction'
// import { MESS_TYPES } from './redux/actions/messageAction'

import { useSession } from 'next-auth/react'
import { useSocketStore } from 'src/@core/store/socket-store'
import { useLightStore } from 'src/@core/store/light-store'
import { useNotificationStore } from 'src/@core/store'

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body, icon
  }
  let n = new Notification(title, options)

  n.onclick = e => {
    e.preventDefault()
    window.open(url, '_blank')
  }
}

const SocketClient = () => {
  const socket = useSocketStore((s) => s.socket)
  const createNotify = useNotificationStore((s) => s.createNotify)
  const dispatchNotification = useNotificationStore((s) => s.dispatchNotification)

  const removeNotify = useNotificationStore((s) => s.removeNotify)

  const setIsTurnOn = useLightStore((s) => s.setIsTurnOn)

  const session = useSession()
  const { data: user } = session

  useEffect(() => {
    if (socket && user) {
      socket?.emit('joinUser', user?.user)
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
      socket.on('createNotifyToClient', msg => {
        dispatchNotification('info', msg.text, msg.content)
        spawnNotification(
          msg.user.username + ' ' + msg.text,
          msg.user.avatar,
          msg.url,
          'V-NETWORK'
        )
      })

      return () => socket.off('createNotifyToClient')
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on('removeNotifyToClient', msg => {
        removeNotify({ params: msg, auth: user?.user, socket })
      })

      return () => socket.off('removeNotifyToClient')
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
