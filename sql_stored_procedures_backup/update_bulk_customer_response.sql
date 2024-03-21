CREATE OR REPLACE PROCEDURE public.update_bulk_customer_response(
IN customerStatusArr json, IN customerRemarksArr json, IN moduleType text, clientId int)
 LANGUAGE plpgsql

AS $procedure$

DECLARE

   cust_id int;
   customerStatus json;
   op int;

BEGIN

	IF moduleType = 'RES0' THEN
		BEGIN
		 FOR customerStatus IN SELECT * FROM json_array_elements(customerStatusArr)
  LOOP
    /*RAISE NOTICE 'output from space %', customerStatus->>'id';
	  RAISE NOTICE 'output from space %', customerStatus->>'status_id';*/
	update customers set status_id = (customerStatus->>'status_id')::int,updated_at = NOW()
  where id=(customerStatus->>'id')::int;
  END LOOP;
  
  INSERT INTO customer_remarks (customer_id, user_id,status_id,
						  remarks,created_at,updated_at,client_id)
 (select (d->>'customer_id')::int, 
 (d->>'user_id')::int,(d->>'status_id')::int, 
 (d->>'remarks')::text,NOW(),NOW(),clientId
  from json_array_elements(customerRemarksArr) as d);
		END;
		END IF;

 IF moduleType = 'RES1' or moduleType = 'RES2' THEN
		BEGIN
	 FOR customerStatus IN SELECT * FROM json_array_elements(customerStatusArr)
  LOOP
    /*RAISE NOTICE 'output from space %', customerStatus->>'id';
	  RAISE NOTICE 'output from space %', customerStatus->>'status_id';*/
	update customers set status_id = (customerStatus->>'status_id')::int,
	kyc_number = (customerStatus->>'kyc_number')::text,
	reference_number = (customerStatus->>'reference_number')::text,
	ckyc_remarks = (customerStatus->>'ckyc_remarks')::text,
	ckyc_stage = (customerStatus->>'ckyc_stage')::text,
	updated_at = NOW()
  where id=(customerStatus->>'id')::int;
  END LOOP;
  
  INSERT INTO customer_remarks (customer_id, user_id,status_id,
						  remarks,client_id,created_at,updated_at)
 (select (d->>'customer_id')::int, 
 (d->>'user_id')::int,(d->>'status_id')::int, 
 (d->>'remarks')::text,clientId,NOW(),NOW()
  from json_array_elements(customerRemarksArr) as d);
  END;
 END IF;

END;

$procedure$