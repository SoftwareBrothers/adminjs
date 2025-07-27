import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { initializeTheme, ReduxState, ThemeInState } from '../store/index.js'

interface UseThemeReturn {
  theme: ThemeInState
  setTheme: (themeId: string) => void
  availableThemes: NonNullable<ThemeInState>['availableThemes']
  isThemeActive: (themeId: string) => boolean
}

/**
 * Custom hook for managing application themes
 *
 * @returns {UseThemeReturn} Theme utilities and state
 *
 * @example
 * const { theme, setTheme, availableThemes, isThemeActive } = useTheme()
 *
 * // Change theme
 * setTheme('dark')
 *
 * // Check if theme is active
 * const isDarkActive = isThemeActive('dark')
 */
export const useTheme = (): UseThemeReturn => {
  const dispatch = useDispatch()

  // Memoize theme selector to prevent unnecessary re-renders
  const theme = useSelector<ReduxState, ThemeInState>((state) => state.theme, shallowEqual)

  // Memoize available themes to prevent recalculation
  const availableThemes = useMemo(() => theme?.availableThemes || [], [theme?.availableThemes])

  // Memoize setTheme to maintain referential equality
  const setTheme = useCallback(
    (themeId: string) => {
      if (!theme?.availableThemes?.length) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('No available themes found')
        }
        return
      }

      const newTheme = theme.availableThemes.find((t) => t.id === themeId)

      if (!newTheme) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Theme with id "${themeId}" not found`)
        }
        return
      }

      dispatch(
        initializeTheme({
          ...newTheme,
          availableThemes: theme.availableThemes,
        }),
      )
    },
    [dispatch, theme?.availableThemes],
  )

  // Helper to check if a theme is currently active
  const isThemeActive = useCallback((themeId: string) => theme?.id === themeId, [theme?.id])

  return {
    theme: theme || null,
    setTheme,
    availableThemes,
    isThemeActive,
  }
}

// Export the hook's return type for better type inference
export type { UseThemeReturn as UseThemeType }
