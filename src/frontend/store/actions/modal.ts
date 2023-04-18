import type { ModalData, ShowModalResponse, HideModalResponse } from '../../interfaces/index.js'

export const SHOW_MODAL = 'SHOW_MODAL'

export const HIDE_MODAL = 'HIDE_MODAL'

export const showModal = (data: ModalData): ShowModalResponse => ({
  type: SHOW_MODAL,
  data,
})

export const hideModal = (): HideModalResponse => ({
  type: HIDE_MODAL,
})
