import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = {
  title: "My Account | Meem Artisan",
  description: "Manage your account and view your order history.",
};

const orders = [
    { id: "ORD001", date: "2023-10-26", total: 119.99, status: "Delivered" },
    { id: "ORD002", date: "2023-11-15", total: 49.99, status: "Shipped" },
    { id: "ORD003", date: "2023-12-01", total: 199.98, status: "Processing" },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-headline text-primary">My Account</h1>
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View the status of your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <address className="text-sm text-muted-foreground not-italic">
                            123 Luxury Lane<br />
                            Metropolis, 10101<br />
                            United States
                        </address>
                    </div>
                    <Button variant="outline" className="w-full">Edit Profile</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
