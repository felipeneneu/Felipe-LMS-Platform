"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, SparkleIcon, XIcon } from "lucide-react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  type CourseSchemaType,
  courseStatus,
} from "../schema";
import { RichTextEditor } from "@/components/rich-text-editor/editor";

const defaultValues: CourseSchemaType = {
  title: "",
  description: "",
  fileKey: "",
  price: 0,
  duration: 0,
  level: "Beginner",
  category: "Development",
  status: "Draft",
  slug: "",
  smallDescription: "",
};

const fixedMessageClassName = "min-h-5 text-xs leading-5";

export function CreateCourseForm() {
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });

  function onSubmit(values: CourseSchemaType) {
    console.log(values);
  }

  function handleGenerateSlug() {
    const titleValue = form.getValues("title").trim();
    const slug = slugify(titleValue, { lower: true, strict: true });
    form.setValue("slug", slug, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  function handleResetForm() {
    form.reset(defaultValues, {
      keepErrors: false,
      keepTouched: false,
      keepDirty: false,
      keepIsSubmitted: false,
      keepSubmitCount: false,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage className={fixedMessageClassName}> </FormMessage>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-start">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="course-slug" {...field} />
                </FormControl>
                <FormMessage className={fixedMessageClassName}> </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="md:mt-[1.15rem]"
            onClick={handleGenerateSlug}
          >
            Generate Slug <SparkleIcon className="ml-1 size-4" />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>Small Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Small description"
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage className={fixedMessageClassName}> </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor field={field} />
                {/* <Textarea
                  placeholder="Description"
                  className="min-h-32"
                  {...field}
                /> */}
              </FormControl>
              <FormMessage className={fixedMessageClassName}> </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>Thumbnail image</FormLabel>
              <FormControl>
                <Input placeholder="Thumbnail URL" {...field} />
              </FormControl>
              <FormMessage className={fixedMessageClassName}> </FormMessage>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className={fixedMessageClassName}> </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem value={level} key={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className={fixedMessageClassName}> </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Duration"
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={fixedMessageClassName}> </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    min={0}
                    step="0.01"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={fixedMessageClassName}> </FormMessage>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courseStatus.map((status) => (
                    <SelectItem value={status} key={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={fixedMessageClassName}> </FormMessage>
            </FormItem>
          )}
        />

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button type="submit">
            Create Course <PlusIcon className="ml-1 size-4" />
          </Button>
          <Button type="button" variant="outline" onClick={handleResetForm}>
            Reset Form <XIcon className="ml-1 size-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
