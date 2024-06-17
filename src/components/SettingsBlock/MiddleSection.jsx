import styled from 'styled-components'
import { C } from '../../utils'
import { Select, Switch } from '../Common'

const MiddleSection = params => {
		const { selectParams, toggleParams, switchParams } = params

		return (
				<StlMiddleSection>
						<div>
								<SelectContainer>
										<Select {...selectParams} />
								</SelectContainer>
								<Toggle {...toggleParams}>
										all
								</Toggle>
						</div>
						<Switch {...switchParams} vertical={true} />
				</StlMiddleSection>
		)
}

const StlMiddleSection = styled.section`
	 > div {
				display: flex;
				flex-direction: column;
				align-items: center;
		};
		${C.IS_MOBILE} {
				display: none;
				&:first-child {
						width: 100%;
						padding: 15px;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 35px;
				};
		};
		${C.IS_DESKTOP} {
				min-width: ${C.CENTRAL_AREA_WIDTH};
				margin: 0 32px;
				padding-top: 86px;
				flex-direction: column;
				align-items: center;
				display: flex;
				&:first-child {
						display: none;
				};
		};
`

const SelectContainer = styled.div`
		${C.IS_MOBILE} {
				margin-bottom: 5px;
		};
		${C.IS_DESKTOP} {
				margin-bottom: 16px;
		};
`

const Toggle = styled.button`
		border: ${C.BORDER} ${C.COLOR_BLACK};
		${C.IS_DESKTOP} {
				width: 128px;
				height: 54px;
				border-radius: 36px;
				margin-bottom: 28px;
				font-size: 28px;
		};
		${C.IS_MOBILE} {
				width: 62px;
				height: 25px;
				border-radius: 20px;
				border-width: 1px;
				font-size: 16px;
		};
		align-items: center;
		justify-content: center;
		display: flex;
		cursor: pointer;
		transition: background 0.5s, color 0.5s;
		${({ value }) => value ? `
				background: ${C.COLOR_BLACK};
				color: white;
		` : `
				background: white;
		`};
`

export { MiddleSection }