import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onDeletion, onGet, predictUrgency } from '../../api/comp';
import Modal from 'react-modal';

function Complaints() {
  const [data, setData] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [userPredictedUrgency, setUserPredictedUrgency] = useState('');
  const [validatedUrgency, setValidatedUrgency] = useState('');

  useEffect(() => {
    // Fetch complaints when the component mounts
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      // Fetch complaints using the onGet function
      const response = await onGet();
      setData(response.data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleDelete = async (complaintId) => {
    try {
      console.log('Deleting complaint with ID:', complaintId);
      // Delete the complaint using the onDeletion function
      const { data } = await onDeletion({ complaint_id: complaintId });
      // Fetch updated complaints after deletion
      fetchComplaints();
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  const handlePredictUrgency = async (complaint) => {
    console.log('Prediction called');
    try {
      // Predict urgency using the predictUrgency function
      const predictedUrgency = await predictUrgency(complaint.description);
      if (predictedUrgency !== null) {
        setUserPredictedUrgency(predictedUrgency);
      }
    } catch (error) {
      console.error('Error predicting urgency:', error);
    }
  };

  const handleValidateUrgency = () => {
    setValidatedUrgency(userPredictedUrgency);
    setUserPredictedUrgency('');
  };

  const handleUserUrgencyInput = (event) => {
    setUserPredictedUrgency(event.target.value);
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Complaint list</h3>
      </div>
      <Link to="/AddComplaint" className="btn btn-success">
        Add Complaint
      </Link>
      <div className="mt-3">
        {/* Existing slider */}
        <div className="slider">{/* Your slider content */}</div>
        <table className="table">
          <thead>
            <tr>
              {/* Render table headers */}
              <th>Complaint ID</th>
              <th>Customer Name</th>
              <th>Date Received</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Resolution</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((complaint) => (
              <tr key={complaint.id}>
                {/* Render complaint data */}
                <td>{complaint.complaint_id}</td>
                <td>{complaint.customer_name}</td>
                <td>{complaint.date_time}</td>
                <td>{complaint.category}</td>
                <td>{complaint.subject}</td>
                <td>{complaint.status}</td>
                <td>{complaint.priority}</td>
                <td>{complaint.assigned_to}</td>
                <td>{complaint.resolution}</td>
                <td>{complaint.feedback}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    View / Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(complaint.complaint_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={selectedComplaint !== null}
          onRequestClose={handleCloseModal}
        >
          {selectedComplaint && (
            <div>
              <h2>Complaint Details</h2>
              {/* Render additional details about the complaint */}
              <p>ID: {selectedComplaint.complaint_id}</p>
              <p>Customer Name: {selectedComplaint.customer_name}</p>
              <p>Description: {selectedComplaint.description}</p>
              {/* Add a button to predict urgency */}
              <button onClick={() => handlePredictUrgency(selectedComplaint)}>
                Predict Urgency
              </button>
              {/* Input for user's urgency prediction */}
              <input
                type="text"
                placeholder="Enter your urgency prediction"
                value={userPredictedUrgency}
                onChange={handleUserUrgencyInput}
              />
              {/* Add a button to validate urgency */}
              <button onClick={handleValidateUrgency}>Validate</button>
              {/* Display validated urgency */}
              {validatedUrgency && (
                <p>Validated Urgency: {validatedUrgency}</p>
              )}
              {/* Add an Edit button */}
              <Link
              to={`/editComplaint/${selectedComplaint.complaint_id}`}
              className="btn btn-primary">
              Edit Complaint
              </Link>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Complaints;
