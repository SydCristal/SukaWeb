import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext(null)

const LoadingProvider = ({ children }) => {
		const [loading, setLoading] = useState(false)

		const value = {
				loading,
				setLoading
		}

		return (
				<LoadingContext.Provider value={value}>
						{children}
				</LoadingContext.Provider>
		)
}

const useLoadingContext = () => {
		const context = useContext(LoadingContext)

		return context
}

export { LoadingContext, LoadingProvider, useLoadingContext }