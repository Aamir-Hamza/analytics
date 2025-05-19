
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, Key, Upload, User, Users } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile settings saved!");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully!");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences saved!");
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Team settings saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="border-b">
          <TabsList className="bg-transparent -mb-px">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent"
            >
              <Key className="mr-2 h-4 w-4" />
              Password
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent"
            >
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Admin" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="User" placeholder="Last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@example.com" disabled />
                  <p className="text-[0.8rem] text-gray-500">
                    Your email cannot be changed. Contact support for assistance.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="LeadInsight Inc." placeholder="Company name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select defaultValue="america-los_angeles">
                    <SelectTrigger id="timeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-los_angeles">Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="america-new_york">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="europe-london">London</SelectItem>
                      <SelectItem value="asia-tokyo">Tokyo</SelectItem>
                      <SelectItem value="australia-sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Admin</Badge>
                  <span className="text-sm text-gray-500">User since Jan 2023</span>
                </div>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4">
          <Card>
            <form onSubmit={handleSavePassword}>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveNotifications}>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-leads">New Leads</Label>
                        <p className="text-sm text-gray-500">Receive notifications when new leads are added</p>
                      </div>
                      <Switch id="email-leads" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-campaigns">Campaign Updates</Label>
                        <p className="text-sm text-gray-500">Notifications about campaign status changes</p>
                      </div>
                      <Switch id="email-campaigns" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-reports">Weekly Reports</Label>
                        <p className="text-sm text-gray-500">Receive weekly summary reports</p>
                      </div>
                      <Switch id="email-reports" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-leads">Lead Activity</Label>
                        <p className="text-sm text-gray-500">Show notifications for lead activity in the dashboard</p>
                      </div>
                      <Switch id="system-leads" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-campaigns">Campaign Alerts</Label>
                        <p className="text-sm text-gray-500">Show campaign notifications in the dashboard</p>
                      </div>
                      <Switch id="system-campaigns" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-analytics">Analytics Updates</Label>
                        <p className="text-sm text-gray-500">Show notifications for significant analytics changes</p>
                      </div>
                      <Switch id="system-analytics" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Email Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit">Save Notification Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <Card>
            <form onSubmit={handleSaveTeam}>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage your team members and their access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Admin</Badge>
                      <Button variant="ghost" size="sm" disabled>
                        You
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Jane Doe</p>
                        <p className="text-xs text-gray-500">jane@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="manager">
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Bob Smith</p>
                        <p className="text-xs text-gray-500">bob@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="analyst">
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Invite Team Member</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="invite-email">Email Address</Label>
                      <Input id="invite-email" type="email" placeholder="colleague@example.com" />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="invite-role">Role</Label>
                      <Select defaultValue="analyst">
                        <SelectTrigger id="invite-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end md:col-span-1">
                      <Button type="button" className="w-full">Send Invitation</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Permission Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Analyst Access</Label>
                        <p className="text-sm text-gray-500">Can view analytics, but cannot modify leads or campaigns</p>
                      </div>
                      <Switch id="analyst-access" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Manager Access</Label>
                        <p className="text-sm text-gray-500">Can manage leads and view analytics, but cannot modify campaigns</p>
                      </div>
                      <Switch id="manager-access" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Admin Access</Label>
                        <p className="text-sm text-gray-500">Full access to all features including team management</p>
                      </div>
                      <Switch id="admin-access" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit">Save Team Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
