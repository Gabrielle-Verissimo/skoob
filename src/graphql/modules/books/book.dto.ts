import z from "zod";

const imageLinksSchema = z.object({
  smallThumbnail: z.url(),
  thumbnail: z.url(),
});

const industryIdentifierSchema = z.object({
  type: z.string(),
  identifier: z.string(),
});

const readingModesSchema = z.object({
  text: z.boolean(),
  image: z.boolean(),
});

const panelizationSummarySchema = z.object({
  containsEpubBubbles: z.boolean(),
  containsImageBubbles: z.boolean(),
});

export const bookGoogleApiSchema = z.object({
  imageLinks: imageLinksSchema,
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.string()),
  publisher: z.string(),
  publishedDate: z.string(),
  description: z.string(),
  industryIdentifiers: z.array(industryIdentifierSchema),
  readingModes: readingModesSchema,
  pageCount: z.number(),
  printType: z.string(),
  categories: z.array(z.string()),
  maturityRating: z.string(),
  allowAnonLogging: z.boolean(),
  contentVersion: z.string(),
  panelizationSummary: panelizationSummarySchema,
  language: z.string(),
  previewLink: z.string(),
  infoLink: z.string(),
  canonicalVolumeLink: z.string(),
});

export type BookGoogleApi = z.infer<typeof bookGoogleApiSchema>;
