import React from 'react'
import { Link } from 'react-router-dom'
import i18n from '../../common/components/LangConfig'

const ProductsNav = () => {
  return (
    <div className='flex p-6 justify-end'>
      <button className="py-2 px-4 dark:bg-white/10 bg-gray-800 text-white text-sm font-semibold"><Link to="/dashboard/products/Add">{i18n.t("dashboard.products.createProduct")} +</Link></button>
    </div>
  )
}

export default ProductsNav
