import styled, { css } from 'styled-components'
import { C, F } from '../../utils'
import { Switch } from './'
import { useState } from 'react'
import TimePicker from 'react-awesome-time-picker'
import 'react-awesome-time-picker/assets/index.css'
import moment from 'moment'

const Timer = params => {//({ name = '', onTimer: active, wakeTime, snoozeTime, snooze, onChange }) => {
		//const [active, setActive] = useState(false)
		//const [wakeTime, setWakeTime] = useState(moment().hour(18).minute(0))
		//const [snoozeTime, setSnoozeTime] = useState(moment().hour(0).minute(0))
		//const [snooze, setSnooze] = useState(false)
		const { name, onChange = val => console.log(val), ...timer } = params
		const { active = false, snooze = false, wakeTime = [18, 0], snoozeTime = [0, 0] }	= timer
		const wakeTimeMoment = moment().hour(wakeTime[0]).minute(wakeTime[1])
		const snoozeTimeMoment = moment().hour(snoozeTime[0]).minute(snoozeTime[1])
		const format = 'h:mm a'
		const pickerProps = {
				format,
				showSecond: false,
				use12Hours: true,
		}

		const setActive = () => {
				const newParams = { ...timer, active: !active }
				onChange(newParams)
		}

		const setWakeTime = time => {
				if (!time) time = moment().hour(18).minute(0)
				const newParams = { ...timer, wakeTime: [time.hours(), time.minutes()] }
				onChange(newParams)
		}

		const setSnoozeTime = time => {
				if (!time) time = moment().hour(0).minute(0)
				const newParams = { ...timer, snoozeTime: [time.hours(), time.minutes()] }
				onChange(newParams)
		}

		const setSnooze = () => {
				const newParams = { ...timer, snooze: !snooze }
				onChange(newParams)
		}
	
		return (
			 <StlTimer $name={name}>
						<TimerSwitch onChange={setActive} value={active} label={`${name} timer`} />
						<TimerExpanse $active={active}>
								<TimerContainer>
										<div>
												<label>wake up</label>
												<TimePicker {...pickerProps} value={wakeTimeMoment} onChange={setWakeTime} />
										</div>
										<div>
												<label>snooze</label>
												<TimePicker {...pickerProps} value={snoozeTimeMoment} onChange={setSnoozeTime} />
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
		input {
				border-color: ${C.COLOR_BLACK};
				border-radius: 8px;
				color: ${C.COLOR_BLACK};
		};
		${C.IS_DESKTOP} {
						opacity: ${({ $name }) => $name === 'all' ? 0 :	1};
				};
				${C.IS_MOBILE} {
						display: ${({ $name }) => $name === 'all' ? 'none' :	'flex'};
				};
`

const IconSwitch = styled.div`
		width: 40px;
		height: 40px;
		cursor: pointer;
		position: relative;
		margin: 15px 0 20px;
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
		height: ${({ $active }) => $active ? '75' : '0'}px;
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
						margin: 10px 0 10px;
						height: 38px;
				};
				${C.IS_MOBILE} {
						margin: 10px 0 20px;
						height: 25px;
				};
				&:first-child {
						margin-top: 0px;
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