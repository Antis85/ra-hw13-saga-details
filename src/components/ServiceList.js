import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServicesRequest, removeService } from '../actions/actionCreators';
import ServiceAdd from './ServiceAdd';
import ServiceFilter from './ServiceFilter';
import Loader from './Loader';

export default function ServiceList() {
  const { services, activeFilter, loading, error } = useSelector(
    (state) => state.serviceList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServicesRequest());
  }, [dispatch]);

  const handleReload = () => {
    dispatch(fetchServicesRequest());
  };

  const handleRemove = (id) => {
    dispatch(removeService(id));
  };

  const handleEdit = (id) => {
    if (id) navigate('/' + id + '/details');
  };

  const filteredServices =
    activeFilter &&
    services.filter((service) =>
      service.name.toLowerCase().includes(activeFilter.toLowerCase())
    );
  const items = filteredServices.length ? filteredServices : services;
  const itemsList = items.map((o) => (
    <li key={o.id}>
      {o.name} {o.price}
      <button disabled={o.loading} onClick={() => handleEdit(o.id)}>
        ✎
      </button>
      <button disabled={o.loading} onClick={() => handleRemove(o.id)}>
        ✕
      </button>
    </li>
  ));

  return (
    <>
      <ServiceAdd />
      <ServiceFilter />
      {loading && <Loader />}
      {error && (
        <div>
          {error}
          <button onClick={() => handleReload()}>Попробовать снова</button>
        </div>
      )}
      {!loading && !error && (
        <ul>
          {!filteredServices.length && activeFilter
            ? 'Nothing to display. Try another filter string!'
            : itemsList}
        </ul>
      )}
    </>
  );
}
