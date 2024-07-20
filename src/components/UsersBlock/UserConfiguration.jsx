import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { useState, useEffect } from 'react'
import { Switch } from '../Common'
import { useUsersContext } from '../../contexts'
import { EditableList } from './'

const UserConfiguration = ({ isDisplayed, ownerId, ...configuration }) => {
		const [lightSettings, setLightSettings] = useState(configuration.lightSettings)
		const [lightSettingsEnabled, setLightSettingsEnabled] = useState()
		const [instalationSettings, setInstalationSettings] = useState(configuration.instalationSettings)
		const [instalationSettingsEnabled, setInstalationSettingsEnabled] = useState()
		console.log(isDisplayed, lightSettings, instalationSettings, ownerId)

		useEffect(() => {
				if (lightSettings === undefined && configuration.lightSettings) {
						setLightSettings(configuration.lightSettings)
						setLightSettingsEnabled(true)
				}

				if (instalationSettings === undefined && configuration.instalationSettings) {
						setInstalationSettings(configuration.instalationSettings)
						setInstalationSettingsEnabled(true)
				}
		}, [configuration])

		const setAreas = areas => {
				setLightSettings({ ...lightSettings || {}, areas })
		}

		const setDynamicPresets = dynamicPresets => {
				setLightSettings({ ...lightSettings || {}, dynamicPresets })
		}

		const setMoodPresets = moodPresets => {
				setLightSettings({ ...lightSettings || {}, moodPresets })
		}

		const setInstalations = instalations => {
				setInstalationSettings({ ...instalationSettings || {}, instalations })
		}

		const setScenePresets = scenePresets => {
				setInstalationSettings({ ...instalationSettings || {}, scenePresets })
		}

		const setSoundDesignPresets = soundDesignPresets => {
				setInstalationSettings({ ...instalationSettings || {}, soundDesignPresets })
		}

		return (
				<StlUserConfiguration className={isDisplayed ? '' : 'collapsed'}>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>light settings</SectionSettingsHeading>
										<Switch value={lightSettingsEnabled} onChange={() => setLightSettingsEnabled(!lightSettingsEnabled)} label={lightSettingsEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<EditableList className={lightSettingsEnabled ? '' : 'collapsed'} records={lightSettings?.areas || []} heading='areas' setRecords={setAreas} />
								<EditableList className={lightSettingsEnabled ? '' : 'collapsed'} records={lightSettings?.dynamicPresets || []} heading='dynamic' setRecords={setDynamicPresets} iconIsAssignable={true} />
								<EditableList className={lightSettingsEnabled ? '' : 'collapsed'} records={lightSettings?.moodPresets || []} heading='mood' setRecords={setMoodPresets} iconIsAssignable={true} />
						</SectionSettingsBlock>
						<SectionSettingsBlock>
								<SectionHeadingRow>
										<SectionSettingsHeading>instalation settings</SectionSettingsHeading>
										<Switch value={instalationSettingsEnabled} onChange={() => setInstalationSettingsEnabled(!instalationSettingsEnabled)} label={instalationSettingsEnabled ? 'enabled' : 'disabled'} />
								</SectionHeadingRow>
								<EditableList className={instalationSettingsEnabled ? '' : 'collapsed'} records={instalationSettings?.instalations || []} heading='areas' setRecords={setInstalations} />
								<EditableList className={instalationSettingsEnabled ? '' : 'collapsed'} records={instalationSettings?.scenePresets || []} heading='scene' setRecords={setScenePresets} iconIsAssignable={true} />
								<EditableList className={instalationSettingsEnabled ? '' : 'collapsed'} records={instalationSettings?.soundDesignPresets || []} heading='sound design' setRecords={setSoundDesignPresets} iconIsAssignable={true} />
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
		font-weight: 400;
		font-family: outfit;
		padding-left: 23px;
		margin: 0;
`

export {	UserConfiguration }