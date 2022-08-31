import React, {useState, useEffect, useNavigate} from 'react';
import Modal from 'react-bootstrap/Modal';

function WorkoutSearchModal({visible,handleClose, data}) {
    console.log(data)
    return (
        <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search for a Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    )

}

export default WorkoutSearchModal;