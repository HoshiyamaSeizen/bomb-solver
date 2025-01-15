import { Button, Form, Input, Table, Typography } from 'antd';
import { useMemo, useRef, useState } from 'react';
import {
	morseToLettersDict,
	sortWordsByLevenshtein,
	wordToHz,
	morse,
	morseResult,
} from '../data/morse';
import Appendix from './Appendix';

const TIME_FOR_DASH = 300;
const TIME_FOR_SPACE = 1100;

type State = {
	code: morse[];
	conflicts: string[];
	word?: string;
	possibleResults?: morseResult[];
	result?: number;
};

const tableColumns = [
	{
		title: 'Слово',
		dataIndex: 'word',
		key: 'word',
	},
	{
		title: 'Частота (МГц)',
		dataIndex: 'hz',
		key: 'hz',
		width: 150,
	},
	{
		title: 'Расстояние',
		dataIndex: 'dist',
		key: 'dist',
	},
];

const Morse = () => {
	const defaultState: State = {
		code: [],
		conflicts: [],
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);
	const timerRef = useRef<number | null>(null);
	const timerRefSpace = useRef<number | null>(null);
	const isDashRef = useRef<boolean>(false);

	const tableData = useMemo(
		() =>
			state.possibleResults?.map((item, index) => ({
				key: index,
				word: item[0],
				hz: `3.${500 + item[1]}`,
				dist: item[2],
			})),
		[state.possibleResults]
	);

	const processMorseCode = (code: morse[]) => {
		const codedLetters = code
			.join('')
			.split(/\s+/)
			.filter((x) => x !== '');
		const decodedLetters = codedLetters.map((l) => {
			const formated = l
				.split('')
				.map((x) => (x === '-' ? '-' : '.'))
				.join('');
			const decoded = morseToLettersDict[formated];
			return decoded === undefined ? l : decoded;
		});

		if (decodedLetters.length === 0)
			return setState({
				...state,
				code: [],
				result: undefined,
				conflicts: [],
				word: undefined,
				possibleResults: undefined,
			});

		const conflicts = decodedLetters.filter((x) => x.length > 1 || x === '•' || x === '-');
		const woConflicts = decodedLetters.map((x) =>
			x.length > 1 || x === '•' || x === '-' ? '?' : x
		);

		const word = woConflicts.join('');
		const result = wordToHz[word] || -1;
		const possibleResults = result === -1 ? sortWordsByLevenshtein(word) : undefined;
		setState({ ...state, code, result, conflicts: conflicts, word, possibleResults });
	};

	const addMorseCode = (signal: morse, dotBeforeSpace?: boolean) => {
		if (signal === ' ' && timerRefSpace.current) {
			clearTimeout(timerRefSpace.current);
			timerRefSpace.current = null;
		}
		const code = state.code.concat(dotBeforeSpace ? ['•', signal] : [signal]);
		processMorseCode(code);
	};

	const handleMouseDown = () => {
		if (timerRefSpace.current) {
			clearTimeout(timerRefSpace.current);
			timerRefSpace.current = null;
		}
		timerRef.current = setTimeout(() => {
			isDashRef.current = true;
			addMorseCode('-');
		}, TIME_FOR_DASH);
	};

	const handleMouseUp = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		const isDot = !isDashRef.current;
		if (isDot) addMorseCode('•');
		timerRefSpace.current = setTimeout(() => {
			addMorseCode(' ', isDot);
		}, TIME_FOR_SPACE);
		isDashRef.current = false;
	};

	const clearState = () => {
		setState(defaultState);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		if (timerRefSpace.current) {
			clearTimeout(timerRefSpace.current);
			timerRef.current = null;
		}
		isDashRef.current = false;
	};

	const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const code = e.target.value.split('');
		const filteredCode = code
			.filter((x) => x === '•' || x === '-' || x === '.' || x === ' ')
			.map((x) => (x === '-' ? '-' : x === ' ' ? ' ' : '•'));
		processMorseCode(filteredCode);
	};

	return (
		<>
			<Form layout="horizontal">
				<Form.Item>
					<Typography.Paragraph>
						<ul>
							<li>
								Интерпретируйте сигнал моргающей лампочки, используя таблицу азбуки Морзе,
								чтобы получить одно из слов в таблице.
							</li>
							<li>Сигнал зациклен и имеет большой промежуток между повторениями.</li>
							<li>
								После определения слова установите соответствующую частоту и нажмите кнопку
								передачи.
							</li>
						</ul>
					</Typography.Paragraph>
				</Form.Item>
				<Form.Item label="Введите код Морзе" tooltip={<Appendix category="morse" />} />
				<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<Form.Item>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 10,
							}}
						>
							<Button
								type="primary"
								onMouseDown={handleMouseDown}
								onTouchStart={(e) => {
									e.preventDefault();
									handleMouseDown();
								}}
								onMouseUp={handleMouseUp}
								onTouchEnd={(e) => {
									e.preventDefault();
									handleMouseUp();
								}}
								onContextMenu={(e) => e.preventDefault()}
								style={{
									borderRadius: '50%',
									width: 60,
									height: 60,
									backgroundColor: 'green',
									fontWeight: 500,
								}}
							>
								Press
							</Button>
							<Button
								type="primary"
								disabled={
									state.code.length === 0 || state.code[state.code.length - 1] === ' '
								}
								onClick={() => addMorseCode(' ')}
								style={{
									borderRadius: '50%',
									width: 60,
									height: 60,
									backgroundColor: 'green',
									fontWeight: 500,
								}}
							>
								Space
							</Button>
						</div>
					</Form.Item>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Form.Item>
							<Input.TextArea
								value={state.code.join('')}
								onChange={handleInputChange}
								wrap="soft"
								style={{ width: 200, height: 350, fontWeight: 700, fontSize: '2em' }}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								variant="outlined"
								color="danger"
								onClick={clearState}
								style={{ width: 172 }}
							>
								Очистить форму
							</Button>
						</Form.Item>
					</div>
				</div>

				<Form.Item>
					<Typography.Text strong>Результат: </Typography.Text>
					{state.result === undefined && (
						<Typography.Text style={{ display: 'block' }}>Не хватает данных</Typography.Text>
					)}
					{state.result === -1 && (
						<>
							{state.conflicts.length > 0 && (
								<Typography.Text style={{ display: 'block' }}>
									Не найдены комбинации: {state.conflicts.toString()}
								</Typography.Text>
							)}
							<Typography.Text style={{ display: 'block' }}>
								Не найдено слово: {state.word}
							</Typography.Text>
						</>
					)}
					{state.result !== undefined && state.result !== -1 && (
						<Typography.Text>
							Нужно выбрать частоту 3.{500 + state.result} МГц (Слово: {state.word})
						</Typography.Text>
					)}
					{state.possibleResults !== undefined && (
						<>
							<Typography.Text>Возможные результаты:</Typography.Text>
							<Table
								dataSource={tableData}
								columns={tableColumns}
								tableLayout="auto"
								size="small"
								pagination={false}
								style={{ width: 250 }}
							/>
						</>
					)}
				</Form.Item>
			</Form>
		</>
	);
};

export default Morse;
