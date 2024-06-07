import { useState, memo } from 'react'
import { useConfigurationContext, useLoadingContext } from '../../contexts'
import SettingsBlock from './'
import { Emits } from '../../sockets'

const InstalationsBlock = memo(function InstalationsBlock() {
		const { configuration } = useConfigurationContext()
		const { setLoading } = useLoadingContext()
		const { instalationSettings } = configuration
		const { allMode, allSettings, scenePresets, soundDesignPresets, instalations } = instalationSettings
		const { updateConfiguration } = Emits
		const [selectedInstalationId, setSelectedInstalationId] = useState(localStorage.getItem('selected-instalation-id') || instalations?.[0]?._id)
		const findSelectedInstalation = () => {
				if (!selectedInstalationId && !allMode) return null
				return allMode ? allSettings : instalations.find(({ _id }) => _id === selectedInstalationId)
		}
		const selectedInstalation = findSelectedInstalation()

		if (!selectedInstalationId || !selectedInstalation) return null

		const onSelectInstalation = id => {
				localStorage.setItem('selected-instalation-id', id)
				setSelectedInstalationId(id)
		}

		const onChange = (value, key) => {
				setLoading(true)
				const newSettings = {}
				if (key === 'allMode') {
						newSettings.allMode = value
				} else if (allMode) {
						newSettings.allSettings = { [key]: value }
				} else if (selectedInstalationId) {
						newSettings.instalation = { _id: selectedInstalationId, [key]: value }
				}

				updateConfiguration({ instalationSettings: newSettings })
		}

		const leftSectionParams = {
				title: 'scene',
				selectParams: {
						options: scenePresets,
						value: selectedInstalation?.scene,
						onChange: val => onChange(val, 'scene')
				},
				switchParams: {
						label: 'interactive',
						value: selectedInstalation?.interactive,
						onChange: val => onChange(val, 'interactive')
				},
				sliderParams: {
						label: 'intensity',
						value: selectedInstalation?.intensity,
						onChange: val => onChange(val, 'intensity')
				}
		}

		const middleSectionParams = {
				selectParams: {
						label: 'choose instalation',
						options: instalations,
						value: selectedInstalationId,
						onChange: onSelectInstalation,
						disabled: allMode
				},
				toggleParams: {
						value: allMode,
						onClick: () => onChange(!allMode, 'allMode'),
				},
				switchParams: {
						value: selectedInstalation?.active,
						onChange: val => onChange(val, 'active')
				}
		}

		const rightSectionParams = {
				title: 'sound design',
				selectParams: {
						options: soundDesignPresets,
						value: selectedInstalation?.soundDesign,
						onChange: val => onChange(val, 'soundDesign')
				},
				sliderParams: {
						label: 'volume',
						value: selectedInstalation?.volume,
						onChange: val => onChange(val, 'volume')
				}
		}

		const settingsPageParams = {
				leftSectionParams,
				middleSectionParams,
				rightSectionParams
		}

		return (
				<SettingsBlock {...settingsPageParams} />
		)
})

export { InstalationsBlock }