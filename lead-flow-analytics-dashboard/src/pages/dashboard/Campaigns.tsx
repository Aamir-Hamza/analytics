
import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  DollarSign,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// Mock campaign data
const mockCampaigns = [
  {
    id: 1,
    name: "Summer Sale",
    channel: "Paid Ads",
    budget: 5000,
    leadsGenerated: 135,
    conversion: 12.4,
    cpl: 37,
    status: "Active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
  },
  {
    id: 2,
    name: "Product Launch",
    channel: "Email",
    budget: 3000,
    leadsGenerated: 98,
    conversion: 8.6,
    cpl: 31,
    status: "Active",
    startDate: "2023-07-15",
    endDate: "2023-09-15",
  },
  {
    id: 3,
    name: "Holiday Promo",
    channel: "Social",
    budget: 7500,
    leadsGenerated: 246,
    conversion: 15.2,
    cpl: 30,
    status: "Scheduled",
    startDate: "2023-11-15",
    endDate: "2023-12-31",
  },
  {
    id: 4,
    name: "Retargeting",
    channel: "Paid Ads",
    budget: 2500,
    leadsGenerated: 87,
    conversion: 11.8,
    cpl: 29,
    status: "Active",
    startDate: "2023-05-01",
    endDate: "2023-11-01",
  },
  {
    id: 5,
    name: "Q3 Newsletter",
    channel: "Email",
    budget: 1000,
    leadsGenerated: 52,
    conversion: 7.2,
    cpl: 19,
    status: "Completed",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
  },
  {
    id: 6,
    name: "Webinar Series",
    channel: "Content",
    budget: 4500,
    leadsGenerated: 178,
    conversion: 18.9,
    cpl: 25,
    status: "Active",
    startDate: "2023-04-15",
    endDate: "2023-12-15",
  },
];

// Chart data
const channelPerformanceData = [
  { channel: "Paid Ads", leads: 222, budget: 7500 },
  { channel: "Email", leads: 150, budget: 4000 },
  { channel: "Social", leads: 246, budget: 7500 },
  { channel: "Content", leads: 178, budget: 4500 },
];

const monthlyPerformanceData = [
  { month: "Jan", leads: 45, budget: 1800 },
  { month: "Feb", leads: 52, budget: 2000 },
  { month: "Mar", leads: 58, budget: 2200 },
  { month: "Apr", leads: 75, budget: 2500 },
  { month: "May", leads: 92, budget: 3000 },
  { month: "Jun", leads: 120, budget: 3500 },
  { month: "Jul", leads: 135, budget: 4000 },
  { month: "Aug", leads: 110, budget: 3800 },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case "Completed":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    case "Scheduled":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter campaigns based on search term
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    return (
      searchTerm === "" ||
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Campaign added successfully!");
  };

  const handleDeleteCampaign = (id: number) => {
    toast.success(`Campaign ${id} deleted successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your marketing campaigns</p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Add the details for your new campaign. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCampaign}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Campaign name"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="channel" className="text-right">
                      Channel
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid-ads">Paid Ads</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget
                    </Label>
                    <div className="col-span-3 relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input id="budget" type="number" className="pl-8" placeholder="0.00" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <div className="col-span-3 relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input id="startDate" type="date" className="pl-8" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      End Date
                    </Label>
                    <div className="col-span-3 relative">
                      <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input id="endDate" type="date" className="pl-8" required />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Campaign</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="active">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search campaigns..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCampaigns
              .filter((campaign) => campaign.status === "Active")
              .map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{campaign.name}</CardTitle>
                        <CardDescription>{campaign.channel}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Campaign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Leads Generated</p>
                        <p className="font-medium">{campaign.leadsGenerated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cost per Lead</p>
                        <p className="font-medium">${campaign.cpl}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Conversion Rate</p>
                        <p className="font-medium">{campaign.conversion}%</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Period</p>
                        <p className="text-sm">
                          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                        </p>
                      </div>
                      <div>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr className="[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-medium [&_th]:text-gray-500 border-b">
                      <th>Name</th>
                      <th>Channel</th>
                      <th>Budget</th>
                      <th>Leads</th>
                      <th>CPL</th>
                      <th>Conversion</th>
                      <th>Status</th>
                      <th>Dates</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="[&_td]:px-4 [&_td]:py-3">
                    {filteredCampaigns.map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="font-medium">{campaign.name}</td>
                        <td>{campaign.channel}</td>
                        <td>${campaign.budget.toLocaleString()}</td>
                        <td>{campaign.leadsGenerated}</td>
                        <td>${campaign.cpl}</td>
                        <td>{campaign.conversion}%</td>
                        <td>{getStatusBadge(campaign.status)}</td>
                        <td>
                          <div className="text-xs text-gray-500">
                            <div>From: {formatDate(campaign.startDate)}</div>
                            <div>To: {formatDate(campaign.endDate)}</div>
                          </div>
                        </td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Campaign
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription>Leads generated vs budget by channel</CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="channel" />
                    <YAxis yAxisId="left" orientation="left" stroke="#10B981" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6366F1" />
                    <RechartsTooltip 
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => {
                        if (name === 'leads') return [`${value} leads`, 'Leads'];
                        if (name === 'budget') return [`$${value}`, 'Budget'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="leads" name="Leads" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="budget" name="Budget ($)" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Monthly Performance</CardTitle>
                    <CardDescription>Leads generated over time</CardDescription>
                  </div>
                  <Select defaultValue="leads">
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leads">Leads</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="cpl">Cost per lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip 
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => {
                        if (name === 'leads') return [`${value} leads`, 'Leads'];
                        return [value, name];
                      }}
                    />
                    <Bar dataKey="leads" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Campaign Effectiveness</CardTitle>
                <CardDescription>Compare campaign performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Lead Distribution by Channel</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={channelPerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="leads"
                        >
                          {channelPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Key Insights</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-2">
                          <div className="h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                          <span className="text-sm">Average cost per lead has decreased by 12% this quarter.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronDown className="h-4 w-4 rotate-180" />
                          </div>
                          <span className="text-sm">Email campaigns show the highest conversion rate at 15.2%.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronDown className="h-4 w-4 rotate-180" />
                          </div>
                          <span className="text-sm">Social media leads have increased by 24% compared to last quarter.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Based on current performance, consider reallocating 20% of the budget from Paid Ads to Social Media to maximize lead generation efficiency.
                      </p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaigns;
