
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SalesDashboardGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Understanding Your Sales Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
            <p>Your Artisan Dashboard is your command center for selling on Kriti. Understanding the data it presents is key to growing your business. This guide explains the main sections of your dashboard and how to use them to make smarter decisions.</p>

            <div className="relative aspect-video rounded-lg overflow-hidden my-8">
                <Image src="https://picsum.photos/seed/analytics-dashboard-art/1200/675" alt="A screenshot of a sales analytics dashboard" fill className="object-cover" data-ai-hint="sales dashboard" />
            </div>

            <h3 className="font-headline text-2xl">1. Key Performance Indicators (KPIs)</h3>
            <p>At the top of your dashboard, you'll find four main boxes. These are your KPIs, a quick snapshot of your performance:</p>
            <ul>
                <li><strong>Total Revenue:</strong> This is the total amount of money you've earned from sales in the current month.</li>
                <li><strong>Active Listings:</strong> This shows how many of your products are currently live and visible to customers on the marketplace.</li>
                <li><strong>Sales:</strong> This is the total number of individual items you've sold this month.</li>
                <li><strong>Engagement:</strong> This tracks how many times customers have viewed your products or interacted with your profile. Higher engagement often leads to more sales.</li>
            </ul>

            <h3 className="font-headline text-2xl">2. Sales Performance Chart</h3>
            <p>This line chart shows your sales revenue over time. You can use it to spot trends. Are your sales higher on weekends? Did a new product launch cause a spike? Use this information to plan your activities.</p>

            <h3 className="font-headline text-2xl">3. Top Selling Products</h3>
            <p>This bar chart shows which of your products are the most popular. If you see a clear winner, consider creating similar items or promoting it more. If a product isn't selling, you might want to try new photos or a better description.</p>

            <h3 className="font-headline text-2xl">4. My Products Table</h3>
            <p>This section allows you to manage all your listings. You can see their status ("Live", "Pending Approval"), check their price and sales numbers, and use the menu to edit or delete them. Keeping your product list up-to-date is essential for a professional storefront.</p>

            <p>By checking your dashboard regularly, you can understand what your customers love and make informed decisions to help your creative business thrive!</p>
        </CardContent>
      </Card>
    </div>
  );
}
