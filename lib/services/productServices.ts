import { Products } from "@/types/products";

const BASE_URL = "https://dummyjson.com";

export async function getAllProducts() {
    const patch = 'https://dummyjson.com/products';
    let data;
    try{
        const response = await fetch(patch);
        
        data = await response.json();
        if(!data){
            throw new Error('Failed to fetch products');
        }
        return data.products;
    }catch(error){
        console.error('Error fetching products:', error);
        return null;
    }
}

export async function getProductByPercentageDiscount() {
    const patch = `https://dummyjson.com/products`;
    let data;   
    try{
        const response = await fetch(patch);
        data = await response.json();
        if(!data){
            throw new Error('Failed to fetch products by discount percentage');
        }
        // Filtrar productos con descuento
        const productsWithDiscount = data.products.filter(
        product => product.discountPercentage > 13
        );
        
        return productsWithDiscount;
    }catch(error){
        console.error('Error fetching products by discount percentage:', error);
        return null;
    }
}


export async function getProductsById(id: number) {
    const patch = `https://dummyjson.com/products/${id}`;
    try {
        const response = await fetch(patch);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching product:", error);
      } 
}

// Productos recientes (últimos 15 productos)
export async function getRecentProducts(): Promise<Products[]> {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=15&skip=0`);
    if (!response.ok) throw new Error("Error fetching recent products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Productos tecnológicos (categorías: smartphones, laptops, tablets)
export async function getTechProducts(): Promise<Products[]> {
  try {
    const categories = ["smartphones", "laptops", "tablets"];
    const promises = categories.map(category =>
      fetch(`${BASE_URL}/products/category/${category}`).then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    const allProducts = results.flatMap(result => result.products);
    
    return allProducts;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Error fetching categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function loginUser(username: string, password: string) {

  try{
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    
    return res.json();
  }catch(error){
    console.error("Error:", error)
  }
}


export async function getProfile(token: string) {

  try{
    const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
    Authorization: `Bearer ${token}`
    }
    });
    if (!res.ok) throw new Error("No autenticado");

    return res.json();
  }catch(error)
  {
    console.error("Error, ", error)
  }

}

