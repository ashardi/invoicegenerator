const generatePdf = (data) => {
    const {
        invoiceTitle,
        invoiceNumber,
        dateIssued,
        dueDate,
        billedToName,
        billedToAddress,
        items,
        notes,
        issuedBy,
        bank,
        signature,
    } = data;

    const itemTableBody = [
        ["No", "Description", "Qty", "Unit Price", "Total"],
        ...items.map((item, index) => [
            index + 1,
            item.description,
            item.quantity,
            { text: `$${item.unitPrice.toFixed(2)}`, alignment: 'right' },
            { text: `$${(item.quantity * item.unitPrice).toFixed(2)}`, alignment: 'right' },
        ])
    ];

    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const docDefinition = {
        content: [
            { text: `${invoiceTitle}`, style: "invoiceTitle", alignment: "left" },

            {
                columns: [
                    [
                        { text: `Invoice Number: ${invoiceNumber}` },
                        { text: `Date Issued: ${dateIssued}` },
                        { text: `Due Date: ${dueDate}` },
                    ]
                ],
                margin: [0, 0, 0, 10]
            },

            { text: "Billed To:", style: "subheader" },
            { text: billedToName },
            { text: billedToAddress },

            { text: "\nItems", style: "subheader" },
            {
                table: {
                    widths: [30, '*', 40, 70, 70],
                    body: itemTableBody,
                },
                layout: 'lightHorizontalLines',
                margin: [0, 5, 0, 0]
            },

            {
                columns: [
                    {},
                    {
                        width: 'auto',
                        table: {
                            body: [
                                [
                                    { text: 'Total', bold: true },
                                    { text: `$${totalAmount.toFixed(2)}`, alignment: 'right', bold: true }
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        margin: [0, 5, 0, 0]
                    }
                ]
            },

            notes && {
                text: `\nNotes: ${notes}`,
                margin: [0, 10, 0, 10]
            },

            { text: "Issued By:", style: "subheader" },
            { text: issuedBy.name },
            { text: issuedBy.address },
            { text: issuedBy.phone },

            { text: "\nBank Information:", style: "subheader" },
            {
                columns: [
                    { text: "Account Name:", bold: true, width: 120 },
                    { text: bank.accountName }
                ]
            },
            {
                columns: [
                    { text: "Bank Name:", bold: true, width: 120 },
                    { text: bank.bankName }
                ]
            },
            {
                columns: [
                    { text: "Account Number:", bold: true, width: 120 },
                    { text: bank.accountNumber }
                ]
            },
            {
                columns: [
                    { text: "SWIFT Code:", bold: true, width: 120 },
                    { text: bank.swiftCode }
                ]
            },

            { text: "\nSignature:", style: "subheader" },
            { text: signature.name },
            { text: signature.role },
        ].filter(Boolean),

        styles: {
            invoiceTitle: { fontSize: 22, bold: true, margin: [0, 0, 0, 10] },
            subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        }
    };

    window.pdfMake.createPdf(docDefinition).download(`Invoice-${invoiceNumber || 'draft'}.pdf`);
};

export default generatePdf;