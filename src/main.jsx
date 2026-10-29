import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import App from './App.jsx'
import FormPage from './pages/FormPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import BuilderFallback from './components/BuilderFallback.jsx'
import { RamenBuilderPage, BobaBuilderPage } from './routes.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route
            path="/ramen"
            element={
              <Suspense fallback={<BuilderFallback />}>
                <RamenBuilderPage />
              </Suspense>
            }
          />
          <Route
            path="/boba"
            element={
              <Suspense fallback={<BuilderFallback />}>
                <BobaBuilderPage />
              </Suspense>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
