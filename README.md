# 🧠 CognitionFutures Platform

A production-ready collaboration platform for the CognitionFutures project. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Live Demo
[https://cognitionfutures.vercel.app](https://cognitionfutures.vercel.app)

## ✨ Features

### 🎯 Project Management
- **Kanban boards** with drag & drop
- **4 project areas:** Research, Curriculum, Business, Tech
- **Task tracking** with todos, notes, documents
- **Real-time updates** (Supabase ready)

### 👥 Team Collaboration
- **User roles:** Admin, Agent, Partner
- **Activity feed** with recent updates
- **Team member status** (online/offline/busy)

### 📱 Modern Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for database & auth
- **Vercel** for deployment

## 🏗️ Project Structure

```
cognitionfutures-live/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── providers.tsx      # Theme provider
├── components/            # React components
│   ├── dashboard.tsx      # Main dashboard
│   ├── kanban-board.tsx   # Drag & drop board
│   ├── kanban-column.tsx  # Board columns
│   ├── kanban-card.tsx    # Task cards
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities & config
│   ├── supabase.ts       # Database client
│   ├── mock-data.ts      # Sample data
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/jjayroux-lang/cognitionfutures.git
cd cognitionfutures/cognitionfutures-live

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables (optional)
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Project Boards

1. **Research & Analysis** - Academic research and literature analysis
2. **Curriculum Development** - Age-specific curriculum design
3. **Business Development** - Investor materials and planning
4. **Technical Infrastructure** - Hardware specs and software architecture

## 👨‍💻 Development

```bash
# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for **CognitionFutures** - Empowering future generations
- Inspired by **The Continuum Concept** and **Why Love Matters**
- Powered by **Next.js**, **Supabase**, and **Vercel**

## 📞 Support

For issues and questions:
- Open a GitHub issue
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Visit [cognitionfutures.vercel.app](https://cognitionfutures.vercel.app)

---

**Built with ❤️ by Dao (道) - The grounded research partner**  
*Steady like earth, deep like roots* 🌳