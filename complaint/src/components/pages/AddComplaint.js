import React, { useState } from 'react';
import { onInsertion } from '../../api/comp';

const AddComplaint = () => {
  const [values, setValues] = useState({
    full_name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    product: '',
    priority: 'High',
    channel: 'Email',
    // Add the new fields
    customer_id: '',
    date_time: '',
    assigned_to: '',
    attachments: '',
    resolution: '',
    resolution_date: '',
    closed_date: '',
    feedback: '',
    rating: '',
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onInsertion(values);

      setError('');
      setSuccess(data.message);
      setValues({
        full_name: '',
        email: '',
        phone: '',
        category: '',
        description: '',
        product: '',
        priority: 'High',
        channel: 'Email',
        // Reset new fields
        customer_id: '',
        date_time: '',
        assigned_to: '',
        attachments: '',
        resolution: '',
        resolution_date: '',
        closed_date: '',
        feedback: '',
        rating: '',
      });
    } catch (error) {
      setError('Error adding complaint');
      setSuccess('');
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Add New Complaint</h1>

        {/* Category */}
        <div className='mb-3'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='category'
            name='category'
            value={values.category}
            placeholder='Enter category'
            required
          />
        </div>

        {/* Description */}
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            onChange={(e) => onChange(e)}
            className='form-control'
            id='description'
            name='description'
            value={values.description}
            placeholder='Enter description'
            required
          />
        </div>

        {/* Product */}
        <div className='mb-3'>
          <label htmlFor='product' className='form-label'>
            Product
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='product'
            name='product'
            value={values.product}
            placeholder='Enter product'
            required
          />
        </div>

        {/* Priority */}
        <div className='mb-3'>
          <label htmlFor='priority' className='form-label'>
            Priority
          </label>
          <select
            onChange={(e) => onChange(e)}
            className='form-control'
            id='priority'
            name='priority'
            value={values.priority}
            required
          >
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
        </div>

        {/* Channel */}
        <div className='mb-3'>
          <label htmlFor='channel' className='form-label'>
            Channel
          </label>
          <select
            onChange={(e) => onChange(e)}
            className='form-control'
            id='channel'
            name='channel'
            value={values.channel}
            required
          >
            <option value='Email'>Email</option>
            <option value='Phone'>Phone</option>
            <option value='Chat'>Chat</option>
          </select>
        </div>

        {/* Customer ID */}
        <div className='mb-3'>
          <label htmlFor='customer_id' className='form-label'>
            Customer ID
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='customer_id'
            name='customer_id'
            value={values.customer_id}
            placeholder='Enter customer ID'
            required
          />
        </div>

        {/* Date and Time */}
        <div className='mb-3'>
          <label htmlFor='date_time' className='form-label'>
            Date and Time
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='datetime-local'
            className='form-control'
            id='date_time'
            name='date_time'
            value={values.date_time}
            required
          />
        </div>

        {/* Assigned To */}
        <div className='mb-3'>
          <label htmlFor='assigned_to' className='form-label'>
            Assigned To
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='assigned_to'
            name='assigned_to'
            value={values.assigned_to}
            placeholder='Enter assigned to'
          />
        </div>

        {/* Attachments */}
        <div className='mb-3'>
          <label htmlFor='attachments' className='form-label'>
            Attachments
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='attachments'
            name='attachments'
            value={values.attachments}
            placeholder='Enter attachments'
          />
        </div>

        {/* Resolution */}
        <div className='mb-3'>
          <label htmlFor='resolution' className='form-label'>
            Resolution
          </label>
          <textarea
            onChange={(e) => onChange(e)}
            className='form-control'
            id='resolution'
            name='resolution'
            value={values.resolution}
            placeholder='Enter resolution'
          />
        </div>

        {/* Resolution Date */}
        <div className='mb-3'>
          <label htmlFor='resolution_date' className='form-label'>
            Resolution Date
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='date'
            className='form-control'
            id='resolution_date'
            name='resolution_date'
            value={values.resolution_date}
          />
        </div>

        {/* Closed Date */}
        <div className='mb-3'>
          <label htmlFor='closed_date' className='form-label'>
            Closed Date
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='date'
            className='form-control'
            id='closed_date'
            name='closed_date'
            value={values.closed_date}
          />
        </div>

        {/* Feedback */}
        <div className='mb-3'>
          <label htmlFor='feedback' className='form-label'>
            Feedback
          </label>
          <textarea
            onChange={(e) => onChange(e)}
            className='form-control'
            id='feedback'
            name='feedback'
            value={values.feedback}
            placeholder='Enter feedback'
          />
        </div>

        {/* Rating */}
        <div className='mb-3'>
          <label htmlFor='rating' className='form-label'>
            Rating
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='number'
            className='form-control'
            id='rating'
            name='rating'
            value={values.rating}
            min='1'
            max='5'
            placeholder='Enter rating (1-5)'
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddComplaint;
