import ProductDetail from "./ProductDetail.js";
import { request } from "./utils/api.js";

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
