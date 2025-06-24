import { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  MapPinIcon as LocationMarkerIcon, 
  CurrencyDollarIcon 
} from "@heroicons/react/24/outline";

const EventDetails = () => {
  // const { id } = useParams(); // Removed unused variable to fix linter error
  const [ticketCount, setTicketCount] = useState(1);

  // Mock data - replace with API call later
  const event = {
    id: 1,
    title: "Tech Summit 2023",
    date: "2023-12-15T19:00:00",
    location: "Moscone Center, San Francisco, CA",
    price: 99,
    description: "Join the annual gathering of tech innovators and leaders. This year's summit focuses on AI, blockchain, and the future of decentralized systems.",
    image: "/event-default.jpg..jpg",
    organizer: "Tech Global Inc.",
    availableTickets: 150
  };

  const handlePurchase = () => {
    alert("Payment integration coming soon! For now, enjoy this beautiful UI.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/events" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8 font-medium">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Event Content */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-96 object-cover object-center"
            />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{event.title}</h1>
          <div className="flex flex-wrap gap-6 mb-8 text-lg">
            <div className="flex items-center text-gray-700">
              <CalendarIcon className="h-6 w-6 mr-2" />
              {new Date(event.date).toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="flex items-center text-gray-700">
              <LocationMarkerIcon className="h-6 w-6 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-gray-700">
              <CurrencyDollarIcon className="h-6 w-6 mr-2" />
              ${event.price.toFixed(2)}
            </div>
          </div>
          <div className="prose max-w-none mb-10 text-gray-700 text-lg">
            <p>{event.description}</p>
          </div>
          <div className="bg-indigo-50 p-8 rounded-2xl shadow mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-indigo-800">About the Organizer</h3>
            <p className="text-gray-700 text-lg">{event.organizer}</p>
          </div>
        </div>
        {/* Sidebar for ticket purchase */}
        <aside className="lg:sticky lg:top-32 h-fit bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-6 border border-gray-100">
          <div className="text-3xl font-bold text-indigo-700 mb-2">${event.price.toFixed(2)}</div>
          <div className="text-gray-600 mb-4">Tickets Available: <span className="font-semibold text-gray-900">{event.availableTickets}</span></div>
          <div className="flex items-center space-x-3 mb-4">
            <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xl flex items-center justify-center hover:bg-indigo-200 transition">-</button>
            <span className="text-xl font-semibold">{ticketCount}</span>
            <button onClick={() => setTicketCount(ticketCount + 1)} className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xl flex items-center justify-center hover:bg-indigo-200 transition">+</button>
          </div>
          <button onClick={handlePurchase} className="w-full px-6 py-3 bg-indigo-700 text-white rounded-xl font-bold text-lg shadow hover:bg-indigo-800 transition">Purchase Ticket</button>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;