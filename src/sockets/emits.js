import socket from './'

export const Emits = {
  connect: auth => {
    socket.auth = auth
    socket.connect()
  },

  requestConfiguration: ownerId => {
    socket.emit('requestConfiguration', { ownerId })
  },

  createUser: user => {
				socket.emit('createUser', user)
  },

  editUser: user => {
    socket.emit('editUser', user)
  },

  deleteUser: id => {
    socket.emit('deleteUser', id)
  },

  createConfiguration: configuration => {
		  socket.emit('createConfiguration', configuration)
  },

  toggleUser: userData => {
    socket.emit('toggleUser', userData)
  },

  previewConfiguration: previewData => {
    socket.emit('previewConfiguration', previewData)
  },

  updateConfiguration: configuration => {
    socket.emit('updateConfiguration', configuration)
  },

  editConfiguration: () => {
    socket.emit('editConfiguration', dataDummy)
  },

  //requestGuests: () => {
  //  socket.emit('requestGuests')
  //},

  toggleGuest: guest => {
    socket.emit('toggleGuest', guest)
  },

  updateGuests: guests => {
    socket.emit('updateGuests', guests)
  },

  disconnect: () => {
    localStorage.removeItem('auth-token')
    socket.disconnect()
		}
}

const adminDummy = {
  "password": "HOBOROBOT666",
  "userName": "Suka Admin",
  "isAdmin": true
}

const dataDummy = {
  "password": "HOBOROBOT666",
  "_id": "666fc86876dd710705fcd2d5",
  "active": true,
  "ownerId": "666fc86876dd710705fcd2d3",
  "lightSettings": {
    "areas": [
      {
        "name": "dungeon",
        "brightness": 100,
        "audioReactive": false,
        "speed": 0,
      },
      {
        "name": "bestiary",
        "brightness": 52,
        "audioReactive": false,
        "speed": 52,
      },
      {
        "name": "laboratory",
        "brightness": 100,
        "audioReactive": false,
        "speed": 0,
      }
    ],
    "moodPresets": [
      {
        "name": "suicidal",
        "icon": "preset1"
      },
      {
        "name": "horny",
        "icon": "preset2"
      },
      {
        "name": "outraged",
        "icon": "preset3"
      },
      {
        "name": "mysterious",
        "icon": "preset4"
      }
    ],
    "dynamicPresets": [
      {
        "name": "accelerated",
      },
      {
        "name": "stoned",
      },
      {
        "name": "full throttle",
      }
    ],
    "allMode": true,
    "allSettings": {
      "name": "all",
      "brightness": 0,
      "audioReactive": false,
      "speed": 63,
    },
  },
  "instalationSettings": {
    "instalations": [
      {
        "name": "dark altar",
        "interactive": false,
        "intensity": 79,
        "brightness": 50,
        "speed": 20,
        "volume": 46,
      },
      {
        "brightness": 50,
        "speed": 50,
        "name": "mushroom garden",
        "interactive": true,
        "intensity": 36,
        "volume": 10,
      }
    ],
    "soundDesignPresets": [
      {
        "name": "pink floyd",
      },
      {
        "name": "colour haze",
      }
    ],
    "scenePresets": [
      {
        "name": "sacrifice",
        "icon": "preset1"
      },
      {
        "name": "betrayal",
        "icon": "preset2"
      },
      {
        "name": "seduction",
        "icon": "preset3"
      }
    ],
  },
}