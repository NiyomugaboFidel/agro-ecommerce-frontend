import  { useState, useEffect } from 'react';
import { CheckCircle,  ArrowRight, Home, CreditCard, Shield, Clock } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';


const PaymentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams] = useSearchParams();

  // Get a query param by name
  const sessionId = searchParams.get('session_id');
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-primary/5 via-white to-secondary/10 flex items-center justify-center p-4">
      <div className={`max-w-md w-full transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-third"></div>
          
          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-primary/20 rounded-full mx-auto animate-ping"></div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">Payment Successful!</h1>
          <p className="text-gray-600 mb-6 font-inter">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {/* Transaction Details */}
          <div className="bg-third/30 rounded-2xl p-4 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">TransactionID: </span>
              <span className="text-primary font-mono text-sm  overflow-hidden   "> {sessionId || 'cs_test_...'}</span>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Instant</span>
              </div>
              <div className="flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
              <Link to={'/'} className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Continue Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
       
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};



export default PaymentSuccess