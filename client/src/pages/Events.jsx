import { useState } from 'react';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

const Events = () => {
  // Sample events data (replace with API call later)
  const allEvents = [
    // ...include the featured events from Home.jsx plus more
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "2023-10-28",
      location: "New York, NY",
      price: "$75",
      category: "Food",
      image: "/event-default.jpg..jpg"
    },
    {
      id: 4,
      title: "Startup Pitch Night",
      date: "2023-11-05",
      location: "Online",
      price: "Free",
      category: "Business",
      image: "/event-default.jpg..jpg"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Tech', 'Music', 'Food', 'Business'];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-6">
          <h1 className="text-4xl font-extrabold text-indigo-800">All Events</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <SearchBar 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
            />
            <FilterDropdown 
              options={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold text-gray-600">No events found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;