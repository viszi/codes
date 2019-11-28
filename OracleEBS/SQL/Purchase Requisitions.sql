 select 
      preqh.org_id "Org ID",
      org.name "Org Name",
      preqh.segment1 pr, 
      preqh.creation_date "PR Date", 
      preqh.authorization_status "Status",
      pp1.employee_number "Requestor", pp1.full_name "Requestor Name",
      pp2.employee_number "Preparer", pp2.full_name "Preparer Name",
      preql.line_num "PR Line",
      cat.segment1||'.'||cat.segment2||'.'||cat.segment3||'.'||cat.segment4||'.'||cat.segment5 unspc,
      preql.item_description "Description", 
      preql.suggested_vendor_product_code "Supplier Item", 
      preql.unit_price "Price",
      nvl(preql.currency_code,gs.currency_code) "Curr", 
      round((dist.req_line_quantity*nvl(preql.currency_unit_price, preql.unit_price)),1) "Value",
      round(dist.req_line_quantity*preql.unit_price*nvl((select rt.conversion_rate
         from gl.gl_daily_rates rt
        where rt.to_currency = 'USD'
          and trunc(rt.conversion_date) = trunc(preqh.creation_date)
          and rt.conversion_type = 'Corporate'
          and rt.from_currency = gs.currency_code
      ),1),2) "Value (USD)",
      dist.req_line_quantity "Ordered",
      0 "Delivered",
      dist.req_line_quantity "Open",
      preql.unit_meas_lookup_code uom,
      to_char(preql.need_by_date,'YYYY-MM-DD') "Need By Date", 
      gl.segment1||'.'||gl.segment2||'.'||gl.segment3||'.'||gl.segment4||'.'||gl.segment5||'.'||gl.segment6||'.'||gl.segment7||'.'||gl.segment8||'.'||gl.segment9 "Charge Account",
      substr(preql.suggested_vendor_name,1,35) "Vendor",
      st.country "Ctry",
      preql.suggested_vendor_location "Site",
      ve.segment1||st.attribute14 gslven,
      st.inactive_date "Blocked on",
      null "Additional Text",
      preqh.approved_date "Last Released",
      preqh.note_to_authorizer "Comment",
      preql.note_to_agent "Note to Buyer",
      l.receiving_flag "3WM",
      st.attribute4 "Risk"
 from 
       po.po_requisition_headers_all preqh,
       po.po_requisition_lines_all preql, 
       po.po_req_distributions_all dist, 
       gl.gl_code_combinations gl,
       ap.ap_suppliers ve,
       ap.ap_supplier_sites_all st,
       hr.per_all_people_f pp1,
       hr.per_all_people_f pp2,
       inv.mtl_categories_b cat,
       po.PO_LINE_TYPES_B l,
       apps.hr_organization_units org,
       gl_sets_of_books gs,
       financials_system_params_all os
 where 
       preqh.org_id in (:ORG_ID)
   and org.organization_id = preqh.org_id
   and preqh.requisition_header_id = preql.requisition_header_id 
   and preql.requisition_line_id = dist.requisition_line_id 
   and gl.code_combination_id = dist.code_combination_id
   and preql.vendor_id = ve.vendor_id(+)
   and preql.vendor_site_id = st.vendor_site_id(+)
   and preql.category_id = cat.category_id
   and preql.to_person_id = pp1.person_id   
   and preqh.preparer_id = pp2.person_id
   and sysdate > pp1.effective_start_date
   and sysdate < pp1.effective_end_date  
   and sysdate > pp2.effective_start_date
   and sysdate < pp2.effective_end_date   
   and nvl(preql.modified_by_agent_flag,'N') = 'N'
   and l.line_type_id = preql.line_type_id
   and os.set_of_books_id = gs.set_of_books_id
   and preqh.org_id = os.org_id

--  and preqh.segment1 in ('')                              -- filter for PR number  
  and to_char(preqh.creation_date,'YYYY-MM-DD') >= '2019-07-01'             -- filter for PR date
--  and sysdate-preqh.creation_date < 91
--  and preqh.authorization_status not in ('APPROVED','INCOMPLETE','REJECTED','SYSTEM_SAVED','CANCELLED')  
order by 4, 3, 8;