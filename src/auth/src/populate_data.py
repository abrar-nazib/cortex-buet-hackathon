import os
import django
import random
import json
from datetime import datetime
from faker import Faker

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Initialize Faker
fake = Faker()


def save_credentials_to_json(users_data, filename="user_credentials.json"):
    """Save user credentials to a JSON file"""
    print(f"\nSaving credentials to {filename}...")

    try:
        with open(filename, "w") as f:
            json.dump(users_data, f, indent=4, default=str)
        print(f"Successfully saved credentials to {filename}")
    except Exception as e:
        print(f"Error saving credentials: {str(e)}")


def load_credentials_from_json(filename="user_credentials.json"):
    """Load user credentials from JSON file"""
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading credentials: {str(e)}")
        return None


def create_user_from_data(user_data):
    """Create a single user from data"""
    user = User(
        username=user_data["username"],
        email=user_data["email"],
        first_name=user_data["first_name"],
        last_name=user_data["last_name"],
    )
    user.set_password(user_data["password"])
    return user


def create_user_profiles(users):
    """Create profile for users if you have a Profile model
    Note: Uncomment and modify this if you have a Profile model
    """
    pass


def populate_data():
    # Check if JSON file exists
    json_filename = "user_credentials.json"
    if os.path.exists(json_filename):
        print(f"\nFound existing credentials file: {json_filename}")
        users_data = load_credentials_from_json(json_filename)

        if users_data and users_data.get("users"):
            print("Creating users from existing data...")

            # Delete existing users (except superuser)
            print("Clearing existing regular users...")
            User.objects.filter(is_superuser=False).delete()

            # Create users from JSON data
            users_to_create = [
                create_user_from_data(user_data) for user_data in users_data["users"]
            ]

            # Bulk create users
            print("\nBulk creating users from existing data...")
            created_users = User.objects.bulk_create(users_to_create)
            print(f"Successfully created {len(created_users)} users from existing data")

            return

    # If no JSON file exists or it's invalid, create new users
    print("No existing credentials found. Creating new users...")

    # Delete existing users (except superuser)
    print("Clearing existing regular users...")
    User.objects.filter(is_superuser=False).delete()

    # User types for variety
    user_types = ["Customer", "Client", "Member", "Subscriber", "User"]

    print("Creating users and related data...")

    # Create users in bulk for efficiency
    users_to_create = []
    created_usernames = set()  # To ensure unique usernames
    users_data = {"users": []}  # Store user data for JSON export

    # Create 100 users
    for i in range(100):
        # Generate a unique username
        while True:
            username = f"{random.choice(user_types).lower()}{i+1}"
            if username not in created_usernames:
                created_usernames.add(username)
                break

        first_name = fake.first_name()
        last_name = fake.last_name()

        user = User(
            username=username,
            email=f"{username}@example.com",
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password("TestPass123!")  # Set password
        users_to_create.append(user)

        # Store user data for JSON
        users_data["users"].append(
            {
                "username": username,
                "email": f"{username}@example.com",
                "password": "TestPass123!",
                "first_name": first_name,
                "last_name": last_name,
            }
        )

        if (i + 1) % 20 == 0:
            print(f"Prepared {i + 1} users...")

    # Bulk create users
    print("\nBulk creating users...")
    created_users = User.objects.bulk_create(users_to_create)
    print(f"Successfully created {len(created_users)} users")

    # Save credentials to JSON
    save_credentials_to_json(users_data)

    # Create related profiles if needed
    print("\nCreating user profiles...")
    create_user_profiles(created_users)


if __name__ == "__main__":
    print("Starting user data population script...")
    populate_data()
    print("\nData population completed!")

    # Print summary
    print("\nSummary of created data:")
    total_users = User.objects.filter(is_superuser=False).count()
    print(f"Total regular users: {total_users}")

    # Print detailed example
    print("\nDetailed example of created users:")
    sample_users = User.objects.filter(is_superuser=False)[:5]
    for user in sample_users:
        print(f"\nUsername: {user.username}")
        print(f"Email: {user.email}")
        print(f"Name: {user.first_name} {user.last_name}")
