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
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'عضو هیئت مدیره' },
      { person_title: 'محسن زارعیان', position_title: 'مدیرعامل' },
    ];

    return (
      <div className="absolute bottom-0 left-0 right-0">
        <table className="w-full border-collapse text-sm">
          <tr>
            <td className="border border-gray-300 p-2 text-center w-1/2 font-bold">
              <div>عامل</div>
            </td>
            <td className="border border-gray-300 p-2 text-center w-1/2 font-bold">
              <div>متقاضی</div>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 rounded-lg">
              <div className="flex justify-between">
                {staticUsers.map((user, index) => (
                  <div key={`static-signatory-${index}`} className="text-center w-96">
                    <p className="font-bold mb-1">{user.person_title}</p>
                    <p className="text-sm text-gray-600 mb-2">{user.position_title}</p>
                    <div className="border border-gray-300 rounded h-16 w-full mb-1">
                      <p className="text-gray-400 text-sm pt-6 border-dotted border-t border-gray-300 w-full">
                        محل امضاء
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-gray-300 p-2 rounded-lg">
              <div className="flex flex-row gap-4 justify-center">
                {signatoryMembers.map((member, index) => (
                  <div key={`dynamic-signatory-${index}`} className="text-center w-96">
                    <p className="font-bold mb-1">{member.person_title}</p>
                    <p className="text-sm text-gray-600 mb-2">{member.position_title}</p>
                    <div className="border border-gray-300 rounded h-16 w-full mb-1">
                      <p className="text-gray-400 text-sm pt-6 border-dotted border-t border-gray-300 w-full">
                        محل امضاء
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </table>
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
