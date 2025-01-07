import Wires from '../components/Wires.tsx';
import Button from '../components/Button.tsx';
import Keyboard from '../components/Keyboard.tsx';
import DoTheSame from '../components/DoTheSame.tsx';
import Avas from '../components/Avas.tsx';
import Memory from '../components/Memory.tsx';
import Morse from '../components/Morse.tsx';
import ComplexWires from '../components/ComplexWires.tsx';
import WireSequence from '../components/WireSequence.tsx';
import Labyrinth from '../components/Labyrinth.tsx';
import Password from '../components/Password.tsx';
import Emission from '../components/Emission.tsx';
import Discharge from '../components/Discharge.tsx';
import Rotary from '../components/Rotary.tsx';

export type ModuleInfo = {
	name: string;
	label: string;
	unstable?: boolean;
	component: React.FC;
};

export const moduleImageSize = {
	width: 262,
	height: 263,
	scale: 0.5,
};

export const modules: ModuleInfo[] = [
	{ name: 'wires', label: 'Провода', component: Wires },
	{ name: 'button', label: 'Кнопка', component: Button },
	{ name: 'keyboard', label: 'Клавиатура', component: Keyboard },
	{ name: 'dothesame', label: '«Делай как я»', component: DoTheSame },
	{ name: 'avas', label: '«Меня зовут Авас, а вас?»', component: Avas },
	{ name: 'memory', label: 'Память', component: Memory },
	{ name: 'morse', label: 'Азбука Морзе', component: Morse },
	{ name: 'complexwires', label: 'Усложненные провода', component: ComplexWires },
	{ name: 'wiresequence', label: 'Последовательность проводов', component: WireSequence },
	{ name: 'labyrinth', label: 'Лабиринт', component: Labyrinth },
	{ name: 'password', label: 'Пароль', component: Password },
	{ name: 'emission', label: 'Выпуск газа', unstable: true, component: Emission },
	{ name: 'discharge', label: 'Разрядка конденсатора', unstable: true, component: Discharge },
	{ name: 'rotary', label: 'Поворотная ручка', unstable: true, component: Rotary },
];
