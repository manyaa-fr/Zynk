import TicketCard from '../../components/TicketCard';

const MyTickets = () => {
  // Mock data - replace with API call later
  const tickets = [
    {
      id: "TCK-12345",
      event: {
        title: "Tech Summit 2023",
        date: "2023-12-15T19:00:00",
        location: "Moscone Center, San Francisco",
        image: "/event-default.jpg..jpg"
      },
      purchaseDate: "2023-10-01",
      price: 99,
      status: "confirmed"
    },
    {
      id: "TCK-67890",
      event: {
        title: "Music Festival",
        date: "2023-11-20T15:00:00",
        location: "Golden Gate Park, SF",
        image: "/event-default.jpg..jpg"
      },
      purchaseDate: "2023-09-15",
      price: 149,
      status: "confirmed"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Tickets</h2>
      
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't purchased any tickets yet</p>
          <Link 
            to="/events"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition inline-block"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;