-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "join_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birth_date" DATE NOT NULL,
    "role" TEXT NOT NULL,
    "profile_P" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deadline" DATE NOT NULL,
    "task_status" TEXT NOT NULL,
    "task_salary" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee_Salary_history" (
    "employeeId" INTEGER NOT NULL,
    "month" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary_taken" INTEGER NOT NULL,

    CONSTRAINT "Employee_Salary_history_pkey" PRIMARY KEY ("employeeId")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
