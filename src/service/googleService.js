import axios from 'axios';
import { GOOGLE_API_KEY } from '../../config/config';

export const getAddressFromCoordinates = async ({latitude, longitude}) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    );
    if (response.data.results.length > 0) {
      console.log(response.data.results[0].formatted_address)
      return extractAddressComponents(response.data.results[0]);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function extractAddressComponents(addressObject) {
  const components = addressObject.address_components;
  const address = {
    streetName: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    country: '',
  };

  components.forEach(component => {
    if (component.types.includes('street_number')) {
      address.streetNumber = component.long_name;
    } else if (component.types.includes('route')) {
      address.streetName = component.long_name;
    } else if (component.types.includes('locality')) {
      address.city = component.long_name;
    } else if (component.types.includes('administrative_area_level_1')) {
      address.state = component.long_name;
    } else if (component.types.includes('country')) {
      address.country = component.long_name;
    } else if (component.types.includes('postal_code')) {
      address.postalCode = component.long_name;
    }
  });

  return address;
}
