import { useState, memo } from 'react'
import { useConfigurationContext, useLoadingContext } from '../../contexts'
import { Emits } from '../../sockets'
import SettingsBlock from './'
import _ from 'lodash'
import { F } from '../../utils'

const LightBlock = memo(function LightBlock() {
	const { configuration } = useConfigurationContext()
	const { setLoading } = useLoadingContext()
	const { lightSettings } = configuration
	const { allMode, allSettings, moodPresets, dynamicPresets, areas } = lightSettings
	const { updateConfiguration, previewConfiguration } = Emits
	const [selectedAreaId, setSelectedAreaId] = useState(localStorage.getItem('selected-area-id') || areas?.[0]?._id)
		const selectedArea = F.findSelectedArea({ areas, allMode, allSettings, selectedAreaId })

		if (!selectedAreaId || !selectedArea) return null

		const timerIsActive = selectedArea?.timer?.active || lightSettings.timer?.active
		const snoozeState = selectedArea?.timer?.active ? selectedArea?.timer?.snooze : (lightSettings.timer?.active && lightSettings.timer?.snooze)
		const timerIcon = timerIsActive ? (snoozeState ? 'snooze' : 'wake') : 'timer'

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
			newSettings.areas = [{ _id: selectedAreaId, [key]: value }]
		}

		updateConfiguration({ lightSettings: newSettings })
	}

	const onSliderChange = (key, val) => {
		const updatedSettings = _.cloneDeep(lightSettings)

		if (allMode) {
			updatedSettings.allSettings[key] = val
		} else {
				updatedSettings.areas.map(area => {
				if (area._id === selectedAreaId) {
					area[key] = val
				}

				return area
			})
		}

		previewConfiguration({ ...configuration, lightSettings: updatedSettings })
	}

	const leftSectionParams = {
		title: 'mood',
		selectParams: {
			options: moodPresets,
			value: selectedArea?.mood,
			onChange: val => onChange(val, 'mood')
		},
		sliderParams: [{
			label: 'brightness',
			value: selectedArea?.brightness,
			onChange: val => onChange(val, 'brightness'),
			onSlide: val => onSliderChange('brightness', val)
		}]
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
		},
			timerIcon
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
		sliderParams: [{
			label: 'speed',
			value: selectedArea?.speed,
			onChange: val => onChange(val, 'speed'),
			onSlide: val => onSliderChange('speed', val)
		}]
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