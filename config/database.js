// In-memory user storage
const users = [];

// Helper functions for user management
const userDB = {
  // Find user by username
  findByUsername: (username) => {
    return users.find(user => user.username === username);
  },

  // Find user by ID
  findById: (id) => {
    return users.find(user => user.id === id);
  },

  // Create new user
  create: (userData) => {
    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  // Get all users (for debugging)
  getAll: () => {
    return users.map(user => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    }));
  }
};

module.exports = userDB; 