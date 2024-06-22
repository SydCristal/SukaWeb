import { css } from 'styled-components'

export const SERVER_URL = 'http://localhost:8080'
export const API_URL = `${SERVER_URL}/api`
export const PUBLIC_URL = process.env.PUBLIC_URL

export const MIN_DESKTOP_WIDTH = '1140px'
export const MIN_MOBILE_WIDTH = '393px'
export const PAGE_PADDING = '5%'
export const COLOR_BLACK = 'rgba(26, 29, 28, 1)'
export const BORDER = `2px solid ${COLOR_BLACK}`
export const PLACEHOLDER_COLOR = 'rgba(179, 179, 179, 1)'
export const SIDE_BLOCK_WIDTH = '350px'
export const HEADING_STYLES = css`
		font-family: Outfit;
		font-size: 27px;
		line-height: 34px;
		margin: 0;
`
export const LABEL_STYLES = css`
		font-size: 18px;
`
export const SETTINGS_BLOCK_STYLES = css`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
`
export const CENTRAL_AREA_WIDTH = '312px'

export const INVERT_ON_HOVER = css`
	border-color: ${COLOR_BLACK};
	filter: invert(0);
	transition: all 0.3s;
	&:hover {
		border-color: white;
		filter: invert(1);
	};
`

export const IS_MOBILE = `@media (max-width: calc(${MIN_DESKTOP_WIDTH} - 1px))`
export const IS_DESKTOP = `@media (min-width: ${MIN_DESKTOP_WIDTH})`