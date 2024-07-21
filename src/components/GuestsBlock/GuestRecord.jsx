import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { useState } from 'react'
import { Input, Switch, EditControls } from '../Common'
import { useGuestsContext, useConfigurationContext } from '../../contexts'
import { Emits } from '../../sockets'

const GuestRecord = ({ label = '', password = '', active, isNew = false, _id, setNewGuest }) => {
	const { guests } = useGuestsContext()
	const [isEditing, setIsEditing] = useState(isNew)
	const [labelValue, setLabelValue] = useState(label)
	const [passwordValue, setPasswordValue] = useState(password)
	const [labelIsNotUnique, setLabelIsNotUnique] = useState(false)
	const [labelIsNotValid, setLabelIsNotValid] = useState(false)
	const [passwordIsNotUnique, setPasswordIsNotUnique] = useState(false)
	const [passwordIsNotValid, setPasswordIsNotValid] = useState(false)
	const { configuration: { password: masterPassword } } = useConfigurationContext()

	const validate = () => {
		const labelIsUnique = !guests.find(guest => guest.label === labelValue && guest._id !== _id)
		const labelIsValid = labelValue.length >= 3
		const passwordIsUnique = passwordValue !== masterPassword && !guests.find(guest => guest.password === passwordValue && guest._id !== _id)
		const passWordIsValid = passwordValue.length >= 6

		setLabelIsNotValid(!labelIsValid)
		setLabelIsNotUnique(!labelIsUnique)
		setPasswordIsNotUnique(!passwordIsUnique)
		setPasswordIsNotValid(!passWordIsValid)

		return labelIsUnique && passwordIsUnique && passWordIsValid
	}

	const saveChanges = () => {
		if (validate()) {
		  let newGuests

			if (!isNew) {
				newGuests = guests.map(guest => guest._id === _id ? { label: labelValue, password: passwordValue, active, _id } : guest)
				setIsEditing(false)
			} else {
				newGuests = [...guests, { label: labelValue, password: passwordValue, active: true }]
				setNewGuest(null)
			}

			Emits.updateGuests(newGuests)
		}
	}

	const discardChanges = () => {
		setLabelValue(label)
		setPasswordValue(password)
		setIsEditing(false)
		setLabelIsNotUnique(false)
		setPasswordIsNotUnique(false)
		setPasswordIsNotValid(false)
	}

	const editGuest = () => {
		setIsEditing(true)
	}

	const deleteGuest = () => {
		if (!isNew) {
			Emits.updateGuests(guests.filter(guest => guest._id !== _id))
		} else {
			setNewGuest(null) 
		}
	}

	const onChangePassword = password => {
		setPasswordValue(password)
		setPasswordIsNotUnique(false)
		setPasswordIsNotValid(false)
	}

	const onChangeLabel = label => {
		setLabelValue(label)
		setLabelIsNotUnique(false)
	}

	const onToggleActive = () => {
		Emits.updateGuests(guests.map(guest => guest._id === _id ? { ...guest, active: !active } : guest))
	}

	return (
		<StlGuestRecord $active={active || isNew}>
			<div>
				<LabelContainer>
					<ValidationTip>
						{labelIsNotUnique && 'Label is not unique'}
						{labelIsNotValid && 'Label must contain atleast 3 symbols'}
					</ValidationTip>
					{isEditing ?
					<LabelInput $highlighted={labelIsNotUnique} value={labelValue} onChange={onChangeLabel} placeholder='set label' /> :
					<GuestLabel $active={active}>{labelValue}</GuestLabel>}
				</LabelContainer>
				{!isNew && <Switch value={active} onChange={onToggleActive} label={active ? 'active' : 'inactive'} />}
			</div>
			<div>
				<LabelContainer>
					{isEditing ?
					<LabelInput $highlighted={passwordIsNotUnique || passwordIsNotValid} value={passwordValue} onChange={onChangePassword} placeholder='set password' /> :
						<GuestLabel $active={active}>{passwordValue}</GuestLabel>}
					<ValidationTip>
						{passwordIsNotUnique && 'Password is not unique'}
						{passwordIsNotValid && 'Password must contain atleast 6 symbols'}
					</ValidationTip>
							</LabelContainer>
							<EditControls
									isEdited={isEditing}
									editDisabled={false}
									saveDisabled={!passwordValue || !labelValue}
									editRecord={editGuest}
									saveChanges={saveChanges}
									discardChanges={discardChanges}
									deleteRecord={deleteGuest}
									idNew={isNew} />
			</div>
		</StlGuestRecord>
	)
}

const labelStyles = css`
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

const StlGuestRecord = styled.div`
	border: ${C.BORDER};
	${({ $active }) => $active ? `border-color: ${C.COLOR_BLACK}` : `border-color: #B3B3B3`};
	transition: border-color 0.5s;
	${C.IS_DESKTOP} {
		border-radius: 30px;
		padding: 21px 36px 21px 15px;
		width: 614px;
		height: 219px;
		margin-bottom: 17px;
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
		&:last-child {
			align-items: flex-end;
			${C.IS_MOBILE} {
				> div:first-child {
					flex: 1;
				};
			};
		};
	};
`

const LabelContainer = styled.div`
	${C.IS_DESKTOP} {
		width: 360px;
		height: 74px;
	};
	${C.IS_MOBILE} {
		width: 200px;
		height: 45px;
	};
	display: flex;
	flex-direction: column;
		> h4 {
			${labelStyles};
			border-color: transparent;
		};
		> input {
			${labelStyles};
		};
`

const GuestLabel = styled.h4`
	margin: 0;
	font-size: 26px;
	margin: 0;
	opacity: ${({ $active }) => $active ? 1 : 0.5};
	transition: opacity 0.5s;
	${C.IS_MOBILE} {
		font-size: 14px;
	};
`

const LabelInput = styled(Input)`
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

const ControlButton = styled.button`
	width: 40px;
	height: 40px;
	border-radius: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	${C.INVERT_ON_HOVER};
	&:first-child {
		margin-right: 10px;
	};
	> img {
		max-height: 18px;
		max-width: 22px;
	};
	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	};
	${C.IS_MOBILE} {
		width: 22px;
		height: 22px;
		border-width: 1px;
		padding: 4px;
		border-radius: 7px;
		&:first-child {
			margin-right: 7px;
		};
		> img {
			max-height: 10px;
			max-width: 12px;
		};
	};
`

const ValidationTip = styled.p`
	display: block;
	color: red;
	margin: 0px;
	${C.IS_DESKTOP} {
		height: 16px;
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

const GuestControls = styled.div`
	display: flex;
	flex-direction: row;
`

export { GuestRecord }