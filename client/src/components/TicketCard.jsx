import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-48">
          <img 
            src={ticket.event.image} 
            alt={ticket.event.title} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{ticket.event.title}</h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {ticket.status}
            </span>
          </div>
          
          <div className="mt-4 space-y-2 text-gray-600">
            <div className="flex items-center">
              <FiCalendar className="h-5 w-5 mr-2" />
              {new Date(ticket.event.date).toLocaleString()}
            </div>
            <div className="flex items-center">
              <FiMapPin className="h-5 w-5 mr-2" />
              {ticket.event.location}
            </div>
            <div className="flex items-center">
              <FiAward className="h-5 w-5 mr-2" />
              Ticket #{ticket.id}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-lg font-semibold">${ticket.price}</span>
            <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              View Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;