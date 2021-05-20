import React, { useContext, useEffect } from 'react'
import { Context } from '../'
import { observer } from 'mobx-react-lite'
import { Modal } from 'react-bootstrap'

const InfoDialog = () => {
  const { app } = useContext(Context)

  useEffect(() => {
    if (app.infoShow) {
      const delayExit = setTimeout(() => {
        app.setInfoShow(false)
      }, app.infoDuration)
      return function cleanup() {
        clearTimeout(delayExit)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ app.infoShow ])

  return (
    <Modal
      size="sm"
      show={ app.infoShow }
      onHide={ () => app.setInfoShow(false) }
    >
      <Modal.Header>
        <Modal.Title id="info-dialog-title">
          { app.infoTitle }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{ app.infoText }</p>
      </Modal.Body>
    </Modal>
  )
}

export default observer(InfoDialog)
