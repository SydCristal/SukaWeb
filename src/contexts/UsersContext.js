import { createContext, useContext, useState } from 'react'

const UsersContext = createContext(null)

const UsersProvider = ({ children }) => {
		const [users, setUsers] = useState(null)
		const [editedUser, setEditedUser] = useState(null)
		const [editedList, setEditedList] = useState(null)
		const [editedRecord, setEditedRecord] = useState(null)
		const [configuration, setConfiguration] = useState(null)

		const value = {
				users,
				setUsers,
				editedUser,
				setEditedUser: id => {
						setEditedUser(id)
						if (!id) {
								setEditedList(null)
								setEditedRecord(null)
						}
				},
				editedList,
				setEditedList,
				editedRecord,
				setEditedRecord: id => {
						setEditedRecord(id)
						if (!id) setEditedList(null)
				},
				configuration,
				setConfiguration
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