class Product {
  
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h1>Total: \$${this.totalAmount.toFixed(2)}</h1>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'A Pillow',
      'data:image/jpeg;base64,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',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzBAsQotCa4BXt76-eEMBQ7C8gPZ8h1vUXg&usqp=CAU',
      'A carpet which you might like - or not.',
      89.99
    )
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}






class Shop {
  render() {
    const renderHook = document.getElementById('King');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
