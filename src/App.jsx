import { useEffect, useState, useRef } from 'react'
import { useConfigurationContext, useGuestsContext, useLoadingContext, useUsersContext, useSectionContext } from './contexts'
import LoginPage from './components/LoginPage'
import Layout from './components/Layout'
import socket, { Emits } from './sockets'
import styled from 'styled-components'
import { C } from './utils'
import TimerModal from './components/TimerModal'
import { Timer } from './components/Common/Timer'

const App = () => {
		const [isConnected, setIsConnected] = useState(false)
		const { loading, setLoading } = useLoadingContext()
		const [token, setToken] = useState(localStorage.getItem('auth-token'))
		const { configuration, setConfiguration } = useConfigurationContext()
		const { section, setSection } = useSectionContext()
		const { guests, setGuests, setEditedGuest } = useGuestsContext()
		const { users, setUsers, setConfiguration: setUserConfiguration } = useUsersContext()
		const usersRef = useRef(users)
		const guestsRef = useRef(guests)
		const [content, setContent] = useState(<div />)
		const [loginError, setLoginError] = useState(null)
		const [passwordError, setPasswordError] = useState(null)

		useEffect(() => {
				usersRef.current = users
		}, [users])

		useEffect(() => {
				guestsRef.current = guests
		}, [guests])

		useEffect(() => {
				function onConnection(data) {
						const { token, configuration = {}, guests, password, role, users } = data

						if (token) localStorage.setItem('auth-token', token)
						if (users) {
								setSection('users')
						} else {
								if (!section || section === 'users') setSection(configuration?.lightSettings?.enabled ? 'light' : configuration?.instalationSettings?.enabled ? 'instalations' : 'guests')
						}
						setToken(token)
						setLoading(false)
						setIsConnected(true)
						setConfiguration({ password, role, ...configuration })
						setGuests(guests)
						setUsers(users)
				}

				function onDisconnect() {
						setLoading(false)
						setIsConnected(false)
				}

				function onRequestConfiguration(requestedConfiguration) {
						setLoading(false)
						setUserConfiguration(requestedConfiguration)
						if (usersRef.current) {
								const users = usersRef.current.map(user => {
										if (user._id === requestedConfiguration.ownerId) {
												return { ...user, configuration: requestedConfiguration }
										}

										return user
								})

								setUsers(users)
						}
				}

				function onUpdateConfiguration(updatedConfiguration) {
						setLoading(false)
						setConfiguration(updatedConfiguration)
				}

				function onEditConfiguration(res) {
						setLoading(false)
						console.log(res)
				}

				function onUpdateGuests(updatedGuests) {
						setLoading(false)
						setGuests(updatedGuests)
						setEditedGuest(null)
				}

				function onError(error) {
						setLoading(false)
						if (error.message) {
								switch (error.message) {
										case 'USER_NOT_FOUND':
										case 'USER_IS_INACTIVE':
												setLoginError(error.message)
												localStorage.clear()
												break
										case 'PASSWORD_IS_INCORRECT':
										case 'GUEST_IS_INACTIVE':
												setPasswordError(error.message)
												localStorage.clear()
												break
										default:
												console.error('ERROR:', error.message)
												break
								}
						}
						console.error('ON_ERROR:', error)
				}
		
				function onCreateUser(user) {
						setLoading(false)
						setUsers([user, ...usersRef?.current?.filter(({ isNew }) => !isNew) || [] ])
				}

				function onEditUser(user) {
						setLoading(false)
						setUsers(usersRef?.current.map(u => u._id === user._id ? user : u) || [])
				}

				function onDeleteUser(_id) {
						setLoading(false)
						setUsers(usersRef?.current.filter(u => u._id !== _id) || [])
				}
				function onToggleUser({ _id, active }) {
						setLoading(false)
						setUsers(usersRef?.current.map(u => u._id === _id ? { ...u, active } : u) || [])
				}
				function onToggleGuest({ _id, active }) {
						setLoading(false)
						setGuests(guestsRef?.current.map(g => g._id === _id ? { ...g, active } : g) || [])
						setEditedGuest(null)
				}

				if (token && !isConnected) {
						setLoading(true)
						Emits.connect({ token })
				}

				socket.on('connection', onConnection)
				socket.on('disconnect', onDisconnect)
				socket.on('createUser', onCreateUser)
				socket.on('editUser', onEditUser)
				socket.on('deleteUser', onDeleteUser)
				socket.on('toggleUser', onToggleUser)
				socket.on('requestConfiguration', onRequestConfiguration)
				socket.on('updateConfiguration', onUpdateConfiguration)
				socket.on('editConfiguration', onEditConfiguration)
				socket.on('updateGuests', onUpdateGuests)
				socket.on('toggleGuest', onToggleGuest)
				socket.on('error', onError)

				return () => {
						console.log('CLEAN UP SOCKET')
						socket.off('connection', onConnection)
						socket.off('disconnect', onDisconnect)
						socket.off('createUser', onCreateUser)
						socket.off('editUser', onEditUser)
						socket.off('deleteUser', onDeleteUser)
						socket.off('toggleUser', onToggleUser)
						socket.off('toggleGuest', onToggleGuest)
						socket.off('requestConfiguration', onRequestConfiguration)
						socket.off('updateConfiguration', onUpdateConfiguration)
						socket.off('editConfiguration', onEditConfiguration)
						socket.off('updateGuests', onUpdateGuests)
						socket.off('error', onError)
				}
		}, [])

		const loginPageCfg = {
				loginError,
				setLoginError,
				passwordError,
				setPasswordError
		}

		useEffect(() => {
				const token = localStorage.getItem('auth-token')
				setToken(token)
				setContent(!token && !isConnected ? <LoginPage {...loginPageCfg} /> : configuration ? <Layout /> : <div />)
		}, [isConnected, configuration, loginError, passwordError])

		return (
				<StlApp>
						<LoaderScreen $loading={loading}>
								<Loader />
						</LoaderScreen>
						<TimerModal />
						<AppContainer $loading={loading}>
								{content}
						</AppContainer>
				</StlApp>
		)
}

const StlApp = styled.div`
		min-height: 100vh;
		width: 100vw;
		overflow-x: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		${C.IS_MOBILE} {
				min-width: ${C.MIN_MOBILE_WIDTH};
		};
`

const AppContainer = styled.div`
		opacity: ${({ $loading }) => $loading ? 0.5 : 1};
		pointer-events: ${({ $loading }) => $loading ? 'none' : 'auto'};
		transition: opacity 0.3s;
		min-height: 100%;
		min-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
`

const LoaderScreen = styled.div`
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: ${({ $loading }) => $loading ? 1 : 0};
		pointer-events: ${({ $loading }) => $loading ? 'auto' : 'none'};
		transition: opacity 0.3s;
`

const Loader = styled.div`
  width: 50px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%,#333) content-box;
  -webkit-mask:
				repeating-conic-gradient(#0000 0deg,#000 1deg 20deg,#0000 21deg 36deg),
				radial-gradient(farthest-side,#0000 calc(100% - var(--b) - 1px),#000 calc(100% - var(--b)));
				-webkit-mask-composite: destination-in;
				mask-composite: intersect;
				animation:l4 1s infinite steps(10);
		@keyframes l4 {to{transform: rotate(1turn)}}
`

export default App