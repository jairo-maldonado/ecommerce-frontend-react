## 📄 2. README para el Front-End (`ecommerce-frontend-react/README.md`)

```markdown
# 🛒 E-Commerce Web App - React, TypeScript & Tailwind CSS

Interfaz de usuario moderna e interactiva para un comercio electrónico en tiempo real. Se conecta con una API RESTful construida en FastAPI para manejar autenticación JWT, creación de productos y gestión del carrito de compras.

![React](https://img.shields.io/badge/React-18+-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---

## 🚀 Características Principales

* 🎨 **Diseño Moderno & Oscuro:** Construido con **Tailwind CSS v4** y componentes totalmente adaptables (Responsive).
* 🛒 **Catálogo de Productos Dinámico:** Consumo en tiempo real del API Back-End (`GET /products`).
* ➕ **Creación de Productos:** Formulario interactivo para publicar productos directamente a la base de datos (`POST /products`).
* 🔐 **Modal de Autenticación JWT:** Inicio de sesión que consume OAuth2 (`POST /auth/login`), gestiona tokens en el `localStorage` y mantiene el estado global.
* 🛍️ **Carrito de Compras:** Contador dinámico interactivo en el header.

---

## 🛠️ Tecnologías Utilizadas

* **Biblioteca UI:** React.js
* **Lenguaje:** TypeScript
* **Herramienta de Construcción:** Vite
* **Estilos:** Tailwind CSS v4 + PostCSS
* **Cliente HTTP:** Axios

---

## ⚙️ Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone [https://github.com/jairo-maldonado/ecommerce-frontend-react.git](https://github.com/jairo-maldonado/ecommerce-frontend-react.git)
cd ecommerce-frontend-react

2. Instalar dependencias
npm install

3. Iniciar el servidor de desarrollo
npm run dev

👤 Autor

Jairo Maldonado - Desarrollador Full-Stack Junior 
LinkedIn: Jairo Maldonado 
GitHub: @jairo-maldonado