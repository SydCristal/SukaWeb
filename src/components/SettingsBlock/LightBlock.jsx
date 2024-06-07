import { useState, memo } from 'react'
import { useConfigurationContext, useLoadingContext } from '../../contexts'
import { Emits } from '../../sockets'
import SettingsBlock from './'

const LightBlock = memo(function LightBlock() {
		const { configuration } = useConfigurationContext()
		const { setLoading } = useLoadingContext()
		const { lightSettings } = configuration
		const { allMode, allSettings, moodPresets, dynamicPresets, areas } = lightSettings
		const { updateConfiguration } = Emits
		const [selectedAreaId, setSelectedAreaId] = useState(localStorage.getItem('selected-area-id') || areas?.[0]?._id)
		const findSelectedArea = () => {
				if (!selectedAreaId && !allMode) return null
				return allMode ? allSettings : areas.find(({ _id }) => _id === selectedAreaId)
		}
		const selectedArea = findSelectedArea()

		if (!selectedAreaId || !selectedArea) return null

		const onSelectArea = id => {
				localStorage.setItem('selected-area-id', id)
				setSelectedAreaId(id)
		}

		const onChange = (value, key) => {
				setLoading(true)
				const newSettings = {}
				if (key === 'allMode') {
						newSettings.allMode = value
				} else if (allMode) {
						newSettings.allSettings = { [key]: value }
				} else if (selectedAreaId) {
						newSettings.area = { _id: selectedAreaId, [key]: value }
				}

				updateConfiguration({ lightSettings: newSettings })
		}

		const leftSectionParams = {
				title: 'mood',
				selectParams: {
						options: moodPresets,
						value: selectedArea?.mood,
						onChange: val => onChange(val, 'mood')
				},
				sliderParams: {
						label: 'brightness',
						value: selectedArea?.brightness,
						onChange: val => onChange(val, 'brightness')
				}
		}

		const middleSectionParams = {
				selectParams: {
						label: 'choose area',
						options: areas,
						value: selectedAreaId,
						onChange: onSelectArea,
						disabled: allMode
				},
				toggleParams: {
						value: allMode,
						onClick: () => onChange(!allMode, 'allMode'),
				},
				switchParams: {
						value: selectedArea?.active,
						onChange: val => onChange(val, 'active')
				}
		}

		const rightSectionParams = {
				title: 'dynamic',
				selectParams: {
						options: dynamicPresets,
						value: selectedArea?.dynamic,
						onChange: val => onChange(val, 'dynamic')
				},
				switchParams: {
						label: 'audio reactive',
						value: selectedArea?.audioReactive,
						onChange: val => onChange(val, 'audioReactive')
				},
				sliderParams: {
						label: 'speed',
						value: selectedArea?.speed,
						onChange: val => onChange(val, 'speed')
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

export { LightBlock }