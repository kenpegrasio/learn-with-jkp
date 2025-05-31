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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://learn-with-jkp-api.vercel.app/api/user/register`,
        values
      );
      console.log(res);
      toast.info("User successfully registered!");
      await delay(1000);
      window.location.reload();
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error(
        `Failed to register. ${
          err.response?.data?.message ?? "Unknown error"
        } Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
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
              <FormLabel>
                Password<span className="text-red-500">*</span>
              </FormLabel>
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
            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
