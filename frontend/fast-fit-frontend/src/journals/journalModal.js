import Modal from "react-bootstrap/Modal";

function JournalModal({ journal, setActiveModal, activeModal }) {
  console.log(journal);
  function handleClose() {
    setActiveModal(false);
  }
  return (
    <Modal show={activeModal} onHide={handleClose}>
      <Modal.Header className="bg-[#C7E8F3]" closeButton>
        <Modal.Title className="w-full text-center ">Your Journal</Modal.Title>
      </Modal.Header>
      <Modal.Body className="w-full">
        <div>
          <label className="font-semibold">3 things I'm grateful for</label>
          <div>
            <textarea className="w-full" value="grateful" readOnly>
              {journal.grateful}
            </textarea>
          </div>
        </div>
        <div>
          <label className="font-semibold">Daily Affirmation</label>
          <div>
            <textarea className="w-full" value="daily_aff" readOnly>
              {journal.daily_aff}
            </textarea>
          </div>
        </div>
        <div>
          <label className="font-semibold">Note</label>
          <div>
            <textarea className="w-full" value="note" readOnly>
              {journal.note}
            </textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-[#BF9ACA] btn rounded font-semibold text-[#F1F1F1]"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default JournalModal;
