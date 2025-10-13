# 🇬🇧 Verb Voyage EN

An interactive English irregular verb learning game built with React and TypeScript. Master English irregular verbs through engaging activities and track your progress!

## 📖 About

Verb Voyage EN is an educational web application designed to help learners practice and memorize English irregular verbs through three different interactive activities. The app features a clean, modern UI and provides immediate feedback to reinforce learning.

## ✨ Features

### 🎮 Three Learning Activities

1. **Match the Meaning**
   - See a French verb, choose its English translation
   - Multiple choice format with 4 options
   - Tests vocabulary recognition

2. **Past Form Quiz**
   - Practice past tense (passé composé) conjugations
   - Practice past participle forms
   - Multiple choice with intelligent distractors

3. **Fill in the Blank**
   - Complete sentences with the correct verb form
   - Context-based learning
   - Free text input for better retention

### 🎯 Smart Learning Features

- **No Repeats**: Fisher-Yates shuffle ensures unique verbs in each session
- **Progress Tracking**: See your score after each activity
- **Instant Feedback**: Know immediately if your answer is correct
- **Completion Screen**: Review your performance and try again or return home
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies

This project is built with modern web technologies:

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icons

## 🏗️ Architecture

The codebase follows React best practices with:

- **Custom Hooks**: Reusable logic (`useActivity`, `useShuffledVerbs`, `useGameStats`)
- **Component Composition**: Shared UI components (`ActivityLayout`, `QuestionDisplay`, `ResultDisplay`)
- **Type Safety**: Full TypeScript coverage
- **Clean Code**: DRY principles, no dead code, minimal duplication

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd 1_verb-voyage-fr

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📂 Project Structure

```
src/
├── components/
│   ├── activities/          # Learning activity components
│   │   ├── MeaningMatch.tsx
│   │   ├── PastFormQuiz.tsx
│   │   ├── FillBlankActivity.tsx
│   │   ├── ActivityLayout.tsx      # Shared layout
│   │   ├── QuestionDisplay.tsx     # Question wrapper
│   │   ├── ResultDisplay.tsx       # Result feedback
│   │   └── ActivityCompletion.tsx  # Completion screen
│   ├── ui/                  # shadcn/ui components
│   └── GameHeader.tsx       # Main header component
├── hooks/
│   ├── useActivity.ts       # Activity state management
│   ├── useShuffledVerbs.ts  # Verb shuffling logic
│   └── useGameStats.ts      # Stats tracking
├── data/
│   └── verbs.ts            # Irregular verbs database
├── types/
│   └── game.ts             # TypeScript definitions
└── pages/
    └── Index.tsx           # Main game page
```

## 🎨 Design System

- **Color Scheme**: Modern, accessible colors with good contrast
- **Typography**: Clean, readable fonts optimized for learning
- **Components**: Built on shadcn/ui for consistency and quality
- **Responsive**: Mobile-first approach with adaptive layouts

## 🔧 Development

### Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Key Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 📈 Recent Improvements

- ✅ Extracted shared logic into reusable hooks
- ✅ Created common UI components for consistency
- ✅ Implemented Fisher-Yates shuffle to prevent repeats
- ✅ Added completion screen with retry functionality
- ✅ Removed dead code and reduced duplication by ~10%
- ✅ Fixed mobile hover state issues

## 🚢 Deployment

### Via Lovable

Simply open [Lovable](https://lovable.dev/projects/2a558479-6e48-4348-b009-b5bd36669df7) and click on Share → Publish.

### Manual Deployment

```sh
npm run build
# Deploy the 'dist' folder to your hosting provider
```

Compatible with: Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

## 🔗 Custom Domain

To connect a custom domain, navigate to:
Project > Settings > Domains > Connect Domain

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- French verb data curated for learning

---

**Happy Learning! 🎓** Practice makes perfect - _La pratique rend parfait!_
