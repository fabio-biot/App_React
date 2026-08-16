# AI Dashboard

A React + TypeScript + Vite application for managing customer data, built as a Salesforce AI Builder mockup.

## Features

- Fetches customer data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) API
- Displays customers in cards with delete and edit functionality
- Add new customers via a form
- Search customers by name or company
- View error states when API requests fail
- Responsive design

## Technologies Used

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (modules or plain, as per Vite template)
- **State Management**: React Hooks (useState, useEffect)
- **API Fetching**: Fetch API

## Project Structure

```
src/
├── components/
│   ├── CustomerCard.tsx   # Individual customer card with delete/edit buttons
│   ├── ErrorCard.tsx      # Error display component
│   ├── EditForm.tsx       # Form for editing customer (currently display-only)
│   ├── Header.tsx         # Application header
│   └── Footer.tsx         # Application footer
├── App.tsx                # Main application component
├── main.tsx               # Entry point
├── index.css              # Global styles
└── App.css                # App-specific styles
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

### Development Server

Start the development server with hot module replacement:
```bash
npm run dev
```
or
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

Create a production build:
```bash
npm run build
```
or
```bash
yarn build
```

Preview the production build:
```bash
npm run preview
```
or
```bash
yarn preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```
or
```bash
yarn lint
```

## Features in Detail

### Customer Management

- **View Customers**: Fetches and displays a list of customers from the JSONPlaceholder API
- **Delete Customers**: Remove a customer from the list (frontend only)
- **Add Customers**: Submit the form to add a new customer (added to frontend state)
- **Edit Customers**: Click "Edit" on a customer card to view the edit form (currently displays data but doesn't update - future enhancement)

### Search

- Type in the search box to filter customers by name or company (case-insensitive)

### Error Handling

- If the API request fails, an error card is displayed with the error message
- Form validation prevents submission of empty fields

## Future Improvements

- Implement actual editing functionality (update customer in state)
- Persist data (e.g., using localStorage or a mock backend)
- Add loading skeletons or better loading states
- Improve UI with a CSS framework or custom styling
- Add customer ID to edit form and implement update logic
- Add unit and integration tests
- Implement proper routing if expanding to multiple pages

## Acknowledgements

- Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for mock API data
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

## License

This project is open source and available under the [MIT License](LICENSE).