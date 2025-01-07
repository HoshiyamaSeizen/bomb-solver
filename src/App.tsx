import { Layout, Button, theme, Typography } from 'antd';
import { useState } from 'react';
import Menu from './components/Menu.tsx';
import Router from './Router.tsx';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';

const { Content, Header, Footer, Sider } = Layout;

const App: React.FC = () => {
	const {
		token: { colorBgContainer, borderRadiusLG, colorBorder },
	} = theme.useToken();

	const [page, setPage] = useState('main');
	const [collapsed, setCollapsed] = useState(true);

	const goToHomePage = () => setPage('main');
	const toggleCollapse = () => setCollapsed(!collapsed);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsedWidth="0" collapsed={collapsed}>
				<Menu theme="dark" page={page} setPage={setPage} />
			</Sider>
			<Layout>
				<Header
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 1000,
						background: colorBgContainer,
						padding: 16,
						display: 'flex',
						gap: 16,
						alignItems: 'center',
						borderBottom: `1px solid ${colorBorder}`,
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
					}}
				>
					<Button
						id="toggle-menu"
						className="btn-icon"
						type="primary"
						onClick={toggleCollapse}
						icon={<MenuOutlined />}
					/>
					<Button
						className="btn-icon"
						type="primary"
						onClick={goToHomePage}
						icon={<HomeOutlined />}
						disabled={page === 'main'}
					/>
					<Typography.Title
						level={3}
						style={{
							margin: 0,
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}
					>
						Bomb Solver
					</Typography.Title>
				</Header>
				<Content style={{ margin: '24px 16px 24px' }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Router theme="dark" page={page} setPage={setPage} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Bomb Solver ©{new Date().getFullYear()} Created by Hoshiyama Seizen
				</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
