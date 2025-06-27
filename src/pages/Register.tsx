import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from "sonner";

// Import custom layout and form components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

// The form values type can be inferred from the schema used within AuthForm,
// but for clarity in our onSubmit handler, we'll define it here.
const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  console.log('Register page loaded');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = (values: RegisterFormValues) => {
    setIsSubmitting(true);
    console.log("Registration submitted with:", values);

    // Simulate an API call for registration
    setTimeout(() => {
      // In a real application, you would handle the API response here.
      // On success:
      toast.success("Account created successfully!", {
        description: "You are now being redirected to the dashboard.",
      });
      setIsSubmitting(false);
      // Redirect to the dashboard page as per App.tsx routing
      navigate('/dashboard'); 
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AuthForm
          mode="register"
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Register;