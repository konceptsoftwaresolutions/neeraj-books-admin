export function transformCategoriesData(apiData) {
  const result = [];
  
  // Function to recursively process categories and subcategories
  function processCategory(category) {
    // Add the current category
    result.push({
      label: category.name,
      value: category.name
    });
    
    // Process subcategories if they exist
    if (category.subcategories && Array.isArray(category.subcategories) && category.subcategories.length > 0) {
      category.subcategories.forEach(subcategory => {
        processCategory(subcategory);
      });
    }
  }
  
  // Process all top-level categories
  apiData.forEach(category => {
    processCategory(category);
  });
  
  return result;
}