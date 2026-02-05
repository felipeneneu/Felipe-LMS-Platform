import { z } from "zod/v3";

export const courseLevels = ["Beginner", "Intermediate", "Advenced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Busincess",
  "Finance",
  "It & Software",
  "Office productifyty",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
  description: z
    .string()
    .min(3, { message: "A descrição deve ter pelo menos 3 caracteres" }),
  fileKey: z.string().min(1, { message: "A chave do arquivo é obrigatória" }),
  price: z.coerce
    .number()
    .min(1, { message: "O preço deve ser de no mínimo 1" }),
  duration: z.coerce
    .number()
    .min(1, { message: "A duração deve ser de no mínimo 1" })
    .max(500, { message: "A duração deve ser de no máximo 500" }),
  level: z.enum(courseLevels, { message: "Selecione um nível válido" }),
  category: z.enum(courseCategories, { message: "Categoria é requerida" }),
  smallDescription: z
    .string()
    .min(3, { message: "A pequena descrição deve ter pelo menos 3 caracteres" })
    .max(200, {
      message: "A pequena descrição deve ter no máximo 200 caracteres",
    }),
  slug: z
    .string()
    .min(3, { message: "O slug deve ter pelo menos 3 caracteres" }),
  status: z.enum(courseStatus, { message: "Selecione um status válido" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
