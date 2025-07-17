import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Coins, TrendingUp, Users, Wallet, BarChart3 } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { TokenCreator } from './components/TokenCreator'
import { TradingInterface } from './components/TradingInterface'
import { PumpRooms } from './components/PumpRooms'
import { Portfolio } from './components/Portfolio'
import { Explorer } from './components/Explorer'
import { useAuth } from './hooks/useAuth'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const { user, isAuthenticated, login } = useAuth()

  const navigation = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'create', label: 'Create Token', icon: Coins },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'rooms', label: 'Pump Rooms', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'explorer', label: 'Explorer', icon: BarChart3 },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'create':
        return <TokenCreator />
      case 'trade':
        return <TradingInterface />
      case 'rooms':
        return <PumpRooms />
      case 'portfolio':
        return <Portfolio />
      case 'explorer':
        return <Explorer />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="quantum-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 quantum-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold quantum-text-gradient">QuantumX.Exchange</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === item.id
                        ? 'quantum-gradient text-white shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Connect Wallet Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <div className="font-medium">{user?.displayName || user?.email}</div>
                    <div className="text-xs text-muted-foreground">Connected</div>
                  </div>
                  <div className="w-8 h-8 quantum-gradient rounded-full flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                </div>
              ) : (
                <Button className="quantum-button" onClick={login}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  )
}

// Home Page Component
function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold quantum-text-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Build the Cosmos
          </motion.h1>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Rule the Chain
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The most advanced no-code coin creation and decentralized exchange platform in the Cosmos ecosystem. 
            Create, launch, trade, and share crypto tokens instantly with AI-powered trading and quantum transaction layer.
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" className="quantum-button text-lg px-8 py-4">
            <Coins className="w-5 h-5 mr-2" />
            Create Your Token
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary/50 hover:bg-primary/10">
            <TrendingUp className="w-5 h-5 mr-2" />
            Start Trading
          </Button>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {[
          { label: 'Total Volume', value: '$2.4B', change: '+12.5%' },
          { label: 'Active Tokens', value: '15,847', change: '+8.2%' },
          { label: 'Daily Users', value: '89.2K', change: '+15.7%' },
          { label: 'Pump Rooms', value: '3,421', change: '+22.1%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
          >
            <Card className="quantum-card text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold quantum-text-gradient">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Badge variant="secondary" className="mt-2 text-green-400 bg-green-400/10">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Quantum-Powered Features</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of decentralized finance with our cutting-edge technology stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Quantum Transaction Layer',
              description: 'Lightning-fast transactions powered by quantum computing technology',
              color: 'text-yellow-400'
            },
            {
              icon: Coins,
              title: 'No-Code Token Creation',
              description: 'Create and launch tokens in minutes without any technical knowledge',
              color: 'text-blue-400'
            },
            {
              icon: TrendingUp,
              title: 'AI-Powered Trading',
              description: 'Advanced AI algorithms for optimal trading strategies and risk management',
              color: 'text-green-400'
            },
            {
              icon: Users,
              title: 'Social Pump Rooms',
              description: 'Coordinate investments and build communities around your favorite tokens',
              color: 'text-purple-400'
            },
            {
              icon: Wallet,
              title: 'Cross-Chain Bridge',
              description: 'Seamlessly trade across Cosmos, Ethereum, and Solana ecosystems',
              color: 'text-pink-400'
            },
            {
              icon: BarChart3,
              title: 'Real-Time Analytics',
              description: 'Comprehensive market data and insights powered by machine learning',
              color: 'text-cyan-400'
            },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="quantum-card h-full hover:quantum-glow transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="text-center py-16 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <h3 className="text-3xl font-bold">Ready to Launch Your Token?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of creators who have already launched their tokens on QuantumX.Exchange. 
          Start building the future of decentralized finance today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="quantum-button">
            <Coins className="w-5 h-5 mr-2" />
            Create Token Now
          </Button>
          <Button size="lg" variant="outline">
            <Users className="w-5 h-5 mr-2" />
            Join Community
          </Button>
        </div>
      </motion.section>
    </div>
  )
}

export default App