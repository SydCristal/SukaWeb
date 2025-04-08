import styled from 'styled-components'
import { C } from '../../utils'

const Input = ({ onChange, onlyInteger, ...restProps }) => {
		const inputProps = {
				...restProps,
				onChange: ({ target: { value } }) => {
						if (onlyInteger && (!Number.isInteger(+value) || (+value < 0))) {
								if (!Number.isInteger(+value) || (+value < 0)) return
						}

						onChange(value)
				},
				onBlur: ({ target: { value } }) => {
						onChange(value.trim())
				}
		}

		return (
				<StlInput {...inputProps} />
		)
}

const StlInput = styled.input`
		${({ $highlighted }) => $highlighted && 'border-color: red !important'};
		background-color: transparent;
		text-align: center;
		padding: 0px;
		margin: 0 auto;
		&::placeholder {
				color: ${C.PLACEHOLDER_COLOR};
		};
		&:focus {
				outline: none;
		};
		${C.IS_DESKTOP} {
				border: 1.33px solid;
				border-radius: 26.7px;
				width: 394px;
				min-height: 57px;
				font-size: 21.36px;
				line-height: 25.85px;
		};
		${C.IS_MOBILE} {
				border-width: 1px;
				border-radius: 20px;
				width: 100%;
				min-height: 43px;
				font-size: 16px;
		};
`

export { Input }