-- AddForeignKey
ALTER TABLE "studentAttendance" ADD CONSTRAINT "studentAttendance_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE SET NULL ON UPDATE CASCADE;
