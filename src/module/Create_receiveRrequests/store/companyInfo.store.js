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
  commentStep1: '',
  commentStep2: '',
  commentStep3: '',
  commentStep4: '',
  commentStep5: '',
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

  setCommentStep1: (text) => set({ commentStep1: text }),
  setCommentStep2: (text) => set({ commentStep2: text }),
  setCommentStep3: (text) => set({ commentStep3: text }),
  setCommentStep4: (text) => set({ commentStep4: text }),
  setCommentStep5: (text) => set({ commentStep5: text }),
  setDescription: (text) => set({ description: text }),

  setActionStatus: (status) => set({ actionStatus: status }),

  submitForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      // افزودن وضعیت و کامنت‌ها
      formData.append('step_1', state.actionStatus);
      formData.append('comment_step_1', state.commentStep1);
      formData.append('comment_step_2', state.commentStep2);
      formData.append('comment_step_3', state.commentStep3);
      formData.append('comment_step_4', state.commentStep4);
      formData.append('comment_step_5', state.commentStep5);
      
      // افزودن اطلاعات بانکی
      if (state.bankInfo.bank) {
        formData.append('bank', state.bankInfo.bank);
      }
      if (state.bankInfo.bank_branch) {
        formData.append('bank_branch', state.bankInfo.bank_branch);
      }
      if (state.bankInfo.bank_branch_code) {
        formData.append('bank_branch_code', state.bankInfo.bank_branch_code);
      }
      
      // افزودن اطلاعات ثبت
      if (state.registerInfo.suggestion_plan_name) {
        formData.append('suggestion_plan_name', state.registerInfo.suggestion_plan_name);
      }
      
      if (state.registerInfo.amount_of_investment) {
        formData.append('amount_of_investment', state.registerInfo.amount_of_investment);
      }

      // افزودن فایل‌های قرارداد عاملیت به FormData
      Object.entries(state.agencyContract).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  submitBoardDirectorsForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      formData.append('step_2', state.actionStatus);
      formData.append('comment_step_2', state.commentStep2);

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  submitAdditionalInfoForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      Object.entries(state.additionalInfo).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      formData.append('step_3', state.actionStatus);
      formData.append('comment_step_3', state.commentStep3);

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  submitExecutiveContractForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      // افزودن تمام فیلدهای executiveContract به FormData
      Object.entries(state.executiveContract).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // افزودن وضعیت و کامنت‌ها
      formData.append('step_5', state.actionStatus);
      formData.append('comment_step_5', state.commentStep5);

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
      commentStep1: '',
      commentStep2: '',
      commentStep3: '',
      commentStep4: '',
      commentStep5: '',
      description: '',
      actionStatus: null,
      isLoading: false,
      error: null,
    }),

  initializeStore: (data) => {
    if (!data) return;

    const defaultValue = (value, defaultVal = '') => value ?? defaultVal;

    set({
      companyInfo: {
        company: {
          picture: defaultValue(data.company?.picture || data.picture),
          validation_report: defaultValue(data.validation_report),
          financial_statement: defaultValue(data.financial_statement),
        },
        logo: defaultValue(data.logo),
      },
      uploadedFiles: {
        picture: defaultValue(data.company?.picture || data.picture),
        validation_report: defaultValue(data.validation_report),
        financial_statement: defaultValue(data.financial_statement),
      },
      bankInfo: {
        bank: defaultValue(data.bank),
        bank_branch: defaultValue(data.bank_branch),
        bank_branch_code: defaultValue(data.bank_branch_code),
      },
      registerInfo: {
        suggestion_plan_name: defaultValue(data.suggestion_plan_name),
        amount_of_investment: defaultValue(data.amount_of_investment),
      },
      boardMembers: data.company_members || [],
      agencyContract: {
        auditor_response: defaultValue(data.auditor_response),
        warranty: defaultValue(data.warranty),
      },
      additionalInfo: {
        tax_return: defaultValue(data.tax_return),
        salary_list_for_the_last_3_months: defaultValue(data.salary_list_for_the_last_3_months),
        trial_balance_current_year: defaultValue(data.trial_balance_current_year),
        balance_sheet: defaultValue(data.balance_sheet),
        account_turnover: defaultValue(data.account_turnover),
        shareholder_list: defaultValue(data.shareholder_list),
        three_recent_buying_and_selling_factors: defaultValue(
          data.three_recent_buying_and_selling_factors
        ),
      },
      contract: {
        otc_fee: defaultValue(data.otc_fee),
        publication_fee: defaultValue(data.publication_fee),
        dervice_fee: defaultValue(data.dervice_fee),
        design_cost: defaultValue(data.design_cost),
        payback_period: defaultValue(data.payback_period),
        lock_payback_period: defaultValue(data.lock_payback_period),
        swimming_percentage: defaultValue(data.swimming_percentage),
        lock_swimming_percentage: defaultValue(data.lock_swimming_percentage),
        partnership_interest: defaultValue(data.partnership_interest),
        lock_partnership_interest: defaultValue(data.lock_partnership_interest),
        guarantee: defaultValue(data.guarantee),
        lock_guarantee: defaultValue(data.lock_guarantee),
        role_141: defaultValue(data.role_141),
        bounced_check: defaultValue(data.bounced_check),
        non_current_debt: defaultValue(data.non_current_debt),
        criminal_record: defaultValue(data.criminal_record),
        Prohibited: defaultValue(data.Prohibited),
        minimum_deposit_10: defaultValue(data.minimum_deposit_10),
      },
      executiveContract: {
        bank: defaultValue(data.bank),
        bank_branch: defaultValue(data.bank_branch),
        bank_branch_code: defaultValue(data.bank_branch_code),
        evaluation: defaultValue(data.evaluation),
        executive_contract: defaultValue(data.executive_contract),
      },
      commentStep1: defaultValue(data.comment_step_1),
      commentStep2: defaultValue(data.comment_step_2),
      commentStep3: defaultValue(data.comment_step_3),
      commentStep4: defaultValue(data.comment_step_4),
      commentStep5: defaultValue(data.comment_step_5),
      description: defaultValue(data.description),
      actionStatus: defaultValue(data.step_1),
    });
  },

  updateField: (stateKey, field, value) =>
    set((state) => ({
      [stateKey]: {
        ...state[stateKey],
        [field]: value,
      },
    })),

  updateFileField: (stateKey, fieldId, file) =>
    set((state) => ({
      [stateKey]: {
        ...state[stateKey],
        [fieldId]: file,
      },
    })),
}));

export default useCompanyInfoStore;
