import { useConfigurationContext, useTimerModalContext, useSectionContext } from '../../contexts'
import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { Timer } from '../Common'

const TimerModal = () => {
	const { configuration } = useConfigurationContext()
	const { timerModal, setTimerModal } = useTimerModalContext()
	const { section } = useSectionContext()

	if (!timerModal || (section !== 'light' && section !== 'instalations')) return null

	const selectedBlock = section === 'light' ? configuration.lightSettings : configuration.instalationSettings
	const blockTimerSettings = { objectType: section, ...selectedBlock }
	const selectedObject = section === 'light' ? F.findSelectedArea({ ...selectedBlock }) : F.findSelectedInstalation({ ...selectedBlock })
	const objectTimerSettings = { objectType: section === 'light' ? 'area' : 'insyalation', ...selectedObject }

	console.log(selectedBlock);
	console.log(selectedObject);

	return (
		<TimerModalShadow onPointerDown={() => setTimerModal(false)}>
			<StlTimerModal onPointerDown={e => e.stopPropagation()}>
				<Timer {...blockTimerSettings} />
				<Timer {...objectTimerSettings} />
			</StlTimerModal>
		</TimerModalShadow>
	)

}

const TimerModalShadow = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 4;
	display: flex;
	align-items: center;
	justify-content: center;
`

const StlTimerModal = styled.div`
	${C.IS_DESKTOP} {
		width: 420px;
		height: 350px;
	};
	${C.IS_MOBILE} {
		width: 400px;
		height: 320px;
	};
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border: ${C.BORDER};
	border-radius: 30px;
	padding: 25px 25px;

`

export default TimerModal