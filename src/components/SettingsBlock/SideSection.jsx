import styled from 'styled-components'
import { C } from '../../utils'
import { Select, Switch, Slider } from '../Common'

const SideSection = ({ title, selectParams, switchParams, sliderParams }) => {
		return (
				<StlSideSection>
						<Heading>{title}</Heading>
						<SelectContainer>
								<Select {...selectParams} />
								{switchParams && <div />}
								{switchParams && <Switch {...switchParams} />}
						</SelectContainer>
						<Slider {...sliderParams} />
				</StlSideSection>
		)
}

const StlSideSection = styled.section`
		border: ${C.BORDER};
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		${C.IS_DESKTOP} {
				height: 606px;
				border-radius: 30px;
				max-width: ${C.MAX_SIDE_WIDTH};
				min-width: ${C.MIN_SIDE_WIDTH};
				width: 100%;
				padding: 32px 32px 92px 32px;
		};
		${C.IS_MOBILE} {
				padding: 8px 20px 20px;
				margin-bottom: 13px;
				max-width: 342px;
				height: 187px;
				border-width: 1px;
				border-radius: 15px;
				&:last-child {
						margin-top: 0px;
						margin-bottom: 44px;
				}
		}
`

const Heading = styled.h2`
		${C.HEADING_STYLES};
		${C.IS_DESKTOP} {
				margin-bottom: 90px;
		};
		${C.IS_MOBILE} {
				font-size: 22px;
				line-height: normal;
				margin-bottom: 14px;
		};
`

const SelectContainer = styled.div`
		${C.IS_DESKTOP} {
				> *:first-child { margin-bottom: 32px; }
		};
		${C.IS_MOBILE} {
				width: 100%;	
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				> *:nth-child(2) {
						flex: 1;
				};
				> *:nth-child(3) {
						position: relative;
						margin-right: 10px;
						> span {
								position: absolute;
								top: 100%;
								left: 50%;
								transform: translateX(-50%);
								max-width: 70px;
						};
				};
		};
`

export { SideSection }