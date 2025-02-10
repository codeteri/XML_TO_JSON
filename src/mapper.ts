import { xml2json, json2xml } from 'xml-js';

// Invoice interface. This is the structure of the invoice object that will be returned by the ingestInvoice function
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
      description: string;
      quantity: number;
      price: {
          amount: number;
      };
      vat: {
          amount: number;
          type: string;
          code: string;
      };
      unit: string;
      certificate?: {
          id: string;
          typeCode: string;
          type: string;
          remarks: string;
          issuerParty: {
              name: string;
          };
      };
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

// CreditNote interface. This is the structure of the credit note object that will be returned by the ingestCreditNote function
export interface CreditNote {
  ref: string;
  issued: string;
  recipient: {
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
      };
  };
  lines: Array<{
      description: string;
      quantity: number;
      price: {
          amount: number;
      };
      vat: {
          amount: number;
          type: string;
          code: string;
      };
      certificate?: {
          id: string;
          typeCode: string;
          type: string;
          remarks: string;
          issuerParty: {
              name: string;
          };
      };
  }>;
  total: {
      amount: number;
      currency: string;
  };
}

// Mapper interface. This is the structure of the Mapper object that will be returned by the Mapper function
export interface MapperInterface {
  ingestInvoice(xml: string): Invoice;
  ingestCreditNote(xml: string): CreditNote;
  exportInvoice(invoice: Invoice): string;
  exportCreditNote(creditNote: CreditNote): string;
}

// Mapper function. This function returns a Mapper object that contains the ingestInvoice and ingestCreditNote functions
export const Mapper = (): MapperInterface => {
  const ingestInvoice = (xml: string): Invoice => {
      const jsonXml = JSON.parse(xml2json(xml, { compact: true }));
      const invoiceLines = Array.isArray(jsonXml.Invoice['cac:InvoiceLine'])? jsonXml.Invoice['cac:InvoiceLine']: [jsonXml.Invoice['cac:InvoiceLine']];
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
                line2: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:BuildingNumber']?._text || '',
                city: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CityName']?._text || '',
                // state: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['<state XML tag>']?._text || '', // No equivalent found in the provided XML
                country: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cac:Country']['cbc:IdentificationCode']?._text || '',
                postalCode: jsonXml.Invoice['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:PostalZone']?._text || ''
            }
          },
          lines: invoiceLines.map((line: any) => ({
          description: line['cac:Item']['cbc:Description']?._text.replace(/\s+/g, ' ').trim() || '',
          name: line['cac:Item']['cbc:Name']?._text || '',
          quantity: parseInt(line['cbc:InvoicedQuantity']._text, 10),
          price: {
              amount: parseFloat(line['cac:Price']['cbc:PriceAmount']._text)
          },
          vat: {
              amount: parseFloat(line['cac:TaxTotal']['cbc:TaxAmount']._text),
              type: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cac:TaxScheme']['cbc:Name']._text,
              code: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cbc:ID']._text
          },
          unit: line['cbc:InvoicedQuantity']._attributes.unitCode,
          certificate: line['cac:Item']['cac:Certificate'] ? {
              id: line['cac:Item']['cac:Certificate']['cbc:ID']._text,
              typeCode: line['cac:Item']['cac:Certificate']['cbc:CertificateTypeCode']._text,
              type: line['cac:Item']['cac:Certificate']['cbc:CertificateType']._text,
              remarks: line['cac:Item']['cac:Certificate']['cbc:Remarks']._text.trim(),
              issuerParty: {
                  name: line['cac:Item']['cac:Certificate']['cac:IssuerParty']['cac:PartyName']['cbc:Name']._text
              }
          } : undefined
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

  const ingestCreditNote = (xml: string): CreditNote => {
      const jsonXml = JSON.parse(xml2json(xml, { compact: true }));
      const creditNoteLines = Array.isArray(jsonXml.CreditNote['cac:CreditNoteLine'])
          ? jsonXml.CreditNote['cac:CreditNoteLine']
          : [jsonXml.CreditNote['cac:CreditNoteLine']];
      
      const creditNote: Partial<CreditNote> = {
          ref: jsonXml.CreditNote['cbc:ID']._text,
          issued: jsonXml.CreditNote['cbc:IssueDate']._text,
          recipient: {
              name: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:PartyName']['cbc:Name']?._text || '',
              contact: {
                  mail: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:Contact']['cbc:ElectronicMail']?._text || '',
                  phone: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:Contact']['cbc:Telephone']?._text || ''
              },
              address: {
                  line1: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:StreetName']?._text || '',
                  line2: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:BuildingNumber']?._text || '',
                  city: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CityName']?._text || '',
                  country: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cac:Country']['cbc:IdentificationCode']?._text || '',
                  postalCode: jsonXml.CreditNote['cac:AccountingCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:PostalZone']?._text || ''
              }
          },
          lines: creditNoteLines.map((line: any) => ({
              description: line['cac:Item']['cbc:Description']?._text || '',
              quantity: parseInt(line['cbc:CreditedQuantity']._text, 10),
              price: {
                  amount: parseFloat(line['cac:Price']['cbc:PriceAmount']._text)
              },
              vat: {
                  amount:  parseFloat(line['cac:TaxTotal']['cac:TaxSubtotal']['cbc:TaxAmount']._text,),
                  type: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cac:TaxScheme']['cbc:ID']._text,
                  code: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cbc:ID']._text
              },
              certificate: line['cac:Item']['cac:Certificate'] ? {
                  id: line['cac:Item']['cac:Certificate']['cbc:ID']._text,
                  typeCode: line['cac:Item']['cac:Certificate']['cbc:CertificateTypeCode']._text,
                  type: line['cac:Item']['cac:Certificate']['cbc:CertificateType']._text,
                  remarks: line['cac:Item']['cac:Certificate']['cbc:Remarks']._text,
                  issuerParty: {
                      name: line['cac:Item']['cac:Certificate']['cac:IssuerParty']['cac:PartyName']['cbc:Name']._text
                  }
              } : undefined
          })),
          total: {
              amount: jsonXml.CreditNote['cac:LegalMonetaryTotal']['cbc:PayableAmount']?._text ? parseFloat(jsonXml.CreditNote['cac:LegalMonetaryTotal']['cbc:PayableAmount']._text) : 0,
              currency: jsonXml.CreditNote['cac:LegalMonetaryTotal']['cbc:PayableAmount']?._attributes?.currencyID || ''
          }
      };
      // @ts-ignore
      return creditNote as CreditNote;
  };

  const exportInvoice = (invoice: Invoice): string => {
    const jsonXml: any = {
      Invoice: {
          _attributes: {
              xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
              "xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
              "xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
          },
          "cbc:ID": { _text: invoice.ref },
          "cbc:IssueDate": { _text: invoice.issued },
          "cac:AccountingCustomerParty": {
              "cac:Party": {
                  "cac:PartyName": { "cbc:Name": { _text: invoice.recipient.name } },
                  "cac:Contact": {
                      "cbc:ElectronicMail": { _text: invoice.recipient.contact.mail },
                      "cbc:Telephone": { _text: invoice.recipient.contact.phone }
                  },
                  "cac:PostalAddress": {
                      "cbc:StreetName": { _text: invoice.recipient.address.line1 },
                      "cbc:BuildingNumber": { _text: invoice.recipient.address.line2 },
                      "cbc:CityName": { _text: invoice.recipient.address.city },
                      "cbc:PostalZone": { _text: invoice.recipient.address.postalCode },
                      "cac:Country": { "cbc:IdentificationCode": { _text: invoice.recipient.address.country } }
                  }
              }
          },
          "cac:InvoiceLine": invoice.lines.map(line => ({
              "cbc:ID": { _text: line.description },
              "cbc:InvoicedQuantity": { _attributes: { unitCode: line.unit }, _text: line.quantity.toString() },
              "cbc:LineExtensionAmount": { _attributes: { currencyID: invoice.total.currency }, _text: line.price.amount.toString() },
              "cac:TaxTotal": {
                  "cbc:TaxAmount": { _attributes: { currencyID: invoice.total.currency }, _text: line.vat.amount.toString() },
                  "cac:TaxSubtotal": {
                      "cbc:TaxableAmount": { _attributes: { currencyID: invoice.total.currency }, _text: line.price.amount.toString() },
                      "cbc:TaxAmount": { _attributes: { currencyID: invoice.total.currency }, _text: line.vat.amount.toString() },
                      "cac:TaxCategory": {
                          "cbc:ID": { _text: line.vat.code },
                          "cbc:Percent": { _text: "25" },
                          "cac:TaxScheme": {
                              "cbc:ID": { _text: line.vat.code },
                              "cbc:Name": { _text: line.vat.type }
                          }
                      }
                  }
              },
              "cac:Item": {
                  "cbc:Description": { _text: line.description },
                  ...(line.certificate ? {
                    "cac:Certificate": {
                        "cbc:ID": { _text: line.certificate.id },
                        "cbc:CertificateTypeCode": { _text: line.certificate.typeCode },
                        "cbc:CertificateType": { _text: line.certificate.type },
                        "cbc:Remarks": { _text: line.certificate.remarks },
                        "cac:IssuerParty": {
                            "cac:PartyName": { "cbc:Name": { _text: line.certificate.issuerParty.name } }
                        }
                    }
                } : {})
            },
              "cac:Price": {
                  "cbc:PriceAmount": { _attributes: { currencyID: invoice.total.currency }, _text: line.price.amount.toString() }
              }
          })),
          "cac:LegalMonetaryTotal": {
              "cbc:PayableAmount": { _attributes: { currencyID: invoice.total.currency }, _text: invoice.total.amount.toString() }
          }
      }
  };
  return json2xml(jsonXml, { compact: true, spaces: 4 });
};

  const exportCreditNote = (creditNote: CreditNote): string => {
    const jsonXml: any = {
        CreditNote: {
            _attributes: {
                xmlns: "urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2",
                "xmlns:cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
                "xmlns:cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
            },
            "cbc:ID": { _text: creditNote.ref },
            "cbc:IssueDate": { _text: creditNote.issued },
            "cac:AccountingCustomerParty": {
                "cac:Party": {
                    "cac:PartyName": { "cbc:Name": { _text: creditNote.recipient.name } },
                    "cac:Contact": {
                        "cbc:ElectronicMail": { _text: creditNote.recipient.contact.mail },
                        "cbc:Telephone": { _text: creditNote.recipient.contact.phone }
                    },
                    "cac:PostalAddress": {
                        "cbc:StreetName": { _text: creditNote.recipient.address.line1 },
                        "cbc:BuildingNumber": { _text: creditNote.recipient.address.line2 },
                        "cbc:CityName": { _text: creditNote.recipient.address.city },
                        "cbc:PostalZone": { _text: creditNote.recipient.address.postalCode },
                        "cac:Country": { "cbc:IdentificationCode": { _text: creditNote.recipient.address.country } }
                    }
                }
            },
            "cac:CreditNoteLine": creditNote.lines.map(line => ({
                "cbc:ID": { _text: line.description },
                "cbc:CreditedQuantity": { _text: line.quantity.toString() },
                "cbc:LineExtensionAmount": { _attributes: { currencyID: creditNote.total.currency }, _text: line.price.amount.toString() },
                "cac:TaxTotal": {
                    "cbc:TaxAmount": { _attributes: { currencyID: creditNote.total.currency }, _text: line.vat.amount.toString() },
                    "cac:TaxSubtotal": {
                        "cbc:TaxableAmount": { _attributes: { currencyID: creditNote.total.currency }, _text: line.price.amount.toString() },
                        "cbc:TaxAmount": { _attributes: { currencyID: creditNote.total.currency }, _text: line.vat.amount.toString() },
                        "cac:TaxCategory": {
                            "cbc:ID": { _text: line.vat.code },
                            "cbc:Percent": { _text: "25" },
                            "cac:TaxScheme": {
                                "cbc:ID": { _text: line.vat.code },
                                "cbc:Name": { _text: line.vat.type }
                            }
                        }
                    }
                },
                "cac:Item": {
                    "cbc:Description": { _text: line.description },
                    ...(line.certificate ? {
                        "cac:Certificate": {
                            "cbc:ID": { _text: line.certificate.id },
                            "cbc:CertificateTypeCode": { _text: line.certificate.typeCode },
                            "cbc:CertificateType": { _text: line.certificate.type },
                            "cbc:Remarks": { _text: line.certificate.remarks },
                            "cac:IssuerParty": {
                                "cac:PartyName": { "cbc:Name": { _text: line.certificate.issuerParty.name } }
                            }
                        }
                    } : {})
                },
                "cac:Price": {
                    "cbc:PriceAmount": { _attributes: { currencyID: creditNote.total.currency }, _text: line.price.amount.toString() }
                }
            })),
            "cac:LegalMonetaryTotal": {
                "cbc:PayableAmount": { _attributes: { currencyID: creditNote.total.currency }, _text: creditNote.total.amount.toString() }
            }
        }
    };
    return json2xml(jsonXml, { compact: true, spaces: 4 });
  };

return { ingestInvoice, ingestCreditNote, exportInvoice, exportCreditNote };
};
