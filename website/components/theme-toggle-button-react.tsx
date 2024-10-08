import { handleToggleClick } from 'astro-theme-toggle'
import { Moon, Sun } from 'lucide-react'
import './icon.css'

export default function ThemeToggleButtonReact() {
  return (
    <button onClick={handleToggleClick}>
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
    </button>
  )
}
