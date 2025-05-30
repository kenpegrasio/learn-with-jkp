import Logout from "./logout";
import { useContext } from "react";
import { UserContext } from "../../UserContextProvider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import RegisterButton from "./register";
import LoginButton from "./login";

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
            <LoginButton />
            <RegisterButton />
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
          <div>Hello, World</div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Logout />
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserInfo;
