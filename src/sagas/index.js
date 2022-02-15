import { takeLatest, takeEvery, put, spawn, call } from 'redux-saga/effects';
import {
  fetchServicesSuccess,
  fetchServicesFailed,
  fetchServicesRequest,
  editServicesSuccess,
  editServicesFailed,
  addServicesSuccess,
  addServicesFailed,
} from '../actions/actionCreators';
import {
  FETCH_SERVICES_REQUEST,
  REMOVE_SERVICE,
  EDIT_SERVICES_REQUEST,
  ADD_SERVICES_REQUEST,
  ADD_SERVICES_SUCCESS,
} from '../actions/actionTypes';
import {
  getServices,
  getServiceDetails,
  postService,
  editService,
  deleteService,
} from '../api/index';

// worker
function* handleGetServicesSaga() {
  try {
    const services = yield call(getServices);
    yield put(fetchServicesSuccess(services));
  } catch (e) {
    yield put(fetchServicesFailed(e.message));
  }
}

// watcher
function* watchGetServicesSaga() {
  yield takeLatest(FETCH_SERVICES_REQUEST, handleGetServicesSaga);
}

// worker
function* handleGetDetailsSaga({ payload: { id } }) {
  try {
    if (id) {
      const serviceDetails = yield call(getServiceDetails, id);
      yield put(editServicesSuccess(serviceDetails));
    }
  } catch (e) {
    yield put(editServicesFailed(e.message));
  }
}

// watcher
function* watchGetDetailsSaga() {
  yield takeLatest(EDIT_SERVICES_REQUEST, handleGetDetailsSaga);
}

// worker
function* handleAddServiceSaga({ payload: { item } }) {
  try {
    const isPosted = yield call(postService, item);
    if (isPosted) yield put(addServicesSuccess());
  } catch (e) {
    yield put(addServicesFailed(e.message));
  }
}

// watcher
function* watchAddServiceSaga() {
  yield takeEvery(ADD_SERVICES_REQUEST, handleAddServiceSaga);
}

// worker
function* handleAddServiceSuccessSaga() {
  try {
    yield put(fetchServicesRequest());
  } catch (e) {
    yield put(fetchServicesFailed(e.message));
  }
}

// watcher
function* watchAddServiceSuccessSaga() {
  yield takeEvery(ADD_SERVICES_SUCCESS, handleAddServiceSuccessSaga);
}

// worker
function* handleDeleteServiceSaga({ payload: { id } }) {
  try {
    if (id) {
      const isPosted = yield call(deleteService, id);
      if (isPosted) yield put(fetchServicesRequest());
    }
  } catch (e) {
    yield put(fetchServicesFailed(e.message));
  }
}

// watcher
function* watchDeleteServiceSaga() {
  yield takeEvery(REMOVE_SERVICE, handleDeleteServiceSaga);
}

// worker
function* handleEditServiceSaga({ payload: { item } }) {
  try {
    if (item) {
      const isEdited = yield call(editService, item);
      if (isEdited) yield put(editServicesSuccess());
    }
  } catch (e) {
    yield put(editServicesFailed(e.message));
  }
}

// watcher
function* watchEditServiceSaga() {
  yield takeLatest(EDIT_SERVICES_REQUEST, handleEditServiceSaga);
}

export default function* saga() {
  yield spawn(watchGetServicesSaga);
  yield spawn(watchGetDetailsSaga);
  yield spawn(watchAddServiceSaga);
  yield spawn(watchAddServiceSuccessSaga);
  yield spawn(watchDeleteServiceSaga);
  yield spawn(watchEditServiceSaga);
}
