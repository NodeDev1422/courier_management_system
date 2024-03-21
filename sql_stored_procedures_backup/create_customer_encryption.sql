CREATE OR REPLACE PROCEDURE public.create_customer(
IN office json, IN personal json, IN kycVerification json, IN clientId int,
	IN encKey text,
	INOUT statusFlag int DEFAULT 0
)
 LANGUAGE plpgsql

AS $procedure$



DECLARE

	customer_id int;
	randomNum int;
	MYRAND INT;
    acntTypeDetails text;
	dependentDetails text;
	addressDetails text;
	identityDetails text;

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
 (d->>'CONSTI_TYPE_OTHERS')::text,pgp_sym_encrypt((d->>'custNo')::text, encKey), 
 (d->>'custBranch')::text,pgp_sym_encrypt(((d->>'CKYC_NO')::text)::text, encKey),
 (d->>'ACC_TYPE')::text,pgp_sym_encrypt((d->>'acntTypeDetails')::text, encKey),clientId,(d->>'createdBy')::integer, 
 (d->>'updatedBy')::integer,NOW(), 
 NOW()
  from json_array_elements(office) as d)RETURNING id into customer_id;

/**
Customer personal details
**/
INSERT INTO public.customer_details 
(customer_id,title,first_name,middle_name,last_name,full_name,aadhar,pan,email,mobile_code,mobile,details,address,identity_details,client_id,created_at,updated_at)
 (select (customer_id)::integer, pgp_sym_encrypt((e->>'PREFIX')::text,encKey), 
 pgp_sym_encrypt((e->>'FNAME')::text,encKey),pgp_sym_encrypt((e->>'MNAME')::text,encKey), 
 pgp_sym_encrypt((e->>'LNAME')::text,encKey),(e->>'FULLNAME')::text,pgp_sym_encrypt((e->>'aadharNum')::text,encKey),
 pgp_sym_encrypt((e->>'PAN')::text,encKey),pgp_sym_encrypt((e->>'EMAIL')::text,encKey),
 pgp_sym_encrypt((e->>'MOB_CODE')::text,encKey),pgp_sym_encrypt((e->>'MOB_NUM')::text,encKey),
 pgp_sym_encrypt((e->>'dependents')::text,encKey),
 pgp_sym_encrypt((e->>'address')::text,encKey),
 pgp_sym_encrypt((e->>'identityDetails')::text,encKey),clientId,NOW(), 
 NOW() from json_array_elements(personal) as e);
 
 /**
Customer kyc details
**/
INSERT INTO public.customer_kyc_details 
(customer_id,received_document,verification_date,employee_name,
 employee_code,employee_designation,employee_branch,institution_code,institution_name,
remarks,declaration_date,declaration_place,client_id,created_at,updated_at)
 (select (customer_id)::integer, (f->>'DOC_SUB')::text, 
 (f->>'KYC_DATE')::text,pgp_sym_encrypt((f->>'KYC_NAME')::text,encKey), 
 pgp_sym_encrypt((f->>'KYC_EMPCODE')::text,encKey),(f->>'KYC_DESIGNATION')::text,
 (f->>'KYC_BRANCH')::text,pgp_sym_encrypt((f->>'ORG_CODE')::text,encKey),pgp_sym_encrypt((f->>'ORG_NAME')::text,encKey),
  (f->>'REMARKS')::text,(f->>'DEC_DATE')::text,(f->>'DEC_PLACE')::text,clientId,NOW(), 
 NOW() from json_array_elements(kycVerification) as f) RETURNING 1 into statusFlag;

END;

$procedure$