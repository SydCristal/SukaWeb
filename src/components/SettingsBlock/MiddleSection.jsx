import styled from 'styled-components'
import { C, F } from '../../utils'
import { Select, Switch } from '../Common'
import { useTimerModalContext } from '../../contexts'

const MiddleSection = params => {
		const { selectParams, toggleParams, switchParams, sectionTimerParams, elementTimerParams, timerIcon } = params
		const { setTimerModal } = useTimerModalContext()

		return (
				<StlMiddleSection>
						<TimerIconContainer>
								<TimerIcon src={F.getUrl('icons', timerIcon, false)} alt='timer' onPointerDown={() => setTimerModal(true)} />
						</TimerIconContainer>
						<ElementContainer>
								<div>
										<SelectContainer>
												<Select {...selectParams} />
										</SelectContainer>
										{toggleParams ? <Toggle {...toggleParams}>
												all
										</Toggle> : null}
								</div>
						<div/>
						<Switch {...switchParams} vertical={true} />
						</ElementContainer>
				</StlMiddleSection>
		)
}

const TimerIconContainer = styled.div`
		${C.IS_DESKTOP} {
				margin-bottom: 10px;
		};
`

const TimerIcon = styled.img`
		width: 50px;
		height: 50px;
		cursor: pointer;
`

const ElementContainer = styled.div`
		width: 100%;
		display: flex;
		>	div {
				display: flex;
				align-items: center;
		};
		${C.IS_MOBILE} {
				width: 100%;
				padding: 15px;
				flex-direction: row;
				justify-content: space-between;
				> div {
						flex-direction: column;
						&:nth-child(2) {
								display: none;
						};
				};
		};
		${C.IS_DESKTOP} {
				align-items: center;
				flex-direction: column;
				justify-content: space-between;
				> div {
						flex-direction: column;
						&:nth-child(2) {
								flex: 1;
						};
						&:first-child {
								margin-bottom: 10px;
						};
				};
				&:last-child {
						height: 100%;
						display: flex;
						flex-direction: column;
				};
				&:first-child {
						display: none;
				};
		};
`

const StlMiddleSection = styled.section`
		display: flex;
		flex-direction: column;
		width: 100%;
		${C.IS_MOBILE} {
				margin: 10px 0 20px;
				display: none;
				&:first-child {
						display: flex;
				};
		};
		${C.IS_DESKTOP} {
				min-width: ${C.CENTRAL_AREA_WIDTH};
				margin: 0 32px;
				> div {
						&:nth-child(2) {
								display: flex;
								flex: 1;
						};
				};
				&:first-child {
						display: none;
				};
		};
`

const SelectContainer = styled.div`
		${C.IS_MOBILE} {
				margin-bottom: 10px;
				height: 70px;
				> div {
					height: 100%;
					justify-content: space-between;
				};
		};
		${C.IS_DESKTOP} {
				margin-bottom: 17px;
				> div {
					height: 106px;
					justify-content: space-between;
				};
		};
`

const Toggle = styled.button`
		border: ${C.BORDER} ${C.COLOR_BLACK};
		${C.IS_DESKTOP} {
				width: 102px;
				height: 45px;
				border-radius: 36px;
				font-size: 20px;
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