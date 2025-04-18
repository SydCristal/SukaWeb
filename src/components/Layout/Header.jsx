import styled, { keyframes } from 'styled-components'
import { C, F } from '../../utils'
import { useConfigurationContext, useLoadingContext, useUsersContext } from '../../contexts'
import { Switch } from '../Common'
import { Emits } from '../../sockets'

const Header = () => {
		const { configuration } = useConfigurationContext()
		const { setLoading } = useLoadingContext()
		const { users } = useUsersContext()
		const { updateConfiguration, disconnect } = Emits
		const { preview } = configuration

		const togglePreview = () => {
				if (!preview?.enabled) return
				updateConfiguration({ preview: { ...preview, active: !preview?.active } })
		}

		const onTogglePower = () => {
				setLoading(true)
				updateConfiguration({ active: !configuration.active })
		}

		const logoClassName = `${preview?.active ? 'active' : ''} ${preview?.enabled ? 'enabled' : ''}`

		return (
				<StlHeader>
						<HeaderSegment>
								{!users && <Switch value={configuration.active} onChange={onTogglePower} />}
						</HeaderSegment>
						<HeaderSegment>
								<img src={F.getUrl('icons', 'suka', false)} onClick={togglePreview} className={logoClassName} alt='suka' />
						</HeaderSegment>
						<HeaderSegment>
								<LogOut onClick={disconnect}>
										<span>LOG OUT</span>
										<img src={F.getUrl('icons', 'logout', false)} alt='logout' />
								</LogOut>
						</HeaderSegment>
				</StlHeader>
		)
}

const StlHeader = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	${C.IS_DESKTOP} {
		width: ${C.MIN_DESKTOP_WIDTH};
		padding: 64px 32px 61px;
		height: 180px;
	};
	${C.IS_MOBILE} {
		min-width: ${C.MIN_MOBILE_WIDTH};
		padding: 64px 25px 30px;
		height: 145px;
	};
	`

const pulse = keyframes`
		0% {
			transform: scale(1);
		}
		70% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
`

const HeaderSegment = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		${C.IS_DESKTOP} {
				height: 44px;
				&:not(:nth-child(2)) {
						width: ${C.SIDE_BLOCK_WIDTH};
				};
				&:nth-child(2) {
						min-width: ${C.CENTRAL_AREA_WIDTH};
						margin: 0 32px;
				};
				> img {
						max-height: 44px;
				};
		};
		${C.IS_MOBILE} {
				&:first-child {
						align-items: flex-start;
				};
				&:last-child {
						align-items: flex-end;
				};
				flex: 1;
				height: 53px;
				> img {
						max-height: 32px;
				};
		};
		> img {
				opacity: 0.5;
				transition: opacity 0.3s;
				transform: scale(1);
				&.enabled {
						opacity: 1;
						cursor: pointer;
						&.active {
								animation: ${pulse} 1s infinite;
						};
				};
		};
};
`

const LogOut = styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.3s;
		${C.IS_MOBILE} {
				flex-direction: column-reverse;
		};
		> span {
				${C.LABEL_STYLES};
				margin-right: 10px;
				color: rgb(0, 0, 0);
				${C.IS_MOBILE} {
						font-size: 10px;
						line-height: normal;
						margin-right: 0;
				};
		};
		> img {
				height: 45px;
				${C.IS_MOBILE} {
						height: 30px;
				};
		};
		&:hover {
				opacity: 1;
		};
`

export { Header }