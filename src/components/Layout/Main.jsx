import styled from 'styled-components'
import { C } from '../../utils'
import { useSectionContext, useGuestsContext, useUsersContext } from '../../contexts'
import { LightBlock, InstalationsBlock } from '../SettingsBlock'
import GuestsBlock from '../GuestsBlock'
import UsersBlock from '../UsersBlock'

const Main = () => {
		const { section } = useSectionContext()
		const { guests } = useGuestsContext()
		const { users } = useUsersContext()
		let content
		switch (section) {
				case 'guests':
						content = guests ? <GuestsBlock /> : <div />
						break
				case 'instalations':
						content = <InstalationsBlock />
						break
				case 'light':
						content = <LightBlock />
						break
				case 'users':
						content = users ? <UsersBlock /> : <div />
						break
				default:
						content = <div />
		}

		return (
				<StlMain>
						{content}
				</StlMain>
		)
}

const StlMain = styled.main`
		flex: 1;
		${C.IS_DESKTOP} {
			width: ${C.MIN_DESKTOP_WIDTH};
				padding: 32px;
		};
		${C.IS_MOBILE} {
				min-width: ${C.MIN_MOBILE_WIDTH};
				padding: 13px 25px 45px;
		};
`

export { Main }