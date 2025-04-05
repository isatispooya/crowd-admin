import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PrintableContractLayout from 'src/layouts/dashboard/printableLayourtContract';
import { OnRun } from 'src/api/OnRun';
import useAgencyContract from '../hooks/useAgencyContract';
import { PAGES } from '../feature/ExecutiveContract';

const printStyles = `
  @media print {
    .page-break-before {
      page-break-before: always;
    }
    
    @page {
      size: A4;
      margin: 0.5cm;
    }
    
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

const ExecutiveContract = () => {
  const { uuid } = useParams();
  const [finalUuid, setFinalUuid] = useState('');

  useEffect(() => {
    if (uuid && uuid !== 'undefined') {
      setFinalUuid(uuid);
    }
  }, [uuid]);

  const { data: agencyContract } = useAgencyContract(finalUuid);

  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1">
            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-20 object-contain"
            />
          </div>
        )}
      </div>
    );
  };

  const renderFooterSignatures = () => {
    if (!agencyContract || !agencyContract.company_members) return null;

    const signatoryMembers = agencyContract.company_members.filter(
      (member) => member.signature === true
    );

    const staticUsers = [
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'مدیر عامل' },
      { person_title: 'محسن زارعیان', position_title: 'رئیس هیئت مدیره' },
    ];

    const allSignatories = [...staticUsers];

    if (signatoryMembers.length > 0) {
      signatoryMembers.forEach((member) => {
        const isDuplicate = staticUsers.some((user) => user.person_title === member.person_title);
        if (!isDuplicate) {
          allSignatories.push({
            person_title: member.person_title,
            position_title: member.position_title,
          });
        }
      });
    }

    return (
      <div className="mt-4">
        <div className="flex justify-between gap-1">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div className="border border-gray-300 rounded p-1 w-full">
                <div className="text-center">
                  <p className="font-bold text-[10px]">{user.person_title}</p>
                  <p className="text-[8px] text-gray-600">{user.position_title}</p>
                </div>
                <div className="h-10 border-dashed border border-gray-300 rounded flex items-center justify-center mt-1">
                  <p className="text-gray-400 text-[8px]">محل امضاء</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!agencyContract) return null;

  return (
    <div className="contract-container">
      <style>{printStyles}</style>

      {PAGES.map((PageComponent, index) => (
        <div key={`page-${index}`} className={index > 0 ? 'page-break-before' : ''}>
          <PrintableContractLayout
            headerChildren={renderHeaderContent()}
            footerChildren={renderFooterSignatures()}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-5 rounded-lg shadow-sm text-sm border border-gray-100 min-h-[60vh]"
            >
              <PageComponent data={agencyContract} />
            </motion.div>
          </PrintableContractLayout>
        </div>
      ))}
    </div>
  );
};

export default ExecutiveContract;
