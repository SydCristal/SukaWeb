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