import { Moon, Sun } from 'lucide-react'

import { handleToggleClick } from 'astro-theme-toggle'
import './icon.css'

export default function ThemeToggleButtonReact() {
  return (
    <button onClick={handleToggleClick}>
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
    </button>
  )
}
