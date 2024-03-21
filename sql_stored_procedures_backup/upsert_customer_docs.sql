CREATE OR REPLACE PROCEDURE public.upsert_customer_docs(
IN customerDocsArr json,IN updateImageFlag json,IN encKey text)
 LANGUAGE plpgsql

AS $procedure$

DECLARE

   cust_id int;
   customerDocs json;
   op int;

BEGIN

	
	FOR customerDocs IN SELECT * FROM json_array_elements(customerDocsArr)
  LOOP
		cust_id:=(customerDocs->>'customer_id')::int;
    /*RAISE NOTICE 'output from space %', customerStatus->>'id';
	  RAISE NOTICE 'output from space %', customerDocs->>'id';*/
	 IF (customerDocs->>'id' = '0') THEN
	 INSERT INTO customer_doc_uploads (customer_id,document_type,document_number,
									   remarks,file,created_at,updated_at,
									   document_master_id,client_id)
 	values ((customerDocs->>'customer_id')::int,(customerDocs->>'document_type')::int,
			pgp_sym_encrypt((customerDocs->>'document_number')::text, encKey),customerDocs->>'remarks',
		   customerDocs->>'file',NOW(),
		   NOW(),(customerDocs->>'document_master_id')::int,(customerDocs->>'client_id')::int);
  ELSE
	update customer_doc_uploads set document_type = (customerDocs->>'document_type')::int,
	document_number = pgp_sym_encrypt((customerDocs->>'document_number')::text,encKey),
	remarks = (customerDocs->>'remarks')::text,
	file = (customerDocs->>'file')::text,
	updated_at = NOW(),document_master_id = (customerDocs->>'document_master_id')::int
  where id=(customerDocs->>'id')::int;
  END IF;
  
  
  
		END LOOP;


		update customers set update_image_flag= updateImageFlag where id=cust_id;
		
END;

$procedure$