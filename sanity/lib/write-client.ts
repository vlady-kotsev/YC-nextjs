import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "@/sanity/env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});
