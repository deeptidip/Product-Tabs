document.addEventListener("DOMContentLoaded", function () {
  fetchAndShowProducts("men");
});

function fetchAndShowProducts(category) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.innerHTML =
      tab.getAttribute("data-category").charAt(0).toUpperCase() +
      tab.getAttribute("data-category").slice(1);
  });

  const productCards = document.querySelectorAll(".product-cards");
  productCards.forEach((cards) => cards.classList.remove("active"));

  const selectedProductCards = document.getElementById(`${category}-products`);
  selectedProductCards.innerHTML = "";

  // Display emoji only when the tab is clicked
  const activeTab = document.querySelector(`.tab[data-category="${category}"]`);
  activeTab.classList.add("active");
  activeTab.innerHTML = `&#128102; ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;

  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const categoryData = data.categories.find(
        (cat) => cat.category_name.toLowerCase() === category.toLowerCase()
      );

      categoryData.category_products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const truncatedTitle =
          product.title.length > 10
            ? product.title.substring(0, 10) + "..."
            : product.title;
        const formattedPrice = parseFloat(product.price).toFixed(2);
        const formattedComparePrice = parseFloat(
          product.compare_at_price
        ).toFixed(2);
        // Check if a badge is present
        const badgeTag = product.badge_text
          ? `<span class="badge">${product.badge_text}</span>`
          : "";

        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    ${badgeTag}
                    <div class="product-card-content">
                        <div class="flex1">
                            <h2>${truncatedTitle}</h2>
                            <p class="dot"><span>&#x2022;</span></p>
                            <p>${product.vendor}</p>
                        </div>
                        <div class="flex2">
                            <p>Rs ${formattedPrice}</p>
                            <p class="compareAt">${formattedComparePrice}</p>
                            <p class="fiftyOff">50% Off</p>
                        </div>
                        <button class="btn">Add to Cart</button>
                    </div>
                `;
        selectedProductCards.appendChild(productCard);
      });
      selectedProductCards.classList.add("active");
    })
    .catch((error) => console.error("Error fetching data:", error));
}
