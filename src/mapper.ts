""import { xml2json } from 'xml-js';

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
    customInfo: {
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
console.log(jsonXml.Invoice['cbc:ID']._text);
const invoice:Partial < Invoice > = {
    ref: jsonXml.Invoice['cbc:ID']._text,
    issued: jsonXml.Invoice['cbc:IssueDate']._text,
    // recipient: {
    //     taxId: jsonXml.recipient.taxId._text,
    //     name: jsonXml.recipient.name._text,
    //     address: {
    //         city: jsonXml.recipient.address.city._text,
    //         country: jsonXml.recipient.address.country._text,
    //         line1: jsonXml.recipient.address.line1._text,
    //         line2: jsonXml.recipient.address.line2._text,
    //         postalCode: jsonXml.recipient.address.postalCode._text,
    //         state: jsonXml.recipient.address.state._text
    //     }
    // },
    lines: jsonXml.Invoice['cac:InvoiceLine'].map((line: any) => {
        console.log('line:', line);
        console.log('line[\'cbc:Item\']:', line['cbc:Item']);
        return {
            name: line['cac:Item']['cbc:Name']._text,
            description: line['cac:Item']['cbc:Description']._text,
            quantity: line['cbc:InvoicedQuantity']._text,
            price: {
                amount: parseFloat(line['cac:Price']['cbc:PriceAmount']._text)
            },
            vat: {
                amount: parseFloat(line['cac:TaxTotal']['cbc:TaxAmount']._text),
                type: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cac:TaxScheme']['cbc:Name']._text,
                code: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cac:TaxScheme']['cbc:ID']._text,
                exemptReason: line['cac:TaxTotal']['cac:TaxSubtotal']['cac:TaxCategory']['cbc:TaxExemptionReason']?._text
            },
            unit: line['cbc:InvoicedQuantity']['@unitCode']
        };
    })
    // total: {
    //     amount: jsonXml.total.amount._text
    // },
    // customInfo: {
    //     chn: {
    //         invoiceCode: jsonXml.customInfo.chn.invoiceCode._text,
    //         checkCode: jsonXml.customInfo.chn.checkCode._text
    //     }
    // }
};

// if (invoice.total.amount < 10000) {
//     invoice.customInfo = jsonXml.customInfo;
// }
// @ts-ignore
return invoice;
};

return {
    ingestInvoice
};
};""