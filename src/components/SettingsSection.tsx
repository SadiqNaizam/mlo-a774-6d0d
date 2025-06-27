import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children, className }) => {
  console.log('SettingsSection loaded for:', title);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SettingsSection;