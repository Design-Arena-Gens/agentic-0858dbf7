import { Business } from '@/app/page';
import { TrendingUp, Building2, Mail, Eye, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  businesses: Business[];
}

export default function Dashboard({ businesses }: DashboardProps) {
  const stats = {
    totalAnalyzed: 248,
    withoutWebsite: businesses.length,
    emailsSent: businesses.filter(b => b.status !== 'not_contacted').length,
    responseRate: 24.5,
  };

  const statusCounts = {
    not_contacted: businesses.filter(b => b.status === 'not_contacted').length,
    email_sent: businesses.filter(b => b.status === 'email_sent').length,
    opened: businesses.filter(b => b.status === 'opened').length,
    replied: businesses.filter(b => b.status === 'replied').length,
    interested: businesses.filter(b => b.status === 'interested').length,
    not_interested: businesses.filter(b => b.status === 'not_interested').length,
  };

  const weeklyData = [
    { day: 'Mon', emails: 12, opens: 8, replies: 3 },
    { day: 'Tue', emails: 15, opens: 11, replies: 4 },
    { day: 'Wed', emails: 18, opens: 14, replies: 5 },
    { day: 'Thu', emails: 14, opens: 10, replies: 2 },
    { day: 'Fri', emails: 20, opens: 16, replies: 6 },
    { day: 'Sat', emails: 8, opens: 5, replies: 1 },
    { day: 'Sun', emails: 5, opens: 3, replies: 1 },
  ];

  const categoryData = [
    { name: 'Restaurant', value: 35, color: '#3b82f6' },
    { name: 'Retail', value: 28, color: '#8b5cf6' },
    { name: 'Services', value: 22, color: '#10b981' },
    { name: 'Auto', value: 15, color: '#f59e0b' },
  ];

  const statCards = [
    {
      title: 'Total Analyzed',
      value: stats.totalAnalyzed,
      change: '+12%',
      icon: Building2,
      color: 'bg-blue-500',
    },
    {
      title: 'Without Website',
      value: stats.withoutWebsite,
      change: '+8%',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      title: 'Emails Sent',
      value: stats.emailsSent,
      change: '+24%',
      icon: Mail,
      color: 'bg-green-500',
    },
    {
      title: 'Response Rate',
      value: `${stats.responseRate}%`,
      change: '+3.2%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-sm text-green-500 font-medium">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last week</span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon size={28} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="emails"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Emails Sent"
              />
              <Line
                type="monotone"
                dataKey="opens"
                stroke="#10b981"
                strokeWidth={2}
                name="Opens"
              />
              <Line
                type="monotone"
                dataKey="replies"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Replies"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Business Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Business Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) =>
                  `${props.name} ${(props.percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contact Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Contact Status Overview
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={[
              { status: 'Not Contacted', count: statusCounts.not_contacted },
              { status: 'Email Sent', count: statusCounts.email_sent },
              { status: 'Opened', count: statusCounts.opened },
              { status: 'Replied', count: statusCounts.replied },
              { status: 'Interested', count: statusCounts.interested },
              { status: 'Not Interested', count: statusCounts.not_interested },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="status" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {businesses.slice(0, 5).map((business) => (
            <div
              key={business.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{business.name}</h4>
                  <p className="text-sm text-gray-600">{business.category}</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    business.status === 'not_contacted'
                      ? 'bg-gray-100 text-gray-700'
                      : business.status === 'email_sent'
                      ? 'bg-blue-100 text-blue-700'
                      : business.status === 'opened'
                      ? 'bg-purple-100 text-purple-700'
                      : business.status === 'replied'
                      ? 'bg-green-100 text-green-700'
                      : business.status === 'interested'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {business.status.replace('_', ' ')}
                </span>
                {business.emailSentDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(business.emailSentDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
