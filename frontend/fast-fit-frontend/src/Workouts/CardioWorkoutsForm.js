import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function CardioWorkoutForm({HandleCardio, workoutType, setShowWorkoutModal, showWorkoutModal, cardio}) {
    const [state, setState] = useState({
        distance: '',
        duration:'',
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const data =  state;

        const CardioWorkoutUrl = 'http://localhost:8020/api/cardio_workout'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(CardioWorkoutUrl, fetchConfig);
        if (response.ok) {
            setState({
                distance:'',
                duration:'',
            });
        }
    }
    function handleChange(e){
        HandleCardio(e,false)
    }
    function handleClose(){
        setShowWorkoutModal(false)
    }
return (
    

    <Modal show={showWorkoutModal && workoutType ==='cardio'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
                <input onChange={handleChange} value = {cardio.distance}placeholder="distance" required type="text" name="distance" id="distance" className="form-control" />
                <label htmlFor="name">Distance</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value = {cardio.duration}placeholder="duration" required type="text" name="duration" id="duration" className="form-control" />
                <label htmlFor="name">Duration</label>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

);
}

export default CardioWorkoutForm;
