import { useDispatch } from 'react-redux'
import { ButtonProps } from '@adminjs/design-system'
import { showConfirmModal, hideConfirmModal } from '../store/actions'
import { ConfirmModalFunctions, ConfirmModalData } from '../interfaces'

export const useConfirmModal = (): ConfirmModalFunctions => {
  const dispatch = useDispatch()
  const openModal = (props: ConfirmModalData) => {
    const { modalProps, type = 'alert', confirmAction, resourceId } = props

    const buttons: Array<ButtonProps> = modalProps.buttons || []

    if (type === 'confirm') {
      buttons.push({ label: 'cancel' })
      buttons.push({ label: 'confirm' })
    }
    if (type === 'alert') {
      buttons.push({ label: 'ok' })
    }
    modalProps.buttons = buttons
    modalProps.title = modalProps.title || 'alert'
    modalProps.variant = modalProps.variant || 'primary'
    modalProps.icon = modalProps.icon || 'Grid'
    modalProps.subTitle = modalProps.subTitle || ''
    modalProps.label = modalProps.label || ''

    const data = {
      modalProps,
      type,
      confirmAction,
      resourceId,
    }
    dispatch(showConfirmModal(data))
  }

  const closeModal = () => {
    dispatch(hideConfirmModal())
  }

  return {
    openModal,
    closeModal,
  }
}
