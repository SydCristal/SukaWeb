import styled, { css } from 'styled-components'
import { C } from '../../utils'

const Switch = ({ label, value, onChange, vertical = false }) => {
	const onClick = () => onChange(!value)

	return (
		<SwitchContainer $vertical={vertical || label}>
			{!label && <SwitchLabel $vertical={vertical}><span>OFF/</span>ON</SwitchLabel>}
			<StlSwitch $vertical={vertical} value={value} onClick={onClick}>
				<div />
			</StlSwitch>
			<SwitchLabel $vertical={vertical} $label={label}>{label || <span>OFF</span>}</SwitchLabel>
		</SwitchContainer>
	)
}

const SwitchContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	${C.IS_DESKTOP} {
		flex-direction: ${({ $vertical }) => $vertical ? 'column' : 'row-reverse'};
	};
	${C.IS_MOBILE} {
		flex-direction: column;
	};
`

const StlSwitch = styled.div`
	border: ${C.BORDER};
	${C.IS_MOBILE} {
		margin: 5px auto;
		border-width: 1px;
	};
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ value }) => value ? C.COLOR_BLACK : 'white'};
	transition: background 0.3s;
	cursor: pointer;
	>	div {
		${C.IS_DESKTOP} {
			width: 30px;
			height: 30px;
		};
		${C.IS_MOBILE} {
			width: 19px;
			height: 19px;
		};
		border-radius: 50%;
		background: ${({ value }) => value ? 'white' : C.COLOR_BLACK};
		transition: transform 0.3s, background 0.3s;
	};
	${({ $vertical, value }) => {
		return $vertical ? `
			${C.IS_DESKTOP} {
				width: 38px;
				height: 65px;
				> div {
					transform: translateY(${value ? '-' : ''}12px);
				};
			};
			${C.IS_MOBILE} {
				width: 25px;
				height: 43px;
				> div {
					transform: translateY(${value ? '-' : ''}9px);
				};
			};
		` : `
			${C.IS_DESKTOP} {
				width: 65px;
				height: 38px;
				> div {
					transform: translateX(${value ? '' : '-'}12px);
				};
			};
			${C.IS_MOBILE} {
				width: 43px;
				height: 25px;
				> div {
					transform: translateX(${value ? '' : '-'}9px);
				};
			};`
	}};
`

const SwitchLabel = styled.span`
	${C.LABEL_STYLES};
	${C.IS_MOBILE} {
		font-size: 14px;
		line-height: normal;
	};
	height: fit-content;
	min-width: 47px;
	text-align: center;
	&:first-child {
		${C.IS_DESKTOP} {
			${({ $vertical }) => !$vertical ? `text-align: left` : ''};
			margin-${({ $vertical }) => $vertical ? 'bottom: 18px' : 'left: 14px'};
			> span {
				display: none;
			};
		};
		${C.IS_MOBILE} {
			> span { display: ${({ $vertical }) => $vertical ? 'none' : 'auto'}};
		};
	};
	&:last-child {
		${({ $vertical }) => !$vertical && `text-align: right`};
		${C.IS_DESKTOP} {
			margin-${({ $vertical, $label }) => $vertical ? 'top: 18px' : $label ? 'top: 14px' : 'right: 14px'};
		};
		${C.IS_MOBILE} {
			> span { display: ${({ $vertical }) => $vertical ? 'auto' : 'none'}};
		};
	};
`

export { Switch }