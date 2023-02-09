import { ConfirmModalData, ShowConfirmModalResponse, HideConfirmModalResponse } from '../../interfaces'

export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL'

export const HIDE_CONFIRM_MODAL = 'HIDE_CONFIRM_MODAL'

export const showConfirmModal = (data: ConfirmModalData): ShowConfirmModalResponse => (
  {
    type: SHOW_CONFIRM_MODAL,
    data,
  }
)

export const hideConfirmModal = (): HideConfirmModalResponse => (
  {
    type: HIDE_CONFIRM_MODAL,
  }
)
