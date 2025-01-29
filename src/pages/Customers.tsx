import DataTable from '../components/DataTable';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from "../reducers/CustomerReducer.ts";
import { appDispatch } from "../store/Store.ts";

export default function Customers() {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch<appDispatch>();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Telephone' },
  ];

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  function editCustomer(customer) {
    setId(customer.id);
    setName(customer.name);
    setEmail(customer.email);
    setTelephone(customer.telephone);
  }

  function clearFields() {
    setId(0);
    setName("");
    setEmail("");
    setTelephone("");
  }

  function handleSave() {
    if (!name || !email || !telephone) {
      alert("Please fill in all fields.");
      return;
    }
    dispatch(addCustomer({ id: 0, name, email, telephone }))
        .unwrap()
        .then(() => clearFields())
        .catch((error) => console.error("Failed to add customer:", error));
  }

  function handleUpdate() {
    if (!id || !name || !email || !telephone) {
      alert("Please fill in all fields.");
      return;
    }
    dispatch(updateCustomer({ id, name, email, telephone }))
        .unwrap()
        .then(() => clearFields())
        .catch((error) => console.error("Failed to update customer:", error));
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
                    onClick={handleSave}
                >
                  Save Customer
                </button>
                <button
                    className="w-full bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors mb-2"
                    onClick={handleUpdate}
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

        {customers.length > 0 ? (
            <DataTable
                columns={columns}
                data={customers}
                onEdit={editCustomer}
                onDelete={(customer) => dispatch(deleteCustomer(customer.id))}
            />
        ) : (
            <p>No customers found</p>
        )}
      </div>
  );
}
