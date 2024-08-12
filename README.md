## Getting Started

This is an example of how you may give instructions on setting up your project locally.

To get a local copy up and running follow these simple example steps.

### Prerequisites

1. Should have **Docker** installed in the system.

### Installation

1. Clone the repo

   ```sh

   git clone https://github.com/enigmaticmahesh/zania.git

   ```

2. Change the folder path of the **postgres db** according to your system. Open the **docker-compose.yml** and search for this:

   ```sh

   volumes:
   	-  ~/apps/postgres:/var/lib/postgresql/data

   ```

   Replace **~/apps/postgres** to your system's folder where you want to keep the DB data

3. Run Docker Compose

   ```sh

   docker-compose up -d

   ```

# Errors

> **Note:** If for the first time the server is not accessible, may be its because, the db is not initialized before server started. Please, stop and delete the container and run the **#3** step again.

## Usage

Backend should be accessible at http://localhost:8000/ if everything works well.
