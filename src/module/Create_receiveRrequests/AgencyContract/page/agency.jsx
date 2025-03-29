import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PrintableContractLayout from 'src/layouts/dashboard/printableLayourtContract';
import generatePDF from 'react-to-pdf';

import useAgencyContract from '../hooks/useAgencyContract';
import { PAGES } from '../feature/agancyContract';

const Agency = () => {
  const { uuid } = useParams();
  const [finalUuid, setFinalUuid] = useState('');
  const targetRef = useRef();

  useEffect(() => {
    if (uuid && uuid !== 'undefined') {
      setFinalUuid(uuid);
    }
  }, [uuid]);

  const { data: agencyContract } = useAgencyContract(finalUuid);

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
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-between gap-1">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div className="border border-gray-300 rounded p-1 w-full">
                <div className="text-center flex flex-col h-[80px] justify-center">
                  <p className="font-bold text-[18px] leading-tight">{user.person_title}</p>
                  <p className="text-[16px] text-gray-600 leading-tight">{user.position_title}</p>
                </div>
                <div className="h-[60px] border-dashed border border-gray-300 rounded flex items-center justify-center mt-1">
                  <p className="text-gray-400 text-[16px]">محل امضاء</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const options = {
    filename: 'my-file.pdf',
    page: {
      format: 'A4',
      orientation: 'portrait',
      margin: 0,
    },
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto flex justify-center items-center w-80 mb-8 "
        type="button"
        onClick={() => generatePDF(targetRef, options)}
      >
        چاپ
      </button>
      <div className="contract-container" ref={targetRef}>
        {PAGES.map((PageComponent, index) => (
          <div key={`page-${index}`} className="mb-8">
            <PrintableContractLayout footerChildren={renderFooterSignatures()}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-sm text-sm border border-gray-100"
              >
                <PageComponent agencyContract={agencyContract} />
              </motion.div>
            </PrintableContractLayout>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agency;
