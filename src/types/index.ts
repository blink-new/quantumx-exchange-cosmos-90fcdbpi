// Core Types for QuantumX.Exchange

export interface User {
  id: string
  email: string
  displayName?: string
  walletAddress?: string
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Token {
  id: string
  name: string
  symbol: string
  description: string
  logoUrl: string
  price: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  totalSupply: number
  circulatingSupply: number
  isVerified: boolean
  creatorId: string
  contractAddress: string
  blockchain: 'cosmos' | 'ethereum' | 'solana'
  createdAt: string
  updatedAt: string
  metadata?: {
    website?: string
    twitter?: string
    telegram?: string
    discord?: string
  }
}

export interface TokenCreationForm {
  name: string
  symbol: string
  description: string
  totalSupply: number
  logoUrl?: string
  website?: string
  twitter?: string
  telegram?: string
  burnRate?: number
  taxRate?: number
  lockPeriod?: number
  blockchain: 'cosmos' | 'ethereum' | 'solana'
}

export interface PumpRoom {
  id: string
  name: string
  description: string
  imageUrl: string
  tokenId: string
  token?: Token
  creatorId: string
  targetAmount: number
  totalInvested: number
  memberCount: number
  isActive: boolean
  endDate: string
  createdAt: string
  updatedAt: string
  tags: string[]
  socialLinks?: {
    telegram?: string
    discord?: string
    twitter?: string
  }
}

export interface UserPortfolio {
  id: string
  userId: string
  tokenId: string
  token?: Token
  balance: number
  avgBuyPrice: number
  totalInvested: number
  unrealizedPnl: number
  realizedPnl: number
  createdAt: string
  updatedAt: string
}

export interface Trade {
  id: string
  userId: string
  tokenId: string
  token?: Token
  type: 'buy' | 'sell'
  amount: number
  price: number
  total: number
  fee: number
  status: 'pending' | 'completed' | 'failed'
  txHash?: string
  createdAt: string
  updatedAt: string
}

export interface MarketData {
  tokenId: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  timestamp: string
}

export interface TradingPair {
  id: string
  baseToken: Token
  quoteToken: Token
  price: number
  priceChange24h: number
  volume24h: number
  high24h: number
  low24h: number
  liquidity: number
}

export interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

export interface OrderBook {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

export interface WalletConnection {
  address: string
  type: 'keplr' | 'metamask' | 'phantom' | 'cosmostation'
  isConnected: boolean
  balance: Record<string, number>
}

export interface AITradingSignal {
  id: string
  tokenId: string
  token?: Token
  type: 'buy' | 'sell' | 'hold'
  confidence: number
  reason: string
  targetPrice?: number
  stopLoss?: number
  timeframe: string
  createdAt: string
}

export interface QuantumTransaction {
  id: string
  hash: string
  from: string
  to: string
  amount: number
  tokenId: string
  type: 'transfer' | 'swap' | 'stake' | 'unstake'
  status: 'pending' | 'confirmed' | 'failed'
  quantumLayer: boolean
  processingTime: number
  fee: number
  blockHeight: number
  timestamp: string
}

export interface CrossChainBridge {
  id: string
  fromChain: 'cosmos' | 'ethereum' | 'solana'
  toChain: 'cosmos' | 'ethereum' | 'solana'
  tokenId: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  txHashFrom?: string
  txHashTo?: string
  fee: number
  estimatedTime: number
  createdAt: string
  updatedAt: string
}

export interface TrendingToken {
  token: Token
  rank: number
  scoreChange: number
  mentions: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  aiScore: number
}

export interface PumpRoomInvestment {
  id: string
  userId: string
  roomId: string
  amount: number
  timestamp: string
  txHash?: string
}

export interface NotificationSettings {
  priceAlerts: boolean
  pumpRoomUpdates: boolean
  tradingSignals: boolean
  portfolioUpdates: boolean
  email: boolean
  push: boolean
}

export interface UserSettings {
  id: string
  userId: string
  notifications: NotificationSettings
  defaultSlippage: number
  autoApprove: boolean
  darkMode: boolean
  language: string
  currency: string
  updatedAt: string
}