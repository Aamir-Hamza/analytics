import React, { useEffect, useState } from "react";
import { 
  ArrowDownRight, ArrowUpRight, DollarSign, Users, Target, Briefcase, 
  ArrowRight, Facebook, Mail, Twitter, Phone, Globe, ChevronDown 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getApiUrl } from '@/lib/api';

// Fetch leads and campaigns from the backend
const fetchLeads = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getApiUrl('/api/leads'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

const fetchCampaigns = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(getApiUrl('/api/campaigns'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
};

const leadsOverTime = [
  { date: "Jan", leads: 65, qualified: 40 },
  { date: "Feb", leads: 78, qualified: 52 },
  { date: "Mar", leads: 90, qualified: 60 },
  { date: "Apr", leads: 81, qualified: 45 },
  { date: "May", leads: 95, qualified: 70 },
  { date: "Jun", leads: 110, qualified: 85 },
  { date: "Jul", leads: 120, qualified: 90 },
];

const leadsBySource = [
  { name: "Facebook", value: 400, color: "#4267B2" },
  { name: "Email", value: 300, color: "#EA4335" },
  { name: "Twitter", value: 200, color: "#1DA1F2" },
  { name: "Phone", value: 120, color: "#25D366" },
  { name: "Website", value: 180, color: "#6366F1" },
];

const campaignPerformance = [
  { name: "Summer Sale", leads: 120, conversion: 65, cpl: 12 },
  { name: "Product Launch", leads: 98, conversion: 52, cpl: 18 },
  { name: "Holiday Promo", leads: 86, conversion: 45, cpl: 15 },
  { name: "Retargeting", leads: 72, conversion: 48, cpl: 9 },
];

const recentLeads = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", source: "Facebook", score: 85, status: "Qualified" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", source: "Email", score: 65, status: "Pending" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", source: "Website", score: 92, status: "Qualified" },
  { id: 4, name: "Dave Wilson", email: "dave@example.com", source: "Twitter", score: 45, status: "Unqualified" },
  { id: 5, name: "Eve Brown", email: "eve@example.com", source: "Phone", score: 78, status: "Qualified" },
];

const getLeadSourceIcon = (source: string) => {
  switch (source) {
    case "Facebook":
      return <Facebook className="h-4 w-4 text-[#4267B2]" />;
    case "Email":
      return <Mail className="h-4 w-4 text-[#EA4335]" />;
    case "Twitter":
      return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
    case "Phone":
      return <Phone className="h-4 w-4 text-[#25D366]" />;
    default:
      return <Globe className="h-4 w-4 text-[#6366F1]" />;
  }
};

const getLeadStatusBadge = (status: string) => {
  switch (status) {
    case "Qualified":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case "Unqualified":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
    default:
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>;
  }
};

const DashboardHome = () => {
  const isMobile = useIsMobile();
  const [leads, setLeads] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const leadsData = await fetchLeads();
      const campaignsData = await fetchCampaigns();
      setLeads(leadsData.leads || []);
      setCampaigns(campaignsData.campaigns || []);
    };
    loadData();
  }, []);
  
  const COLORS = leadsBySource.map(source => source.color);

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'Qualified').length;
  const conversionRate = Math.round((qualifiedLeads / totalLeads) * 100);
  
  // Calculate month-over-month change
  const currentMonthLeads = leads.filter(lead => new Date(lead.createdAt).getMonth() === new Date().getMonth()).length;
  const previousMonthLeads = leads.filter(lead => new Date(lead.createdAt).getMonth() === new Date().getMonth() - 1).length;
  const leadsChange = Math.round(((currentMonthLeads - previousMonthLeads) / previousMonthLeads) * 100);
  
  const currentMonthQualified = leads.filter(lead => new Date(lead.createdAt).getMonth() === new Date().getMonth() && lead.status === 'Qualified').length;
  const previousMonthQualified = leads.filter(lead => new Date(lead.createdAt).getMonth() === new Date().getMonth() - 1 && lead.status === 'Qualified').length;
  const qualifiedChange = Math.round(((currentMonthQualified - previousMonthQualified) / previousMonthQualified) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's an overview of your lead generation.</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
          <Button>Add Lead</Button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">{totalLeads}</div>
              <div className={`text-xs flex items-center ${leadsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {leadsChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(leadsChange)}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
              <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">{qualifiedLeads}</div>
              <div className={`text-xs flex items-center ${qualifiedChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {qualifiedChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(qualifiedChange)}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <div className="text-xs text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                2%
              </div>
            </div>
            <div className="mt-2">
              <Progress value={conversionRate} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cost per Lead</CardTitle>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">$12.40</div>
              <div className="text-xs text-red-600 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                5%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">vs. previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Leads Over Time</CardTitle>
                <CardDescription>Total vs. qualified leads</CardDescription>
              </div>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="View by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={leadsOverTime}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stackId="1"
                  stroke="#6366F1"
                  fill="url(#colorLeads)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="qualified"
                  stackId="2"
                  stroke="#10B981"
                  fill="url(#colorQualified)"
                  strokeWidth={2}
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

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution by channel</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 80 : 100}
                  dataKey="value"
                  labelLine={false}
                  label={false}
                >
                  {leadsBySource.map((entry, index) => (
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
              {leadsBySource.map((source) => (
                <div key={source.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm font-medium">{source.name}</span>
                  <span className="ml-auto text-sm text-gray-500">{Math.round((source.value / totalLeads) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Performance */}
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Metrics across active campaigns</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="[&_th]:py-3 [&_th]:px-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-gray-500 border-b">
                    <th>Campaign</th>
                    <th>Total Leads</th>
                    <th>Conversion Rate</th>
                    <th>Cost Per Lead</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="[&_td]:py-3 [&_td]:px-4">
                  {campaignPerformance.map((campaign, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="font-medium">{campaign.name}</td>
                      <td>{campaign.leads}</td>
                      <td>
                        <div className="flex items-center">
                          <span className="mr-2">{campaign.conversion}%</span>
                          <Progress value={campaign.conversion} className="h-1 w-24" />
                        </div>
                      </td>
                      <td>${campaign.cpl}</td>
                      <td>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest lead submissions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {leads && leads.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="[&_th]:py-3 [&_th]:px-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-gray-500 border-b">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Source</th>
                    <th>Lead Score</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="[&_td]:py-3 [&_td]:px-4">
                    {leads
                      .slice()
                      .sort((a, b) => {
                        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                        return dateB - dateA;
                      })
                      .slice(0, 5)
                      .map((lead) => (
                        <tr key={lead._id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="font-medium">{lead.name || '-'}</td>
                          <td>{lead.email || '-'}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getLeadSourceIcon(lead.source)}
                              {lead.source || '-'}
                        </div>
                      </td>
                      <td>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                    <span className="mr-2">{lead.score ?? 0}/100</span>
                                    <Progress value={lead.score ?? 0} className="h-1 w-24" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                  <p className="text-xs">Lead quality score: {lead.score ?? 0}/100</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td>{getLeadStatusBadge(lead.status)}</td>
                      <td>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <div className="text-center text-gray-500 py-8">No leads found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
