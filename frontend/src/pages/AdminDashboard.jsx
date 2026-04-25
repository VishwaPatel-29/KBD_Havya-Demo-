import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
  Avatar,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  DirectionsBus,
  People,
  Analytics,
  Notifications,
  Add,
  Edit,
  Delete,
  TrendingUp,
  Wallet,
  Route,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { selectTheme } from '../features/uiSlice'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import LottieLoader from '../components/LottieLoader'

const AdminDashboard = () => {
  const theme = useSelector(selectTheme)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRides: 0,
    activeVehicles: 0,
    pendingRequests: 0,
    revenue: 0,
    activeUsers: 0,
    todayRides: 0,
  })
  const [vehicles, setVehicles] = useState([])
  const [users, setUsers] = useState([])
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStats({
          totalRides: 1234,
          activeVehicles: 24,
          pendingRequests: 5,
          revenue: 45678,
          activeUsers: 892,
          todayRides: 47,
        })
        setVehicles(sampleVehicles)
        setUsers(sampleUsers)
      } catch (error) {
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Today\'s Rides', value: stats.todayRides, icon: DirectionsBus, color: '#00B4B4' },
    { label: 'Active Vehicles', value: stats.activeVehicles, icon: DirectionsBus, color: '#FFB6C1' },
    { label: 'Pending Requests', value: stats.pendingRequests, icon: Route, color: '#C2185B' },
    { label: 'Revenue', value: `$${stats.revenue}`, icon: Wallet, color: '#4caf50' },
  ]

  const sampleVehicles = [
    { _id: '1', name: 'Van 001', plate: 'ABC-1234', capacity: 6, status: 'active', driver: 'John Smith' },
    { _id: '2', name: 'Van 002', plate: 'DEF-5678', capacity: 6, status: 'active', driver: 'Jane Doe' },
    { _id: '3', name: 'Van 003', plate: 'GHI-9012', capacity: 6, status: 'maintenance', driver: null },
  ]

  const sampleUsers = [
    { _id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'employee', status: 'active' },
    { _id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'driver', status: 'active' },
    { _id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'employee', status: 'active' },
  ]

  const handleAddVehicle = () => {
    setSelectedVehicle(null)
    setVehicleDialogOpen(true)
  }

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    setVehicleDialogOpen(true)
  }

  const handleDeleteVehicle = (vehicleId) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v._id !== vehicleId))
      toast.success('Vehicle deleted successfully')
    }
  }

  const handleSaveVehicle = () => {
    toast.success(selectedVehicle ? 'Vehicle updated' : 'Vehicle added')
    setVehicleDialogOpen(false)
  }

  const getStatusColor = (status) => {
    const colors = {
      active: '#4caf50',
      maintenance: '#ff9800',
      inactive: '#9e9e9e',
      employee: '#00B4B4',
      driver: '#FFB6C1',
      admin: '#C2185B',
    }
    return colors[status] || '#666'
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LottieLoader height={100} width={100} />
      </Box>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | KBD-Havya</title>
      </Helmet>

      <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#000' : '#f5f5f5' }}>
        <Navbar />
        <Box sx={{ display: 'flex', pt: 8 }}>
          <Sidebar open={true} />

          <Box
            component={motion.main}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            sx={{ flex: 1, p: { xs: 2, md: 4 }, ml: 280 }}
          >
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
              Admin Dashboard
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statCards.map((stat) => (
                <Grid item xs={6} md={3} key={stat.label}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#666' }}>
                            {stat.label}
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                            {stat.value}
                          </Typography>
                        </Box>
                        <stat.icon sx={{ fontSize: 32, color: stat.color, opacity: 0.5 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['Vehicles', 'Users', 'Analytics'].map((tab, index) => (
                  <Button
                    key={tab}
                    variant={activeTab === index ? 'contained' : 'text'}
                    onClick={() => setActiveTab(index)}
                    startIcon={index === 0 ? <DirectionsBus /> : index === 1 ? <People /> : <Analytics />}
                  >
                    {tab}
                  </Button>
                ))}
              </Box>
            </Box>

            {activeTab === 0 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Vehicle Management
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleAddVehicle}
                      sx={{ background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' }}
                    >
                      Add Vehicle
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Vehicle</TableCell>
                          <TableCell>Plate</TableCell>
                          <TableCell>Capacity</TableCell>
                          <TableCell>Driver</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {vehicles.map((vehicle) => (
                          <TableRow key={vehicle._id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DirectionsBus sx={{ color: '#00B4B4' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {vehicle.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{vehicle.plate}</TableCell>
                            <TableCell>{vehicle.capacity} seats</TableCell>
                            <TableCell>{vehicle.driver || 'Not assigned'}</TableCell>
                            <TableCell>
                              <Chip
                                label={vehicle.status}
                                size="small"
                                sx={{
                                  background: `${getStatusColor(vehicle.status)}20`,
                                  color: getStatusColor(vehicle.status),
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton size="small" onClick={() => handleEditVehicle(vehicle)}>
                                <Edit />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteVehicle(vehicle._id)}>
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {activeTab === 1 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      User Management
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      sx={{ background: 'linear-gradient(135deg, #00B4B4 0%, #008080 100%)' }}
                    >
                      Add User
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#00B4B4' }}>
                                  {user.name.charAt(0)}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {user.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Chip
                                label={user.role}
                                size="small"
                                sx={{
                                  background: `${getStatusColor(user.role)}20`,
                                  color: getStatusColor(user.role),
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.status}
                                size="small"
                                sx={{
                                  background: `${getStatusColor(user.status)}20`,
                                  color: getStatusColor(user.status),
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton size="small">
                                <Edit />
                              </IconButton>
                              <IconButton size="small">
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {activeTab === 2 && (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <Analytics sx={{ fontSize: 64, color: '#333', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    Analytics coming soon
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Detailed analytics and reporting features
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>

        <Dialog open={vehicleDialogOpen} onClose={() => setVehicleDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField label="Vehicle Name" defaultValue={selectedVehicle?.name} />
              <TextField label="Plate Number" defaultValue={selectedVehicle?.plate} />
              <TextField select label="Capacity" defaultValue={selectedVehicle?.capacity}>
                {[4, 6, 8, 12].map(n => <MenuItem key={n} value={n}>{n} seats</MenuItem>)}
              </TextField>
              <TextField select label="Status" defaultValue={selectedVehicle?.status || 'active'}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVehicleDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveVehicle}>
              {selectedVehicle ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}

export default AdminDashboard