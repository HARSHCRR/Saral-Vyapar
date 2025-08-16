# Saral Vyapar - Single Window System

A revolutionary AI-powered Single Window System for business approvals, licenses, and registrations. Built with cutting-edge technology including AI chatbots, blockchain verification, and RPA automation with human-in-the-loop OTP handling.

## 🚀 Features

### Core Features
- **AI-Powered Chatbot**: Get instant guidance on licenses and approvals using Google Gemini AI
- **Blockchain Verification**: Secure and tamper-proof license management with NFT technology
- **RPA Automation**: Automated form filling for government portals with OTP handling
- **Smart Document Management**: Cloud-based document storage and organization
- **Real-time Analytics**: Track application progress and success rates
- **Multi-platform Access**: Web, mobile, and tablet support

### Advanced RPA Features
- **Human-in-the-Loop OTP Handling**: Secure OTP verification during automation
- **Real-time Session Monitoring**: Live tracking of automation progress
- **Session Management**: Start, pause, resume, and cancel automation sessions
- **Visual Browser Automation**: See the automation in action with visible browser
- **Step-by-step Progress Tracking**: Detailed logs of each automation step
- **Error Handling & Recovery**: Robust error handling with user intervention

### Business Sectors Supported
- Food Processing & Dairy
- Handloom & Textile
- Information Technology
- Tourism & Hospitality
- MSME
- Electronics Manufacturing
- Film & Entertainment
- Renewable Energy
- Civil Aviation
- Pharmaceuticals
- Logistics & Warehousing
- Electric Vehicle Manufacturing
- Defence & Aerospace

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **File Upload**: Multer with Firebase Storage
- **PDF Generation**: PDF-Lib
- **RPA**: Puppeteer with session management
- **Blockchain**: Ethers.js

### AI & Automation
- **AI Assistant**: Google Gemini API
- **Knowledge Base**: Structured JSON data
- **Form Automation**: Puppeteer for web scraping
- **Document Processing**: PDF generation and manipulation
- **Session Management**: Real-time automation tracking

### Blockchain
- **Network**: Ethereum Sepolia Testnet
- **Smart Contracts**: ERC-721 NFT for licenses
- **Wallet Integration**: MetaMask support
- **Verification**: Blockchain explorer integration

## 📋 Development Roadmap

### Sprint 0: Setup & Foundation ✅
- [x] Project scaffolding with Next.js and Express
- [x] Database schema design (User, Business models)
- [x] Authentication system with JWT
- [x] Environment configuration
- [x] Basic routing structure

### Sprint 1: Core Portal & AI Chatbot ✅
- [x] Landing page with modern UI/UX
- [x] User authentication (login/register)
- [x] AI chatbot integration with Gemini API
- [x] Business profile management
- [x] License recommendation system
- [x] Multi-step form wizard

### Sprint 2: Integration & Automation ✅
- [x] Dashboard with real-time statistics
- [x] Document upload and management
- [x] PDF generation for government forms
- [x] **Enhanced RPA automation with OTP handling**
- [x] **Human-in-the-loop session management**
- [x] **Real-time automation monitoring**
- [x] Application status tracking
- [x] Chatbot UI integration

### Sprint 3: Blockchain & Polish ✅
- [x] NFT license minting system
- [x] Blockchain verification
- [x] Smart contract integration
- [x] Final UI/UX polish
- [x] Performance optimization
- [x] Documentation and deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Google Gemini API key
- Ethereum wallet (for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saral-vyapar-sws
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   MONGODB_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   ETHEREUM_PRIVATE_KEY=your_ethereum_key
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend
   npm run dev:server
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
saral-vyapar-sws/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── HeroSection.tsx    # Hero section
│   ├── FeaturesSection.tsx # Features showcase
│   ├── HowItWorksSection.tsx # Process flow
│   ├── IndustriesSection.tsx # Industry support
│   ├── TestimonialsSection.tsx # User testimonials
│   ├── AutomationMonitor.tsx # RPA session monitoring
│   └── Footer.tsx         # Footer
├── server/                # Backend Express server
│   ├── index.js           # Main server file
│   ├── models/            # MongoDB models
│   │   ├── User.js        # User model
│   │   └── Business.js    # Business model
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication
│   │   ├── business.js    # Business management
│   │   ├── chatbot.js     # AI chatbot
│   │   ├── documents.js   # Document management
│   │   ├── applications.js # Application tracking
│   │   ├── pdf.js         # PDF generation
│   │   ├── rpa.js         # Enhanced RPA automation
│   │   └── blockchain.js  # Blockchain integration
│   └── uploads/           # File uploads
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── README.md             # Documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Business Management
- `POST /api/business/profile` - Create/update business profile
- `GET /api/business/profile` - Get business profile
- `GET /api/business/statistics` - Get business statistics
- `PATCH /api/business/licenses/:id` - Update license status

### AI Chatbot
- `POST /api/chatbot/chat` - Chat with AI assistant
- `POST /api/chatbot/get-recommendations` - Get license recommendations

### Documents
- `POST /api/documents/upload` - Upload documents
- `GET /api/documents` - Get all documents
- `DELETE /api/documents/:id` - Delete document

### PDF Generation
- `POST /api/pdf/gst-form` - Generate GST registration form
- `POST /api/pdf/msme-form` - Generate MSME registration form

### Enhanced RPA Automation
- `POST /api/rpa/gst-automation` - Start GST registration automation
- `POST /api/rpa/msme-automation` - Start MSME registration automation
- `GET /api/rpa/sessions` - Get all user automation sessions
- `GET /api/rpa/session/:sessionId` - Get session details and status
- `POST /api/rpa/session/:sessionId/otp` - Submit OTP for verification
- `DELETE /api/rpa/session/:sessionId` - Cancel automation session

### Blockchain
- `POST /api/blockchain/mint-license` - Mint license NFT
- `GET /api/blockchain/my-nfts` - Get user NFTs
- `POST /api/blockchain/verify-nft` - Verify NFT ownership

## 🤖 RPA Automation Features

### Human-in-the-Loop OTP Handling
The RPA system implements a sophisticated human-in-the-loop model for OTP verification:

1. **Automated Form Filling**: RPA bots automatically fill government forms
2. **OTP Detection**: System detects when OTP verification is required
3. **User Notification**: Dashboard alerts user about OTP requirement
4. **Secure Input**: User enters OTP through secure interface
5. **Automation Resume**: Bot continues automation after OTP verification
6. **Session Management**: Complete session tracking and management

### Session Management
- **Real-time Monitoring**: Live tracking of automation progress
- **Session States**: Running, OTP Required, Completed, Failed, Cancelled
- **Step-by-step Logging**: Detailed logs of each automation step
- **Error Recovery**: Robust error handling with user intervention
- **Session Cancellation**: Ability to cancel automation at any time

### Security Features
- **Session Isolation**: Each automation session is isolated
- **User Authentication**: Only session owner can access and control
- **OTP Encryption**: Secure OTP transmission and storage
- **Browser Security**: Secure browser automation with proper cleanup

## 🎨 Customization

### Colors
The project uses a modern color palette:
- Primary: Blue gradient (`#3B82F6` to `#8B5CF6`)
- Secondary: Purple accent (`#8B5CF6`)
- Success: Green (`#10B981`)
- Warning: Orange (`#F59E0B`)
- Error: Red (`#EF4444`)

### Styling
- All components use Tailwind CSS classes
- Custom CSS classes defined in `app/globals.css`
- Animations handled by Framer Motion
- Responsive design for all screen sizes

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Frontend (Vercel - Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic scaling

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Set up database access
3. Configure network access
4. Update connection string

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- File upload restrictions
- Rate limiting (recommended for production)
- **Session-based RPA security**
- **OTP encryption and secure transmission**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@saralvyapar.com

## 🙏 Acknowledgments

- Google Gemini AI for intelligent assistance
- Ethereum Foundation for blockchain technology
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- Puppeteer team for browser automation
- All contributors and supporters

---

**Built with ❤️ for Indian Entrepreneurs**

*Empowering businesses with technology-driven solutions for a better tomorrow.* 