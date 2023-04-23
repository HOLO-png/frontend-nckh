// ** MUI Imports
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
// ** Demo Components Imports
import CardTemp from 'src/views/cards/CardTemp'
import CardLed from 'src/views/cards/CardLed'

import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import PowerPlug from 'mdi-material-ui/PowerPlug'
import TemperatureCelsius from 'mdi-material-ui/TemperatureCelsius'
import CosineWave from 'mdi-material-ui/CosineWave'
import CounterTemp from 'src/views/cards/fragment/CounterTemp'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Thermometer from 'mdi-material-ui/Thermometer'
import { lefOff, lefOn, useLightStore } from 'src/@core/store/light-store'
import { useNotificationStore } from 'src/@core/store/notification-store'
import { LIGHT_ENDPOINT } from 'src/@core/constant/APIEndpoint'
import { useSocketStore } from 'src/@core/store/socket-store'
import { useSession } from 'next-auth/react'

const CardBasic = () => {
  const setStatusLightApi = useLightStore((s) => s.setStatusLightApi)
  const createNotify = useNotificationStore((s) => s.createNotify)
  const session = useSession()
  const { data: user } = session
  const userInfo = user?.user?.user
  const light = useLightStore((s) => s.light)
  const socket = useSocketStore((s) => s.socket)

  const temperatureOptions = [
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Sensor</Typography>
            <Switch defaultChecked size='small' />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <CounterTemp counter={5} limit={10} />
          </Box>
        </>
      ),
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <PowerPlug sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Power: 3 -{'>'} 5 VDC</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TemperatureCelsius sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Temp range: 0 - 50°C (2°C)</Typography>
          </Box>
        </>
      )
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <Thermometer sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Temperature: 50°C</Typography>
          </Box>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <CosineWave sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Samplefrequency: 1Hz(1s/time)</Typography>
          </Box>
        </>

      )
    },

  ]

  const humidityOptions = [
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Sensor</Typography>
            <Switch defaultChecked size='small' />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <CounterTemp counter={5} limit={20} />
          </Box>
        </>
      ),
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <PowerPlug sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Power: 3 -{'>'} 5 VDC</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TemperatureCelsius sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Humi range: 20 - 90°C (5°C)</Typography>
          </Box>
        </>
      )
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <Thermometer sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Humidity: 74°C</Typography>
          </Box>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <CosineWave sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Samplefrequency: 1Hz(1s/time)</Typography>
          </Box>
        </>
      )
    },
  ]

  const onNotifySuccess = (isNotify) => {
    if (userInfo) {
      const params = {
        user: userInfo?._id,
        url: '/control-panel/room-01',
        boxId: 'boxLed',
        title: 'Light action',
        body: `Light status is ${isNotify === 1 ? 'on' : 'off'}`,
        image: lefOn,
        status: isNotify,
        isRead: false
      }
      const data = { params, auth: user?.user, socket }
      createNotify(data)
    }
  }

  const ledOptions = [
    {
      render: () => {
        const handleTurnLed = (event) => {
          if (!event.target.checked) {
            setStatusLightApi(LIGHT_ENDPOINT, { Led: { Status: 0 } }, socket, onNotifySuccess)
          } else {
            setStatusLightApi(LIGHT_ENDPOINT, { Led: { Status: 1 } }, socket, onNotifySuccess)
          }
        }

        return (
          <>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body2'>Turn</Typography>
              <Switch checked={light !== lefOff} size='small' onChange={handleTurnLed} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <CounterTemp counter={5} limit={20} />
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <CosineWave sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body2'>Watt total power comsumption: 12KW/H</Typography>
            </Box>
          </>
        )
      },
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Control Device</Typography>
      </Grid>
      <CardTemp title="Temperature" description="Temperature is a physical property of matter, roughly understood as a scale of 'hot' and 'cold'. It is the
              manifestation of thermal energy, present in all matter" optionRenders={temperatureOptions} />
      <CardTemp title="Humidity" description="Air humidity is the amount of water vapor present in the air, water in the form of water vapor and difficult to perceive by the human eye. Humidity directly affects the living environment of humans, our daily activities and production." optionRenders={humidityOptions} />
      <CardLed title="Led" description="you can control the lights in your room with just 1 click" optionRenders={ledOptions} />
    </Grid>
  )
}

export default CardBasic
