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
						{sliderParams?.length ? sliderParams.map(params => <Slider {...params} key={params.label} />) : null}
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
				height: 572px;
				border-radius: 30px;
				width: ${C.SIDE_BLOCK_WIDTH};
				padding: 26px 32px;
		};
		${C.IS_MOBILE} {
				padding: 8px 20px 20px;
				margin-bottom: 13px;
				max-width: 342px;
				min-height: 187px;
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
				margin-bottom: 21px;
		};
		${C.IS_MOBILE} {
				font-size: 22px;
				line-height: normal;
				margin-bottom: 14px;
		};
`

const SelectContainer = styled.div`
		${C.IS_DESKTOP} {
				height: 155px;
				margin-bottom: 39px;
				> *:first-child { margin-bottom: 27px; }
		};
		${C.IS_MOBILE} {
				width: 100%;	
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin-bottom: 20px;
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
								text-align: center;
						};
				};
		};
`

export { SideSection }