import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function StrengthWorkoutForm({HandleStrength, workoutType, searchTerm, strength,showWorkoutModal, setShowWorkoutModal}) {
    const [state, setState] = useState({
        sets:'',
        repetitions:'',
        weight:'',
        
    });
    console.log(strength)
    const handleSubmit = async event => {
        event.preventDefault();
        const data = state;

        const StrengthWorkoutUrl = 'http://localhost:8020/api/strength_workout'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(StrengthWorkoutUrl, fetchConfig);
        if (response.ok) {
            setState({
                sets:'',
                repetitions:'',
                weight:'',
            });
        }
    }
    function handleChange(e){
        HandleStrength(e,false)
    }
    function handleClose(){
        setShowWorkoutModal(false)
    }
return (
    <Modal show={showWorkoutModal && workoutType !== 'cardio'} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Workout Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                    <input onChange={handleChange} value = {strength.sets} placeholder="sets" required type="text" name="sets" id="sets" className="form-control" />
                    <label htmlFor="name">Sets</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChange} value = {strength.repetitions} placeholder="repetitions" required type="text" name="repetitions" id="repetitions" className="form-control" />
                    <label htmlFor="name">Reps</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChange} value = {strength.weight} placeholder="weight" required type="text" name="weight" id="weight" className="form-control" />
                    <label htmlFor="name">Weight</label>
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

export default StrengthWorkoutForm;