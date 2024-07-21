import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { useState, useEffect } from 'react'
import { EditableRow } from './'
import { useUsersContext } from '../../contexts'

const EditableList = ({ section, listName, className, heading, iconIsAssignable = false }) => {
		const [collapsed, setCollapsed] = useState(true)
		const { editedList, setEditedList, editedRecord, setEditedRecord, configuration, setConfiguration } = useUsersContext()
		const editDisabled = editedRecord || (editedList && editedList !== heading)
		const records = configuration?.[section]?.[listName] || []
		const setRecords = records => {
				setConfiguration({ ...configuration, [section]: { ...configuration[section], [listName]: records } })
		}

		const onAddRecord = () => {
				setEditedRecord('new')
				setEditedList(heading)
				if (collapsed) setCollapsed(false)
				setRecords([{ name: '', isNew: true }, ...records])
		}

		const validateName = (name, id) => {
				return !records.find(record => {
						if (!record._id && record.name === id) return false
						if (record._id	=== id) return false

						return record.name === name
				})
		}

		const saveRecord = ({ isNew, _id: recordId, ...record }) => {
				setRecords(records.map(({ _id, name, ...r }) => {
						if (_id === recordId) return { recordId, ...record }
						if (isNew && r.isNew) return { ...record }
						if (!recordId && name === record.name) return { ...record }
						return { _id, name, ...r }
				}))
				setEditedList(null)
		}

		const deleteRecord = ({ isNew, ...record }) => {
				if (isNew) {
						setRecords(records.filter(({ isNew }) => !isNew))
				} else {
						setRecords(records.filter(({ _id, name }) => {
								if (record.id) {
										return _id !== record._id
								} else {
										return name !== record.name
								}
						}))
				}
				setEditedList(null)
		}

		const editRecord = id => {
				setEditedRecord(id)
				setEditedList(id ? heading : null)
		}

		const editableRowProps = { validateName, saveRecord, deleteRecord, iconIsAssignable, editedRecord, editRecord, editDisabled }

		return (
				<StlEditableList className={className}>
						<SectionSubHeadingRow>
								<SectionSettingsSubHeading>{heading}</SectionSettingsSubHeading>
								{!records.length && <NoRecordsTip>no records</NoRecordsTip>}
								<ListControls>
										<AddElementButton disabled={editDisabled} onClick={onAddRecord}><img src={F.getUrl('icons', 'add', false)} alt='add' /></AddElementButton>
										<CollapseButton disabled={!records.length || (editedList && editedList === heading)} $collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}><img src={F.getUrl('icons', 'collapse', false)} alt='collapse' /></CollapseButton>
								</ListControls>
						</SectionSubHeadingRow>
						{records?.map(record => (
								<EditableRow
										className={collapsed ? 'collapsed' : ''}
										key={record._id || record.name || 'new'}
										{...record}
										{...editableRowProps} />)
						)}
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

const SectionSettingsSubHeading = styled.h4`
		font-size: 27px;
		font-family: outfit;
		margin: 0;
		padding-left: 23px;
		font-weight: 500;
		flex: 1;
		text-align: left;
`

const NoRecordsTip = styled.span`
		color: red;
		margin: 0 10px;
`

const ListControls = styled.div`
		display: flex;
		flex-direction: row;
		opacity: 0;
		transition: all 0.3s;
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
				&:disabled {
						opacity: 0.5;
				};
				&:not(:last-child) {
						margin-right: 5px;
				};
		}
`

const SectionSubHeadingRow = styled.div`
		${SectionSettingsRowStyles};
		height: 41px;
		&:hover {
				${ListControls} {
						opacity: 1;
				};
		};
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
		>	img {
				max-height: 16px;
				max-width: 16px;
		};
`

export { EditableList }