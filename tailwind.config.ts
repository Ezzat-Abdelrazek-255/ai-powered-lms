import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "hsl(var(--color-black))",
        white: "hsl(var(--color-white))",
        primary: "hsl(var(--color-primary))",
        yellow: "hsl(var(--color-yellow))",
        beige: "hsl(var(--color-beige))",
        green: "hsl(var(--color-green))",
        orange: "hsl(var(--color-orange))",
        blue: "hsl(var(--color-blue))",
        red: "hsl(var(--color-red))",
        "gray-dark": "hsl(var(--color-gray-dark))",
        "gray-dark-2": "hsl(var(--color-gray-dark-2))",
        "gray-light": "hsl(var(--color-gray-light))",
        "red-dark": "hsl(var(--color-red-dark))",
        "yellow-dark": "hsl(var(--color-yellow-dark))",
        "green-dark": "hsl(var(--color-green-dark))",
        "orange-dark": "hsl(var(--color-orange-dark))",
        "beige-light": "hsl(var(--color-beige-light))",
        "beige-dark": "hsl(var(--color-beige-dark))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        xs: "4px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
        md: "0 2px 8px rgba(0,0,0,0.1)",
        lg: "0 4px 8px rgba(0,0,0,0.05)",
      },
      fontFamily: {
        sans: "var(--font-laygrotesk)",
        mono: "var(--font-ibm-plex-mono)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both", // duration & easing
      },
      zIndex: {
        hidden: "-1",
        base: "10",
        noise: "9999999999",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default withUt(config);
