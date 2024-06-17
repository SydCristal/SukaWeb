import socket from './'

export const Emits = {
  connect: auth => {
    socket.auth = auth
    socket.connect()
  },

  requestConfiguration: () => {
    socket.emit('requestConfiguration')
  },

  //createUser = user => {
		//		socket.emit('createUser', user)
	//},

  //createConfiguration: configuration => {
		//  socket.emit('createConfiguration', configuration)
  //},

  //updateUser: userData => {
  //  socket.emit('updateUser', userData)
  //},

  updateConfiguration: configuration => {
    socket.emit('updateConfiguration', configuration)
  },

  //requestGuests: () => {
  //  socket.emit('requestGuests')
  //},

  updateGuests: guests => {
    socket.emit('updateGuests', guests)
  },

  disconnect: () => {
    localStorage.removeItem('auth-token')
    socket.disconnect()
		}
}