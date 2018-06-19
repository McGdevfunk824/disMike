import ServerDropdown from './server_dropdown';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { leaveServer, deleteServer } from '../../actions/server_actions';
import { makeNewChannel, receiveErrors, fetchAChannel } from '../../actions/channel_actions';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';


const mapStateToProps = (state, ownProps) => {
  const currentUser = state.session.currentUser;
  const channel = ownProps.channel || {};
  const channelId = channel.id;
  const server = ownProps.server || {};
  const serverId = server.id;
  const channelName = channel.name || "";

  return ({
    channel,
    channelId,
    server,
    serverId,
    channelName,
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAServer: (id) => dispatch(fetchAServer(id)),
    deleteChannel: (id) => dispatch(deleteChannel(id)),
    clearErrors: () => dispatch(receiveErrors([])),
    closeModal: () => dispatch(closeModal())
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelDelete));