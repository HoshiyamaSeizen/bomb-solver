import { Button, Form, Input } from 'antd';
import { useState } from 'react';

const words = [
	'аллея',
	'бомба',
	'вверх',
	'взрыв',
	'внизу',
	'вьюга',
	'горох',
	'готов',
	'густо',
	'давай',
	'давно',
	'книга',
	'конец',
	'лилия',
	'линия',
	'можно',
	'назад',
	'нравы',
	'песец',
	'песня',
	'порох',
	'порыв',
	'потом',
	'право',
	'пусто',
	'румба',
	'скоро',
	'супер',
	'травы',
	'тумба',
	'тунец',
	'фугас',
	'шприц',
	'щипок',
	'щипцы',
];

type State = {
	letters: string[];
	result: string[];
};

const Password = () => {
	const defaultState: State = {
		letters: ['', '', '', '', ''],
		result: words,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const updateLetters = (letters: string, index: number) => {
		letters = letters.replace(/[^А-Яа-я]/gi, '');
		state.letters[index] = letters.toLowerCase();
		calculateResult();
	};

	const calculateResult = () => {
		const result = words.filter((w) =>
			w.split('').every((l, i) => state.letters[i].length === 0 || state.letters[i].includes(l))
		);
		setState({ ...state, result });
	};

	return (
		<>
			<Form layout="horizontal">
				{[0, 1, 2, 3, 4].map((i) => (
					<Form.Item key={`input_${i}`} label={`Возможные символы на позиции ${i + 1}`}>
						<Input
							value={state.letters[i]}
							allowClear
							onChange={(e) => updateLetters(e.target.value, i)}
							style={{ width: 130 }}
						/>
					</Form.Item>
				))}
				<Form.Item>
					<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
				<Form.Item>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(5, 1fr)',
							gap: 8,
							width: 100,
						}}
					>
						{words.map((word) => (
							<div
								key={word}
								style={{
									padding: '8px',
									backgroundColor: state.result.includes(word)
										? 'lightgreen'
										: 'lightgrey',
									textAlign: 'center',
									borderRadius: '4px',
									border: '1px solid black',
								}}
							>
								{word}
							</div>
						))}
					</div>
				</Form.Item>
			</Form>
		</>
	);
};

export default Password;
