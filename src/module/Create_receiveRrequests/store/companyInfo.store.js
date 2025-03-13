import { create } from 'zustand';

const useCompanyInfoStore = create((set, get) => ({
  companyInfo: {
    company: {
      picture: '',
      validation_report: '',
      financial_statement: '',
    },
    logo: '',
  },

  uploadedFiles: {},

  bankInfo: {
    bank: '',
    bank_branch: '',
    bank_branch_code: '',
  },

  registerInfo: {
    suggestion_plan_name: '',
    amount_of_investment: '',
  },

  boardMembers: [],

  boardMembersFiles: {},

  agencyContract: {
    account_number_letter: null,
    financial_exel: null,
    auditor_response: null,
    warranty: null,
  },

  additionalInfo: {
    tax_return: null,
    salary_list_for_the_last_3_months: null,
    trial_balance_current_year: null,
    balance_sheet: null,
    account_turnover: null,
    shareholder_list: null,
    three_recent_buying_and_selling_factors: null,
  },

  contract: {
    otc_fee: '',
    publication_fee: '',
    dervice_fee: '',
    design_cost: '',
    payback_period: '',
    lock_payback_period: false,
    swimming_percentage: '',
    lock_swimming_percentage: false,
    partnership_interest: '',
    lock_partnership_interest: false,
    guarantee: '',
    lock_guarantee: false,
    role_141: false,
    bounced_check: false,
    non_current_debt: false,
    criminal_record: false,
    Prohibited: false,
    minimum_deposit_10: false,
  },

  executiveContract: {
    bank: '',
    bank_branch: '',
    bank_branch_code: '',
    evaluation: null,
    executive_contract: null,
  },

  description: '',

  actionStatus: null,

  isLoading: false,

  error: null,

  setCompanyInfo: (info) => set({ companyInfo: info }),

  setUploadedFiles: (files) =>
    set((state) => ({
      uploadedFiles: { ...state.uploadedFiles, ...files },
    })),

  updateUploadedFile: (fieldId, file) =>
    set((state) => ({
      uploadedFiles: {
        ...state.uploadedFiles,
        [fieldId]: file,
      },
    })),

  deleteUploadedFile: (fieldId) =>
    set((state) => {
      const newFiles = { ...state.uploadedFiles };
      delete newFiles[fieldId];
      return { uploadedFiles: newFiles };
    }),

  setBankInfo: (info) => set({ bankInfo: info }),

  updateBankInfo: (field, value) =>
    set((state) => ({
      bankInfo: {
        ...state.bankInfo,
        [field]: value,
      },
    })),

  setRegisterInfo: (info) => set({ registerInfo: info }),

  updateRegisterInfo: (field, value) =>
    set((state) => ({
      registerInfo: {
        ...state.registerInfo,
        [field]: value,
      },
    })),

  setBoardMembers: (members) => set({ boardMembers: members }),

  updateBoardMember: (memberId, data) =>
    set((state) => ({
      boardMembers: state.boardMembers.map((member) =>
        member.id === memberId ? { ...member, ...data } : member
      ),
    })),

  updateBoardMemberFile: (memberId, fieldId, file) =>
    set((state) => ({
      boardMembersFiles: {
        ...state.boardMembersFiles,
        [memberId]: {
          ...(state.boardMembersFiles[memberId] || {}),
          [fieldId]: file,
        },
      },
    })),

  deleteBoardMemberFile: (memberId, fieldId) =>
    set((state) => {
      const memberFiles = { ...(state.boardMembersFiles[memberId] || {}) };
      delete memberFiles[fieldId];

      return {
        boardMembersFiles: {
          ...state.boardMembersFiles,
          [memberId]: memberFiles,
        },
      };
    }),

  setAgencyContract: (contract) => set({ agencyContract: contract }),

  updateAgencyContractFile: (fieldId, file) =>
    set((state) => ({
      agencyContract: {
        ...state.agencyContract,
        [fieldId]: file,
      },
    })),

  deleteAgencyContractFile: (fieldId) =>
    set((state) => ({
      agencyContract: {
        ...state.agencyContract,
        [fieldId]: null,
      },
    })),

  setAdditionalInfo: (info) => set({ additionalInfo: info }),

  updateAdditionalInfoFile: (fieldId, file) =>
    set((state) => ({
      additionalInfo: {
        ...state.additionalInfo,
        [fieldId]: file,
      },
    })),

  deleteAdditionalInfoFile: (fieldId) =>
    set((state) => ({
      additionalInfo: {
        ...state.additionalInfo,
        [fieldId]: null,
      },
    })),

  setContract: (data) => set({ contract: data }),

  updateContractField: (field, value) =>
    set((state) => ({
      contract: {
        ...state.contract,
        [field]: value,
      },
    })),

  setExecutiveContract: (data) => set({ executiveContract: data }),

  updateExecutiveContractField: (field, value) =>
    set((state) => ({
      executiveContract: {
        ...state.executiveContract,
        [field]: value,
      },
    })),

  updateExecutiveContractFile: (fieldId, file) =>
    set((state) => ({
      executiveContract: {
        ...state.executiveContract,
        [fieldId]: file,
      },
    })),

  setDescription: (text) => set({ description: text }),

  setActionStatus: (status) => set({ actionStatus: status }),

  submitForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      if (state.uploadedFiles.picture) formData.append('picture', state.uploadedFiles.picture);
      if (state.uploadedFiles.validation_report)
        formData.append('validation_report', state.uploadedFiles.validation_report);
      if (state.uploadedFiles.financial_statement)
        formData.append('financial_statement', state.uploadedFiles.financial_statement);
      if (state.uploadedFiles.logo) formData.append('logo', state.uploadedFiles.logo);

      formData.append('suggestion_plan_name', state.registerInfo.suggestion_plan_name);
      formData.append('amount_of_investment', state.registerInfo.amount_of_investment);
      formData.append('bank', state.bankInfo.bank);
      formData.append('bank_branch', state.bankInfo.bank_branch);
      formData.append('bank_branch_code', state.bankInfo.bank_branch_code);

      formData.append('step_1', state.actionStatus);
      formData.append('comment_step_1', state.description);

      state.boardMembers.forEach((member, index) => {
        if (state.boardMembersFiles[member.id]?.national_cart) {
          formData.append(
            `company_members[${index}][national_cart]`,
            state.boardMembersFiles[member.id].national_cart
          );
        }
        if (state.boardMembersFiles[member.id]?.birth_certificate) {
          formData.append(
            `company_members[${index}][birth_certificate]`,
            state.boardMembersFiles[member.id].birth_certificate
          );
        }
        if (state.boardMembersFiles[member.id]?.validation_report) {
          formData.append(
            `company_members[${index}][validation_report]`,
            state.boardMembersFiles[member.id].validation_report
          );
        }
        if (state.boardMembersFiles[member.id]?.previous_article) {
          formData.append(
            `company_members[${index}][previous_article]`,
            state.boardMembersFiles[member.id].previous_article
          );
        }
      });

      if (state.agencyContract.account_number_letter) {
        formData.append('account_number_letter', state.agencyContract.account_number_letter);
      }
      if (state.agencyContract.financial_exel) {
        formData.append('financial_exel', state.agencyContract.financial_exel);
      }
      if (state.agencyContract.auditor_response) {
        formData.append('auditor_response', state.agencyContract.auditor_response);
      }
      if (state.agencyContract.warranty) {
        formData.append('warranty', state.agencyContract.warranty);
      }

      if (state.additionalInfo.tax_return) {
        formData.append('tax_return', state.additionalInfo.tax_return);
      }
      if (state.additionalInfo.salary_list_for_the_last_3_months) {
        formData.append(
          'salary_list_for_the_last_3_months',
          state.additionalInfo.salary_list_for_the_last_3_months
        );
      }
      if (state.additionalInfo.trial_balance_current_year) {
        formData.append(
          'trial_balance_current_year',
          state.additionalInfo.trial_balance_current_year
        );
      }
      if (state.additionalInfo.balance_sheet) {
        formData.append('balance_sheet', state.additionalInfo.balance_sheet);
      }
      if (state.additionalInfo.account_turnover) {
        formData.append('account_turnover', state.additionalInfo.account_turnover);
      }
      if (state.additionalInfo.shareholder_list) {
        formData.append('shareholder_list', state.additionalInfo.shareholder_list);
      }
      if (state.additionalInfo.three_recent_buying_and_selling_factors) {
        formData.append(
          'three_recent_buying_and_selling_factors',
          state.additionalInfo.three_recent_buying_and_selling_factors
        );
      }

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  resetStore: () =>
    set({
      companyInfo: {
        company: {
          picture: '',
          validation_report: '',
          financial_statement: '',
        },
        logo: '',
      },
      uploadedFiles: {},
      bankInfo: {
        bank: '',
        bank_branch: '',
        bank_branch_code: '',
      },
      registerInfo: {
        suggestion_plan_name: '',
        amount_of_investment: '',
      },
      boardMembers: [],
      boardMembersFiles: {},
      agencyContract: {
        account_number_letter: null,
        financial_exel: null,
        auditor_response: null,
        warranty: null,
      },
      additionalInfo: {
        tax_return: null,
        salary_list_for_the_last_3_months: null,
        trial_balance_current_year: null,
        balance_sheet: null,
        account_turnover: null,
        shareholder_list: null,
        three_recent_buying_and_selling_factors: null,
      },
      contract: {
        otc_fee: '',
        publication_fee: '',
        dervice_fee: '',
        design_cost: '',
        payback_period: '',
        lock_payback_period: false,
        swimming_percentage: '',
        lock_swimming_percentage: false,
        partnership_interest: '',
        lock_partnership_interest: false,
        guarantee: '',
        lock_guarantee: false,
        role_141: false,
        bounced_check: false,
        non_current_debt: false,
        criminal_record: false,
        Prohibited: false,
        minimum_deposit_10: false,
      },
      executiveContract: {
        bank: '',
        bank_branch: '',
        bank_branch_code: '',
        evaluation: null,
        executive_contract: null,
      },
      description: '',
      actionStatus: null,
      isLoading: false,
      error: null,
    }),

  initializeStore: (data) => {
    if (!data) return;

    set({
      companyInfo: {
        company: {
          picture: data.company?.picture || data.picture || '',
          validation_report: data.validation_report || '',
          financial_statement: data.financial_statement || '',
        },
        logo: data.logo || '',
      },
      uploadedFiles: {
        picture: data.company?.picture || data.picture || '',
        validation_report: data.validation_report || '',
        financial_statement: data.financial_statement || '',
      },
      bankInfo: {
        bank: data.bank || '',
        bank_branch: data.bank_branch || '',
        bank_branch_code: data.bank_branch_code || '',
      },
      registerInfo: {
        suggestion_plan_name: data.suggestion_plan_name || '',
        amount_of_investment: data.amount_of_investment || '',
      },
      boardMembers: data.company_members || [],
      agencyContract: {
        account_number_letter: data.account_number_letter || null,
        financial_exel: data.financial_exel || null,
        auditor_response: data.auditor_response || null,
        warranty: data.warranty || null,
      },
      additionalInfo: {
        tax_return: data.tax_return || null,
        salary_list_for_the_last_3_months: data.salary_list_for_the_last_3_months || null,
        trial_balance_current_year: data.trial_balance_current_year || null,
        balance_sheet: data.balance_sheet || null,
        account_turnover: data.account_turnover || null,
        shareholder_list: data.shareholder_list || null,
        three_recent_buying_and_selling_factors:
          data.three_recent_buying_and_selling_factors || null,
      },
      contract: {
        otc_fee: data.otc_fee || '',
        publication_fee: data.publication_fee || '',
        dervice_fee: data.dervice_fee || '',
        design_cost: data.design_cost || '',
        payback_period: data.payback_period || '',
        lock_payback_period: data.lock_payback_period || false,
        swimming_percentage: data.swimming_percentage || '',
        lock_swimming_percentage: data.lock_swimming_percentage || false,
        partnership_interest: data.partnership_interest || '',
        lock_partnership_interest: data.lock_partnership_interest || false,
        guarantee: data.guarantee || '',
        lock_guarantee: data.lock_guarantee || false,
        role_141: data.role_141 || false,
        bounced_check: data.bounced_check || false,
        non_current_debt: data.non_current_debt || false,
        criminal_record: data.criminal_record || false,
        Prohibited: data.Prohibited || false,
        minimum_deposit_10: data.minimum_deposit_10 || false,
      },
      executiveContract: {
        bank: data.bank || '',
        bank_branch: data.bank_branch || '',
        bank_branch_code: data.bank_branch_code || '',
        evaluation: data.evaluation || null,
        executive_contract: data.executive_contract || null,
      },
    });
  },
}));

export default useCompanyInfoStore;
