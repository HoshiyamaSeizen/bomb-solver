export type morse = '•' | '-' | ' ';

export type morseResult = [string, number, number];

export const lettersToMorseDict: { [key: string]: string } = {
	а: '.-',
	б: '-...',
	в: '.--',
	г: '--.',
	д: '-..',
	е: '.',
	ж: '...-',
	з: '--..',
	и: '..',
	й: '.---',
	к: '-.-',
	л: '.-..',
	м: '--',
	н: '-.',
	о: '---',
	п: '.--.',
	р: '.-.',
	с: '...',
	т: '-',
	у: '..-',
	ф: '..-.',
	х: '....',
	ц: '-.-.',
	ч: '---.',
	ш: '----',
	щ: '--.-',
	ъ: '--.--',
	ь: '-..-',
	ы: '-.--',
	э: '..-..',
	ю: '..--',
	я: '.-.-',
};

export const morseToLettersDict = Object.fromEntries(
	Object.entries(lettersToMorseDict).map(([letter, code]) => [code, letter])
);

export const wordToHz: { [key: string]: number } = {
	токарь: 5,
	мостик: 15,
	венок: 22,
	брать: 32,
	клара: 35,
	попей: 42,
	виток: 45,
	восток: 52,
	вилка: 55,
	порок: 65,
	койка: 72,
	рокер: 75,
	помой: 82,
	покой: 92,
	борис: 95,
	порог: 100,
};

const levenshtein = (a: string, b: string) => {
	const matrix: number[][] = [];
	for (let i = 0; i <= b.length; i++) matrix[i] = [i];
	for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1]; // No operation needed
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // Substitution
					Math.min(
						matrix[i][j - 1] + 1, // Insertion
						matrix[i - 1][j] + 1 // Deletion
					)
				);
			}
		}
	}
	return matrix[b.length][a.length];
};

export const sortWordsByLevenshtein = (word: string) => {
	return Object.keys(wordToHz)
		.sort((a, b) => {
			const distanceA = levenshtein(a, word);
			const distanceB = levenshtein(b, word);
			return distanceA - distanceB;
		})
		.map((key) => [key, wordToHz[key], levenshtein(key, word)] as morseResult);
};
