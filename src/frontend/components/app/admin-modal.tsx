import { Modal } from '@adminjs/design-system'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { ReduxState } from '../../store/index.js'

export const AdminModal: FC = () => {
  const modalState = useSelector((state: ReduxState) => state.modal)

  return modalState.show ? <Modal {...modalState.modalProps} /> : null
}

export default AdminModal
