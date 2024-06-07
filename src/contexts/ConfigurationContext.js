import { createContext, useContext, useState } from 'react'

const ConfigurationContext = createContext(null)

const ConfigurationProvider = ({ children }) => {
		const [configuration, setConfiguration] = useState(null)

		const value = {
				configuration,
				setConfiguration
		}

		return (
				<ConfigurationContext.Provider value={value}>
						{children}
				</ConfigurationContext.Provider>
		)
}

const useConfigurationContext = () => {
		const context = useContext(ConfigurationContext)

		return context
}

export { ConfigurationContext, ConfigurationProvider, useConfigurationContext }