import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import labyrinthsImage from '../assets/labyrinths.png';

const labyrinthImageSize = 240;
const labyrinthImageMargin = 16;
const labyrinthImageNodeOffset = 20;
const labyrinthImageNodeDist = 40;

type State = {
	pivot: number;
	start: number;
	finish: number;
	result?: number;
};

type BoardProps = {
	stateField: keyof State;
	blacklist?: number[];
};

// labyrinth pivots
const labyrinths = [
	[6, 17],
	[10, 19],
	[21, 23],
	[0, 18],
	[16, 33],
	[4, 26],
	[1, 31],
	[3, 20],
	[8, 24],
];
const disabledPivots = Array.from({ length: 36 }, (_, index) => index).filter(
	(index) => !labyrinths.flat().includes(index)
);

const Labyrinth = () => {
	const defaultState: State = {
		pivot: 0,
		start: 0,
		finish: 0,
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const calculateResult = () => {
		const p = state.pivot;
		const result = labyrinths.findIndex((l) => l[0] === p || l[1] === p);
		setState({ ...state, result: result });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(calculateResult, [state.pivot]);

	const Board: React.FC<BoardProps> = ({ stateField, blacklist }) => (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(6, 1fr)',
				gap: '4px',
				width: 100,
				marginTop: 10,
			}}
		>
			{Array.from({ length: 36 }, (_, index) => (
				<button
					key={stateField + index}
					style={{
						width: 20,
						height: 20,
						backgroundColor:
							state[stateField] === index
								? 'darkolivegreen'
								: (blacklist || []).includes(index)
								? 'gray'
								: 'lightgray',
						border: 'none',
						cursor: (blacklist || []).includes(index) ? 'not-allowed' : 'pointer',
					}}
					disabled={(blacklist || []).includes(index)}
					onClick={() => setState({ ...state, [stateField]: index })}
				/>
			))}
		</div>
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
			<Typography.Text strong>
				<span style={{ color: 'red', fontSize: '1.1em', fontWeight: 600 }}>!</span> В данном
				компоненте не реализован поиск пути, только отображение карты
			</Typography.Text>
			<div>
				<Typography.Text>Выберите ячеку с круглой отметкой (одну из двух)</Typography.Text>
				<Board stateField="pivot" blacklist={disabledPivots} />
			</div>
			<div>
				<Typography.Text>Выберите начальную ячейку (белый огонёк)</Typography.Text>
				<Board stateField="start" />
			</div>
			<div>
				<Typography.Text>Выберите конечную ячейку (красный треугольник)</Typography.Text>
				<Board stateField="finish" />
			</div>

			<div
				style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10, marginBottom: 10 }}
			>
				<Button variant="outlined" color="danger" onClick={clearState} style={{ width: 172 }}>
					Очистить форму
				</Button>
			</div>
			{state.result !== undefined && (
				<div style={{ position: 'relative' }}>
					<img
						src={labyrinthsImage}
						alt="labyrinth"
						width={labyrinthImageSize}
						height={labyrinthImageSize}
						style={{
							objectFit: 'none',
							objectPosition: `${
								-(state.result % 3) * (labyrinthImageSize + labyrinthImageMargin)
							}px ${
								-Math.floor(state.result / 3) * (labyrinthImageSize + labyrinthImageMargin)
							}px`,
							width: labyrinthImageSize,
							height: labyrinthImageSize,
						}}
					/>
					<div
						style={{
							width: 18,
							height: 18,
							border: '2px solid green',
							position: 'absolute',
							left:
								labyrinthImageNodeOffset + (state.start % 6) * labyrinthImageNodeDist - 8,
							top:
								labyrinthImageNodeOffset +
								Math.floor(state.start / 6) * labyrinthImageNodeDist -
								8,
						}}
					>
						<p style={{ position: 'absolute', fontSize: 10, top: -13, left: -2 }}>start</p>
					</div>
					<div
						style={{
							width: 18,
							height: 18,
							border: '2px solid red',
							position: 'absolute',
							left:
								labyrinthImageNodeOffset + (state.finish % 6) * labyrinthImageNodeDist - 8,
							top:
								labyrinthImageNodeOffset +
								Math.floor(state.finish / 6) * labyrinthImageNodeDist -
								8,
						}}
					>
						<p style={{ position: 'absolute', fontSize: 10, bottom: -12, left: -4 }}>
							finish
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Labyrinth;
