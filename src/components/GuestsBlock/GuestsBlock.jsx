import styled from 'styled-components'
import { C, F } from '../../utils'
import { useGuestsContext } from '../../contexts'
import { GuestRecord } from './'
import { useState } from 'react'

const GuestsBlock = () => {
	const { guests, setGuests } = useGuestsContext()
	const [newGuest, setNewGuest] = useState(null)

	const addNewGuest = () => setNewGuest({ isNew: true })

	return (
		<StlGuestsBlock>
			<AddGuestButton onClick={addNewGuest}>
				<img src={F.getUrl('icons', 'add', false)} alt='add' />
			</AddGuestButton>
			{newGuest && <GuestRecord {...newGuest} setNewGuest={setNewGuest} />}
			{guests && guests.map((guest, index) => <GuestRecord key={index} {...guest} />)}
		</StlGuestsBlock>
	)
}

const StlGuestsBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	${C.IS_MOBILE} {
		width: ${C.MIN_MOBILE_WIDTH};
		padding: 0 25px;
	};
`

const AddGuestButton = styled.button`
	width: 300px;
	padding: 6px;
	border: ${C.BORDER};
	border-radius: 30px;
	background: white;
	cursor: pointer;
	height: 40px;
	margin-bottom: 20px;
	${C.IS_MOBILE} {
		width: 150px;
		height: 30px;
		border-width: 1px;
		margin-bottom: 15px;
	};
	> img {
		height: 100%;
	};
`

export default GuestsBlock