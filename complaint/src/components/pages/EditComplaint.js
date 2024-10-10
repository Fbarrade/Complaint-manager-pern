import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditComplaint() {
  const { complaintId } = useParams();
  const [complaintData, setComplaintData] = useState(null);
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch(`/api/complaints/${complaintId}`);
        if (response.ok) {
          const data = await response.json();
          setComplaintData(data);
        } else {
          console.error('Error fetching complaint data');
        }
      } catch (error) {
        console.error('Error fetching complaint data:', error);
      }
    };

    fetchComplaintData();
  }, [complaintId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComplaintData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (response.ok) {
        navigate('/complaintList');
      } else {
        console.error('Error updating complaint data');
      }
    } catch (error) {
      console.error('Error updating complaint data:', error);
    }
  };

  return (
    <div>
      <h2>Edit Complaint</h2>
      {complaintData ? (
        <form>
          <div>
            <label>Complaint ID:</label>
            <input type="text" value={complaintData.complaint_id} readOnly />
          </div>
          <div>
            <label>Customer Name:</label>
            <input
              type="text"
              name="customer_name"
              value={complaintData.customer_name}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more form fields for editing other complaint details */}
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditComplaint;
