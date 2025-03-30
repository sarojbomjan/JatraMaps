import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Plus,
} from "lucide-react";


const AdminDashboardOverview = () => {

    const [timeRange, setTimeRange] = useState("month");

  return (
    <div>
      <div className='m-6 flex justify-between items-center'>
        <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Admin Dashboard</h1>
            <p className='text-gray-600 dark:text-gray-400'>Welcome back</p>
        </div>
        
      <div className='flex items-center space-x-2'>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
        </select>
      </div>
    </div>


    </div>
  )
}

export default AdminDashboardOverview
