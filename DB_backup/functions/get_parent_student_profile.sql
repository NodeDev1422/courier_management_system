DROP FUNCTION parent_student_profile;
CREATE OR REPLACE FUNCTION parent_student_profile(id_value int, access_mode int)
RETURNS json AS $$
BEGIN
   RETURN (
        SELECT json_build_object(
          -- Include all parent fields
          'parentId', "Parent"."id",
          'branchId', "Parent"."branch_id",
          'firstName', "Parent"."first_name",
          'lastName', "Parent"."last_name",
          'spouseFirstName', "Parent"."spouse_first_name",
          'spouseLastName', "Parent"."spouse_last_name",
          'primaryMobile', "Parent"."primary_mobile",
          'secondaryMobile', "Parent"."secondary_mobile",
          'primaryEmail', "Parent"."primary_email",
          'secondaryEmail', "Parent"."secondary_email",
          'permanentResidenceAddress', "Parent"."permanent_residence_address",
          'currentResidenceAddress', "Parent"."current_residence_address",
          'occupation', "Parent"."occupation",
          'profileImage', "Parent"."profile_image",
          'isEnabled', "Parent"."is_enabled",
          'city', "Parent"."city",
          'state', "Parent"."state",
          'country', "Parent"."country",
          'createdAt', "Parent"."created_at",
          -- Include all student fields with "student." prefix
          'children', json_agg(
            json_build_object(
              'id', "student"."id",
              'childFirstName', "student"."first_name",
              'childLastName', "student"."last_name",
              'childGender', "student"."gender",
              'childAadhar', "student"."aadhar",
              'childDateOfBirth', "student"."date_of_birth",
              'childDateOfJoining', "student"."date_of_joining",
              'childCurrentGradeLevel', "student"."current_grade_level",
              'childRollNumber', "student"."roll_number",
              'childBranchId', "student"."branch_id",
			 -- 'school_id', "b"."school_id", 	
             -- 'branch_name', "student"."branch_name"
			  --'school_name', "sch"."school_name"
			  'schoolBranchDetails', json_build_object(
          'schoolId', "b"."school_id",
          'schoolName', "sch"."school_name",
	      'schoolLogo', "sch"."school_logo",
          'branchName', "b"."branch_name",
          'branchPhone', "b"."branch_phone",
          'branchEmail', "b"."branch_email",
          'branchDetails', "b"."branch_details",
		  'branchCode', "b"."branch_code"
        )
            )
          ORDER BY "student"."id"
          )
        )
        FROM "parent" AS "Parent"
        INNER JOIN "student" AS "student" ON "Parent"."id" = "student"."parent_id" 
        AND ("student"."deleted_at" IS NULL) 
        RIGHT OUTER JOIN "school_branch" AS b ON "b"."id" = "student"."branch_id"
	    INNER JOIN "school" AS sch ON "sch"."id" = "b"."school_id"
       -- WHERE ("Parent"."deleted_at" IS NULL) and "Parent"."id" = parent_id_value
	   WHERE (
  CASE
    WHEN access_mode = 1 THEN "student"."deleted_at" IS NULL AND "student"."parent_id" = id_value  -- Case 1: No parent ID specified
    WHEN access_mode = 2 THEN "student"."deleted_at" IS NULL AND "student"."id" = id_value  -- Case 2: Parent ID provided
    -- Add additional cases here if needed
	ELSE
		 "student"."deleted_at" IS NULL AND "student"."parent_id" = NULL  -- Case 2: Parent ID provided
  END
)		   
		GROUP BY "Parent".id  --, "b"."school_id"
      );
   -- WHEN 1 THEN  -- Return total number of children
      RETURN (
        SELECT count(*) AS total_children
        FROM "student" AS "student"
       -- WHERE ("student"."deleted_at" IS NULL) AND 
	--	"student"."parent_id" = parent_id_value
     WHERE (
  CASE
    WHEN access_mode = 1 THEN "student"."deleted_at" IS NULL AND "student"."parent_id" = id_value  -- Case 1: No parent ID specified
    WHEN access_mode = 2 THEN "student"."deleted_at" IS NULL AND "student"."id" = id_value  -- Case 2: Parent ID provided
    -- Add additional cases here if needed
	ELSE
		 "student"."deleted_at" IS NULL AND "student"."parent_id" = NULL  -- Case 2: Parent ID provided
  END
)
	  );


END;
$$ LANGUAGE plpgsql;