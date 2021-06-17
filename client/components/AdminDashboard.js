import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/user";


class AdminDashboard extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { users } = this.props;
        return (
            <div className="all-users">
                {users.map((user) => (
                    <Link key={user.id} to={`/users/${user.id}`}>
                        <span>
                        <h3>{user.id}</h3>
                        <h1>{user.firstName}{user.lastName}</h1>
                        <h3>{user.email}</h3>
                        </span>
                    </Link>
                ))}
            </div>
        )
    }
}

const mapState = (state) => {
    return { users: state.users };
};

const mapDispatch = (dispatch) => ({
    getUsers: () => {
        dispatch(fetchUsers());
    }
})

export default connect(mapState, mapDispatch)(AdminDashboard);
