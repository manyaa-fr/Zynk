import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data - replace with API call later
  const stats = {
    totalEvents: 5,
    totalRevenue: 2845,
    attendees: 132,
    eventsData: [
      { name: 'Tech Summit', attendees: 87, revenue: 8613 },
      { name: 'Music Fest', attendees: 45, revenue: 6705 },
      { name: 'Food Expo', attendees: 32, revenue: 2400 },
    ]
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Event Analytics</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Events</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Attendees</h3>
          <p className="text-3xl font-bold mt-2">{stats.attendees}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Attendance by Event</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.eventsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="attendees" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Revenue by Event</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.eventsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;