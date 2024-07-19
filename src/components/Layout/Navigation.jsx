import styled from 'styled-components'
import { useConfigurationContext, useSectionContext, useGuestsContext, useUsersContext } from '../../contexts'
import { C } from '../../utils'

const Navigation = () => {
		const { configuration } = useConfigurationContext()
		const { lightSettings, instalationSettings } = configuration
		const { guests } = useGuestsContext()
		const { section, setSection } = useSectionContext()
		const { users } = useUsersContext()
		const sections = []
		if (lightSettings) sections.push('light')
		if (instalationSettings) sections.push('instalations')
		if (guests) sections.push('guests')
		if (users) sections.push('users')
		const selectedSection = section || (sections.length && sections[0])

		return (
				<StlNavigation>
						<TabContainer>
								{sections.map((sectionName, i) => {
										let position = 'center'

										if (sections.length > 1) {
												if (i === 0) position = 'left'
												if (i === sections.length - 1) position = 'right'
										}

										const active = selectedSection === sectionName

										const tabProps = {
												$position: position,
												$active: active
										}

										if (!active) tabProps.onClick = () => setSection(sectionName)

										return (
												<Tab {...tabProps} key={i}>
														{active && <TabBorder $position={position}><div /></TabBorder>}
														<TabHeading>{sectionName}</TabHeading>
														{active && <TabBorder $position={position}><div /></TabBorder>}
												</Tab>
										)
								})}
						</TabContainer>
				</StlNavigation>
		)
}

const StlNavigation = styled.nav`
	width: 100%;
	position: relative;
	border-bottom: ${C.BORDER};
	${C.IS_DESKTOP} {
		height: 74px;
	};
	${C.IS_MOBILE} {
		height: 64px;
		border-width: 1px;
	};
`

const TabContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: 0 auto;
	${C.IS_DESKTOP} {
		width: ${C.MIN_DESKTOP_WIDTH};
		padding: 0 32px;
		height: 74px;
	};
	${C.IS_MOBILE} {
		width: ${C.MIN_MOBILE_WIDTH};
		padding: 0 45px;
		height: 64px;
	};
`

const Tab = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	${C.IS_MOBILE} {
		h3 {
			margin: 0;
		};
	};
	border: ${C.BORDER};
	${({ $active, $position }) => {
				let styles = $active ? `
			cursor: default;
			background: white;
		` : `
			cursor: pointer;
			border-color: transparent;
		`

				styles += $position === 'center' ? `
			padding: 0 25px;
			${C.IS_DESKTOP} {
				width: 376px;
				border-radius: 30px 30px 0 0;
			};
			${C.IS_MOBILE} {
				width: fit-content;
				border-radius: 25px 25px 0 0;
			};
		` : `
			flex: 1;
			h3 {
				${C.IS_DESKTOP} {
					width: ${C.SIDE_BLOCK_WIDTH};
				};
			};
			padding: 0 ${$position === 'left' ? '50px 0 0' : '0 0 50px'};
			border-radius: ${$position === 'left' ? '0 30px 0 0' : '30px 0 0 0'};
			justify-content: ${$position === 'left' ? 'flex-start' : 'flex-end'};
			border-${$position}: 2px solid transparent;
			${C.IS_MOBILE} {
				padding: 0 ${$position === 'left' ? '25px 0 0' : '0 0 25px'};
				border-radius: ${$position === 'left' ? '0 25px 0 0' : '25px 0 0 0'};
				justify-content: ${$position === 'left' ? 'flex-end' : 'flex-start'};
			};
		`

				styles += `
						border-bottom: 2px solid transparent;
				`

				return styles
		}};
		${C.IS_MOBILE} {
				border-width: 1px;
		};
`

const TabBorder = styled.div`
		position: absolute;
		background: white;
		> div {
				width: 100%;
				height: 100%;
		};
		&:first-child {
				${({ $position }) => $position === 'left' ? `
						left: calc(-100vw + 2px);
						width: 100vw;
						border-top: ${C.BORDER};
						border-bottom: 2px solid transparent;
						${C.IS_DESKTOP} {
								height: calc(100% + 4px);
						};
						${C.IS_MOBILE} {
								height: calc(100% + 2px);
								border-width: 1px;
						};
				` : `
						pointer-events: none;
						${C.IS_DESKTOP} {
								left: -30px;
						};
						${C.IS_MOBILE} {
								left: -25px;
						};
						> div {
								border-radius: 0 0 30px 0;
								border-right: ${C.BORDER};
								border-bottom: ${C.BORDER};
								${C.IS_MOBILE} {
										border-width: 1px;
										border-radius: 0 0 25px 0;
								};
						};
				`};
		};
		&:last-child {
				${({ $position }) => $position === 'right' ? `
						right: calc(-100vw + 2px);
						width: 100vw;
						border-top: ${C.BORDER};
						border-bottom: 2px solid transparent;
						${C.IS_DESKTOP} {
								height: calc(100% + 4px);
						};
						${C.IS_MOBILE} {
								height: calc(100% + 2px);
								border-width: 1px;
						};
			` : `
						pointer-events: none;
						${C.IS_DESKTOP} {
								right: -30px;
						};
						${C.IS_MOBILE} {
								right: -25px;
						};
						> div {
								border-radius: 0 0 0 30px;
								border-left: ${C.BORDER};
								border-bottom: ${C.BORDER};
								${C.IS_MOBILE} {
										border-width: 1px;
										border-radius: 0 0 0 25px;
								};
						};
			`};
		};
		${C.IS_DESKTOP} {
				bottom: -2px;
				height: 30px;
				width: 30px;
		};
		${C.IS_MOBILE} {
				bottom: -1px;
				height: 25px;
				width: 25px;
		};
`

const TabHeading = styled.h3`
		${C.HEADING_STYLES};
		${C.IS_MOBILE} {
				font-size: 22px;
				line-height: normal;
		};
`

export { Navigation }