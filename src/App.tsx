import { useEffect, useState } from 'react';
import { api } from './api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Función para obtener productos desde la API en FastAPI
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-blue-500">🛒 E-Commerce Store</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition">
          Iniciar Sesión
        </button>
      </header>

      <main className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-300">Catálogo de Productos</h2>

        {loading ? (
          <p className="text-gray-400">Cargando productos desde FastAPI...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400">No hay productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description || 'Sin descripción'}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-400">${product.price.toLocaleString('es-CL')}</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Stock: {product.stock}</span>
                  </div>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition">
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;