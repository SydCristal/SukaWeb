import styled, { css } from 'styled-components'
import { EditControls, Input, Select } from '../Common'
import { useState } from 'react'
import { C, F } from '../../utils'

const EditableRow = ({ editDisabled, className, name = '', _id, isNew = false, icon, validateName, saveRecord, deleteRecord, iconIsAssignable = false, editedRecord, editRecord }) => {
		const [nameValue, setNameValue] = useState(name)
		const [nameIsNotUnique, setNameIsNotUnique] = useState(false)
		const [iconValue, setIconValue] = useState(icon || C.ICON_OPTIONS[0]._id)
		const isEdited = editedRecord === (isNew ? 'new' : (_id || name))

		const saveChanges = () => {
				const nameIsValid = nameValue.length >= 3
				const nameIsUnique = validateName(nameValue, isNew ? 'new' : _id || name)

				setNameIsNotUnique(!nameIsUnique)

				if (nameIsValid && nameIsUnique) {
						const record = { name: nameValue, isNew, _id }
						if (iconIsAssignable) record.icon = iconValue

						saveRecord(record)
						if (isNew) {
								setNameValue('')
								if (iconIsAssignable) setIconValue('')
						}

						editRecord(null)
				}
		}

		const discardChanges = () => {
				editRecord(null)
				setNameValue(name)
				setNameIsNotUnique(false)
				if (iconIsAssignable) setIconValue(icon)
		}

		const onDeleteRecord = () => {
				discardChanges()
				deleteRecord({ name, _id, isNew })
		}

		return (
				<StlEditableRow className={className}>
						{isEdited ? <StlInput value={nameValue} onChange={setNameValue} $highlighted={nameIsNotUnique} /> : <NameContainer>{name}</NameContainer>}
						{iconIsAssignable && isEdited && <IconSelect value={iconValue} onChange={setIconValue} options={C.ICON_OPTIONS} />}
						{icon && !isEdited && < Icon src={F.getUrl('icons', icon, false)} alt={icon} />}
						<StlEditControls
								hidden={editedRecord && !isEdited}
								isEdited={isEdited}
								editDisabled={editedRecord || editDisabled}
								saveDisabled={nameValue.trim().length < 3}
								editRecord={() => editRecord(_id || name)}
								saveChanges={saveChanges}
								discardChanges={discardChanges}
								deleteRecord={onDeleteRecord}
								isNew={isNew} />
				</StlEditableRow>
		)
}

const IconSelect = styled(Select)`
		max-height: 100%;
		margin-right: 10px;
		width: 170px;
		img {
				max-height: 20px;
				max-width: 20px;
		};
`

const Icon = styled.img`
		height: 20px;
		width: 20px;
		margin: 0 85px 0 10px;
`

const StlEditableRow = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 41px;
		padding-bottom: 10px;
		font-size: 22px;
		transition: all 0.3s;
		overflow: hidden;
		opacity: 1;
		&.collapsed,
		.collapsed & {
				height: 0;
				padding: 0;
				opacity: 0;
		};
`

const StlEditControls = styled(EditControls)`
		opacity: ${({ isEdited }) => isEdited ? '1' : '0'};
		${StlEditableRow}:hover & {
				opacity: ${({ hidden }) => hidden ? '0' : '1'};
				> button {
						${({ hidden }) => hidden && 'cursor: default'};
				};
		};
		transition: all 0.3s;
		> button {
				width: 31px;
				height: 31px;
				&:first-child {
						margin-right: 5px;
				};
				> img {
						max-height: 16px;
						max-width: 16px;
				};
		};
`

const NameContainer = styled.div`
		font-size: 20px;
		padding-left: 23px;
		flex: 1;
		text-align: left;
`

const StlInput = styled(Input)`
	height: 31px;
	min-height: 31px;
	font-size: 20px;
	width: 100%;
	margin-left: 6px;
	padding: 0 15px;
	margin-right: 30px;
	text-align: left;
	border-width: 2px;
	opacity: 1;
	transition: all 0.3s;
	.collapsed & {
		opacity: 0;	
	};
	${({ $highlighted }) => $highlighted && 'border-color: red !important; color: red;'};
	${C.IS_MOBILE} {
		height: 35px;
		min-height: 35px;
		font-size: 18px;
		max-width: 175px;
		border-width: 1px;
	};
`



export { EditableRow }