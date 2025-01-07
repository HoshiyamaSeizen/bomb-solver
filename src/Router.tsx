import MainMenu from './components/MainMenu.tsx';
import ModulePage from './components/ModulePage.tsx';
import { modules } from './data/modules.ts';

type Props = {
	theme: string;
	page: string;
	setPage: (page: string) => void;
};

const Router: React.FC<Props> = ({ theme, page, setPage }) => {
	return (
		<>
			{page === 'main' && <MainMenu theme={theme} setPage={setPage} />}
			{modules.map(
				(module) =>
					page === module.name && (
						<ModulePage key={module.name} theme={theme} module={module} />
					)
			)}
		</>
	);
};

export default Router;
