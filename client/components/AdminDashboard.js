import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/user';
import styled from 'styled-components';

//CSS STYLES
const Container = styled.div`
  max-width: 800px;
  padding: 1rem 4rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const List = styled.div`
  width: 100%;
  padding: 1rem 4rem 1rem 4rem;
`;

const LargeText = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 3rem;
`;

const BoldText = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
`;

class AdminDashboard extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users, isAdmin } = this.props;
    return (
      <div className="all-users">
        <Container>
          <LargeText>User List</LargeText>
          {users &&
            users.map((user) => (
              <List>
                <h3>{user.id}</h3>
                {user.firstName} {user.lastName}
                <br />
                <BoldText>Username:</BoldText> {user.username}
                <br />
                <BoldText>Email:</BoldText> {user.email}
              </List>
            ))}
        </Container>
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

export default connect(mapState, mapDispatch)(AdminDashboard);
