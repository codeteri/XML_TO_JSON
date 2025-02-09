import { xml2json } from 'xml-js';
export interface Invoice {
  ref: string;
  issued: string;
  recipient: {
    //   taxId: string;
      name: string;
      contact: {
          mail: string;
          phone?: string;
        };
      address: {
          city: string;
          country: string;
          line1: string;
          line2?: string;
          postalCode: string;
          state?: string;
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
      currency: string;
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
          recipient: {
            // taxId: '', // No equivalent found in the provided XML
            name: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PartyName']['cbc:Name']?._text || '',
            contact: {
                mail: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:Contact']['cbc:ElectronicMail']?._text || '',
                phone: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:Contact']['cbc:Telephone']?._text || ''
            },
            address: {
                line1: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:StreetName']?._text || '',
                // line2: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:BuildingNumber']?._text || '',
                city: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CityName']?._text || '',
                // state: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['<state XML tag>']?._text || '', // No equivalent found in the provided XML
                country: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cac:Country']['cbc:IdentificationCode']?._text || '',
                postalCode: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:PostalZone']?._text || ''
            }
         },
          lines: jsonXml.Invoice['cac:InvoiceLine'].map((line: any) => ({
              description: line['cac:Item']['cbc:Description']?._text || '',
              quantity: parseInt(line['cbc:InvoicedQuantity']._text, 10),
              price: {
                  amount: parseFloat(line['cac:Price']['cbc:PriceAmount']._text)
              },
              vat: {
                  amount: parseInt(line['cac:TaxTotal']['cac:TaxSubtotal']['cbc:TaxAmount']._text, ),
                  type: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cac:TaxScheme']['cbc:ID']._text,
                  code: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cbc:ID']._text
              },
          })),
          total: {
            amount: jsonXml.Invoice['cac:LegalMonetaryTotal']['cbc:PayableAmount']?._text ? parseFloat(jsonXml.Invoice['cac:LegalMonetaryTotal']['cbc:PayableAmount']._text) : 0,
            currency: jsonXml.Invoice['cac:LegalMonetaryTotal']['cbc:PayableAmount']?._attributes?.currencyID || ''
        }
      };
      if (invoice.total!.amount < 10000) {
          invoice.customInfo = jsonXml.customInfo;
      }
      // @ts-ignore
      return invoice as Invoice;
  };
  return { ingestInvoice };
};