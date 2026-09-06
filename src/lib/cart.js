import { getProductById } from '../data/products';

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 500;

export function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);
}

export function calculateDeliveryFee(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export function calculateTotal(items) {
  const subtotal = calculateSubtotal(items);
  const delivery = calculateDeliveryFee(subtotal);
  return subtotal + delivery;
}

export function calculateCartQuantity(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'TKR-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export function formatPrice(amount) {
  return `₹${amount}`;
}

export function validateCustomerForm(form) {
  const errors = {};
  if (!form.name?.trim()) errors.name = 'Name is required';
  if (!form.phone?.trim()) errors.phone = 'Phone number is required';
  else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid 10-digit Indian phone number';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.address?.trim()) errors.address = 'Delivery address is required';
  if (!form.city?.trim()) errors.city = 'City is required';
  if (!form.pincode?.trim()) errors.pincode = 'Pincode is required';
  else if (!/^\d{6}$/.test(form.pincode.replace(/\s/g, ''))) errors.pincode = 'Enter a valid 6-digit pincode';
  return { valid: Object.keys(errors).length === 0, errors };
}
