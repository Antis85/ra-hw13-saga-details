import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeEditField,
  clearForm,
  editServicesRequest,
} from '../actions/actionCreators';
import Loader from './Loader';

export default function ServiceEdit() {
  const { item, loading, error, redirect } = useSelector((state) => state.serviceEdit);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editServicesRequest({id: params.id}));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (redirect) navigate('/');
  }, [navigate, redirect]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeEditField(name, value));
  };

  const handleReload = () => {
    dispatch(editServicesRequest({id: params.id}));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!item.name || !item.price || item.price <= 0) return;
    dispatch(editServicesRequest({item}));
  };

  const handleClose = (evt) => {
    dispatch(clearForm());
    navigate('/');
  };

  return (
    <>
      {loading && <Loader />}
      {error && (
        <div>
          {error}
          <button onClick={() => handleReload()}>Попробовать снова</button>
        </div>
      )}
      {(!loading && !error) &&(<form onSubmit={handleSubmit} onReset={handleClose}>
        <h3>Edit service:</h3>
        <label>
          Name <input name="name" onChange={handleChange} value={item.name} />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            onChange={handleChange}
            value={item.price}
          />
        </label>
        <label>
          Content
          <input name="content" onChange={handleChange} value={item.content} />
        </label>
        <button
          type="submit"
          disabled={loading || !item.name || !item.price || item.price <= 0}
        >
          Save
        </button>
        <button type="reset" disabled={loading}>
          Close
        </button>
      </form>)}
    </>
  );
}
