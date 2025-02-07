import { xml2json } from 'xml-js';

export interface Invoice {
    ref: string;
    issued: string;
    recipient: {
        taxId: string;
        name: string;
        mobile?: string;
        address: {
            city: string;
            country: string;
            line1: string;
            line2: string;
            postalCode: string;
            state: string;
        };
    };
    lines: Array<{
        name: string;
        description: string;
        quantity: string;
        price: {
            amount: number;
        };
        vat: {
            amount: number;
            type: string;
            code: string;
            exemptReason: string;
        };
        unit: string;
    }>;
    total: {
        amount: number;
    };
    customInfo?: {
        chn: {
            invoiceCode: string;
            checkCode: string;
        };
    };
}

export interface MapperInterface {
    ingestInvoice(xml: string): Invoice;
}

export const Mapper = (): MapperInterface => {
    const ingestInvoice = (xml: string): Invoice => {
        const jsonXml = JSON.parse(xml2json(xml, { compact: true }));
        
        const invoice: Partial<Invoice> = {
            ref: jsonXml.Invoice['cbc:ID']._text,
            issued: jsonXml.Invoice['cbc:IssueDate']._text,
            // recipient: {
            //     taxId: jsonXml.Invoice['cac:AccountingCustomerParty']['cbc:CustomerAssignedAccountID']._text,
            //     name: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PartyName']['cbc:Name']._text,
            //     mobile: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Contact']?.['cbc:Telephone']?._text || '',
            //     address: {
            //         city: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CityName']._text,
            //         country: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:Country']['cbc:IdentificationCode']._text,
            //         line1: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:StreetName']._text,
            //         line2: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:AdditionalStreetName']?._text || '',
            //         postalCode: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:PostalZone']._text,
            //         state: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CountrySubentity']._text
            //     }
            // },
            lines: jsonXml.Invoice['cac:InvoiceLine'].map((line: any) => ({
                name: line['cac:Item']['cbc:Name']._text,
                description: line['cac:Item']['cbc:Description']?._text || '',
                quantity: line['cbc:InvoicedQuantity']._text,
                price: {
                    amount: parseFloat(line['cac:Price']['cbc:PriceAmount']._text)
                },
                vat: {
                    amount: parseFloat(line['cac:TaxTotal']['cbc:TaxAmount']._text),
                    type: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cac:TaxScheme']['cbc:ID']._text,
                    code: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cbc:ID']._text,
                    exemptReason: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cbc:TaxExemptionReason']?._text || ''
                },
                unit: line['cbc:InvoicedQuantity'].attributes?.unitCode || ''
            })),
            total: {
                amount: jsonXml.Invoice['cac:LegalMonetaryTotal']['cbc:PayableAmount']?._text ? parseFloat(jsonXml.Invoice['cac:LegalMonetaryTotal']['cbc:PayableAmount']._text) : 0
            }
            // customInfo: {
            //     chn: {
            //         invoiceCode: jsonXml.Invoice['cbc:InvoiceTypeCode']?._text || '',
            //         checkCode: jsonXml.Invoice['cac:Signature']['cbc:ID']?._text || ''
            //     }
            // }
        };

        // if (invoice.total!.amount < 10000) {
        //     invoice.customInfo = jsonXml.customInfo;
        // }
        
        // @ts-ignore
        return invoice as Invoice;
    };

    return { ingestInvoice };
};