select distinct 
      poh.org_id "Org ID",
      org.name "Org Name",
      poh.segment1 po, 
      poh.revision_num rev, 
      poh.creation_date "PO Date",
      preqh.segment1 pr,
      preqh.creation_date "PR Date", 
      nvl(poh.authorization_status,'INCOMPLETE') "Status",
      pll.closed_code lstat,
      pp1.employee_number "Requestor", pp1.full_name "Requestor Name",
      pp3.employee_number "Preparer", pp3.full_name "Preparer Name",
      pll.line_num "PO Line",
      preql.line_num "PR Line",
      cat.segment1||'.'||cat.segment2||'.'||cat.segment3||'.'||cat.segment4||'.'||cat.segment5 unspc,
      pll.item_description "Description",
      pll.vendor_product_num "Supplier Item",
      pll.unit_price "Price",
      poh.currency_code "Curr",
      round((dist.quantity_ordered*pll.unit_price),2) "Value",
      round(dist.quantity_ordered*pll.unit_price*nvl(dist.rate,1)*nvl((select rt.conversion_rate
         from gl.gl_daily_rates rt
        where rt.to_currency = 'USD'
          and trunc(rt.conversion_date) = trunc(nvl(preqh.creation_date, poh.creation_date))
          and rt.conversion_type = 'Corporate'
          and rt.from_currency = gs.currency_code
      ),1),2) "Value (USD)",
      dist.quantity_ordered "Ordered",
      dist.quantity_delivered "Delivered",
      dist.quantity_ordered-dist.quantity_delivered "Open",
      pll.unit_meas_lookup_code uom,
      to_char(pol.need_by_date,'YYYY-MM-DD') "Need By Date",
      gl.segment1||'.'||gl.segment2||'.'||gl.segment3||'.'||gl.segment4||'.'||gl.segment5||'.'||gl.segment6||'.'||gl.segment7||'.'||gl.segment8||'.'||gl.segment9 "Charge Account",
      substr(ve.vendor_name,1,35) "Vendor",
      st.country "Ctry",
      st.vendor_site_code "Site",
      ve.segment1||st.attribute14 gslven,
      st.inactive_date "Blocked on",
      poh.note_to_vendor "Additonal Text",
      poh.approved_date "Last Released",
      preqh.note_to_authorizer "Comment",
      preql.note_to_agent "Note to Buyer",
      pol.receipt_required_flag "3WM",
      st.attribute4 "Risk"
 from  po.po_headers_all poh, 
       po.po_distributions_all dist, 
       po.po_lines_all pll, 
       po.po_line_locations_all pol, 
       gl.gl_code_combinations gl,
       ap.ap_suppliers ve,
       ap.ap_supplier_sites_all st,
       apps.per_people_f pp1,
       apps.per_people_f pp3,
       po.po_requisition_lines_all preql, 
       po.po_requisition_headers_all preqh,
       inv.mtl_categories_b cat,
       apps.hr_organization_units org,
       gl_sets_of_books gs,
       financials_system_params_all os
where 
      poh.org_id in (:ORG_ID)
  and org.organization_id = poh.org_id
  and poh.po_header_id = pll.po_header_id
  and pol.po_line_id = pll.po_line_id
  and pll.po_line_id = dist.po_line_id
  and dist.code_combination_id = gl.code_combination_id
  and poh.vendor_id = ve.vendor_id(+)
  and poh.vendor_site_id = st.vendor_site_id(+)
  and pll.category_id = cat.category_id
  and nvl(poh.cancel_flag,'N') = 'N'
  and nvl(pll.cancel_flag,'N') = 'N'
  and nvl(pol.cancel_flag,'N') = 'N'
  and dist.deliver_to_person_id = pp1.person_id(+)
  and sysdate > pp1.effective_start_date
  and sysdate < pp1.effective_end_date  
  and preqh.preparer_id = pp3.person_id(+)
  and pol.line_location_id = preql.line_location_id(+)
  and preql.requisition_header_id=preqh.requisition_header_id(+)
  and poh.type_lookup_code = 'STANDARD'
  and os.set_of_books_id = gs.set_of_books_id
  and poh.org_id = os.org_id

--  and poh.segment1 in ('')                        -- filter for PO number
  and to_char(poh.creation_date,'YYYY-MM-DD') >= '2019-07-01'             -- filter for PO date
--  and sysdate-po.creation_date < 91  
order by 6, 3, 14;
