select distinct ve.segment1 "Supplier Number",
       ve.vendor_name "Name", 
       st.vendor_site_code "Site",
       hz.party_site_name "Site for search",
       st.country "Cty", 
       st.zip,
       st.city "City", 
       st.state,
       st.address_line1||st.address_line2 "Address",
       st.phone,
       st.fax,
       st.email_address "E-mail", 
       st.supplier_notif_method "Comm",
       st.creation_date "Created On",
       st.inactive_date "Blocked On",
       st.attribute5 "Blocked Reason",
       st.attribute6 "Blocked Comment",
       st.address_lines_alt "Comment",
       st.attribute3 "SAP ID",
       st.attribute7 "Tax ID",
       st.invoice_currency_code "Curr",
       st.attribute2 "Threshold", 
       pp.employee_number "Employee#",
       pp.full_name "Sourcing Manager",
       st.attribute4 "Risk",
       st.attribute8 "Urgent Flag",
       st.attribute9 "Delivery Method",
       st.attribute10 "TPS Fund Status",
       st.attribute11 "PO Transmission Language",
       st.attribute15 "Remittance Language",
       st.attribute12 "Source System",
       st.attribute14 "Site Number",
       usr2.description "Last Update By",
       st.last_update_date,
       st.attribute_category, 
       st.terms_id,
       st.invoice_currency_code,
       st.payment_currency_code,
       st.purchasing_site_flag,
       st.rfq_only_site_flag,
       loc1.location_code "Ship-to",
       loc2.location_code "Bill-to"
from   ap.ap_suppliers ve,
       ap.ap_supplier_sites_all st,
       apps.per_people_f pp,
       apps.fnd_user usr2,
       hr.hr_locations_all loc1,
       hr.hr_locations_all loc2,
       ar.hz_party_sites hz
 where st.vendor_id = ve.vendor_id
 and st.org_id in (:ORG_ID)
 and st.last_updated_by = usr2.user_id
 and st.attribute1 = pp.person_id(+)
 and st.party_site_id = hz.party_site_id
 and st.ship_to_location_id = loc1.location_id(+)
 and st.bill_to_location_id = loc2.location_id(+)

-- and ve.segment1 in ('')                         -- search for supplier id
-- and st.attribute3 in ('')                    -- search for legacy id
-- and pp.employee_number in ('')            -- search for gatekeeper id
 and upper(ve.vendor_name) like upper('ENRIQUE RAMOS%')      -- search for vendor name
-- and nvl(st.inactive_date, sysdate) >= sysdate        -- search for active vendors
order by 2;