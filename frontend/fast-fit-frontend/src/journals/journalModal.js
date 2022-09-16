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
            <textarea className="w-full">
              {journal.grateful}
            </textarea>
          </div>
        </div>
        <div>
          <label className="font-semibold">Daily Affirmation</label>
          <div>
            <textarea className="w-full">
              {journal.daily_aff}
            </textarea>
          </div>
        </div>
        <div>
          <label className="font-semibold">Note</label>
          <div>
            <textarea className="w-full">
              {journal.note}
            </textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className=" bg-gradient-to-bl from-[#BF9ACA] to-[#c7e8f3] btn border border-[#F1F1F1] shadow-sm font-bold  hover:bg-gradient-to-r from-[#BF9ACA] to-[#c7e8f3] text-[#F1F1F1]"
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
