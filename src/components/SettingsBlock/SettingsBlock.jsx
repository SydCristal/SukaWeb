import styled from 'styled-components'
import { C } from '../../utils'
import { SideSection, MiddleSection } from './'
import { useConfigurationContext } from '../../contexts'

const SettingsBlock = ({ leftSectionParams, middleSectionParams, rightSectionParams }) => {
	const { configuration } = useConfigurationContext()
	return (
		<StlSettingsBlock $active={configuration.active}>
						<MiddleSection {...middleSectionParams} />
						<SideSection {...leftSectionParams} />
						<MiddleSection {...middleSectionParams} />
						<SideSection {...rightSectionParams} />
				</StlSettingsBlock>
		)
}

const StlSettingsBlock = styled.div`
		${C.SETTINGS_BLOCK_STYLES};
		${({ $active }) => !$active && `
			opacity: 0.5;
			pointer-events: none;
			cursor: not-allowed;
		`};
		${C.IS_MOBILE} {
				flex-direction: column;
				align-items: center;
		};
`

export default	SettingsBlock