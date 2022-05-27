#!/usr/bin/python3

import os
import hashlib

# Path to the folder containing the art
directory = "./output"

# Extension of the artwork
extension = ".png"

# Variable to store the number of artworks in the folder
num_images = 0
for base, dirs, files in os.walk(directory):
    for Files in files:
        if(Files[-4:] == extension):
            num_images += 1

# Function to print the individual hashes
def print_individual_hash(l):
    for i in range(len(l)):
        print(l[i])

# Function to print the provenance hash
def print_provenance_hash(l):
    contactenated_hash = "".join(l)
    provenance_hash = hashlib.sha256(contactenated_hash.encode()).hexdigest()

    print(provenance_hash)

# List to store the hashes
hash_values = []

for i in range(1, num_images + 1):
    image = directory + "/" + str(i) + extension
    sha256_hash = hashlib.sha256()
    with open(image, "rb") as f:
        for byte_block in iter(lambda: f.read(4096),b""):
            sha256_hash.update(byte_block)
            hash_values.append(sha256_hash.hexdigest())

#print_individual_hash(hash_values)
print_provenance_hash(hash_values)
