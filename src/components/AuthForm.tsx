import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Define the modes for the authentication form
export type AuthFormMode = "login" | "register" | "forgot-password";

// Define Zod schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

// A map to hold schemas for easy access
const schemas = {
  login: loginSchema,
  register: registerSchema,
  "forgot-password": forgotPasswordSchema,
};

// Define the component's props
interface AuthFormProps {
  mode: AuthFormMode;
  onSubmit: (values: z.infer<typeof loginSchema | typeof registerSchema | typeof forgotPasswordSchema>) => void;
  isSubmitting?: boolean;
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isSubmitting = false, className }) => {
  console.log(`AuthForm loaded in ${mode} mode.`);

  const currentSchema = schemas[mode];
  type FormValues = z.infer<typeof currentSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as any, // Use any to satisfy all possible default structures
  });

  // Configuration for different modes to keep JSX clean
  const config = {
    login: {
      title: "Login",
      description: "Welcome back! Please enter your credentials to access your account.",
      buttonText: "Login",
      footerText: "Don't have an account?",
      footerLinkText: "Sign Up",
      footerLink: "/register",
    },
    register: {
      title: "Create an Account",
      description: "Enter your information to create a new account.",
      buttonText: "Sign Up",
      footerText: "Already have an account?",
      footerLinkText: "Login",
      footerLink: "/",
    },
    "forgot-password": {
      title: "Forgot Password",
      description: "Enter your email and we'll send you a link to reset your password.",
      buttonText: "Send Reset Link",
      footerText: "Remember your password?",
      footerLinkText: "Back to Login",
      footerLink: "/",
    },
  };

  const currentConfig = config[mode];

  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{currentConfig.title}</CardTitle>
        <CardDescription>{currentConfig.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode !== 'forgot-password' && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {currentConfig.buttonText}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <div className="text-sm text-muted-foreground">
          {currentConfig.footerText}{" "}
          <Link to={currentConfig.footerLink} className="font-semibold text-primary hover:underline">
            {currentConfig.footerLinkText}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;