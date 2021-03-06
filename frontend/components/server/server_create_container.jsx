import ServerForm from './server_form';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeNewServer, receiveErrors } from '../../actions/server_actions';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';


const mapStateToProps = state => {
  const serverErrors = state.errors.servers || {};
  const createErrors = serverErrors.create || [];

  return ({
    formType: 'createServer',
    errors: createErrors,
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    processForm: (server) => dispatch(makeNewServer(server)),
    clearErrors: () => dispatch(receiveErrors([])),
    closeModal: () => dispatch(closeModal())
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerForm));
