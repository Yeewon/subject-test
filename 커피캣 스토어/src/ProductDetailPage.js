import ProductDetail from "./ProductDetail.js";
import { request } from "./utils/api.js";

/*
    {
      "id": 24,
      "name": "10개 묶음",
      "price": 0,
      "stock": 555,
      "created_at": "2021-08-23T23:03:04.873Z",
      "updated_at": "2021-08-23T23:03:04.879Z"
    }

*/
export default function ProductDetailPage({ $target, productId }) {
  this.state = {
    productId,
    product: null,
  };

  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";

  $page.innerHTML = "<h1>상품 정보</h1>";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = "";
    $target.appendChild($page);

    new ProductDetail({
      $target: $page,
      initialState: {
        product: this.state.product,
        selectedOptions: [],
      },
    });
  };

  this.fetchProduct = async () => {
    const product = await request(`/products/${this.state.productId}`);
    this.setState({
      ...this.state,
      product,
    });
  };

  this.fetchProduct();
}
