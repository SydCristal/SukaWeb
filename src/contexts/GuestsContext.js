import { createContext, useContext, useState } from 'react'

const GuestsContext = createContext(null)

const GuestsProvider = ({ children }) => {
		const [guests, setGuests] = useState(null)

		const value = {
				guests,
				setGuests
		}

		return (
				<GuestsContext.Provider value={value}>
						{children}
				</GuestsContext.Provider>
		)
}

const useGuestsContext = () => {
		const context = useContext(GuestsContext)

		return context
}

export { GuestsContext, GuestsProvider, useGuestsContext }