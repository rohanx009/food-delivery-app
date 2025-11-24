"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, logout, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  useEffect(() => {
    // Only redirect after loading is complete and we're certain there's no user
    if (!isLoading) {
      if (!user) {
        setShouldRedirect(true);
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/auth");
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSave = async () => {
    try {
      setIsEditing(false);
      // Update user in database and context
      await updateUserProfile(formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setIsEditing(true); // Re-enable editing on error
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User size={64} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">
              {user.role.replace("_", " ").toUpperCase()}
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User size={16} />
                Full Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-8 pt-8 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Account Created</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
