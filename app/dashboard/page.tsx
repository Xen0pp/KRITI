
'use client';

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const salesData = [
  { date: 'Jan', sales: 2000 },
  { date: 'Feb', sales: 2200 },
  { date: 'Mar', sales: 3000 },
  { date: 'Apr', sales: 2500 },
  { date: 'May', sales: 4000 },
  { date: 'Jun', sales: 3800 },
];
const topProductsData = [
    { name: 'Ceramic Vase', sales: 150 },
    { name: 'Kutchi Shawl', sales: 120 },
    { name: 'Wooden Elephants', sales: 90 },
    { name: 'Cushion Cover', sales: 80 },
    { name: 'Terracotta Pot', sales: 70 },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Welcome back, Meena!
          </h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Listings
              </CardTitle>
              <Package2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 pending approval
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Engagement
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>
                Your sales trend over the last 6 months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Your best performers this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProductsData} layout="vertical">
                         <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--foreground))" width={100} dx={-5} />
                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>My Products</CardTitle>
                <CardDescription>
                  Manage your listings and view their status.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  Add New Product
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Sales
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="hidden h-16 w-16 sm:flex">
                          <AvatarImage
                            src="https://picsum.photos/seed/madhubani-tree/100/100"
                            alt="Product image"
                          />
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Azure Ceramic Vase</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Live</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ₹45.00
                    </TableCell>
                    <TableCell className="hidden md:table-cell">150</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="hidden h-16 w-16 sm:flex">
                          <AvatarImage
                            src="https://picsum.photos/seed/pattachitra-ramayana/100/100"
                            alt="Product image"
                          />
                           <AvatarFallback>RE</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Royal Elephant Trio</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pending Approval</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ₹30.00
                    </TableCell>
                    <TableCell className="hidden md:table-cell">90</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
         <div className="grid gap-4 md:gap-8 md:grid-cols-2">
            <Card>
                 <CardHeader>
                    <CardTitle>Your AI Marketing Studio</CardTitle>
                    <CardDescription>Tools to help you sell more.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button variant="outline">Generate Product Descriptions</Button>
                    <Button variant="outline">Create Reels & Flyers</Button>
                    <Button variant="outline">Get Pricing Insights</Button>
                </CardContent>
            </Card>
             <Card>
                 <CardHeader>
                    <CardTitle>Stay Connected</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium">New message from Priya S.</p>
                        <p className="text-sm text-muted-foreground truncate">"Hi, I love the vase! Can you tell me more about the blue dye?"</p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild className="w-full">
                            <Link href="/messages">View Messages</Link>
                        </Button>
                        <Button variant="secondary" className="w-full">Contact Support</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
