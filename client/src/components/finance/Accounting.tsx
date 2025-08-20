import { useState, useEffect } from 'react';
import { DollarSign, FileText, TrendingUp, Plus, X, Calendar, Building, CreditCard, Receipt, Users } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface AccountingEntry {
  id: string;
  date: string;
  accountName: string;
  accountCode: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
  referenceNumber: string;
  category: string;
}

interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Overdue' | 'Paid';
  invoiceNumber: string;
  dateCreated: string;
}

interface ReceivableInvoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: 'Outstanding' | 'Partial' | 'Paid';
  invoiceNumber: string;
  dateCreated: string;
}

export function Accounting() {
  const [activeTab, setActiveTab] = useState('general');
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceivableModal, setShowReceivableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize data arrays first
  const [generalLedger, setGeneralLedger] = useState<AccountingEntry[]>([]);
  const [accountsPayable, setAccountsPayable] = useState<Invoice[]>([]);
  const [accountsReceivable, setAccountsReceivable] = useState<ReceivableInvoice[]>([]);

  // Form states
  const [entryForm, setEntryForm] = useState({
    date: new Date().toISOString().split('T')[0],
    accountName: '',
    accountCode: '',
    description: '',
    debitAmount: '',
    creditAmount: '',
    referenceNumber: '',
    category: 'Assets'
  });

  const [invoiceForm, setInvoiceForm] = useState<{
    vendor: string;
    amount: string;
    dueDate: string;
    status: 'Pending' | 'Overdue' | 'Paid';
  }>({
    vendor: '',
    amount: '',
    dueDate: '',
    status: 'Pending'
  });

  const [receivableForm, setReceivableForm] = useState<{
    customer: string;
    amount: string;
    dueDate: string;
    status: 'Outstanding' | 'Partial' | 'Paid';
  }>({
    customer: '',
    amount: '',
    dueDate: '',
    status: 'Outstanding'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('accounting_entries');
    const savedInvoices = localStorage.getItem('accounts_payable');
    const savedReceivables = localStorage.getItem('accounts_receivable');

    if (savedEntries) {
      try {
        setGeneralLedger(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading accounting entries:', error);
      }
    }

    if (savedInvoices) {
      try {
        setAccountsPayable(JSON.parse(savedInvoices));
      } catch (error) {
        console.error('Error loading accounts payable:', error);
      }
    }

    if (savedReceivables) {
      try {
        setAccountsReceivable(JSON.parse(savedReceivables));
      } catch (error) {
        console.error('Error loading accounts receivable:', error);
      }
    }
  }, []);

  // Predefined data
  const vendors = [
    'ABC Suppliers Ltd.',
    'Global Materials Inc.',
    'Tech Solutions Corp.',
    'Office Supplies Co.',
    'Equipment Rental LLC'
  ];

  const customers = [
    'Acme Corporation',
    'Global Industries',
    'Tech Solutions Ltd.',
    'Manufacturing Co.',
    'Retail Partners Inc.'
  ];

  const categories = ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'];

  // Validation functions
  const validateEntryForm = () => {
    const newErrors: Record<string, string> = {};

    if (!entryForm.date) newErrors.date = 'Date is required';
    if (!entryForm.accountName) newErrors.accountName = 'Account name is required';
    if (!entryForm.accountCode) newErrors.accountCode = 'Account code is required';
    if (!entryForm.description) newErrors.description = 'Description is required';

    const debit = parseFloat(entryForm.debitAmount) || 0;
    const credit = parseFloat(entryForm.creditAmount) || 0;

    if (debit === 0 && credit === 0) {
      newErrors.amounts = 'Either debit or credit amount must be greater than 0';
    }

    if (debit > 0 && credit > 0) {
      newErrors.amounts = 'Cannot have both debit and credit amounts';
    }

    if (entryForm.debitAmount && isNaN(parseFloat(entryForm.debitAmount))) {
      newErrors.debitAmount = 'Invalid debit amount';
    }

    if (entryForm.creditAmount && isNaN(parseFloat(entryForm.creditAmount))) {
      newErrors.creditAmount = 'Invalid credit amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateInvoiceForm = () => {
    const newErrors: Record<string, string> = {};

    if (!invoiceForm.vendor) newErrors.vendor = 'Vendor is required';
    if (!invoiceForm.amount) newErrors.amount = 'Amount is required';
    if (!invoiceForm.dueDate) newErrors.dueDate = 'Due date is required';

    const amount = parseFloat(invoiceForm.amount);
    if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    const today = new Date().toISOString().split('T')[0];
    if (invoiceForm.status === 'Pending' && invoiceForm.dueDate < today) {
      newErrors.dueDate = 'Due date cannot be in the past for pending invoices';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReceivableForm = () => {
    const newErrors: Record<string, string> = {};

    if (!receivableForm.customer) newErrors.customer = 'Customer is required';
    if (!receivableForm.amount) newErrors.amount = 'Amount is required';
    if (!receivableForm.dueDate) newErrors.dueDate = 'Due date is required';

    const amount = parseFloat(receivableForm.amount);
    if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    const today = new Date().toISOString().split('T')[0];
    if (receivableForm.status === 'Outstanding' && receivableForm.dueDate < today) {
      newErrors.dueDate = 'Due date cannot be in the past for outstanding invoices';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handlers
  const handleEntrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEntryForm()) return;

    setIsLoading(true);

    try {
      const newEntry: AccountingEntry = {
        id: Date.now().toString(),
        date: entryForm.date,
        accountName: entryForm.accountName,
        accountCode: entryForm.accountCode,
        description: entryForm.description,
        debitAmount: parseFloat(entryForm.debitAmount) || 0,
        creditAmount: parseFloat(entryForm.creditAmount) || 0,
        referenceNumber: entryForm.referenceNumber,
        category: entryForm.category
      };

      const updatedEntries = [...generalLedger, newEntry];
      setGeneralLedger(updatedEntries);
      localStorage.setItem('accounting_entries', JSON.stringify(updatedEntries));

      setSuccessMessage('Accounting entry added successfully!');
      setEntryForm({
        date: new Date().toISOString().split('T')[0],
        accountName: '',
        accountCode: '',
        description: '',
        debitAmount: '',
        creditAmount: '',
        referenceNumber: '',
        category: 'Assets'
      });
      setShowNewEntryModal(false);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving entry:', error);
      setErrors({ submit: 'Failed to save entry. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInvoiceForm()) return;

    setIsLoading(true);

    try {
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        vendor: invoiceForm.vendor,
        amount: parseFloat(invoiceForm.amount),
        dueDate: invoiceForm.dueDate,
        status: invoiceForm.status,
        invoiceNumber: `INV-${Date.now()}`,
        dateCreated: new Date().toISOString().split('T')[0]
      };

      const updatedInvoices = [...accountsPayable, newInvoice];
      setAccountsPayable(updatedInvoices);
      localStorage.setItem('accounts_payable', JSON.stringify(updatedInvoices));

      setSuccessMessage('Invoice added successfully!');
      setInvoiceForm({
        vendor: '',
        amount: '',
        dueDate: '',
        status: 'Pending'
      });
      setShowInvoiceModal(false);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving invoice:', error);
      setErrors({ submit: 'Failed to save invoice. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReceivableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateReceivableForm()) return;

    setIsLoading(true);

    try {
      const newReceivable: ReceivableInvoice = {
        id: Date.now().toString(),
        customer: receivableForm.customer,
        amount: parseFloat(receivableForm.amount),
        dueDate: receivableForm.dueDate,
        status: receivableForm.status,
        invoiceNumber: `REC-${Date.now()}`,
        dateCreated: new Date().toISOString().split('T')[0]
      };

      const updatedReceivables = [...accountsReceivable, newReceivable];
      setAccountsReceivable(updatedReceivables);
      localStorage.setItem('accounts_receivable', JSON.stringify(updatedReceivables));

      setSuccessMessage('Receivable invoice added successfully!');
      setReceivableForm({
        customer: '',
        amount: '',
        dueDate: '',
        status: 'Outstanding'
      });
      setShowReceivableModal(false);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving receivable:', error);
      setErrors({ submit: 'Failed to save receivable. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Outstanding':
        return 'bg-blue-100 text-blue-800';
      case 'Partial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* Accounting Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'general', name: 'General Ledger', icon: FileText },
              { id: 'payable', name: 'Payable', icon: CreditCard },
              { id: 'receivable', name: 'Receivable', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Ledger Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">General Ledger</h3>
                <button 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setShowNewEntryModal(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Entry
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Debit
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {generalLedger.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{entry.accountName}</div>
                          <div className="text-sm text-gray-500">{entry.accountCode}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {entry.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {entry.debitAmount > 0 ? formatCurrency(entry.debitAmount) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {entry.creditAmount > 0 ? formatCurrency(entry.creditAmount) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.referenceNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Accounts Payable Tab */}
          {activeTab === 'payable' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Accounts Payable</h3>
                <button 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setShowInvoiceModal(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Invoice
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accountsPayable.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.vendor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dateCreated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Accounts Receivable Tab */}
          {activeTab === 'receivable' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Accounts Receivable</h3>
                <button 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => setShowReceivableModal(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Invoice
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accountsReceivable.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dateCreated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Entry Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-3xl my-4 sm:my-8 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">New Accounting Entry</h3>
                    <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Create a new journal entry for the general ledger</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowNewEntryModal(false)}
                  className="text-white hover:text-gray-200 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-1.5 transition-all duration-200"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <form onSubmit={handleEntrySubmit} className="space-y-4 sm:space-y-5">
                {/* Transaction Details Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    Transaction Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Transaction Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={entryForm.date}
                        onChange={(e) => {
                          setEntryForm(prev => ({ ...prev, date: e.target.value }));
                          clearFieldError('date');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.date ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Account Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={entryForm.category}
                        onChange={(e) => setEntryForm(prev => ({ ...prev, category: e.target.value }))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Account Information Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-green-600" />
                    Account Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Account Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={entryForm.accountName}
                        onChange={(e) => {
                          setEntryForm(prev => ({ ...prev, accountName: e.target.value }));
                          clearFieldError('accountName');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.accountName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Cash, Accounts Receivable"
                      />
                      {errors.accountName && <p className="mt-1 text-xs text-red-600">{errors.accountName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Account Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={entryForm.accountCode}
                        onChange={(e) => {
                          setEntryForm(prev => ({ ...prev, accountCode: e.target.value }));
                          clearFieldError('accountCode');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.accountCode ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 1000, 1200"
                      />
                      {errors.accountCode && <p className="mt-1 text-xs text-red-600">{errors.accountCode}</p>}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Transaction Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={entryForm.description}
                      onChange={(e) => {
                        setEntryForm(prev => ({ ...prev, description: e.target.value }));
                        clearFieldError('description');
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white resize-none text-sm ${
                        errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Transaction description..."
                    />
                    {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                  </div>
                </div>

                {/* Amount Details Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-emerald-600" />
                    Amount Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Debit Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={entryForm.debitAmount}
                          onChange={(e) => {
                            setEntryForm(prev => ({ ...prev, debitAmount: e.target.value, creditAmount: '' }));
                            clearFieldError('debitAmount');
                            clearFieldError('amounts');
                          }}
                          className={`block w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm ${
                            errors.debitAmount || errors.amounts ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.debitAmount && <p className="mt-1 text-xs text-red-600">{errors.debitAmount}</p>}
                    </div>

                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Credit Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={entryForm.creditAmount}
                          onChange={(e) => {
                            setEntryForm(prev => ({ ...prev, creditAmount: e.target.value, debitAmount: '' }));
                            clearFieldError('creditAmount');
                            clearFieldError('amounts');
                          }}
                          className={`block w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm ${
                            errors.creditAmount || errors.amounts ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.creditAmount && <p className="mt-1 text-xs text-red-600">{errors.creditAmount}</p>}
                    </div>
                  </div>

                  {errors.amounts && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-md p-2">
                      <p className="text-xs text-red-600 font-medium">{errors.amounts}</p>
                    </div>
                  )}

                  <div className="mt-3 sm:mt-4">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Reference Number
                    </label>
                    <input
                      type="text"
                      value={entryForm.referenceNumber}
                      onChange={(e) => setEntryForm(prev => ({ ...prev, referenceNumber: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm"
                      placeholder="Optional reference number"
                    />
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md">
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowNewEntryModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium text-sm"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2 inline-block" />
                        Create Entry
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-2xl my-4 sm:my-8 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2">
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Add New Invoice</h3>
                    <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Add a new vendor invoice to accounts payable</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-white hover:text-gray-200 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-1.5 transition-all duration-200"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <form onSubmit={handleInvoiceSubmit} className="space-y-4 sm:space-y-5">
                {/* Vendor Information Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-blue-600" />
                    Vendor Information
                  </h4>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={invoiceForm.vendor}
                      onChange={(e) => {
                        setInvoiceForm(prev => ({ ...prev, vendor: e.target.value }));
                        clearFieldError('vendor');
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                        errors.vendor ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a vendor</option>
                      {vendors.map(vendor => (
                        <option key={vendor} value={vendor}>{vendor}</option>
                      ))}
                    </select>
                    {errors.vendor && <p className="mt-1 text-xs text-red-600">{errors.vendor}</p>}
                  </div>
                </div>

                {/* Invoice Details Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    Invoice Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Invoice Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={invoiceForm.amount}
                          onChange={(e) => {
                            setInvoiceForm(prev => ({ ...prev, amount: e.target.value }));
                            clearFieldError('amount');
                          }}
                          className={`block w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium ${
                            errors.amount ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={invoiceForm.dueDate}
                        onChange={(e) => {
                          setInvoiceForm(prev => ({ ...prev, dueDate: e.target.value }));
                          clearFieldError('dueDate');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.dueDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dueDate && <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Payment Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={invoiceForm.status}
                      onChange={(e) => setInvoiceForm(prev => ({ ...prev, status: e.target.value as 'Pending' | 'Overdue' | 'Paid' }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm"
                    >
                      <option value="Pending">Pending Payment</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md">
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowInvoiceModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium text-sm"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2 inline-block" />
                        Save Invoice
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* New Receivable Invoice Modal */}
      {showReceivableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-2xl my-4 sm:my-8 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2">
                    <Receipt className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">New Receivable Invoice</h3>
                    <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Create a new customer invoice for accounts receivable</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReceivableModal(false)}
                  className="text-white hover:text-gray-200 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-1.5 transition-all duration-200"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <form onSubmit={handleReceivableSubmit} className="space-y-4 sm:space-y-5">
                {/* Customer Information Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    Customer Information
                  </h4>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={receivableForm.customer}
                      onChange={(e) => {
                        setReceivableForm(prev => ({ ...prev, customer: e.target.value }));
                        clearFieldError('customer');
                      }}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                        errors.customer ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a customer</option>
                      {customers.map(customer => (
                        <option key={customer} value={customer}>{customer}</option>
                      ))}
                    </select>
                    {errors.customer && <p className="mt-1 text-xs text-red-600">{errors.customer}</p>}
                  </div>
                </div>

                {/* Invoice Details Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                    Invoice Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Invoice Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={receivableForm.amount}
                          onChange={(e) => {
                            setReceivableForm(prev => ({ ...prev, amount: e.target.value }));
                            clearFieldError('amount');
                          }}
                          className={`block w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium ${
                            errors.amount ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Due Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={receivableForm.dueDate}
                        onChange={(e) => {
                          setReceivableForm(prev => ({ ...prev, dueDate: e.target.value }));
                          clearFieldError('dueDate');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.dueDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dueDate && <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Payment Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={receivableForm.status}
                      onChange={(e) => setReceivableForm(prev => ({ ...prev, status: e.target.value as 'Outstanding' | 'Partial' | 'Paid' }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm"
                    >
                      <option value="Outstanding">Outstanding</option>
                      <option value="Partial">Partial Payment</option>
                      <option value="Paid">Paid in Full</option>
                    </select>
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md">
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowReceivableModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium text-sm"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2 inline-block" />
                        Create Invoice
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}