import React, { useState, useEffect } from 'react';
import { 
  User, Edit3, MapPin, Calendar, Mail, Phone, Heart, 
  Settings, Eye, Star, Users, Camera, Shield, Bell, 
  Bookmark, Plus, Award, TrendingUp, LogOut 
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SavedEvents.css';

// Function to get current user ID (similar to other components)
function getUserId() {
  // Try to decode from token first
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id || payload._id) {
        return payload.id || payload._id;
      }
    } catch (e) {
      // ignore
    }
  }
  // Fallback to user object in localStorage
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.userId) return user.userId;
  } catch {}
  return null;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    interests: [],
    joinDate: ''
  });

  // Stats and activities state
  const [userStats, setUserStats] = useState({
    eventsAttended: 0,
    eventsCreated: 0,
    eventsSaved: 0,
    followers: 0,
    following: 0,
    rating: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const userId = getUserId();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all profile data in parallel
        const [profileRes, statsRes, activitiesRes, eventsRes] = await Promise.all([
          axios.get(`/users/profile/${userId}`),
          axios.get(`/users/stats/${userId}`),
          axios.get(`/users/activities/${userId}`),
          axios.get(`/users/events/${userId}`)
        ]);

        // Set profile data
        const user = profileRes.data;
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          location: user.address ? `${user.address.city}, ${user.address.state}` : '',
          bio: user.bio || 'No bio available',
          interests: user.preferences?.categories || [],
          joinDate: user.createdAt || new Date().toISOString()
        });

        // Set stats
        setUserStats(statsRes.data);

        // Set activities with icons
        const activitiesWithIcons = activitiesRes.data.map(activity => ({
          ...activity,
          icon: activity.type === 'attended' ? <Calendar size={16} /> :
                activity.type === 'created' ? <Plus size={16} /> :
                <Bookmark size={16} />
        }));
        setRecentActivity(activitiesWithIcons);

        // Set created events
        setCreatedEvents(eventsRes.data);

      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;

    try {
      const updateData = {
        name: profileData.name,
        bio: profileData.bio,
        preferences: {
          categories: profileData.interests
        }
      };

      await axios.put(`/users/profile/${userId}`, updateData);
      setIsEditing(false);
      // Optionally refresh the data
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint if you have one
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to home page
      navigate('/');
      window.location.reload(); // Ensure UI updates
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      className={`tab-button ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-banner">
          <div className="banner-gradient"></div>
        </div>
        
        <div className="profile-info-container">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <User size={48} />
              <button className="avatar-edit">
                <Camera size={16} />
              </button>
            </div>
          </div>
          
          <div className="profile-main-info">
            <div className="profile-name-section">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="name-input"
                />
              ) : (
                <h1 className="profile-name">{profileData.name}</h1>
              )}
              
              <div className="profile-actions">
                {isEditing ? (
                  <div className="edit-actions">
                    <button className="btn-primary small" onClick={handleSave}>
                      Save
                    </button>
                    <button 
                      className="btn-secondary small" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn-secondary small"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            
            <div className="profile-meta">
              <div className="meta-item">
                <MapPin size={16} />
                <span>{profileData.location || 'Location not set'}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>Joined {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="meta-item">
                <Star size={16} />
                <span>{userStats.rating} rating</span>
              </div>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userStats.eventsAttended}</span>
              <span className="stat-label">Events Attended</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.eventsCreated}</span>
              <span className="stat-label">Events Created</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.eventsSaved}</span>
              <span className="stat-label">Events Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="profile-navigation">
        <div className="nav-tabs">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="events" 
            label="My Events" 
            isActive={activeTab === 'events'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="settings" 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={setActiveTab} 
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="content-grid">
              {/* About Section */}
              <div className="content-card about-card">
                <h3>About</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="bio-textarea"
                    rows={4}
                  />
                ) : (
                  <p className="bio-text">{profileData.bio}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="content-card contact-card">
                <h3>Contact Information</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{profileData.phone || 'Phone not set'}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={16} />
                    <span>{profileData.location || 'Location not set'}</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="content-card interests-card">
                <h3>Interests</h3>
                <div className="interests-tags">
                  {profileData.interests.length > 0 ? (
                    profileData.interests.map((interest, index) => (
                      <span key={index} className="interest-tag">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="no-interests">No interests set</span>
                  )}
                  {isEditing && (
                    <button className="add-interest-btn">
                      <Plus size={16} />
                      Add Interest
                    </button>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="content-card activity-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {recentActivity.length > 0 ? (
                    recentActivity.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                          {activity.icon}
                        </div>
                        <div className="activity-content">
                          <span className="activity-action">
                            {activity.type === 'attended' && 'Attended'}
                            {activity.type === 'created' && 'Created'}
                            {activity.type === 'saved' && 'Saved'}
                          </span>
                          <span className="activity-event">{activity.event}</span>
                          <span className="activity-date">
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-activity">No recent activity</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-tab">
            <div className="events-section">
              <div className="section-header">
                <h3>Events I've Created</h3>
                <button className="btn-primary">
                  <Plus size={16} />
                  Create New Event
                </button>
              </div>
              
              <div className="created-events-list">
                {createdEvents.length > 0 ? (
                  createdEvents.map(event => (
                    <div key={event.id} className="created-event-card">
                      <div className="event-info">
                        <h4>{event.title}</h4>
                        <div className="event-meta">
                          <span className="event-date">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="attendees">
                            <Users size={14} />
                            {event.attendees} attendees
                          </span>
                        </div>
                      </div>
                      <div className="event-status">
                        <span className={`status-badge ${event.status}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-events">No events created yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="settings-grid">
              <div className="settings-card">
                <h3><Shield size={20} /> Privacy & Security</h3>
                <div className="settings-options">
                  <div className="setting-item">
                    <span>Profile Visibility</span>
                    <select>
                      <option>Public</option>
                      <option>Friends Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <span>Show Email</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3><Bell size={20} /> Notifications</h3>
                <div className="settings-options">
                  <div className="setting-item">
                    <span>Event Reminders</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <span>New Events in Area</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <span>Marketing Updates</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3><LogOut size={20} /> Account</h3>
                <div className="settings-options">
                  <div className="setting-item">
                    <span>Logout</span>
                    <button 
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;