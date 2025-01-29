import {useState} from 'react';
import CartTable from '../components/CartTable';
import CartItem from "../models/CartItem.ts";
import {useDispatch, useSelector} from "react-redux";
import OrderDetail from "../models/OrderDetail.ts";
import {appDispatch} from "../store/Store.ts";
import {addOrder} from "../reducers/OrderReducer.ts";

const Orders = () => {

  const customers = useSelector((state) => state.customers);
  const items = useSelector((state) => state.items);

  const dispatch = useDispatch<appDispatch>();

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = () => {
    if (!selectedItem || !selectedCustomer || quantity <= 0) return;

    const item = items.find(i => i.id == selectedItem);
    if (!item) return;

    const newItem: CartItem = {
      id: item.id,
      name: item.name,
      quantity: quantity,
      unitPrice: item.unitPrice,
      total: item.unitPrice * quantity
    };

    setCartItems([...cartItems, newItem]);
    setSelectedItem('');
    setQuantity(1);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0 || !selectedCustomer) return;

    const orderDetails: OrderDetail[] = cartItems.map(item => ({
      orderId: '',
      item: item.id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.total
    }));

    dispatch(addOrder({
      id: 0,
      customer: selectedCustomer,
      date: new Date().toISOString().split('T')[0],
      status: 'Success',
      items: orderDetails
    }))

    // Reset form
    setCartItems([]);
    setSelectedCustomer('');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Order</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.email} value={customer.email}>{customer.email}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>{item.id} - {item.name} - ${item.unitPrice}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="space-y-6">
          <CartTable items={cartItems} onRemove={handleRemoveFromCart} />
          
          <div className="flex justify-end">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;