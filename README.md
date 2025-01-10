# KoinX Backend Internship Assignment

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your MongoDB URI in the `.env` file:
    - Create a `.env` file in the root directory of the project.
    - Add your MongoDB connection string in the `.env` file as:
      ```plaintext
      MONGO_URI=your_mongodb_connection_uri_here
      ```

4. Run the server:
    ```bash
    npm start
    ```

## API Endpoints

1. **`/api/stats?coin=<coin>`**  
   Fetch the latest price, market cap, and 24-hour change for the requested cryptocurrency.  
   **Query Params:**
   - `coin`: one of `bitcoin`, `matic-network`, `ethereum`  
   **Example:**
   ```bash
   /api/stats?coin=bitcoin

2. **`/api/deviation?coin=<coin>`**  
   Fetch the deviation of past 100 records.  
   **Query Params:**
   - `coin`: one of `bitcoin`, `matic-network`, `ethereum`  
   **Example:**
   ```bash
   /api/deviation?coin=bitcoin
