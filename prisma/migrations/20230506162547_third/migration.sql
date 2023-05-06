/*
  Warnings:

  - You are about to drop the `EmployeeSalaryhistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmployeeSalaryhistory";

-- CreateTable
CREATE TABLE "EmployeeSalaryHistory" (
    "employeeId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "salary_taken" INTEGER NOT NULL,

    CONSTRAINT "EmployeeSalaryHistory_pkey" PRIMARY KEY ("employeeId")
);
