import CourseCard from "./CourseCard";
import type { Course } from "../types/course";

type CourseListProps = {
  courses: Course[];
};

export default function CourseList({ courses }: CourseListProps) {
  return (
    <section className="course-grid">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
}