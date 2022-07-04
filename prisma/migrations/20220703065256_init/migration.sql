-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('COMPANY_OWNER', 'COMPANY', 'USER', 'ADMIN');

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "login" VARCHAR(128) NOT NULL,
    "hash" VARCHAR(64) NOT NULL,
    "userType" "UserTypes" NOT NULL DEFAULT 'USER',
    "idDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyUser" (
    "companyID" UUID NOT NULL,
    "authUserId" UUID NOT NULL,

    CONSTRAINT "CompanyUser_pkey" PRIMARY KEY ("authUserId")
);

-- CreateTable
CREATE TABLE "CompanyRole" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "CompanyRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPermission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "CompanyPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRolePermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "CompanyRolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUser_authUserId_key" ON "CompanyUser"("authUserId");

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRole" ADD CONSTRAINT "CompanyRole_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CompanyRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPermission" ADD CONSTRAINT "CompanyPermission_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CompanyPermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRolePermission" ADD CONSTRAINT "CompanyRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "CompanyRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRolePermission" ADD CONSTRAINT "CompanyRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "CompanyPermission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
