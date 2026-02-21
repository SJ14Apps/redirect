#!/bin/bash

input="_redirects"
output="links.json"

names=()
links=()

# Read file line by line
while read -r name link _; do
    if [[ -n "$name" ]]; then
        names+=("$name")
        links+=("$link")
    fi
done < "$input"

# Start JSON
echo "[" > "$output"

count=${#names[@]}

# Generate JSON
for ((i=0; i<count; i++)); do
    name="${names[$i]}"
    link="${links[$i]}"

    # Remove first character (equivalent to :~1 in batch)
    name="${name:1}"

    if [[ $i -eq $((count - 1)) ]]; then
        echo "  {\"name\": \"$name\", \"link\": \"$link\"}" >> "$output"
    else
        echo "  {\"name\": \"$name\", \"link\": \"$link\"}," >> "$output"
    fi
done

echo "]" >> "$output"

echo "JSON file created: $output"
