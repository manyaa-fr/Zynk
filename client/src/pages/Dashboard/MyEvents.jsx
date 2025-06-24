import { Link } from 'react-router-dom';
import EventCard from '../../components/EventCard';

const MyEvents = () => {
  // Mock data - replace with API call later
  const events = [
    {
      id: 1,
      title: "Tech Summit 2023",
      date: "2023-12-15",
      status: "published",
      ticketsSold: 87,
      totalTickets: 200,
      image: "/event-default.jpg..jpg"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "2023-11-20",
      status: "draft",
      ticketsSold: 0,
      totalTickets: 500,
      image: "/event-default.jpg..jpg"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
        <Link 
          to="/create-event"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          + Create New Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
              
              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Tickets sold: {event.ticketsSold}/{event.totalTickets}</span>
                  <span>{Math.round((event.ticketsSold / event.totalTickets) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/events/${event.id}/edit`}
                  className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/events/${event.id}`}
                  className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;