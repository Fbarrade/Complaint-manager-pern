import { useState } from 'react';
import {onRegistration} from "../../../api/auth"
const Register = () => {
  const [values, setValues] = useState({
    full_name: '',
    email: '',
    phone: '',
    client_type: 'Premium',
    country: 'Canada',
    city: 'Toronto',
    password: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);

      setError('');
      setSuccess(data.message);
      setValues({
        full_name: '',
        email: '',
        phone: '',
        client_type: 'Premium',
        country: 'Canada',
        city: 'Toronto',
        password: '',
      });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess('');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Register</h1>

        <div className='mb-3'>
          <label htmlFor='full_name' className='form-label'>
            Full Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='full_name'
            name='full_name'
            value={values.full_name}
            placeholder='Jane Smith'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone Number
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='phone'
            name='phone'
            value={values.phone}
            placeholder='+9876543210'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='client_type' className='form-label'>
            Client Type
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='client_type'
            name='client_type'
            value={values.client_type}
            placeholder='Premium'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='country' className='form-label'>
            Country
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='country'
            name='country'
            value={values.country}
            placeholder='Canada'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='city' className='form-label'>
            City
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='city'
            name='city'
            value={values.city}
            placeholder='Toronto'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
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

export default Register;
