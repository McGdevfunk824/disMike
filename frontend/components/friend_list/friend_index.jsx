import React from 'react';
import { withRouter, Link, Redirect, NavLink } from 'react-router-dom';

const FriendIndex = (props) => {

  let statusClassName = "online-status offline";
  let renderStatus = props.user.online_status ? "Online" : "Offline";
  let friendControls;
  switch (props.user.friendship_status) {
    case ("ACCEPTED"):
      if (props.user.online_status) {
        statusClassName = "online-status online";
        renderStatus = "Online";
      } else {
        statusClassName = "online-status offline";
        renderStatus = "Offline";
      }
      friendControls = <div className='friend-controls-container'>
        <div className='friend-controls-button' onClick={ () => props.deleteFriend(props.id) }>
          <i className="fas fa-ban"></i>
        </div>
      </div>;
    break;
    case ("PENDING RECEIVE"):
      renderStatus = "Outgoing Friend Request";
      friendControls = <div className='friend-controls-container'>
        <div className='friend-controls-button' onClick={ () => props.deleteFriend(props.id) }>
          <i className="fas fa-ban"></i>
        </div>
      </div>;
      break;
    case ("PENDING ACCEPT"):
      renderStatus = "Incoming Friend Request";
      friendControls = <div className='friend-controls-container'>
        <div className='friend-controls-button' onClick={ () => props.deleteFriend(props.id) }>
          <i className="fas fa-ban"></i>
        </div>
        <div className='friend-controls-button' onClick={ () => props.acceptFriend(props.id) }>
          <i className="fas fa-plus-circle"></i>
        </div>
      </div>;
    break;
  }

  let commonServers = [];
  for (let i = 0; i < props.user.server_ids.length; i++) {
    let server = props.currentUserServers[props.user.server_ids[i]];

    if (server && commonServers.length < 6) {
      commonServers.push(
        <Link key={ i } to={`/${server.id}/`}>
          { server.image_url? <img className='server-icon-pic' src={ server.image_url } /> :
          <div className='server-icon-pic'>{ server.display_name }</div> }
        </Link>
      );
    }
  }


    return (
    <li className="friend-item-container">
      <div className='friend-link-item'>
        <div className="friend-name-container">
          <img className='profile-picture friend-pic' src={ props.user.image_url ? props.user.image_url : ""} />
          <div className='friend-name'>{ props.user.username }</div>
        </div>
        <div className='status-container'>
          <div className={ statusClassName }></div>
          <div className="status-name">{ renderStatus }</div>
        </div>
        <div className='mutual-servers-container'>
          { commonServers }
        </div>
        { friendControls }
      </div>
    </li>
  );
};

export default withRouter(FriendIndex);
