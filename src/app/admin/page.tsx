import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collaborationSubmissions } from "@/lib/data";

export const metadata = {
  title: 'Admin Dashboard - Sol & Clay',
  description: 'Manage collaborations, products, and orders.',
};

const getBadgeVariant = (status: string) => {
  if (status.includes("Approved")) return "default";
  if (status.includes("Spam")) return "destructive";
  if (status.includes("Irrelevant")) return "secondary";
  return "outline";
};

export default function AdminDashboardPage() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, show an unauthorized message.
  // In a real app, you'd probably want to redirect them to the home page.
  if (sessionClaims?.metadata.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="mt-4">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl font-bold text-dark-brown mb-8">
        Admin Dashboard
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Collaboration Requests</CardTitle>
          <CardDescription>
            Review and manage submissions from potential collaborators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Studio</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">AI Analysis</TableHead>
                <TableHead className="hidden sm:table-cell">Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collaborationSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className="font-medium">{submission.studioName}</div>
                    <a href={submission.portfolioURL} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline">
                      Portfolio
                    </a>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {submission.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(submission.status)}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-xs truncate">
                    {submission.reason}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
