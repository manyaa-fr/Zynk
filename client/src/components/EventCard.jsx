import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-52 object-cover object-center"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-gray-900 leading-tight">{event.title}</h3>
          <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-base font-semibold shadow-sm">
            {event.price}
          </span>
        </div>
        <p className="text-gray-500 mb-1 text-sm">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500 mb-4 text-sm">
          📍 {event.location}
        </p>
        <Link 
          to={`/events/${event.id}`}
          className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;