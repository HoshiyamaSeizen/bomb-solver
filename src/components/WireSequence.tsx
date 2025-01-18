import { Button, Checkbox, Form, Radio, Typography } from 'antd';
import { useState } from 'react';

type digit = 1 | 2 | 3;
type abc = 'А' | 'Б' | 'В';
type color = 'red' | 'blue' | 'black';
type Wire = {
	color: color;
	letter: abc;
	present: boolean;
};

type State = {
	step: number;
	redCount: number;
	blueCount: number;
	blackCount: number;
	wires: Wire[];
	result?: digit[] | -1;
};

const lettersCut: {
	[K in color]: abc[][];
} = {
	red: [['В'], ['Б'], ['А'], ['А', 'В'], ['Б'], ['А', 'В'], ['А', 'Б', 'В'], ['А', 'Б'], ['Б']],
	blue: [['Б'], ['А', 'В'], ['Б'], ['А'], ['Б'], ['Б', 'В'], ['В'], ['А', 'В'], ['А']],
	black: [
		['А', 'Б', 'В'],
		['А', 'В'],
		['Б'],
		['А', 'В'],
		['Б'],
		['Б', 'В'],
		['А', 'Б'],
		['В'],
		['В'],
	],
};

const WireSequence = () => {
	const defaultState: State = {
		step: 0,
		redCount: 0,
		blueCount: 0,
		blackCount: 0,
		wires: [
			{ color: 'red', letter: 'А', present: true },
			{ color: 'red', letter: 'А', present: true },
			{ color: 'red', letter: 'А', present: true },
		],
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });
	const nextStep = () => {
		setState({ ...state, wires: defaultState.wires, result: undefined, step: state.step + 1 });
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const calculateStepResult = () => {
		const countsState: { [K in color]: number } = {
			red: state.redCount,
			blue: state.blueCount,
			black: state.blackCount,
		};
		const counts = {
			red: state.wires.filter((w) => w.color === 'red').length,
			blue: state.wires.filter((w) => w.color === 'blue').length,
			black: state.wires.filter((w) => w.color === 'black').length,
		};
		const countsNew = {
			redCount: countsState.red + counts.red,
			blueCount: countsState.blue + counts.blue,
			blackCount: countsState.black + counts.black,
		};
		if (Object.values(countsNew).some((c) => c > 9)) return setState({ ...state, result: -1 });

		const result = ([0, 1, 2] as digit[]).filter((i) => {
			const w = state.wires[i];
			if (!w.present) return false;
			countsState[w.color] += 1;
			return lettersCut[w.color][countsState[w.color] - 1].includes(w.letter);
		});
		setState({ ...state, result, ...countsNew });
	};

	return (
		<>
			<Form
				layout="horizontal"
				initialValues={state}
				onValuesChange={(_, values) => updateState(values)}
				key={JSON.stringify(state)}
			>
				{state.step < 4 && (
					<>
						<Form.Item>
							<Typography.Title>Шаг {state.step + 1}</Typography.Title>
						</Form.Item>
						{[0, 1, 2].map((index) => (
							<div key={`wire_${index}`} style={{ marginBottom: 60 }}>
								<Form.Item label={`Провод ${index + 1}`}></Form.Item>
								<div style={{ paddingLeft: 30 }}>
									<Form.Item
										label="Присутсвует на панели"
										name={['wires', index, 'present']}
										valuePropName="checked"
									>
										<Checkbox />
									</Form.Item>
									{state.wires[index].present && (
										<>
											<Form.Item label="Цвет" name={['wires', index, 'color']}>
												<Radio.Group>
													{['red', 'blue', 'black'].map((color) => (
														<Radio.Button
															key={`color_${index}_${color}`}
															value={color}
															checked={state.wires[index].color === color}
														>
															<div
																style={{
																	height: '100%',
																	display: 'flex',
																	alignItems: 'center',
																}}
															>
																<div
																	style={{
																		backgroundColor: color,
																		width: 24,
																		height: 24,
																		borderRadius: '50%',
																	}}
																/>
															</div>
														</Radio.Button>
													))}
												</Radio.Group>
											</Form.Item>
											<Form.Item label="Буква" name={['wires', index, 'letter']}>
												<Radio.Group>
													{['А', 'Б', 'В'].map((letter) => (
														<Radio.Button
															key={`letter_${index}_${letter}`}
															value={letter}
															checked={state.wires[index].letter === letter}
														>
															{letter}
														</Radio.Button>
													))}
												</Radio.Group>
											</Form.Item>
										</>
									)}
								</div>
							</div>
						))}
					</>
				)}

				<Form.Item>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						{state.result !== undefined && state.result !== -1 ? (
							<Button
								type="primary"
								onClick={nextStep}
								style={{ width: 172 }}
								disabled={state.step >= 4}
							>
								Следующий шаг
							</Button>
						) : (
							<Button
								type="primary"
								onClick={calculateStepResult}
								style={{ width: 172 }}
								disabled={state.step >= 4}
							>
								Подсчитать шаг
							</Button>
						)}

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
				{state.step >= 4 && state.result === undefined && (
					<Typography.Text strong>Конец</Typography.Text>
				)}
				{state.result !== undefined && state.result !== -1 && (
					<Form.Item>
						{state.result.length === 0 ? (
							<Typography.Text strong>Не нужно резать никакие провода</Typography.Text>
						) : (
							<Typography.Text strong>
								Нужно резать провод{state.result.length > 1 ? 'а' : ''}{' '}
								{state.result.map((i) => i + 1).join(', ')}
							</Typography.Text>
						)}
					</Form.Item>
				)}
				{state.result !== undefined && state.result === -1 && (
					<Form.Item>
						<Typography.Text strong>
							В сумме не может быть более 9 проводов одного цвета на всех панелях
						</Typography.Text>
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default WireSequence;
