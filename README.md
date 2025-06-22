# Agro-Ecommerce Frontend 🌾

A modern, full-featured e-commerce web application focused on agricultural and food products, built with React and Vite. The platform features multi-language support (English, French, Kinyarwanda), AI-powered customer assistance, and is specifically tailored for the Rwandan agricultural market.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Key Components](#key-components)
- [Internationalization](#internationalization)
- [AI Integration](#ai-integration)
- [Customization](#customization)
- [API Integration](#api-integration)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

### 🛒 **E-Commerce Core**
- **Product Catalog**: Browse, search, and filter agricultural products, seeds, fertilizers, and farming equipment
- **Advanced Search**: Filter by category, price range, location, and product specifications
- **Shopping Cart**: Add, remove, and manage products with quantity controls
- **Wishlist**: Save favorite products for later purchase
- **Secure Checkout**: Multi-step checkout process with order confirmation

### 👤 **User Experience**
- **User Authentication**: Secure registration, login, and profile management
- **Order Management**: Track orders, view history, and manage deliveries
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme switching for better user experience

### 🌐 **Localization & AI**
- **Multi-language Support**: Full support for English, French, and Kinyarwanda
- **AI Chatbot**: Gemini-powered assistant for agricultural advice and product support
- **Cultural Adaptation**: Tailored for Rwandan agricultural practices and local market needs
- **Real-time Translation**: Dynamic language switching without page reload

### 📊 **Advanced Features**
- **Admin Dashboard**: Comprehensive management interface for products, orders, and analytics
- **Analytics Integration**: Track user behavior and sales performance
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **PWA Ready**: Progressive Web App capabilities for offline functionality

## 🎯 Demo

Visit our live demo: [Agro-Ecommerce Demo](https://your-demo-url.com)

### Demo Credentials
```
Admin User:
Email: fidelniyomugabo67@gmail.com
Password: adminPassword

Regular User:
create your account
```

## 📁 Project Structure

```
agro-ecommerce-frontend/
├── public/
│   ├── images/              # Static images and assets
│   │   ├── flags/           # Country flag icons (RW, GB, FR)
│   │   ├── products/        # Product images and thumbnails
│   │   ├── categories/      # Category icons and banners
│   │   └── branding/        # Logos and brand assets
│   ├── icons/               # SVG icons for UI components
│   │   ├── categories/      # Agricultural category icons
│   │   ├── ui/              # Interface icons
│   │   └── social/          # Social media icons
│   ├── assets/              # Additional static assets
│   │   ├── screenshots/     # Application screenshots
│   │   └── videos/          # Demo videos
│   └── favicon.ico          # Site favicon
├── src/
│   ├── assets/              # Build-time assets
│   │   ├── images/          # Component-specific images
│   │   ├── backgrounds/     # Background images
│   │   └── animations/      # Animation assets
│   ├── components/          # Reusable React components
│   │   ├── AI/              # AI chatbot components
│   │   │   ├── FloatingChat.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   └── ChatInput.jsx
│   │   ├── TopHeader/       # Header components
│   │   │   ├── ChangeLang.jsx
│   │   │   ├── UserMenu.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── Product/         # Product-related components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductFilters.jsx
│   │   ├── Cart/            # Shopping cart components
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── MiniCart.jsx
│   │   ├── Auth/            # Authentication components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── PasswordReset.jsx
│   │   ├── Layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Navigation.jsx
│   │   ├── UI/              # Generic UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Toast.jsx
│   │   └── Admin/           # Admin panel components
│   │       ├── Dashboard.jsx
│   │       ├── ProductManager.jsx
│   │       └── OrderManager.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx      # Authentication state
│   │   ├── CartContext.jsx      # Shopping cart state
│   │   ├── LangContext.jsx      # Language/localization
│   │   ├── OrderContext.jsx     # Order management
│   │   ├── WishlistContext.jsx  # Wishlist state
│   │   └── ThemeContext.jsx     # Theme switching
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js           # Authentication hook
│   │   ├── useCart.js           # Cart management
│   │   ├── useDebounce.js       # Debounced search
│   │   ├── useLocalStorage.js   # Local storage hook
│   │   └── useApi.js            # API calling hook
│   ├── lib/                 # Utility libraries
│   │   ├── axios.js             # Axios configuration
│   │   ├── debounce.js          # Debounce utility
│   │   ├── userInfo.js          # User information helpers
│   │   ├── constants.js         # App constants
│   │   ├── helpers.js           # General helper functions
│   │   └── validation.js        # Form validation
│   ├── pages/               # Main application pages
│   │   ├── Home/                # Homepage
│   │   │   ├── index.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   └── CategoryGrid.jsx
│   │   ├── Products/            # Product pages
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── CategoryPage.jsx
│   │   ├── Cart/                # Shopping cart
│   │   │   ├── CartPage.jsx
│   │   │   └── Checkout.jsx
│   │   ├── Auth/                # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   ├── Orders/              # Order management
│   │   │   ├── OrderHistory.jsx
│   │   │   └── OrderDetail.jsx
│   │   ├── Admin/               # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Users.jsx
│   │   └── Static/              # Static pages
│   │       ├── About.jsx
│   │       ├── Contact.jsx
│   │       ├── Privacy.jsx
│   │       └── Terms.jsx
│   ├── services/            # API service modules
│   │   ├── authService.js       # Authentication API
│   │   ├── productService.js    # Product API
│   │   ├── orderService.js      # Order API
│   │   ├── userService.js       # User management API
│   │   ├── cartService.js       # Cart API
│   │   └── analyticsService.js  # Analytics API
│   ├── styles/              # CSS and styling
│   │   ├── globals.css          # Global styles
│   │   ├── components.css       # Component styles
│   │   └── animations.css       # Animation definitions
│   ├── utils/               # Utility functions
│   │   ├── formatters.js        # Data formatting
│   │   ├── validators.js        # Validation functions
│   │   ├── constants.js         # Application constants
│   │   └── errorHandling.js     # Error handling
│   ├── locales/             # Internationalization files
│   │   ├── en.json              # English translations
│   │   ├── fr.json              # French translations
│   │   └── rw.json              # Kinyarwanda translations
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Application entry point
│   ├── routes.jsx           # Route definitions
│   └── index.css            # Tailwind CSS imports
├── tests/                   # Test files
│   ├── components/          # Component tests
│   ├── pages/               # Page tests
│   ├── services/            # Service tests
│   └── utils/               # Utility tests
├── docs/                    # Documentation
│   ├── api.md               # API documentation
│   ├── deployment.md        # Deployment guide
│   └── contributing.md      # Contribution guidelines
├── .env.example             # Environment variables template
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
├── vitest.config.js         # Vitest configuration
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended) - [Download](https://nodejs.org/)
- **npm** (v8+) or **yarn** (v1.22+)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/agro-ecommerce-frontend.git
   cd agro-ecommerce-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration (see [Environment Variables](#environment-variables))

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run dev:host     # Start with network access

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Linting & Formatting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier

# Type Checking
npm run type-check   # Run TypeScript type checking

# Analysis
npm run analyze      # Analyze bundle size
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Application Configuration
VITE_APP_NAME=Agro-Ecommerce
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Agricultural E-commerce Platform

# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_API_TIMEOUT=30000

# Authentication
VITE_JWT_SECRET=your_jwt_secret_key
VITE_TOKEN_STORAGE_KEY=agro_auth_token
VITE_REFRESH_TOKEN_KEY=agro_refresh_token

# AI Integration
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_AI_CHAT_ENABLED=true
VITE_AI_CHAT_TIMEOUT=10000

# Google Services
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Payment Integration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT_SUPPORT=true

# Development
VITE_DEBUG_MODE=false
VITE_MOCK_API=false
```

## 🔑 Key Components

### Language Switcher
**Location**: `src/components/TopHeader/ChangeLang.jsx`

Features:
- Flag icons for visual language identification
- Smooth transitions between languages
- Persistent language preference storage
- Support for RTL languages (future-ready)

```jsx
const ChangeLang = () => {
  const { currentLang, changeLang } = useContext(LangContext);
  
  return (
    <div className="language-switcher">
      {/* Implementation */}
    </div>
  );
};
```

### AI Chat Widget
**Location**: `src/components/AI/FloatingChat.jsx`

Features:
- Gemini AI integration for agricultural advice
- Multi-language support
- Context-aware responses
- Product recommendation engine
- Farming tips and seasonal advice

```jsx
const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  
  // AI integration logic
  return (
    <div className="floating-chat">
      {/* Chat interface */}
    </div>
  );
};
```

### Product Components
**Location**: `src/components/Product/`

- **ProductCard**: Displays product information with images, pricing, and actions
- **ProductGrid**: Responsive grid layout for product listings
- **ProductFilters**: Advanced filtering by category, price, location, and features
- **ProductDetails**: Comprehensive product information page

### Context Providers
**Location**: `src/context/`

- **AuthContext**: User authentication and authorization state
- **CartContext**: Shopping cart management and persistence
- **LangContext**: Language switching and localization
- **OrderContext**: Order management and tracking
- **WishlistContext**: Wishlist functionality
- **ThemeContext**: Dark/light mode switching

## 🌐 Internationalization

### Supported Languages

| Language | Code | Flag | Status |
|----------|------|------|--------|
| English | EN | 🇬🇧 | ✅ Complete |
| French | FR | 🇫🇷 | ✅ Complete |
| Kinyarwanda | RW | 🇷🇼 | ✅ Complete |

### Translation Files

Located in `src/locales/`:

```json
// en.json
{
  "common": {
    "welcome": "Welcome to Agro-Ecommerce",
    "search": "Search products...",
    "cart": "Shopping Cart",
    "checkout": "Checkout"
  },
  "products": {
    "featured": "Featured Products",
    "categories": "Categories",
    "addToCart": "Add to Cart",
    "addToWishlist": "Add to Wishlist"
  }
}
```

### Adding New Languages

1. Create translation file: `src/locales/[lang-code].json`
2. Add language option in `ChangeLang.jsx`
3. Update `LangContext.jsx` with new language support
4. Add flag icon to `public/images/flags/`

## 🤖 AI Integration

### Gemini AI Configuration

The AI chatbot provides:

- **Product Recommendations**: Based on user queries and preferences
- **Agricultural Advice**: Farming tips, seasonal guidance, pest control
- **Customer Support**: Order assistance, product information
- **Multi-language Support**: Responses in user's preferred language

### AI Features

```javascript
// AI Service Configuration
const aiConfig = {
  model: "gemini-pro",
  temperature: 0.7,
  maxTokens: 1000,
  languages: ["en", "fr", "rw"],
  contexts: [
    "agriculture",
    "ecommerce",
    "products",
    "farming",
    "rwanda"
  ]
};
```

### Customizing AI Responses

Edit `src/services/aiService.js` to modify:
- Response templates
- Context awareness
- Product knowledge base
- Agricultural expertise areas

## 🎨 Customization

### Theming

The application supports extensive theming through Tailwind CSS and CSS custom properties:

```css
/* src/styles/globals.css */
:root {
  --primary-color: #10b981;
  --secondary-color: #f59e0b;
  --accent-color: #3b82f6;
  --background-color: #ffffff;
  --text-color: #1f2937;
}

[data-theme="dark"] {
  --background-color: #1f2937;
  --text-color: #f9fafb;
}
```

### Brand Customization

1. **Logo**: Replace `public/images/branding/logo.png`
2. **Colors**: Update `tailwind.config.js` color palette
3. **Typography**: Modify font settings in `tailwind.config.js`
4. **Icons**: Update category icons in `public/icons/categories/`

### Product Categories

Add new categories by:
1. Adding category icons to `public/icons/categories/`
2. Updating category data in `src/data/categories.js`
3. Adding translations to locale files
4. Updating AI knowledge base

## 🔗 API Integration

### Service Architecture

All API calls are centralized in the `src/services/` directory:

```javascript
// src/services/productService.js
import { apiClient } from '../lib/axios';

export const productService = {
  getProducts: (params) => apiClient.get('/products', { params }),
  getProduct: (id) => apiClient.get(`/products/${id}`),
  searchProducts: (query) => apiClient.get('/products/search', { params: { q: query } }),
  getCategories: () => apiClient.get('/categories'),
};
```

### Error Handling

Comprehensive error handling with user-friendly messages:

```javascript
// src/utils/errorHandling.js
export const handleApiError = (error) => {
  if (error.response?.status === 401) {
    // Handle authentication errors
    authService.logout();
    window.location.href = '/login';
  }
  
  return {
    message: error.response?.data?.message || 'An error occurred',
    status: error.response?.status || 500
  };
};
```

### API Mocking

For development without backend:

```javascript
// src/lib/mockApi.js
export const mockProductData = {
  products: [
    {
      id: 1,
      name: "Organic Fertilizer",
      price: 15000,
      category: "fertilizers",
      image: "/images/products/fertilizer-1.jpg"
    }
  ]
};
```

## ⚡ Performance Optimization

### Implemented Optimizations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack Bundle Analyzer integration
- **Caching**: Service Worker for offline functionality
- **Lazy Loading**: Components and images load on demand

### Performance Monitoring

```javascript
// src/utils/performance.js
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};
```

### Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', 'framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

## 🧪 Testing

### Testing Stack

- **Vitest**: Unit and integration testing
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Playwright**: End-to-end testing

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Test Examples

```javascript
// tests/components/ProductCard.test.jsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../../src/components/Product/ProductCard';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const product = {
      id: 1,
      name: 'Test Product',
      price: 1000,
      image: 'test-image.jpg'
    };
    
    render(<ProductCard product={product} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('1000 RWF')).toBeInTheDocument();
  });
});
```

## 🚢 Deployment

### Build Process

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

#### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Environment-Specific Builds

```bash
# Development
npm run build:dev

# Staging
npm run build:staging

# Production
npm run build:prod
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](docs/contributing.md) before getting started.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Write tests**: Ensure your changes are tested
5. **Run checks**: `npm run lint && npm run test`
6. **Commit changes**: Use conventional commits
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Create Pull Request**: Describe your changes

### Coding Standards

- **ESLint**: Follow the configured linting rules
- **Prettier**: Use for code formatting
- **Conventional Commits**: Use for commit messages
- **Component Structure**: Follow established patterns
- **Documentation**: Update relevant documentation

### Issues and Bug Reports

Use our issue templates:
- 🐛 Bug Report
- 🚀 Feature Request
- 📚 Documentation Update
- 🔧 Technical Improvement

## 🔧 Troubleshooting

### Common Issues

#### Node.js Version Compatibility
```bash
# Check Node.js version
node --version

# Use correct version with nvm
nvm use 18
```

#### Dependency Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Issues
```bash
# Check for TypeScript errors
npm run type-check

# Analyze bundle
npm run analyze
```

#### API Connection Issues
```bash
# Check environment variables
cat .env

# Test API connection
npm run test:api
```

### Debug Mode

Enable debug mode for detailed logging:

```javascript
// Set in .env
VITE_DEBUG_MODE=true

// Or programmatically
window.DEBUG = true;
```

### Performance Issues

```bash
# Analyze bundle size
npm run analyze

# Run performance audit
npm run audit

# Check for unused dependencies
npm run depcheck
```

## 📞 Support

### Getting Help

- 📖 **Documentation**: Check this README and `/docs` folder
- 🐛 **Bug Reports**: [Create an issue](https://github.com/your-username/agro-ecommerce-frontend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/agro-ecommerce-frontend/discussions)
- 📧 **Email**: support@agro-ecommerce.com

### Community

- 🌟 **Discord**: [Join our community](https://discord.gg/agro-ecommerce)
- 🐦 **Twitter**: [@AgroEcommerce](https://twitter.com/AgroEcommerce)
- 📺 **YouTube**: [Tutorial videos](https://youtube.com/AgroEcommerce)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

- React: MIT License
- Tailwind CSS: MIT License
- Vite: MIT License
- All other dependencies retain their original licenses

---

## 👨‍💻 Author

**Abbas Fidele**
- 🌐 Portfolio: [abbas-fidele.dev](https://abbas-fidele.dev)
- 📧 Email: abbas.fidele@example.com
- 💼 LinkedIn: [Abbas Fidele](https://linkedin.com/in/abbas-fidele)
- 🐙 GitHub: [@abbas-fidele](https://github.com/abbas-fidele)

---

## 🙏 Acknowledgments

- 🇷🇼 **Ministry of Agriculture, Rwanda** - For agricultural data and insights
- 🌱 **Rwanda Agriculture Board** - For market research and requirements
- 👥 **Open Source Community** - For the amazing tools and libraries
- 🎨 **Design Inspiration** - Modern e-commerce platforms and agricultural websites

---

**Made with ❤️ for sustainable agriculture and modern e-commerce solutions.**

*For questions, issues, or contributions, please don't hesitate to reach out!*