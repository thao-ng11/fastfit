import React, {useState, useEffect, useNavigate} from 'react';
import Modal from 'react-bootstrap/Modal';
import Workout from './Workout';

function WorkoutSearchModal({visible,handleClose, data, selectedWorkout, setSelectedWorkout}) {
    console.log(data)
    return (
        <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search for a Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {data.map((workout, id) => {
                        return (
                            <div className='bg-[#BF9ACA] font-semibold py-[.35rem] w-full text-center shadow-md rounded-md bg-gray-50 border border-gray-300 hover:bg-gray-100'>
                                <Workout name={workout.name}
                                    id={id}
                                    selectedWorkout={selectedWorkout}
                                    setSelectedWorkout={setSelectedWorkout} />
                            </div>
                        )
                    })}
        </Modal.Body>
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