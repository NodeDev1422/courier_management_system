CREATE OR REPLACE PROCEDURE public.update_bulk_customer_response(
IN customerStatusArr json, IN customerRemarksArr json, IN moduleType text, clientId int,bulkfileId int,respFilename text)
 LANGUAGE plpgsql

AS $procedure$

DECLARE

   cust_id int;
   customerStatus json;
   op int;

BEGIN

	IF moduleType = 'RES0' THEN
		BEGIN
		update bulkfile_batch_logs set res0_file = respFilename where id=bulkfileId;
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
		IF moduleType = 'RES1' THEN
		update bulkfile_batch_logs set res1_file =respFilename where id=bulkfileId;
		END IF;
		IF moduleType = 'RES2' THEN
		update bulkfile_batch_logs set second_resp_file =respFilename where id=bulkfileId;
		END IF;
		
	 FOR customerStatus IN SELECT * FROM json_array_elements(customerStatusArr)
  LOOP
    /*RAISE NOTICE 'output from space %', customerStatus->>'id';
	  RAISE NOTICE 'output from space %', customerStatus->>'status_id';*/
	update customers set status_id = (customerStatus->>'status_id')::int,
	kyc_number = (customerStatus->>'kyc_number')::text,
	reference_number = (customerStatus->>'reference_number')::text,
	ckyc_remarks = (customerStatus->>'ckyc_remarks')::text,
	ckyc_stage = (customerStatus->>'ckyc_stage')::text,
	is_reconciliation_done= 'N',
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