import indicatorTypes from '../assets/indicatorTypes.png';
import batteryTypes from '../assets/batteryTypes.png';
import portTypes from '../assets/portTypes.png';

type Props = {
	category: 'indicators' | 'batteries' | 'ports';
};

const Appendix: React.FC<Props> = ({ category }) => {
	return (
		<>
			{category === 'indicators' && <img src={indicatorTypes} alt="Типы индикаторов" />}
			{category === 'batteries' && <img src={batteryTypes} alt="Типы батарей" />}
			{category === 'ports' && <img src={portTypes} alt="Типы портов" />}
		</>
	);
};

export default Appendix;
