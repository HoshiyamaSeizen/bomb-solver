import { Menu as MenuAntD, MenuTheme } from 'antd';
import { ItemType, MenuDividerType, MenuItemType } from 'antd/es/menu/interface';
import { modules } from '../data/modules.ts';

type Props = {
	theme: MenuTheme;
	page: string;
	setPage: (page: string) => void;
};

const mainMenuItem: MenuItemType = {
	key: 'main',
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

const Menu: React.FC<Props> = ({ theme, page, setPage }) => {
	const onSelect = (info: { key: string }) => setPage(info.key);

	return (
		<div className="sticky-menu">
			<MenuAntD
				theme={theme}
				mode="vertical"
				items={menuItems}
				onSelect={onSelect}
				selectedKeys={[page]}
			/>
		</div>
	);
};

export default Menu;
