import { Menu as MenuAntD, MenuTheme } from 'antd';
import { ItemType, MenuDividerType, MenuItemType } from 'antd/es/menu/interface';
import { modules } from '../data/modules.ts';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
	theme: MenuTheme;
};

const mainMenuItem: MenuItemType = {
	key: '',
	label: 'Главное меню',
	icon: null,
};

const divider: MenuDividerType = {
	type: 'divider',
	key: 'divider',
};

const moduleItems: MenuItemType[] = modules.map((item) => ({
	key: item.name,
	label: item.label,
	icon: null,
}));

const menuItems: ItemType[] = [mainMenuItem, divider, ...moduleItems];

const Menu: React.FC<Props> = ({ theme }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const onSelect = (info: { key: string }) => navigate(info.key);

	return (
		<div className="sticky-menu">
			<MenuAntD
				theme={theme}
				mode="vertical"
				items={menuItems}
				onSelect={onSelect}
				selectedKeys={[location.pathname.substring(1)]}
			/>
		</div>
	);
};

export default Menu;
