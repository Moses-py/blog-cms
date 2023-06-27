import { Client, Account, ID, Storage, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);

export { client, ID };
