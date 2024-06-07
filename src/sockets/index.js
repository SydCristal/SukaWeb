import { io } from 'socket.io-client'
export { Emits } from './emits'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080'
const socket = io(URL, { autoConnect: false })
export default socket