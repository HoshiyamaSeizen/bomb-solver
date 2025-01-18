import { Button, Checkbox, Form, Table, Typography } from 'antd';
import { useState } from 'react';
import Appendix from './Appendix';

type Wire = {
	hasRed: boolean;
	hasBlue: boolean;
	hasStar: boolean;
	indicatorOn: boolean;
};

type State = {
	wires: Wire[];
	serialLastDigitEven: boolean;
	hasParallelPort: boolean;
	powerSupplyGeTwo: boolean;
	result?: boolean[];
};

const ComplexWires = () => {
	const defaultState: State = {
		wires: [
			{ hasBlue: false, hasRed: false, hasStar: false, indicatorOn: false },
			{ hasBlue: false, hasRed: false, hasStar: false, indicatorOn: false },
			{ hasBlue: false, hasRed: false, hasStar: false, indicatorOn: false },
			{ hasBlue: false, hasRed: false, hasStar: false, indicatorOn: false },
			{ hasBlue: false, hasRed: false, hasStar: false, indicatorOn: false },
			{ hasBlue: false, hasRed: false, hasStar: false, indicatorOn: false },
		],
		serialLastDigitEven: false,
		hasParallelPort: false,
		powerSupplyGeTwo: false,
	};
	const [state, setState] = useState<State>(defaultState);

	const handleCheckboxChange = (property: keyof Wire, wireIndex: number) => {
		const newWires = state.wires.map((wire, index) => {
			if (index === wireIndex) {
				return { ...wire, [property]: !wire[property] };
			}
			return wire;
		});
		setState({ ...state, wires: newWires });
	};

	const properties: (keyof Wire)[] = ['hasRed', 'hasBlue', 'hasStar', 'indicatorOn'];
	const dataSource = [
		{ property: 'У провода красная расцветка' },
		{ property: 'У провода синяя расцветка' },
		{ property: 'Нарисована ★' },
		{ property: 'Горит светодиод' },
	];
	const columns = [
		{
			title: 'Признаки',
			dataIndex: 'property',
			width: '160px',
		},
		{
			title: 'Провода',
			children: [
				...state.wires.map((_, index) => ({
					title: index + 1,
					align: 'center',
					render: (_: unknown, __: unknown, propertyIndex: number) => (
						<Checkbox
							checked={state.wires[index][properties[propertyIndex]]}
							onChange={() => handleCheckboxChange(properties[propertyIndex], index)}
						/>
					),
				})),
			],
		},
	];
	const columnsResult = [
		{
			title: 'Нужно резать провода',
			children: [
				...(state.result || []).map((checked, index) => ({
					title: index + 1,
					align: 'center',
					render: () => <Checkbox checked={checked} disabled={true} />,
				})),
			],
		},
	];

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });

	const calculateResult = () => {
		const P = [
			true,
			false,
			state.serialLastDigitEven,
			state.hasParallelPort,
			state.powerSupplyGeTwo,
		];
		const result = state.wires.map((wire) => {
			const I = [wire.hasStar, wire.hasRed, wire.hasBlue, wire.indicatorOn];
			return P[
				[0, 1, 2, 3, 2, 4, 2, 2, 0, 4, 1, 3, 0, 4, 1, 3][
					Number(I[0]) * 8 + Number(I[1]) * 4 + Number(I[2]) * 2 + Number(I[3])
				]
			];
		});
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
				<Form.Item
					label="Последняя цифра серийного номера четная"
					name="serialLastDigitEven"
					valuePropName="checked"
				>
					<Checkbox />
				</Form.Item>
				<Form.Item
					label="У бомбы есть параллельный порт"
					name="hasParallelPort"
					valuePropName="checked"
					tooltip={<Appendix category="ports" />}
				>
					<Checkbox />
				</Form.Item>
				<Form.Item
					label="У бомбы два или более элемента питания"
					name="powerSupplyGeTwo"
					valuePropName="checked"
					tooltip={<Appendix category="batteries" />}
				>
					<Checkbox />
				</Form.Item>
				<Form.Item>
					<Table
						columns={columns}
						dataSource={dataSource}
						rowKey="property"
						pagination={false}
						size="small"
						style={{ width: 600 }}
					/>
				</Form.Item>

				<Form.Item>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
						<Typography.Text strong style={{ display: 'block' }}>
							Результат:
						</Typography.Text>
						<Table
							dataSource={[0]}
							columns={columnsResult}
							pagination={false}
							rowKey={() => 'result'}
							style={{ width: 600 }}
						/>
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default ComplexWires;
