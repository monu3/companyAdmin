import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
    darkMode: ["class"],
    // Limit Tailwind to only your own files
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],

  // Turn off preflight so Tailwind doesn't inject its base styles
  corePlugins: {
    preflight: false,
  },

  theme: {
  	colors: {
  		primary: 'var(--color-primary)',
  		secondary: 'var(--color-secondary)',
  		accent: 'var(--color-accent)',
  		card: 'var(--color-card)',
  		success: 'var(--color-success)',
  		error: 'var(--color-error)',
  		warning: 'var(--color-warning)',
  		info: 'var(--color-info)',
  		'brand-dark': 'var(--color-brand-dark)',
  		'brand-light': 'var(--color-brand-light)',
  		text: 'var(--color-text)',
  		bg: 'var(--color-bg)',
  		transparent: 'transparent',
  		current: 'currentColor'
  	},
  	boxShadow: {
  		custom: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },

  plugins: [
    flowbite.plugin(),
      require("tailwindcss-animate")
],
} satisfies Config;
