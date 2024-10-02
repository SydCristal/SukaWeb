import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { Switch } from './'
import { useState } from 'react'
import TimePicker from 'react-awesome-time-picker'
import 'react-awesome-time-picker/assets/index.css'
import moment from 'moment'

const Timer = ({ name }) => {//({ name = '', onTimer: active, wakeTime, snoozeTime, snooze, onChange }) => {
		const [active, setActive] = useState(false)
		const [wakeTime, setWakeTime] = useState(moment().hour(18).minute(0))
		const [snoozeTime, setSnoozeTime] = useState(moment().hour(0).minute(0))
		const [snooze, setSnooze] = useState(false)
		const format = 'h:mm a'
		const pickerProps = {
				format,
				showSecond: false,
				use12Hours: true,
		}
	
		return (
			 <StlTimer $name={name}>
						<TimerSwitch onChange={setActive} value={active} label={`${name} timer`} />
						<TimerExpanse $active={active}>
								<TimerContainer>
										<div>
												<label>wake up</label>
												<TimePicker {...pickerProps} value={wakeTime} onChange={setWakeTime} />
										</div>
										<div>
												<label>snooze</label>
												<TimePicker {...pickerProps} value={snoozeTime} onChange={setSnoozeTime} />
										</div>
								</TimerContainer>
								<IconSwitch onClick={() => setSnooze(!snooze)} $snooze={snooze}>
										<img src={F.getUrl('icons', 'preset1', false)} alt='snooze' />
										<img src={F.getUrl('icons', 'preset3', false)} alt='wake' />
								</IconSwitch>
						</TimerExpanse>
				</StlTimer>
		)
}

const StlTimer = styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
		opacity: ${({ $name }) => $name === 'all' ? 0 :	1};
`

const IconSwitch = styled.div`
		width: 40px;
		height: 40px;
		cursor: pointer;
		position: relative;
		margin: 15px 0 25px;
		> img {
				position: absolute;
				width: 40px;
				height: 40px;
				bottom: 0;
				right: 0;
				transition: opacity 0.3s;
				&:first-child {
						${({ $snooze }) => $snooze ? 'opacity: 1;' : 'opacity: 0;touch-events: none'};
				};
				&:lastt-child {
						${({ $snooze }) => !$snooze ? 'opacity: 1;' : 'opacity: 0;touch-events: none'};
				};
		};
`

const TimerExpanse = styled.div`
		height: ${({ $active }) => $active ? '80' : '0'}px;
		pointer-eventa: ${({ $active }) => $active ? 'auto' : 'none'};
		padding: 0 15px;
		overflow: hidden;
		transition: height 0.3s;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
`

const TimerContainer = styled.div`
		display: flex;
		flex-direction: column;
		height: 70px;
		align-items: flex-start;
		> div {
				height: 30px;
				margin-bottom: 10px;
		};
		label {
				display: inline-block;
				width: 65px;
				margin-right: 10px;
				text-align: right;
		};
`

const TimerSwitch = styled(Switch)`
		&& {
				display: flex;
				flex: 1;
				flex-direction: row-reverse;
				justify-content: space-between;
				width: 100%;
				> div {
						margin: 0;
				};
				${C.IS_DESKTOP} {
						margin: 10px 0 20px;
						height: 38px;
				};
				${C.IS_MOBILE} {
						margin: 10px 0 20px;
						height: 25px;
				};
				> span {
						margin-top: 0;
						${C.IS_DESKTOP} {
								font-size: 27px;
								line-height: 34px;
								font-family: Outfit;
						};
						${C.IS_MOBILE} {
								font-size: 22px;
								font-weight: 500;
								line-height: normal;
						};
				};
		};
`

export { Timer }