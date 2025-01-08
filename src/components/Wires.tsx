import { Button, Checkbox, Form, Radio, Typography } from 'antd';
import { useState } from 'react';

type Color = 'red' | 'blue' | 'yellow' | 'black' | 'white';

type State = {
	n_wires: number;
	colors: Color[];
	serialLastDigitOdd: boolean;
	result?: number;
};

const Wires = () => {
	const defaultState: State = {
		n_wires: 3,
		colors: [],
		serialLastDigitOdd: false,
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });

	const calculateResult = () => {
		const result = (() => {
			const r3 = state.colors[2] === 'red';
			const r4 = state.colors[3] === 'red';
			const w3 = state.colors[2] === 'white';
			const b3 = state.colors[2] === 'blue';
			const y4 = state.colors[3] === 'yellow';
			const bk5 = state.colors[4] === 'black';
			const rt = state.colors.filter((color) => color === 'red').length;
			const wt = state.colors.filter((color) => color === 'white').length;
			const bt = state.colors.filter((color) => color === 'blue').length;
			const yt = state.colors.filter((color) => color === 'yellow').length;
			const bkt = state.colors.filter((color) => color === 'black').length;
			const s = state.serialLastDigitOdd;

			if (state.n_wires == 3) {
				if (rt === 0) return 2;
				if (w3) return 3;
				if (bt > 1) return b3 ? 3 : 2;
				return 3;
			}
			if (state.n_wires == 4) {
				if (rt > 1 && s) return r4 ? 4 : r3 ? 3 : 2;
				if (y4 && rt === 0) return 1;
				if (bt === 1) return 1;
				if (yt > 1) return 4;
				return 2;
			}
			if (state.n_wires == 5) {
				if (bk5 && s) return 4;
				if (rt === 1 && yt > 1) return 1;
				if (bkt === 0) return 2;
				return 1;
			}
			if (state.n_wires == 6) {
				if (yt === 0 && s) return 3;
				if (yt === 1 && wt > 1) return 4;
				if (rt === 0) return 6;
				return 4;
			}
		})();
		setState({ ...state, result });
	};

	return (
		<>
			<Form
				layout="horizontal"
				initialValues={state}
				onValuesChange={(_, values) => updateState(values)}
				key={JSON.stringify(state)}
			>
				<Form.Item label="Количество проводов" name="n_wires">
					<Radio.Group>
						{[3, 4, 5, 6].map((n) => (
							<Radio.Button key={'n_wires_' + n} value={n}>
								{n}
							</Radio.Button>
						))}
					</Radio.Group>
				</Form.Item>
				{state.n_wires > 3 && (
					<Form.Item
						label="последняя цифра серийного номера нечетная"
						name="serialLastDigitOdd"
						valuePropName="checked"
					>
						<Checkbox />
					</Form.Item>
				)}
				{Array.from({ length: state.n_wires }, (_, i) => (
					<Form.Item key={i} label={`Провод ${i + 1}`} name={['colors', i]}>
						<Radio.Group>
							{['red', 'blue', 'yellow', 'black', 'white'].map((color) => (
								<Radio.Button
									key={`color_${i}_${color}`}
									value={color}
									checked={state.colors[i] === color}
								>
									<div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
										<div
											style={{
												backgroundColor: color,
												width: 24,
												height: 24,
												borderRadius: '50%',
												border: color === 'white' ? '1px solid black' : 'none',
											}}
										/>
									</div>
								</Radio.Button>
							))}
						</Radio.Group>
					</Form.Item>
				))}
				<Form.Item>
					<div style={{ display: 'flex', gap: 12 }}>
						<Button type="primary" onClick={calculateResult}>
							Подсчитать результат
						</Button>
						<Button variant="outlined" color="danger" onClick={clearState}>
							Очистить форму
						</Button>
					</div>
				</Form.Item>
				{state.result !== undefined && (
					<Form.Item>
						<Typography.Text strong>Нужно резать {state.result}-й провод</Typography.Text>
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default Wires;
