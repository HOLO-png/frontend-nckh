
import { useEffect } from 'react'
import { LIGHT_ENDPOINT } from 'src/@core/constant/APIEndpoint'

import { useLightStore } from 'src/@core/store/light-store'
import { lefOff } from 'src/@core/store/light-store'

import { useSocketStore } from 'src/@core/store/socket-store'

function LightAction() {
  const light = useLightStore((s) => s.light)
  const isTurnOn = useLightStore((s) => s.isTurnOn)
  const getLightStatus = useLightStore((s) => s.getLightStatus)

  useEffect(() => {
    getLightStatus()
  }, [isTurnOn])

  return (
    <section>
      <img defaultValue={lefOff} src={light} id='bulb' width={100} />
    </section>
  )
}

LightAction.propTypes = {}

export default LightAction
