import { Button, Form, Select, Typography } from 'antd';
import { useState } from 'react';
import { topWordsOptions, topWordsButtonMap, uniqueWords, words } from '../data/avasWords.ts';

type State = {
	topWord?: string;
	bottomWords: string[];
	result?: string;
};

const Avas = () => {
	const defaultState: State = {
		topWord: undefined,
		bottomWords: [],
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateState = (values: Partial<State>) => setState({ ...state, ...values });

	const calculateResult = () => {
		if (
			!state.topWord ||
			state.bottomWords.length !== 6 ||
			state.bottomWords.some((w) => w === undefined)
		)
			return;
		const keyWord =
			state.bottomWords[topWordsButtonMap[state.topWord as keyof typeof topWordsButtonMap] - 1];
		const result =
			words[keyWord as keyof typeof words].find((word) => state.bottomWords.includes(word)) ||
			'';
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
				<Form.Item label="Слово на экране" name="topWord">
					<Select style={{ width: 120 }} placeholder="Введите слово" showSearch>
						{topWordsOptions.map((word, i) => (
							<Select.Option key={`topword_${i}`} value={word}>
								{word}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item label="Слова на кнопках">
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							width: 'fit-content',
							gap: 10,
						}}
					>
						{[0, 1, 2, 3, 4, 5].map((index) => (
							<Form.Item
								name={['bottomWords', index]}
								key={`bottomword_${index}`}
								style={{ margin: 0 }}
							>
								<Select
									style={{ width: 120 }}
									placeholder={`Слово ${index + 1}`}
									showSearch
								>
									{uniqueWords.map((word, i) => (
										<Select.Option key={`bottomword_option_${index}_${i}`} value={word}>
											{word}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						))}
					</div>
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
				{state.result !== undefined && state.result !== '' && (
					<Form.Item>
						<Typography.Text>Нужно кликнуть слово: </Typography.Text>
						<Typography.Text strong>{state.result}</Typography.Text>
					</Form.Item>
				)}
				{state.result !== undefined && state.result === '' && (
					<Form.Item>
						<Typography.Text>Ответ не найден</Typography.Text>
					</Form.Item>
				)}
			</Form>
		</>
	);
};

export default Avas;
