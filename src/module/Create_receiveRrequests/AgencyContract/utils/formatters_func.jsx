const formatMillionRials = (value) =>
  value ? `${value.toLocaleString('en-US')} میلیون ریال` : '0 میلیون ریال';

const formatAmount = (amount) => {
  if (!amount) return '0';
  const millionAmount = amount / 1000000;
  return millionAmount.toLocaleString('en-US');
};

const formatNumber = (amount) => {
  if (!amount) return '0';
  const millionAmount = amount / 1000000;
  return millionAmount.toLocaleString('en-US');
};

const formatRials = (value) => {
  if (!value) return '0 ریال';
  return `${value.toLocaleString('en-US')} ریال`;
};

const formatPercentage = (value) => (value ? `${value}%` : '0%');

export { formatRials, formatAmount, formatNumber, formatPercentage, formatMillionRials };
