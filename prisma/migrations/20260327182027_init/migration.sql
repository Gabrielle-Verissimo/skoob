-- CreateEnum
CREATE TYPE "BookFormat" AS ENUM ('FISICO', 'EBOOK', 'AUDIOBOOK');

-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('LIDO', 'LENDO', 'QUERO_LER', 'RELENDO', 'ABANDONEI');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBook" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "status" "ReadingStatus" NOT NULL DEFAULT 'QUERO_LER',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isDesired" BOOLEAN NOT NULL DEFAULT false,
    "isOwned" BOOLEAN NOT NULL DEFAULT false,
    "isLoaned" BOOLEAN NOT NULL DEFAULT false,
    "format" "BookFormat" NOT NULL DEFAULT 'FISICO',
    "currentPage" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(2,1),
    "review" TEXT,
    "isInGoal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserBook_userId_status_idx" ON "UserBook"("userId", "status");

-- CreateIndex
CREATE INDEX "UserBook_userId_isFavorite_idx" ON "UserBook"("userId", "isFavorite");

-- CreateIndex
CREATE UNIQUE INDEX "UserBook_userId_bookId_key" ON "UserBook"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
