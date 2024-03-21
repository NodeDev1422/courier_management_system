CREATE OR REPLACE PROCEDURE public.update_customer(
IN office json, IN personal json, IN kycVerification json,
	IN custId int,
	INOUT statusFlag int DEFAULT 0
)
 LANGUAGE plpgsql

AS $procedure$

DECLARE

	_customer_id int;
	officeData record;
	personalData record;
	kycVerifyData record;

BEGIN

  IF office is null OR personal is null OR kycVerification is null THEN

    RAISE EXCEPTION 'input cannot be null';

  END IF;
   
   /**
   _customer_id:=customer_id::int;
   **/
	
	/**
	Customers master table update
	**/

  select (d->>'customerId')::integer as customerId,(d->>'CONSTI_TYPE')::text as constitutionType,
   (d->>'CONSTI_TYPE_OTHERS')::text as constitutionTypeOthers,(d->>'custNo')::text as custNo, 
 (d->>'custBranch')::text as custBranch,(d->>'CKYC_NO')::text as kycNo,
 (d->>'ACC_TYPE')::text as acntType,(d->>'acntTypeDetails')::json as acntTypeDetails,
(d->>'applicationType')::enum_customers_application_type as applicationType, 
(d->>'updatedBy')::integer as updatedBy
  INTO officeData from json_array_elements(office) as d;
  
  update customers set constitution_type = officeData.constitutionType,
        constitution_type_others = officeData.constitutionTypeOthers,
		customer_number = officeData.custNo,customer_branch = officeData.custBranch,
		kyc_number = officeData.kycNo,account_type = officeData.acntType,account_type_details=officeData.acntTypeDetails,
		application_type = officeData.applicationType,
		updated_by = officeData.updatedBy,updated_at = NOW()
  where id=custId;
  
  
  	/**
	Customer personal details
	**/
  select (e->>'id')::integer as recId,(e->>'PREFIX')::text as title, 
 (e->>'FNAME')::text as firstName,(e->>'MNAME')::text as middleName, 
 (e->>'LNAME')::text as lastName,(e->>'FULLNAME')::text as fullName,(e->>'aadharNum')::text as aadhar,
 (e->>'PAN')::text as pan,(e->>'EMAIL')::text as email,(e->>'MOB_CODE')::text as mobCode,(e->>'MOB_NUM')::text as mobile,
 (e->>'dependents')::json as dependents,
 (e->>'address')::json as address,(e->>'identity_details')::json as identityDetails INTO personalData from json_array_elements(personal) as e;
  
  update public.customer_details set title = personalData.title,
  first_name = personalData.firstName,middle_name = personalData.middleName,
  last_name = personalData.lastName,full_name = personalData.fullName,aadhar = personalData.aadhar,
  pan = personalData.pan,email = personalData.email,mobile_code = personalData.mobCode,mobile = personalData.mobile,
  details = personalData.dependents,address = personalData.address,identity_details = personalData.identityDetails,
  updated_at = NOW()
  where customer_id=custId;
  
  /**
  Customer KYC details
  **/
  select (f->>'id')::integer as kycId,(f->>'DOC_SUB')::text as documentReceived, 
 (f->>'KYC_DATE')::text as verificationDate,(f->>'KYC_NAME')::text as employeeName, 
 (f->>'KYC_EMPCODE')::text as employeeCode,(f->>'KYC_DESIGNATION')::text as employeDesignation,
 (f->>'KYC_BRANCH')::text as employeeBranch,(f->>'ORG_CODE')::text as instCode,(f->>'ORG_NAME')::text as instName,
  (f->>'REMARKS')::text as remarks,(f->>'DEC_DATE')::text as dod,(f->>'DEC_PLACE')::text as pod
  INTO kycVerifyData from json_array_elements(kycVerification) as f;
  
  update public.customer_kyc_details set received_document = kycVerifyData.documentReceived,
  verification_date = kycVerifyData.verificationDate,employee_name = kycVerifyData.employeeName,
  employee_code = kycVerifyData.employeeCode,employee_designation = kycVerifyData.employeDesignation,
  employee_branch = kycVerifyData.employeeBranch,institution_code = kycVerifyData.instCode,
  institution_name = kycVerifyData.instName,remarks = kycVerifyData.remarks,
  declaration_date = kycVerifyData.dod,declaration_place = kycVerifyData.pod,
  updated_at = NOW()
  where customer_id=custId;
	
END;

$procedure$
