import { Button, Typography } from 'antd';
import { useState } from 'react';

const keys = [
	'q',
	'mac',
	'cr',
	'zeta',
	'psi',
	'at',
	'chin',
	'par',
	'smile',
	'lambda',
	'rc',
	'phi',
	'plane',
	'rail',
	'scissors',
	'circle',
	'hring',
	'c',
	'ae',
	'star',
	'z',
	'glass',
	'rqm',
	'ksi',
	'ring',
	'bstar',
	'omega',
] as const;
type Key = (typeof keys)[number];

type State = {
	keys: Key[];
	result?: Key[];
};

const imageSize = 60;
const importImages = (keys: Key[]) => {
	const images: { [key in Key]?: string } = {};
	keys.forEach((key) => {
		import(`../assets/keyboard/${key}.png`).then((module) => {
			images[key] = module.default;
		});
	});
	return images;
};
const keyImages = importImages([...keys]);

const Keyboard = () => {
	const defaultState: State = {
		keys: [],
		result: undefined,
	};
	const [state, setState] = useState<State>(defaultState);

	const clearState = () => setState(defaultState);
	const calculateResult = () => {
		if (state.keys.length < 4) return setState({ ...state, result: [] });
		const result = (() => {
			const cols: Key[][] = [
				['q', 'at', 'lambda', 'scissors', 'hring', 'glass', 'rc'],
				['mac', 'q', 'rc', 'phi', 'star', 'glass', 'rqm'],
				['cr', 'chin', 'phi', 'circle', 'z', 'lambda', 'star'],
				['zeta', 'par', 'plane', 'hring', 'circle', 'rqm', 'smile'],
				['psi', 'smile', 'plane', 'c', 'par', 'ksi', 'bstar'],
				['zeta', 'mac', 'rail', 'ae', 'psi', 'ring', 'omega'],
			];
			for (const col of cols) {
				const filteredCol = col.filter((key) => state.keys.includes(key));
				if (filteredCol.length === 4) return filteredCol;
			}
			return [];
		})();
		setState({ ...state, result });
	};

	const handleKeyClick = (key: Key) => {
		setState((prevState) => {
			const newKeys = prevState.keys.includes(key)
				? prevState.keys.filter((k) => k !== key)
				: [...prevState.keys, key].slice(0, 4);
			return { ...prevState, keys: newKeys };
		});
	};

	return (
		<>
			<div style={{ maxWidth: (imageSize + 10) * 10, margin: '30px 0' }}>
				{keys.map((key) => (
					<img
						key={key}
						src={keyImages[key]}
						alt={key}
						onClick={() => handleKeyClick(key)}
						style={{
							cursor: 'pointer',
							margin: 5,
							border: `2px solid ${state.keys.includes(key) ? 'red' : 'white'}`,
							borderRadius: 10,
						}}
					/>
				))}
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<Button type="primary" onClick={calculateResult}>
					Подсчитать результат
				</Button>
				<Button variant="outlined" color="danger" onClick={clearState}>
					Очистить форму
				</Button>
			</div>
			{state.result !== undefined && state.result.length === 0 && (
				<Typography.Text strong>Результат не был найден</Typography.Text>
			)}
			{state.result !== undefined && state.result.length === 4 && (
				<>
					<Typography.Text strong>Нажмите кнопки в следующем порядке:</Typography.Text>
					<div>
						{state.result.map((key) => (
							<img key={key} src={keyImages[key]} alt={key} style={{ margin: 5 }} />
						))}
					</div>
				</>
			)}
		</>
	);
};

export default Keyboard;
