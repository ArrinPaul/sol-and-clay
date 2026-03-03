import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// Define the expected shape of session claims metadata
interface UserMetadata {
  role?: string;
}

export const metadata = {
  title: 'Admin Dashboard - Sol & Clay',
  description: 'Manage collaborations, products, and orders.',
};

const getBadgeVariant = (status: string): "default" | "destructive" | "secondary" | "outline" => {
  if (status.includes("Approved")) return "default";
  if (status.includes("Spam")) return "destructive";
  if (status.includes("Irrelevant")) return "secondary";
  return "outline";
};

function AdminTableSkeleton() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-brand-brown" />
      <span className="ml-2 text-brand-brown">Loading submissions...</span>
    </div>
  );
}

function CollaborationsTable() {
  return (
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
        {collaborationSubmissions.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No collaboration submissions yet.
            </TableCell>
          </TableRow>
        ) : (
          collaborationSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <div className="font-medium">{submission.studioName}</div>
                <a 
                  href={submission.portfolioURL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-brand-brown hover:underline"
                >
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
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default async function AdminDashboardPage() {
  const { sessionClaims } = await auth();
  
  // Type-safe access to metadata
  const metadata = sessionClaims?.metadata as UserMetadata | undefined;

  // If the user does not have the admin role, redirect to home
  if (metadata?.role !== "admin") {
    redirect("/");
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
          <Suspense fallback={<AdminTableSkeleton />}>
            <CollaborationsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
