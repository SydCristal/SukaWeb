import { createContext, useContext, useState } from 'react'

const TimerModalContext = createContext(null)

const TimerModalProvider = ({ children }) => {
		const [timerModal, setTimerModal] = useState(false)

		const value = {
				timerModal,
				setTimerModal
		}

		return (
				<TimerModalContext.Provider value={value}>
						{children}
				</TimerModalContext.Provider>
		)
}

const useTimerModalContext = () => {
		const context = useContext(TimerModalContext)

		return context
}

export { TimerModalContext, TimerModalProvider, useTimerModalContext }