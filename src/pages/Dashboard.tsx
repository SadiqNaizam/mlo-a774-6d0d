import React from 'react';
import { Link } from 'react-router-dom';

// Import custom layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UserProfileCard from '@/components/UserProfileCard';

// Import shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import icons
import { Settings, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  console.log('Dashboard page loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Welcome to Your Dashboard
          </h1>
          <UserProfileCard
            name="Jane Doe"
            email="jane.doe@example.com"
            avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </section>

        {/* Quick Actions / Hub Section */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Settings Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Settings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  Manage your profile, password, and notification preferences.
                </p>
                <Button asChild size="sm">
                  <Link to="/profile-settings">Go to Settings</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Placeholder Analytics Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usage Analytics</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  View your recent activity and application usage statistics.
                </p>
                <div className="text-2xl font-bold mt-2">1,234</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            
            {/* Placeholder Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Explore Features</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-xs text-muted-foreground">
                  Discover new features and get the most out of AccessPoint.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;