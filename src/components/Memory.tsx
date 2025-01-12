import { Button, Form, Radio, Typography } from 'antd';
import { useState } from 'react';

type digit = 1 | 2 | 3 | 4;

type State = {
	screen: digit;
	keys: digit[];
	historyPos: digit[];
	historyVal: digit[];
	result?: digit | -1;
};

const Memory = () => {
	const defaultState: State = {
		screen: 1,
		keys: [1, 1, 1, 1],
		historyPos: [],
		historyVal: [],
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });

	const calculateStepResult = () => {
		if (new Set(state.keys).size !== 4) return setState({ ...state, result: -1 });
		const step = state.historyPos.length + 1;
		const s = state.screen,
			k = state.keys,
			hp = state.historyPos,
			hv = state.historyVal;
		const inc = (n: number) => (n + 1) as digit;
		let pos: digit = 1,
			val: digit = 1;
		if (step === 1) {
			if (s === 1) [pos, val] = [2, k[1]];
			if (s === 2) [pos, val] = [2, k[1]];
			if (s === 3) [pos, val] = [3, k[2]];
			if (s === 4) [pos, val] = [4, k[3]];
		}
		if (step === 2) {
			if (s === 1) [pos, val] = [inc(k.indexOf(4)), 4];
			if (s === 2) [pos, val] = [inc(hp[0]), k[hp[0]]];
			if (s === 3) [pos, val] = [1, k[0]];
			if (s === 4) [pos, val] = [inc(hp[0]), k[hp[0]]];
		}
		if (step === 3) {
			if (s === 1) [pos, val] = [inc(k.indexOf(hv[1])), hv[1]];
			if (s === 2) [pos, val] = [inc(k.indexOf(hv[0])), hv[0]];
			if (s === 3) [pos, val] = [3, k[2]];
			if (s === 4) [pos, val] = [inc(k.indexOf(4)), 4];
		}
		if (step === 4) {
			if (s === 1) [pos, val] = [inc(hp[0]), k[hp[0]]];
			if (s === 2) [pos, val] = [1, k[0]];
			if (s === 3) [pos, val] = [inc(hp[1]), k[hp[1]]];
			if (s === 4) [pos, val] = [inc(hp[1]), k[hp[1]]];
		}
		if (step === 5) {
			if (s === 1) [pos, val] = [inc(k.indexOf(hv[0])), hv[0]];
			if (s === 2) [pos, val] = [inc(k.indexOf(hv[1])), hv[1]];
			if (s === 3) [pos, val] = [inc(k.indexOf(hv[3])), hv[3]];
			if (s === 4) [pos, val] = [inc(k.indexOf(hv[2])), hv[2]];
		}
		state.historyPos.push(pos);
		state.historyVal.push(val);
		setState({ ...state, result: val });
	};

	return (
		<>
			<Form
				layout="horizontal"
				initialValues={state}
				onValuesChange={(_, values) => updateState(values)}
				key={JSON.stringify(state)}
			>
				{state.historyPos.length < 5 && (
					<>
						<Form.Item>
							<Typography.Title>Шаг {state.historyPos.length + 1}</Typography.Title>
						</Form.Item>
						<Form.Item label="Число на экране" name="screen">
							<Radio.Group>
								{[1, 2, 3, 4].map((n) => (
									<Radio.Button key={'screen' + n} value={n}>
										{n}
									</Radio.Button>
								))}
							</Radio.Group>
						</Form.Item>
						<Form.Item label="Числа на кнопках">
							{state.keys.map((_, i) => (
								<Form.Item label={`Число ${i + 1}`} name={['keys', i]}>
									<Radio.Group>
										{[1, 2, 3, 4].map((n) => (
											<Radio.Button key={`keys_${i}_${n}`} value={n}>
												{n}
											</Radio.Button>
										))}
									</Radio.Group>
								</Form.Item>
							))}
						</Form.Item>
					</>
				)}

				<Form.Item>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						<Button
							type="primary"
							onClick={calculateStepResult}
							style={{ width: 172 }}
							disabled={state.historyPos.length >= 5}
						>
							Подсчитать шаг
						</Button>
						<Button
							variant="outlined"
							color="danger"
							onClick={clearState}
							style={{ width: 172 }}
						>
							Очистить форму
						</Button>
					</div>
				</Form.Item>
				{state.result !== undefined && state.result !== -1 && (
					<Form.Item>
						<Typography.Text strong>Нужно кликнуть {state.result}-ю кнопку</Typography.Text>
						{state.historyPos.length >= 5 && (
							<Typography.Text strong>. Конец.</Typography.Text>
						)}
					</Form.Item>
				)}
				{state.result !== undefined && state.result === -1 && (
					<Form.Item>
						<Typography.Text strong>Числа на кнопках не могут повторяться</Typography.Text>
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default Memory;
