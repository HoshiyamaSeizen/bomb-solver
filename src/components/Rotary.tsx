import { Typography } from 'antd';
import rotaryInfo from '../assets/rotaryInfo.png';

const Rotary = () => {
	return (
		<>
			<Typography.Paragraph>
				<ul>
					<li>Ручку можно устанавливать в одну из четырех позиций</li>
					<li>Ручка должна стоять в нужной позиции, когда таймер модуля достигнет нуля.</li>
					<li>
						Верную позицию можно определить по состоянию вкл/ выкл двенадцати светодиодов
					</li>
				</ul>
			</Typography.Paragraph>

			<img src={rotaryInfo} alt="Типы индикаторов" />
		</>
	);
};

export default Rotary;
