import { VariantType, ModalProps } from '@adminjs/design-system'
import { SHOW_CONFIRM_MODAL, HIDE_CONFIRM_MODAL } from '../store'

export interface ConfirmModalData {
  modalProps: ModalProps;
  type?: 'alert' | 'confirm';
  resourceId?: string;
  confirmAction?: () => void;
}

export interface ConfirmModalButton {
  label?: string;
  variant?: VariantType;
  onClick?: () => void;
}

export type ConfirmModalFunctions = {
  openModal: (data: ConfirmModalData) => void
  closeModal: () => void
}

export type ShowConfirmModalResponse = {
  type: typeof SHOW_CONFIRM_MODAL
  data: ConfirmModalData;
}

export type HideConfirmModalResponse = {
  type: typeof HIDE_CONFIRM_MODAL;
}
