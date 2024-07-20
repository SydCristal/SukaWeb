import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { useState, useEffect } from 'react'
import { Input, Switch, EditControls } from '../Common'
import { useUsersContext } from '../../contexts'
import { Emits } from '../../sockets'
import { UserConfiguration } from './'

const UserRecord = ({ userName = '', password = '', active, isNew = false, _id, setNewUser, configuration }) => {
		const { users } = useUsersContext()
		const [isEditing, setIsEditing] = useState(isNew)
		const [userNameValue, setUserNameValue] = useState(userName)
		const [passwordValue, setPasswordValue] = useState(password)
		const [userNameIsNotUnique, setUserNameIsNotUnique] = useState(false)
		const [userNameIsNotValid, setUserNameIsNotValid] = useState(false)
		const [passwordIsNotValid, setPasswordIsNotValid] = useState(false)
		const [userConfiguration, setUserConfiguration] = useState(configuration)

		useEffect(() => {
				console.log(configuration);
				setUserConfiguration(configuration)
		}, [configuration])

		const validate = () => {
				const userNameIsUnique = !users.find(user => user.userName === userNameValue && user._id !== _id)
				const userNameIsValid = userNameValue.length >= 3
				const passWordIsValid = passwordValue.length >= 6

				setUserNameIsNotValid(!userNameIsValid)
				setUserNameIsNotUnique(!userNameIsUnique)
				setPasswordIsNotValid(!passWordIsValid)

				return userNameIsUnique && passWordIsValid
		}

		const saveChanges = () => {
				if (validate()) {
						let newUsers

						if (!isNew) {
								newUsers = users.map(user => user._id === _id ? { userName: userNameValue, password: passwordValue, active, _id } : user)
								setIsEditing(false)
						} else {
								newUsers = [...users, { userName: userNameValue, password: passwordValue, active: true }]
								setNewUser(null)
						}

						//Emits.updateUsers(newUsers)
				}
		}

		const discardChanges = () => {
				setUserNameValue(userName)
				setPasswordValue(password)
				setIsEditing(false)
				setUserNameIsNotUnique(false)
				setPasswordIsNotValid(false)
		}

		const editUser = () => {
				setIsEditing(true)

				Emits.requestConfiguration(_id)
		}

		const deleteUser = () => {
				if (!isNew) {
						//Emits.updateUsers(users.filter(user => user._id !== _id))
				} else {
						setNewUser(null)
				}
		}

		const onChangePassword = password => {
				setPasswordValue(password)
				setPasswordIsNotValid(false)
		}

		const onChangeUserName = userName => {
				setUserNameValue(userName)
				setUserNameIsNotUnique(false)
		}

		const onToggleActive = () => {
				//Emits.updateUsers(users.map(user => user._id === _id ? { ...user, active: !active } : user))
		}

		return (
				<StlUserRecord $active={active || isNew}>
						<div>
								<UserNameContainer>
										<ValidationTip>
												{userNameIsNotUnique && 'User name is not unique'}
												{userNameIsNotValid && 'User name must contain atleast 3 symbols'}
										</ValidationTip>
										{isEditing ?
												<UserNameInput $highlighted={userNameIsNotUnique} value={userNameValue} onChange={onChangeUserName} placeholder='set user name' /> :
												<UserUserName $active={active}>{userNameValue}</UserUserName>}
								</UserNameContainer>
								{!isNew && <Switch value={active} onChange={onToggleActive} label={active ? 'active' : 'inactive'} />}
						</div>
						<div>
								<UserNameContainer>
										{isEditing ?
												<UserNameInput $highlighted={passwordIsNotValid} value={passwordValue} onChange={onChangePassword} placeholder='set password' /> :
												<UserUserName $active={active}>{passwordValue}</UserUserName>}
										<ValidationTip>
												{passwordIsNotValid && 'Password must contain atleast 6 symbols'}
										</ValidationTip>
								</UserNameContainer>
								<EditControls
										isEditing={isEditing}
										disabled={!passwordValue || !userNameValue}
										editRecord={editUser}
										saveChanges={saveChanges}
										discardChanges={discardChanges}
										deleteRecord={deleteUser}
										isNew={isNew} />
						</div>
						<UserConfiguration isDisplayed={isEditing} {...userConfiguration} />
				</StlUserRecord>
		)
}

const userNameStyles = css`
	border: ${C.BORDER};
	text-align: left;
	margin: 0;
	font-family: Outfit;
	${C.IS_DESKTOP} {
		height: 48px;
		font-size: 27px;
		padding: 5px 23px;
		border-radius: 50px;
	};
	${C.IS_MOBILE} {
		border-width: 1px;
		min-height: 27px;
		height: 27px;
		font-size: 14px;
		padding: 4px 13px;
		border-radius: 17px;
	};
`

const StlUserRecord = styled.div`
	border: ${C.BORDER};
	${({ $active }) => $active ? `border-color: ${C.COLOR_BLACK}` : `border-color: #B3B3B3`};
	transition: border-color 0.5s;
	${C.IS_DESKTOP} {
		border-radius: 30px;
		padding: 21px 36px 21px 15px;
		width: 614px;
		min-height: 219px;
		margin-bottom: 17px;
		height: fit-content;
	};
	${C.IS_MOBILE} {
		border-width: 1px;
		border-radius: 17px;
		padding: 10px;
		width: 342px;
		height: 122px;
		margin-bottom: 15px;
	};
	> div {
		height: fit-content;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		&:first-child {
			${C.IS_DESKTOP} {
				margin-bottom: 20px;
			};
			${C.IS_MOBILE} {
				margin-bottom: 10px;
			};
			align-items: flex-start;
			> div:not(:first-child) {
				flex-direction: row-reverse;
				> span {
					margin-right: 10px;
					margin-top: 0px;
				};
				${C.IS_MOBILE} {
					> div {
						margin: 0;
						width: 36px;
						height: 22px;
						border-radius: 28px;
						> div {
							width: 16px;
							height: 16px;
							transform: translateX(${({ $active }) => $active ? '' : '-'}7px);
						};
					};
					> span {
						margin-right: 5px;
						font-size: 12px;
					};
				};
			};
		};
		&:nth-child(2) {
			align-items: flex-end;
			margin-bottom: 5px;
			${C.IS_MOBILE} {
				> div:first-child {
					flex: 1;
				};
			};
		};
		&:last-child {
				flex-direction: column;
		};
	};
`

const UserNameContainer = styled.div`
	${C.IS_DESKTOP} {
		width: 400px;
		min-height: 74px;
	};
	${C.IS_MOBILE} {
		width: 200px;
		height: 45px;
	};
	display: flex;
	flex-direction: column;
		> h4 {
			${userNameStyles};
			border-color: transparent;
		};
		> input {
			${userNameStyles};
		};
`

const UserUserName = styled.h4`
	margin: 0;
	font-size: 26px;
	margin: 0;
	opacity: ${({ $active }) => $active ? 1 : 0.5};
	transition: opacity 0.5s;
	${C.IS_MOBILE} {
		font-size: 14px;
	};
`

const UserNameInput = styled(Input)`
	height: 45px;
	min-height: 45px;
	font-size: 26px;
	width: 100%;
	margin: 0;
	${({ $highlighted }) => $highlighted && 'border-color: red !important'};
	${C.IS_MOBILE} {
		height: 35px;
		min-height: 35px;
		font-size: 18px;
		max-width: 175px;
	};
`

const ValidationTip = styled.p`
	display: block;
	color: red;
	margin: 0px;
	${C.IS_DESKTOP} {
		min-height: 16px;
		text-align: center;
		font-size: 13px;
		line-height: 16px;
		&:first-child {
			margin-bottom: 10px;
		};
		&:last-child {
			margin-top: 10px;
		};
	};
	${C.IS_MOBILE} {
		height: 12px;
		text-align: left;
		font-size: 11px;
		line-height: 12px;
		margin-left: 14px;
		&:first-child {
			margin-bottom: 5px;
		};
		&:last-child {
			margin-top: 5px;
		};
	};
`

export { UserRecord }