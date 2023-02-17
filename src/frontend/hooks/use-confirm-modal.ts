import { ModalProps } from '@adminjs/design-system'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ConfirmModalData, ConfirmModalFunctions } from '../interfaces'
import { hideConfirmModal, showConfirmModal } from '../store/actions'
import useTranslation from './use-translation'

export const useConfirmModal = (): ConfirmModalFunctions => {
  const dispatch = useDispatch()
  const { translateButton, translateLabel, translateMessage } = useTranslation()

  const closeModal = useCallback(() => {
    dispatch(hideConfirmModal())
  }, [])

  const openModal = (props: ConfirmModalData) => {
    const { modalProps, type = 'alert', confirmAction, resourceId } = props
    const buttons: ModalProps['buttons'] = modalProps.buttons || []
    const isDanger = modalProps.title === 'confirmDelete'

    const handleConfirm = () => {
      closeModal()
      if (confirmAction) confirmAction()
    }

    if (type === 'confirm') {
      buttons.push({ label: translateButton('cancel', resourceId), onClick: closeModal })
      buttons.push({
        label: translateButton('confirm', resourceId),
        variant: isDanger ? 'danger' : 'primary',
        onClick: handleConfirm,
      })
    }

    if (type === 'alert') {
      buttons.push({ label: translateButton('ok', resourceId) })
    }

    const data: ConfirmModalData = {
      modalProps: {
        ...modalProps,
        title: translateMessage(modalProps.title || '', resourceId),
        label: translateLabel(modalProps.label || '', resourceId),
        subTitle: translateLabel(modalProps.subTitle || '', resourceId),
        variant: isDanger ? 'danger' : modalProps.variant,
        buttons,
        onClose: modalProps.onClose || closeModal,
        onOverlayClick: modalProps.onOverlayClick || closeModal,
      },
    }
    dispatch(showConfirmModal(data))
  }

  return {
    openModal,
    closeModal,
  }
}
