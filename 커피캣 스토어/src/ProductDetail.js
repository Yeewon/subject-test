import SelectedOptions from "./SelectedOptions.js";
import { priceToString } from "./utils/format.js";

export default function ProductDetail({ $target, initialState }) {
  const $productDetail = document.createElement("div");
  $productDetail.className = "ProductDetail";

  $target.appendChild($productDetail);

  let selectedOptions = null;

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();

    if (selectedOptions) {
      selectedOptions.setState({
        selectedOptions: this.state.selectedOptions,
      });
    }
  };

  this.render = () => {
    if (!this.state.product) return;

    const { id, name, price, imageUrl, productOptions } = this.state.product;

    $productDetail.innerHTML = `
        <div class="ProductDetail" data-id="${id}">
        <img
            src="${imageUrl}">
        <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price">${priceToString(price)}원~</div>
            <select>
                <option>선택하세요.</option>
                ${productOptions
                  .map(
                    ({ id, name, stock, price }) =>
                      `<option value=${id} ${
                        stock ? "" : "disabled"
                      }> ${name} ${price ? `(+${price})` : ""}</option>`
                  )
                  .join("")}
            </select>
            <div class="ProductDetail__selectedOptions"></div>
        </div>
    </div>
        `;
    selectedOptions = new SelectedOptions({
      $target: $productDetail.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    });
  };

  $productDetail.addEventListener("change", ({ target }) => {
    if (target.tagName === "SELECT") {
      const selectedOptionId = parseInt(target.value);
      const { product, selectedOptions } = this.state;

      const option = product.productOptions.find(
        (option) => option.id === selectedOptionId
      );
      const selectedOption = selectedOptions.find(
        (selectedOption) => selectedOption.optionId === selectedOptionId
      );

      if (option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];

        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions,
        });
      }
    }
  });

  this.render();
}
