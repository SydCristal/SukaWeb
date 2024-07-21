import styled from 'styled-components'
import { C, F } from '../../utils'
import { useUsersContext } from '../../contexts'
import { UserRecord } from './'

const UsersBlock = () => {
		const { users, setUsers, editedUser, setEditedUser, setConfiguration } = useUsersContext()

		const addNewUser = () => {
				setUsers([{ isNew: true }, ...users])
				setConfiguration({
						lightSettings: {
								areas: [],
								dynamicPresets: [],
								moodPresets: [],
								enabled: false
						},
						instalationSettings: {
								instalations: [],
								scenePresets: [],
								soundDesignPresets: [],
								enabled: false
						}
				})
				setEditedUser('new')
		}

		return (
				<StlUsersBlock>
						<AddUserButton onClick={addNewUser} disabled={editedUser}>
								<img src={F.getUrl('icons', 'add', false)} alt='add' />
						</AddUserButton>
						{users.map(user => <UserRecord
								key={user._id || 'new'}
								{...user} />)}
				</StlUsersBlock>
		)
}

const StlUsersBlock = styled.div`
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

const AddUserButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border: ${C.BORDER};
	border-radius: 30px;
	background: white;
	cursor: pointer;
	opacity: 1;
	transition: opacity 0.3s;
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

export default UsersBlock