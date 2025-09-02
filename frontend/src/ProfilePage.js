import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch user data from your backend
    // For now, we'll use dummy data or data from local storage if available
    const storedUser = localStorage.getItem('user'); // Assuming user data is stored here after login
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Dummy user data if not logged in or no data in local storage
      setUser({
        username: 'testuser',
        email: 'test@example.com',
        address: '123 Main St, Anytown, USA',
        phone: '123-456-7890',
      });
    }
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>User Profile</h2>
        </div>
        <div className="card-body">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          {/* Add more profile details as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
