/*
  Warnings:

  - You are about to drop the column `cognitoUserId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_cognitoUserId_key` ON `User`;

-- AlterTable
ALTER TABLE `Company` ADD COLUMN `salesforceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `salesforceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `cognitoUserId`,
    ADD COLUMN `salesforceId` VARCHAR(191) NULL;
