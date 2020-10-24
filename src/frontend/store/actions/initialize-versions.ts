import { VersionProps } from '../../../admin-bro-options.interface'

export const VERSIONS_INITIALIZE = 'VERSIONS_INITIALIZE'

export type InitializeVersionsResponse = {
  type: typeof VERSIONS_INITIALIZE;
  data: VersionProps;
}

export const initializeVersions = (data: VersionProps): InitializeVersionsResponse => ({
  type: VERSIONS_INITIALIZE,
  data,
})
