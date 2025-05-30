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

  return (
    <div className="flex items-center justify-center h-screen -mt-7 bg-customWhite px-4 w-[80%] md:w-[25%]">
      <Card className="w-full max-w-md text-center shadow-lg aspect-square flex items-center justify-center">
        <CardHeader className="w-[90%]">
          <CardTitle className="text-2xl font-bold">
            User Information
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            {user ? `Welcome back, ${user.name}` : "Not registered yet"}
          </CardDescription>
        </CardHeader>

          {user ? (
            <></>
          ) : (
            <CardContent>
            <div className="flex flex-row justify-center gap-3">
              <LoginButton />
              <RegisterButton />
            </div>
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
