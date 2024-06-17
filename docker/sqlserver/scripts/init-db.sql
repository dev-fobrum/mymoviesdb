USE master;

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'mmdbDB')
BEGIN
    CREATE DATABASE mmdbDB;
    PRINT 'Database mmdbDB created successfully.';
END
ELSE
BEGIN
    PRINT 'Database mmdbDB already exists.';
END
