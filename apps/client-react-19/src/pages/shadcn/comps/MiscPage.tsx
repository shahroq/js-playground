import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";
import { InfoIcon } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shadcn/components/ui/alert";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shadcn/components/ui/alert-dialog";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Shadcn" }, { label: "Components" }, { label: "Misc" }],
};

export default function MiscPage() {
  return (
    <section>
      <PageTitle page={page} />

      <div className="py-4 flex gap-2">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </div>

      <Separator />

      <div className="py-4">
        <Alert>
          <InfoIcon />
          <AlertTitle>Payment successful</AlertTitle>
          <AlertDescription>
            Your payment of $29.99 has been processed. A receipt has been sent
            to your email address.
          </AlertDescription>
        </Alert>
      </div>

      <Separator />

      <div className="py-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
