import { useState } from 'react';
import { IranMap } from 'react-iran-map';
import useCity from '../hook/useCity';

const CityAnalyzes = () => {
  const { data: cityData, isLoading } = useCity();
  const [selectedDataType, setSelectedDataType] = useState('all_payments_by_birthplace');
  const [isChanging, setIsChanging] = useState(false);

  const dataTypes = {
    all_payments_by_birthplace: {
      title: 'تعداد پرداخت‌ها بر اساس محل تولد',
      data: cityData?.all_payments_by_birthplace,
    },
    successful_payments_by_residence: {
      title: 'تعداد پرداخت‌های موفق بر اساس محل سکونت',
      data: cityData?.successful_payments_by_residence,
    },
    residence_city_counts: {
      title: 'تعداد افراد بر اساس محل سکونت',
      data: cityData?.residence_city_counts,
    },
    birth_place_counts: {
      title: 'تعداد افراد بر اساس محل تولد',
      data: cityData?.birth_place_counts,
    },
  };

  const mapData = dataTypes[selectedDataType]?.data;

  const handleDataTypeChange = (key) => {
    setIsChanging(true);
    setSelectedDataType(key);
    setTimeout(() => {
      setIsChanging(false);
    }, 500);
  };

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!cityData) {
    return <div>داده‌ای یافت نشد</div>;
  }

  return (
    <div style={{ fontFamily: 'vazir' }}>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(dataTypes).map(([key, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => handleDataTypeChange(key)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              backgroundColor: selectedDataType === key ? '#3bcc6d' : '#fff',
              color: selectedDataType === key ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              fontFamily: 'vazir',
              fontWeight: 'bold',
            }}
          >
            {value.title}
          </button>
        ))}
      </div>
      <div
        style={{
          opacity: isChanging ? 0.5 : 1,
          transition: 'opacity 0.3s ease',
          position: 'relative',
        }}
      >
        {isChanging && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3bcc6d',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        <IranMap
          data={mapData}
          colorRange="30, 70, 181"
          width={600}
          textColor="#000"
          deactiveProvinceColor="#eee"
          selectedProvinceColor="#3bcc6d"
          tooltipTitle="تعداد:"
        />
      </div>
    </div>
  );
};

export default CityAnalyzes;

const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;
document.head.appendChild(style);
