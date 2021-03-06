import MessageForm from './message_form';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { openDropdown, closeDropdown } from '../../actions/dropdown_actions';
import { fetchAllMessages, makeNewMessage, receiveErrors } from '../../actions/message_actions';
import { fetchAllChannels, fetchAChannel } from '../../actions/channel_actions';
import { connect } from 'react-redux';



const mapStateToProps = (state, ownProps) => {
  const messageType = ownProps.messageType || "";
  const currentUser = state.session.currentUser || {};
  const channelId = ownProps.channelId || "";
  const currentChannel = messageType === "Channel" ?
    state.entities.channels[ownProps.channelId] :
    state.entities.dms[ownProps.channelId];
  const currentServer = state.session.currentServer || {};
  const currentChannelName = currentChannel.name || "";
  const dropdown = state.ui.dropdown.dropdownType;
  const symbol = ownProps.symbol;
  return ({
    dropdown,
    messageType,
    channelId,
    currentChannelName,
    currentUser,
    currentChannel,
    currentServer,
    symbol,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return ({
    openDropdown: (e) => {
      e.stopPropagation();
      dispatch(openDropdown({dropdownType: "emoji"}));
    },
    closeDropdown: (e) => {
      e.stopPropagation();
      dispatch(closeDropdown());
    },
    scrollBottom: () => ownProps.scrollBottom(),
    processForm: (message) => dispatch(makeNewMessage(message)),
    fetchAllChannels: (id) => dispatch(fetchAllChannels(id)),
    fetchAChannel: (id) => dispatch(fetchAChannel(id)),
    fetchAllMessages: (id) => dispatch(fetchAllMessages(id)),
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageForm));
