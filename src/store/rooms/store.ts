import { createStore } from 'effector'
import { addRoom } from './events'
import { State, Room } from './types'
import { showNotification } from '../notifications/events'

const initialState: State = []

export const $rooms = createStore<State>(initialState)
  .on(addRoom, (state, data) => {
    const room = new Room(data)

    showNotification({
      heading: 'Room created',
      content: `#${data.id}`
    })

    return [...state, room]
  })

export default $rooms