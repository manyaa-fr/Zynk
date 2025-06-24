import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const Home = () => {
  // Sample featured events data (replace with API call later)
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Summit 2023",
      date: "2023-12-15",
      location: "San Francisco, CA",
      price: "$99",
      image: "/event-default.jpg..jpg"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "2023-11-20",
      location: "Austin, TX",
      price: "$149",
      image: "/event-default.jpg..jpg"
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-500 to-purple-500 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('/event-default.jpg..jpg')] bg-cover bg-center blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg animate-fade-in">Discover Your Next Experience</h1>
          <p className="text-2xl mb-10 max-w-2xl mx-auto font-medium drop-shadow animate-fade-in delay-100">
            EventVista brings people together through unforgettable events
          </p>
          <div className="flex justify-center space-x-6 animate-fade-in delay-200">
            <Link 
              to="/events" 
              className="px-10 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 transition"
            >
              Browse Events
            </Link>
            <Link 
              to="/create-event" 
              className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-700 transition"
            >
              Create Event
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform skew-y-2"></div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-800">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link 
            to="/events" 
            className="px-8 py-3 border-2 border-indigo-700 text-indigo-700 rounded-xl font-semibold text-lg hover:bg-indigo-700 hover:text-white transition"
          >
            View All Events
          </Link>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 py-20 rounded-3xl mx-2 md:mx-0 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-indigo-800">Ready to Create Magic?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-indigo-700">
            Join thousands of organizers hosting their events on EventVista
          </p>
          <Link 
            to="/create-event" 
            className="px-10 py-4 bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-800 transition"
          >
            Start Your Event Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;