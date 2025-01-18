import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { handleApiResponse } from "@/utils/apiHandler";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900"
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleSave = async () => {
    // Example of how to use the API handler (commented out until API routes are added)
    /*
    const response = await fetch('/api/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const result = await handleApiResponse<UserInfo>(response);
    
    if (!result.error) {
      setIsEditing(false);
      toast.success("Profile updated successfully");
    }
    */

    // Temporary implementation until API routes are added
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Profile
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
          </div>
          {isEditing && (
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;