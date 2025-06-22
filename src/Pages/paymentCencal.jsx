import  { useState, useEffect } from 'react';
import {  XCircle,  Home, RefreshCw} from 'lucide-react';
import { Link } from 'react-router-dom';



const PaymentCancel = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full transform transition-all duration-70${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}0 `}>
        {/* Cancel Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-custom2 to-red-custom3"></div>
          
          {/* Cancel Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-custom2 to-red-custom3 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <XCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6 font-inter">
            No worries! Your payment was cancelled and no charges were made to your account.
          </p>

          {/* Reassurance Box */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">What happened?</h3>
            <p className="text-sm text-gray-600">
              You cancelled the payment process. Your items are still in your cart and ready for checkout whenever you&#39;re ready.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to={'/'} className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </Link>
            
            <Link to={'/allProducts'} className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Return to Shop</span>
            </Link>
          </div>

       {/* Help Section */}
          <div className="mt-6 p-4 bg-third/20 rounded-2xl">
            <p className="text-sm text-gray-600 mb-2">Need help with your purchase?</p>
            <Link to={'/contact'} className="text-primary font-semibold text-sm hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentCancel