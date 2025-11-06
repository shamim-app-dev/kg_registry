#!/bin/bash

API_URL="http://localhost:3000/api/register/step1"

# Test case 1: Valid data
echo "Testing with valid data..."
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Kindergarten", "cityId": 1}'
echo -e "\n"

# Test case 2: Invalid data (name too short)
echo "Testing with invalid data (name too short)..."
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"name": "Te", "cityId": 1}'
echo -e "\n"

# Test case 3: Invalid data (missing cityId)
echo "Testing with invalid data (missing cityId)..."
curl -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Kindergarten"}'
echo -e "\n"
