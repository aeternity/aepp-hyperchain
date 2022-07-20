/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			// 'fantasy',
			{
				mytheme: {
					primary: '#F5274E',
					'primary-content': '#FFFFFF',
					secondary: '#4D00BC',
					'secondary-content': '#D9D9D9',
					accent: '#00FFE0',
					neutral: '#EFEFEF',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
					'--animation-btn': '0.1s'
				}
			}
		]
	}
};
