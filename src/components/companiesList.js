import React, { Component } from "react"
import { connect } from "react-redux"

import actionTypes from '../constants'
import CompanyLink from "./companyLink"

class CompaniesList extends Component {
  componentDidMount(){
    this.props.fetchCompanies(); //get data
  };

  renderCompanies(companies){
    if(companies.length === 0){
      return <p>No companies yet</p>
    }
    return companies.map(company => {
      return <CompanyLink company={company} key={company.id}/>
    });
  }

  render(){
    const { fetching, companies, error } = this.props;

    return (
        <div className="companies-list">
          {companies ? this.renderCompanies(companies) : ''}

          {fetching ? (<div>Loading...</div>) : ''}

          {error && <p style={{ color: "red" }}>Sorry, something went wrong!</p>}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.mainReducer.fetching,
    companies: state.mainReducer.companies,
    error: state.mainReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCompanies: () => dispatch({ type: actionTypes.FETCH_COMPANIES_REQUEST })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);