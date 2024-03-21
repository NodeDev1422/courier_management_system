DROP FUNCTION calculate_total_price;
CREATE OR REPLACE FUNCTION calculate_total_price(parent_id_value int, student_id_value int, access_mode int)
RETURNS numeric AS $$
BEGIN
	IF access_mode = 2 THEN
    RETURN (SELECT "Parent"."id", "Parent"."branch_id", "Parent"."first_name", "Parent"."last_name", "Parent"."spouse_first_name", "Parent"."spouse_last_name", "Parent"."primary_mobile", "Parent"."secondary_mobile", "Parent"."primary_email", "Parent"."secondary_email", "Parent"."permanent_residence_address", "Parent"."current_residence_address", "Parent"."occupation", "Parent"."profile_image", "Parent"."is_enabled", "Parent"."city", "Parent"."state", "Parent"."country", "Parent"."created_at", "Parent"."updated_at", "Parent"."deleted_at", "student"."id" AS "student.id",
"student"."first_name" AS "student.first_name", 
"student"."last_name" AS "student.last_name","student"."gender" AS "student.gender",
"student"."aadhar" AS "student.aadhar","student"."date_of_birth" AS "student.date_of_birth",
"student"."date_of_joining","student"."current_grade_level","student"."roll_number",
"student"."branch_id","b"."branch_name" 
FROM "parent" AS "Parent"
INNER JOIN "student" AS "student" ON "Parent"."id" = "student"."parent_id" 
AND ("student"."deleted_at" IS NULL) 
RIGHT OUTER JOIN "school_branch" AS b ON "b"."id" = "student"."branch_id"
WHERE ("Parent"."deleted_at" IS NULL) and "Parent"."id" = parent_id);

ELSE
RETURN (SELECT "Parent"."id", "Parent"."branch_id", "Parent"."first_name", "Parent"."last_name", "Parent"."spouse_first_name", "Parent"."spouse_last_name", "Parent"."primary_mobile", "Parent"."secondary_mobile", "Parent"."primary_email", "Parent"."secondary_email", "Parent"."permanent_residence_address", "Parent"."current_residence_address", "Parent"."occupation", "Parent"."profile_image", "Parent"."is_enabled", "Parent"."city", "Parent"."state", "Parent"."country", "Parent"."created_at", "Parent"."updated_at", "Parent"."deleted_at", "student"."id" AS "student.id",
"student"."first_name" AS "student.first_name", 
"student"."last_name" AS "student.last_name","student"."gender" AS "student.gender",
"student"."aadhar" AS "student.aadhar","student"."date_of_birth" AS "student.date_of_birth",
"student"."date_of_joining","student"."current_grade_level","student"."roll_number",
"student"."branch_id","b"."branch_name" 
FROM "parent" AS "Parent"
INNER JOIN "student" AS "student" ON "Parent"."id" = "student"."parent_id" 
AND ("student"."deleted_at" IS NULL) 
RIGHT OUTER JOIN "school_branch" AS b ON "b"."id" = "student"."branch_id"
WHERE ("Parent"."deleted_at" IS NULL) and "Parent"."id" = parent_id);

 END IF;

END;
$$ LANGUAGE plpgsql;