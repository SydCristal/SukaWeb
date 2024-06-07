import {	useEffect, useState } from 'react'
import { useConfigurationContext, useGuestsContext, useLoadingContext } from './contexts'
import LoginPage from './components/LoginPage'
import Layout from './components/Layout'
import socket, { Emits } from './sockets'
import styled from 'styled-components'
import { C } from './utils'

const App = () => {
		const [isConnected, setIsConnected] = useState(false)
		const { loading, setLoading } = useLoadingContext()
		const [token, setToken] = useState(localStorage.getItem('auth-token'))
		const { configuration, setConfiguration } = useConfigurationContext()
		const { setGuests } = useGuestsContext()
		const [content, setContent] = useState(<div />)

		useEffect(() => {
				function onConnection({ token, configuration, guests }) {
						console.log('SOCKET IS CONNECTED')
						if (token) localStorage.setItem('auth-token', token)
						setToken(token)
						setLoading(false)
						setIsConnected(true)
						setConfiguration(configuration)
						if (guests) setGuests(guests)
				}

				function onDisconnect() {
						console.log('SOCKET IS DISCONNECTED')
						setLoading(false)
						setIsConnected(false)
				}

				function onUpdateConfiguration(updatedConfiguration) {
						setLoading(false)
						setConfiguration(updatedConfiguration)
				}

				function onUpdateGuests(updatedGuests) {
						setLoading(false)
						setGuests(updatedGuests)
				}

				function onError(error) {
						setLoading(false)
						console.error('ON_ERROR:', error)
				}

				if (token && !isConnected) {
						console.log('INIT SOCKET')
						setLoading(true)
						Emits.connect({ token })
				}

				socket.on('connection', onConnection)
				socket.on('disconnect', onDisconnect)
				socket.on('updateConfiguration', onUpdateConfiguration)
				socket.on('updateGuests', onUpdateGuests)
				socket.on('error', onError)

				return () => {
						console.log('CLEAN UP SOCKET')
						socket.off('connection', onConnection)
						socket.off('disconnect', onDisconnect)
						socket.off('updateConfiguration', onUpdateConfiguration)
						socket.off('updateGuests', onUpdateGuests)
						socket.off('error', onError)
				}
		}, [])

		useEffect(() => {
				const token = localStorage.getItem('auth-token')
				setToken(token)
				setContent(!token && !isConnected ? <LoginPage /> : configuration ? <Layout /> : <div />)
		}, [isConnected, configuration])

		return (
				<StlApp>
						<LoaderScreen $loading={loading}>
								<Loader />
						</LoaderScreen>
						<AppContainer $loading={loading}>
								{content}
						</AppContainer>
				</StlApp>
		)
}

const StlApp = styled.div`
		min-height: 100vh;
		min-width: 100vw;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
