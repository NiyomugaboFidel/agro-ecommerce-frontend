import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { getStatistics } from '../../../services/statistics/statistics';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {MoonLoader} from "react-spinners"
import i18n from '../../common/components/LangConfig';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics();
        setStatistics(data);
      } catch (error) {
        console.log('Failed to fetch statistics', error);
      }
    };
    fetchStatistics();
  }, []);

  const generateReport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text(`${i18n.t("dashboard.statistics.reportTitle")}`, 14, 16);

    // Add User Statistics
    doc.setFontSize(14);
    doc.text(`${i18n.t("dashboard.statistics.usersByRole")}`, 14, 30);
    doc.autoTable({
      startY: 35,
      head: [['Role', 'Count']],
      body: userStatistics.map(stat => [stat._id, stat.count]),
    });

    // Add Product Statistics
    doc.addPage();
    doc.text(`${i18n.t("dashboard.statistics.productsByCategory")}`, 14, 16);
    doc.autoTable({
      startY: 30,
      head: [['Category', 'Count']],
      body: productCategoryStatistics.map(cat => [cat.categoryName, cat.count]),
    });

    // Add Order Statistics
    doc.addPage();
    doc.text(`${i18n.t("dashboard.statistics.ordersOverview")}`, 14, 16);
    doc.autoTable({
      startY: 30,
      head: [['Metric', 'Value']],
      body: [
        ['Total Revenue', orderStatistics.totalRevenue || 0],
        ['Order Count', orderStatistics.orderCount || 0],
        ['Avg Order Value', orderStatistics.avgOrderValue || 0],
      ],
    });

    // Add Monthly Revenue
    doc.addPage();
    doc.text(`${i18n.t("dashboard.statistics.monthlyRevenue")}`, 14, 16);
    doc.autoTable({
      startY: 30,
      head: [['Month', 'Revenue']],
      body: monthlyRevenue.map(data => [data.month, data.revenue]),
    });

    // Add Top Products
    doc.addPage();
    doc.text(`${i18n.t("dashboard.statistics.topProducts")}`, 14, 16);
    doc.autoTable({
      startY: 30,
      head: [['Product', 'Sales']],
      body: topProducts.map(product => [product.name, product.sales]),
    });

    // Add User Growth
    doc.addPage();
    doc.text(`${i18n.t("dashboard.statistics.userGrowth")}`, 14, 16);
    doc.autoTable({
      startY: 30,
      head: [['Date', 'Count']],
      body: userGrowth.map(data => [data.date, data.count]),
    });

    doc.save('statistics-report.pdf');
  };

  if (!statistics) {
    return <p className='dark:text-gray-300 h-full bg-white/10 w-full flex items-center justify-center'><MoonLoader /></p>;
  }

  const userStatistics = Array.isArray(statistics.userStatistics) ? statistics.userStatistics : [];
  const productCategoryStatistics = Array.isArray(statistics.productCategoryStatistics) ? statistics.productCategoryStatistics : [];
  const orderStatistics = statistics.orderStatistics || {};
  const monthlyRevenue = statistics.monthlyRevenue || [];
  const topProducts = statistics.topProducts || [];
  const userGrowth = statistics.userGrowth || [];

  const userRoles = userStatistics.map((stat) => stat._id);
  const userCounts = userStatistics.map((stat) => stat.count);

  const userChartData = {
    labels: userRoles,
    datasets: [
      {
        label: `${i18n.t("dashboard.statistics.usersByRole")}`,
        data: userCounts,
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 159, 64, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const productCategories = productCategoryStatistics.map((cat) => cat.categoryName);
  const productCategoryCounts = productCategoryStatistics.map((cat) => cat.count);

  const productCategoryData = {
    labels: productCategories,
    datasets: [
      {
        label: `${i18n.t("dashboard.statistics.productsByCategory")}`,
        data: productCategoryCounts,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const orderChartData = {
    labels: ['Total Revenue', 'Order Count', 'Avg Order Value'],
    datasets: [
      {
        label: `${i18n.t("dashboard.statistics.ordersOverview")}`,
        data: [
          orderStatistics.totalRevenue || 0,
          orderStatistics.orderCount || 0,
          orderStatistics.avgOrderValue || 0
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const months = monthlyRevenue.map((data) => data.month);
  const revenueValues = monthlyRevenue.map((data) => data.revenue);

  const revenueChartData = {
    labels: months,
    datasets: [
      {
        label:`${i18n.t("dashboard.statistics.monthlyRevenue")}`,
        data: revenueValues,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  const productNames = topProducts.map((product) => product.name);
  const productSales = topProducts.map((product) => product.sales);

  const topProductsData = {
    labels: productNames,
    datasets: [
      {
        label:`${i18n.t("dashboard.statistics.topProducts")}`,
        data: productSales,
        backgroundColor: ['rgba(255, 159, 64, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const growthDates = userGrowth.map((data) => data.date);
  const growthNumbers = userGrowth.map((data) => data.count);

  const growthChartData = {
    labels: growthDates,
    datasets: [
      {
        label:`${i18n.t("dashboard.statistics.userGrowth")}`,
        data: growthNumbers,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="py-6 mx-6 flex flex-col">
      <button onClick={generateReport} className="mx-2 mb-6 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-blue-600 self-end">
      {i18n.t("dashboard.statistics.generateReport")}
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Statistics */}
        <div className="bg-white dark:bg-white/80 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-semibold mt-2 text-gray-700">{i18n.t("dashboard.statistics.usersByRole")}</h3>
            <p className="text-xl font-bold mt-2 text-gray-400 dark:text-gray-700">{userCounts.reduce((sum, count) => sum + count, 0)}</p>
          </div>
          <div className="mt-2 w-full h-[200px]">
            <Bar data={userChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        {/* Product Statistics */}
        <div className="bg-white dark:bg-white/80 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-semibold mt-2 text-gray-700">{i18n.t("dashboard.statistics.productsByCategory")}</h3>
            <p className="text-xl font-bold mt-2 text-gray-400 dark:text-gray-700">{productCategoryCounts.reduce((sum, count) => sum + count, 0)}</p>
          </div>
          <div className="mt-2 w-full h-[150px]">
            <Line data={productCategoryData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        {/* Orders Overview */}
        <div className="bg-white dark:bg-white/80 shadow-lg rounded-lg p-6 flex flex-col items-center w-80">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-semibold mt-2 text-gray-700">{i18n.t("dashboard.statistics.ordersOverview")}</h3>
            <p className="text-xl font-bold mt-2 text-gray-400 dark:text-gray-700">{orderStatistics.orderCount || 0}</p>
          </div>
          <div className="mt-2 w-full h-[150px]">
            <Doughnut data={orderChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        {/* Monthly Revenue */}
        <div className="bg-white dark:bg-white/80 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mt-2 text-gray-700">{i18n.t("dashboard.statistics.monthlyRevenue")}</h3>
          <div className="mt-2 w-full h-[200px] text-gray-400 dark:text-gray-700">
            <Line data={revenueChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        {/* Top Products */}
        <div className="bg-white dark:bg-white/80 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mt-2 text-slate-700">{i18n.t("dashboard.statistics.topProducts")}</h3>
          <div className="mt-2 w-full h-[200px]">
            <Pie data={topProductsData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        {/* User Growth */}
        <div className="bg-white dark:bg-white/80 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mt-2 text-slate-700">{i18n.t("dashboard.statistics.userGrowth")}</h3>
          <div className="mt-2 w-full h-[200px]">
            <Line data={growthChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsPage;
