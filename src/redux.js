import actionTypes from './constants'

const initialState = {
  fetching: false,
  companies: null,
  choosen_company: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_COMPANIES_REQUEST:
      return { ...state, fetching: true, choosen_company: null, error: null };
    case actionTypes.FETCH_COMPANIES_SUCCESS:
      return { ...state, fetching: false, choosen_company: null, companies: action.companies };
    case actionTypes.FETCH_COMPANIES_FAILURE:
      return { ...state, fetching: false, choosen_company: null, companies: null, error: action.error };
    case actionTypes.CHOOSE_COMPANY:
      return { ...state, fetching: true, choosen_company: null, error: null };
    case actionTypes.CHOOSE_COMPANY_SUCCESS:
      return { ...state, fetching: false, choosen_company: action.company, error: null}
    case actionTypes.FETCH_COMPANY_FAILURE:
      return { ...state, fetching: false, choosen_company: null, error: action.error}
    default:
      return state;
  }
}