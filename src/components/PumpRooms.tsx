import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Target, MessageCircle, Share2, Plus, Crown, Zap, DollarSign, Clock, Fire } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { mockPumpRooms, mockTokens } from '../data/mockData'
import type { PumpRoom } from '../types'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export function PumpRooms() {
  const { user, isAuthenticated } = useAuth()
  const [rooms, setRooms] = useState<PumpRoom[]>(mockPumpRooms)
  const [selectedRoom, setSelectedRoom] = useState<PumpRoom | null>(null)
  const [filter, setFilter] = useState<'all' | 'trending' | 'new' | 'joined'>('all')

  const filteredRooms = rooms.filter(room => {
    switch (filter) {
      case 'trending':
        return room.memberCount > 500
      case 'new':
        return new Date(room.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      case 'joined':
        return false // Would check if user is member
      default:
        return true
    }
  })

  const handleJoinRoom = async (roomId: string) => {
    if (!isAuthenticated) {
      toast.error('Please connect your wallet to join rooms')
      return
    }

    try {
      // Simulate joining room
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setRooms(prev => prev.map(room => 
        room.id === roomId 
          ? { ...room, memberCount: room.memberCount + 1 }
          : room
      ))
      
      toast.success('Successfully joined the pump room! 🎉')
    } catch (error) {
      toast.error('Failed to join room. Please try again.')
    }
  }

  const handleInvest = async (roomId: string, amount: number) => {
    if (!isAuthenticated) {
      toast.error('Please connect your wallet to invest')
      return
    }

    try {
      // Simulate investment
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setRooms(prev => prev.map(room => 
        room.id === roomId 
          ? { ...room, totalInvested: room.totalInvested + amount }
          : room
      ))
      
      toast.success(`Successfully invested $${amount}! 🚀`)
    } catch (error) {
      toast.error('Investment failed. Please try again.')
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
          <h1 className="text-3xl font-bold quantum-text-gradient">Pump Rooms</h1>
          <p className="text-muted-foreground">
            Join social trading communities and coordinate investments
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <CreateRoomDialog />
          <Badge variant="secondary" className="bg-green-500/10 text-green-400">
            <Users className="w-3 h-3 mr-1" />
            {rooms.reduce((sum, room) => sum + room.memberCount, 0).toLocaleString()} Active Members
          </Badge>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        className="flex gap-2 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {[
          { id: 'all', label: 'All Rooms', icon: Users },
          { id: 'trending', label: 'Trending', icon: Fire },
          { id: 'new', label: 'New', icon: Zap },
          { id: 'joined', label: 'Joined', icon: Crown }
        ].map((filterOption) => {
          const Icon = filterOption.icon
          return (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? 'default' : 'outline'}
              onClick={() => setFilter(filterOption.id as any)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              {filterOption.label}
            </Button>
          )
        })}
      </motion.div>

      {/* Rooms Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PumpRoomCard 
              room={room} 
              onJoin={() => handleJoinRoom(room.id)}
              onInvest={(amount) => handleInvest(room.id, amount)}
              onViewDetails={() => setSelectedRoom(room)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <RoomDetailsModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)}
          onInvest={(amount) => handleInvest(selectedRoom.id, amount)}
        />
      )}
    </div>
  )
}

function PumpRoomCard({ 
  room, 
  onJoin, 
  onInvest, 
  onViewDetails 
}: { 
  room: PumpRoom
  onJoin: () => void
  onInvest: (amount: number) => void
  onViewDetails: () => void
}) {
  const [investAmount, setInvestAmount] = useState('')
  const [isInvesting, setIsInvesting] = useState(false)
  
  const progressPercentage = (room.totalInvested / room.targetAmount) * 100
  const timeLeft = Math.floor(Math.random() * 7) + 1 // Mock time left in days

  const handleInvest = async () => {
    const amount = parseFloat(investAmount)
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid investment amount')
      return
    }

    setIsInvesting(true)
    try {
      await onInvest(amount)
      setInvestAmount('')
    } finally {
      setIsInvesting(false)
    }
  }

  return (
    <Card className="quantum-card hover:quantum-glow transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={room.imageUrl} alt={room.name} />
                <AvatarFallback className="quantum-gradient text-white">
                  {room.token?.symbol?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {room.token?.isVerified && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Crown className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-lg group-hover:quantum-text-gradient transition-all">
                {room.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {room.token?.symbol}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {room.memberCount}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewDetails}>
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {room.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${room.totalInvested.toLocaleString()} raised</span>
            <span>${room.targetAmount.toLocaleString()} target</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 border rounded-lg">
            <div className="text-sm font-medium text-green-400">
              +{((Math.random() * 20) + 5).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">24h Change</div>
          </div>
          <div className="text-center p-2 border rounded-lg">
            <div className="text-sm font-medium flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              {timeLeft}d
            </div>
            <div className="text-xs text-muted-foreground">Time Left</div>
          </div>
        </div>

        {/* Investment Input */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount (USDT)"
              value={investAmount}
              onChange={(e) => setInvestAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleInvest}
              disabled={isInvesting || !investAmount}
              className="quantum-button"
            >
              {isInvesting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <DollarSign className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onJoin} className="flex-1">
              <Users className="w-3 h-3 mr-1" />
              Join
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CreateRoomDialog() {
  const { isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tokenId: '',
    targetAmount: '',
    imageUrl: ''
  })
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async () => {
    if (!isAuthenticated) {
      toast.error('Please connect your wallet to create a room')
      return
    }

    if (!formData.name || !formData.tokenId || !formData.targetAmount) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsCreating(true)
    try {
      // Simulate room creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Pump room created successfully! 🎉')
      setIsOpen(false)
      setFormData({
        name: '',
        description: '',
        tokenId: '',
        targetAmount: '',
        imageUrl: ''
      })
    } catch (error) {
      toast.error('Failed to create room. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="quantum-button">
          <Plus className="w-4 h-4 mr-2" />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Pump Room</DialogTitle>
          <DialogDescription>
            Start a social trading community for your favorite token
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="room-name">Room Name *</Label>
            <Input
              id="room-name"
              placeholder="e.g., ATOM to the Moon 🚀"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="token-select">Select Token *</Label>
            <select
              id="token-select"
              className="w-full p-2 border rounded-lg bg-background"
              value={formData.tokenId}
              onChange={(e) => setFormData(prev => ({ ...prev, tokenId: e.target.value }))}
            >
              <option value="">Choose a token...</option>
              {mockTokens.map(token => (
                <option key={token.id} value={token.id}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="target-amount">Target Amount (USDT) *</Label>
            <Input
              id="target-amount"
              type="number"
              placeholder="100000"
              value={formData.targetAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your pump room strategy..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <Button
            onClick={handleCreate}
            disabled={isCreating}
            className="w-full quantum-button"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating Room...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Create Room
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RoomDetailsModal({ 
  room, 
  onClose, 
  onInvest 
}: { 
  room: PumpRoom
  onClose: () => void
  onInvest: (amount: number) => void
}) {
  const [investAmount, setInvestAmount] = useState('')
  const [isInvesting, setIsInvesting] = useState(false)

  const handleInvest = async () => {
    const amount = parseFloat(investAmount)
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid investment amount')
      return
    }

    setIsInvesting(true)
    try {
      await onInvest(amount)
      setInvestAmount('')
      onClose()
    } finally {
      setIsInvesting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={room.imageUrl} alt={room.name} />
              <AvatarFallback className="quantum-gradient text-white">
                {room.token?.symbol?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{room.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Badge variant="secondary">{room.token?.symbol}</Badge>
                <Badge variant="outline">
                  <Users className="w-3 h-3 mr-1" />
                  {room.memberCount} members
                </Badge>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">{room.description}</p>
          
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Investment Progress</span>
              <span className="text-sm text-muted-foreground">
                {((room.totalInvested / room.targetAmount) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(room.totalInvested / room.targetAmount) * 100} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${room.totalInvested.toLocaleString()} raised</span>
              <span>${room.targetAmount.toLocaleString()} target</span>
            </div>
          </div>
          
          {/* Investment Input */}
          <div className="space-y-3">
            <Label htmlFor="invest-amount">Investment Amount (USDT)</Label>
            <div className="flex gap-2">
              <Input
                id="invest-amount"
                type="number"
                placeholder="Enter amount..."
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleInvest}
                disabled={isInvesting || !investAmount}
                className="quantum-button"
              >
                {isInvesting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Invest
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex gap-2">
              {[100, 500, 1000, 5000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setInvestAmount(amount.toString())}
                  className="flex-1"
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Token Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="font-medium">${room.token?.price.toFixed(4)}</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">24h Change</div>
              <div className={`font-medium ${
                (room.token?.priceChange24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {(room.token?.priceChange24h || 0) >= 0 ? '+' : ''}{room.token?.priceChange24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}