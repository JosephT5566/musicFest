import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))',
					dark: 'hsl(var(--secondary-dark))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				paper: 'hsl(var(--paper))',
				stage: {
					0: 'hsl(var(--stage-0))',
					'0-light': 'hsl(var(--stage-0-light))',
					'0-dark': 'hsl(var(--stage-0-dark))',
					1: 'hsl(var(--stage-1))',
					'1-light': 'hsl(var(--stage-1-light))',
					'1-dark': 'hsl(var(--stage-1-dark))',
					2: 'hsl(var(--stage-2))',
					'2-light': 'hsl(var(--stage-2-light))',
					'2-dark': 'hsl(var(--stage-2-dark))',
					3: 'hsl(var(--stage-3))',
					'3-light': 'hsl(var(--stage-3-light))',
					'3-dark': 'hsl(var(--stage-3-dark))',
					4: 'hsl(var(--stage-4))',
					'4-light': 'hsl(var(--stage-4-light))',
					'4-dark': 'hsl(var(--stage-4-dark))',
					5: 'hsl(var(--stage-5))',
					'5-light': 'hsl(var(--stage-5-light))',
					'5-dark': 'hsl(var(--stage-5-dark))',
					6: 'hsl(var(--stage-6))',
					'6-light': 'hsl(var(--stage-6-light))',
					'6-dark': 'hsl(var(--stage-6-dark))',
					7: 'hsl(var(--stage-7))',
					'7-light': 'hsl(var(--stage-7-light))',
					'7-dark': 'hsl(var(--stage-7-dark))',
					8: 'hsl(var(--stage-8))',
					'8-light': 'hsl(var(--stage-8-light))',
					'8-dark': 'hsl(var(--stage-8-dark))',
					9: 'hsl(var(--stage-9))',
					'9-light': 'hsl(var(--stage-9-light))',
					'9-dark': 'hsl(var(--stage-9-dark))',
					10: 'hsl(var(--stage-10))',
					'10-light': 'hsl(var(--stage-10-light))',
					'10-dark': 'hsl(var(--stage-10-dark))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['Roboto', 'Noto Sans TC', 'Open Sans', 'sans-serif'],
				heading: ['Contrail One', 'Noto Sans TC', 'sans-serif'],
			},
			fontSize: {
				h1: '3rem',
				h2: '2rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
