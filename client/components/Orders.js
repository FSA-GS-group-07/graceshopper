import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../store/orders";

class Orders extends React.Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    console.log(this.props.orders);
    return (
      <div>
        {this.props.orders &&
          this.props.orders.map((order, idx) => {
            let total = 0;
            return (
              <ul key={idx}>
                <li>Order {idx + 1}:</li>
                <li>Date: {order.order.updatedAt.slice(0, 10)}</li>
                <li>
                  Cocktails:
                  {order.cocktails.map((cocktail) => {
                    total += cocktail.price;
                    return (
                      <div key={cocktail.id}>
                        <p>Name: {cocktail.name}</p>
                        <p>Price: {cocktail.price}</p>
                        {/* <img src={cocktail.imageUrl} alt={cocktail.name} /> */}
                      </div>
                    );
                  })}
                </li>
                <li>Order Total: ${total}</li>
              </ul>
            );
          })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => ({
  getOrders: () => {
    dispatch(fetchOrders());
  },
});

export default connect(mapState, mapDispatch)(Orders);
