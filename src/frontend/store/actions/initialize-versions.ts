import { VersionProps } from '../../../admin-bro-options.interface'

export const VERSIONS_INITIALIZE = 'VERSIONS_INITIALIZE'

export const initializeVersions = (data: VersionProps): {
  type: string;
  data: VersionProps;
} => ({
  type: VERSIONS_INITIALIZE,
  data,
})
