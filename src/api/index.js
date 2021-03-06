import { instance } from '../index';

class Api {
  static getInstance() {
    if (!Api.instance) {
        Api.instance = new Api();
    }
    return Api.instance;
  };

  async req({ apiCall, res200, res404, reject, apiCallParams }) {
    return await apiCall(apiCallParams)
      .then(function({ data, status }) {
        if (status === 200) {
          return res200(data);
        }

        if (status === 404) {
          return res404();
        }
      })
      .catch(function(err) {
        reject(err);
      });
  };

  async createCart() {
    return await instance.post('cart');
  };

  async getCatalogCampsGroup({ sport, businessType, boarding, age, gender, group, secondaryGroup }) {
    
    return await instance.get('catalog/camps/groups', {
      params: {
        sport,
        gender,
        boarding,
        age,
        business_type: businessType,
      },
    });
  };

  async getCatalogCamps({ business_type, program_type, sport, age, gender, start_date, end_date }) {
    return await instance.get('catalog/camps', {
      params: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  };
  
  async getCatalogCampsConcetrations({business_type, sport, age, gender, start_date, end_date}) {
    return await instance.get('catalog/camps/concentrations', {
      params: {
        business_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }

  async postCartCartIdParticipant({ cartId, email }) {
    return await instance.post(`cart/${cartId}/participant`, {
      email,
    });
  };

  async getCatalogGear({ gender, age }) {
    return await instance.get('catalog/gear', {
      params: {
        gender,
        age
      },
    });
  };

  async getCatalogExcursionsNew({ startDate, endDate, age }) {
    return await instance.get('catalog/excursions-new', {
      params: {
        start_date: startDate,
        end_date: endDate,
        age: age
      },
    });
  };

  async getCatalogCampsCalendar({ age, boarding, business_type, gender, package_type, sport, group, secondary_group, length, }) {
    return await instance.get('catalog/camps/calendar', {
      params: {
        age,
        boarding,
        business_type,
        gender,
        package_type,
        sport,
        group,
        secondary_group,
        length,
      },
    });
  };

  async putCartCartIdParticipantParticipantId({ cartId, participantId, gender, age, ...rest }) {
    return await instance.put(`cart/${cartId}/participant/${participantId}`, {
      gender,
      age,
      firstName: rest.firstName,
      lastName: rest.lastName,
      phone: rest.phone,
      dob: rest.dob,
      first_name: rest.first_name,
      last_name: rest.last_name,
      position: rest.position,
      preferred_shirt_size: rest.preferred_shirt_size,
      email: rest.email,
    });
  };

  async getCatalogCampsLevels(args) {
    const {
      sport, business_type, package_type, gender, boarding, group, secondary_group, age, date,
    } = args;
    return await instance.get('catalog/camps/levels', {
      params: {
        sport,
        business_type,
        package_type,
        gender,
        boarding,
        age,
        group,
        secondary_group,
        date,
      },
    });
  };

  async postCartCartIdParticipantIdProduct({ attributes, cartId, participantId, product, quantity, productId, type, refundable = false }) {
    return await instance.post(`cart/${cartId}/participant/${participantId}/product`, {
      attributes,
      product,
      type,
      quantity,
      refundable,
      product_id: productId,
    });
  };

  async deleteCartCartIdParticipantParticipantIdProductId({ cartId, participantId, productId }) {
    return await instance.delete(`cart/${cartId}/participant/${participantId}/product/${productId}`);
  };
  
  // async updateCartCartParticipantProductRefundable({ cartId, participantId, productId, product, refundable = false }) {
  //   return await instance.put(`cart/${cartId}/participant/${participantId}/product/${productId}`, {
  //     ...product,
  //     refundable,
  //   });
  // }
  
  async updateCartCartParticipantProductRefundable({ cartId, refundable = false }) {
    return await instance.get(`cart/${cartId}/refundable/process/${refundable}`);
  }
  
  async recalculateInsurancePrice({ cartId }) {
    return await instance.get(`cart/${cartId}/refundable/calculate`);
  }

  async putCartCartIdParticipantParticipantIdProductId({ attributes, cartId, participantId, productId, product, type, refundable = false, quantity = 1 }) {
    return await instance.put(`cart/${cartId}/participant/${participantId}/product/${productId}`, {
      attributes,
      product,
      type,
      quantity,
      refundable,
    });
  }

  async getCatalogCampsHistogram({ sport, gender, boarding, days, age }) {
    return await instance.get('catalog/camps/histogram', {
      params: {
        sport,
        gender,
        boarding,
        days,
        age,
      },
    });
  };
  
  async getCatalogCampsHistogramOnly({ sport, gender, business_type }) {
    return await instance.get('catalog/camps/histogram', {
      params: {
        group_by: 'age_from,age_to,gender,boarding',
        business_type: business_type,
        sport: sport,
        gender: gender,
      },
    });
  };

  async getCatalogTransport() {
    return await instance.get('catalog/transport');
  };

  async getCatalogAirlines() {
    return await instance.get('catalog/airlines');
  };

  async getCatalogTransportUnaccompanied() {
    return await instance.get('catalog/transport/unaccompanied');
  };

  async getCatalogCampCampId(selectedCampId) {
    return await instance.get(`catalog/camp/${selectedCampId}`);
  };

  async getCatalogGearUpsellNew({ business_type, package_type, sport, gender, boarding, age, start_date, end_date }) {
    return await instance.get('catalog/gear/upsell-new', {
      params: {
        business_type,
        package_type,
        sport,
        gender,
        boarding,
        age,
        start_date,
        end_date,
      },
    });
  };

  async getCatalogPositions({ sport, participant }) {
    return await instance.get('catalog/positions', {
      params: {
        sport,
        participant,
      },
    });
  };

  async putCartCartId({ cartId, ...rest }) {
    return await instance.put(`cart/${cartId}`, {
      ...rest,
    })
  }
  
  async getLaundryService() {
    return await instance.get('catalog/gear/laundry');
  }
  
}

export default Api.getInstance();
