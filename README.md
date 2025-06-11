# React Frontend Project

This is a modern React frontend project built with Vite, featuring a responsive design and integration with a .NET backend API.

## Features

- 🚀 Built with React and Vite for optimal performance
- 🎨 Styled with Tailwind CSS for responsive design
- 🔄 React Query for efficient data fetching and caching
- 📱 Fully responsive layout
- 🔒 JWT authentication support
- 📝 Form handling with React Hook Form
- 🔔 Toast notifications with React Toastify
- 🎯 Type-safe development with TypeScript

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (URL should be configured in environment variables)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=http://your-backend-api-url
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API services
├── styles/        # Global styles
├── assets/        # Static assets
└── utils/         # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
