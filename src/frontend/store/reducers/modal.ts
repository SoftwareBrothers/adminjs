import { SHOW_CONFIRM_MODAL, HIDE_CONFIRM_MODAL } from '../actions'
import { ConfirmModalData } from '../../interfaces'

export type ConfirmModalInState = (ConfirmModalData & { show: true }) | { show: false }

export const confirmModalReducer = (state: ConfirmModalInState = { show: false }, action: {
  type: string;
  data: ConfirmModalData;
}): ConfirmModalInState => {
  switch (action.type) {
  case SHOW_CONFIRM_MODAL: {
    return {
      ...action.data,
      show: true,
    }
  }
  case HIDE_CONFIRM_MODAL: {
    return {
      show: false,
    }
  }
  default: return state
  }
}
