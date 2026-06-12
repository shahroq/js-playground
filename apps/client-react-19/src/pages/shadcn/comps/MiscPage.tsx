import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";
import { InfoIcon } from "lucide-react";
import { Separator } from "@jsp/shared/comps-shadcn/ui/separator";
import { Button } from "@jsp/shared/comps-shadcn/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@jsp/shared/comps-shadcn/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@jsp/shared/comps-shadcn/ui/alert-dialog";

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
