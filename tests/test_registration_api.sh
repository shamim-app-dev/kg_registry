#!/bin/bash

BASE_URL="http://localhost:3000/api/register"

# --- Helper function to parse JSON response ---
# Outputs an empty string if the key is not found
parse_json() {
  echo "$1" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data.get('$2', ''))"
}

# --- Test Step 1 ---
echo "\n--- Testing Step 1: Location & Basic Information ---"

# Test case 1.1: Valid data
echo "Testing Step 1 with valid data..."

STEP1_HEADERS=$(curl -s -I -X POST "$BASE_URL/step1" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Kindergarten", "cityId": 1}')
STEP1_BODY=$(curl -s -X POST "$BASE_URL/step1" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Kindergarten", "cityId": 1}')

STEP1_STATUS=$(echo "$STEP1_HEADERS" | grep "HTTP/" | cut -d' ' -f2)
KINDERGARTEN_ID=$(parse_json "$STEP1_BODY" "kindergartenId")

echo "Full Response Body: $STEP1_BODY"

if [ "$STEP1_STATUS" -eq 201 ] && [ -n "$KINDERGARTEN_ID" ]; then
  echo "Step 1.1 Passed: Kindergarten created with ID $KINDERGARTEN_ID"
else
  echo "Step 1.1 Failed: Status: $STEP1_STATUS, Body: $STEP1_BODY"
fi

# Test case 1.2: Invalid data (name too short)
echo "Testing Step 1 with invalid data (name too short)..."

STEP1_INVALID_HEADERS=$(curl -s -I -X POST "$BASE_URL/step1" \
  -H "Content-Type: application/json" \
  -d '{"name": "Te", "cityId": 1}')
STEP1_INVALID_BODY=$(curl -s -X POST "$BASE_URL/step1" \
  -H "Content-Type: application/json" \
  -d '{"name": "Te", "cityId": 1}')

STEP1_INVALID_STATUS=$(echo "$STEP1_INVALID_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

echo "Full Response Body: $STEP1_INVALID_BODY"

if [ "$STEP1_INVALID_STATUS" -eq 400 ]; then
  echo "Step 1.2 Passed: Correctly rejected invalid name."
else
  echo "Step 1.2 Failed: Status: $STEP1_INVALID_STATUS, Body: $STEP1_INVALID_BODY"
fi

# --- Test Step 2 ---
echo "\n--- Testing Step 2: Facility Details ---"

if [ -z "$KINDERGARTEN_ID" ]; then
  echo "Skipping Step 2 tests: Kindergarten ID not obtained from Step 1."
else
  # Test case 2.1: Valid data
  echo "Testing Step 2 with valid data..."

  STEP2_HEADERS=$(curl -s -I -X POST "$BASE_URL/step2" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "ageGroups": {"min": 3, "max": 6}, "capacity": 50, "operatingHours": {"start": "08:00", "end": "17:00"}}')
  STEP2_BODY=$(curl -s -X POST "$BASE_URL/step2" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "ageGroups": {"min": 3, "max": 6}, "capacity": 50, "operatingHours": {"start": "08:00", "end": "17:00"}}')

  STEP2_STATUS=$(echo "$STEP2_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

  echo "Full Response Body: $STEP2_BODY"

  if [ "$STEP2_STATUS" -eq 200 ]; then
    echo "Step 2.1 Passed: Facility details updated."
  else
    echo "Step 2.1 Failed: Status: $STEP2_STATUS, Body: $STEP2_BODY"
  fi

  # Test case 2.2: Invalid data (capacity 0)
  echo "Testing Step 2 with invalid data (capacity 0)..."

  STEP2_INVALID_HEADERS=$(curl -s -I -X POST "$BASE_URL/step2" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "ageGroups": {"min": 3, "max": 6}, "capacity": 0, "operatingHours": {"start": "08:00", "end": "17:00"}}')
  STEP2_INVALID_BODY=$(curl -s -X POST "$BASE_URL/step2" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "ageGroups": {"min": 3, "max": 6}, "capacity": 0, "operatingHours": {"start": "08:00", "end": "17:00"}}')

  STEP2_INVALID_STATUS=$(echo "$STEP2_INVALID_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

  echo "Full Response Body: $STEP2_INVALID_BODY"

  if [ "$STEP2_INVALID_STATUS" -eq 400 ]; then
    echo "Step 2.2 Passed: Correctly rejected invalid capacity."
  else
    echo "Step 2.2 Failed: Status: $STEP2_INVALID_STATUS, Body: $STEP2_INVALID_BODY"
  fi
fi

# --- Test Step 3 ---
echo "\n--- Testing Step 3: Credentials & Certifications ---"

if [ -z "$KINDERGARTEN_ID" ]; then
  echo "Skipping Step 3 tests: Kindergarten ID not obtained from Step 1."
else
  # Test case 3.1: Valid data
  echo "Testing Step 3 with valid data..."

  STEP3_HEADERS=$(curl -s -I -X POST "$BASE_URL/step3" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "credentials": "Licensed by Ministry of Education", "certifications": "First Aid Certified Staff"}')
  STEP3_BODY=$(curl -s -X POST "$BASE_URL/step3" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "credentials": "Licensed by Ministry of Education", "certifications": "First Aid Certified Staff"}')

  STEP3_STATUS=$(echo "$STEP3_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

  echo "Full Response Body: $STEP3_BODY"

  if [ "$STEP3_STATUS" -eq 200 ]; then
    echo "Step 3.1 Passed: Credentials and certifications updated."
  else
    echo "Step 3.1 Failed: Status: $STEP3_STATUS, Body: $STEP3_BODY"
  fi

  # Test case 3.2: Invalid data (empty credentials)
  echo "Testing Step 3 with invalid data (empty credentials)..."

  STEP3_INVALID_HEADERS=$(curl -s -I -X POST "$BASE_URL/step3" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "credentials": "", "certifications": "First Aid Certified Staff"}')
  STEP3_INVALID_BODY=$(curl -s -X POST "$BASE_URL/step3" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "credentials": "", "certifications": "First Aid Certified Staff"}')

  STEP3_INVALID_STATUS=$(echo "$STEP3_INVALID_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

  echo "Full Response Body: $STEP3_INVALID_BODY"

  if [ "$STEP3_INVALID_STATUS" -eq 400 ]; then
    echo "Step 3.2 Passed: Correctly rejected empty credentials."
  else
    echo "Step 3.2 Failed: Status: $STEP3_INVALID_STATUS, Body: $STEP3_INVALID_BODY"
  fi
fi

# --- Test Step 4 ---
echo "\n--- Testing Step 4: Pricing & Services ---"

if [ -z "$KINDERGARTEN_ID" ]; then
  echo "Skipping Step 4 tests: Kindergarten ID not obtained from Step 1."
else
  # Test case 4.1: Valid data
  echo "Testing Step 4 with valid data..."

  STEP4_HEADERS=$(curl -s -I -X POST "$BASE_URL/step4" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "pricing": [{"durationType": "full-day", "price": 100}, {"durationType": "monthly", "price": 1500}]}')
  STEP4_BODY=$(curl -s -X POST "$BASE_URL/step4" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "pricing": [{"durationType": "full-day", "price": 100}, {"durationType": "monthly", "price": 1500}]}')

  STEP4_STATUS=$(echo "$STEP4_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

  echo "Full Response Body: $STEP4_BODY"

  if [ "$STEP4_STATUS" -eq 201 ]; then
    echo "Step 4.1 Passed: Pricing added successfully."
  else
    echo "Step 4.1 Failed: Status: $STEP4_STATUS, Body: $STEP4_BODY"
  fi

  # Test case 4.2: Invalid data (empty pricing array)
  echo "Testing Step 4 with invalid data (empty pricing array)..."

  STEP4_INVALID_HEADERS=$(curl -s -I -X POST "$BASE_URL/step4" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "pricing": []}')
  STEP4_INVALID_BODY=$(curl -s -X POST "$BASE_URL/step4" \
    -H "Content-Type: application/json" \
    -d '{"kindergartenId": '$KINDERGARTEN_ID', "pricing": []}')

  STEP4_INVALID_STATUS=$(echo "$STEP4_INVALID_HEADERS" | grep "HTTP/" | cut -d' ' -f2)

  echo "Full Response Body: $STEP4_INVALID_BODY"

  if [ "$STEP4_INVALID_STATUS" -eq 400 ]; then
    echo "Step 4.2 Passed: Correctly rejected empty pricing array."
  else
    echo "Step 4.2 Failed: Status: $STEP4_INVALID_STATUS, Body: $STEP4_INVALID_BODY"
  fi
fi
