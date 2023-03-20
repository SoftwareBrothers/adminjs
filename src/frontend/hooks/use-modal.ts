import type { ModalProps } from '@adminjs/design-system'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { ModalData, ModalFunctions } from '../interfaces/index.js'
import { hideModal, showModal } from '../store/actions/index.js'
import useTranslation from './use-translation.js'

export const useModal = (): ModalFunctions => {
  const dispatch = useDispatch()
  const { translateButton, translateLabel, translateMessage } = useTranslation()

  const closeModal = useCallback(() => {
    dispatch(hideModal())
  }, [])

  const openModal = (props: ModalData) => {
    const { modalProps, type, confirmAction, resourceId } = props
    let buttons: ModalProps['buttons'] = modalProps.buttons || []

    const handleConfirm = () => {
      closeModal()
      if (confirmAction) confirmAction()
    }

    if (buttons.length) {
      buttons = buttons.map((button) => {
        button.variant = button.variant || 'default'
        if (button.label === 'cancel') {
          button.onClick = button.onClick || closeModal
        }
        button.label = translateButton(button.label || '', resourceId)
        return button
      })
    }

    if (type === 'confirm') {
      buttons.push({ label: translateButton('cancel', resourceId), onClick: closeModal })
      buttons.push({
        label: translateButton('confirm', resourceId),
        variant: modalProps.variant || 'primary',
        onClick: handleConfirm,
      })
    }

    if (type === 'alert') {
      buttons.push({ label: translateButton('ok', resourceId), variant: 'primary', onClick: closeModal })
    }

    const data: ModalData = {
      modalProps: {
        ...modalProps,
        label: translateLabel(modalProps.label || '', resourceId),
        title: translateMessage(modalProps.title || '', resourceId),
        subTitle: translateMessage(modalProps.subTitle || '', resourceId),
        variant: modalProps.variant,
        buttons,
        onClose: modalProps.onClose || closeModal,
        onOverlayClick: modalProps.onOverlayClick || closeModal,
      },
    }
    dispatch(showModal(data))
  }

  return {
    openModal,
    closeModal,
  }
}
