CREATE OR REPLACE PROCEDURE public.bulk_insert_masterData(
IN masterData json, IN moduleName text)
 LANGUAGE plpgsql

AS $procedure$

DECLARE

   cust_id int;
   customerDocs json;
   op int;

BEGIN

	
	FOR masterData IN SELECT * FROM json_array_elements(masterData)
  LOOP
    /*RAISE NOTICE 'output from space %', customerStatus->>'id';
	  RAISE NOTICE 'output from space %', customerDocs->>'id';*/
	 IF (moduleName = 'uploadMaster') THEN
	 
	 IF EXISTS (SELECT * FROM upload_master where master_id=(masterData->>'masterId')::int and
				   text=masterData->>'text' and value=masterData->>'value' and client_id=(masterData->>'clientId')::int ) THEN
    /*  RAISE NOTICE ' found record id=%';  */
  ELSE
      
	  INSERT INTO public.upload_master (text,value,master_id,status,created_at,updated_at,
									   client_id)
 	values ((masterData->>'text')::text,(masterData->>'value')::text,
			(masterData->>'masterId')::int,1,
		   NOW(),
		   NOW(),(masterData->>'clientId')::int);
	  
	  
 END IF;
	  
	/* */
  END IF;
  
  
   IF (moduleName = 'districtMaster') THEN
	 
	 IF EXISTS (SELECT * FROM district_master where pincode=(masterData->>'pinCode') and
				   state_name=masterData->>'state' and state_code=masterData->>'stateCode' 
				and district_name=masterData->>'district'
				and client_id=(masterData->>'clientId')::int ) THEN
    /*  RAISE NOTICE ' found record id=%';  */
  ELSE
      
	  INSERT INTO public.district_master (pincode,state_name,state_code,district_name,status,created_at,updated_at,
									   client_id)
 	values ((masterData->>'pinCode')::text,(masterData->>'state')::text,(masterData->>'stateCode')::text,
			(masterData->>'district')::text,1,
		   NOW(),
		   NOW(),(masterData->>'clientId')::int);
	  
	  
 END IF;
	  
	/* */
  END IF;
  
  
		END LOOP;
		
END;

$procedure$