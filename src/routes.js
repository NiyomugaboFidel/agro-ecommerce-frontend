// routes.js
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import Contact from "./Pages/Contact";
import Account from "./Pages/Account";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Product from "./Pages/Product";
import AllProducts from "./Pages/AllProducts";
import NotFound from "./Pages/NotFound";
import Category from "./Pages/Category";
import DashLayout from "./Pages/DashLayout";
import DashHome from "./Pages/Dashboard/DashHome";
import AllAgents from "./Pages/Dashboard/AgentsUsers";
import AllCustomers from "./Pages/Dashboard/Customers";
import DashAllProducts from "./Pages/Dashboard/DashAllProducts";
import DashAllOrders from "./Pages/Dashboard/DashAllOrders";
import DashAllSales from "./Pages/Dashboard/DashAllSales";
import AddProductFormPage from "./Pages/Dashboard/AddProductFormPage";
import WelcomePage from "./Pages/welcomePage";
import EditProdFormPage from "./Pages/Dashboard/EditProdFormPage";
import DashProduct from "./components/Dashboard/productsContent/DashProduct";
import OrderPage from "./Pages/OrderPage";
import DashOrderPage from "./Pages/Dashboard/DashOrderPage";
import StatisticsPage from "./components/Dashboard/statisticsData/StatisticsPage";
import PaymentSuccess from "./Pages/paymentSuccess";
import PaymentCancel from "./Pages/paymentCencal";

const routes = [
  {
    path: "/",
    element: Layout,
    children: [
      { path: "", element: Home },
      { path: "contact", element: Contact },
      { path: "account", element: Account },
      { path: "about", element: About },
      { path: "signup", element: SignUp },
      { path: "login", element: LogIn },
      { path: "wishlist", element: Wishlist },
      { path: "cart", element: Cart },
      { path: "checkout", element: Checkout },
      { path: "payment", element: Payment },
      { path: "allProducts", element: AllProducts },
      { path: "category/:catName", element: Category },
      { path: "allProducts/:productId", element: Product },
      { path: "order", element: OrderPage },
      { path: "payment/success", element: PaymentSuccess },
      { path: "payment/cancel", element:  PaymentCancel },
      { path: "*", element: NotFound },
    ],
  },
  { path: "/home", element: WelcomePage },
  {
    path: "/dashboard",
    element: DashLayout,
    children: [
      { path: "", element: DashHome },
      { path: "managers", element: AllAgents },
      { path: "customers", element: AllCustomers },
      { path: "products", element: DashAllProducts },
      { path: "products/Add", element: AddProductFormPage },
      { path: "products/:productId", element: DashProduct },
      { path: "products/:productId/edit", element: EditProdFormPage },
      { path: "orders", element: DashAllOrders },
      { path: "orders/:orderId", element: DashOrderPage },
      { path: "sales", element: DashAllSales },
      { path: "statistics", element: StatisticsPage },
    
    ],
  },
];

export default routes;
