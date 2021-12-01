import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { router } from '../../index'
import { SyncData } from '../../react-app-env'
import { $socket } from '../../store/socket/store'
import { syncGame, initGame, showGameModal } from '../../store/game/core/events'
import { setActivePlayer } from '../../store/game/players/events'
import { Player } from '../../store/game/players/types'
import { $auth } from '../../store/auth/store'
import { $game } from '../../store/game/core/store'

import GameTable from '../../components/game/table'
import GamePlayers from '../../components/game/players'
import GameMenu from '../../components/game/menu'

import './_index.scss'

function GamePage () {
  const user = useStore($auth).user
  const game = useStore($game)
  const socket = useStore($socket).socket

  const setActivePlayerAndShowDices = (player: Player) => {
    setActivePlayer(player._id)
    if (player._id === user._id) {
      showGameModal({
        type: 'turn'
      })
    }
  }

  useEffect(() => {
    socket.on('sync', (data: SyncData) => {
      if (!data.hasActiveGame) {
        router.navigate('home')
      }
    })

    socket.on('sync-game', data => {
      if (!game.isInitialized) {
        initGame(data)
      }
      syncGame(data)
      setActivePlayerAndShowDices(data.activePlayer)
    })

    socket.on('game:set-active-player', (player: Player) => {
      setActivePlayerAndShowDices(player)
    })

    socket.emit('sync-game')
  }, [])

  return (
    <div className="page -game">
      <div className="page-parent">
        <div className="page-parent-intro flex center">
          <aside className="game-aside flex column j-between">
            <GamePlayers />
            <GameMenu />
          </aside>
          <GameTable />
        </div>
      </div>
    </div>
  )
}

export default GamePage
