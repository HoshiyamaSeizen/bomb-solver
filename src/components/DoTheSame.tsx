import { Button, Checkbox, Form, Radio, Typography } from 'antd';
import { useState } from 'react';

const allColors = ['red', 'blue', 'yellow', 'green'] as const;
type Color = (typeof allColors)[number];

type State = {
	hasVowel: boolean;
	mistakes: 0 | 1 | 2;
	colors: Color[];
	result?: Color[];
};

const DoTheSame = () => {
	const defaultState: State = {
		hasVowel: false,
		mistakes: 0,
		colors: [],
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });

	const calculateResult = () => {
		if (state.colors.length === 0) return;
		const substitutions: Record<Color, Color[]> = state.hasVowel
			? {
					red: ['blue', 'yellow', 'green'],
					blue: ['red', 'green', 'red'],
					green: ['yellow', 'blue', 'yellow'],
					yellow: ['green', 'red', 'blue'],
			  }
			: {
					red: ['blue', 'red', 'yellow'],
					blue: ['yellow', 'blue', 'green'],
					green: ['green', 'yellow', 'blue'],
					yellow: ['red', 'green', 'red'],
			  };
		setState({ ...state, result: state.colors.map((x) => substitutions[x][state.mistakes]) });
	};
	const setNextStep = () => {
		setState({ ...state, colors: [...state.colors, 'red'], result: undefined });
	};

	return (
		<>
			<Form
				layout="horizontal"
				initialValues={state}
				onValuesChange={(_, values) => updateState(values)}
				key={JSON.stringify(state)}
			>
				<Form.Item label="Количество ошибок" name="mistakes">
					<Radio.Group>
						{[0, 1, 2].map((n) => (
							<Radio.Button key={'mistakes_' + n} value={n}>
								{n}
							</Radio.Button>
						))}
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label="В серийном номере есть хотя бы одна гласная буква: A, E, I, O, U"
					name="hasVowel"
					valuePropName="checked"
				>
					<Checkbox />
				</Form.Item>
				{state.colors.map((selectedColor, i) => (
					<Form.Item key={i} label={`Шаг ${i + 1}`} name={['colors', i]}>
						<Radio.Group>
							{allColors.map((color) => (
								<Radio.Button
									key={`color_${i}_${color}`}
									value={color}
									checked={selectedColor === color}
								>
									<div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
										<div
											style={{
												backgroundColor: color,
												width: 24,
												height: 24,
												borderRadius: '50%',
												border: '1px solid black',
											}}
										/>
									</div>
								</Radio.Button>
							))}
						</Radio.Group>
					</Form.Item>
				))}
				<Form.Item>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						<Button type="primary" onClick={setNextStep} style={{ width: 172 }}>
							Добавить шаг
						</Button>
						<Button type="primary" onClick={calculateResult} style={{ width: 172 }}>
							Подсчитать результат
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
				{state.result !== undefined && (
					<Form.Item>
						<Typography.Text strong>
							Нужно вводить следующую последовательность:
						</Typography.Text>
						<div
							style={{
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								marginTop: 8,
							}}
						>
							{state.result.map((color) => (
								<div
									style={{
										backgroundColor: color,
										width: 24,
										height: 24,
										borderRadius: '50%',
										border: '1px solid black',
									}}
								/>
							))}
						</div>
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default DoTheSame;
