import { v4 as uuidv4 } from "uuid";
import type { Product } from "@gpublic/types/types";
import { pause } from "@gpublic/utils/pause";
import type { FormState } from "./types";

const pauseTime = process.env.NODE_ENV === "development" ? 500 : 0;
const baseUrl = "http://localhost:3009";

export async function getProducts() {
  const url = `${baseUrl}/products`;

  try {
    await pause(pauseTime);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error?.message);
    throw new Error(`Products could not be loaded.`);
  }
}

export async function deleteProduct(id: string | number) {
  const url = `${baseUrl}/products/${id}`;

  try {
    await pause(pauseTime);
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error?.message);
    throw new Error(`Products could not be loaded.`);
  }
}

export async function deleteProductReducer(
  id: string | number,
): Promise<FormState> {
  const url = `${baseUrl}/products/${id}`;

  try {
    await pause(pauseTime);
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    return {
      values: result,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error(error?.message);
    return {
      message: "Product could not be deleted.",
      errors: [error?.message],
    };
    // throw new Error(`Products could not be loaded.`);
  }
}

export async function createProductReducer(
  prevFormState: FormState,
  formData: FormData,
): Promise<FormState> {
  const url = `${baseUrl}/products`;

  const product = {
    id: uuidv4(),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
  };

  try {
    await pause(pauseTime);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();

    return {
      values: result,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error(error?.message);
    return {
      message: "Product could not be created.",
      errors: [error?.message],
    };
    // throw new Error(`Products could not be created.`);
  }
}

export async function updateProduct(product: Product, id: string | number) {}
