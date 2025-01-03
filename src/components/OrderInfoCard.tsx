import React from 'react';

interface OrderInfoProps {
  customer: string;
  date: string;
  status: string;
}

const OrderInfoCard: React.FC<OrderInfoProps> = ({ customer, date, status }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Customer</p>
          <p className="text-lg font-semibold text-gray-900">{customer}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Order Date</p>
          <p className="text-lg font-semibold text-gray-900">{date}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoCard;