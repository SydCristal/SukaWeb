import styled from 'styled-components'
import { C, F } from '../../utils'
import { useGuestsContext } from '../../contexts'
import { GuestRecord } from './'

const GuestsBlock = () => {
		const { guests = [], setGuests, editedGuest, setEditedGuest } = useGuestsContext()

		const addNewGuest = () => {
				setGuests([{ label: '', password: '', active: true, isNew: true }, ...guests])
				setEditedGuest('new')
		}

	return (
			<StlGuestsBlock>
					<AddGuestButton onClick={addNewGuest} disabled={editedGuest}>
				<img src={F.getUrl('icons', 'add', false)} alt='add' />
			</AddGuestButton>
			{guests.map(guest => <GuestRecord key={guest._id || 'new'} {...guest} />)}
		</StlGuestsBlock>
	)
}

const StlGuestsBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	${C.IS_DESKTOP} {
		padding-top: 8px;
	};
	${C.IS_MOBILE} {
		width: ${C.MIN_MOBILE_WIDTH};
		padding: 29px 25px 0;
	};
`

const AddGuestButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border: ${C.BORDER};
	border-radius: 30px;
	background: white;
	cursor: pointer;
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	};
	&:not(:disabled) { ${C.INVERT_ON_HOVER}; };
	${C.IS_DESKTOP} {
		width: 142px;
		height: 64px;
		margin-bottom: 17px;
	};
	${C.IS_MOBILE} {
		width: 71px;
		height: 32px;
		border-width: 1px;
		margin-bottom: 15px;
	};
	> img {
		${C.IS_DESKTOP} {
			height: 26px;
		};
		${C.IS_MOBILE} {
			height: 13px;
		};
	};
`

export default GuestsBlock