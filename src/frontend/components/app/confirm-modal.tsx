import { Modal } from '@adminjs/design-system'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReduxState } from '../../store'

export const ConfirmModal: FC = () => {
  const confirmModalState = useSelector((state: ReduxState) => state.confirmModal)

  return confirmModalState.show ? <Modal {...confirmModalState.modalProps} /> : null
}

export default ConfirmModal
