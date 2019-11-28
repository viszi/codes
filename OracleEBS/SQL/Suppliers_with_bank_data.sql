select distinct st.org_id, 
       hou.name "Org Name",
       ve.segment1 "Supplier Number",
       ve.vendor_name "Name", 
       ve.vendor_name_alt "Alternate Name",
       ve.num_1099,
       ve.type_1099,
       ve.organization_type_lookup_code "Organization",
       st.vendor_site_code "Site",
       hz.party_site_name "Site for search",
       st.country "Cty", 
       st.state "State",
       st.zip,
       st.city "City", 
       st.address_line1||' '||st.address_line2||' '||st.address_line3||' '||st.address_line4 "Address",
       st.phone "Phone",
       st.fax,
       st.email_address "E-mail", 
       st.supplier_notif_method "Comm",
       st.creation_date "Created On",
       st.inactive_date "Blocked On",
       st.attribute5 "Blocked Reason",
       st.attribute6 "Blocked Comment",
       st.attribute7 "Tax ID",
       st.attribute4 "Risk",
       st.attribute8 "Urgent Flag",
       st.attribute9 "Delivery Method",
       st.attribute10 "TPS Fund Status",
       st.attribute11 "PO Transmission Language",
       st.attribute15 "Remittance Language",
       iepa.remit_advice_delivery_method "Remittance Method",
       iepa.remit_advice_email "Remittance Email",
       iepa.remit_advice_fax "Remittance Fax",
       st.attribute12 "Source System",
       st.attribute14 "Site Number",
       st.invoice_currency_code "Invoice Curr",
       st.payment_currency_code "Payment Curr",
       iepa.default_payment_method_code "Pay Method",
       apt.name "Payment Term",
       st.purchasing_site_flag "Purchasing Site",
       st.rfq_only_site_flag "RFQ Only Site",
       st.pay_site_flag "Pay Site", 
       ipiua.order_of_preference "Priority",
       iao.primary_flag "Primary",
       ieb.bank_name "Bank Name",
       iebb.bank_branch_name "Branch Name",
       iebb.branch_number "Branch Number",
       iebb.country "Branch Ctry",
       iebb.state "Branch State",
       iebb.zip "Branch ZIP",
       iebb.city "Branch City",
       iebb.address_line1||' '||iebb.address_line2||' '||iebb.address_line3||' '||iebb.address_line4 "Branch Address",
       iebb.bank_branch_type "Branch Type",
       iebb.eft_swift_code "SWIFT",
       ieba.bank_account_num "Account Number",
       ieba.iban,
       ieba.currency_code "Bank Acc Curr",
       ieba.bank_account_name "Account Holder",
       ieba.start_date "Account Start Date",
       ieba.end_date "Account End Date"
from   ap.ap_suppliers ve,
       ap.ap_supplier_sites_all st,
        apps.hr_operating_units hou
       ,ar.hz_party_sites hz
       ,iby.iby_account_owners iao
       ,iby.iby_ext_bank_accounts ieba
       ,apps.iby_ext_banks_v ieb
       ,apps.iby_ext_bank_branches_v iebb
       ,iby.iby_external_payees_all iepa
       ,apps.ap_terms apt
       ,iby.iby_pmt_instr_uses_all ipiua
 where st.vendor_id = ve.vendor_id
 and st.org_id in (:ORG_ID)
 
 and st.org_id = hou.organization_id
 and st.party_site_id = hz.party_site_id
 and iao.account_owner_party_id = ve.party_id
 and ieba.ext_bank_account_id = iao.ext_bank_account_id
 and ieb.bank_party_id = iebb.bank_party_id
 and ieba.branch_id = iebb.branch_party_id
 and ieba.bank_id = ieb.bank_party_id
 and nvl(iebb.operation_flag,'N') = 'Y'
 and nvl(ieba.end_date,sysdate) >= sysdate
 and nvl(iebb.end_date,sysdate) >= sysdate
 and nvl(ieb.end_date,sysdate) >= sysdate
 and nvl(ipiua.end_date,sysdate) >= sysdate
 and st.vendor_site_id = iepa.supplier_site_id
 and ve.party_id = iepa.payee_party_id
 and st.terms_id = apt.term_id(+)
 and ipiua.ext_pmt_party_id = iepa.ext_payee_id
 and ipiua.instrument_id = ieba.ext_bank_account_id
 and ipiua.instrument_type = 'BANKACCOUNT'
 and ipiua.payment_flow = 'DISBURSEMENTS'
order by ve.segment1, st.vendor_site_code, ipiua.order_of_preference;
