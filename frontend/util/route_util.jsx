import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact, user }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/@me/`} />
        )}
    />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => {


  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
};

// class Protected extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//
//
//
//   render() {
//     if (this.props.loaded) {
//       return (
//       <Route
//         path={this.props.path}
//         exact={this.props.exact}
//         render={this.props =>
//           loggedIn ? <Component {...props} /> : <Redirect to="/login" />}
//       />
//     )
//   } else {
//     <Route
//       path={this.props.path}
//       exact={this.props.exact}
//       render={this.props =>
//         loggedIn ? <Loading {...props} /> : <Redirect to="/login" />}
//   }
//   }
// };



const mapStateToProps = (state, ownProps) => {

  const location = ownProps.location.pathname;
  const locationsplit = location.split('/');
  const serverId = locationsplit[1];
  const channelId = locationsplit[2];
  return {loggedIn: Boolean(state.session.user), user: state.session.user};
};

// const mapStateToProps = (state, ownProps) => {
//
//   const location = ownProps.location.pathname;
//   const locationsplit = location.split('/');
//   const serverId = locationsplit[1];
//   const channelId = locationsplit[2];
//   return {
//     loggedIn: Boolean(state.session.currentUser),
//     currentUser: state.session.currentUser,
//     path: ownProps.path,
//     Component: ownProps.component,
//     exact: ownProps.exact,
//   };
// };


export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);
