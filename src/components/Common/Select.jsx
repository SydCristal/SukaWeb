import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import	{ C } from '../../utils'

const Select = ({ label, options, value, onChange, disabled }) => {
		const [increment, setIncrement] = useState(0)
		const selectRef = useRef(null)
		const selectedOptionRef = useRef(null)
		const prevOptionRef = useRef(null)
		const transitionRef = useRef(false)
		disabled = disabled || !(options?.length > 1)
		const selectedIndex = options.findIndex(({ _id }) => _id === value)
		let prevIndex = selectedIndex - increment

		if (prevIndex < 0) prevIndex = options.length - 1
		if (prevIndex >= options.length) prevIndex = 0

		useEffect(() => {
				const optionNodes = selectRef.current?.children
				if (!optionNodes) return
				let inc = increment
				const prevI = prevOptionRef.current?.attributes?.$index?.value

				if (!inc) {
						if (prevI === selectedIndex) {
								prevOptionRef.current = optionNodes[selectedIndex]
								return
						}
						inc = prevI < selectedIndex ? 1 : -1
						setIncrement(inc)
				}
				
				prevOptionRef.current = selectedOptionRef.current || optionNodes[prevIndex]
				selectedOptionRef.current = optionNodes[selectedIndex]
				const prevOption = prevOptionRef.current
				const selectedOption = selectedOptionRef.current

				prevOption.style = css({
						zIndex: 2,
						transform: `translateX(${-increment * 100}%)`,
						transition: 'transform 0.5s ease-in-out',
						left: 0
				}).join('; ')

				if (prevOption === selectedOption) return

				transitionRef.current = true

				selectedOption.style = css({
						zIndex: 1,
						transform: `translateX(${-increment * 100}%)`,
						transition: 'transform 0.5s ease-in-out',
						left: `${increment * 100}%`
				}).join('; ')

				setTimeout(() => {
						setIncrement(-1)
						transitionRef.current	= false
						prevOption.style = css({
								transform: `translateX(0%)`,
								transition: 'none',
								zIndex: 0,
								left: 0
						}).join('; ')

						selectedOption.style = css({
								left: 0,
								transform: `translateX(0%)`,
								transition: 'none',
								zIndex: 1,
						}).join('; ')
				}, 500)
		}, [value])

		const onClick = increment => {
				if (disabled || transitionRef.current) return
				setIncrement(increment)
				let newIndex = selectedIndex + increment
				if (newIndex < 0) newIndex = options.length - 1
				if (newIndex >= options.length) newIndex = 0
				onChange(options[newIndex]._id)
		}

		return (
				<SelectContainer $disabled={disabled}>
						{label && <SelectLabel>{label}</SelectLabel>}
						<StlSelect>
								<SelectControl $disabled={disabled} onClick={() => onClick(1)} />
								<SelectInput ref={selectRef}>
										{options.map(({ _id, name }, i) => (
												<SelectOption key={_id} $selected={_id === value} $index={i}>
														{name}
												</SelectOption>
										))}
								</SelectInput>
								<SelectControl $disabled={disabled} onClick={() => onClick(-1)} />
						</StlSelect>
				</SelectContainer>
		)
}

const SelectContainer = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: opacity 0.5s ease-in-out;
		opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
		${C.IS_DESKTOP} {
				width: ${C.CENTRAL_AREA_WIDTH};
		};
		${C.IS_MOBILE} {
				width: 203px;
		};
`

const SelectLabel = styled.div`
		${C.IS_DESKTOP} {
				margin-bottom: 22px;
				font-size: 22px;
				line-height: 26px;
		};
		${C.IS_MOBILE} {
				margin-bottom: 9px;
				font-size: 14px;
				line-height: normal;
		};
`

const StlSelect = styled.div`
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
`

const SelectInput = styled.div`
		overflow: hidden;
		border: ${C.BORDER};
		position: relative;
		${C.IS_DESKTOP} {
				border-radius: 36px;
				margin: 0 10px;
				width: 272px;
				height: 76px;
		};
		${C.IS_MOBILE} {
				border-radius: 20px;
				margin: 0 7px;
				border-width: 1px;
				width: 153px;
				height: 44px;
		};
`

const SelectControl = styled.div`
		${C.IS_DESKTOP} {
				width: 44px;
				height: 44px;
		};
		${C.IS_MOBILE} {
				width: 24px;
				height: 24px;
		};
		display: flex;
		flex-direction: row;
		cursor: ${({ $disabled }) => $disabled ? 'default' : 'pointer'};
		&:after {
				content: '';
				box-sizing: border-box;
				${C.IS_DESKTOP} {
						height: 44px;
						border: 22px solid transparent;
				};
				${C.IS_MOBILE} {
						height: 24px;
						border: 12px solid transparent;
				};
		};
		&:first-child {
			justify-content: flex-end;
			&:after {
						${C.IS_DESKTOP} {
								border-right: 38px solid ${C.COLOR_BLACK};
						};
						${C.IS_MOBILE} {
								border-right: 21px solid ${C.COLOR_BLACK};
						};
				};
		};
		&:last-child {
			justify-content: flex-start;
			&:after {
						${C.IS_DESKTOP} {
								border-left: 38px solid ${C.COLOR_BLACK};
						};
						${C.IS_MOBILE} {
								border-left: 21px solid ${C.COLOR_BLACK};
						};
				};
		};
`

const SelectOption = styled.div`
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background: white;
		align-items: center;
		justify-content: center;
		display: flex;
		z-index: ${({ $selected }) => $selected ? 1 : 0};
		${C.IS_DESKTOP} {
				font-size: 28px;
		};
		${C.IS_MOBILE} {
				font-size: 16px;
		};
`

export { Select }