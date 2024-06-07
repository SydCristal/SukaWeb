import styled from 'styled-components'
import { C } from '../../utils'
import { SideSection, MiddleSection } from './'

const SettingsBlock = ({ leftSectionParams, middleSectionParams, rightSectionParams }) => {
		return (
				<StlSettingsBlock>
						<MiddleSection {...middleSectionParams} />
						<SideSection {...leftSectionParams} />
						<MiddleSection {...middleSectionParams} />
						<SideSection {...rightSectionParams} />
				</StlSettingsBlock>
		)
}

const StlSettingsBlock = styled.div`
		${C.SETTINGS_BLOCK_STYLES};
		${C.IS_MOBILE} {
				flex-direction: column;
				align-items: center;
		};
`

export default	SettingsBlock