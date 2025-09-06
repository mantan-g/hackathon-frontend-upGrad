"use client";
import CourseAccordion from "@/components/CourseAccordion";
import { useEffect, useState } from "react";
import "@/app/globals.css";

export default function ProgramDetail() {
  const [program, setProgram] = useState<any>(null);

  useEffect(() => {
    const program = JSON.parse(
      sessionStorage.getItem("selectedProgram") || "{}"
    );
    if (!program) {
      window.location.href = "/";
      return;
    }

    setProgram(program);
  }, []);

  return (
    <div className="bg-white h-full w-full">
      <CourseAccordion courses={program?.courses ?? []} />
    </div>
  );
}
