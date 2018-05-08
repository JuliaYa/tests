import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

var mock = new MockAdapter(axios);

mock.onGet('/companies').reply(200, {
  companies: [
    { id: 1, name: 'Азалия', ogrn: "1053600591197", type: 'ИП', registration_date: '13.09.2015', active: true },
    { id: 2, name: 'Иванов и Ко', ogrn: "1053656791197", type: 'ИП', registration_date: '23.04.2015', active: true },
    { id: 3, name: 'Гарант', ogrn: "8563453534533", type: 'ООО', registration_date: '13.01.2018', active: true },
    { id: 4, name: 'Петров И.П.', ogrn: "8868676434533", type: 'ИП', registration_date: '11.09.2013', active: true },
  ]
});

export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

function fetchCompanies() {
  return axios({
    method: "get",
    url: "/companies"
  });
}

function* workerSaga() {
  try {
    const response = yield call(fetchCompanies);
    const companies = response.data.companies;
    yield put({ type: "API_CALL_SUCCESS", companies });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}