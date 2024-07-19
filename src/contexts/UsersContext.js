import { createContext, useContext, useState } from 'react'

const UsersContext = createContext(null)

const UsersProvider = ({ children }) => {
		const [users, setUsers] = useState(null)

		const value = {
				users,
				setUsers
		}

		return (
				<UsersContext.Provider value={value}>
						{children}
				</UsersContext.Provider>
		)
}

const useUsersContext = () => {
		const context = useContext(UsersContext)

		return context
}

export { UsersContext, UsersProvider, useUsersContext }