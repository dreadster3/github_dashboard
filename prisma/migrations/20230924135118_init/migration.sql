-- CreateTable
CREATE TABLE "tb_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "tb_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_accounts_provider_providerAccountId_key" ON "tb_accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_sessions_sessionToken_key" ON "tb_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_verification_tokens_token_key" ON "tb_verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tb_verification_tokens_identifier_token_key" ON "tb_verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "tb_accounts" ADD CONSTRAINT "tb_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_sessions" ADD CONSTRAINT "tb_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
