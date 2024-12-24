import React from "react";
import SectionTitle from "./ui/section-title";
import { Calendar } from "@/components/ui/calendar";

const DashboardCalender = () => {
  return (
    <section>
      <SectionTitle>Calender</SectionTitle>
      <Calendar />
    </section>
  );
};

export default DashboardCalender;
