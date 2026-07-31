-- AddForeignKey
ALTER TABLE "sectionTransferLog" ADD CONSTRAINT "sectionTransferLog_fromClassSectionId_fkey" FOREIGN KEY ("fromClassSectionId") REFERENCES "classSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectionTransferLog" ADD CONSTRAINT "sectionTransferLog_toClassSectionId_fkey" FOREIGN KEY ("toClassSectionId") REFERENCES "classSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
