import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { useState, useEffect } from 'react'
import { EditableRow } from './'

const EditableList = ({ className, records, setRecords, heading, iconIsAssignable = false }) => {
		const [newRecord, setNewRecord] = useState(null)
		const [collapsed, setCollapsed] = useState(false)
		const [editedRecord, setEditedRecord] = useState(null)
		const [recordList, setRecordList] = useState(records)
		console.log(records);

		useEffect(() => {
				setRecordList(records)
		}, [records])

		const onAddRecord = () => {
				setEditedRecord(null)
				setNewRecord({ name: '', isNew: true })
		}

		const validateName = (name, id) => {
				return !recordList.find(record => {
						if (!record._id && record.name === id) return false
						if (record._id	=== id) return false

						return record.name === name
				})
		}

		const saveRecord = ({ isNew, _id: recordId, ...record }) => {
				if (isNew) {
						setNewRecord(null)
						setRecords([record, ...recordList])
				} else {
						setRecords(recordList.map(({ _id, name, ...r }) => {
								if (_id === recordId) return { recordId, ...record }
								if (!recordId && name === record.name) return { ...record }
								return { _id, name, ...r }
						}))
				}
		}

		const deleteRecord = ({ isNew, ...record }) => {
				if (isNew) {
						setNewRecord(null)
				} else {
						setRecords(recordList.filter(({ _id, name }) => {
								if (record.id) {
										return _id !== record._id
								} else {
									return name !== record.name
								}
						}))
				}
		}

		const editableRowProps = { validateName, saveRecord, deleteRecord, iconIsAssignable }

		return (
				<StlEditableList className={className}>
						<SectionSubHeadingRow>
								<SectionSettingsSubHeading>{heading}</SectionSettingsSubHeading>
								<ListControls>
										<AddElementButton disabled={newRecord || collapsed} onClick={onAddRecord}><img src={F.getUrl('icons', 'add', false)} alt='add' /></AddElementButton>
										<CollapseButton $collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}><img src={F.getUrl('icons', 'collapse', false)} alt='collapse' /></CollapseButton>
								</ListControls>
						</SectionSubHeadingRow>
						<EditableRow className={newRecord && !collapsed ? '' : 'collapsed'} {...newRecord} {...editableRowProps} isEdited={true} editRecord={setNewRecord} />
						{recordList?.map(record => {
								const isEdited = editedRecord === record._id || editedRecord === record.name
								const editRecord = id => {
										setNewRecord(null)
										setEditedRecord(id)
								}
								return <EditableRow className={collapsed ? 'collapsed' : ''} key={record._id || record.name} {...record} {...editableRowProps} isEdited={isEdited} editRecord={editRecord} />
						})}
				</StlEditableList>
		)
}

const StlEditableList = styled.div`
`

const SectionSettingsRowStyles = css`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
		transition: all 0.3s;
		overflow: hidden;
		opacity: 1;
		.collapsed & {
				height: 0;
				padding: 0;
				opacity: 0;
		};
`

const SectionSubHeadingRow = styled.div`
		${SectionSettingsRowStyles};
		height: 41px;
`

const SectionSettingsSubHeading = styled.h4`
		font-size: 27px;
		font-family: outfit;
		margin: 0;
		padding-left: 23px;
`

const ListControls = styled.div`
		display: flex;
		flex-direction: row;
		> button {
				width: 31px;
				height: 31px;
				border-radius: 10px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				background: white;
				${C.INVERT_ON_HOVER};
				&:not(:last-child) {
						margin-right: 5px;
				};
		}
`

const CollapseButton = styled.button`
		> img {
				transform: rotate(${({ $collapsed }) => $collapsed ? '0deg' : '180deg'});
				transition: transform 0.3s;
				max-height: 20px;
				max-width: 20px;
		};
`

const AddElementButton = styled.button`
		&:disabled {
				opacity: 0.5;
		};
		>	img {
				max-height: 16px;
				max-width: 16px;
		};
`

export { EditableList }