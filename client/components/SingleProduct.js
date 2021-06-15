import React from "react";
import { connect } from "react-redux";
import fetchProduct from "../store/singleproduct";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
        <h3>{product.address}</h3>
        <p>{product.description}</p>
        <img src={product.imageUrl} />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(null, mapDispatch)(SingleProduct);
