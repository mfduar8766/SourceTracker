export const agencyHeaders = [
  { id: 0, name: 'Agency Id', prop: 'agencyId' },
  { id: 1, name: 'Agency Name', prop: 'agencyName' },
  { id: 2, name: 'City', prop: 'city' },
  { id: 3, name: 'State', prop: 'state' },
  { id: 4, name: 'Address', prop: 'address' },
  { id: 5, name: 'ZipCode', prop: 'zipCode' },
  { id: 6, name: 'Agents', prop: 'totalAgents' },
  { id: 7, name: '', prop: '' }
];

export const validateAgenciesFrom = values => {
  const errors = {};
  if (values.agencyName === '') {
    errors.agencyName = 'Invalid name.';
  } else if (values.city === '') {
    errors.city = 'Invalid city.';
  } else if (values.state === '') {
    errors.state = 'Invalid state.';
  } else if (values.address === '') {
    errors.address = 'Invalid address.';
  } else if (values.zipCode === '') {
    errors.zipCode = 'Invalid zipCode.';
  } else if (values.zipCode.length > 4) {
    errors.zipCode = 'Invalid zipCode.';
  }
  return errors;
};
