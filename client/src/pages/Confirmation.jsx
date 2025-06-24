import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const { state } = useLocation();
  
  // Default to mock data if no state passed
  const order = state?.order || {
    orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
    event: {
      title: "Tech Summit 2023",
      date: "2023-12-15T19:00:00",
      location: "San Francisco, CA"
    },
    total: 99
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <div className="mb-6 flex justify-center">
        <svg 
  className="h-16 w-16 text-green-500 mx-auto" 
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="currentColor"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth={2} 
    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
  />
</svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your tickets are confirmed.
      </p>

      <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order #:</span>
            <span className="font-medium">{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Event:</span>
            <span>{order.event.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span>{new Date(order.event.date).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          to="/dashboard/my-tickets"
          className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
        >
          View My Tickets
        </Link>
        <Link
          to="/events"
          className="block w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          Browse More Events
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;