## Getting Started

To setup the project, follow these simple steps.

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

> **Note:** If for the first time the server is not accessible, may be its because, the db is not initialized before server started. Please, stop the container and run the **#3** step again.

## Usage

App should be accessible at http://localhost:5173/ if everything works well.

## My Approach

### Backend

1. I needed 2 api endpoints:
   a. Get all the documents in an ascending order as per the position
   b. Update the positions as per the sorting done by the user
2. Things happens when the server first starts:
   a. Create a connection to the DB
   b. Create **docs** table
   c. Insert default data so that user can play around
   d. Steps **c** and **d** are first time setup only, should be commented while development
3. I have not used any ORM for this setup as of now(because of beginner level in Python), but recommended to use though which will make it more easier.
4. Made a class for the DB connection so that each operation related to DB should be done through this which makes it easier to maintain in long-term

#### Adding more functionalities

1. Adding/Deleting/Updating element to the list would require one endpoint each, which would take all the required data to create/delete/update an item

### Frontend

1. As per my observations, the key implementation was the sorting and the updated time feature. So, after a few try of implementing different sorting library, I chose react-sortable for this as it is easy as well as customisable.
2. I had to make fewer updations so that not a lot of rows get affected at a single update. But, the requirement of updating it in every 5secs(if sorted) made it more easy to decide.
3. I maintained 3 things to track the sorting and updation in the backend:
   a. the initial positions
   b. the changed positions if sorted
   c. time when the updation saved in the backend
4. I did all of these with useRef coz useState would make the components re-render which will re-render all the docs as well which could affect the performance, if the list increases in the future(but can be avoided if properly planned)
5. I used date-fns library which is a minimalist library to show the message to user, when the updation has happened
6. Planned adding/deleting/updating element would not make much difference here as the position is tracked as per the DOM elements.
