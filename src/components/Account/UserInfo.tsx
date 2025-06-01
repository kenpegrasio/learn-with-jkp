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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Logout from "./logout";
import { Button } from "../ui/button";

const UserInfo: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-center h-screen -mt-7 bg-customWhite px-4 w-[90%] md:w-[40%]">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Account
          </CardTitle>
          {user ? (
            <CardDescription className="text-center">
              Your account information is shown below.
            </CardDescription>
          ) : (
            <></>
          )}
        </CardHeader>

        {!user ? (
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        ) : (
          <>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <div className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                  {user.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <div className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                  {user.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Access Type
                </label>
                <div className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                  {user.accesstype}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Points</label>
                <div className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                  {user.point}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col md:flex-row justify-center gap-3">
              <div className="flex flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to={`/account/${user._id}/favourites`}>
                    View Favourite
                  </Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to={`/account/${user._id}/completed`}>
                    View Completed
                  </Link>
                </Button>
              </div>
              <Logout />
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default UserInfo;
