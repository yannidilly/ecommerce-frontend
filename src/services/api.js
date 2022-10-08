export async function getCategories() {
  const req = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = req.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  if (!query) url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(url);
  const jsonData = response.json();
  return jsonData;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
