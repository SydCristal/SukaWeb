import styled from 'styled-components'
import { useLoadingContext } from '../../contexts'
import { Input } from '../Common'
import { useState } from 'react'
import { C, F } from '../../utils'
import { Emits } from '../../sockets'

const LoginPage = ({ loginError, setLoginError, passwordError, setPasswordError }) => {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const { setLoading } = useLoadingContext()

	const submit = () => {
		setLoading(true)
		Emits.connect({ userName, password })
	}

	const onChangeUserName = name => {
		setLoginError(null)
		setUserName(name)
	}

	const onChangeParssword = password => {
		setPasswordError(null)
		setPassword(password)
	}

	return (
		<LoginForm>
			<div>
				<LoginIcon src={F.getUrl('icons', 'login', false)} alt='login'/>
				<LoginTitle src={F.getUrl('icons', 'title', false)} alt='suka-rental' />
			</div>
			<div>
				<LoginHeading>hey there!</LoginHeading>
				<ErrorContainer>
					{loginError === 'USER_NOT_FOUND' && 'user not found'}
					{loginError === 'USER_IS_INACTIVE' && 'user is innactive'}
				</ErrorContainer>
				<InputGroup>
					<Input
						$highlighted={loginError}
						value={userName}
						onChange={onChangeUserName}
						placeholder='login' />
					<Input
						$highlighted={passwordError}
						value={password}
						onChange={onChangeParssword}
						placeholder='password' />
				</InputGroup>
				<ErrorContainer>
					{passwordError === 'PASSWORD_IS_INCORRECT' && 'password is incorrect'}
					{passwordError === 'GUEST_IS_INACTIVE' && 'guest is innactive'}
				</ErrorContainer>
				<Submit
					type='button'
					onClick={submit}>
					Submit
				</Submit>
			</div>
		</LoginForm>
	)
}

const LoginForm = styled.form`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		margin: 70px auto;
		> div {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
		};
		${C.IS_DESKTOP} {
				width: 100%;
				max-height: 534px;
				min-width: fit-content;
		};
		${C.IS_MOBILE} {
				padding: 0 50px;
				max-height: 460px;
				width: 393px;
		};
`

const LoginIcon = styled.img`
		margin-bottom: 21px;
		${C.IS_DESKTOP} {
				width: 70px;
				height: 70px;
		};
		${C.IS_MOBILE} {
				width: 52px;
				height: 52px;
		};
`

const LoginTitle = styled.img`
		width: 125px;
		height: 19px;
		margin-bottom: 50px;
`

const LoginHeading = styled.h2`
		font-family: Outfit;
		${C.IS_DESKTOP} {
				font-size: 29.36px;
				line-height: 37px;
				margin: 0 0 15px 0;
		};
		${C.IS_MOBILE} {
				font-size: 22px;
				margin: 0 0 15px 0;
		};
`

const InputGroup = styled.div`
		display: flex;
		flex-direction: column;
		${C.IS_DESKTOP} {
			margin: 5px 0;
				margin-bottom: 5px;
				> *:not(:last-child) {
						margin-bottom: 15px;
				};
		};
		${C.IS_MOBILE} {
				width: 100%;
				> *:not(:last-child) {
						margin-bottom: 11px;
				};
		};
`

const ErrorContainer = styled.div`
	height: 20px;
	margin: 5px auto;
	color: red;
`

const Submit = styled.button`
		background-color: ${C.COLOR_BLACK};
		text-align: center;
		color: white;
		cursor: pointer;
		${C.IS_DESKTOP} {
				margin-top: 10px;
				width: 188px;
				height: 57px;
				border-radius: 26.7px;
				border: 1.33px solid ${C.COLOR_BLACK};
				font-size: 21.36px;
				line-height: 25.85px;
		};
		${C.IS_MOBILE} {
				margin-top: 5px;
				width: 141px;
				height: 43px;
				border-radius: 20px;
				border-width: 1px;
				font-size: 16px;
		};
`

export default LoginPage