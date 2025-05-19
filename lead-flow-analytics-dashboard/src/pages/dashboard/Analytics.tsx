
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

// Mock data for charts
const dailyLeadsData = [
  { name: "Mon", leads: 65, qualified: 40 },
  { name: "Tue", leads: 59, qualified: 35 },
  { name: "Wed", leads: 80, qualified: 50 },
  { name: "Thu", leads: 81, qualified: 55 },
  { name: "Fri", leads: 56, qualified: 32 },
  { name: "Sat", leads: 40, qualified: 28 },
  { name: "Sun", leads: 35, qualified: 20 },
];

const monthlyLeadsData = [
  { name: "Jan", leads: 650, qualified: 400, conversion: 62 },
  { name: "Feb", leads: 730, qualified: 440, conversion: 60 },
  { name: "Mar", leads: 800, qualified: 500, conversion: 63 },
  { name: "Apr", leads: 720, qualified: 390, conversion: 54 },
  { name: "May", leads: 810, qualified: 510, conversion: 63 },
  { name: "Jun", leads: 950, qualified: 610, conversion: 64 },
  { name: "Jul", leads: 1020, qualified: 680, conversion: 67 },
  { name: "Aug", leads: 980, qualified: 650, conversion: 66 },
  { name: "Sep", leads: 860, qualified: 530, conversion: 62 },
  { name: "Oct", leads: 880, qualified: 570, conversion: 65 },
  { name: "Nov", leads: 920, qualified: 600, conversion: 65 },
  { name: "Dec", leads: 970, qualified: 640, conversion: 66 },
];

const leadSourceData = [
  { name: "Facebook", value: 400, color: "#4267B2" },
  { name: "Email", value: 300, color: "#EA4335" },
  { name: "Twitter", value: 200, color: "#1DA1F2" },
  { name: "Phone", value: 120, color: "#25D366" },
  { name: "Website", value: 180, color: "#6366F1" },
];

const leadQualityData = [
  { name: "90+", leads: 50 },
  { name: "80-89", leads: 80 },
  { name: "70-79", leads: 110 },
  { name: "60-69", leads: 95 },
  { name: "50-59", leads: 70 },
  { name: "< 50", leads: 60 },
];

const conversionData = [
  { name: "Week 1", rate: 12 },
  { name: "Week 2", rate: 13 },
  { name: "Week 3", rate: 11 },
  { name: "Week 4", rate: 14 },
  { name: "Week 5", rate: 16 },
  { name: "Week 6", rate: 15 },
  { name: "Week 7", rate: 17 },
  { name: "Week 8", rate: 18 },
  { name: "Week 9", rate: 19 },
  { name: "Week 10", rate: 20 },
  { name: "Week 11", rate: 21 },
  { name: "Week 12", rate: 22 },
];

const campaignPerformanceData = [
  { name: "Summer Sale", leads: 120, qualified: 85, cpl: 12 },
  { name: "Product Launch", leads: 98, qualified: 62, cpl: 18 },
  { name: "Holiday Promo", leads: 86, qualified: 55, cpl: 15 },
  { name: "Retargeting", leads: 72, qualified: 48, cpl: 9 },
];

const funnelData = [
  { name: "Visits", value: 15000 },
  { name: "Leads", value: 3000 },
  { name: "Qualified", value: 1200 },
  { name: "Proposals", value: 600 },
  { name: "Sales", value: 300 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  
  // Calculate some derived metrics
  const totalLeads = monthlyLeadsData.reduce((sum, item) => sum + item.leads, 0);
  const totalQualified = monthlyLeadsData.reduce((sum, item) => sum + item.qualified, 0);
  const averageConversion = Math.round((totalQualified / totalLeads) * 100);
  
  const COLORS = leadSourceData.map(source => source.color);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">In-depth performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview metrics */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs text-green-600">↑ 12.5% vs previous period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Qualified Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalQualified.toLocaleString()}</div>
                <p className="text-xs text-green-600">↑ 8.2% vs previous period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{averageConversion}%</div>
                <p className="text-xs text-red-600">↓ 2.1% vs previous period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Cost per Lead</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$14.32</div>
                <p className="text-xs text-green-600">↓ 5.4% vs previous period</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts row 1 */}
          <div className="grid gap-4 md:grid-cols-7">
            {/* Line chart */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Lead Generation Trend</CardTitle>
                <CardDescription>Total vs. qualified leads over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={monthlyLeadsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stackId="1"
                      stroke="#6366F1"
                      fill="url(#colorLeads)"
                      strokeWidth={2}
                      name="Total Leads"
                    />
                    <Area
                      type="monotone"
                      dataKey="qualified"
                      stackId="2"
                      stroke="#10B981"
                      fill="url(#colorQualified)"
                      strokeWidth={2}
                      name="Qualified Leads"
                    />
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie chart */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Distribution by channel</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      labelLine={false}
                      label={false}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  {leadSourceData.map((source) => (
                    <div key={source.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <span className="text-sm font-medium">{source.name}</span>
                      <span className="ml-auto text-sm text-gray-500">{Math.round((source.value / totalLeads) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Charts row 2 */}
          <div className="grid gap-4 md:grid-cols-12">
            <Card className="md:col-span-6">
              <CardHeader>
                <CardTitle>Conversion Rate Trend</CardTitle>
                <CardDescription>Weekly conversion rate percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={conversionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip 
                      formatter={(value) => [`${value}%`, 'Conversion Rate']}
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-6">
              <CardHeader>
                <CardTitle>Lead Quality Distribution</CardTitle>
                <CardDescription>Number of leads by score range</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={leadQualityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip 
                      cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="leads" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Top campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>Campaigns with the best lead generation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="[&_th]:py-3 [&_th]:px-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-gray-500 border-b">
                      <th>Campaign</th>
                      <th>Total Leads</th>
                      <th>Qualified Leads</th>
                      <th>Conversion Rate</th>
                      <th>Cost Per Lead</th>
                    </tr>
                  </thead>
                  <tbody className="[&_td]:py-3 [&_td]:px-4">
                    {campaignPerformanceData.map((campaign, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="font-medium">{campaign.name}</td>
                        <td>{campaign.leads}</td>
                        <td>{campaign.qualified}</td>
                        <td>{Math.round((campaign.qualified / campaign.leads) * 100)}%</td>
                        <td>${campaign.cpl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          {/* Lead trend charts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Lead Performance</CardTitle>
                  <CardDescription>Tracking lead generation and qualification by day</CardDescription>
                </div>
                <Select defaultValue="week">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={dailyLeadsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                    contentStyle={{ 
                      background: '#fff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="leads" name="Total Leads" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="qualified" name="Qualified Leads" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Lead source comparison */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Quality by Source</CardTitle>
                <CardDescription>Average lead score by acquisition channel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Facebook", score: 72 },
                      { name: "Email", score: 85 },
                      { name: "Twitter", score: 65 },
                      { name: "Phone", score: 91 },
                      { name: "Website", score: 78 },
                    ]}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <RechartsTooltip 
                      formatter={(value) => [`${value}/100`, 'Average Score']}
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="score" fill="#8B5CF6" radius={[0, 4, 4, 0]}>
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Volume by Time of Day</CardTitle>
                <CardDescription>When leads are most frequently generated</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { hour: "12 AM", leads: 15 },
                      { hour: "3 AM", leads: 8 },
                      { hour: "6 AM", leads: 10 },
                      { hour: "9 AM", leads: 45 },
                      { hour: "12 PM", leads: 60 },
                      { hour: "3 PM", leads: 75 },
                      { hour: "6 PM", leads: 52 },
                      { hour: "9 PM", leads: 30 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <RechartsTooltip 
                      formatter={(value) => [value, 'Leads']}
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <defs>
                      <linearGradient id="colorHourLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaign performance chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Performance Comparison</CardTitle>
                  <CardDescription>Leads generated, qualification, and cost per lead</CardDescription>
                </div>
                <Select defaultValue="quarter">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={campaignPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip 
                    contentStyle={{ 
                      background: '#fff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => {
                      if (name === 'leads') return [value, 'Total Leads'];
                      if (name === 'qualified') return [value, 'Qualified Leads'];
                      if (name === 'cpl') return [`$${value}`, 'Cost per Lead'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="leads" name="Total Leads" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="qualified" name="Qualified Leads" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cpl"
                    name="Cost per Lead ($)"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Campaign ROI chart */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign ROI Analysis</CardTitle>
              <CardDescription>Cost efficiency and return on investment metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Summer Sale", roi: 325, cpl: 12, budget: 5000 },
                    { name: "Product Launch", roi: 280, cpl: 18, budget: 3000 },
                    { name: "Holiday Promo", roi: 210, cpl: 15, budget: 7500 },
                    { name: "Retargeting", roi: 410, cpl: 9, budget: 2500 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <RechartsTooltip 
                    contentStyle={{ 
                      background: '#fff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => {
                      if (name === 'roi') return [`${value}%`, 'ROI'];
                      if (name === 'cpl') return [`$${value}`, 'Cost per Lead'];
                      if (name === 'budget') return [`$${value.toLocaleString()}`, 'Budget'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="roi" name="ROI %" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cpl"
                    name="Cost per Lead ($)"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Conversion Funnel Analysis</CardTitle>
                  <CardDescription>Tracking user journey from visitor to customer</CardDescription>
                </div>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mx-auto max-w-3xl">
                <div className="space-y-8">
                  {funnelData.map((stage, index) => {
                    const nextStage = funnelData[index + 1];
                    const conversionPercent = nextStage
                      ? Math.round((nextStage.value / stage.value) * 100)
                      : null;
                    const width = 100 - (index * (100 / funnelData.length));
                    
                    return (
                      <div key={stage.name} className="relative">
                        <div 
                          className="h-16 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center text-center"
                          style={{ width: `${width}%`, margin: "0 auto" }}
                        >
                          <div>
                            <div className="font-medium">{stage.name}</div>
                            <div className="text-sm text-gray-500">{stage.value.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        {conversionPercent !== null && (
                          <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 flex flex-col items-center">
                            <div className="h-4 w-0.5 bg-gray-300"></div>
                            <div className="text-xs text-gray-500 font-medium bg-white px-2 py-0.5 rounded-full border mt-1">
                              {conversionPercent}% conversion
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-16">
                  <h3 className="text-lg font-medium mb-4">Funnel Metrics</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-500">Visit-to-Lead</div>
                      <div className="text-2xl font-bold">{Math.round((funnelData[1].value / funnelData[0].value) * 100)}%</div>
                      <div className="text-xs text-green-600">↑ 2.5% vs previous period</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-500">Lead-to-Qualified</div>
                      <div className="text-2xl font-bold">{Math.round((funnelData[2].value / funnelData[1].value) * 100)}%</div>
                      <div className="text-xs text-green-600">↑ 4.2% vs previous period</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-500">Qualified-to-Sale</div>
                      <div className="text-2xl font-bold">{Math.round((funnelData[4].value / funnelData[2].value) * 100)}%</div>
                      <div className="text-xs text-red-600">↓ 1.8% vs previous period</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between pt-6">
              <div className="text-sm text-gray-500">
                Overall conversion: <span className="font-bold">{Math.round((funnelData[4].value / funnelData[0].value) * 100)}%</span> from visitor to customer
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Compare Periods
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
