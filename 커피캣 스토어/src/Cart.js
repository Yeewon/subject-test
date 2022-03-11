import { priceToString } from "./utils/format.js";
import { push } from "./utils/router.js";
import { setItem } from "./utils/storage.js";

export default function Cart({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "Cart";
  this.state = initialState;

  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    return this.state.reduce(
      (acc, option) =>
        acc + (option.productPrice + option.optionPrice) * option.quantity,
      0
    );
  };

  this.render = () => {
    $component.innerHTML = `
        <ul>
        ${this.state
          .map(
            ({
              imageUrl,
              productName,
              productPrice,
              quantity,
              optionName,
              optionPrice,
            }) => `
                <li class="Cart__item">
                    <img src="${imageUrl}">
                    <div class="Cart__itemDesription">
                    <div>${productName} ${optionName} ${priceToString(
              optionPrice
            )}원 ${quantity}개</div>
                    <div>${priceToString(
                      (productPrice + optionPrice) * quantity
                    )}원</div>
                    </div>
                </li>
            `
          )
          .join("")}
          </ul>
          <div class="Cart__totalPrice">
            총 상품가격 ${priceToString(this.getTotalPrice())}원
          </div>
          <button class="OrderButton">주문하기</button>
        `;
  };

  $component.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      alert("주문되었습니다.");
      setItem("products_cart", []);
      push("/web/");
    }
  });

  this.render();
}
