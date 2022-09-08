import React, { useState, useEffect, useNavigate } from "react";
import Modal from "react-bootstrap/Modal";

function JournalModal({ journal, setActiveModal, activeModal }) {
  console.log(journal);
  function handleClose() {
    setActiveModal(false);
  }
  return (
    <Modal show={activeModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Journal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>3 things I'm grateful for</label>
          <textarea>{journal.grateful}</textarea>
        </div>
        <div>
          <label>Daily Affirmation</label>
          <textarea>{journal.daily_aff}</textarea>
        </div>
        <div>
          <label>Note</label>
          <textarea>{journal.note}</textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default JournalModal;
