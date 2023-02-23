import { SHOW_MODAL, HIDE_MODAL } from '../actions'
import { ModalData } from '../../interfaces'

export type ModalInState = (ModalData & { show: true }) | { show: false }

export const modalReducer = (state: ModalInState = { show: false }, action: {
  type: string;
  data: ModalData;
}): ModalInState => {
  switch (action.type) {
  case SHOW_MODAL: {
    return {
      ...action.data,
      show: true,
    }
  }
  case HIDE_MODAL: {
    return {
      show: false,
    }
  }
  default: return state
  }
}
