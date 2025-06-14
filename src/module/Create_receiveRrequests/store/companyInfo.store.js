import { create } from 'zustand';

const useCompanyInfoStore = create((set, get) => ({
  companyInfo: {
    company: {
      picture: '',
      validation_report: '',
      financial_statement: '',
    },
    logo: null,
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
    refund_of_plan: '0',
    subject_activity_document: '',
    activity_feild: '',
  },
  boardMembers: [],
  boardMembersFiles: {},
  agencyContract: {
    agency_agreement_date: null,
    auditor_response: null,
    warranty: null,
    account_number_letter: null,
    financial_exel: null,
    bank_letter_number: null,
  },
  additionalInfo: {
    tax_return: null,
    salary_list_for_the_last_3_months: null,
    trial_balance_current_year: null,
    balance_sheet: null,
    account_turnover: null,
    shareholder_list: null,
    three_recent_buying_and_selling_factors: null,
    execution_resume: null,
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
    payment_bank: '',
    payment_bank_branch: '',
    payment_account_number: '',
    sheba_number: '',
  },
  commentStep1: '',
  commentStep2: '',
  commentStep3: '',
  commentStep4: '',
  commentStep5: '',
  description: '',
  actionStatus: null,
  selectedButton: null,
  isLoading: false,
  error: null,

  companyCost: {
    description: '',
    amount_of_3_months: 0,
    amount_of_year: 0,
  },

  profitAndLossForecast: {
    three_month_sales_profit_and_loss_forecast: '',
    annual_sales_profit_and_loss_forecast: '',
    three_month_cost_profit_and_loss_forecast: '',
    three_month_profit_and_loss_forecast: '',
    annual_cost_profit_and_loss_forecast: '',
    annual_profit_and_loss_forecast: '',
    amount_production: '',
  },

  performanceForecast: {
    annual_total_income_forecast: '',
    annual_total_cost_forecast: '',
    annual_gross_profit_of_the_plan_forecast: '',
    annual_profit_margin_of_the_plan_forecast: '',
    annual_shareholders_equity_ratio_forecast: '',
    three_months_total_income_forecast: '',
    three_months_total_cost_forecast: '',
    three_months_gross_profit_of_the_plan_forecast: '',
    three_months_profit_margin_of_the_plan_forecast: '',
    three_months_shareholders_equity_ratio_forecast: '',
  },

  checks: {
    date: '',
    amount: null,
    bank_name: '',
    branch_name: '',
    type: null,
    fishing: '',
    investor_request: null,
  },

  warranty: {
    date: null,
    description: '',
    value: null,
    number: '',
    sepam_id: '',
    type: null,
    investor_request: null,
  },

  guarantorInfo: {
    investor_request_id: null,
    guarantor_name: '',
    guarantor_national_id: '',
    phone_number: '',
    birth_date: '',
    guarantor_address: '',
    postal_code: '',
    gender: '',
    company_agent: '',
    document_news_paper: '',
    position_title: '',
    company_national_id: '',
  },

  fees: {
    investor_request_id: null,
    design_wage: '',
    farabours_wage: '',
    execution_wage: '',
    marketing_wage: '',
    company_certificate_wage: '',
  },

  interest_rate_plan: '',
  buoyancy_plan: '',

  isArchived: false,
  toggleArchive: () => set((state) => ({ isArchived: !state.isArchived })),

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
  setSelectedButton: (buttonId) => set({ selectedButton: buttonId }),

  isActualFile: (value) => value instanceof File || value instanceof Blob,

  submitForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      formData.append('step_1', state.actionStatus);
      formData.append('step_2', state.actionStatus);
      formData.append('step_3', state.actionStatus);
      formData.append('step_4', state.actionStatus);
      formData.append('step_5', state.actionStatus);

      formData.append('comment_step_1', state.commentStep1);
      formData.append('comment_step_2', state.commentStep2);
      formData.append('comment_step_3', state.commentStep3);
      formData.append('comment_step_4', state.commentStep4);
      formData.append('comment_step_5', state.commentStep5);

      if (state.bankInfo.bank) {
        formData.append('bank', state.bankInfo.bank);
      }
      if (state.bankInfo.bank_branch) {
        formData.append('bank_branch', state.bankInfo.bank_branch);
      }
      if (state.bankInfo.bank_branch_code) {
        formData.append('bank_branch_code', state.bankInfo.bank_branch_code);
      }

      if (state.registerInfo.suggestion_plan_name) {
        formData.append('suggestion_plan_name', state.registerInfo.suggestion_plan_name);
      }
      if (state.registerInfo.activity_feild) {
        formData.append('activity_feild', state.registerInfo.activity_feild);
      }

      if (state.registerInfo.amount_of_investment) {
        formData.append('amount_of_investment', state.registerInfo.amount_of_investment);
      }

      if (state.registerInfo.refund_of_plan) {
        formData.append('refund_of_plan', state.registerInfo.refund_of_plan);
      }

      if (state.registerInfo.subject_activity_document) {
        formData.append('subject_activity_document', state.registerInfo.subject_activity_document);
      }

      Object.entries(state.agencyContract).forEach(([key, value]) => {
        if (value && state.isActualFile(value)) {
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

  submitStep1Form: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      if (state.uploadedFiles.logo) {
        if (state.isActualFile(state.uploadedFiles.logo)) {
          formData.append('logo', state.uploadedFiles.logo);
        }
      }
      if (state.uploadedFiles.validation_report) {
        if (state.isActualFile(state.uploadedFiles.validation_report)) {
          formData.append('validation_report', state.uploadedFiles.validation_report);
        }
      }
      if (state.uploadedFiles.financial_statement) {
        if (state.isActualFile(state.uploadedFiles.financial_statement)) {
          formData.append('financial_statement', state.uploadedFiles.financial_statement);
        }
      }

      formData.append('step_1', state.actionStatus);
      formData.append('comment_step_1', state.commentStep1);

      if (state.bankInfo.bank) {
        formData.append('bank', state.bankInfo.bank);
      }
      if (state.bankInfo.bank_branch) {
        formData.append('bank_branch', state.bankInfo.bank_branch);
      }
      if (state.bankInfo.bank_branch_code) {
        formData.append('bank_branch_code', state.bankInfo.bank_branch_code);
      }

      if (state.registerInfo.suggestion_plan_name) {
        formData.append('suggestion_plan_name', state.registerInfo.suggestion_plan_name);
      }
      if (state.registerInfo.activity_feild) {
        formData.append('activity_feild', state.registerInfo.activity_feild);
      }
      if (state.registerInfo.amount_of_investment) {
        formData.append('amount_of_investment', state.registerInfo.amount_of_investment);
      }

      if (state.registerInfo.refund_of_plan) {
        formData.append('refund_of_plan', state.registerInfo.refund_of_plan);
      }

      if (state.registerInfo.subject_activity_document) {
        formData.append('subject_activity_document', state.registerInfo.subject_activity_document);
      }

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
        if (value && state.isActualFile(value)) {
          formData.append(key, value);
        }
      });

      if (state.interest_rate_plan) {
        formData.append('interest_rate_plan', state.interest_rate_plan);
      }

      if (state.buoyancy_plan) {
        formData.append('buoyancy_plan', state.buoyancy_plan);
      }

      formData.append('step_4', state.actionStatus);
      formData.append('comment_step_4', state.commentStep4);

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

      Object.entries(state.executiveContract).forEach(([key, value]) => {
        if (key === 'evaluation' || key === 'executive_contract') {
          if (value && state.isActualFile(value)) {
            formData.append(key, value);
          }
        } else if (value) {
          formData.append(key, value);
        }
      });

      formData.append('step_5', state.actionStatus);
      formData.append('comment_step_5', state.commentStep5);

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  submitAgencyContractForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      Object.entries(state.agencyContract).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'agency_agreement_date') {
            let formattedDate = null;
            if (typeof value.toDate === 'function') {
              formattedDate = value.toDate().toISOString();
            } else if (value instanceof Date) {
              formattedDate = value.toISOString();
            } else if (typeof value === 'object' && value.format) {
              formattedDate = value.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            } else {
              formattedDate = String(value);
            }

            formData.append('agency_agreement_date', formattedDate);
          } else if (state.isActualFile(value)) {
            formData.append(key, value);
          } else if (key === 'bank_letter_number') {
            formData.append(key, value);
          }
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

  resetStore: () =>
    set({
      companyInfo: {
        company: {
          picture: '',
          validation_report: '',
          financial_statement: '',
        },
        logo: null,
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
        refund_of_plan: '0',
        subject_activity_document: '',
        activity_feild: '',
      },
      boardMembers: [],
      boardMembersFiles: {},
      agencyContract: {
        agency_agreement_date: null,
        auditor_response: null,
        warranty: null,
        account_number_letter: null,
        financial_exel: null,
        bank_letter_number: '',
      },
      additionalInfo: {
        tax_return: null,
        salary_list_for_the_last_3_months: null,
        trial_balance_current_year: null,
        balance_sheet: null,
        account_turnover: null,
        shareholder_list: null,
        three_recent_buying_and_selling_factors: null,
        execution_resume: null,
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
        payment_bank: '',
        payment_bank_branch: '',
        payment_account_number: '',
        sheba_number: '',
      },
      commentStep1: '',
      commentStep2: '',
      commentStep3: '',
      commentStep4: '',
      commentStep5: '',
      description: '',
      actionStatus: null,
      selectedButton: null,
      isLoading: false,
      error: null,

      companyCost: {
        description: '',
        amount_of_3_months: 0,
        amount_of_year: 0,
      },

      profitAndLossForecast: {
        three_month_sales_profit_and_loss_forecast: '',
        annual_sales_profit_and_loss_forecast: '',
        three_month_cost_profit_and_loss_forecast: '',
        three_month_profit_and_loss_forecast: '',
        annual_cost_profit_and_loss_forecast: '',
        annual_profit_and_loss_forecast: '',
        amount_production: '',
      },

      performanceForecast: {
        annual_total_income_forecast: '',
        annual_total_cost_forecast: '',
        annual_gross_profit_of_the_plan_forecast: '',
        annual_profit_margin_of_the_plan_forecast: '',
        annual_shareholders_equity_ratio_forecast: '',
        three_months_total_income_forecast: '',
        three_months_total_cost_forecast: '',
        three_months_gross_profit_of_the_plan_forecast: '',
        three_months_profit_margin_of_the_plan_forecast: '',
        three_months_shareholders_equity_ratio_forecast: '',
      },

      checks: {
        date: '',
        amount: null,
        bank_name: '',
        branch_name: '',
        type: null,
        fishing: '',
        investor_request: null,
      },

      warranty: {
        date: null,
        description: '',
        value: null,
        number: '',
        sepam_id: '',
        type: null,
        investor_request: null,
      },

      guarantorInfo: {
        guarantor_name: '',
        guarantor_national_id: '',
        phone_number: '',
        birth_date: null,
        guarantor_address: '',
        postal_code: '',
        gender: '',
        company_agent: '',
        document_news_paper: '',
        position_title: '',
        company_national_id: '',
      },

      fees: {
        investor_request_id: null,
        design_wage: '',
        farabours_wage: '',
        execution_wage: '',
        marketing_wage: '',
        company_certificate_wage: '',
      },

      interest_rate_plan: '',
      buoyancy_plan: '',
    }),

  initializeStore: (data) => {
    if (!data) {
      set({
        executiveContract: {
          bank: '',
          bank_branch: '',
          bank_branch_code: '',
          evaluation: null,
          executive_contract: null,
          payment_bank: '',
          payment_bank_branch: '',
          payment_account_number: '',
          sheba_number: '',
        },
        interest_rate_plan: '',
        buoyancy_plan: '',
      });
      return;
    }

    const defaultValue = (value, defaultVal = '') => value ?? defaultVal;

    const boardMembersFiles = {};

    const companyMembers = data?.company_members || [];

    companyMembers.forEach((member) => {
      if (member?.id) {
        boardMembersFiles[member.id] = {
          validation_report: member.validation_report || null,
          previous_article: member.previous_article || null,
          national_card: member.national_cart || null,
          identity_card: member.birth_certificate || null,
        };
      }
    });

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
        logo: defaultValue(data.logo),
      },
      bankInfo: {
        bank: defaultValue(data.bank),
        bank_branch: defaultValue(data.bank_branch),
        bank_branch_code: defaultValue(data.bank_branch_code),
      },
      registerInfo: {
        suggestion_plan_name: defaultValue(data.suggestion_plan_name),
        amount_of_investment: defaultValue(data.amount_of_investment),
        refund_of_plan: defaultValue(data.refund_of_plan, '0'),
        subject_activity_document: defaultValue(data.subject_activity_document, ''),
        activity_feild: defaultValue(data.activity_feild, ''),
      },
      boardMembers: data.company_members || [],
      boardMembersFiles,
      agencyContract: {
        agency_agreement_date: data.agency_agreement_date || null,
        auditor_response: data.auditor_response || null,
        warranty: data.warranty || null,
        account_number_letter: data.account_number_letter || null,
        financial_exel: data.financial_exel || null,
        bank_letter_number: data.bank_letter_number || null,
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
        execution_resume: defaultValue(data.execution_resume),
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
        payment_bank: defaultValue(data.payment_bank),
        payment_bank_branch: defaultValue(data.payment_bank_branch),
        payment_account_number: defaultValue(data.payment_account_number),
        sheba_number: defaultValue(data.sheba_number),
      },
      commentStep1: defaultValue(data.comment_step_1),
      commentStep2: defaultValue(data.comment_step_2),
      commentStep3: defaultValue(data.comment_step_3),
      commentStep4: defaultValue(data.comment_step_4),
      commentStep5: defaultValue(data.comment_step_5),
      description: defaultValue(data.description),
      actionStatus: defaultValue(data.step_1),

      companyCost: {
        description: defaultValue(data.company_cost?.description, ''),
        amount_of_3_months: defaultValue(data.company_cost?.amount_of_3_months, 0),
        amount_of_year: defaultValue(data.company_cost?.amount_of_year, 0),
      },

      profitAndLossForecast: {
        three_month_sales_profit_and_loss_forecast: defaultValue(
          data.profit_and_loss_forecast?.three_month_sales_profit_and_loss_forecast,
          ''
        ),
        annual_sales_profit_and_loss_forecast: defaultValue(
          data.profit_and_loss_forecast?.annual_sales_profit_and_loss_forecast,
          ''
        ),
        three_month_cost_profit_and_loss_forecast: defaultValue(
          data.profit_and_loss_forecast?.three_month_cost_profit_and_loss_forecast,
          ''
        ),
        three_month_profit_and_loss_forecast: defaultValue(
          data.profit_and_loss_forecast?.three_month_profit_and_loss_forecast,
          ''
        ),
        annual_cost_profit_and_loss_forecast: defaultValue(
          data.profit_and_loss_forecast?.annual_cost_profit_and_loss_forecast,
          ''
        ),
        annual_profit_and_loss_forecast: defaultValue(
          data.profit_and_loss_forecast?.annual_profit_and_loss_forecast,
          ''
        ),
        amount_production: defaultValue(data.profit_and_loss_forecast?.amount_production, ''),
      },

      performanceForecast: {
        annual_total_income_forecast: defaultValue(
          data.performance_forecast?.annual_total_income_forecast,
          ''
        ),
        annual_total_cost_forecast: defaultValue(
          data.performance_forecast?.annual_total_cost_forecast,
          ''
        ),
        annual_gross_profit_of_the_plan_forecast: defaultValue(
          data.performance_forecast?.annual_gross_profit_of_the_plan_forecast,
          ''
        ),
        annual_profit_margin_of_the_plan_forecast: defaultValue(
          data.performance_forecast?.annual_profit_margin_of_the_plan_forecast,
          ''
        ),
        annual_shareholders_equity_ratio_forecast: defaultValue(
          data.performance_forecast?.annual_shareholders_equity_ratio_forecast,
          ''
        ),
        three_months_total_income_forecast: defaultValue(
          data.performance_forecast?.three_months_total_income_forecast,
          ''
        ),
        three_months_total_cost_forecast: defaultValue(
          data.performance_forecast?.three_months_total_cost_forecast,
          ''
        ),
        three_months_gross_profit_of_the_plan_forecast: defaultValue(
          data.performance_forecast?.three_months_gross_profit_of_the_plan_forecast,
          ''
        ),
        three_months_profit_margin_of_the_plan_forecast: defaultValue(
          data.performance_forecast?.three_months_profit_margin_of_the_plan_forecast,
          ''
        ),
        three_months_shareholders_equity_ratio_forecast: defaultValue(
          data.performance_forecast?.three_months_shareholders_equity_ratio_forecast,
          ''
        ),
      },

      checks: {
        date: defaultValue(data.checks?.date, ''),
        amount: defaultValue(data.checks?.amount, null),
        bank_name: defaultValue(data.checks?.bank_name, ''),
        branch_name: defaultValue(data.checks?.branch_name, ''),
        type: defaultValue(data.checks?.type, null),
        fishing: defaultValue(data.checks?.fishing, ''),
        investor_request: defaultValue(data.checks?.investor_request, null),
      },

      warranty: {
        date: defaultValue(data.warranty?.date, null),
        description: defaultValue(data.warranty?.description, ''),
        value: defaultValue(data.warranty?.value, null),
        number: defaultValue(data.warranty?.number, ''),
        sepam_id: defaultValue(data.warranty?.sepam_id, ''),
        type: defaultValue(data.warranty?.type, null),
        investor_request: defaultValue(data.warranty?.investor_request, null),
      },

      guarantorInfo: {
        guarantor_name: defaultValue(data.guarantor_name),
        guarantor_national_id: defaultValue(data.guarantor_national_id),
        phone_number: defaultValue(data.phone_number),
        birth_date: data.birth_date ? new Date(data.birth_date) : null,
        guarantor_address: defaultValue(data.guarantor_address),
        postal_code: defaultValue(data.postal_code),
        gender: defaultValue(data.gender),

        company_agent: defaultValue(data.company_agent),
        position_title: defaultValue(data.position_title),
        document_news_paper: defaultValue(data.document_news_paper),
        company_national_id: defaultValue(data.company_national_id),
      },

      fees: {
        investor_request_id: defaultValue(data.investor_request_id),
        design_wage: defaultValue(data.company_cost?.design_wage),
        farabours_wage: defaultValue(data.company_cost?.farabours_wage),
        execution_wage: defaultValue(data.company_cost?.execution_wage),
        marketing_wage: defaultValue(data.company_cost?.marketing_wage),
        company_certificate_wage: defaultValue(data.company_cost?.company_certificate_wage),
      },

      interest_rate_plan: defaultValue(data.interest_rate_plan),
      buoyancy_plan: defaultValue(data.buoyancy_plan),
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

  submitCompanyLogo: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      if (
        state.companyInfo.company.picture &&
        state.isActualFile(state.companyInfo.company.picture)
      ) {
        formData.append('picture', state.company.picture);
      }

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  setCompanyCost: (data) => set({ companyCost: data }),

  updateCompanyCost: (field, value) =>
    set((state) => ({
      companyCost: {
        ...state.companyCost,
        [field]: value,
      },
    })),

  submitCompanyCostForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      formData.append('description', state.companyCost.description);
      formData.append('amount_of_3_months', state.companyCost.amount_of_3_months);
      formData.append('amount_of_year', state.companyCost.amount_of_year);

      set({ isLoading: false });
      return formData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  setProfitAndLossForecast: (data) => set({ profitAndLossForecast: data }),
  setAssumptions: (data) => set({ assumptions: data }),
  setPerformanceForecast: (data) => set({ performanceForecast: data }),
  setChecks: (data) => set({ checks: data }),
  setWarranty: (data) => set({ warranty: data }),

  submitProfitAndLossForecast: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const formData = new FormData();

      Object.entries(state.profitAndLossForecast).forEach(([key, value]) => {
        if (value !== null && value !== '') {
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

  updatePerformanceForecast: (field, value) =>
    set((state) => ({
      performanceForecast: {
        ...state.performanceForecast,
        [field]: value,
      },
    })),

  submitPerformanceForecast: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const formData = new FormData();

      Object.entries(state.performanceForecast).forEach(([key, value]) => {
        if (value !== null && value !== '') {
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

  setGuarantorInfo: (info) => set({ guarantorInfo: info }),

  updateGuarantorInfo: (field, value) =>
    set((state) => ({
      guarantorInfo: {
        ...state.guarantorInfo,
        [field]: value,
      },
    })),

  submitGuarantorInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = get();

      const jsonData = {
        investor_request_id: state.guarantorInfo.investor_request_id,
        guarantor_name: state.guarantorInfo.guarantor_name,
        guarantor_national_id: state.guarantorInfo.guarantor_national_id,
        phone_number: state.guarantorInfo.phone_number,
        birth_date: state.guarantorInfo.birth_date,
        guarantor_address: state.guarantorInfo.guarantor_address,
        postal_code: state.guarantorInfo.postal_code,
        gender: state.guarantorInfo.gender,
        company_agent: state.guarantorInfo.company_agent,
        position_title: state.guarantorInfo.position_title,
        document_news_paper: state.guarantorInfo.document_news_paper,
        company_national_id: state.guarantorInfo.company_national_id,
      };

      if (jsonData.birth_date) {
        if (typeof jsonData.birth_date.toDate === 'function') {
          jsonData.birth_date = jsonData.birth_date.toDate().toISOString();
        } else if (jsonData.birth_date instanceof Date) {
          jsonData.birth_date = jsonData.birth_date.toISOString();
        } else if (typeof jsonData.birth_date === 'string') {
          jsonData.birth_date = new Date(jsonData.birth_date).toISOString();
        }
      }

      Object.keys(jsonData).forEach(key => {
        if (jsonData[key] === null || jsonData[key] === undefined || jsonData[key] === '') {
          delete jsonData[key];
        }
      });

      set({ isLoading: false });
      return jsonData;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return null;
    }
  },

  setFees: (feesData) => set({ fees: feesData }),

  updateFeeField: (field, value) =>
    set((state) => ({
      fees: {
        ...state.fees,
        [field]: value,
      },
    })),

  setInvestorRequestIdForFees: (id) =>
    set((state) => ({
      fees: {
        ...state.fees,
        investor_request_id: id,
      },
    })),

  submitFeesForm: async () => {
    set({ isLoading: true, error: null });

    try {
      const state = get();
      const formData = new FormData();

      Object.entries(state.fees).forEach(([key, value]) => {
        if (value !== null && value !== '') {
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

  updateNumberField: (id, value) =>
    set((state) => ({
      [id]: value,
    })),

  resetGuarantorInfo: () =>
    set({
      guarantorInfo: {
        investor_request_id: null,
        guarantor_name: '',
        guarantor_national_id: '',
        phone_number: '',
        birth_date: '',
        guarantor_address: '',
        postal_code: '',
        gender: '',
        company_agent: '',
        position_title: '',
        document_news_paper: '',
        company_national_id: '',
      },
    }),
}));

export default useCompanyInfoStore;
