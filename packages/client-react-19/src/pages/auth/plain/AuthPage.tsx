import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { PageTitle } from "@/comps";
import { userInitValues, type Page, type User } from "@gpublic/types/types";

import { Form, Button, Alert, Hero } from "@gpublic/comps";
import { userLoginSchema, validateByZod as v } from "@gpublic/validation";
import type { FormElement, FormFeedback } from "@/pages/comps/form/types";
import { AuthProvider, useAuthContext } from "./auth-context";
import { ProtectedRoute } from "./ProtectedRoute";

const page: Page = {
  title: "Plain",
  breadcrumb: [{ label: "Auth" }, { label: "Plain" }],
};

export default function AuthPage() {
  return (
    <AuthProvider>
      <section>
        <PageTitle page={page} />
        <AuthStatus />
        <LoginForm />
        <LogoutForm />

        <ProtectedRoute>
          <Hero>
            <Hero.Title>Private Hero!</Hero.Title>
            <Hero.Content>
              This is a private hero section, only visible to authenticated
              users.
            </Hero.Content>
          </Hero>
        </ProtectedRoute>
      </section>
    </AuthProvider>
  );
}

function AuthStatus() {
  const { user, isAuthenticated } = useAuthContext();
  return isAuthenticated ? (
    <Alert>{`${user?.name} <${user?.email}>`}</Alert>
  ) : (
    <Alert variant="warning">Guest</Alert>
  );
}

function LoginForm() {
  const [formValues, setFormValues] = useState<User>(userInitValues);
  const [formFeedback, setFormFeedback] = useState<FormFeedback>();
  const { login, isAuthenticated } = useAuthContext();

  if (isAuthenticated) return;

  // Generic handler for any field
  const handleChange = (e: ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formValues:", formValues);

    // validation
    const vResult = v<User>(userLoginSchema, formValues);

    if (!vResult.success) {
      setFormFeedback({
        title: "Errors:",
        messages: Object.values(vResult.errors).flat(),
      });
      return;
    }

    const { email, password } = formValues;
    login(email, password);

    setFormFeedback(undefined);
    // reset form if needed
    if (0) setFormValues(userInitValues);
  };

  return (
    <Form className="form" onSubmit={handleSubmit} legend="Login">
      {formFeedback && (
        <Alert variant="warning" messages={formFeedback.messages}>
          {formFeedback.title}
        </Alert>
      )}

      <Form.Row>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </Form.Row>

      <Button type="submit" className="btn-success">
        Login
      </Button>
    </Form>
  );
}

function LogoutForm() {
  const { logout, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <Form className="form" onSubmit={handleSubmit} legend="Logout">
      <Button type="submit" className="btn-outline">
        Logout
      </Button>
    </Form>
  );
}
