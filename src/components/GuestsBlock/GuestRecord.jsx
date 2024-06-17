import styled from 'styled-components'
import { C, F } from '../../utils'
import { useState } from 'react'
import { Input, Switch } from '../Common'
import { useGuestsContext } from '../../contexts'
import { Emits } from '../../sockets'

const GuestRecord = ({ label = 'new guest', password = '', active, isNew = false, _id, setNewGuest }) => {
	const { guests, setGuests } = useGuestsContext()
	const [isEditing, setIsEditing] = useState(isNew)
	const [labelValue, setLabelValue] = useState(label)
	const [passwordValue, setPasswordValue] = useState(password)
	const [labelIsNotUnique, setLabelIsNotUnique] = useState(false)
	const [passwordIsNotUnique, setPasswordIsNotUnique] = useState(false)
	const [passwordIsNotValid, setPasswordIsNotValid] = useState(false)

	const validate = () => {
		const labelIsUnique = !guests.find(guest => guest.label === labelValue && guest._id !== _id)
		const passwordIsUnique = !guests.find(guest => guest.password === passwordValue && guest._id !== _id)
		const passWordIsValid = passwordValue.length >= 6

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
		<StlGuestRecord>
			<div>
				{isEditing ?
				<LabelInput value={labelValue} onChange={onChangeLabel} /> :
				<GuestLabel $active={active}>{labelValue}</GuestLabel>}
				{!isNew && <Switch value={active} onChange={onToggleActive} label={active ? 'active' : 'inactive'} />}
			</div>
			<div>
				{isEditing ?
				<LabelInput value={passwordValue} onChange={onChangePassword} placeholder='set password' /> :
				<GuestLabel $active={active}>{passwordValue}</GuestLabel>}
				{isEditing ?
					<GuestControls>
						<ControlButton onClick={saveChanges} disabled={!passwordValue || !labelValue}>
						<img src={F.getUrl('icons', 'save', false)} alt='save' />
					</ControlButton>
					{!isNew ?
					<ControlButton onClick={discardChanges}>
						<img src={F.getUrl('icons', 'cancel', false)} alt='save' />
					</ControlButton> :
					<ControlButton onClick={deleteGuest}>
						<img src={F.getUrl('icons', 'delete', false)} alt='save' />
					</ControlButton>}
				</GuestControls> :
				<GuestControls>
					<ControlButton onClick={editGuest}>
						<img src={F.getUrl('icons', 'edit', false)} alt='save' />
					</ControlButton>
					<ControlButton onClick={deleteGuest}>
						<img src={F.getUrl('icons', 'delete', false)} alt='save' />
					</ControlButton>
				</GuestControls>}
			</div>
			{labelIsNotUnique && <ValidationTip>Label is not unique</ValidationTip>}
			{passwordIsNotUnique && <ValidationTip>Password is not unique</ValidationTip>}
			{passwordIsNotValid && <ValidationTip>Password is not valid</ValidationTip>}
		</StlGuestRecord>
	)
}

const StlGuestRecord = styled.div`
	border: ${C.BORDER};
	border-radius: 30px;
	padding: 25px 30px;
	padding-bottom: 10px;
	max-width: 600px;
	width: 100%;
	margin-bottom: 20px;
	${C.IS_MOBILE} {
		border-width: 1px;
		padding-top: 10px;
		padding-bottom: 5px;
		margin-bottom: 15px;
	};
	> div {
		height: 45px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		${C.IS_MOBILE} {
			margin-bottom: 10px;
		};
		&:first-child {
			margin-bottom: 20px;
			${C.IS_MOBILE} {
				margin-bottom: 0px;
			};
			> div {
				flex-direction: row-reverse;
				> span {
					margin-right: 10px;
					margin-top: 0px;
					${C.IS_MOBILE} {
						margin-right: 5px;
					};
				};
			};
		};
	};
`

const GuestLabel = styled.h4`
	margin: 0;
	font-size: 26px;
	margin: 0;
	opacity: ${({ $active }) => $active ? 1 : 0.5};
	${C.IS_MOBILE} {
		font-size: 18px;
	};
`

const LabelInput = styled(Input)`
	height: 45px;
	min-height: 45px;
	font-size: 26px;
	width: 250px;
	margin: 0;
	${C.IS_MOBILE} {
		height: 35px;
		min-height: 35px;
		font-size: 18px;
		max-width: 175px;
	};
`

const ControlButton = styled.button`
	width: 35px;
	height: 35px;
	border-radius: 10px;
	cursor: pointer;
	padding: 5px;
	background: white;
	&:first-child {
		margin-right: 10px;
	};
	> img {
		height: 100%;
	};
	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	};
	${C.IS_MOBILE} {
		width: 30px;
		height: 30px;
		border-width: 1px;
		padding: 6px;
	};
`

const ValidationTip = styled.p`
	color: red;
	margin-top: 0px;
	margin-bottom: 5px;
	font-size: 14px;
`

const GuestControls = styled.div``

export { GuestRecord }