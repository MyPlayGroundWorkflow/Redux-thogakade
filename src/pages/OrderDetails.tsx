import {useEffect, useState} from 'react';
import OrderInfoCard from '../components/OrderInfoCard';
import OrderItemsTable from '../components/OrderItemsTable';
import {useDispatch, useSelector} from "react-redux";
import Order from "../models/Order.ts";
import {appDispatch} from "../store/Store.ts";
import {getOrders} from "../reducers/OrderReducer.ts";


const OrderDetails = () => {

  const orders = useSelector((state) => state.orders);

  const [selectedOrderId, setSelectedOrderId] = useState('');

  const dispatch = useDispatch<appDispatch>();

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch]);

  function selectOrderById(orderId) {
    console.log(orders)
    console.log(orderId)
    return orders.find((o) => o.id == orderId) || null;
  }

  let selectedOrder = selectedOrderId ? selectOrderById(selectedOrderId) : new Order(0, '', '', '', []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Order</label>
          <select
            value={selectedOrderId}
            onChange={(e) => {
              setSelectedOrderId(e.target.value);
            }}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select an order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.customer} ({order.date})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedOrder && (
        <>
          <OrderInfoCard
            customer={selectedOrder.customer}
            date={selectedOrder.date}
            status={selectedOrder.status}
          />
          <OrderItemsTable items={selectedOrder.items} />
        </>
      )}
    </div>
  );
};

export default OrderDetails;