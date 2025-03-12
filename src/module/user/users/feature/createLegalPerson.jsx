import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const CreateLegalPersonForm = ({ isOpen, onClose, onSubmit }) => {
  const initialFormState = {
    uniqueIdentifier: '',
    account_number: '',
    bank: '',
    branch_city: '',
    branch_code: '',
    branch_name: '',
    is_default: true,
    type: '',
    sheba: '',
    email: '',
    mobile: '',
    city: '',
    trading_code: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData(initialFormState); // Reset form
      onClose(); // Close modal
      toast.success('شخص حقوقی با موفقیت ایجاد شد', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'font-vazir',
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('خطا در ایجاد شخص حقوقی', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'font-vazir',
        theme: 'colored',
      });
    }
  };

  const inputFields = [
    { name: 'uniqueIdentifier', label: 'شناسه ملی', type: 'text' },
    { name: 'account_number', label: 'شماره حساب', type: 'text' },
    { name: 'bank', label: 'بانک', type: 'text' },
    { name: 'branch_city', label: 'شهر شعبه', type: 'text' },
    { name: 'branch_code', label: 'کد شعبه', type: 'text' },
    { name: 'branch_name', label: 'نام شعبه', type: 'text' },
    { name: 'type', label: 'نوع حساب', type: 'text' },
    { name: 'sheba', label: 'شماره شبا', type: 'text' },
    { name: 'email', label: 'ایمیل', type: 'email' },
    { name: 'mobile', label: 'موبایل', type: 'text' },
    { name: 'city', label: 'شهر', type: 'text' },
    { name: 'trading_code', label: 'کد معاملاتی', type: 'text' },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-[9999] p-4 pt-20"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
          <h2 className="text-2xl font-bold text-white">ایجاد شخص حقوقی</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <motion.div
                key={field.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-2"
              >
                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  placeholder={`${field.label} را وارد کنید`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-end gap-4 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              ثبت اطلاعات
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

CreateLegalPersonForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateLegalPersonForm;
