import { Typography } from 'antd';
import { ModuleInfo } from '../data/modules';

type Props = {
	theme: string;
	module: ModuleInfo;
};

const ModulePage: React.FC<Props> = ({ module }) => {
	const ModuleComponent = module.component;
	return (
		<>
			<Typography.Title>{module.label}</Typography.Title>
			<hr style={{ marginBottom: 19 }} />
			<ModuleComponent />
		</>
	);
};

export default ModulePage;
