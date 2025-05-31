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
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Logout from "./logout";

const UserInfo: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-center h-screen -mt-7 bg-customWhite px-4 w-[90%] md:w-[40%]">
      <Card className="w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold -mb-2">Account</CardTitle>
        </CardHeader>

        {user ? null : (
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
        )}

        <CardFooter className="flex justify-center">
          {user && <Logout />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserInfo;