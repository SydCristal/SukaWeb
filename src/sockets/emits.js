import socket from './'

export const Emits = {
  connect: auth => {
    socket.auth = auth
    socket.connect()
  },

  requestConfiguration: () => {
    socket.emit('requestConfiguration')
  },

  createConfiguration: configuration => {
		socket.emit('createConfiguration', configuration)
	},

  updateConfiguration: configuration => {
    socket.emit('updateConfiguration', configuration)
  },

  requestGuests: () => {
    socket.emit('requestGuests')
  },

  updateGuests: guests => {
    socket.emit('updateGuests', guests)
  },

  disconnect: () => {
    localStorage.removeItem('auth-token')
    socket.disconnect()
		}
}