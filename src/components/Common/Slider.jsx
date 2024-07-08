import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { C } from '../../utils'

const Slider = ({ label, value, onChange, onSlide }) => {
	const [currentValue, setCurrentValue] = useState(value)
	const [handleShift, setHandleShift] = useState(undefined)
	const [transition, setTransition] = useState(false)
	const wrapperRef = useRef(null)
	const [debounce, setDebounce] = useState(null)

	const adjustHandleShift = value => {
		const decrement = document.documentElement.clientWidth >= parseInt(C.MIN_DESKTOP_WIDTH) ? 18 : 10
		setHandleShift((wrapperRef.current.clientWidth - decrement) / 100 * value)
	}

	useEffect(() => {
		if (handleShift !== undefined) setTransition(true)
		adjustHandleShift(value)
		setCurrentValue(value)
		setTimeout(() => setTransition(false), 300)
	}, [value])

	const sliderProps = {
		type: 'range',
		min: 0,
		max: 100,
		step: 1,
		value: currentValue,
		$transition: transition,
		onChange: ({ target: { value } }) => {
			setCurrentValue(value)
			if (!debounce) {
				setDebounce(true)
				setTimeout(() => setDebounce(false), 100)
				onSlide(value)
			}
		},
		onPointerUp: ({ target: { value } }) => {
			adjustHandleShift(value)
			onChange(value)
		}
	}

	return (
		<SliderContainer>
			<SliderLabel>{label}</SliderLabel>
			<SliderWrapper ref={wrapperRef} $handleShift={handleShift} $transition={transition}>
				<StlSlider {...sliderProps} />
			</SliderWrapper>
		</SliderContainer>
	)
}

const SliderContainer = styled.div`
		margin: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		${C.IS_DESKTOP} {
				max-width: 332px;
				&:not(:last-child) {
						margin-bottom: 15px;
				};
		};
		${C.IS_MOBILE} {
				max-width: 198px;
				&:not(:last-child) {
						margin-bottom: 28px;
				};
		};
`

const SliderLabel = styled.label`
		${C.IS_DESKTOP} {
			font-size: 20px;
			margin-bottom: 10px;
		};
		${C.IS_MOBILE} {
				margin-bottom: 10px;
				font-size: 14px;
				line-height: normal;
		};
`

const sliderThumbStyles = css`
		-webkit-appearance: none;
		cursor: pointer;
		border: none;
		transition: transform 0.3s;
		border-radius: 17px;
		${C.IS_DESKTOP} {
				width: 14px;
				height: 60px;
		};
		${C.IS_MOBILE} {
				width: 8px;
				height: 36px;
		};
`

const SliderWrapper = styled.div`
		width: 100%;
		position: relative;
		${C.IS_DESKTOP} {
				max-width: 332px;
				height: 40px;
		};
		${C.IS_MOBILE} {
				max-width: 198px;
				height: 22px;
		};
		&:before {
				content: '';
				${sliderThumbStyles};
				position: absolute;
				pointer-events: none;
				${C.IS_DESKTOP} {
						left: 2px;
						top: -10px;
				};
				${C.IS_MOBILE} {
						left: 1px;
						top: -7px;
				};
				transform: translateX(${({ $handleShift }) => $handleShift || 0}px);
				${({ $transition }) => $transition ? `
						background: ${C.COLOR_BLACK};
						transition: transform 0.3s;
				` : `
						transition: transform 0s;
						background: transparent;
				`};
		};
`

const StlSlider = styled.input`
		-webkit-appearance: none;
		border: ${C.BORDER};
		margin: 0;
		width: 100%;
		${C.IS_DESKTOP} {
				max-width: 332px;
				height: 40px;
				border-radius: 17px;
		};
		${C.IS_MOBILE} {
				max-width: 198px;
				height: 22px;
				border-width: 1px;
				border-radius: 9.5px;
		};
		&::-ms-thumb{
				${sliderThumbStyles};
				background: ${({ $transition }) => $transition ? 'transparent' : C.COLOR_BLACK};
		};
		&::-moz-range-thumb{
				${sliderThumbStyles};
				background: ${({ $transition }) => $transition ? 'transparent' : C.COLOR_BLACK};
		};
		&::-webkit-slider-thumb {
				${sliderThumbStyles};
				background: ${({ $transition }) => $transition ? 'transparent' : C.COLOR_BLACK};
		};
`

export { Slider }