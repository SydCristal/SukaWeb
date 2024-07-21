import { F, C } from '../../utils'
import styled from 'styled-components'

const EditControls = ({ isEdited, saveChanges, editDisabled, saveDisabled, discardChanges, deleteRecord, editRecord, isNew, className }) => {
		if (isEdited) {
				return (
						<StlEditControls className={className}>
								<ControlButton onClick={saveChanges} disabled={saveDisabled}>
										<img src={F.getUrl('icons', 'save', false)} alt='save' />
								</ControlButton>
								{!isNew ?
										<ControlButton onClick={discardChanges}>
												<img src={F.getUrl('icons', 'cancel', false)} alt='save' />
										</ControlButton> :
										<ControlButton onClick={deleteRecord}>
												<img src={F.getUrl('icons', 'delete', false)} alt='save' />
										</ControlButton>}
						</StlEditControls>
				)
		}

		return (
				<StlEditControls className={className}>
						<ControlButton onClick={editRecord} disabled={editDisabled}>
								<img src={F.getUrl('icons', 'edit', false)} alt='save' />
						</ControlButton>
						<ControlButton onClick={deleteRecord} disabled={editDisabled}>
								<img src={F.getUrl('icons', 'delete', false)} alt='save' />
						</ControlButton>
				</StlEditControls>
		)
}

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

const StlEditControls = styled.div`
	display: flex;
	flex-direction: row;
`

export { EditControls }