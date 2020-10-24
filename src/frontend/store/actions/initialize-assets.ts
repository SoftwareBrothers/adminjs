import { Assets } from '../../../admin-bro-options.interface'

export const ASSETS_INITIALIZE = 'ASSETS_INITIALIZE'

export type initializeAssetsResponse = {
  type: string;
  data: Assets;
}

export const initializeAssets = (data: Assets): initializeAssetsResponse => ({
  type: ASSETS_INITIALIZE,
  data,
})
