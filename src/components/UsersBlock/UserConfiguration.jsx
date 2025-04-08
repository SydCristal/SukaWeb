import styled from 'styled-components'
import { C } from '../../utils'
import { Switch, Input } from '../Common'
import { useUsersContext } from '../../contexts'
import { EditableList } from './'

const UserConfiguration = ({ isEdited, ownerId, highlightDisabled }) => {
		const { editedList, configuration, setConfiguration } = useUsersContext()
		const { lightSettings, instalationSettings, preview } = configuration || {
				lightSettings: {}, instalationSettings: {}, preview: {} }
		const lightSettingsEnabled = lightSettings?.enabled !== undefined ? lightSettings?.enabled : Boolean(lightSettings)
		const instalationSettingsEnabled = instalationSettings?.enabled !== undefined ? instalationSettings?.enabled : Boolean(instalationSettings)
		const previerwEnabled = preview?.enabled
		console.log(configuration)

		const toggleLightSettingsEnabled = () => {
				setConfiguration({ ...configuration, lightSettings: { ...lightSettings || {}, enabled: !lightSettingsEnabled }})
		}

		const toggleInstalationSettingsEnabled = () => {
				setConfiguration({ ...configuration, instalationSettings: { ...instalationSettings || {}, enabled: !instalationSettingsEnabled } })
		}

		const togglePreviewEnabled = () => {
				setConfiguration({ ...configuration, preview: { ...preview || {}, enabled: !previerwEnabled } })
		}

		const lightListProps = {
				userId: ownerId,
				section: 'lightSettings',
				className: lightSettingsEnabled ? '' : 'collapsed'
		}

		const instalationListProps = {
				userId: ownerId,
				section: 'instalationSettings',
				className: instalationSettingsEnabled ? '' : 'collapsed'
		}

		const switchProps = {
				disabled: editedList,
				highlightLabel: highlightDisabled
		}

		const previewDurationInputProps = {
				onlyInteger: true,
				value: preview?.duration || 0,
				onChange: value => {
						setConfiguration({ ...configuration, preview: { ...preview, duration: value } })
				},
				label: 'duration'
		}

		return (
				<StlUserConfiguration className={isEdited ? '' : 'collapsed'}>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>preview</SectionSettingsHeading>
										<Switch value={previerwEnabled} onChange={togglePreviewEnabled} label={previerwEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<InputContainer className={isEdited && previerwEnabled ? '' : 'collapsed'}>
										<Input {...previewDurationInputProps}></Input>
										<label>sec</label>
								</InputContainer>
						</SectionSettingsBlock>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>light settings</SectionSettingsHeading>
										<Switch {...switchProps} value={lightSettingsEnabled} onChange={toggleLightSettingsEnabled} label={lightSettingsEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<EditableList {...lightListProps} listName='areas' heading='areas' />
								<EditableList {...lightListProps} listName='dynamicPresets' heading='dynamic' iconIsAssignable={true} />
								<EditableList {...lightListProps} listName='moodPresets' heading='mood' iconIsAssignable={true} />
						</SectionSettingsBlock>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>instalation settings</SectionSettingsHeading>
										<Switch {...switchProps} value={instalationSettingsEnabled} onChange={toggleInstalationSettingsEnabled} label={instalationSettingsEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<EditableList {...instalationListProps} listName='instalations' heading='instalations' />
								<EditableList {...instalationListProps} listName='scenePresets' heading='scene' iconIsAssignable={true} />
								<EditableList {...instalationListProps} listName='soundDesignPresets' heading='sound design' iconIsAssignable={true} />
						</SectionSettingsBlock>
				</StlUserConfiguration>
		)
}

const InputContainer = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		transition: all 0.3s;
		overflow: hidden;
		opacity: 1;
		${C.IS_DESKTOP} {
				height: 31px;
		};
		${C.IS_MOBILE} {
				height: 22px;
		};
		&.collapsed {
				height: 0;
				padding: 0;
				opacity: 0;
		};
		> input {
				${C.IS_DESKTOP} {
						margin: 0 30px 0 6px;
						border: ${C.BORDER};
						padding: 0 15px;
						height: 31px;
						flex: 1;
						font-size: 20px;
				};
				${C.IS_MOBILE} {
						margin: 0 10px 0 0;
						padding: 0 10px;
						height: 22px;
						font-size: 16px;
				};
				min-height: 22px;
				text-align: left;
		};
		> label {
				text-align: left;
				${C.IS_DESKTOP} {
						width: 67px;
						font-size: 20px;
				};
				${C.IS_MOBILE} {
						width: 49px;
				};
		};
`

const StlUserConfiguration = styled.div`
		overflow: hidden;
		transition: height 0.3s;
		display: flex;
		flex-direction: column;
		width: 100%;
`

const SectionSettingsBlock = styled.div`
		width: 100%;
`

const SectionHeadingRow = styled.div`
		transition: all 0.3s;
		overflow: hidden;
		opacity: 1;
		.collapsed & {
				height: 0;
				padding: 0;
				opacity: 0;
		};
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 5px;
		${C.IS_DESKTOP} {
				padding-bottom: 10px;
				height: 53px;
		};
		${C.IS_MOBILE} {
				padding-bottom: 5px;
				height: 35px;
		};
		& > :last-child {
				flex-direction: row-reverse;
				span {
						margin-top: 0;
						margin-right: 10px;
				};
		};
`

const SectionSettingsHeading = styled.h3`
		font-weight: 500;
		font-family: outfit;
		margin: 0;
		${C.IS_DESKTOP} {
				padding-left: 23px;
				line-height: 38px;
				font-size: 30px;
		};
		${C.IS_MOBILE} {
				padding-left: 11px;
				font-size: 23px;
		};
`

export {	UserConfiguration }