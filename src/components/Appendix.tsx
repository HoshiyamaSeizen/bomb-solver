import indicatorTypes from '../assets/indicatorTypes.png';
import batteryTypes from '../assets/batteryTypes.png';
import portTypes from '../assets/portTypes.png';
import morseInfo from '../assets/morseInfo.png';

type Props = {
	category: 'indicators' | 'batteries' | 'ports' | 'morse';
};

const Appendix: React.FC<Props> = ({ category }) => {
	return (
		<>
			{category === 'indicators' && <img src={indicatorTypes} alt="Типы индикаторов" />}
			{category === 'batteries' && <img src={batteryTypes} alt="Типы батарей" />}
			{category === 'ports' && <img src={portTypes} alt="Типы портов" />}
			{category === 'morse' && <img src={morseInfo} alt="Азбука Морзе" />}
		</>
	);
};

export default Appendix;
