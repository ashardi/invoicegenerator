import { useState } from "react";
import { useEffect } from "react";
import generatePdf from "../utils/generatePdf";

const predefData = {
    invoiceTitle: "INVOICE",
    invoiceNumber: "INV-001",
    dateIssued: "2025-05-10",
    dueDate: "2025-05-17",
    billedToName: "John Doe",
    billedToAddress: "123 Elm Street\nCityville",
    items: [
        { description: "Website Design", quantity: 1, unitPrice: 500 },
        { description: "Maintenance (3 months)", quantity: 3, unitPrice: 100 },
    ],
    notes: "Thank you for your business.",
    issuedBy: {
        name: "Ashardi Dev",
        address: "Jl. Sukajadi 123\nBandung",
        phone: "+62 812 3456 7890",
    },
    bank: {
        accountName: "Ashardi Dev",
        bankName: "Bank BCA",
        accountNumber: "1234567890",
        swiftCode: "CENAIDJA",
    },
    signature: {
        name: "Anton Ashardi",
        role: "Project Owner",
    },
};

const InvoiceForm = () => {
    const [formData, setFormData] = useState(predefData);

    const handleGenerate = () => {
        generatePdf(formData);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-800">Invoice Generator</h1>

            {/* Invoice Info */}
            <section className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Invoice Title" className="border p-2 w-full"
                       value={formData.invoiceTitle} onChange={(e) => setFormData({ ...formData, invoiceTitle: e.target.value })} />
                <input type="text" placeholder="Invoice Number" className="border p-2 w-full"
                       value={formData.invoiceNumber} onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })} />
                <input type="date" className="border p-2 w-full"
                       value={formData.dateIssued} onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })} />
                <input type="date" className="border p-2 w-full"
                       value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
            </section>

            {/* Billed To */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Billed To</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="border p-2 w-full"
                           value={formData.billedToName} onChange={(e) => setFormData({ ...formData, billedToName: e.target.value })} />
                    <textarea placeholder="Address" className="border p-2 w-full" rows={2}
                              value={formData.billedToAddress} onChange={(e) => setFormData({ ...formData, billedToAddress: e.target.value })} />
                </div>
            </section>

            {/* Items */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Items</h2>
                <div className="space-y-3">
                    {formData.items.map((item, index) => (
                        <div key={index} className="flex flex-wrap gap-2">
                            <input type="text" placeholder="Description" className="border p-2 flex-1 min-w-[150px]"
                                   value={item.description} onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index].description = e.target.value;
                                setFormData({ ...formData, items: newItems });
                            }} />
                            <input type="number" placeholder="Qty" className="border p-2 w-20"
                                   value={item.quantity} onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index].quantity = parseInt(e.target.value);
                                setFormData({ ...formData, items: newItems });
                            }} />
                            <input type="number" placeholder="Unit Price" className="border p-2 w-32"
                                   value={item.unitPrice} onChange={(e) => {
                                const newItems = [...formData.items];
                                newItems[index].unitPrice = parseFloat(e.target.value);
                                setFormData({ ...formData, items: newItems });
                            }} />
                        </div>
                    ))}
                </div>
                <button onClick={() => setFormData({ ...formData, items: [...formData.items, { description: "", quantity: 1, unitPrice: 0 }] })}
                        className="mt-3 bg-green-500 text-white px-4 py-1 rounded text-sm">
                    + Add Item
                </button>
                <textarea placeholder="Additional Notes" className="border p-2 mt-4 w-full"
                          value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
            </section>

            {/* Issued By */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Issued By</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Your Name" className="border p-2 w-full"
                           value={formData.issuedBy.name} onChange={(e) => setFormData({ ...formData, issuedBy: { ...formData.issuedBy, name: e.target.value } })} />
                    <textarea placeholder="Your Address" className="border p-2 w-full" rows={2}
                              value={formData.issuedBy.address} onChange={(e) => setFormData({ ...formData, issuedBy: { ...formData.issuedBy, address: e.target.value } })} />
                    <input type="text" placeholder="Phone Number" className="border p-2 w-full"
                           value={formData.issuedBy.phone} onChange={(e) => setFormData({ ...formData, issuedBy: { ...formData.issuedBy, phone: e.target.value } })} />
                </div>
            </section>

            {/* Bank Info */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Bank Information</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <input type="text" placeholder="Account Name" className="border p-2 w-full"
                           value={formData.bank.accountName} onChange={(e) => setFormData({ ...formData, bank: { ...formData.bank, accountName: e.target.value } })} />
                    <input type="text" placeholder="Bank Name" className="border p-2 w-full"
                           value={formData.bank.bankName} onChange={(e) => setFormData({ ...formData, bank: { ...formData.bank, bankName: e.target.value } })} />
                    <input type="text" placeholder="Account Number" className="border p-2 w-full"
                           value={formData.bank.accountNumber} onChange={(e) => setFormData({ ...formData, bank: { ...formData.bank, accountNumber: e.target.value } })} />
                    <input type="text" placeholder="SWIFT Code" className="border p-2 w-full"
                           value={formData.bank.swiftCode} onChange={(e) => setFormData({ ...formData, bank: { ...formData.bank, swiftCode: e.target.value } })} />
                </div>
            </section>

            {/* Signature */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Signature</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Signer Name" className="border p-2 w-full"
                           value={formData.signature.name} onChange={(e) => setFormData({ ...formData, signature: { ...formData.signature, name: e.target.value } })} />
                    <input type="text" placeholder="Signer Role" className="border p-2 w-full"
                           value={formData.signature.role} onChange={(e) => setFormData({ ...formData, signature: { ...formData.signature, role: e.target.value } })} />
                </div>
            </section>

            {/* Action Button */}
            <div className="text-right">
                <button onClick={handleGenerate} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default InvoiceForm;