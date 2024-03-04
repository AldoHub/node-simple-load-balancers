#!/bin/bash

# on windows use the WSL to make the script executable
# use -> chmod +x ./test_load_balancer.sh
# and run the bash script using -> ./test_load_balancer.sh

# Number of requests to send
REQUESTS=10

# URL of your load balancer
URL="http://localhost:3000"

# Loop to send request
for((i=1; i < REQUESTS; i++)); do
    curl $URL &
done

wait
echo "All requests have been sent."
