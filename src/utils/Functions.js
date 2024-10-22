import _ from 'lodash'
import { C } from './'

export const arrayToMap = (array, key = '_id') => {
		return _.transform(array, (result, item) => {
				if (item[key]) {
						result[item[key]] = item
				}
		}, {})
}

export const getUrl = (folder, fileName, urlize = true, ext = 'png') => {
		let result = `${C.PUBLIC_URL}/${folder}/${fileName}.${ext}`
		if (urlize) result = `url(${result})`
		return result
}

export const findSelectedArea = ({ areas, allMode, allSettings, selectedAreaId }) => {
		if (!selectedAreaId) selectedAreaId = localStorage.getItem('selected-area-id') || areas?.[0]?._id
		if (!selectedAreaId && areas?.length) return null
		let selectedArea = allMode ? allSettings : areas.find(({ _id }) => _id === selectedAreaId)
		if (!selectedArea) selectedArea = areas[0]
		return selectedArea
}

export const findSelectedInstalation = ({ instalations, allMode, allSettings, selectedInstalationId }) => {
		if (!selectedInstalationId) selectedInstalationId = localStorage.getItem('selected-instalation-id') || instalations?.[0]?._id
		if (!selectedInstalationId && !instalations?.length) return null// && !allMode) return null
		let selectedInstalation = allMode ? allSettings : instalations.find(({ _id }) => _id === selectedInstalationId)
		if (!selectedInstalation) selectedInstalation = instalations[0]
		return selectedInstalation
}