const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data
const testUser = {
  username: 'testuser',
  password: 'password123'
};

let authToken = '';

// Helper function to make API calls
async function makeRequest(method, endpoint, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🔍 Testing Health Check...');
  const result = await makeRequest('GET', '/');
  console.log('✅ Health Check:', result.message);
}

async function testRegister() {
  console.log('\n🔍 Testing User Registration...');
  const result = await makeRequest('POST', '/register', testUser);
  
  if (result.success) {
    console.log('✅ Registration successful:', result.message);
    console.log('👤 User ID:', result.data.user.id);
    console.log('🔑 Token received:', result.data.token.substring(0, 20) + '...');
  } else {
    console.log('❌ Registration failed:', result.message);
  }
  
  return result;
}

async function testLogin() {
  console.log('\n🔍 Testing User Login...');
  const result = await makeRequest('POST', '/login', testUser);
  
  if (result.success) {
    console.log('✅ Login successful:', result.message);
    authToken = result.data.token;
    console.log('🔑 Token received:', authToken.substring(0, 20) + '...');
  } else {
    console.log('❌ Login failed:', result.message);
  }
  
  return result;
}

async function testProfile() {
  console.log('\n🔍 Testing Profile Access...');
  
  if (!authToken) {
    console.log('❌ No auth token available');
    return;
  }
  
  const result = await makeRequest('GET', '/profile', null, {
    'Authorization': `Bearer ${authToken}`
  });
  
  if (result.success) {
    console.log('✅ Profile access successful:', result.message);
    console.log('👤 User info:', result.data.user);
  } else {
    console.log('❌ Profile access failed:', result.message);
  }
  
  return result;
}

async function testInvalidToken() {
  console.log('\n🔍 Testing Invalid Token...');
  const result = await makeRequest('GET', '/profile', null, {
    'Authorization': 'Bearer invalid-token'
  });
  
  if (!result.success) {
    console.log('✅ Invalid token properly rejected:', result.message);
  } else {
    console.log('❌ Invalid token was accepted (security issue)');
  }
  
  return result;
}

async function testMissingToken() {
  console.log('\n🔍 Testing Missing Token...');
  const result = await makeRequest('GET', '/profile');
  
  if (!result.success) {
    console.log('✅ Missing token properly rejected:', result.message);
  } else {
    console.log('❌ Missing token was accepted (security issue)');
  }
  
  return result;
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting TeleHEDR API Tests...');
  console.log('📍 Base URL:', BASE_URL);
  
  try {
    await testHealthCheck();
    await testRegister();
    await testLogin();
    await testProfile();
    await testInvalidToken();
    await testMissingToken();
    
    console.log('\n🎉 All tests completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Install dependencies: npm install');
    console.log('   2. Start the server: npm run dev');
    console.log('   3. Run this test: node test-api.js');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n💡 Make sure the server is running on port 3000');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testHealthCheck,
  testRegister,
  testLogin,
  testProfile,
  testInvalidToken,
  testMissingToken,
  runTests
}; 