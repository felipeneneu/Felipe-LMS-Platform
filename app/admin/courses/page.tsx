import { buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link
          href="/admin/courses/create"
          className={buttonVariants({
            size: "lg",
          })}
        >
          <PlusCircleIcon className="size-5" />
          Create Course
        </Link>
      </div>

      <div>
        <h2>Here you will see all of the course</h2>
      </div>
    </>
  );
}
