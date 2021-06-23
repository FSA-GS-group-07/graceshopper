import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/user';
import {
  BoldText,
  LargeText,
  ContainerUser,
  UserList,
} from '../styled-components';

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users, isAdmin } = this.props;
    return (
      <div className="all-users">
        <ContainerUser>
          <LargeText>User List</LargeText>
          {users &&
            users.map((user) => (
              <UserList>
                <h3>{user.id}</h3>
                {user.firstName} {user.lastName}
                <br />
                <BoldText>Username:</BoldText> {user.username}
                <br />
                <BoldText>Email:</BoldText> {user.email}
              </UserList>
            ))}
        </ContainerUser>

      </div>
    );
  }
}

const mapState = (state) => ({
  users: state.users,
  isAdmin: state.auth.admin,
});

const mapDispatch = (dispatch) => ({
  getUsers: () => {
    dispatch(fetchUsers());
  },
});

export default connect(mapState, mapDispatch)(Users);
