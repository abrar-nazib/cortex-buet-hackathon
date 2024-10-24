from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.test import TestCase

class TestAuthEndpoints(TestCase):
    
    def setUp(self):
        """Setup method to initialize common test data"""
        self.client = APIClient()
        self.registration_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password1': 'TestPass123!',
            'password2': 'TestPass123!'
        }
        self.login_data = {
            'username': 'testuser',  # Changed from email to username
            'password': 'TestPass123!'
        }

    def register_user(self):
        """Helper method to register a user and return the response"""
        url = reverse('rest_register')
        response = self.client.post(url, self.registration_data)
        if response.status_code not in [204, 201]:
            print(f"Registration error: {response.content}")
        return response

    def test_user_registration(self):
        """Test user registration endpoint"""
        response = self.register_user()
        
        self.assertEqual(response.status_code, 204,
                         f"Registration failed with status {response.status_code}. Response: {response.content.decode()}")
        
        # Verify user was created in database
        User = get_user_model()
        user = User.objects.filter(username=self.registration_data['username']).first()
        self.assertIsNotNone(user, "User was not created in database")

    def test_user_login(self):
        """Test user login endpoint"""
        # First register the user
        registration_response = self.register_user()
        self.assertEqual(registration_response.status_code, 204,
                         f"Registration failed: {registration_response.content.decode()}")

        # Attempt login
        url = reverse('rest_login')
        response = self.client.post(url, self.login_data)
        
        self.assertEqual(response.status_code, 200,
                         f"Login failed with status {response.status_code}. Response: {response.content.decode()}")
        
        self.assertIn('key', response.data,
                      f"No authentication key in response. Data: {response.data}")

    def test_user_logout(self):
        """Test user logout endpoint"""
        # Register user
        registration_response = self.register_user()
        self.assertEqual(registration_response.status_code, 204,
                         f"Registration failed: {registration_response.content.decode()}")
        
        # Login to get token
        login_url = reverse('rest_login')
        login_response = self.client.post(login_url, self.login_data)
        self.assertEqual(login_response.status_code, 200,
                         f"Login failed: {login_response.content.decode()}")
        
        token = login_response.data.get('key')
        self.assertIsNotNone(token, "No authentication token received")
        
        # Set token in client
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')

        # Test logout
        url = reverse('rest_logout')
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, 200,
                         f"Logout failed with status {response.status_code}. Response: {response.content.decode()}")

    def test_user_info(self):
        """Test user info endpoint"""
        # Register user
        registration_response = self.register_user()
        self.assertEqual(registration_response.status_code, 204,
                         f"Registration failed: {registration_response.content.decode()}")
        
        # Login to get token
        login_url = reverse('rest_login')
        login_response = self.client.post(login_url, self.login_data)
        self.assertEqual(login_response.status_code, 200,
                         f"Login failed: {login_response.content.decode()}")
        
        token = login_response.data.get('key')
        self.assertIsNotNone(token, "No authentication token received")
        
        # Set token in client
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')

        # Test user info endpoint
        url = reverse('rest_user_details')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, 200,
                         f"User info request failed with status {response.status_code}. Response: {response.content.decode()}")
        
        self.assertIn('username', response.data, f"Username not in response data: {response.data}")
        self.assertEqual(response.data['username'], self.registration_data['username'],
                         f"Unexpected username: {response.data['username']}")
