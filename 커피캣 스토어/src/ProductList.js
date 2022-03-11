import { push } from "./utils/router.js";

export default function ProductList({ $target, initialState }) {
  const $productList = document.createElement("ul");
  $target.appendChild($productList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;

    $productList.innerHTML = `
            ${this.state
              .map(
                ({ id, name, price, imageUrl }) =>
                  `
                <li class="Product" data-product-id="${id}">
                    <img src="${imageUrl}">
                    <div class="Product_info">
                        <div>${name}</div>
                        <div>${price}</div>
                    </div>
                </li>
                `
              )
              .join("")}
        `;
  };

  $productList.addEventListener("click", ({ target }) => {
    const $li = target.closest("li");
    const { productId } = $li.dataset;

    if (productId) {
      push(`/web/products/${productId}`);
    }
  });

  this.render();
}
