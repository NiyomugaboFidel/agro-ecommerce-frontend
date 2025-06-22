import React from 'react'
import ProductsNav from '../../components/Dashboard/productsContent/ProductsNav'
import AllProducts from '../../components/Dashboard/productsContent/AllProducts'

const DashAllProducts = () => {
  return (
    <section className='w-full h-full bg-gray-100 dark:bg-darkTheme pb-8'>
      <ProductsNav/>
      <AllProducts/>
    </section>
  )
}

export default DashAllProducts
