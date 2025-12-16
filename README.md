# Websites & AI Tools List Manager

A simple React web app for saving and managing a personal list of websites and AI tools.

## Features

- 📝 Add new websites and AI tools with name and URL
- 📋 View all saved items in a clean, organized list
- 🗑️ Delete items with confirmation
- 💾 Persistent storage using browser localStorage
- 📱 Responsive design that works on mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will load with an empty list on first visit. Your data will persist across browser sessions.

## Usage

1. **Add an Item**: Fill in the name and URL fields in the form and click "Add Item"
   - Name: The title of the website or AI tool
   - URL: The full URL (must start with http:// or https://)

2. **View Items**: All saved items are displayed in a grid format

3. **Delete an Item**: Click the red × button on any item card and confirm deletion

## Project Structure

```
src/
├── App.js                 # Main component with state management
├── App.css               # App-level styles
├── index.js              # React entry point
├── index.css             # Global styles
└── components/
    ├── ItemForm.js       # Form for adding new items
    ├── ItemForm.css      # Form styling
    ├── ItemList.js       # Component to display all items
    ├── ItemList.css      # List styling
    ├── ItemCard.js       # Individual item display
    └── ItemCard.css      # Item card styling
```

## Technologies Used

- React 18.2.0 - UI library
- React Hooks (useState, useEffect) - State management
- localStorage - Data persistence
- CSS3 - Styling

## Available Scripts

- `npm start` - Run the app in development mode
- `npm build` - Build the app for production
- `npm test` - Run the test suite
- `npm eject` - Eject from create-react-app (irreversible)

## Data Storage

Data is automatically saved to the browser's localStorage under the key `websitesAndTools`. This means:
- Items persist even after closing the browser
- Each browser/device has its own separate list
- Clearing browser data will remove the list

## License

This project is provided as-is for personal use.
