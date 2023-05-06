/*
  Warnings:

  - You are about to drop the `Employee_Salary_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Employee_Salary_history";

-- CreateTable
CREATE TABLE "EmployeeSalaryhistory" (
    "employeeId" INTEGER NOT NULL,
    "month" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary_taken" INTEGER NOT NULL,

    CONSTRAINT "EmployeeSalaryhistory_pkey" PRIMARY KEY ("employeeId")
);
