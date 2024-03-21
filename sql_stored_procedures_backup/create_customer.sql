CREATE OR REPLACE PROCEDURE public.create_customer(
IN office json, IN personal json, IN kycVerification json, IN clientId int,
	INOUT statusFlag int DEFAULT 0
)
 LANGUAGE plpgsql

AS $procedure$



DECLARE

	customer_id int;
	randomNum int;
	MYRAND INT;

BEGIN

  IF office is null OR personal is null OR kycVerification is null OR clientId is null THEN

    RAISE EXCEPTION 'input cannot be null';

  END IF;
	
	/**
	Customers master table
	**/
	MYRAND := (SELECT CAST(1000000000 + floor(random() * 900000000) AS bigint));
	
	INSERT INTO customers (docket_no, constitution_type,constitution_type_others,
						  customer_number,customer_branch,kyc_number,
						  account_type,account_type_details,client_id,created_by,updated_by,created_at,updated_at)
 (select (concat('D-',MYRAND))::text, (d->>'CONSTI_TYPE')::text, 
 (d->>'CONSTI_TYPE_OTHERS')::text,(d->>'custNo')::text, 
 (d->>'custBranch')::text,(d->>'CKYC_NO')::text,
 (d->>'ACC_TYPE')::text,(d->>'acntTypeDetails')::json,clientId,(d->>'createdBy')::integer, 
 (d->>'updatedBy')::integer,NOW(), 
 NOW()
  from json_array_elements(office) as d)RETURNING id into customer_id;

/**
Customer personal details
**/
INSERT INTO public.customer_details 
(customer_id,title,first_name,middle_name,last_name,full_name,aadhar,pan,email,mobile_code,mobile,details,address,identity_details,client_id,created_at,updated_at)
 (select (customer_id)::integer, (e->>'PREFIX')::text, 
 (e->>'FNAME')::text,(e->>'MNAME')::text, 
 (e->>'LNAME')::text,(e->>'FULLNAME')::text,(e->>'aadharNum')::text,
 (e->>'PAN')::text,(e->>'EMAIL')::text,(e->>'MOB_CODE')::text,(e->>'MOB_NUM')::text,(e->>'dependents')::json,(e->>'address')::json,(e->>'identityDetails')::json,clientId,NOW(), 
 NOW() from json_array_elements(personal) as e);
 
 /**
Customer kyc details
**/
INSERT INTO public.customer_kyc_details 
(customer_id,received_document,verification_date,employee_name,
 employee_code,employee_designation,employee_branch,institution_code,institution_name,
remarks,declaration_date,declaration_place,client_id,created_at,updated_at)
 (select (customer_id)::integer, (f->>'DOC_SUB')::text, 
 (f->>'KYC_DATE')::text,(f->>'KYC_NAME')::text, 
 (f->>'KYC_EMPCODE')::text,(f->>'KYC_DESIGNATION')::text,
 (f->>'KYC_BRANCH')::text,(f->>'ORG_CODE')::text,(f->>'ORG_NAME')::text,
  (f->>'REMARKS')::text,(f->>'DEC_DATE')::text,(f->>'DEC_PLACE')::text,clientId,NOW(), 
 NOW() from json_array_elements(kycVerification) as f) RETURNING 1 into statusFlag;

END;

$procedure$