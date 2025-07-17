import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, TrendingDown, Fire, Star, Filter, BarChart3, Users, DollarSign, Clock, Brain, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { mockTokens, mockAIInsights } from '../data/mockData'
import type { Token, AIInsight } from '../types'

export function Explorer() {
  const [tokens, setTokens] = useState<Token[]>(mockTokens)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'market_cap' | 'volume' | 'price_change' | 'holders'>('market_cap')
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'new' | 'trending'>('all')
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        price: token.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
        priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 0.5,
        volume24h: token.volume24h * (1 + (Math.random() - 0.5) * 0.1)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredTokens = tokens
    .filter(token => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter(token => {
      // Category filter
      switch (filterBy) {
        case 'verified':
          return token.isVerified
        case 'new':
          return new Date(token.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        case 'trending':
          return token.volume24h > 50000000
        default:
          return true
      }
    })
    .sort((a, b) => {
      // Sort logic
      switch (sortBy) {
        case 'market_cap':
          return b.marketCap - a.marketCap
        case 'volume':
          return b.volume24h - a.volume24h
        case 'price_change':
          return b.priceChange24h - a.priceChange24h
        case 'holders':
          return b.holdersCount - a.holdersCount
        default:
          return 0
      }
    })

  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(6) : price.toFixed(2)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`
    } else {
      return `$${(marketCap / 1000).toFixed(2)}K`
    }
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`
    } else {
      return `$${(volume / 1000).toFixed(2)}K`
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-3xl font-bold quantum-text-gradient">Token Explorer</h1>
          <p className="text-muted-foreground">
            Discover trending tokens and analyze market data with AI insights
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-green-500/10 text-green-400">
            <BarChart3 className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">
            <Brain className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens by name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterBy} onValueChange={(value) => setFilterBy(value as any)}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tokens</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market_cap">Market Cap</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="price_change">Price Change</SelectItem>
              <SelectItem value="holders">Holders</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Market Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="quantum-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {formatMarketCap(tokens.reduce((sum, token) => sum + token.marketCap, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Market Cap</div>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="quantum-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {formatVolume(tokens.reduce((sum, token) => sum + token.volume24h, 0))}
                </div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
              </div>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="quantum-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{tokens.length}</div>
                <div className="text-sm text-muted-foreground">Listed Tokens</div>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="quantum-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {tokens.reduce((sum, token) => sum + token.holdersCount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Holders</div>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="tokens">All Tokens</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <TokenCard 
                    token={token} 
                    onClick={() => setSelectedToken(token)}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {tokens
                .filter(token => token.volume24h > 50000000)
                .slice(0, 6)
                .map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TrendingTokenCard token={token} rank={index + 1} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockAIInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AIInsightCard insight={insight} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Token Details Modal */}
      {selectedToken && (
        <TokenDetailsModal 
          token={selectedToken} 
          onClose={() => setSelectedToken(null)}
        />
      )}
    </div>
  )
}

function TokenCard({ token, onClick }: { token: Token, onClick: () => void }) {
  return (
    <Card className="quantum-card hover:quantum-glow transition-all duration-300 cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={token.logoUrl} alt={token.name} />
              <AvatarFallback className="quantum-gradient text-white text-sm">
                {token.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center gap-2">
                {token.name}
                {token.isVerified && (
                  <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                    ✓
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{token.symbol}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Star className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium">${formatPrice(token.price)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">24h Change</span>
            <span className={`font-medium flex items-center gap-1 ${
              token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {token.priceChange24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <span className="font-medium">{formatMarketCap(token.marketCap)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Volume</span>
            <span className="font-medium">{formatVolume(token.volume24h)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrendingTokenCard({ token, rank }: { token: Token, rank: number }) {
  return (
    <Card className="quantum-card hover:quantum-glow transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
            {rank}
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src={token.logoUrl} alt={token.name} />
            <AvatarFallback className="quantum-gradient text-white text-sm">
              {token.symbol.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center gap-2">
              {token.name}
              <Fire className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-sm text-muted-foreground">{token.symbol}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 border rounded-lg">
            <div className="text-sm font-medium">${formatPrice(token.price)}</div>
            <div className="text-xs text-muted-foreground">Price</div>
          </div>
          <div className="text-center p-2 border rounded-lg">
            <div className={`text-sm font-medium ${
              token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground">24h</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AIInsightCard({ insight }: { insight: AIInsight }) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'price_prediction':
        return <TrendingUp className="w-5 h-5 text-green-400" />
      case 'sentiment':
        return <Users className="w-5 h-5 text-blue-400" />
      case 'risk_analysis':
        return <BarChart3 className="w-5 h-5 text-orange-400" />
      default:
        return <Brain className="w-5 h-5 text-purple-400" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'price_prediction':
        return 'border-green-500/20 bg-green-500/5'
      case 'sentiment':
        return 'border-blue-500/20 bg-blue-500/5'
      case 'risk_analysis':
        return 'border-orange-500/20 bg-orange-500/5'
      default:
        return 'border-purple-500/20 bg-purple-500/5'
    }
  }

  return (
    <Card className={`quantum-card ${getInsightColor(insight.insightType)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getInsightIcon(insight.insightType)}
            <CardTitle className="text-lg capitalize">
              {insight.insightType.replace('_', ' ')}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {Math.round(insight.confidenceScore * 100)}% confidence
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={insight.token?.logoUrl} />
            <AvatarFallback className="text-xs">{insight.token?.symbol}</AvatarFallback>
          </Avatar>
          {insight.token?.name} ({insight.token?.symbol})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {insight.content}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {new Date(insight.createdAt).toLocaleDateString()}
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TokenDetailsModal({ token, onClose }: { token: Token, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-card border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={token.logoUrl} alt={token.name} />
                <AvatarFallback className="quantum-gradient text-white text-lg">
                  {token.symbol.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{token.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{token.symbol}</Badge>
                  {token.isVerified && (
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>

          <p className="text-muted-foreground">{token.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold">${formatPrice(token.price)}</div>
              <div className="text-sm text-muted-foreground">Current Price</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className={`text-lg font-bold ${
                token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">24h Change</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold">{formatMarketCap(token.marketCap)}</div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold">{token.holdersCount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Holders</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="quantum-button flex-1">
              <DollarSign className="w-4 h-4 mr-2" />
              Trade
            </Button>
            <Button variant="outline" className="flex-1">
              <Star className="w-4 h-4 mr-2" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}