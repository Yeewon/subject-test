import CartPage from "./CartPage.js";
import ProductDetailPage from "./ProductDetailPage.js";
import ProductListPage from "./ProductListPage.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    $target.innerHTML = "";

    if (pathname === "/web/") {
      new ProductListPage({ $target }).render();
    } else if (pathname.includes("products")) {
      const [, , , productId] = pathname.split("/");
      new ProductDetailPage({
        $target,
        productId,
      });
    } else if (pathname.includes("cart")) {
      new CartPage({
        $target,
      });
    }
  };

  window.onpopstate = () => {
    this.route();
  };

  initRouter(this.route);
  this.route();
}
