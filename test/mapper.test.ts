// Desc: Test suite for the Mapper function
import { Mapper, MapperInterface, Invoice, CreditNote } from '../src/mapper';
// Default invoice XML
const DEFAULT_INVOICE=`<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
        xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
        xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
        xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
        xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
    <cbc:CustomizationID>OIOUBL-2.1</cbc:CustomizationID>
    <cbc:ProfileID schemeAgencyID="320" schemeID="urn:oioubl:id:profileid-1.2">urn:www.nesubl.eu:profiles:profile5:ver2.0</cbc:ProfileID>
    <cbc:ID>A00095678</cbc:ID>
    <cbc:CopyIndicator>false</cbc:CopyIndicator>
    <cbc:UUID>9756b4d0-8815-1029-857a-e388fe63f399</cbc:UUID>
    <cbc:IssueDate>2005-11-20</cbc:IssueDate>
    <cbc:InvoiceTypeCode listAgencyID="320" listID="urn:oioubl:codelist:invoicetypecode-1.1">380</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>DKK</cbc:DocumentCurrencyCode>
    <cbc:AccountingCost>5250124502</cbc:AccountingCost>
    <cac:OrderReference>
        <cbc:ID>5002701</cbc:ID>
        <cbc:UUID>9756b468-8815-1029-857a-e388fe63f399</cbc:UUID>
        <cbc:IssueDate>2005-11-01</cbc:IssueDate>
    </cac:OrderReference>
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cbc:EndpointID schemeID="DK:CVR">DK16356706</cbc:EndpointID>
            <cac:PartyIdentification>
                <cbc:ID schemeID="DK:CVR">DK16356706</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
                <cbc:Name>Tavleverandøren</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:AddressFormatCode listAgencyID="320" listID="urn:oioubl:codelist:addressformatcode-1.1">StructuredDK</cbc:AddressFormatCode>
                <cbc:StreetName>Leverandørvej</cbc:StreetName>
                <cbc:BuildingNumber>11</cbc:BuildingNumber>
                <cbc:CityName>Dyssegård</cbc:CityName>
                <cbc:PostalZone>2870</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID schemeID="DK:SE">DK16356706</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                    <cbc:Name>Moms</cbc:Name>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>Tavleleverandøren</cbc:RegistrationName>
                <cbc:CompanyID schemeID="DK:CVR">DK16356706</cbc:CompanyID>
            </cac:PartyLegalEntity>
            <cac:Contact>
                <cbc:ID>23456</cbc:ID>
                <cbc:Name>Hugo Jensen</cbc:Name>
                <cbc:Telephone>15812337</cbc:Telephone>
                <cbc:ElectronicMail>Hugo@tavl.dk</cbc:ElectronicMail>
            </cac:Contact>
        </cac:Party>
    </cac:AccountingSupplierParty>
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cbc:EndpointID schemeAgencyID="9" schemeID="GLN">5798009811578</cbc:EndpointID>
            <cac:PartyIdentification>
                <cbc:ID schemeAgencyID="9" schemeID="GLN">5798009811578</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
                <cbc:Name>Den Lille Skole</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:AddressFormatCode listAgencyID="320" listID="urn:oioubl:codelist:addressformatcode-1.1">StructuredDK</cbc:AddressFormatCode>
                <cbc:StreetName>Fredericiavej</cbc:StreetName>
                <cbc:BuildingNumber>10</cbc:BuildingNumber>
                <cbc:CityName>Helsingør</cbc:CityName>
                <cbc:PostalZone>3000</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:Contact>
                <cbc:ID>7778</cbc:ID>
                <cbc:Name>Hans Hansen</cbc:Name>
                <cbc:Telephone>26532147</cbc:Telephone>
                <cbc:ElectronicMail>Hans@dls.dk</cbc:ElectronicMail>
            </cac:Contact>
        </cac:Party>
    </cac:AccountingCustomerParty>
    <cac:Delivery>
        <cbc:ActualDeliveryDate>2005-11-15</cbc:ActualDeliveryDate>
    </cac:Delivery>
    <cac:PaymentMeans>
        <cbc:ID>1</cbc:ID>
        <cbc:PaymentMeansCode>42</cbc:PaymentMeansCode>
        <cbc:PaymentDueDate>2005-11-25</cbc:PaymentDueDate>
        <cbc:PaymentChannelCode listAgencyID="320" listID="urn:oioubl:codelist:paymentchannelcode-1.1">DK:BANK</cbc:PaymentChannelCode>
        <cac:PayeeFinancialAccount>
            <cbc:ID>1234567890</cbc:ID>
            <cbc:PaymentNote>A00095678</cbc:PaymentNote>
            <cac:FinancialInstitutionBranch>
                <cbc:ID>1234</cbc:ID>
            </cac:FinancialInstitutionBranch>
        </cac:PayeeFinancialAccount>
    </cac:PaymentMeans>
    <cac:PaymentTerms>
        <cbc:ID>1</cbc:ID>
        <cbc:PaymentMeansID>1</cbc:PaymentMeansID>
        <cbc:Amount currencyID="DKK">6312.50</cbc:Amount>
    </cac:PaymentTerms>
    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="DKK">1262.50</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="DKK">5050.00</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="DKK">1262.50</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
                <cbc:Percent>25</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                    <cbc:Name>Moms</cbc:Name>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>
    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount currencyID="DKK">5050.00</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="DKK">1262.50</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="DKK">6312.50</cbc:TaxInclusiveAmount>
        <cbc:PayableAmount currencyID="DKK">6312.50</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>
    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID>
        <cbc:InvoicedQuantity unitCode="EA">1.00</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount currencyID="DKK">5000.00</cbc:LineExtensionAmount>
        <cac:OrderLineReference>
            <cbc:LineID>1</cbc:LineID>
        </cac:OrderLineReference>
        <cac:TaxTotal>
            <cbc:TaxAmount currencyID="DKK">1250.00</cbc:TaxAmount>
            <cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="DKK">5000.00</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="DKK">1250.00</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
                    <cbc:Percent>25</cbc:Percent>
                    <cac:TaxScheme>
                        <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                        <cbc:Name>Moms</cbc:Name>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>
        </cac:TaxTotal>
        <cac:Item>
            <cbc:Description>Hejsetavle</cbc:Description>
            <cbc:Name>Hejsetavle</cbc:Name>
            <cac:SellersItemIdentification>
                <cbc:ID schemeAgencyID="9" schemeID="GTIN">5712345780121</cbc:ID>
            </cac:SellersItemIdentification>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount currencyID="DKK">5000.00</cbc:PriceAmount>
            <cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
            <cbc:OrderableUnitFactorRate>1</cbc:OrderableUnitFactorRate>
        </cac:Price>
    </cac:InvoiceLine>
    <cac:InvoiceLine>
        <cbc:ID>2</cbc:ID>
        <cbc:InvoicedQuantity unitCode="EA">2.00</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount currencyID="DKK">50.00</cbc:LineExtensionAmount>
        <cac:OrderLineReference>
            <cbc:LineID>2</cbc:LineID>
        </cac:OrderLineReference>
        <cac:TaxTotal>
            <cbc:TaxAmount currencyID="DKK">12.50</cbc:TaxAmount>
            <cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="DKK">50.00</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="DKK">12.50</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
                    <cbc:Percent>25</cbc:Percent>
                    <cac:TaxScheme>
                        <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                        <cbc:Name>Moms</cbc:Name>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>
        </cac:TaxTotal>
        <cac:Item>
            <cbc:Description>Beslag</cbc:Description>
            <cbc:Name>Beslag</cbc:Name>
            <cac:SellersItemIdentification>
                <cbc:ID schemeAgencyID="9" schemeID="GTIN">5712345780111</cbc:ID>
            </cac:SellersItemIdentification>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount currencyID="DKK">25.00</cbc:PriceAmount>
            <cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
            <cbc:OrderableUnitFactorRate>1</cbc:OrderableUnitFactorRate>
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>`;
//Invoice with certificate
const DEFAULT_INVOICE_CERTIFICATE = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
	xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
	xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
	<cbc:UBLVersionID>2.1</cbc:UBLVersionID>
	<cbc:CustomizationID>OIOUBL-2.1</cbc:CustomizationID>
	<cbc:ProfileID schemeAgencyID="320" schemeID="urn:oioubl:id:profileid-1.2"
		>urn:www.nesubl.eu:profiles:profile5:ver2.0</cbc:ProfileID>
	<cbc:ID>Test2012-2021</cbc:ID>
	<cbc:CopyIndicator>false</cbc:CopyIndicator>
	<cbc:IssueDate>2021-12-01</cbc:IssueDate>
	<cbc:InvoiceTypeCode listAgencyID="320" listID="urn:oioubl:codelist:invoicetypecode-1.1"
		>380</cbc:InvoiceTypeCode>
	<cbc:Note languageID="da">Faktura med certifikat artikler</cbc:Note>
	<cbc:DocumentCurrencyCode>DKK</cbc:DocumentCurrencyCode>
	<cac:OrderReference>
		<cbc:ID>5002701</cbc:ID>
	</cac:OrderReference>
	<cac:AccountingSupplierParty>
		<cac:Party>
			<cbc:EndpointID schemeAgencyID="9" schemeID="GLN">5798000416604</cbc:EndpointID>
			<cac:PartyIdentification>
				<cbc:ID schemeAgencyID="9" schemeID="GLN">5798000416642</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>Erhvervsstyrelsen</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:AddressFormatCode listAgencyID="320"
					listID="urn:oioubl:codelist:addressformatcode-1.1"
					>StructuredDK</cbc:AddressFormatCode>
				<cbc:StreetName>Langelinie Allé</cbc:StreetName>
				<cbc:BuildingNumber>17</cbc:BuildingNumber>
				<cbc:CityName>København</cbc:CityName>
				<cbc:PostalZone>2100</cbc:PostalZone>
				<cac:Country>
					<cbc:IdentificationCode>DK</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Erhvervsstyrelsen</cbc:RegistrationName>
				<cbc:CompanyID schemeID="DK:CVR">DK16356709</cbc:CompanyID>
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:ID>90015</cbc:ID>
				<cbc:Name>Kundecenter</cbc:Name>
				<cbc:Telephone>72200030</cbc:Telephone>
				<cbc:ElectronicMail>erst@erst.dk</cbc:ElectronicMail>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingSupplierParty>
	<cac:AccountingCustomerParty>
		<cac:Party>
			<cbc:EndpointID schemeAgencyID="9" schemeID="GLN">5798000416604</cbc:EndpointID>
			<cac:PartyIdentification>
				<cbc:ID schemeAgencyID="9" schemeID="GLN">5798000416642</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>Erhvervsstyrelsen</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:AddressFormatCode listAgencyID="320"
					listID="urn:oioubl:codelist:addressformatcode-1.1"
					>StructuredDK</cbc:AddressFormatCode>
				<cbc:StreetName>Langelinie Allé</cbc:StreetName>
				<cbc:BuildingNumber>17</cbc:BuildingNumber>
				<cbc:CityName>København</cbc:CityName>
				<cbc:PostalZone>2100</cbc:PostalZone>
				<cac:Country>
					<cbc:IdentificationCode>DK</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Erhvervsstyrelsen</cbc:RegistrationName>
				<cbc:CompanyID schemeID="DK:CVR">DK16356709</cbc:CompanyID>
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:ID>90015</cbc:ID>
				<cbc:Name>Kundecenter</cbc:Name>
				<cbc:Telephone>72200030</cbc:Telephone>
				<cbc:ElectronicMail>erst@erst.dk</cbc:ElectronicMail>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingCustomerParty>
	<cac:PaymentMeans>
		<cbc:ID>1</cbc:ID>
		<cbc:PaymentMeansCode>42</cbc:PaymentMeansCode>
		<cbc:PaymentDueDate>2006-04-25</cbc:PaymentDueDate>
		<cbc:PaymentChannelCode listAgencyID="320"
			listID="urn:oioubl:codelist:paymentchannelcode-1.1">DK:BANK</cbc:PaymentChannelCode>
		<cac:PayeeFinancialAccount>
			<cbc:ID>0005704966</cbc:ID>
			<cbc:PaymentNote>A00095678</cbc:PaymentNote>
			<cac:FinancialInstitutionBranch>
				<cbc:ID>9544</cbc:ID>
			</cac:FinancialInstitutionBranch>
		</cac:PayeeFinancialAccount>
	</cac:PaymentMeans>
	<cac:PaymentTerms>
		<cbc:ID>1</cbc:ID>
		<cbc:PaymentMeansID>1</cbc:PaymentMeansID>
		<cbc:Amount currencyID="DKK">453.95</cbc:Amount>
	</cac:PaymentTerms>
	<cac:TaxTotal>
		<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
		<cac:TaxSubtotal>
			<cbc:TaxableAmount currencyID="DKK">363.16</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1"
					>StandardRated</cbc:ID>
				<cbc:Percent>25</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1"
						>63</cbc:ID>
					<cbc:Name>Moms</cbc:Name>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
	</cac:TaxTotal>
	<cac:LegalMonetaryTotal>
		<cbc:LineExtensionAmount currencyID="DKK">363.16</cbc:LineExtensionAmount>
		<cbc:TaxExclusiveAmount currencyID="DKK">90.79</cbc:TaxExclusiveAmount>
		<cbc:TaxInclusiveAmount currencyID="DKK">453.95</cbc:TaxInclusiveAmount>
		<cbc:PayableAmount currencyID="DKK">453.95</cbc:PayableAmount>
	</cac:LegalMonetaryTotal>
	<cac:InvoiceLine>
		<cbc:ID>1</cbc:ID>
		<cbc:InvoicedQuantity unitCode="EA">1.00</cbc:InvoicedQuantity>
		<cbc:LineExtensionAmount currencyID="DKK">363.16</cbc:LineExtensionAmount>
		<cac:OrderLineReference>
			<cbc:LineID>1</cbc:LineID>
		</cac:OrderLineReference>
		<cac:TaxTotal>
			<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
			<cac:TaxSubtotal>
				<cbc:TaxableAmount currencyID="DKK">363.16</cbc:TaxableAmount>
				<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
				<cac:TaxCategory>
					<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1"
						>StandardRated</cbc:ID>
					<cbc:Percent>25</cbc:Percent>
					<cac:TaxScheme>
						<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1"
							>63</cbc:ID>
						<cbc:Name>Moms</cbc:Name>
					</cac:TaxScheme>
				</cac:TaxCategory>
			</cac:TaxSubtotal>
		</cac:TaxTotal>
		<cac:Item>
			<cbc:Description>Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15
				(Original)</cbc:Description>
			<cbc:Name>Strømforsyning</cbc:Name>
			<cac:SellersItemIdentification>
				<cbc:ID schemeAgencyID="9" schemeID="GTIN">100054671</cbc:ID>
			</cac:SellersItemIdentification>
			<cac:Certificate>
				<cbc:ID>ENERGY_STAR</cbc:ID>
				<cbc:CertificateTypeCode>NA</cbc:CertificateTypeCode>
				<cbc:CertificateType>NA</cbc:CertificateType>
				<cbc:Remarks>ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings. </cbc:Remarks>
				<cac:IssuerParty>
					<cac:PartyName>
						<cbc:Name>NA</cbc:Name>
					</cac:PartyName>
				</cac:IssuerParty>
			</cac:Certificate>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="DKK">363.16</cbc:PriceAmount>
			<cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
			<cbc:OrderableUnitFactorRate>1</cbc:OrderableUnitFactorRate>
		</cac:Price>
	</cac:InvoiceLine>
</Invoice>
`;
// Default credit note XML
const DEFAULT_CREDIT_NOTE=`<?xml version="1.0" encoding="UTF-8"?>
<CreditNote xmlns="urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2"
            xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
            xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
    <cbc:CustomizationID>OIOUBL-2.1</cbc:CustomizationID>
    <cbc:ProfileID schemeAgencyID="320" schemeID="urn:oioubl:id:profileid-1.2">urn:www.nesubl.eu:profiles:profile5:ver2.0</cbc:ProfileID>
    <cbc:ID>A00095679</cbc:ID>
    <cbc:CopyIndicator>false</cbc:CopyIndicator>
    <cbc:UUID>9756b53a-8815-1029-857a-e388fe63f399</cbc:UUID>
    <cbc:IssueDate>2005-11-20</cbc:IssueDate>
    <cbc:DocumentCurrencyCode>DKK</cbc:DocumentCurrencyCode>
    <cbc:AccountingCost>5250124502</cbc:AccountingCost>
    <cac:DiscrepancyResponse>
        <cbc:ReferenceID>1</cbc:ReferenceID>
        <cbc:Description>Modregning af forkert faktura</cbc:Description>
    </cac:DiscrepancyResponse>
    <cac:OrderReference>
        <cbc:ID>5002701</cbc:ID>
        <cbc:UUID>9756b468-8815-1029-857a-e388fe63f399</cbc:UUID>
        <cbc:IssueDate>2005-11-01</cbc:IssueDate>
    </cac:OrderReference>
    <cac:BillingReference>
        <cac:InvoiceDocumentReference>
            <cbc:ID>A00095678</cbc:ID>
            <cbc:UUID>9756b4d0-8815-1029-857a-e388fe63f399</cbc:UUID>
            <cbc:IssueDate>2005-11-20</cbc:IssueDate>
        </cac:InvoiceDocumentReference>
    </cac:BillingReference>
    <cac:AccountingSupplierParty>
        <cac:Party>
            <cbc:EndpointID schemeID="DK:CVR">DK16356706</cbc:EndpointID>
            <cac:PartyIdentification>
                <cbc:ID schemeID="DK:CVR">DK16356706</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
                <cbc:Name>Tavleverandøren</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:AddressFormatCode listAgencyID="320" listID="urn:oioubl:codelist:addressformatcode-1.1">StructuredDK</cbc:AddressFormatCode>
                <cbc:StreetName>Leverandørvej</cbc:StreetName>
                <cbc:BuildingNumber>11</cbc:BuildingNumber>
                <cbc:CityName>Dyssegård</cbc:CityName>
                <cbc:PostalZone>2870</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:PartyTaxScheme>
                <cbc:CompanyID schemeID="DK:SE">DK16356706</cbc:CompanyID>
                <cac:TaxScheme>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                    <cbc:Name>Moms</cbc:Name>
                </cac:TaxScheme>
            </cac:PartyTaxScheme>
            <cac:PartyLegalEntity>
                <cbc:RegistrationName>Tavleleverandøren</cbc:RegistrationName>
                <cbc:CompanyID schemeID="DK:CVR">DK16356706</cbc:CompanyID>
            </cac:PartyLegalEntity>
            <cac:Contact>
                <cbc:ID>23456</cbc:ID>
                <cbc:Name>Hugo Jensen</cbc:Name>
                <cbc:Telephone>15812337</cbc:Telephone>
                <cbc:ElectronicMail>Hugo@tavl.dk</cbc:ElectronicMail>
            </cac:Contact>
        </cac:Party>
    </cac:AccountingSupplierParty>
    <cac:AccountingCustomerParty>
        <cac:Party>
            <cbc:EndpointID schemeAgencyID="9" schemeID="GLN">5798009811578</cbc:EndpointID>
            <cac:PartyIdentification>
                <cbc:ID schemeAgencyID="9" schemeID="GLN">5798009811578</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
                <cbc:Name>Den Lille Skole</cbc:Name>
            </cac:PartyName>
            <cac:PostalAddress>
                <cbc:AddressFormatCode listAgencyID="320" listID="urn:oioubl:codelist:addressformatcode-1.1">StructuredDK</cbc:AddressFormatCode>
                <cbc:StreetName>Fredericiavej</cbc:StreetName>
                <cbc:BuildingNumber>10</cbc:BuildingNumber>
                <cbc:CityName>Helsingør</cbc:CityName>
                <cbc:PostalZone>3000</cbc:PostalZone>
                <cac:Country>
                    <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                </cac:Country>
            </cac:PostalAddress>
            <cac:Contact>
                <cbc:ID>7778</cbc:ID>
                <cbc:Name>Hans Hansen</cbc:Name>
                <cbc:Telephone>26532147</cbc:Telephone>
                <cbc:ElectronicMail>Hans@dls.dk</cbc:ElectronicMail>
            </cac:Contact>
        </cac:Party>
    </cac:AccountingCustomerParty>
    <cac:TaxTotal>
        <cbc:TaxAmount currencyID="DKK">1262.50</cbc:TaxAmount>
        <cac:TaxSubtotal>
            <cbc:TaxableAmount currencyID="DKK">5050.00</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="DKK">1262.50</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
                <cbc:Percent>25</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                    <cbc:Name>Moms</cbc:Name>
                </cac:TaxScheme>
            </cac:TaxCategory>
        </cac:TaxSubtotal>
    </cac:TaxTotal>
    <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount currencyID="DKK">5050.00</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="DKK">1262.50</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="DKK">6312.50</cbc:TaxInclusiveAmount>
        <cbc:PayableAmount currencyID="DKK">6312.50</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>
    <cac:CreditNoteLine>
        <cbc:ID>1</cbc:ID>
        <cbc:CreditedQuantity unitCode="EA">1.00</cbc:CreditedQuantity>
        <cbc:LineExtensionAmount currencyID="DKK">5000.00</cbc:LineExtensionAmount>
        <cac:TaxTotal>
            <cbc:TaxAmount currencyID="DKK">1250.00</cbc:TaxAmount>
            <cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="DKK">5000.00</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="DKK">1250.00</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
                    <cbc:Percent>25</cbc:Percent>
                    <cac:TaxScheme>
                        <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                        <cbc:Name>Moms</cbc:Name>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>
        </cac:TaxTotal>
        <cac:Item>
            <cbc:Description>Hejsetavle</cbc:Description>
            <cbc:Name>Hejsetavle</cbc:Name>
            <cac:SellersItemIdentification>
                <cbc:ID schemeAgencyID="9" schemeID="GTIN">5712345780121</cbc:ID>
            </cac:SellersItemIdentification>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount currencyID="DKK">5000.00</cbc:PriceAmount>
            <cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
            <cbc:OrderableUnitFactorRate>1</cbc:OrderableUnitFactorRate>
        </cac:Price>
    </cac:CreditNoteLine>
    <cac:CreditNoteLine>
        <cbc:ID>2</cbc:ID>
        <cbc:CreditedQuantity unitCode="EA">2.00</cbc:CreditedQuantity>
        <cbc:LineExtensionAmount currencyID="DKK">50.00</cbc:LineExtensionAmount>
        <cac:TaxTotal>
            <cbc:TaxAmount currencyID="DKK">12.50</cbc:TaxAmount>
            <cac:TaxSubtotal>
                <cbc:TaxableAmount currencyID="DKK">50.00</cbc:TaxableAmount>
                <cbc:TaxAmount currencyID="DKK">12.50</cbc:TaxAmount>
                <cac:TaxCategory>
                    <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
                    <cbc:Percent>25</cbc:Percent>
                    <cac:TaxScheme>
                        <cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
                        <cbc:Name>Moms</cbc:Name>
                    </cac:TaxScheme>
                </cac:TaxCategory>
            </cac:TaxSubtotal>
        </cac:TaxTotal>
        <cac:Item>
            <cbc:Description>Beslag</cbc:Description>
            <cbc:Name>Beslag</cbc:Name>
            <cac:SellersItemIdentification>
                <cbc:ID schemeAgencyID="9" schemeID="GTIN">5712345780111</cbc:ID>
            </cac:SellersItemIdentification>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount currencyID="DKK">25.00</cbc:PriceAmount>
            <cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
            <cbc:OrderableUnitFactorRate>1</cbc:OrderableUnitFactorRate>
        </cac:Price>
    </cac:CreditNoteLine>
</CreditNote>`;
//Credit note with certificate
const DEFAULT_CREDIT_NOTE_CERTIFICATE = `<?xml version="1.0" encoding="UTF-8"?>
<CreditNote xmlns="urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2"
	xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
	xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
	<cbc:UBLVersionID>2.1</cbc:UBLVersionID>
	<cbc:CustomizationID>OIOUBL-2.1</cbc:CustomizationID>
	<cbc:ProfileID schemeAgencyID="320" schemeID="urn:oioubl:id:profileid-1.2">urn:www.nesubl.eu:profiles:profile5:ver2.0</cbc:ProfileID>
	<cbc:ID>Test2012-2021</cbc:ID>
	<cbc:CopyIndicator>false</cbc:CopyIndicator>
	<cbc:IssueDate>2021-12-20</cbc:IssueDate>
	<cbc:DocumentCurrencyCode>DKK</cbc:DocumentCurrencyCode>
	<cac:OrderReference>
		<cbc:ID>5002701</cbc:ID>
	</cac:OrderReference>
	<cac:AccountingSupplierParty>
		<cac:Party>
			<cbc:EndpointID schemeAgencyID="9" schemeID="GLN">5798000416604</cbc:EndpointID>
			<cac:PartyIdentification>
				<cbc:ID schemeAgencyID="9" schemeID="GLN">5798000416642</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>Erhvervsstyrelsen</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:AddressFormatCode listAgencyID="320" listID="urn:oioubl:codelist:addressformatcode-1.1">StructuredDK</cbc:AddressFormatCode>
				<cbc:StreetName>Langelinie Allé</cbc:StreetName>
				<cbc:BuildingNumber>17</cbc:BuildingNumber>
				<cbc:CityName>København</cbc:CityName>
				<cbc:PostalZone>2100</cbc:PostalZone>
				<cac:Country>
					<cbc:IdentificationCode>DK</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Erhvervsstyrelsen</cbc:RegistrationName>
				<cbc:CompanyID schemeID="DK:CVR">DK16356709</cbc:CompanyID>
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:ID>90015</cbc:ID>
				<cbc:Name>Kundecenter</cbc:Name>
				<cbc:Telephone>72200030</cbc:Telephone>
				<cbc:ElectronicMail>erst@erst.dk</cbc:ElectronicMail>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingSupplierParty>
	<cac:AccountingCustomerParty>
		<cac:Party>
			<cbc:EndpointID schemeAgencyID="9" schemeID="GLN">5798000416604</cbc:EndpointID>
			<cac:PartyIdentification>
				<cbc:ID schemeAgencyID="9" schemeID="GLN">5798000416642</cbc:ID>
			</cac:PartyIdentification>
			<cac:PartyName>
				<cbc:Name>Erhvervsstyrelsen</cbc:Name>
			</cac:PartyName>
			<cac:PostalAddress>
				<cbc:AddressFormatCode listAgencyID="320" listID="urn:oioubl:codelist:addressformatcode-1.1">StructuredDK</cbc:AddressFormatCode>
				<cbc:StreetName>Langelinie Allé</cbc:StreetName>
				<cbc:BuildingNumber>17</cbc:BuildingNumber>
				<cbc:CityName>København</cbc:CityName>
				<cbc:PostalZone>2100</cbc:PostalZone>
				<cac:Country>
					<cbc:IdentificationCode>DK</cbc:IdentificationCode>
				</cac:Country>
			</cac:PostalAddress>
			<cac:PartyLegalEntity>
				<cbc:RegistrationName>Erhvervsstyrelsen</cbc:RegistrationName>
				<cbc:CompanyID schemeID="DK:CVR">DK16356709</cbc:CompanyID>
			</cac:PartyLegalEntity>
			<cac:Contact>
				<cbc:ID>90015</cbc:ID>
				<cbc:Name>Kundecenter</cbc:Name>
				<cbc:Telephone>72200030</cbc:Telephone>
				<cbc:ElectronicMail>erst@erst.dk</cbc:ElectronicMail>
			</cac:Contact>
		</cac:Party>
	</cac:AccountingCustomerParty>
	<cac:TaxTotal>
		<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
		<cac:TaxSubtotal>
			<cbc:TaxableAmount currencyID="DKK">363.16</cbc:TaxableAmount>
			<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
			<cac:TaxCategory>
				<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
				<cbc:Percent>25</cbc:Percent>
				<cac:TaxScheme>
					<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
					<cbc:Name>Moms</cbc:Name>
				</cac:TaxScheme>
			</cac:TaxCategory>
		</cac:TaxSubtotal>
	</cac:TaxTotal>
	<cac:LegalMonetaryTotal>
		<cbc:LineExtensionAmount currencyID="DKK">363.16</cbc:LineExtensionAmount>
		<cbc:TaxExclusiveAmount currencyID="DKK">90.79</cbc:TaxExclusiveAmount>
		<cbc:TaxInclusiveAmount currencyID="DKK">453.95</cbc:TaxInclusiveAmount>
		<cbc:PayableAmount currencyID="DKK">453.95</cbc:PayableAmount>
	</cac:LegalMonetaryTotal>
	<cac:CreditNoteLine>
		<cbc:ID>1</cbc:ID>
		<cbc:CreditedQuantity unitCode="EA">1.00</cbc:CreditedQuantity>
		<cbc:LineExtensionAmount currencyID="DKK">363.16</cbc:LineExtensionAmount>
		<cac:OrderLineReference>
			<cbc:LineID>1</cbc:LineID>
		</cac:OrderLineReference>
		<cac:TaxTotal>
			<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
			<cac:TaxSubtotal>
				<cbc:TaxableAmount currencyID="DKK">363.16</cbc:TaxableAmount>
				<cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
				<cac:TaxCategory>
					<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxcategoryid-1.1">StandardRated</cbc:ID>
					<cbc:Percent>25</cbc:Percent>
					<cac:TaxScheme>
						<cbc:ID schemeAgencyID="320" schemeID="urn:oioubl:id:taxschemeid-1.1">63</cbc:ID>
						<cbc:Name>Moms</cbc:Name>
					</cac:TaxScheme>
				</cac:TaxCategory>
			</cac:TaxSubtotal>
		</cac:TaxTotal>
		<cac:Item>
			<cbc:Description>Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)</cbc:Description>
			<cbc:Name>Strømforsyning</cbc:Name>
			<cac:SellersItemIdentification>
				<cbc:ID schemeAgencyID="9" schemeID="GTIN">100054671</cbc:ID>
			</cac:SellersItemIdentification>
			<cac:Certificate>
				<cbc:ID>ENERGY_STAR</cbc:ID>
				<cbc:CertificateTypeCode>NA</cbc:CertificateTypeCode>
				<cbc:CertificateType>NA</cbc:CertificateType>
				<cbc:Remarks>ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings. </cbc:Remarks>
				<cac:IssuerParty>
					<cac:PartyName>
						<cbc:Name>NA</cbc:Name>
					</cac:PartyName>
				</cac:IssuerParty>
			</cac:Certificate>
		</cac:Item>
		<cac:Price>
			<cbc:PriceAmount currencyID="DKK">363.16</cbc:PriceAmount>
			<cbc:BaseQuantity unitCode="EA">1</cbc:BaseQuantity>
			<cbc:OrderableUnitFactorRate>1</cbc:OrderableUnitFactorRate>
		</cac:Price>
	</cac:CreditNoteLine>
</CreditNote>`;
// Test suite for the Mapper function invoice xml to json.
describe('Mapper', () => {
    let factory: MapperInterface;
    beforeEach(() => {
        factory = Mapper();
    });
    // Test suite for the Mapper function invoice xml to json.
    it('should convert XML to Invoice', () => {
        const expectedJson = {
            customInfo: undefined,
            ref: 'A00095678',
            issued: '2005-11-20',
            lines: [
                {
                    description: 'Hejsetavle',
                    name: 'Hejsetavle',
                    quantity: 1,
                    price: {
                        amount: 5000
                    },
                    vat: {
                        amount: 1250,
                        code: 'StandardRated',
                        type: 'Moms'
                    },
                    unit: 'EA',
                    certificate: undefined
                },
                {
                    description: 'Beslag',
                    name: 'Beslag',
                    quantity: 2,
                    price: {
                        amount: 25
                    },
                    vat: {
                        amount: 12.5,
                        code: 'StandardRated',
                        type: 'Moms'
                    },
                    unit: 'EA',
                    certificate: undefined
                }
            ],
            recipient: {
                name: 'Den Lille Skole',
                address: {
                    country: 'DK',
                    city: 'Helsingør',
                    line1: 'Fredericiavej',
                    line2: '10',
                    postalCode: '3000'
                },
                contact: {
                    mail: 'Hans@dls.dk',
                    phone: '26532147'
                }
            },
            total: {
                amount: 6312.5,
                currency: 'DKK'
            }
        };
        expect(factory.ingestInvoice(DEFAULT_INVOICE)).toEqual(expectedJson);
    });
    // Test suite for the Mapper function invoice CERTIFICATE xml to json.
    it('should convert XML to Invoice with Certificate', () => {
        const expectedJson = {
            ref: 'Test2012-2021',
            issued: '2021-12-01',
            recipient: {
                name: 'Erhvervsstyrelsen',
                contact: {
                    mail: 'erst@erst.dk',
                    phone: '72200030'
                },
                address: {
                    line1: 'Langelinie Allé',
                    line2: '17',
                    city: 'København',
                    country: 'DK',
                    postalCode: '2100'
                }
            },
            lines: [
                {
                    name: 'Strømforsyning',
                    description: 'Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)',
                    quantity: 1,
                    price: {
                        amount: 363.16
                    },
                    vat: {
                        amount: 90.79,
                        type: 'Moms',
                        code: 'StandardRated'
                    },
                    unit: 'EA',
                    certificate: {
                        id: 'ENERGY_STAR',
                        typeCode: 'NA',
                        type: 'NA',
                        remarks: 'ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings.',
                        issuerParty: {
                            name: 'NA'
                        }
                    }
                }
            ],
            total: {
                amount: 453.95,
                currency: 'DKK'
            }
        };
        expect(factory.ingestInvoice(DEFAULT_INVOICE_CERTIFICATE)).toEqual(expectedJson);
    });

    // Test suite for the Mapper function credit note xml to json.
    it('should convert XML to CreditNote', () => {
        const expectedJson = {
            "ref": "A00095679",
            "issued": "2005-11-20",
            "recipient": {
                "name": "Den Lille Skole",
                "contact": {
                    "mail": "Hans@dls.dk",
                    "phone": "26532147"
                },
                "address": {
                    "line1": "Fredericiavej",
                    "line2": "10",
                    "city": "Helsingør",
                    "country": "DK",
                    "postalCode": "3000"
                }
            },
            "lines": [
                {
                    "description": "Hejsetavle",
                    "quantity": 1,
                    "price": {
                        "amount": 5000.00
                    },
                    "vat": {
                        "amount": 1250,
                        "type": "63",
                        "code": "StandardRated"
                    }
                },
                {
                    "description": "Beslag",
                    "quantity": 2,
                    "price": {
                        "amount": 25.00
                    },
                    "vat": {
                        "amount": 12.5,
                        "type": "63",
                        "code": "StandardRated"
                    }
                }
            ],
            "total": {
                "amount": 6312.50,
                "currency": "DKK"
            }
        };
        expect(factory.ingestCreditNote(DEFAULT_CREDIT_NOTE)).toEqual(expectedJson);
    });

    // Test suite for the Mapper function credit note CERTIFICATE xml to json.
    it('should convert XML to CreditNote with Certificate', () => {


        const expectedJson = {
            "ref": "Test2012-2021",
            "issued": "2021-12-20",
            "recipient": {
                "name": "Erhvervsstyrelsen",
                "contact": {
                    "mail": "erst@erst.dk",
                    "phone": "72200030"
                },
                "address": {
                    "line1": "Langelinie Allé",
                    "line2": "17",
                    "city": "København",
                    "country": "DK",
                    "postalCode": "2100"
                }
            },
            "lines": [
                {
                    "description": "Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)",
                    "quantity": 1,
                    "price": {
                        "amount": 363.16
                    },
                    "vat": {
                        "amount": 90.79,
                        "type": "63",
                        "code": "StandardRated"
                    },
                    "certificate": {
                        "id": "ENERGY_STAR",
                        "typeCode": "NA",
                        "type": "NA",
                        "remarks": "ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings. ",
                        "issuerParty": {
                            "name": "NA"
                        }
                    }
                }
            ],
            "total": {
                "amount": 453.95,
                "currency": "DKK"
            }
        };
        expect(factory.ingestCreditNote(DEFAULT_CREDIT_NOTE_CERTIFICATE)).toEqual(expectedJson);
    });

    // Test suite for the Mapper function invoice json to xml.
    it('should convert Invoice JSON to XML', () => {
        const invoice: Invoice = {
            ref: 'A00095678',
            issued: '2005-11-20',
            recipient: {
                name: 'Den Lille Skole',
                contact: {
                    mail: 'Hans@dls.dk',
                    phone: '26532147'
                },
                address: {
                    line1: 'Fredericiavej',
                    line2: '10',
                    city: 'Helsingør',
                    country: 'DK',
                    postalCode: '3000'
                }
            },
            lines: [
                {
                    description: 'Hejsetavle',
                    quantity: 1,
                    price: {
                        amount: 5000
                    },
                    vat: {
                        amount: 1250,
                        code: 'StandardRated',
                        type: 'Moms'
                    },
                    unit: 'EA',
                    certificate: undefined
                },
                {
                    description: 'Beslag',
                    quantity: 2,
                    price: {
                        amount: 25
                    },
                    vat: {
                        amount: 12.5,
                        code: 'StandardRated',
                        type: 'Moms'
                    },
                    unit: 'EA',
                    certificate: undefined
                }
            ],
            total: {
                amount: 6312.5,
                currency: 'DKK'
            }
        };
    
    const expectedXml = `<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
        <cbc:ID>A00095678</cbc:ID>
        <cbc:IssueDate>2005-11-20</cbc:IssueDate>
        <cac:AccountingCustomerParty>
            <cac:Party>
                <cac:PartyName>
                    <cbc:Name>Den Lille Skole</cbc:Name>
                </cac:PartyName>
                <cac:Contact>
                    <cbc:ElectronicMail>Hans@dls.dk</cbc:ElectronicMail>
                    <cbc:Telephone>26532147</cbc:Telephone>
                </cac:Contact>
                <cac:PostalAddress>
                    <cbc:StreetName>Fredericiavej</cbc:StreetName>
                    <cbc:BuildingNumber>10</cbc:BuildingNumber>
                    <cbc:CityName>Helsingør</cbc:CityName>
                    <cbc:PostalZone>3000</cbc:PostalZone>
                    <cac:Country>
                        <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                    </cac:Country>
                </cac:PostalAddress>
            </cac:Party>
        </cac:AccountingCustomerParty>
        <cac:InvoiceLine>
            <cbc:ID>Hejsetavle</cbc:ID>
            <cbc:InvoicedQuantity unitCode="EA">1</cbc:InvoicedQuantity>
            <cbc:LineExtensionAmount currencyID="DKK">5000</cbc:LineExtensionAmount>
            <cac:TaxTotal>
                <cbc:TaxAmount currencyID="DKK">1250</cbc:TaxAmount>
                <cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="DKK">5000</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="DKK">1250</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID>StandardRated</cbc:ID>
                        <cbc:Percent>25</cbc:Percent>
                        <cac:TaxScheme>
                            <cbc:ID>StandardRated</cbc:ID>
                            <cbc:Name>Moms</cbc:Name>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>
            </cac:TaxTotal>
            <cac:Item>
                <cbc:Description>Hejsetavle</cbc:Description>
            </cac:Item>
            <cac:Price>
                <cbc:PriceAmount currencyID="DKK">5000</cbc:PriceAmount>
            </cac:Price>
        </cac:InvoiceLine>
        <cac:InvoiceLine>
            <cbc:ID>Beslag</cbc:ID>
            <cbc:InvoicedQuantity unitCode="EA">2</cbc:InvoicedQuantity>
            <cbc:LineExtensionAmount currencyID="DKK">25</cbc:LineExtensionAmount>
            <cac:TaxTotal>
                <cbc:TaxAmount currencyID="DKK">12.5</cbc:TaxAmount>
                <cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="DKK">25</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="DKK">12.5</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID>StandardRated</cbc:ID>
                        <cbc:Percent>25</cbc:Percent>
                        <cac:TaxScheme>
                            <cbc:ID>StandardRated</cbc:ID>
                            <cbc:Name>Moms</cbc:Name>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>
            </cac:TaxTotal>
            <cac:Item>
                <cbc:Description>Beslag</cbc:Description>
            </cac:Item>
            <cac:Price>
                <cbc:PriceAmount currencyID="DKK">25</cbc:PriceAmount>
            </cac:Price>
        </cac:InvoiceLine>
        <cac:LegalMonetaryTotal>
            <cbc:PayableAmount currencyID="DKK">6312.5</cbc:PayableAmount>
        </cac:LegalMonetaryTotal>
    </Invoice>`.trim();
    
    const normalizeXml = (xml: string) => xml.replace(/\s+/g, ' ').trim();
            const resultXml = factory.exportInvoice(invoice);
            expect(normalizeXml(resultXml)).toEqual(normalizeXml(expectedXml));
    });

    // Test suite for the Mapper function invoice with certificate json to xml.
    it('should convert Invoice with Certificate JSON to XML', () => {
        const invoiceJson = {
            ref: 'Test2012-2021',
            issued: '2021-12-01',
            recipient: {
                name: 'Erhvervsstyrelsen',
                contact: {
                    mail: 'erst@erst.dk',
                    phone: '72200030'
                },
                address: {
                    line1: 'Langelinie Allé',
                    line2: '17',
                    city: 'København',
                    country: 'DK',
                    postalCode: '2100'
                }
            },
            lines: [
                {
                    description: 'Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)',
                    quantity: 1,
                    price: {
                        amount: 363.16
                    },
                    vat: {
                        amount: 90.79,
                        type: 'Moms',
                        code: 'StandardRated'
                    },
                    unit: 'EA',
                    certificate: {
                        id: 'ENERGY_STAR',
                        typeCode: 'NA',
                        type: 'NA',
                        remarks: 'ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings.',
                        issuerParty: {
                            name: 'NA'
                        }
                    }
                }
            ],
            total: {
                amount: 453.95,
                currency: 'DKK'
            }
        };
        const expectedXml = `
        <Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
            <cbc:ID>Test2012-2021</cbc:ID>
            <cbc:IssueDate>2021-12-01</cbc:IssueDate>
            <cac:AccountingCustomerParty>
                <cac:Party>
                    <cac:PartyName>
                        <cbc:Name>Erhvervsstyrelsen</cbc:Name>
                    </cac:PartyName>
                    <cac:Contact>
                        <cbc:ElectronicMail>erst@erst.dk</cbc:ElectronicMail>
                        <cbc:Telephone>72200030</cbc:Telephone>
                    </cac:Contact>
                    <cac:PostalAddress>
                        <cbc:StreetName>Langelinie Allé</cbc:StreetName>
                        <cbc:BuildingNumber>17</cbc:BuildingNumber>
                        <cbc:CityName>København</cbc:CityName>
                        <cbc:PostalZone>2100</cbc:PostalZone>
                        <cac:Country>
                            <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                        </cac:Country>
                    </cac:PostalAddress>
                </cac:Party>
            </cac:AccountingCustomerParty>
            <cac:InvoiceLine>
                <cbc:ID>Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)</cbc:ID>
                <cbc:InvoicedQuantity unitCode="EA">1</cbc:InvoicedQuantity>
                <cbc:LineExtensionAmount currencyID="DKK">363.16</cbc:LineExtensionAmount>
                <cac:TaxTotal>
                    <cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
                    <cac:TaxSubtotal>
                        <cbc:TaxableAmount currencyID="DKK">363.16</cbc:TaxableAmount>
                        <cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
                        <cac:TaxCategory>
                            <cbc:ID>StandardRated</cbc:ID>
                            <cbc:Percent>25</cbc:Percent>
                            <cac:TaxScheme>
                                <cbc:ID>StandardRated</cbc:ID>
                                <cbc:Name>Moms</cbc:Name>
                            </cac:TaxScheme>
                        </cac:TaxCategory>
                    </cac:TaxSubtotal>
                </cac:TaxTotal>
                <cac:Item>
                    <cbc:Description>Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)</cbc:Description>
                    <cac:Certificate>
                        <cbc:ID>ENERGY_STAR</cbc:ID>
                        <cbc:CertificateTypeCode>NA</cbc:CertificateTypeCode>
                        <cbc:CertificateType>NA</cbc:CertificateType>
                        <cbc:Remarks>ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings.</cbc:Remarks>
                        <cac:IssuerParty>
                            <cac:PartyName>
                                <cbc:Name>NA</cbc:Name>
                            </cac:PartyName>
                        </cac:IssuerParty>
                    </cac:Certificate>
                </cac:Item>
                <cac:Price>
                    <cbc:PriceAmount currencyID="DKK">363.16</cbc:PriceAmount>
                </cac:Price>
            </cac:InvoiceLine>
            <cac:LegalMonetaryTotal>
                <cbc:PayableAmount currencyID="DKK">453.95</cbc:PayableAmount>
            </cac:LegalMonetaryTotal>
        </Invoice>`.trim();
        const normalizeXml = (xml: string) => xml.replace(/\s+/g, ' ').trim();
        const resultXml = factory.exportInvoice(invoiceJson);
        expect(normalizeXml(resultXml)).toEqual(normalizeXml(expectedXml));
    });

    // Test suite for the Mapper function credit note json to xml.
    it('should convert CreditNote JSON to XML', () => {
        const creditNote: CreditNote = {
            ref: 'A00095679',
            issued: '2005-11-20',
            recipient: {
                name: 'Den Lille Skole',
                contact: {
                    mail: 'Hans@dls.dk',
                    phone: '26532147'
                },
                address: {
                    line1: 'Fredericiavej',
                    line2: '10',
                    city: 'Helsingør',
                    country: 'DK',
                    postalCode: '3000'
                }
            },
            lines: [
                {
                    description: 'Hejsetavle',
                    quantity: 1,
                    price: {
                        amount: 5000
                    },
                    vat: {
                        amount: 1250,
                        code: 'StandardRated',
                        type: 'Moms'
                    },
                    certificate: undefined
                },
                {
                    description: 'Beslag',
                    quantity: 2,
                    price: {
                        amount: 25
                    },
                    vat: {
                        amount: 12.5,
                        code: 'StandardRated',
                        type: 'Moms'
                    },
                    certificate: undefined
                }
            ],
            total: {
                amount: 6312.5,
                currency: 'DKK'
            }
        };
    
        const expectedXml = `
    <CreditNote xmlns="urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
        <cbc:ID>A00095679</cbc:ID>
        <cbc:IssueDate>2005-11-20</cbc:IssueDate>
        <cac:AccountingCustomerParty>
            <cac:Party>
                <cac:PartyName>
                    <cbc:Name>Den Lille Skole</cbc:Name>
                </cac:PartyName>
                <cac:Contact>
                    <cbc:ElectronicMail>Hans@dls.dk</cbc:ElectronicMail>
                    <cbc:Telephone>26532147</cbc:Telephone>
                </cac:Contact>
                <cac:PostalAddress>
                    <cbc:StreetName>Fredericiavej</cbc:StreetName>
                    <cbc:BuildingNumber>10</cbc:BuildingNumber>
                    <cbc:CityName>Helsingør</cbc:CityName>
                    <cbc:PostalZone>3000</cbc:PostalZone>
                    <cac:Country>
                        <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                    </cac:Country>
                </cac:PostalAddress>
            </cac:Party>
        </cac:AccountingCustomerParty>
        <cac:CreditNoteLine>
            <cbc:ID>Hejsetavle</cbc:ID>
            <cbc:CreditedQuantity>1</cbc:CreditedQuantity>
            <cbc:LineExtensionAmount currencyID="DKK">5000</cbc:LineExtensionAmount>
            <cac:TaxTotal>
                <cbc:TaxAmount currencyID="DKK">1250</cbc:TaxAmount>
                <cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="DKK">5000</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="DKK">1250</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID>StandardRated</cbc:ID>
                        <cbc:Percent>25</cbc:Percent>
                        <cac:TaxScheme>
                            <cbc:ID>StandardRated</cbc:ID>
                            <cbc:Name>Moms</cbc:Name>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>
            </cac:TaxTotal>
            <cac:Item>
                <cbc:Description>Hejsetavle</cbc:Description>
            </cac:Item>
            <cac:Price>
                <cbc:PriceAmount currencyID="DKK">5000</cbc:PriceAmount>
            </cac:Price>
        </cac:CreditNoteLine>
        <cac:CreditNoteLine>
            <cbc:ID>Beslag</cbc:ID>
            <cbc:CreditedQuantity>2</cbc:CreditedQuantity>
            <cbc:LineExtensionAmount currencyID="DKK">25</cbc:LineExtensionAmount>
            <cac:TaxTotal>
                <cbc:TaxAmount currencyID="DKK">12.5</cbc:TaxAmount>
                <cac:TaxSubtotal>
                    <cbc:TaxableAmount currencyID="DKK">25</cbc:TaxableAmount>
                    <cbc:TaxAmount currencyID="DKK">12.5</cbc:TaxAmount>
                    <cac:TaxCategory>
                        <cbc:ID>StandardRated</cbc:ID>
                        <cbc:Percent>25</cbc:Percent>
                        <cac:TaxScheme>
                            <cbc:ID>StandardRated</cbc:ID>
                            <cbc:Name>Moms</cbc:Name>
                        </cac:TaxScheme>
                    </cac:TaxCategory>
                </cac:TaxSubtotal>
            </cac:TaxTotal>
            <cac:Item>
                <cbc:Description>Beslag</cbc:Description>
            </cac:Item>
            <cac:Price>
                <cbc:PriceAmount currencyID="DKK">25</cbc:PriceAmount>
            </cac:Price>
        </cac:CreditNoteLine>
        <cac:LegalMonetaryTotal>
            <cbc:PayableAmount currencyID="DKK">6312.5</cbc:PayableAmount>
        </cac:LegalMonetaryTotal>
    </CreditNote>`.trim();
    
        const normalizeXml = (xml: string) => xml.replace(/\s+/g, ' ').trim();
        const resultXml = factory.exportCreditNote(creditNote);
        expect(normalizeXml(resultXml)).toEqual(normalizeXml(expectedXml));
    });

    // Test suite for the Mapper function credit note with certificate json to xml.
    it('should convert CreditNote with Certificate JSON to XML', () => {
        const creditNoteJson = {
            ref: 'Test2012-2021',
            issued: '2021-12-20',
            recipient: {
                name: 'Erhvervsstyrelsen',
                contact: {
                    mail: 'erst@erst.dk',
                    phone: '72200030'
                },
                address: {
                    line1: 'Langelinie Allé',
                    line2: '17',
                    city: 'København',
                    country: 'DK',
                    postalCode: '2100'
                }
            },
            lines: [
                {
                    description: 'Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)',
                    quantity: 1,
                    price: {
                        amount: 363.16
                    },
                    vat: {
                        amount: 90.79,
                        type: 'Moms',
                        code: 'StandardRated'
                    },
                    certificate: {
                        id: 'ENERGY_STAR',
                        typeCode: 'NA',
                        type: 'NA',
                        remarks: 'ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings.',
                        issuerParty: {
                            name: 'NA'
                        }
                    }
                }
            ],
            total: {
                amount: 453.95,
                currency: 'DKK'
            }
        };
        const expectedXml = `
        <CreditNote xmlns="urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
            <cbc:ID>Test2012-2021</cbc:ID>
            <cbc:IssueDate>2021-12-20</cbc:IssueDate>
            <cac:AccountingCustomerParty>
                <cac:Party>
                    <cac:PartyName>
                        <cbc:Name>Erhvervsstyrelsen</cbc:Name>
                    </cac:PartyName>
                    <cac:Contact>
                        <cbc:ElectronicMail>erst@erst.dk</cbc:ElectronicMail>
                        <cbc:Telephone>72200030</cbc:Telephone>
                    </cac:Contact>
                    <cac:PostalAddress>
                        <cbc:StreetName>Langelinie Allé</cbc:StreetName>
                        <cbc:BuildingNumber>17</cbc:BuildingNumber>
                        <cbc:CityName>København</cbc:CityName>
                        <cbc:PostalZone>2100</cbc:PostalZone>
                        <cac:Country>
                            <cbc:IdentificationCode>DK</cbc:IdentificationCode>
                        </cac:Country>
                    </cac:PostalAddress>
                </cac:Party>
            </cac:AccountingCustomerParty>
            <cac:CreditNoteLine>
                <cbc:ID>Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)</cbc:ID>
                <cbc:CreditedQuantity>1</cbc:CreditedQuantity>
                <cbc:LineExtensionAmount currencyID="DKK">363.16</cbc:LineExtensionAmount>
                <cac:TaxTotal>
                    <cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
                    <cac:TaxSubtotal>
                        <cbc:TaxableAmount currencyID="DKK">363.16</cbc:TaxableAmount>
                        <cbc:TaxAmount currencyID="DKK">90.79</cbc:TaxAmount>
                        <cac:TaxCategory>
                            <cbc:ID>StandardRated</cbc:ID>
                            <cbc:Percent>25</cbc:Percent>
                            <cac:TaxScheme>
                                <cbc:ID>StandardRated</cbc:ID>
                                <cbc:Name>Moms</cbc:Name>
                            </cac:TaxScheme>
                        </cac:TaxCategory>
                    </cac:TaxSubtotal>
                </cac:TaxTotal>
                <cac:Item>
                    <cbc:Description>Dell Adapter / Strømforsyning 130W til bl.a. Dell XPS 15 (Original)</cbc:Description>
                    <cac:Certificate>
                        <cbc:ID>ENERGY_STAR</cbc:ID>
                        <cbc:CertificateTypeCode>NA</cbc:CertificateTypeCode>
                        <cbc:CertificateType>NA</cbc:CertificateType>
                        <cbc:Remarks>ENERGY STAR is a voluntary government-backed program dedicated to helping individuals protect the environment through energy efficiency. The ENERGY STAR mark is the national symbol for energy efficiency, making it easy for consumers and businesses to identify high-quality, energy-efficient products, homes, and commercial and industrial buildings.</cbc:Remarks>
                        <cac:IssuerParty>
                            <cac:PartyName>
                                <cbc:Name>NA</cbc:Name>
                            </cac:PartyName>
                        </cac:IssuerParty>
                    </cac:Certificate>
                </cac:Item>
                <cac:Price>
                    <cbc:PriceAmount currencyID="DKK">363.16</cbc:PriceAmount>
                </cac:Price>
            </cac:CreditNoteLine>
            <cac:LegalMonetaryTotal>
                <cbc:PayableAmount currencyID="DKK">453.95</cbc:PayableAmount>
            </cac:LegalMonetaryTotal>
        </CreditNote>`.trim();
        const normalizeXml = (xml: string) => xml.replace(/\s+/g, ' ').trim();
        const resultXml = factory.exportCreditNote(creditNoteJson);
        expect(normalizeXml(resultXml)).toEqual(normalizeXml(expectedXml));
    });
});
