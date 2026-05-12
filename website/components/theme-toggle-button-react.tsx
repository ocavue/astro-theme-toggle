import './icon.css'

import { handleToggleClick } from 'astro-theme-toggle/client'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggleButtonReact() {
  return (
    <button onClick={handleToggleClick}>
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
    </button>
  )
}
