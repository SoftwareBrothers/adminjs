import { createRequire } from 'node:module'
import path from 'path'

const require = createRequire(import.meta.url)
const getAdminjsThemesDir = () => path.parse(require.resolve('@adminjs/themes')).dir

export const bundlePath = (theme: string): string => path.join(getAdminjsThemesDir(), `themes/${theme}/theme.bundle.js`)

export const stylePath = (theme: string): string => path.join(getAdminjsThemesDir(), `themes/${theme}/style.css`)
