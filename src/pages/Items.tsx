import DataTable from '../components/DataTable';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, getItems, updateItem } from "../reducers/ItemReducer.ts";
import { appDispatch } from "../store/Store.ts";

export default function Items() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch<appDispatch>();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'qty', label: 'Quantity' },
    { key: 'unitPrice', label: 'Unit Price' },
  ];

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  function editItem(item) {
    setId(item.id);
    setName(item.name);
    setQty(item.qty);
    setUnitPrice(item.unitPrice);
  }

  function clearFields() {
    setId(0);
    setName("");
    setQty(0);
    setUnitPrice(0);
  }

  function handleSave() {
    if (!name || qty <= 0 || unitPrice <= 0) {
      alert("Please fill in all fields with valid data.");
      return;
    }
    dispatch(addItem({ id: 0, name, qty, unitPrice }))
        .unwrap()
        .then(() => clearFields())
        .catch((error) => console.error("Failed to add item:", error));
  }

  function handleUpdate() {
    if (!id || !name || qty <= 0 || unitPrice <= 0) {
      alert("Please fill in all fields with valid data.");
      return;
    }
    dispatch(updateItem({ id, name, qty, unitPrice }))
        .unwrap()
        .then(() => clearFields())
        .catch((error) => console.error("Failed to update item:", error));
  }

  return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Items</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-gray-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                    type="number"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-gray-400"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-gray-400"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                />
              </div>
              <div className="flex-col">
                <button
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-2"
                    onClick={handleSave}
                >
                  Save Item
                </button>
                <button
                    className="w-full bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors mb-2"
                    onClick={handleUpdate}
                >
                  Update Item
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

        {items.length > 0 ? (
            <DataTable
                columns={columns}
                data={items}
                onEdit={editItem}
                onDelete={(item) => dispatch(deleteItem(item.id))}
            />
        ) : (
            <p>No items found</p>
        )}
      </div>
  );
}
