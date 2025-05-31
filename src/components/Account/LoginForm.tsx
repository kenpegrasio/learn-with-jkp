import { useState, useContext } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserContext } from "@/UserContextProvider";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://learn-with-jkp-api.vercel.app/api/user/login`,
        {
          emailOrUsername: values.identifier,
          password: values.password,
        }
      );
      const response = await axios.post(
        "https://learn-with-jkp-api.vercel.app/api/user/userInfo",
        {},
        {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        }
      );
      setUser(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setLoading(false);
    } catch (err: any) {
      toast.error(`Login error: ${err.response?.data?.message ?? 'Unknown error'}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input placeholder="Email or Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-[50%] bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
