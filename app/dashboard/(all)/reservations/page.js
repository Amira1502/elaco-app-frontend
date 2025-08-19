"use client";
import React from "react";
// import ComponentCard from "@/app/components/common/ComponentCard";
// import PageBreadcrumb from "@/app/components/common/PageBreadCrumb";
// import BasicTableOne from "@/app/components/tables/BasicTableOne";

// import ComponentCard from "@/app/components/common/ComponentCard";
import ComponentCard from "./../../../common/ComponentCard";

// import PageBreadcrumb from "@/app/components/common/PageBreadCrumb";
import PageBreadcrumb from "./../../../common/PageBreadCrumb";

// import BasicTableTwo from "@/app/components/tables/BasicTableTwo";
import Reservation from "./../../../components/tables/reservations";

export default function BasicTables() {
  return (
    <div>
        <ComponentCard title="Reservations ">
          <Reservation />
        </ComponentCard>
    </div>
  );
}
