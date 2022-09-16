import React, {useState, useEffect, useNavigate} from 'react';
import Modal from 'react-bootstrap/Modal';
import Workout from './Workout';

function WorkoutSearchModal({visible,handleClose, data, searchTerm, strength, cardio, handleCardio, handleStrength}) {
  const [state,setState] = useState(true)
    return (
        <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {data.map((workout) => {
          let handle = handleStrength;
          let workoutData = strength;
          if (searchTerm === 'Abdominals' || workout.name === 'Jumping rope'){
            handle = handleCardio;
            workoutData = cardio
          }
                        return (
                            <div className='bg-[#073B4C] font-semibold py-[.35rem] w-full text-center shadow-md rounded-md border border-gray-300 hover:bg-[#236175] '>
                                <Workout name={workout.name}
                                    handleStrength={handle}
                                    strength={workoutData} 
                                    cardio={cardio}
                                    setState={setState}/>
                            </div>
                        )
                    })}
        </Modal.Body>
        <Modal.Footer>
          <button disabled={state} variant="primary" onClick={handleClose}>
            Save workout
          </button>
        </Modal.Footer>
      </Modal>
    )

}

export default WorkoutSearchModal;