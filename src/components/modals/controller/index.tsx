import React, { useEffect, useState } from 'react'
import { $modals } from '../../../store/modals/store'

import SampleModal from '../sample'
import LeaveGameModal from '../leave-game'
import GameFinishedModal from '../game-finished'

import './_index.scss'

function ModalController () {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const unwatch = $modals.watch(modals => {
      setShow(!!modals.length)
    })
    return () => {
      unwatch()
    }
  }, [])

  return (
    <div className={`component -modal-controller ${show ? '-active' : ''}`}>
      <SampleModal />
      <LeaveGameModal />
      <GameFinishedModal />
    </div>
  )
}

export default ModalController
