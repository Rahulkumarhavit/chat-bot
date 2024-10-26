// Sample product catalog (you can move this to a database later)
// const products = [
//   { name: 'Cow Ghee', description: 'Organic cow ghee from local farms', price: '$12', category: 'ghee' },
//   { name: 'Butter', description: 'Fresh salted butter', price: '$8', category: 'butter' },
//   { name: 'Curd', description: 'Thick creamy curd', price: '$5', category: 'curd' },
// ];
const products = [
  { name: 'Candles', description: 'Candles', price: '$12', category: 'Candles' },
  { name: 'lights', description: 'lights', price: '$8', category: 'lights' },
  { name: 'diyas', description: 'diyas', price: '$5', category: 'diyas' },
];

// Function to get product recommendations based on user query
function getProductResponse(query) {
  const lowerQuery = query.toLowerCase();

  // Filter products that match the query based on keywords
  const matchedProducts = products.filter(product =>
    lowerQuery.includes(product.category)
  );

  return matchedProducts.length > 0
    ? matchedProducts
    : [{ name: 'No related products found', description: 'No products match your query. Please ask diwali product' }];
}

module.exports = { getProductResponse };
