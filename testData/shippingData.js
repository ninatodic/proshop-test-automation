const shippingData = {
  withoutAddress: {
    address: '',
    city: 'Los Angeles',
    postalCode: '90001',
    country: 'California',
  },
  withoutCity: {
    address: '591 Grand Avenue',
    city: '',
    postalCode: '90001',
    country: 'California',
  },
  withoutPostalCode: {
    address: '591 Grand Avenue',
    city: 'Los Angeles',
    postalCode: '',
    country: 'California',
  },
  withoutCountry: {
    address: '591 Grand Avenue',
    city: 'Los Angeles',
    postalCode: '90001',
    country: '',
  },

  correctData: {
    address: '591 Grand Avenue',
    city: 'Los Angeles',
    postalCode: '90001',
    country: 'California',
  },
};

module.exports = shippingData;
