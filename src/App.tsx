import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import OrderDetails from "./pages/OrderDetails.tsx";
import Customers from "./pages/Customers.tsx";
import Items from "./pages/Items.tsx";
import Orders from "./pages/Orders.tsx";


function App() {

  const routes = createBrowserRouter([
    {
      path : '',
      element : <RootLayout/>,
      children : [
        { path : '/', element : <Dashboard/>},
        { path : '/customers', element : <Customers/>},
        { path : '/items', element : <Items/>},
        { path : '/orders', element : <Orders/>},
        { path : '/order-details', element : <OrderDetails/>}
      ]
    },
  ])

  return (
      <>
        <RouterProvider router={routes} />
      </>
  )
}

export default App;