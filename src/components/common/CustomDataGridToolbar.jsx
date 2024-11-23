import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Button } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportToExcel } from 'src/utils/excelExport';

const CustomDataGridToolbar = ({ 
  data, 
  fileName = 'export',
  customExcelData,
}) => {
  const handleExport = useCallback(() => {
    try {
      if (!data || data.length === 0) {
        console.error('No data available for export');
        return;
      }

  
      const excelData = customExcelData ? customExcelData(data) : data;
      
      exportToExcel(excelData, fileName);
    } catch (error) {
      console.error('Error in export:', error);
    }
  }, [data, fileName, customExcelData]);

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        color="primary"
        startIcon={<FileDownloadIcon />}
        onClick={handleExport}
        size="small"
      >
        دانلود اکسل
      </Button>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

CustomDataGridToolbar.propTypes = {
  data: PropTypes.array.isRequired,
  fileName: PropTypes.string,
  customExcelData: PropTypes.func,
};

export default CustomDataGridToolbar; 