# useTheme Hook

A custom React hook for managing themes in AdminJS applications.

## Usage

```typescript
import { useTheme } from 'adminjs'

function YourComponent() {
  const { theme, setTheme, availableThemes } = useTheme()

function ThemeToggle() {
  const { theme, setTheme, isThemeActive } = useTheme()

  return (
    <button
      onClick={() => setTheme(isThemeActive('dark') ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isThemeActive('dark') ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}
```
