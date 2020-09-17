import { Assets } from '../../../admin-bro-options.interface'

export const ASSETS_INITIALIZE = 'ASSETS_INITIALIZE'

export const initializeAssets = (data: Assets): {
  type: string;
  data: Assets;
} => ({
  type: ASSETS_INITIALIZE,
  data,
})
