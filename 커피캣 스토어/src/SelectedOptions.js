import { priceToString } from "./utils/format.js";

export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.appendChild($component);

  this.state = initialState;

  this.getTotalPrice = () => {
    const { product, selectedOptions = [] } = this.state;
    const { price: productPrice } = product;

    return selectedOptions.reduce(
      (acc, option) =>
        acc + (productPrice + option.optionPrice) * option.quantity,
      0
    );
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { product, selectedOptions = [] } = this.state;

    if (product && selectedOptions) {
      $component.innerHTML = `
                <h3>선택된 상품</h3>
                    <ul>
                       ${selectedOptions
                         .map(
                           ({
                             optionName,
                             optionPrice,
                             optionId,
                             quantity,
                           }) => `
                                <li>
                                    ${optionName} ${priceToString(
                             product.price + optionPrice
                           )}원
                                    <input type="text" min="1" data-optionId="${optionId}" value="${quantity}"> 
                                </li>
                           `
                         )
                         .join("")} 
                    </ul>
                    <div class="ProductDetail__totalPrice">${priceToString(
                      this.getTotalPrice()
                    )}원</div>
                <button class="OrderButton">주문하기</button>
            `;
    }
  };

  $component.addEventListener("change", (e) => {
    const { target } = e;

    if (target.tagName === "INPUT") {
      try {
        const nextQuantity = parseInt(target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];

        if (typeof nextQuantity === "number") {
          const { product } = this.state;

          const optionId = parseInt(target.dataset.optionid);
          const option = product.productOptions.find(
            (option) => option.id === optionId
          );
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            (selectedOption) => selectedOption.optionId === optionId
          );

          nextSelectedOptions[selectedOptionIndex].quantity = Math.min(
            nextQuantity,
            option.stock
          );

          this.setState({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  this.render();
}
