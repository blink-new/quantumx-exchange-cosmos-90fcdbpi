import type { Token, PumpRoom, TradingPair, AITradingSignal, TrendingToken } from '../types'

// Mock Tokens Data
export const mockTokens: Token[] = [
  {
    id: 'atom',
    name: 'Cosmos Hub',
    symbol: 'ATOM',
    description: 'The native token of the Cosmos Hub, the first blockchain in the Cosmos ecosystem.',
    logoUrl: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    price: 8.45,
    priceChange24h: 5.2,
    priceChange7d: -2.1,
    marketCap: 3200000000,
    volume24h: 180000000,
    totalSupply: 390688369,
    circulatingSupply: 390688369,
    isVerified: true,
    creatorId: 'cosmos-team',
    contractAddress: 'cosmos1...',
    blockchain: 'cosmos',
    createdAt: '2019-03-13T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    metadata: {
      website: 'https://cosmos.network',
      twitter: 'https://twitter.com/cosmos',
      telegram: 'https://t.me/cosmosproject'
    }
  },
  {
    id: 'osmo',
    name: 'Osmosis',
    symbol: 'OSMO',
    description: 'The native token of Osmosis, an advanced AMM protocol built on Cosmos.',
    logoUrl: 'https://cryptologos.cc/logos/osmosis-osmo-logo.png',
    price: 0.805,
    priceChange24h: -3.8,
    priceChange7d: 8.5,
    marketCap: 850000000,
    volume24h: 45000000,
    totalSupply: 1000000000,
    circulatingSupply: 750000000,
    isVerified: true,
    creatorId: 'osmosis-team',
    contractAddress: 'osmo1...',
    blockchain: 'cosmos',
    createdAt: '2021-06-19T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    metadata: {
      website: 'https://osmosis.zone',
      twitter: 'https://twitter.com/osmosiszone'
    }
  },
  {
    id: 'juno',
    name: 'Juno Network',
    symbol: 'JUNO',
    description: 'A sovereign public blockchain in the Cosmos ecosystem focused on smart contracts.',
    logoUrl: 'https://cryptologos.cc/logos/juno-network-juno-logo.png',
    price: 0.32,
    priceChange24h: 12.7,
    priceChange7d: -5.3,
    marketCap: 320000000,
    volume24h: 15000000,
    totalSupply: 185562268,
    circulatingSupply: 185562268,
    isVerified: true,
    creatorId: 'juno-team',
    contractAddress: 'juno1...',
    blockchain: 'cosmos',
    createdAt: '2021-10-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    metadata: {
      website: 'https://junonetwork.io',
      twitter: 'https://twitter.com/JunoNetwork'
    }
  },
  {
    id: 'secret',
    name: 'Secret Network',
    symbol: 'SCRT',
    description: 'The first blockchain with customizable privacy for smart contracts.',
    logoUrl: 'https://cryptologos.cc/logos/secret-scrt-logo.png',
    price: 0.28,
    priceChange24h: 7.9,
    priceChange7d: 15.2,
    marketCap: 180000000,
    volume24h: 8500000,
    totalSupply: 190865386,
    circulatingSupply: 190865386,
    isVerified: true,
    creatorId: 'secret-team',
    contractAddress: 'secret1...',
    blockchain: 'cosmos',
    createdAt: '2020-02-13T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    metadata: {
      website: 'https://scrt.network',
      twitter: 'https://twitter.com/SecretNetwork'
    }
  },
  {
    id: 'akash',
    name: 'Akash Network',
    symbol: 'AKT',
    description: 'Decentralized cloud computing marketplace built on Cosmos.',
    logoUrl: 'https://cryptologos.cc/logos/akash-network-akt-logo.png',
    price: 2.15,
    priceChange24h: -1.5,
    priceChange7d: 22.8,
    marketCap: 420000000,
    volume24h: 12000000,
    totalSupply: 388539008,
    circulatingSupply: 388539008,
    isVerified: true,
    creatorId: 'akash-team',
    contractAddress: 'akash1...',
    blockchain: 'cosmos',
    createdAt: '2020-09-25T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    metadata: {
      website: 'https://akash.network',
      twitter: 'https://twitter.com/akashnet_'
    }
  },
  {
    id: 'luna-quantum',
    name: 'Luna Quantum',
    symbol: 'LUNAQ',
    description: 'Revolutionary quantum-powered DeFi token with AI trading capabilities.',
    logoUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop&crop=center',
    price: 0.0045,
    priceChange24h: 156.7,
    priceChange7d: 89.2,
    marketCap: 4500000,
    volume24h: 2800000,
    totalSupply: 1000000000,
    circulatingSupply: 850000000,
    isVerified: false,
    creatorId: 'quantum-dev',
    contractAddress: 'cosmos1quantum...',
    blockchain: 'cosmos',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    metadata: {
      website: 'https://lunaquantum.io',
      twitter: 'https://twitter.com/lunaquantum',
      telegram: 'https://t.me/lunaquantum'
    }
  }
]

// Mock Pump Rooms Data
export const mockPumpRooms: PumpRoom[] = [
  {
    id: 'room-1',
    name: 'ATOM to the Moon 🚀',
    description: 'Join us as we pump ATOM to new all-time highs! Strong fundamentals, great team, and massive potential in the Cosmos ecosystem.',
    imageUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop',
    tokenId: 'atom',
    token: mockTokens.find(t => t.id === 'atom'),
    creatorId: 'user-1',
    targetAmount: 100000,
    totalInvested: 67500,
    memberCount: 1247,
    isActive: true,
    endDate: '2024-02-15T00:00:00Z',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    tags: ['cosmos', 'defi', 'staking'],
    socialLinks: {
      telegram: 'https://t.me/atomtothemoon',
      discord: 'https://discord.gg/atomtothemoon'
    }
  },
  {
    id: 'room-2',
    name: 'Osmosis DeFi Revolution',
    description: 'The future of AMM is here! OSMO is revolutionizing DeFi on Cosmos. Join our community of believers and lets ride this wave together.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    tokenId: 'osmo',
    token: mockTokens.find(t => t.id === 'osmo'),
    creatorId: 'user-2',
    targetAmount: 250000,
    totalInvested: 89200,
    memberCount: 892,
    isActive: true,
    endDate: '2024-02-20T00:00:00Z',
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    tags: ['osmosis', 'amm', 'liquidity'],
    socialLinks: {
      telegram: 'https://t.me/osmosisdefi',
      twitter: 'https://twitter.com/osmosisdefi'
    }
  },
  {
    id: 'room-3',
    name: 'Luna Quantum Early Adopters',
    description: 'Get in early on the next 1000x gem! Luna Quantum combines AI and quantum computing for the ultimate DeFi experience.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    tokenId: 'luna-quantum',
    token: mockTokens.find(t => t.id === 'luna-quantum'),
    creatorId: 'user-3',
    targetAmount: 50000,
    totalInvested: 34750,
    memberCount: 2156,
    isActive: true,
    endDate: '2024-01-25T00:00:00Z',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    tags: ['quantum', 'ai', 'moonshot'],
    socialLinks: {
      telegram: 'https://t.me/lunaquantum',
      discord: 'https://discord.gg/lunaquantum',
      twitter: 'https://twitter.com/lunaquantum'
    }
  },
  {
    id: 'room-4',
    name: 'Secret Network Privacy Bulls',
    description: 'Privacy is the future! SCRT is leading the charge in private smart contracts. Join us as we accumulate for the next bull run.',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop',
    tokenId: 'secret',
    token: mockTokens.find(t => t.id === 'secret'),
    creatorId: 'user-4',
    targetAmount: 75000,
    totalInvested: 23400,
    memberCount: 567,
    isActive: true,
    endDate: '2024-02-10T00:00:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    tags: ['privacy', 'smart-contracts', 'secret'],
    socialLinks: {
      telegram: 'https://t.me/secretnetwork'
    }
  }
]

// Mock Trading Pairs
export const mockTradingPairs: TradingPair[] = [
  {
    id: 'atom-usdt',
    baseToken: mockTokens[0],
    quoteToken: {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      description: 'Stablecoin pegged to USD',
      logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      price: 1.00,
      priceChange24h: 0.01,
      priceChange7d: 0.02,
      marketCap: 95000000000,
      volume24h: 25000000000,
      totalSupply: 95000000000,
      circulatingSupply: 95000000000,
      isVerified: true,
      creatorId: 'tether',
      contractAddress: 'usdt1...',
      blockchain: 'ethereum',
      createdAt: '2014-10-06T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    price: 8.45,
    priceChange24h: 5.2,
    volume24h: 180000000,
    high24h: 8.67,
    low24h: 7.98,
    liquidity: 45000000
  },
  {
    id: 'osmo-usdt',
    baseToken: mockTokens[1],
    quoteToken: {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      description: 'Stablecoin pegged to USD',
      logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      price: 1.00,
      priceChange24h: 0.01,
      priceChange7d: 0.02,
      marketCap: 95000000000,
      volume24h: 25000000000,
      totalSupply: 95000000000,
      circulatingSupply: 95000000000,
      isVerified: true,
      creatorId: 'tether',
      contractAddress: 'usdt1...',
      blockchain: 'ethereum',
      createdAt: '2014-10-06T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    price: 0.805,
    priceChange24h: -3.8,
    volume24h: 45000000,
    high24h: 0.847,
    low24h: 0.782,
    liquidity: 12000000
  }
]

// Mock AI Trading Signals
export const mockAISignals: AITradingSignal[] = [
  {
    id: 'signal-1',
    tokenId: 'atom',
    token: mockTokens[0],
    type: 'buy',
    confidence: 87,
    reason: 'Strong bullish momentum detected with increasing volume and positive sentiment analysis',
    targetPrice: 9.20,
    stopLoss: 7.80,
    timeframe: '1-3 days',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'signal-2',
    tokenId: 'luna-quantum',
    token: mockTokens[5],
    type: 'buy',
    confidence: 94,
    reason: 'Quantum AI analysis shows massive accumulation by smart money. Technical breakout imminent.',
    targetPrice: 0.0089,
    stopLoss: 0.0035,
    timeframe: '2-5 days',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 'signal-3',
    tokenId: 'osmo',
    token: mockTokens[1],
    type: 'hold',
    confidence: 72,
    reason: 'Consolidation phase detected. Wait for clear direction before entering new positions.',
    timeframe: '1-2 weeks',
    createdAt: '2024-01-15T08:45:00Z'
  }
]

// Mock Trending Tokens
export const mockTrendingTokens: TrendingToken[] = [
  {
    token: mockTokens[5], // Luna Quantum
    rank: 1,
    scoreChange: 45,
    mentions: 2847,
    sentiment: 'bullish',
    aiScore: 94
  },
  {
    token: mockTokens[0], // ATOM
    rank: 2,
    scoreChange: 23,
    mentions: 1956,
    sentiment: 'bullish',
    aiScore: 87
  },
  {
    token: mockTokens[3], // Secret
    rank: 3,
    scoreChange: 18,
    mentions: 1234,
    sentiment: 'bullish',
    aiScore: 79
  },
  {
    token: mockTokens[4], // Akash
    rank: 4,
    scoreChange: 12,
    mentions: 987,
    sentiment: 'neutral',
    aiScore: 68
  },
  {
    token: mockTokens[1], // OSMO
    rank: 5,
    scoreChange: -8,
    mentions: 756,
    sentiment: 'neutral',
    aiScore: 62
  }
]