import React from 'react';
import { Card, Row, Col } from 'antd';
import { modules, moduleImageSize } from '../data/modules.ts';

type Props = {
	theme: string;
	setPage: (page: string) => void;
};

const MainMenu: React.FC<Props> = ({ setPage }) => {
	const [images, setImages] = React.useState<{ [key: string]: string }>({});
	const imageSize = moduleImageSize.width * moduleImageSize.scale;

	React.useEffect(() => {
		const loadImages = async () => {
			const imagePromises = modules.map(async (module) => {
				const imageSrc = await import(`../assets/${module.name}.png`);
				return { [module.name]: imageSrc.default };
			});
			const imageResults = await Promise.all(imagePromises);
			const imagesObject = imageResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
			setImages(imagesObject);
		};

		loadImages();
	}, []);

	return (
		<Row gutter={[32, 16]}>
			{modules.map((module) => (
				<Col key={module.name}>
					<Card
						style={{ width: imageSize + 150 }}
						hoverable
						cover={
							<div
								style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 0' }}
							>
								<img
									src={images[module.name]}
									alt={module.label}
									width={imageSize}
									height={imageSize}
								/>
							</div>
						}
						onClick={() => setPage(module.name)}
					>
						<Card.Meta title={module.label} style={{ textAlign: 'center' }} />
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default MainMenu;
