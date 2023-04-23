// ** MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useNotificationStore } from 'src/@core/store'

const UserLayout = ({ children }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const getNotifies = useNotificationStore((s) => s.getNotifies)

  const session = useSession()
  const { data: user } = session

  const hidden = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  useEffect(() => {
    if (user?.user) {
      getNotifies({ auth: user?.user })
    }
  }, [user?.user])

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification')
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      })
    }
  }, [])

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}>
      {children}
      <UpgradeToProButton />
    </VerticalLayout>
  )
}

export default UserLayout
