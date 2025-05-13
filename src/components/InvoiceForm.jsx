import { useState } from "react";
// import { useEffect } from "react";
import generatePdf from "../utils/generatePdf";

const predefData = {
    invoiceTitle: "",
    invoiceNumber: "",
    dateIssued: "",
    dueDate: "",
    billedToName: "",
    billedToAddress: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    notes: "",
    issuedBy: {
        name: "",
        address: "",
        phone: "",
    },
    bank: {
        accountName: "",
        bankName: "",
        accountNumber: "",
        swiftCode: "",
    },
    signature: {
        name: "",
        role: "",
    },
};


const InvoiceForm = () => {
    const [formData, setFormData] = useState(predefData);

    const handleGenerate = () => {
        const requiredFields = [
            formData.invoiceTitle,
            formData.invoiceNumber,
            formData.dateIssued,
            formData.dueDate,
            formData.billedToName,
            formData.billedToAddress,
            formData.issuedBy.name,
            formData.issuedBy.address,
            formData.issuedBy.phone,
            formData.bank.accountName,
            formData.bank.bankName,
            formData.bank.accountNumber,
            formData.bank.swiftCode,
            formData.signature.name,
            formData.signature.role,
        ];

        const hasEmpty = requiredFields.some(val => !val || val.trim() === "");
        const hasEmptyItem = formData.items.some(item =>
            !item.description || item.quantity <= 0 || item.unitPrice <= 0
        );

        if (hasEmpty || hasEmptyItem) {
            alert("Please fill in all required fields before generating the PDF.");
            return;
        }

        generatePdf(formData);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
            <h1 className="text-3xl font-bold text-red-500">Invoice Generator</h1>


            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Invoice Info</h2>
                <div className="grid grid-cols-$1 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Invoice Title</label>
                        <input type="text" className="border p-3 w-full rounded" value={formData.invoiceTitle} onChange={(e) => setFormData({ ...formData, invoiceTitle: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Invoice Number</label>
                        <input type="text" className="border p-4 w-full" value={formData.invoiceNumber} onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date Issued</label>
                        <input type="date" className="border p-4 w-full" value={formData.dateIssued} onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Due Date</label>
                        <input type="date" className="border p-4 w-full" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Billed To</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" className="border p-4 w-full" value={formData.billedToName} onChange={(e) => setFormData({ ...formData, billedToName: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea className="border p-4 w-full" rows={2} value={formData.billedToAddress} onChange={(e) => setFormData({ ...formData, billedToAddress: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Items</h2>
                <div className="space-y-2">
                    {formData.items.map((item, index) => (
                        <div key={index} className="flex gap-4 mb-2 items-end">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <input type="text" className="border p-2 w-full" value={item.description} onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].description = e.target.value;
                                    setFormData({ ...formData, items: newItems });
                                }} />
                            </div>
                            <div className="w-1/6">
                                <label className="block text-sm font-medium mb-1">Qty</label>
                                <input type="number" className="border p-2 w-full" value={item.quantity} onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].quantity = parseInt(e.target.value);
                                    setFormData({ ...formData, items: newItems });
                                }} />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-sm font-medium mb-1">Unit Price</label>
                                <input type="number" className="border p-2 w-full" value={item.unitPrice} onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].unitPrice = parseFloat(e.target.value);
                                    setFormData({ ...formData, items: newItems });
                                }} />
                            </div>
                            {formData.items.length > 1 && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newItems = [...formData.items];
                                            if (newItems.length > 1) {
                                                newItems.splice(index, 1);
                                                setFormData({ ...formData, items: newItems });
                                            }
                                        }}
                                        className="text-red-600 text-sm ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={() => setFormData({ ...formData, items: [...formData.items, { description: "", quantity: 1, unitPrice: 0 }] })} className="bg-green-500 text-white px-3 py-1 text-sm mt-2">
                    + Add Item
                </button>
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Additional Notes</label>
                    <textarea className="border p-2 w-full" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Issued By</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" className="border p-2 w-full" value={formData.issuedBy.name} onChange={(e) => setFormData({ ...formData, issuedBy: { ...formData.issuedBy, name: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea className="border p-2 w-full" rows={2} value={formData.issuedBy.address} onChange={(e) => setFormData({ ...formData, issuedBy: { ...formData.issuedBy, address: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input type="text" className="border p-2 w-full" value={formData.issuedBy.phone} onChange={(e) => setFormData({ ...formData, issuedBy: { ...formData.issuedBy, phone: e.target.value } })} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Bank Information</h2>
                <div className="grid grid-cols-1 gap-4">
                    {['accountName', 'bankName', 'accountNumber', 'swiftCode'].map((field, i) => (
                        <div key={i}>
                            <label className="block text-sm font-medium mb-1">{field.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}</label>
                            <input type="text" className="border p-2 w-full" value={formData.bank[field]} onChange={(e) => setFormData({ ...formData, bank: { ...formData.bank, [field]: e.target.value } })} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Signature</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" className="border p-2 w-full" value={formData.signature.name} onChange={(e) => setFormData({ ...formData, signature: { ...formData.signature, name: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <input type="text" className="border p-2 w-full" value={formData.signature.role} onChange={(e) => setFormData({ ...formData, signature: { ...formData.signature, role: e.target.value } })} />
                    </div>
                </div>
            </div>

            <div className="text-right">
                <button onClick={handleGenerate} className="bg-blue-600 text-white px-6 py-2 rounded">
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default InvoiceForm;
