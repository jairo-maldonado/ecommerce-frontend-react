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
  const [cartCount, setCartCount] = useState<number>(0);

  // Estado para el formulario de nuevo producto
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para agregar al carrito
  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    alert(`🛒 ¡${productName} agregado al carrito!`);
  };

  // Función para guardar producto en la API (Back-End)
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10)
      });
      alert('✅ ¡Producto creado con éxito!');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setShowForm(false);
      fetchProducts(); // Recargar la lista de la BD
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('❌ Error al guardar el producto. Revisa la consola.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-blue-500">🛒 E-Commerce Store</h1>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 font-semibold text-sm">
            🛒 Carrito: <span className="text-green-400 font-bold">{cartCount}</span>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition"
          >
            {showForm ? 'Cerrar Formulario' : '+ Nuevo Producto'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Formulario de Creación */}
        {showForm && (
          <form onSubmit={handleCreateProduct} className="bg-gray-800 border border-gray-700 p-6 rounded-xl mb-8 max-w-md mx-auto shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Publicar Producto en Base de Datos</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre del producto" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
              />
              <input 
                type="text" 
                placeholder="Descripción" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-4">
                <input 
                  type="number" 
                  placeholder="Precio" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                  className="w-1/2 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
                <input 
                  type="number" 
                  placeholder="Stock" 
                  value={stock} 
                  onChange={(e) => setStock(e.target.value)} 
                  required 
                  className="w-1/2 p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 font-bold rounded-lg transition">
                Guardar en Base de Datos
              </button>
            </div>
          </form>
        )}

        {/* Listado de Productos */}
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
                  <button 
                    onClick={() => handleAddToCart(product.name)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition"
                  >
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