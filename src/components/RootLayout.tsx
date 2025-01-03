import Sidebar from "./Sidebar.tsx";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";
import Customers from "../pages/Customers.tsx";
import Items from "../pages/Items.tsx";
import Orders from "../pages/Orders.tsx";
import OrderDetails from "../pages/OrderDetails.tsx";

export default function RootLayout() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex">
                <Sidebar/>
                <div className="flex-1 lg:ml-64">
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/customers" element={<Customers/>}/>
                        <Route path="/items" element={<Items/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="/order-details" element={<OrderDetails/>}/>
                    </Routes>
                </div>
            </div>

        </>

    )
}