import DataTable from '../components/DataTable';
import Customer from "../models/Customer.ts";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCustomer, saveCustomer, updateCustomer} from "../reducers/CustomerReducer.ts";

export default function Customers()  {

  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Telephone' },
  ];


  function editCustomer(customer: Customer) {
    setName(customer.name);
    setEmail(customer.email);
    setTelephone(customer.telephone);
  }

  function clearFields() {
    setName("");
    setEmail("");
    setTelephone("");
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id='txtName'
                type="text"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="txtEmail"
                type="email"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
              <input id="txtTelephone"
                type="tel"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-gray-400"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className="flex-col">
              <button
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-2"
                  onClick={() => {
                    dispatch(saveCustomer({ name, email, telephone }));
                  }}
              >
                Save Customer
              </button>
              <button
                  className="w-full bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors mb-2"
                  onClick={() => {
                    dispatch(updateCustomer({ name, email, telephone }));
                  }}
              >
                Update Customer
              </button>
              <button
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  onClick={clearFields}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {customers ?
          <DataTable
              columns={columns}
              data={customers}
              onEdit={(customer: Customer) => editCustomer(customer)}
              onDelete={(customer: Customer) => dispatch(deleteCustomer(customer.email))}
          />
          : <p>No customers found</p>}

    </div>
  );
};