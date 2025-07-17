import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown, DollarSign, BarChart3, Eye, EyeOff, RefreshCw, Download, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { mockTokens } from '../data/mockData'
import type { UserPortfolio, Token } from '../types'
import { useAuth } from '../hooks/useAuth'

// Mock portfolio data
const mockPortfolio: UserPortfolio[] = [
  {
    id: 'portfolio-1',
    userId: 'user-1',
    tokenId: 'atom',
    balance: 1250.5,
    avgBuyPrice: 7.85,
    totalInvested: 9816.43,
    unrealizedPnl: 759.25,
    realizedPnl: 0,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    token: mockTokens.find(t => t.id === 'atom')
  },
  {
    id: 'portfolio-2',
    userId: 'user-1',
    tokenId: 'osmo',
    balance: 5420.8,
    avgBuyPrice: 0.92,
    totalInvested: 4987.14,
    unrealizedPnl: -621.88,
    realizedPnl: 125.50,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    token: mockTokens.find(t => t.id === 'osmo')
  },
  {
    id: 'portfolio-3',
    userId: 'user-1',
    tokenId: 'juno',
    balance: 8750.2,
    avgBuyPrice: 0.28,
    totalInvested: 2450.06,
    unrealizedPnl: 350.02,
    realizedPnl: 0,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    token: mockTokens.find(t => t.id === 'juno')
  }
]

export function Portfolio() {
  const { user, isAuthenticated } = useAuth()
  const [portfolio, setPortfolio] = useState<UserPortfolio[]>(mockPortfolio)
  const [hideBalances, setHideBalances] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '1y'>('24h')

  // Calculate total portfolio value
  const totalValue = portfolio.reduce((sum, item) => sum + (item.balance * (item.token?.price || 0)), 0)
  const totalInvested = portfolio.reduce((sum, item) => sum + item.totalInvested, 0)
  const totalPnL = portfolio.reduce((sum, item) => sum + item.unrealizedPnl + item.realizedPnl, 0)
  const totalPnLPercentage = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Wallet className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Connect your wallet to view your portfolio and track your investments across the Cosmos ecosystem
        </p>
        <Button className="quantum-button">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    )
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
          <h1 className="text-3xl font-bold quantum-text-gradient">Portfolio</h1>
          <p className="text-muted-foreground">
            Track your investments and performance across all tokens
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setHideBalances(!hideBalances)}
            className="flex items-center gap-2"
          >
            {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {hideBalances ? 'Show' : 'Hide'} Balances
          </Button>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="quantum-button">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Portfolio Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="quantum-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hideBalances ? '••••••' : `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className={`text-sm flex items-center gap-1 ${totalPnLPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalPnLPercentage >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {hideBalances ? '••••' : `${totalPnLPercentage >= 0 ? '+' : ''}${totalPnLPercentage.toFixed(2)}%`}
            </div>
          </CardContent>
        </Card>

        <Card className="quantum-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hideBalances ? '••••••' : `$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className="text-sm text-muted-foreground">
              Across {portfolio.length} tokens
            </div>
          </CardContent>
        </Card>

        <Card className="quantum-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {hideBalances ? '••••••' : `${totalPnL >= 0 ? '+' : ''}$${Math.abs(totalPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className="text-sm text-muted-foreground">
              Unrealized + Realized
            </div>
          </CardContent>
        </Card>

        <Card className="quantum-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={portfolio[2]?.token?.logoUrl} />
                <AvatarFallback className="text-xs">{portfolio[2]?.token?.symbol}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{portfolio[2]?.token?.symbol}</div>
                <div className="text-sm text-green-400">+14.3%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Portfolio Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Your Holdings</h3>
              <div className="flex gap-2">
                {['24h', '7d', '30d', '1y'].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe as any)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {portfolio.map((holding, index) => (
                <motion.div
                  key={holding.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HoldingCard holding={holding} hideBalances={hideBalances} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recent Transactions</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </div>

            <Card className="quantum-card">
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No transactions found</p>
                  <p className="text-sm">Your trading history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Portfolio Analytics</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="quantum-card">
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Distribution of your portfolio by value</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.map((holding) => {
                    const value = holding.balance * (holding.token?.price || 0)
                    const percentage = (value / totalValue) * 100
                    return (
                      <div key={holding.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={holding.token?.logoUrl} />
                              <AvatarFallback className="text-xs">{holding.token?.symbol}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{holding.token?.symbol}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="quantum-card">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div className="font-medium text-green-400">67.3%</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg. Hold Time</div>
                      <div className="font-medium">12.5 days</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Best Trade</div>
                      <div className="font-medium text-green-400">+$1,247</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Worst Trade</div>
                      <div className="font-medium text-red-400">-$342</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function HoldingCard({ holding, hideBalances }: { holding: UserPortfolio, hideBalances: boolean }) {
  const currentValue = holding.balance * (holding.token?.price || 0)
  const pnlPercentage = holding.totalInvested > 0 ? ((holding.unrealizedPnl + holding.realizedPnl) / holding.totalInvested) * 100 : 0

  return (
    <Card className="quantum-card hover:quantum-glow transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={holding.token?.logoUrl} alt={holding.token?.name} />
              <AvatarFallback className="quantum-gradient text-white">
                {holding.token?.symbol?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center gap-2">
                {holding.token?.name}
                <Badge variant="secondary" className="text-xs">
                  {holding.token?.symbol}
                </Badge>
                {holding.token?.isVerified && (
                  <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {hideBalances ? '••••••' : `${holding.balance.toLocaleString()} ${holding.token?.symbol}`}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-medium">
              {hideBalances ? '••••••' : `$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className={`text-sm flex items-center gap-1 justify-end ${pnlPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {pnlPercentage >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {hideBalances ? '••••' : `${pnlPercentage >= 0 ? '+' : ''}${pnlPercentage.toFixed(2)}%`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Avg. Buy Price</div>
            <div className="text-sm font-medium">
              {hideBalances ? '••••' : `$${holding.avgBuyPrice.toFixed(4)}`}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Current Price</div>
            <div className="text-sm font-medium">
              ${holding.token?.price.toFixed(4)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">24h Change</div>
            <div className={`text-sm font-medium ${
              (holding.token?.priceChange24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {(holding.token?.priceChange24h || 0) >= 0 ? '+' : ''}{holding.token?.priceChange24h?.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}