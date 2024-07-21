import styled from 'styled-components'
import { C } from '../../utils'
import { Switch } from '../Common'
import { useUsersContext } from '../../contexts'
import { EditableList } from './'

const UserConfiguration = ({ isEdited, ownerId }) => {
		const { editedList, configuration, setConfiguration } = useUsersContext()
		const { lightSettings, instalationSettings } = configuration || { lightSettings: {}, instalationSettings: {} }
		const lightSettingsEnabled = lightSettings?.enabled !== undefined ? lightSettings?.enabled : Boolean(lightSettings)
		const instalationSettingsEnabled = instalationSettings?.enabled !== undefined ? instalationSettings?.enabled : Boolean(instalationSettings)

		const toggleLightSettingsEnabled = () => {
				setConfiguration({ ...configuration, lightSettings: { ...lightSettings || {}, enabled: !lightSettingsEnabled }})
		}

		const toggleInstalationSettingsEnabled = () => {
				setConfiguration({ ...configuration, instalationSettings: { ...instalationSettings || {}, enabled: !instalationSettingsEnabled } })
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

		return (
				<StlUserConfiguration className={isEdited ? '' : 'collapsed'}>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>light settings</SectionSettingsHeading>
										<Switch disabled={editedList} value={lightSettingsEnabled} onChange={toggleLightSettingsEnabled} label={lightSettingsEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<EditableList {...lightListProps} listName='areas' heading='areas' />
								<EditableList {...lightListProps} listName='dynamicPresets' heading='dynamic' iconIsAssignable={true} />
								<EditableList {...lightListProps} listName='moodPresets' heading='mood' iconIsAssignable={true} />
						</SectionSettingsBlock>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>instalation settings</SectionSettingsHeading>
										<Switch disabled={editedList} value={instalationSettingsEnabled} onChange={toggleInstalationSettingsEnabled} label={instalationSettingsEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<EditableList {...instalationListProps} listName='instalations' heading='instalations' />
								<EditableList {...instalationListProps} listName='scenePresets' heading='scene' iconIsAssignable={true} />
								<EditableList {...instalationListProps} listName='soundDesignPresets' heading='sound design' iconIsAssignable={true} />
						</SectionSettingsBlock>
				</StlUserConfiguration>
		)
}

const StlUserConfiguration = styled.div`
		overflow: hidden;
		transition: height 0.3s;
		display: flex;
		flex-direction: column;
		width: 100%;
		${C.IS_DESKTOP} {
		};
		${C.IS_MOBILE} {
		};
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
		padding-bottom: 10px;
		padding-top: 5px;
		height: 53px;
		& > :last-child {
				flex-direction: row-reverse;
				span {
						margin-top: 0;
						margin-right: 10px;
				};
		}
`

const SectionSettingsHeading = styled.h3`
		font-size: 30px;
		font-weight: 500;
		font-family: outfit;
		padding-left: 23px;
		margin: 0;
`

export {	UserConfiguration }