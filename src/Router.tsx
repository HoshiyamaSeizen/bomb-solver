import { Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu.tsx';
import ModulePage from './components/ModulePage.tsx';
import { modules } from './data/modules.ts';

type Props = {
	theme: string;
};

const Router: React.FC<Props> = ({ theme }) => {
	return (
		<Routes>
			{modules.map((module) => (
				<Route
					key={module.name}
					path={module.name}
					element={<ModulePage theme={theme} module={module} />}
				/>
			))}
			<Route path="" element={<MainMenu theme={theme} />} />
		</Routes>
	);
};

export default Router;
