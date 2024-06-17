﻿import styled from 'styled-components'
import { useLoadingContext } from '../../contexts'
import { Input } from '../Common'
import { useState } from 'react'
import { C, F } from '../../utils'
import { Emits } from '../../sockets'

const LoginPage = () => {
		const [userName, setUserName] = useState('Syd Cristal')
		const [password, setPassword] = useState('HOBOROBOT666')
		const { setLoading } = useLoadingContext()

		const submit = () => {
				setLoading(true)
				Emits.connect({ userName, password })
		}

		const onLogoClick = () => {
				console.log('Zorg!');
				Emits.connect({ newUser: { userName, password } })
		}

		return (
				<LoginForm>
						<div>
								<LoginIcon src={F.getUrl('icons', 'login', false)} alt='login' onClick={onLogoClick} />
								<LoginTitle src={F.getUrl('icons', 'title', false)} alt='suka-rental' />
						</div>
						<div>
								<LoginHeading>hey there!</LoginHeading>
								<InputGroup>
										<Input
												value={userName}
												onChange={setUserName}
												placeholder='login' />
										<Input
												value={password}
												onChange={setPassword}
												placeholder='password' />
								</InputGroup>
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
				margin: 0 0 34px 0;
		};
		${C.IS_MOBILE} {
				font-size: 22px;
				margin: 0 0 25px 0;
		};
`

const InputGroup = styled.div`
		display: flex;
		flex-direction: column;
		${C.IS_DESKTOP} {
				margin-bottom: 54px;
				> *:not(:last-child) {
						margin-bottom: 15px;
				};
		};
		${C.IS_MOBILE} {
				width: 100%;
				margin-bottom: 40px;
				> *:not(:last-child) {
						margin-bottom: 11px;
				};
		};
`

const Submit = styled.button`
		background-color: ${C.COLOR_BLACK};
		text-align: center;
		color: white;
		cursor: pointer;
		${C.IS_DESKTOP} {
				width: 188px;
				height: 57px;
				border-radius: 26.7px;
				border: 1.33px solid ${C.COLOR_BLACK};
				font-size: 21.36px;
				line-height: 25.85px;
		};
		${C.IS_MOBILE} {
				width: 141px;
				height: 43px; 
				border-radius: 20px; 
				border-width: 1px;
				font-size: 16px; 
		};
`

export default LoginPage