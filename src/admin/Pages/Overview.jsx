import { useEffect, useState } from 'react'
import StatsCard from '../Components/StatsCard'

function Overview() {
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then(res => res.json())
      .then(data => {
        if (data.totalOrders !== undefined)   setTotalOrders(data.totalOrders)
        if (data.totalProducts !== undefined) setTotalProducts(data.totalProducts)
        if (data.totalUsers !== undefined)    setTotalUsers(data.totalUsers)
      })
      .catch(err => console.log(err))

    fetch("http://localhost:5000/api/revenue")
      .then(res => res.json())
      .then(data => {
        if (data.totalRevenue !== undefined) setTotalRevenue(data.totalRevenue)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <div className="grid grid-cols-2 gap-6">
        <StatsCard title="Total Revenue" value={`$${Number(totalRevenue).toFixed(2)}`} />
        <StatsCard title="Total Orders" value={`${Number(totalOrders)}`} />
        <StatsCard title="Total Products" value={`${Number(totalProducts)}`} />
        <StatsCard title="Total Users" value={`${Number(totalUsers)}`} />
      </div>
    </div>
  )
}

export default Overview