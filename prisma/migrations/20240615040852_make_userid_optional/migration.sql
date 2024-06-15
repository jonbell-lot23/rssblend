-- Alter the `userid` column to be nullable
ALTER TABLE "firehose" ALTER COLUMN "userid" DROP NOT NULL;

-- Assuming the foreign key was dropped and re-added, you would need to know the exact details.
-- If you have the details, you can include the SQL for dropping and adding the foreign key here.