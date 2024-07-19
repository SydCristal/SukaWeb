import { createContext, useContext, useState } from 'react'

const SectionContext = createContext(null)

const SectionProvider = ({ children }) => {
		const [section, setSection] = useState(localStorage.getItem('section'))

		const value = {
				section,
				setSection: section => {
						localStorage.setItem('section', section)
						setSection(section)
				}
		}

		return (
				<SectionContext.Provider value={value}>
						{children}
				</SectionContext.Provider>
		)
}

const useSectionContext = () => {
		const context = useContext(SectionContext)

		return context
}

export { SectionContext, SectionProvider, useSectionContext }