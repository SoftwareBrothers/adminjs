import { Modal, ButtonProps } from '@adminjs/design-system'
import React from 'react'
import { useSelector } from 'react-redux'
// import { ConfirmModalButton } from '../../interfaces'
import { ReduxState } from '../../store'
import { useConfirmModal, useTranslation } from '../../hooks'

export const ConfirmModal = () => {
  const confirmModalState = useSelector((state: ReduxState) => state.confirmModal)
  const { closeModal } = useConfirmModal()
  const { translateButton, translateLabel, translateMessage } = useTranslation()

  const { show, modalProps, resourceId, confirmAction } = confirmModalState

  const confirm = (action: () => void) => {
    closeModal()
    if (action) action()
  }

  if (show) {
    modalProps.title = translateMessage(modalProps.title, resourceId)
    modalProps.label = translateLabel(modalProps.label, resourceId)
    modalProps.subTitle = translateLabel(modalProps.subTitle, resourceId)
    const buttons: Array<ButtonProps> = []
    modalProps.buttons.forEach((button: ButtonProps, index: number) => {
      buttons[index] = { ...button }
      switch (button.label) {
      case 'confirm':
        buttons[index].variant = button.variant || 'primary'
        buttons[index].onClick = () => { confirm(confirmAction) }
        break
      case 'cancel':
        buttons[index].variant = button.variant || 'default'
        buttons[index].onClick = button.onClick || closeModal
        break
      case 'ok':
        buttons[index].variant = button.variant || 'default'
        buttons[index].onClick = button.onClick || closeModal
        break
      default:
        buttons[index].variant = button.variant || 'default'
      }
      button.label = translateButton(button.label, resourceId)
    })
    modalProps.buttons = [...buttons]
    modalProps.onOverlayClick = modalProps.onOverlayClick || closeModal
    modalProps.onClose = modalProps.onClose || closeModal
  }

  return (
    confirmModalState.show ? <Modal {...modalProps} /> : null
  )
}

export default ConfirmModal
