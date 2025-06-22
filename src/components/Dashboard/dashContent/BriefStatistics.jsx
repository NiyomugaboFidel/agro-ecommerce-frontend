import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { getUsers } from '../../../services/auth/users';
import { getProducts } from '../../../services/products/products';
import { getAllOrders } from '../../../services/orders/orders';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const BriefStatistics = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log('failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  // Fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  // Fetching orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOrders();
  }, []);

  // Chart data for users (Bar Chart)
  const userData = {
    labels: ['Total Users'],
    datasets: [
      {
        label: 'Users',
        data: [users.length],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for products (Line Chart)
  const productData = {
    labels: ['Total Products'],
    datasets: [
      {
        label: 'Products',
        data: [products.length],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
    ],
  };

  // Chart data for orders (Doughnut Chart)
  const orderData = {
    labels: ['Total Orders'],
    datasets: [
      {
        label: 'Orders',
        data: [orders.length],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="flex flex-wrap gap-6 justify-center p-6">
      {/* Users Card with Bar Chart */}
      <div className="bg-white dark:bg-white/20 dark:text-gray-300 shadow-lg rounded-lg w-80 p-6 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold mt-2 text-gray-700 dark:text-gray-300">Users</h3>
          <p className="text-xl font-bold mt-2 text-slate-400 dark:text-gray-300">{users.length}</p>
        </div>
        <div className="mt-2 w-full">
          <Bar className='dark:bg-gray-200' data={userData} options={{ responsive: true, maintainAspectRatio: false }} height={100} />
        </div>
      </div>

      {/* Products Card with Line Chart */}
      <div className="bg-white dark:bg-white/20 dark:text-gray-300 shadow-lg rounded-lg w-80 p-6 flex flex-col items-center">
        <div className="flex w-full justify-between items-center">
          <h3 className="text-xl font-semibold mt-2 text-gray-700 dark:text-gray-300">Products</h3>
          <p className="text-xl font-bold mt-2 text-slate-400 dark:text-gray-300">{products.length}</p>
        </div>
        <div className="mt-2 w-full">
          <Line className='dark:bg-gray-200' data={productData} options={{ responsive: true, maintainAspectRatio: false }} height={100} />
        </div>
      </div>

      {/* Orders Card with Doughnut Chart */}
      <div className="bg-white dark:bg-white/20 dark:text-gray-300 shadow-lg rounded-lg w-80 p-6 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold mt-2 text-gray-700 dark:text-gray-300">Orders</h3>
          <p className="text-xl font-bold mt-2 text-gray-400 dark:text-gray-300">{orders.length}</p>
        </div>
        <div className="mt-2 w-full">
          <Doughnut className='dark:bg-gray-200' data={orderData} options={{ responsive: true, maintainAspectRatio: false }} height={100} />
        </div>
      </div>
    </section>
  );
};

export default BriefStatistics;
