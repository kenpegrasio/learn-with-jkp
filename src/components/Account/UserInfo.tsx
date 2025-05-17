import Login from "./login";
import Logout from "./logout";
import { useContext } from "react";
import { UserContext } from "../../UserContextProvider";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const UserInfo: React.FC = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-customWhite px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Not registered yet</CardDescription>
          </CardHeader>
          <CardContent>
            <Login />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-customWhite px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Welcome back, {user.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <img
              src={user.picture}
              alt="User Profile"
              className="w-24 h-24 rounded-full border shadow"
            />
          </div>

          <div className="text-left space-y-1">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Access Type:</strong> {user.accesstype ?? "N/A"}
            </p>
            <p>
              <strong>Points:</strong> {user.point ?? 0}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Logout />
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserInfo;
