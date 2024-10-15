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
						if (recordId && _id === recordId) return { _id: recordId, ...record }
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
		font-family: outfit;
		margin: 0;
		font-weight: 500;
		flex: 1;
		text-align: left;
		${C.IS_DESKTOP} {
				font-size: 27px;
				padding-left: 23px;
		};
		${C.IS_MOBILE} {
				font-size: 22px;
				padding-left: 11px;
		};
`

const NoRecordsTip = styled.span`
		color: red;
		margin: 0 10px;
`

const ListControls = styled.div`
		display: flex;
		flex-direction: row;
		${C.IS_DESKTOP} { opacity: 0; };
		transition: all 0.3s;
		> button {
				${C.IS_DESKTOP} {
						width: 31px;
						height: 31px;
						> img {
								max-height: 16px;
								max-width: 16px;
						};
				};
				${C.IS_MOBILE} {
						width: 22px;
						height: 22px;
						border-radius: 7px;
						border-width: 1px;
						> img {
								max-height: 12px;
								max-width: 12px;
						};
				};
				border-radius: 10px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				background: white;
				&:disabled {
						opacity: 0.5;
						cursor: default;
				};
				&:not(:disabled) {
						${C.INVERT_ON_HOVER};
				};
				&:not(:last-child) {
						margin-right: 5px;
				};
		}
`

const SectionSubHeadingRow = styled.div`
		${SectionSettingsRowStyles};
		${C.IS_DESKTOP} {
				height: 41px;
		};
		${C.IS_MOBILE} {
				height: 37px;
		};
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
		};
`

const AddElementButton = styled.button`
`

export { EditableList }