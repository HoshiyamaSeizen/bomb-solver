import { Button as ButtonAntD, Checkbox, Form, InputNumber, Radio, Typography } from 'antd';
import { useState } from 'react';
import Appendix from './Appendix';

type Color = 'red' | 'blue' | 'yellow' | 'white';
type Label = 'Прервать' | 'Взорвать' | 'Держать' | 'Нажать';

type State = {
	color: Color;
	label: Label;
	powerSupply: number;
	hasCar: boolean;
	hasFrk: boolean;
	resultHold?: boolean;
};

const Button = () => {
	const defaultState: State = {
		color: 'red',
		label: 'Прервать',
		powerSupply: 0,
		hasCar: false,
		hasFrk: false,
		resultHold: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });

	const calculateResult = () => {
		const resultHold = (() => {
			const b = state.color === 'blue';
			const w = state.color === 'white';
			const y = state.color === 'yellow';
			const r = state.color === 'red';
			const c = state.hasCar;
			const f = state.hasFrk;
			const s = state.powerSupply;
			const d = state.label === 'Держать';
			const v = state.label === 'Взорвать';
			const p = state.label === 'Прервать';

			if (b && p) return true;
			if (s > 1 && v) return false;
			if (w && c) return true;
			if (s > 2 && f) return false;
			if (y) return true;
			if (r && d) return false;
			return true;
		})();
		setState({ ...state, resultHold });
	};

	return (
		<>
			<Form
				layout="horizontal"
				initialValues={state}
				onValuesChange={(_, values) => updateState(values)}
				key={JSON.stringify(state)}
			>
				<Form.Item label="Цвет кнопки" name="color">
					<Radio.Group>
						{['red', 'blue', 'yellow', 'white'].map((color) => (
							<Radio.Button
								key={`color_${color}`}
								value={color}
								checked={state.color === color}
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
				<Form.Item label="Надпись на кнопке" name="label">
					<Radio.Group>
						{['Прервать', 'Взорвать', 'Держать', 'Нажать'].map((label) => (
							<Radio.Button
								key={`label_${label}`}
								value={label}
								checked={state.label === label}
							>
								{label}
							</Radio.Button>
						))}
					</Radio.Group>
				</Form.Item>
				<Form.Item
					label="Количество индикаторов питания"
					name="powerSupply"
					tooltip={<Appendix category="batteries" />}
				>
					<InputNumber defaultValue={0} />
				</Form.Item>
				<Form.Item
					label="Есть индикатор CAR"
					name="hasCar"
					valuePropName="checked"
					tooltip={<Appendix category="indicators" />}
				>
					<Checkbox />
				</Form.Item>
				<Form.Item
					label="Есть индикатор FRK"
					name="hasFrk"
					valuePropName="checked"
					tooltip={<Appendix category="indicators" />}
				>
					<Checkbox />
				</Form.Item>
				<Form.Item>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						<ButtonAntD type="primary" onClick={calculateResult} style={{ width: 172 }}>
							Подсчитать результат
						</ButtonAntD>
						<ButtonAntD
							variant="outlined"
							color="danger"
							onClick={clearState}
							style={{ width: 172 }}
						>
							Очистить форму
						</ButtonAntD>
					</div>
				</Form.Item>
				{state.resultHold !== undefined && (
					<Form.Item>
						{state.resultHold ? (
							<>
								<Typography.Text strong>Задержите кнопку</Typography.Text>
								<Typography.Text>
									, на правой стороне модуля зажжется цветная полоска. В зависимости от её
									цвета вам нужно отпустить кнопку в определенный момент времени:
								</Typography.Text>
								<ul style={{ paddingLeft: 16 }}>
									<li>
										<Typography.Text strong>Синяя полоска: </Typography.Text>
										<Typography.Text>
											отпустите, когда любая цифра обратного таймера будет равна 4.
										</Typography.Text>
									</li>
									<li>
										<Typography.Text strong>Белая полоска: </Typography.Text>
										<Typography.Text>
											отпустите, когда любая цифра обратного таймера будет равна 1.
										</Typography.Text>
									</li>
									<li>
										<Typography.Text strong>Желтая полоска: </Typography.Text>
										<Typography.Text>
											отпустите, когда любая цифра обратного таймера будет равна 5.
										</Typography.Text>
									</li>
									<li>
										<Typography.Text strong>
											Полоска любого другого цвета:{' '}
										</Typography.Text>
										<Typography.Text>
											отпустите, когда любая цифра обратного таймера будет равна 1.
										</Typography.Text>
									</li>
								</ul>
							</>
						) : (
							<Typography.Text strong>Нажмите и резко отпустите кнопку</Typography.Text>
						)}
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default Button;
