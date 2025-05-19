import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";
import { getApiUrl } from '@/lib/api';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: "New" | "Contacted" | "Qualified" | "Unqualified" | "Converted";
  createdAt: string;
}

const statusOptions = [
  "New",
  "Contacted",
  "Qualified",
  "Unqualified",
  "Converted",
];

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [newLead, setNewLead] = useState<Omit<Lead, "_id" | "createdAt">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
  });

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch(getApiUrl("/api/leads"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch(getApiUrl("/api/leads"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newLead),
      });
      if (!res.ok) throw new Error("Failed to add lead");
      toast.success("Lead added successfully!");
    setIsAddDialogOpen(false);
      setNewLead({ name: "", email: "", phone: "", company: "", status: "New" });
      fetchLeads();
    } catch (err: any) {
      toast.error(err.message || "Failed to add lead");
    }
  };

  const handleEditLead = (lead: Lead) => {
    setCurrentLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLead) return;
    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch(getApiUrl(`/api/leads/${currentLead._id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentLead),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      toast.success("Lead updated successfully!");
    setIsEditDialogOpen(false);
      fetchLeads();
    } catch (err: any) {
      toast.error(err.message || "Failed to update lead");
    }
  };

  const handleDeleteLead = (lead: Lead) => {
    setCurrentLead(lead);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentLead) return;
    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch(getApiUrl(`/api/leads/${currentLead._id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete lead");
      toast.success("Lead deleted successfully!");
    setIsDeleteDialogOpen(false);
      fetchLeads();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete lead");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Lead
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            Manage your sales leads and track their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                  <TableRow key={lead._id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead.status === "Qualified"
                          ? "bg-purple-100 text-purple-800"
                            : lead.status === "Converted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteLead(lead)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Lead Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Enter the details of your new lead. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  required
                />
              </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={newLead.company}
                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
              />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  required
                />
              </div>
            <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                />
              </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={newLead.status}
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value as Lead["status"] })}
                className="w-full border rounded px-2 py-1"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>
              Update the details of the lead. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleEditSubmit}
            className="space-y-4"
          >
            <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={currentLead?.name || ""}
                  onChange={(e) =>
                  setCurrentLead((prev) => prev ? { ...prev, name: e.target.value } : prev)
                  }
                  required
                />
              </div>
            <div>
              <Label htmlFor="edit-company">Company</Label>
              <Input
                id="edit-company"
                value={currentLead?.company || ""}
                onChange={(e) =>
                  setCurrentLead((prev) => prev ? { ...prev, company: e.target.value } : prev)
                }
              />
            </div>
            <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentLead?.email || ""}
                  onChange={(e) =>
                  setCurrentLead((prev) => prev ? { ...prev, email: e.target.value } : prev)
                  }
                  required
                />
              </div>
            <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={currentLead?.phone || ""}
                  onChange={(e) =>
                  setCurrentLead((prev) => prev ? { ...prev, phone: e.target.value } : prev)
                }
                />
              </div>
            <div>
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={currentLead?.status || "New"}
                  onChange={(e) =>
                  setCurrentLead((prev) => prev ? { ...prev, status: e.target.value as Lead["status"] } : prev)
                }
                className="w-full border rounded px-2 py-1"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
                </select>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Lead Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leads;
