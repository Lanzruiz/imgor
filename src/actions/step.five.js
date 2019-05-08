// Constants
import * as stepFiveTypes from '../constants/step.five';
import { stepsEnum } from '../constants/steps';
// Actions
import { setStepsCounter } from './steps';
import { updateCart } from './cart';
// Api
import Api from '../api';

export function getCatalogGearRequest({ gender }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGear,
      apiCallParams: { gender },
      res200: (data) => {
        dispatch( getCatalogGear(data), );
        if (data.results && (data.results.length === 0)) {
          dispatch( setStepsCounter(stepsEnum.six), );
        }
      },
      res404: () => console.log('Api.getCatalogGear() => 404'), // TODO: Add error handler!
      reject: console.error,
    });
  };
};

function getCatalogGear(catalogGear) {
  return {
    type: stepFiveTypes.GET_CATALOG_GEAR,
    payload: catalogGear,
  };
};

export function stepFiveSetGear(gearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_GEAR,
    payload: gearId,
  };
};

export function stepFiveIncrementSelectedGearQuantity(selectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREMENT_SELECTED_GEAR_QUANTITY,
    payload: selectedGearId,
  };
};

export function stepFiveDecrementSelectedGearQuantity(selectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_DECREMENT_SELECTED_GEAR_QUANTITY,
    payload: selectedGearId,
  };
};

export function stepFiveSetDefaultState() {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_DEFAULT_STATE,
  };
};

export function stepFiveSelectDropdownItem(selectedOptionIdSelectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_SELECT_DROPDOWN_OPTION,
    payload: selectedOptionIdSelectedGearId,
  };
};

function getCatalogGearUpsellNew(data) {
  return {
    type: stepFiveTypes.STEP_SIX_GET_CATALOG_GEAR_UPSELL_NEW,
    payload: data,
  };
};

export function getCatalogGearUpsellNewRequest({ business_type, package_type, sport, gender, boarding, age, start_date, end_date }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGearUpsellNew,
      res200: data => {
        const testData = {
          "timezone": "UTC",
          "total": 814,
          "starting_price": 150,
          "results": [
            {
              "name": "Driver Fitting - 60-90 Minutes",
              "image_url": "https://www.imgacademy.com/sites/default/files/club-fitting-drivers.jpg",
              "weight": 0,
              "description": "Done with premium golf balls, the driver fitting measures current driver length, swing weight and shaft frequency. Swing and launch characteristics are measured. Equipment recommendations are made based on the player\u2019s unique swing dynamics and our proprietary software.",
              "categories": [ { "name": "Sport Specific", "display_name": "Sport Specific", "weight": "2" } ],
              "dates": [
                {
                  "id": 79016,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "023DA949-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-24",
                  "capacity_end_date": "2019-05-24",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79638,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0311A374-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-06",
                  "capacity_end_date": "2019-10-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79647,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "06A629EF-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-15",
                  "capacity_end_date": "2019-10-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79108,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "06AD759D-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-15",
                  "capacity_end_date": "2019-06-15",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79452,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "070EE9D0-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-03",
                  "capacity_end_date": "2019-09-03",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79323,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "09914741-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79376,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0B8FE597-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-09",
                  "capacity_end_date": "2019-08-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79261,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0B913744-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-16",
                  "capacity_end_date": "2019-07-16",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79510,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0C7C1922-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-10",
                  "capacity_end_date": "2019-09-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79508,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0CBE6009-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-08",
                  "capacity_end_date": "2019-09-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79137,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0DC39260-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-25",
                  "capacity_end_date": "2019-06-25",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79266,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "0F2EDB87-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79509,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "10339E15-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-09",
                  "capacity_end_date": "2019-09-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79187,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "116A48CA-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79268,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "134B64A7-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79072,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "1551A967-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-03",
                  "capacity_end_date": "2019-06-03",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79325,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "15EF0B5A-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-05",
                  "capacity_end_date": "2019-08-05",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79387,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "1825561F-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-20",
                  "capacity_end_date": "2019-08-20",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 78981,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "1BCBF58D-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-17",
                  "capacity_end_date": "2019-05-17",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79259,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "1C61E82B-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79189,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "1D2593DC-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79705,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "215A0752-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-23",
                  "capacity_end_date": "2019-10-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79506,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "216A68F6-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-06",
                  "capacity_end_date": "2019-09-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79453,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "268577DD-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-04",
                  "capacity_end_date": "2019-09-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79260,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "2A182738-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-15",
                  "capacity_end_date": "2019-07-15",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79133,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "2CF1B735-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-21",
                  "capacity_end_date": "2019-06-21",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79265,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "2D22AC7B-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-20",
                  "capacity_end_date": "2019-07-20",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79514,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "2F38A153-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-14",
                  "capacity_end_date": "2019-09-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79507,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "2FB9B3FC-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-07",
                  "capacity_end_date": "2019-09-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79648,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "2FCD79FB-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-16",
                  "capacity_end_date": "2019-10-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80424,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "31BD8749-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-02",
                  "capacity_end_date": "2019-06-02",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79377,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "349602A4-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79318,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "364BA4FC-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-29",
                  "capacity_end_date": "2019-07-29",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79194,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "3772B813-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-12",
                  "capacity_end_date": "2019-07-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79135,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "37BB1948-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79442,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "37E21456-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-24",
                  "capacity_end_date": "2019-08-24",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79640,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "3966498D-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-08",
                  "capacity_end_date": "2019-10-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79450,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "3C1FC2B8-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-01",
                  "capacity_end_date": "2019-09-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79587,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "4041F93C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-02",
                  "capacity_end_date": "2019-10-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79443,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "451F2E62-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-25",
                  "capacity_end_date": "2019-08-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79140,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "4624C4E5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-18",
                  "capacity_end_date": "2019-06-18",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79448,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "4ACDCF9F-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-30",
                  "capacity_end_date": "2019-08-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79075,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "4F0A0AB7-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-06",
                  "capacity_end_date": "2019-06-06",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79141,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "4F2AD503-4602-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-19",
                  "capacity_end_date": "2019-06-19",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79580,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "52D87FE1-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-25",
                  "capacity_end_date": "2019-09-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80272,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "5464B466-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-26",
                  "capacity_end_date": "2019-06-26",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79015,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "54FA102B-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-23",
                  "capacity_end_date": "2019-05-23",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79322,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "5503ED34-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-02",
                  "capacity_end_date": "2019-08-02",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79646,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "56B5F6DC-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-14",
                  "capacity_end_date": "2019-10-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79516,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "59B4186C-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-16",
                  "capacity_end_date": "2019-09-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79636,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "5BFA3C5C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-04",
                  "capacity_end_date": "2019-10-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79267,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "5F339894-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-22",
                  "capacity_end_date": "2019-07-22",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79139,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "5FAF9ECD-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-17",
                  "capacity_end_date": "2019-06-17",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79321,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "613ECE28-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-01",
                  "capacity_end_date": "2019-08-01",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79183,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "6221789E-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-01",
                  "capacity_end_date": "2019-07-01",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79577,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "670CF2BB-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-22",
                  "capacity_end_date": "2019-09-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79446,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "69FC2D87-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-28",
                  "capacity_end_date": "2019-08-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79585,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "6C19A124-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-30",
                  "capacity_end_date": "2019-09-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79104,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "6D9F7435-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-11",
                  "capacity_end_date": "2019-06-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79316,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "6EC910DE-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-27",
                  "capacity_end_date": "2019-07-27",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79014,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7162EF12-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-22",
                  "capacity_end_date": "2019-05-22",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 78978,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "72AB2E45-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-14",
                  "capacity_end_date": "2019-05-14",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79384,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "73DDFAF9-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-17",
                  "capacity_end_date": "2019-08-17",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79512,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7580F73A-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-12",
                  "capacity_end_date": "2019-09-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79575,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "761B68A3-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-20",
                  "capacity_end_date": "2019-09-20",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79324,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "77A7DB4D-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79044,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "78B155BD-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-28",
                  "capacity_end_date": "2019-05-28",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79579,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7B0B01D5-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-24",
                  "capacity_end_date": "2019-09-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79708,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7F3D617D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-26",
                  "capacity_end_date": "2019-10-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78979,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7F567F5D-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-15",
                  "capacity_end_date": "2019-05-15",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79578,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7F7B79C8-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-23",
                  "capacity_end_date": "2019-09-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79639,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "7FC10681-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-07",
                  "capacity_end_date": "2019-10-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79046,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8157A8F3-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-30",
                  "capacity_end_date": "2019-05-30",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79327,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "83C29878-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79386,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "876D2013-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-19",
                  "capacity_end_date": "2019-08-19",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79134,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8779C43B-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79017,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8953C661-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-25",
                  "capacity_end_date": "2019-05-25",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79013,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8A90C8F4-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-21",
                  "capacity_end_date": "2019-05-21",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79380,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8C4C62C8-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-13",
                  "capacity_end_date": "2019-08-13",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 82850,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8F03C937-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-22",
                  "capacity_end_date": "2019-08-22",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79181,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "8F3CC68B-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79519,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "9027EE90-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-19",
                  "capacity_end_date": "2019-09-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79449,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "930E7AAC-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-31",
                  "capacity_end_date": "2019-08-31",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79193,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "960B1507-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-11",
                  "capacity_end_date": "2019-07-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79326,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "975EA06C-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-06",
                  "capacity_end_date": "2019-08-06",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79709,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "981DB389-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-27",
                  "capacity_end_date": "2019-10-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79047,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "99CFDA0B-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-31",
                  "capacity_end_date": "2019-05-31",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79388,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "9A277B2B-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-21",
                  "capacity_end_date": "2019-08-21",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79704,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "9D2EA145-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-22",
                  "capacity_end_date": "2019-10-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78983,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "9ED839C4-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-19",
                  "capacity_end_date": "2019-05-19",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79074,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "9F38A09E-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-05",
                  "capacity_end_date": "2019-06-05",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 80067,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "9FDEEB1F-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79045,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "A0D0A7D5-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-29",
                  "capacity_end_date": "2019-05-29",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79643,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "A314D3B7-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-11",
                  "capacity_end_date": "2019-10-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79645,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "A3346CD0-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-13",
                  "capacity_end_date": "2019-10-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80093,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "AB02398B-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-08",
                  "capacity_end_date": "2019-08-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79269,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "AD8781B3-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-24",
                  "capacity_end_date": "2019-07-24",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79136,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "ADD80D54-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-24",
                  "capacity_end_date": "2019-06-24",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79378,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "AE7729B0-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-11",
                  "capacity_end_date": "2019-08-11",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79641,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "AFE27D99-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-09",
                  "capacity_end_date": "2019-10-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79192,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "B3A1E1FA-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-10",
                  "capacity_end_date": "2019-07-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79184,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "B4A1D1AA-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-02",
                  "capacity_end_date": "2019-07-02",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79702,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "B53E842D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-20",
                  "capacity_end_date": "2019-10-20",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79383,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "B657ECED-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-16",
                  "capacity_end_date": "2019-08-16",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79262,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "B7466256-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-17",
                  "capacity_end_date": "2019-07-17",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79018,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "BA6A6A80-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-26",
                  "capacity_end_date": "2019-05-26",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79382,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "BB698EE1-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-15",
                  "capacity_end_date": "2019-08-15",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79517,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "BB929F78-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-17",
                  "capacity_end_date": "2019-09-17",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79379,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "BD4225BC-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-12",
                  "capacity_end_date": "2019-08-12",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79576,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "BE96F3AF-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-21",
                  "capacity_end_date": "2019-09-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78982,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "BEA911A6-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-18",
                  "capacity_end_date": "2019-05-18",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79703,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C01F9A39-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-21",
                  "capacity_end_date": "2019-10-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79186,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C24AE5BD-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-04",
                  "capacity_end_date": "2019-07-04",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79584,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C2AB8718-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-29",
                  "capacity_end_date": "2019-09-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79263,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C2EEF262-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-18",
                  "capacity_end_date": "2019-07-18",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 80076,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C6244D05-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-09",
                  "capacity_end_date": "2019-06-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79073,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C7643D80-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-04",
                  "capacity_end_date": "2019-06-04",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79106,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C7C01866-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 10,
                  "capacity_price": 150
                },
                {
                  "id": 79190,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C842B8E8-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-08",
                  "capacity_end_date": "2019-07-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79048,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C9CD2E2A-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-01",
                  "capacity_end_date": "2019-06-01",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79385,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "C9D7AF06-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-18",
                  "capacity_end_date": "2019-08-18",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79582,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "CDA90B00-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-27",
                  "capacity_end_date": "2019-09-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80092,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "D06CEFCB-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-26",
                  "capacity_end_date": "2019-07-26",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79105,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "D0B4E94D-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-12",
                  "capacity_end_date": "2019-06-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79191,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "D54CE9F4-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-09",
                  "capacity_end_date": "2019-07-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79188,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "D69680D6-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-06",
                  "capacity_end_date": "2019-07-06",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79581,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "D6F3B5F3-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-26",
                  "capacity_end_date": "2019-09-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79180,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "D99FAE7F-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79445,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "DAF2AE7A-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-27",
                  "capacity_end_date": "2019-08-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79185,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "DBCDA7B7-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-03",
                  "capacity_end_date": "2019-07-03",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 78984,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "DC80C3DC-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-20",
                  "capacity_end_date": "2019-05-20",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79444,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "DE1F646E-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-26",
                  "capacity_end_date": "2019-08-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79103,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E10B681D-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-10",
                  "capacity_end_date": "2019-06-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79700,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E1269E14-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-18",
                  "capacity_end_date": "2019-10-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79447,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E1B73C93-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-29",
                  "capacity_end_date": "2019-08-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79441,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E22BF643-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-23",
                  "capacity_end_date": "2019-08-23",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79706,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E32F9B64-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-24",
                  "capacity_end_date": "2019-10-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80426,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E3D9909E-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-27",
                  "capacity_end_date": "2019-05-27",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 78980,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E8B3E775-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-16",
                  "capacity_end_date": "2019-05-16",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79518,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "E93CAA84-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-18",
                  "capacity_end_date": "2019-09-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79317,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "EDC460EA-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79320,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "EEE55915-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-31",
                  "capacity_end_date": "2019-07-31",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79707,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "EF45EF70-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-25",
                  "capacity_end_date": "2019-10-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79077,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "EF5D28E7-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-08",
                  "capacity_end_date": "2019-06-08",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79179,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F0BC5479-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-27",
                  "capacity_end_date": "2019-06-27",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79511,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F2384B2E-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-11",
                  "capacity_end_date": "2019-09-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79076,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F3272ACF-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-07",
                  "capacity_end_date": "2019-06-07",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79381,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F41018D5-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-14",
                  "capacity_end_date": "2019-08-14",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79270,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F660CCBF-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-25",
                  "capacity_end_date": "2019-07-25",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79264,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F7282A6F-4702-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79644,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F7EC17C4-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-12",
                  "capacity_end_date": "2019-10-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79583,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F89D7D0C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-28",
                  "capacity_end_date": "2019-09-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79586,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F8F0C930-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-01",
                  "capacity_end_date": "2019-10-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79138,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "F9EC74B5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-16",
                  "capacity_end_date": "2019-06-16",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79637,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FACF6A68-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-05",
                  "capacity_end_date": "2019-10-05",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79182,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FB3D1D98-4602-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79642,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FBAA8FA5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-10",
                  "capacity_end_date": "2019-10-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79107,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FDD24184-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-14",
                  "capacity_end_date": "2019-06-14",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79142,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FE41CA1B-4602-E911-80E8-001DD8B71D85",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-20",
                  "capacity_end_date": "2019-06-20",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79515,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FE85C15F-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-15",
                  "capacity_end_date": "2019-09-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79513,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FECF3347-4A02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-13",
                  "capacity_end_date": "2019-09-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79701,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FEDB2E21-4C02-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-19",
                  "capacity_end_date": "2019-10-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79451,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FEFEC7C4-4902-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-02",
                  "capacity_end_date": "2019-09-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79319,
                  "is_package": 1,
                  "name": "Driver Fitting - 60-90 Minutes",
                  "capacity_id": "FF462A09-4802-E911-80E6-00155D042567",
                  "package_product_id": "25406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-30",
                  "capacity_end_date": "2019-07-30",
                  "capacity_available": 16,
                  "capacity_price": 150
                }
              ]
            },
            {
              "name": "Full Premier Fitting - 5 Hours",
              "image_url": "https://www.imgacademy.com/sites/default/files/club-fitting-full-bag.jpg",
              "weight": 0,
              "description": "The full premier fitting includes fittings for the driver, long game, iron and putter.",
              "categories": [ { "name": "Sport Specific", "display_name": "Sport Specific", "weight": "1" } ],
              "dates": [
                {
                  "id": 79676,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "0011A374-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-06",
                  "capacity_end_date": "2019-10-06",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79002,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "04CBF58D-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-17",
                  "capacity_end_date": "2019-05-17",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79359,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "06914741-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 16,
                  "capacity_price": 600
                },
                {
                  "id": 79295,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "08913744-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-16",
                  "capacity_end_date": "2019-07-16",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79551,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "097C1922-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-10",
                  "capacity_end_date": "2019-09-10",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79549,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "09BE6009-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-08",
                  "capacity_end_date": "2019-09-08",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79300,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "0C2EDB87-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 79550,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "0D339E15-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-09",
                  "capacity_end_date": "2019-09-09",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79235,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "0F6A48CA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79302,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "104B64A7-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 78999,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "1065193F-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-14",
                  "capacity_end_date": "2019-05-14",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79361,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "12EF0B5A-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-05",
                  "capacity_end_date": "2019-08-05",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79426,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "1525561F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-20",
                  "capacity_end_date": "2019-08-20",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 80098,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "1726D584-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-08",
                  "capacity_end_date": "2019-08-08",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 80078,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "18B53EFF-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-09",
                  "capacity_end_date": "2019-06-09",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 80425,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "18BD8749-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-02",
                  "capacity_end_date": "2019-06-02",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 80073,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "1961E82B-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79237,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "1B2593DC-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79742,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "1E5A0752-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-23",
                  "capacity_end_date": "2019-10-23",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79239,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "2421D9EE-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-09",
                  "capacity_end_date": "2019-07-09",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79294,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "27182738-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-15",
                  "capacity_end_date": "2019-07-15",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79299,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "2A22AC7B-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-20",
                  "capacity_end_date": "2019-07-20",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79161,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "2AF1B735-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-21",
                  "capacity_end_date": "2019-06-21",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79555,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "2C38A153-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-14",
                  "capacity_end_date": "2019-09-14",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79548,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "2CB9B3FC-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-07",
                  "capacity_end_date": "2019-09-07",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79167,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "2F24C4E5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-18",
                  "capacity_end_date": "2019-06-18",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79416,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "319602A4-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79354,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "334BA4FC-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-29",
                  "capacity_end_date": "2019-07-29",
                  "capacity_available": 16,
                  "capacity_price": 600
                },
                {
                  "id": 79242,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "3572B813-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-12",
                  "capacity_end_date": "2019-07-12",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79163,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "35BB1948-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79094,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "360A0AB7-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-06",
                  "capacity_end_date": "2019-06-06",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79678,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "3666498D-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-08",
                  "capacity_end_date": "2019-10-08",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79233,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "386B3CB1-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-03",
                  "capacity_end_date": "2019-07-03",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79489,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "391FC2B8-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-01",
                  "capacity_end_date": "2019-09-01",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79617,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "3B61B5ED-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-26",
                  "capacity_end_date": "2019-09-26",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79623,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "3D41F93C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-02",
                  "capacity_end_date": "2019-10-02",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79674,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "41F71856-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-04",
                  "capacity_end_date": "2019-10-04",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79482,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "421F2E62-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-25",
                  "capacity_end_date": "2019-08-25",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79165,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "46F4305A-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-25",
                  "capacity_end_date": "2019-06-25",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79487,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "47CDCF9F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-30",
                  "capacity_end_date": "2019-08-30",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79415,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "48E27791-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-09",
                  "capacity_end_date": "2019-08-09",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79033,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "48FA102B-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-23",
                  "capacity_end_date": "2019-05-23",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 80072,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "4914DE19-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79166,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "4CAF9ECD-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-17",
                  "capacity_end_date": "2019-06-17",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79616,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "4FD87FE1-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-25",
                  "capacity_end_date": "2019-09-25",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79358,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "5203ED34-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-02",
                  "capacity_end_date": "2019-08-02",
                  "capacity_available": 16,
                  "capacity_price": 600
                },
                {
                  "id": 79357,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "52424622-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-01",
                  "capacity_end_date": "2019-08-01",
                  "capacity_available": 16,
                  "capacity_price": 600
                },
                {
                  "id": 80277,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "5264B466-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-26",
                  "capacity_end_date": "2019-06-26",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79684,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "53B5F6DC-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-14",
                  "capacity_end_date": "2019-10-14",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79122,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "549F7435-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-11",
                  "capacity_end_date": "2019-06-11",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79557,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "56B4186C-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-16",
                  "capacity_end_date": "2019-09-16",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79168,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "585EC1FD-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-19",
                  "capacity_end_date": "2019-06-19",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79032,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "5962EF12-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-22",
                  "capacity_end_date": "2019-05-22",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79547,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "59CA3AF0-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-06",
                  "capacity_end_date": "2019-09-06",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79301,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "5C339894-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-22",
                  "capacity_end_date": "2019-07-22",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 79231,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "5F21789E-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-01",
                  "capacity_end_date": "2019-07-01",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79227,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "620D4273-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-27",
                  "capacity_end_date": "2019-06-27",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79481,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "623AF04F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-24",
                  "capacity_end_date": "2019-08-24",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79485,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "63FC2D87-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-28",
                  "capacity_end_date": "2019-08-28",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79613,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "640CF2BB-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-22",
                  "capacity_end_date": "2019-09-22",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79621,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "6919A124-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-30",
                  "capacity_end_date": "2019-09-30",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79000,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "70567F5D-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-15",
                  "capacity_end_date": "2019-05-15",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79230,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "70AA2192-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79423,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "70DDFAF9-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-17",
                  "capacity_end_date": "2019-08-17",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79553,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "7280F73A-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-12",
                  "capacity_end_date": "2019-09-12",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79492,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "735D1BD7-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-04",
                  "capacity_end_date": "2019-09-04",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79360,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "74A7DB4D-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79035,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "7753C661-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-25",
                  "capacity_end_date": "2019-05-25",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79614,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "777B79C8-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-23",
                  "capacity_end_date": "2019-09-23",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79615,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "780B01D5-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-24",
                  "capacity_end_date": "2019-09-24",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79031,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "7B90C8F4-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-21",
                  "capacity_end_date": "2019-05-21",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79745,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "7C3D617D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-26",
                  "capacity_end_date": "2019-10-26",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79677,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "7CC10681-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-07",
                  "capacity_end_date": "2019-10-07",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79363,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "80C29878-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79425,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "846D2013-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-19",
                  "capacity_end_date": "2019-08-19",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79162,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "8579C43B-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79004,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "86D839C4-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-19",
                  "capacity_end_date": "2019-05-19",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79034,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "893BA043-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-24",
                  "capacity_end_date": "2019-05-24",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79419,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "894C62C8-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-13",
                  "capacity_end_date": "2019-08-13",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79093,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "89ACA198-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-05",
                  "capacity_end_date": "2019-06-05",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79062,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "89D0A7D5-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-29",
                  "capacity_end_date": "2019-05-29",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79064,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "8BCFDA0B-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-31",
                  "capacity_end_date": "2019-05-31",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 82853,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "8C03C937-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-22",
                  "capacity_end_date": "2019-08-22",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79488,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "8D0E7AAC-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-31",
                  "capacity_end_date": "2019-08-31",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79560,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "8D27EE90-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-19",
                  "capacity_end_date": "2019-09-19",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79229,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "8D3CC68B-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79126,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "91744C96-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-15",
                  "capacity_end_date": "2019-06-15",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79241,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "940B1507-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-11",
                  "capacity_end_date": "2019-07-11",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79746,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "951DB389-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-27",
                  "capacity_end_date": "2019-10-27",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79427,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "97277B2B-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-21",
                  "capacity_end_date": "2019-08-21",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79741,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "9A2EA145-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-22",
                  "capacity_end_date": "2019-10-22",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79685,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "9B4429E9-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-15",
                  "capacity_end_date": "2019-10-15",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79681,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "9EDCAEB1-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-11",
                  "capacity_end_date": "2019-10-11",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79003,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "9FA911A6-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-18",
                  "capacity_end_date": "2019-05-18",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79683,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "A0346CD0-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-13",
                  "capacity_end_date": "2019-10-13",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79236,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "A3066ED0-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-06",
                  "capacity_end_date": "2019-07-06",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79036,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "AA6A6A80-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-26",
                  "capacity_end_date": "2019-05-26",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79303,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "AA8781B3-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-24",
                  "capacity_end_date": "2019-07-24",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 79417,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "AB7729B0-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-11",
                  "capacity_end_date": "2019-08-11",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79164,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "ABD80D54-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-24",
                  "capacity_end_date": "2019-06-24",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79679,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "ACE27D99-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-09",
                  "capacity_end_date": "2019-10-09",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79362,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "AD655C66-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-06",
                  "capacity_end_date": "2019-08-06",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79092,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B0643D80-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-04",
                  "capacity_end_date": "2019-06-04",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79124,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B0C01866-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 10,
                  "capacity_price": 600
                },
                {
                  "id": 79240,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B1A1E1FA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-10",
                  "capacity_end_date": "2019-07-10",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79739,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B23E842D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-20",
                  "capacity_end_date": "2019-10-20",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79232,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B2A1D1AA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-02",
                  "capacity_end_date": "2019-07-02",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79422,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B357ECED-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-16",
                  "capacity_end_date": "2019-08-16",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79296,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B4466256-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-17",
                  "capacity_end_date": "2019-07-17",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79123,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B6B4E94D-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-12",
                  "capacity_end_date": "2019-06-12",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79418,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B84225BC-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-12",
                  "capacity_end_date": "2019-08-12",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79421,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B8698EE1-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-15",
                  "capacity_end_date": "2019-08-15",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79558,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "B8929F78-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-17",
                  "capacity_end_date": "2019-09-17",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79125,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "BB23477E-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-14",
                  "capacity_end_date": "2019-06-14",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79612,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "BB96F3AF-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-21",
                  "capacity_end_date": "2019-09-21",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79065,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "BCCD2E2A-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-01",
                  "capacity_end_date": "2019-06-01",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79740,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "BD1F9A39-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-21",
                  "capacity_end_date": "2019-10-21",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79620,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "BFAB8718-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-29",
                  "capacity_end_date": "2019-09-29",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79297,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "BFEEF262-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-18",
                  "capacity_end_date": "2019-07-18",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79234,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "C04AE5BD-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-04",
                  "capacity_end_date": "2019-07-04",
                  "capacity_available": 11,
                  "capacity_price": 600
                },
                {
                  "id": 79238,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "C642B8E8-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-08",
                  "capacity_end_date": "2019-07-08",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79005,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "C680C3DC-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-20",
                  "capacity_end_date": "2019-05-20",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79424,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "C6D7AF06-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-18",
                  "capacity_end_date": "2019-08-18",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79121,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "C70B681D-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-10",
                  "capacity_end_date": "2019-06-10",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79618,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "CAA90B00-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-27",
                  "capacity_end_date": "2019-09-27",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79063,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "CCADAEED-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-30",
                  "capacity_end_date": "2019-05-30",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 80097,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "CD6CEFCB-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-26",
                  "capacity_end_date": "2019-07-26",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 79096,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "D55D28E7-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-08",
                  "capacity_end_date": "2019-06-08",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 80428,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "D6D9909E-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-27",
                  "capacity_end_date": "2019-05-27",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79228,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "D79FAE7F-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 20,
                  "capacity_price": 600
                },
                {
                  "id": 79484,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "D7F2AE7A-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-27",
                  "capacity_end_date": "2019-08-27",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79095,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "DA272ACF-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-07",
                  "capacity_end_date": "2019-06-07",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79483,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "DB1F646E-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-26",
                  "capacity_end_date": "2019-08-26",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79001,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "DCB3E775-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-16",
                  "capacity_end_date": "2019-05-16",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79737,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "DE269E14-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-18",
                  "capacity_end_date": "2019-10-18",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79486,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "DEB73C93-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-29",
                  "capacity_end_date": "2019-08-29",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79480,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "DF2BF643-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-23",
                  "capacity_end_date": "2019-08-23",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79743,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "E02F9B64-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-24",
                  "capacity_end_date": "2019-10-24",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79686,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "E09262F5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-16",
                  "capacity_end_date": "2019-10-16",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79491,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "E122EECA-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-03",
                  "capacity_end_date": "2019-09-03",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 80278,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "E4EC74B5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-16",
                  "capacity_end_date": "2019-06-16",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79091,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "E5EC9D61-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-03",
                  "capacity_end_date": "2019-06-03",
                  "capacity_available": 30,
                  "capacity_price": 600
                },
                {
                  "id": 79559,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "E63CAA84-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-18",
                  "capacity_end_date": "2019-09-18",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79353,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "EAC460EA-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 16,
                  "capacity_price": 600
                },
                {
                  "id": 79356,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "EBE55915-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-31",
                  "capacity_end_date": "2019-07-31",
                  "capacity_available": 16,
                  "capacity_price": 600
                },
                {
                  "id": 79744,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "EC45EF70-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-25",
                  "capacity_end_date": "2019-10-25",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79169,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "ED41CA1B-4602-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-20",
                  "capacity_end_date": "2019-06-20",
                  "capacity_available": 12,
                  "capacity_price": 600
                },
                {
                  "id": 79738,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "EEDB2E21-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-19",
                  "capacity_end_date": "2019-10-19",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79552,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "EF384B2E-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-11",
                  "capacity_end_date": "2019-09-11",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79420,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F11018D5-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-14",
                  "capacity_end_date": "2019-08-14",
                  "capacity_available": 25,
                  "capacity_price": 600
                },
                {
                  "id": 79304,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F360CCBF-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-25",
                  "capacity_end_date": "2019-07-25",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 79298,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F4282A6F-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 14,
                  "capacity_price": 600
                },
                {
                  "id": 79682,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F4EC17C4-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-12",
                  "capacity_end_date": "2019-10-12",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79619,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F59D7D0C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-28",
                  "capacity_end_date": "2019-09-28",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79622,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F5F0C930-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-01",
                  "capacity_end_date": "2019-10-01",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79061,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F7802DB7-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-28",
                  "capacity_end_date": "2019-05-28",
                  "capacity_available": 31,
                  "capacity_price": 600
                },
                {
                  "id": 79675,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F7CF6A68-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-05",
                  "capacity_end_date": "2019-10-05",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79680,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "F8AA8FA5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-10",
                  "capacity_end_date": "2019-10-10",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79352,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "FB0A10D8-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-27",
                  "capacity_end_date": "2019-07-27",
                  "capacity_available": 15,
                  "capacity_price": 600
                },
                {
                  "id": 79556,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "FB85C15F-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-15",
                  "capacity_end_date": "2019-09-15",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79554,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "FBCF3347-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-13",
                  "capacity_end_date": "2019-09-13",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79490,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "FBFEC7C4-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-02",
                  "capacity_end_date": "2019-09-02",
                  "capacity_available": 32,
                  "capacity_price": 600
                },
                {
                  "id": 79355,
                  "is_package": 1,
                  "name": "Full Premier Fitting - 5 Hours",
                  "capacity_id": "FC462A09-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-30",
                  "capacity_end_date": "2019-07-30",
                  "capacity_available": 16,
                  "capacity_price": 600
                }
              ]
            },
            {
              "name": "Iron Fitting - 60-90 Minutes",
              "image_url": "https://www.imgacademy.com/sites/default/files/club-fitting-irons.jpg",
              "weight": 0,
              "description": "Done with premium golf balls, the iron fitting measures loft, lie length, swing weight and shaft frequency of current irons and wedges. This fitting adjusts current irons to meet player\u2019s new specifications and equipment recommendations are made based on player\u2019s unique swing dynamics and our propriety software.",
              "categories": [ { "name": "Sport Specific", "display_name": "Sport Specific", "weight": "3" } ],
              "dates": [
                {
                  "id": 79054,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "00BD8749-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-02",
                  "capacity_end_date": "2019-06-02",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79151,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "00D8D015-4602-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-20",
                  "capacity_end_date": "2019-06-20",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79335,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "03914741-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79272,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "05913744-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-16",
                  "capacity_end_date": "2019-07-16",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79109,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "06406517-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-10",
                  "capacity_end_date": "2019-06-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79524,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "067C1922-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-10",
                  "capacity_end_date": "2019-09-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79522,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "06BE6009-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-08",
                  "capacity_end_date": "2019-09-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79277,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "092EDB87-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79523,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "0A339E15-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-09",
                  "capacity_end_date": "2019-09-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79143,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "0BB3752F-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-21",
                  "capacity_end_date": "2019-06-21",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 80077,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "0BB53EFF-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-09",
                  "capacity_end_date": "2019-06-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79203,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "0D6A48CA-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79459,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "0EADE980-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-28",
                  "capacity_end_date": "2019-08-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79337,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "0FEF0B5A-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-05",
                  "capacity_end_date": "2019-08-05",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79400,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "1225561F-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-20",
                  "capacity_end_date": "2019-08-20",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79464,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "12A9C7BE-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-02",
                  "capacity_end_date": "2019-09-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80095,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "1426D584-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-08",
                  "capacity_end_date": "2019-08-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79149,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "1524C4E5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-18",
                  "capacity_end_date": "2019-06-18",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79205,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "192593DC-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79717,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "1B5A0752-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-23",
                  "capacity_end_date": "2019-10-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79457,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "1E1C2A68-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-26",
                  "capacity_end_date": "2019-08-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78986,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "21E77357-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-15",
                  "capacity_end_date": "2019-05-15",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79207,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "2221D9EE-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-09",
                  "capacity_end_date": "2019-07-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79271,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "24182738-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-15",
                  "capacity_end_date": "2019-07-15",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79276,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "2722AC7B-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-20",
                  "capacity_end_date": "2019-07-20",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79456,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "2886205C-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-25",
                  "capacity_end_date": "2019-08-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79528,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "2938A153-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-14",
                  "capacity_end_date": "2019-09-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79521,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "29B9B3FC-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-07",
                  "capacity_end_date": "2019-09-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79210,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3339760D-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-12",
                  "capacity_end_date": "2019-07-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79653,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3366498D-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-08",
                  "capacity_end_date": "2019-10-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79330,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "338B96F6-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-29",
                  "capacity_end_date": "2019-07-29",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79145,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "33BB1948-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79148,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "34AF9ECD-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-17",
                  "capacity_end_date": "2019-06-17",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79201,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "366B3CB1-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-03",
                  "capacity_end_date": "2019-07-03",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 78990,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "38162CBE-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-19",
                  "capacity_end_date": "2019-05-19",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79593,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3861B5ED-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-26",
                  "capacity_end_date": "2019-09-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79599,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3A41F93C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-02",
                  "capacity_end_date": "2019-10-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79021,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3BFA102B-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-23",
                  "capacity_end_date": "2019-05-23",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79458,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3E6FB674-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-27",
                  "capacity_end_date": "2019-08-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79649,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "3EF71856-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-04",
                  "capacity_end_date": "2019-10-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79150,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "425EC1FD-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-19",
                  "capacity_end_date": "2019-06-19",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79461,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "44CDCF9F-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-30",
                  "capacity_end_date": "2019-08-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79147,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "44F4305A-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-25",
                  "capacity_end_date": "2019-06-25",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79389,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "45E27791-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-09",
                  "capacity_end_date": "2019-08-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 80068,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "4714DE19-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79053,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "47A8F423-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-01",
                  "capacity_end_date": "2019-06-01",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 78988,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "47C8FC87-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-17",
                  "capacity_end_date": "2019-05-17",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79111,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "4B50E647-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-12",
                  "capacity_end_date": "2019-06-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79592,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "4CD87FE1-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-25",
                  "capacity_end_date": "2019-09-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79333,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "4F424622-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-01",
                  "capacity_end_date": "2019-08-01",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 80273,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "5064B466-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-26",
                  "capacity_end_date": "2019-06-26",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79659,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "50B5F6DC-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-14",
                  "capacity_end_date": "2019-10-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79530,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "53B4186C-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-16",
                  "capacity_end_date": "2019-09-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79520,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "56CA3AF0-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-06",
                  "capacity_end_date": "2019-09-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79278,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "59339894-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-22",
                  "capacity_end_date": "2019-07-22",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79199,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "5C21789E-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-01",
                  "capacity_end_date": "2019-07-01",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79455,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "5F3AF04F-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-24",
                  "capacity_end_date": "2019-08-24",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79195,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "600D4273-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-27",
                  "capacity_end_date": "2019-06-27",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79589,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "610CF2BB-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-22",
                  "capacity_end_date": "2019-09-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78991,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "657CC5D6-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-20",
                  "capacity_end_date": "2019-05-20",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79597,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6619A124-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-30",
                  "capacity_end_date": "2019-09-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79019,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6790C8F4-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-21",
                  "capacity_end_date": "2019-05-21",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79198,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6DAA2192-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79397,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6DDDFAF9-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-17",
                  "capacity_end_date": "2019-08-17",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79334,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6ECAD12E-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-02",
                  "capacity_end_date": "2019-08-02",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79594,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6F33D8F9-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-27",
                  "capacity_end_date": "2019-09-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79526,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "6F80F73A-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-12",
                  "capacity_end_date": "2019-09-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79466,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "705D1BD7-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-04",
                  "capacity_end_date": "2019-09-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79336,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "71A7DB4D-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79080,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "71ACA198-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-05",
                  "capacity_end_date": "2019-06-05",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79022,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "723BA043-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-24",
                  "capacity_end_date": "2019-05-24",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79590,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "737B79C8-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-23",
                  "capacity_end_date": "2019-09-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79052,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "73CFDA0B-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-31",
                  "capacity_end_date": "2019-05-31",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79050,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "73D0A7D5-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-29",
                  "capacity_end_date": "2019-05-29",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79591,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "750B01D5-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-24",
                  "capacity_end_date": "2019-09-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79720,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "793D617D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-26",
                  "capacity_end_date": "2019-10-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79114,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "79744C96-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-15",
                  "capacity_end_date": "2019-06-15",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79652,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "79C10681-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-07",
                  "capacity_end_date": "2019-10-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79112,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "7A900260-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 10,
                  "capacity_price": 150
                },
                {
                  "id": 79339,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "7DC29878-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79144,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "7F79C43B-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79399,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "816D2013-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-19",
                  "capacity_end_date": "2019-08-19",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79393,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "864C62C8-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-13",
                  "capacity_end_date": "2019-08-13",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 78989,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "88A911A6-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-18",
                  "capacity_end_date": "2019-05-18",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79390,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "88D2F69D-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 82851,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "8903C937-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-22",
                  "capacity_end_date": "2019-08-22",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79718,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "89793F5E-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-24",
                  "capacity_end_date": "2019-10-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79533,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "8A27EE90-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-19",
                  "capacity_end_date": "2019-09-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79197,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "8B3CC68B-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79280,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "8FFF84AD-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-24",
                  "capacity_end_date": "2019-07-24",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79273,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "90614D50-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-17",
                  "capacity_end_date": "2019-07-17",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79209,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "920B1507-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-11",
                  "capacity_end_date": "2019-07-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79721,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "921DB389-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-27",
                  "capacity_end_date": "2019-10-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79401,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "94277B2B-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-21",
                  "capacity_end_date": "2019-08-21",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79082,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "947933C9-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-07",
                  "capacity_end_date": "2019-06-07",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79279,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "94D054A1-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79024,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "956A6A80-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-26",
                  "capacity_end_date": "2019-05-26",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79716,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "972EA145-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-22",
                  "capacity_end_date": "2019-10-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79660,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "984429E9-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-15",
                  "capacity_end_date": "2019-10-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79656,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "9BDCAEB1-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-11",
                  "capacity_end_date": "2019-10-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79658,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "9D346CD0-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-13",
                  "capacity_end_date": "2019-10-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79079,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "9E643D80-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-04",
                  "capacity_end_date": "2019-06-04",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79204,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A1066ED0-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-06",
                  "capacity_end_date": "2019-07-06",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79110,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A132792F-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-11",
                  "capacity_end_date": "2019-06-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79113,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A323477E-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-14",
                  "capacity_end_date": "2019-06-14",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79081,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A6A0F9B0-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-06",
                  "capacity_end_date": "2019-06-06",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79391,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A87729B0-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-11",
                  "capacity_end_date": "2019-08-11",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79650,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A99F5662-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-05",
                  "capacity_end_date": "2019-10-05",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79654,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A9E27D99-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-09",
                  "capacity_end_date": "2019-10-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79460,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "A9FF418D-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-29",
                  "capacity_end_date": "2019-08-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79338,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "AA655C66-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-06",
                  "capacity_end_date": "2019-08-06",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79714,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "AF3E842D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-20",
                  "capacity_end_date": "2019-10-20",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79208,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "AFA1E1FA-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-10",
                  "capacity_end_date": "2019-07-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79396,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B057ECED-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-16",
                  "capacity_end_date": "2019-08-16",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79200,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B0A1D1AA-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-02",
                  "capacity_end_date": "2019-07-02",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79531,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B2929F78-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-17",
                  "capacity_end_date": "2019-09-17",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79051,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B4ADAEED-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-30",
                  "capacity_end_date": "2019-05-30",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79392,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B54225BC-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-12",
                  "capacity_end_date": "2019-08-12",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79395,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B5698EE1-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-15",
                  "capacity_end_date": "2019-08-15",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79588,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "B7F4FCA9-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-21",
                  "capacity_end_date": "2019-09-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79715,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "BA1F9A39-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-21",
                  "capacity_end_date": "2019-10-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79146,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "BBA4164E-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-24",
                  "capacity_end_date": "2019-06-24",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79596,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "BCAB8718-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-29",
                  "capacity_end_date": "2019-09-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79274,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "BCEEF262-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-18",
                  "capacity_end_date": "2019-07-18",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79083,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "BD5D28E7-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-08",
                  "capacity_end_date": "2019-06-08",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79202,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "BE4AE5BD-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-04",
                  "capacity_end_date": "2019-07-04",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 80069,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "C195E625-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79398,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "C3D7AF06-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-18",
                  "capacity_end_date": "2019-08-18",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79206,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "C442B8E8-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-08",
                  "capacity_end_date": "2019-07-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 80094,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "CA6CEFCB-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-26",
                  "capacity_end_date": "2019-07-26",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 80274,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "CEEC74B5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-16",
                  "capacity_end_date": "2019-06-16",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79078,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "D1EC9D61-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-03",
                  "capacity_end_date": "2019-06-03",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79196,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "D59FAE7F-4602-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79712,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "DB269E14-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-18",
                  "capacity_end_date": "2019-10-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79454,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "DC2BF643-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-23",
                  "capacity_end_date": "2019-08-23",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79661,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "DD9262F5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-16",
                  "capacity_end_date": "2019-10-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79465,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "DE22EECA-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-03",
                  "capacity_end_date": "2019-09-03",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79532,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E23CAA84-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-18",
                  "capacity_end_date": "2019-09-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78987,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E2F4DF6F-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-16",
                  "capacity_end_date": "2019-05-16",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79329,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E7C460EA-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79713,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E8DB2E21-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-19",
                  "capacity_end_date": "2019-10-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79332,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E8E55915-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-31",
                  "capacity_end_date": "2019-07-31",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79719,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E945EF70-4C02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-25",
                  "capacity_end_date": "2019-10-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79020,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "E974DA0C-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-22",
                  "capacity_end_date": "2019-05-22",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79049,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "EA802DB7-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-28",
                  "capacity_end_date": "2019-05-28",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79525,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "EC384B2E-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-11",
                  "capacity_end_date": "2019-09-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79394,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "EE1018D5-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-14",
                  "capacity_end_date": "2019-08-14",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79281,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F060CCBF-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-25",
                  "capacity_end_date": "2019-07-25",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79463,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F0B379B2-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-01",
                  "capacity_end_date": "2019-09-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79275,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F1282A6F-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79657,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F1EC17C4-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-12",
                  "capacity_end_date": "2019-10-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79595,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F29D7D0C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-28",
                  "capacity_end_date": "2019-09-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79462,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F2C526A6-4902-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-31",
                  "capacity_end_date": "2019-08-31",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79598,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F2F0C930-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-01",
                  "capacity_end_date": "2019-10-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79023,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F33BC25B-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-25",
                  "capacity_end_date": "2019-05-25",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79655,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F5AA8FA5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-10",
                  "capacity_end_date": "2019-10-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78985,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F764193F-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-14",
                  "capacity_end_date": "2019-05-14",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79328,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F80A10D8-4702-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-27",
                  "capacity_end_date": "2019-07-27",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79529,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F885C15F-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-15",
                  "capacity_end_date": "2019-09-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79527,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F8CF3347-4A02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-13",
                  "capacity_end_date": "2019-09-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79331,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "F9462A09-4802-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-30",
                  "capacity_end_date": "2019-07-30",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 80427,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "FC027998-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-27",
                  "capacity_end_date": "2019-05-27",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79651,
                  "is_package": 1,
                  "name": "Iron Fitting - 60-90 Minutes",
                  "capacity_id": "FD10A374-4B02-E911-80E6-00155D042567",
                  "package_product_id": "29406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-06",
                  "capacity_end_date": "2019-10-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                }
              ]
            },
            {
              "name": "What's In The Bag?",
              "image_url": "https://www.imgacademy.com/sites/default/files/club-fitting-whats-in-the-bag.jpg",
              "weight": 0,
              "description": "Includes a complete check of the specifications in your golf bag.  Tests the whole set for swing weight, shaft frequency, length, loft and lie.  In about 30 minutes you will better understand your current golf club set and receive recommendations for new equipment to better your game.",
              "categories": [ { "name": "Sport Specific", "display_name": "Sport Specific", "weight": "5" } ],
              "dates": [
                {
                  "id": 79371,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "00914741-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79500,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "00C67D99-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-30",
                  "capacity_end_date": "2019-08-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79306,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "02913744-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-16",
                  "capacity_end_date": "2019-07-16",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79565,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "037C1922-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-10",
                  "capacity_end_date": "2019-09-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79309,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "0392F368-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79563,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "03BE6009-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-08",
                  "capacity_end_date": "2019-09-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79311,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "062EDB87-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79564,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "07339E15-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-09",
                  "capacity_end_date": "2019-09-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79170,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "09B3752F-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-21",
                  "capacity_end_date": "2019-06-21",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79498,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "0AADE980-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-28",
                  "capacity_end_date": "2019-08-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79251,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "0B6A48CA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79373,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "0CEF0B5A-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-05",
                  "capacity_end_date": "2019-08-05",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79439,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "0F25561F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-20",
                  "capacity_end_date": "2019-08-20",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79503,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "0FA9C7BE-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-02",
                  "capacity_end_date": "2019-09-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80100,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "1126D584-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-08",
                  "capacity_end_date": "2019-08-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79007,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "11E77357-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-15",
                  "capacity_end_date": "2019-05-15",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79253,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "172593DC-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79754,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "185A0752-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-23",
                  "capacity_end_date": "2019-10-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79625,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "18E6F8B5-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-22",
                  "capacity_end_date": "2019-09-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79626,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "1A284FC2-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-23",
                  "capacity_end_date": "2019-09-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79496,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "1B1C2A68-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-26",
                  "capacity_end_date": "2019-08-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79255,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2021D9EE-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-09",
                  "capacity_end_date": "2019-07-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79011,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "21162CBE-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-19",
                  "capacity_end_date": "2019-05-19",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79305,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "21182738-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-15",
                  "capacity_end_date": "2019-07-15",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79310,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2422AC7B-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-20",
                  "capacity_end_date": "2019-07-20",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79495,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2586205C-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-25",
                  "capacity_end_date": "2019-08-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79569,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2638A153-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-14",
                  "capacity_end_date": "2019-09-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79562,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "26B9B3FC-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-07",
                  "capacity_end_date": "2019-09-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79367,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2AECE802-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-30",
                  "capacity_end_date": "2019-07-30",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79177,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2B5EC1FD-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-19",
                  "capacity_end_date": "2019-06-19",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79009,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "2EC8FC87-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-17",
                  "capacity_end_date": "2019-05-17",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79129,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3050E647-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-12",
                  "capacity_end_date": "2019-06-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79691,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3066498D-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-08",
                  "capacity_end_date": "2019-10-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79366,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "308B96F6-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-29",
                  "capacity_end_date": "2019-07-29",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79258,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3139760D-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-12",
                  "capacity_end_date": "2019-07-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79172,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "31BB1948-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79249,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "346B3CB1-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-03",
                  "capacity_end_date": "2019-07-03",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79629,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3561B5ED-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-26",
                  "capacity_end_date": "2019-09-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79635,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3641F93C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-02",
                  "capacity_end_date": "2019-10-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79070,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3AA8F423-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-01",
                  "capacity_end_date": "2019-06-01",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79497,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3B6FB674-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-27",
                  "capacity_end_date": "2019-08-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79687,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3BF71856-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-04",
                  "capacity_end_date": "2019-10-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79315,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3C339CB9-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-25",
                  "capacity_end_date": "2019-07-25",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79039,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "3F70FE24-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-23",
                  "capacity_end_date": "2019-05-23",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79245,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "428FAC85-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79428,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "42E27791-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-09",
                  "capacity_end_date": "2019-08-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79174,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "42F4305A-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-25",
                  "capacity_end_date": "2019-06-25",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 80074,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "4514DE19-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79042,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "480D407A-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-26",
                  "capacity_end_date": "2019-05-26",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79628,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "49D87FE1-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-25",
                  "capacity_end_date": "2019-09-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79369,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "4C424622-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-01",
                  "capacity_end_date": "2019-08-01",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79697,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "4DB5F6DC-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-14",
                  "capacity_end_date": "2019-10-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80279,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "4E64B466-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-26",
                  "capacity_end_date": "2019-06-26",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79012,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "4F7CC5D6-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-20",
                  "capacity_end_date": "2019-05-20",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79571,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "50B4186C-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-16",
                  "capacity_end_date": "2019-09-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79561,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "53CA3AF0-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-06",
                  "capacity_end_date": "2019-09-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79037,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "5417BDEE-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-21",
                  "capacity_end_date": "2019-05-21",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79312,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "56339894-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-22",
                  "capacity_end_date": "2019-07-22",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79247,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "5821789E-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-01",
                  "capacity_end_date": "2019-07-01",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79099,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "58ACA198-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-05",
                  "capacity_end_date": "2019-06-05",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79494,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "5C3AF04F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-24",
                  "capacity_end_date": "2019-08-24",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79040,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "5C3BA043-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-24",
                  "capacity_end_date": "2019-05-24",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79243,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "5E0D4273-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-27",
                  "capacity_end_date": "2019-06-27",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79132,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "60744C96-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-15",
                  "capacity_end_date": "2019-06-15",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79130,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "61900260-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 10,
                  "capacity_price": 150
                },
                {
                  "id": 79633,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6319A124-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-30",
                  "capacity_end_date": "2019-09-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79750,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6A50CD1A-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-19",
                  "capacity_end_date": "2019-10-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79436,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6ADDFAF9-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-17",
                  "capacity_end_date": "2019-08-17",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79246,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6BAA2192-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79370,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6BCAD12E-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-02",
                  "capacity_end_date": "2019-08-02",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79630,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6C33D8F9-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-27",
                  "capacity_end_date": "2019-09-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79567,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6C80F73A-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-12",
                  "capacity_end_date": "2019-09-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79505,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6D5D1BD7-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-04",
                  "capacity_end_date": "2019-09-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79372,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "6EA7DB4D-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79627,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "720B01D5-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-24",
                  "capacity_end_date": "2019-09-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79069,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "7591B705-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-31",
                  "capacity_end_date": "2019-05-31",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79757,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "763D617D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-26",
                  "capacity_end_date": "2019-10-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79101,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "7C7933C9-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-07",
                  "capacity_end_date": "2019-06-07",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79171,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "7D79C43B-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79690,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "7DAF087B-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-07",
                  "capacity_end_date": "2019-10-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79438,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "7E6D2013-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-19",
                  "capacity_end_date": "2019-08-19",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79432,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "834C62C8-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-13",
                  "capacity_end_date": "2019-08-13",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79429,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "85D2F69D-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 82854,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8603C937-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-22",
                  "capacity_end_date": "2019-08-22",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79755,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "86793F5E-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-24",
                  "capacity_end_date": "2019-10-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79175,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "871694C7-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-17",
                  "capacity_end_date": "2019-06-17",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79574,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8727EE90-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-19",
                  "capacity_end_date": "2019-09-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79128,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8832792F-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-11",
                  "capacity_end_date": "2019-06-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79314,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8CFF84AD-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-24",
                  "capacity_end_date": "2019-07-24",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79307,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8D614D50-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-17",
                  "capacity_end_date": "2019-07-17",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79100,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8EA0F9B0-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-06",
                  "capacity_end_date": "2019-06-06",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79758,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "8F1DB389-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-27",
                  "capacity_end_date": "2019-10-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79257,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "900B1507-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-11",
                  "capacity_end_date": "2019-07-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79440,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "91277B2B-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-21",
                  "capacity_end_date": "2019-08-21",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79313,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "91D054A1-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79131,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9323477E-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-14",
                  "capacity_end_date": "2019-06-14",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79753,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "942EA145-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-22",
                  "capacity_end_date": "2019-10-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79698,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "954429E9-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-15",
                  "capacity_end_date": "2019-10-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79098,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "96202F7A-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-04",
                  "capacity_end_date": "2019-06-04",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79694,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "98DCAEB1-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-11",
                  "capacity_end_date": "2019-10-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79071,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "99D17643-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-02",
                  "capacity_end_date": "2019-06-02",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79696,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9A346CD0-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-13",
                  "capacity_end_date": "2019-10-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79756,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9C42AC6A-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-25",
                  "capacity_end_date": "2019-10-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79375,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9C58A072-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79308,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9C8C865C-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-18",
                  "capacity_end_date": "2019-07-18",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79068,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9CADAEED-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-30",
                  "capacity_end_date": "2019-05-30",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79252,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "9F066ED0-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-06",
                  "capacity_end_date": "2019-07-06",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79430,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "A57729B0-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-11",
                  "capacity_end_date": "2019-08-11",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79688,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "A69F5662-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-05",
                  "capacity_end_date": "2019-10-05",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79692,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "A6E27D99-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-09",
                  "capacity_end_date": "2019-10-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79499,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "A6FF418D-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-29",
                  "capacity_end_date": "2019-08-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79374,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "A7655C66-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-06",
                  "capacity_end_date": "2019-08-06",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79066,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "AA0321B1-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-28",
                  "capacity_end_date": "2019-05-28",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79751,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "AC3E842D-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-20",
                  "capacity_end_date": "2019-10-20",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79435,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "AD57ECED-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-16",
                  "capacity_end_date": "2019-08-16",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79256,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "ADA1E1FA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-10",
                  "capacity_end_date": "2019-07-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 80280,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "AE6B76AF-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-16",
                  "capacity_end_date": "2019-06-16",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79248,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "AEA1D1AA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-02",
                  "capacity_end_date": "2019-07-02",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79572,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "AF929F78-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-17",
                  "capacity_end_date": "2019-09-17",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79431,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B24225BC-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-12",
                  "capacity_end_date": "2019-08-12",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79434,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B2698EE1-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-15",
                  "capacity_end_date": "2019-08-15",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79624,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B4F4FCA9-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-21",
                  "capacity_end_date": "2019-09-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79752,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B71F9A39-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-21",
                  "capacity_end_date": "2019-10-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79173,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B9A4164E-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-24",
                  "capacity_end_date": "2019-06-24",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79632,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B9AB8718-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-29",
                  "capacity_end_date": "2019-09-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79097,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "B9EC9D61-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-03",
                  "capacity_end_date": "2019-06-03",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79250,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "BC4AE5BD-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-04",
                  "capacity_end_date": "2019-07-04",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 80075,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "BF95E625-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79437,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "C0D7AF06-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-18",
                  "capacity_end_date": "2019-08-18",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79254,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "C242B8E8-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-08",
                  "capacity_end_date": "2019-07-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 80099,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "C76CEFCB-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-26",
                  "capacity_end_date": "2019-07-26",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79244,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "D39FAE7F-4602-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79008,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "D6F4DF6F-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-16",
                  "capacity_end_date": "2019-05-16",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79038,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "D874DA0C-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-22",
                  "capacity_end_date": "2019-05-22",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79493,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "D92BF643-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-23",
                  "capacity_end_date": "2019-08-23",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79699,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "DA9262F5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-16",
                  "capacity_end_date": "2019-10-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79504,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "DB22EECA-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-03",
                  "capacity_end_date": "2019-09-03",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79041,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "DC3BC25B-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-25",
                  "capacity_end_date": "2019-05-25",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79006,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "DE64193F-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-14",
                  "capacity_end_date": "2019-05-14",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79573,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "DF3CAA84-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-18",
                  "capacity_end_date": "2019-09-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79067,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "E023ADCF-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-29",
                  "capacity_end_date": "2019-05-29",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79749,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "E429480E-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-18",
                  "capacity_end_date": "2019-10-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79365,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "E4C460EA-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79368,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "E5E55915-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-31",
                  "capacity_end_date": "2019-07-31",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79566,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "E9384B2E-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-11",
                  "capacity_end_date": "2019-09-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79433,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EB1018D5-4802-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-14",
                  "capacity_end_date": "2019-08-14",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79043,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "ED027998-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-27",
                  "capacity_end_date": "2019-05-27",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79502,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EDB379B2-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-01",
                  "capacity_end_date": "2019-09-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79127,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EE3F6517-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-10",
                  "capacity_end_date": "2019-06-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79501,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EEC526A6-4902-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-08-31",
                  "capacity_end_date": "2019-08-31",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79695,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EEEC17C4-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-12",
                  "capacity_end_date": "2019-10-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79631,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EF9D7D0C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-28",
                  "capacity_end_date": "2019-09-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79178,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EFD7D015-4602-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-20",
                  "capacity_end_date": "2019-06-20",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79634,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "EFF0C930-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-01",
                  "capacity_end_date": "2019-10-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79010,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F16A0DA0-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-05-18",
                  "capacity_end_date": "2019-05-18",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79693,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F2AA8FA5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-10",
                  "capacity_end_date": "2019-10-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79364,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F50A10D8-4702-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-07-27",
                  "capacity_end_date": "2019-07-27",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79570,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F585C15F-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-15",
                  "capacity_end_date": "2019-09-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79568,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F5CF3347-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-09-13",
                  "capacity_end_date": "2019-09-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79102,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F64A2BE1-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-08",
                  "capacity_end_date": "2019-06-08",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79689,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "F8DF946E-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-10-06",
                  "capacity_end_date": "2019-10-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80079,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "FBB43EFF-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-09",
                  "capacity_end_date": "2019-06-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79176,
                  "is_package": 1,
                  "name": "What's In The Bag?",
                  "capacity_id": "FC23C4E5-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2F3362AF-5349-E811-80E3-001DD8B71D85",
                  "capacity_start_date": "2019-06-18",
                  "capacity_end_date": "2019-06-18",
                  "capacity_available": 12,
                  "capacity_price": 150
                }
              ]
            },
            {
              "name": "Putter Fitting - 1 Hour",
              "image_url": "https://www.imgacademy.com/sites/default/files/club-fitting-putters.jpg",
              "weight": 0,
              "description": "The putter fitting measures loft, lie, length and swing weight of current putter. This fitting includes eight high-speed cameras to capture face angle, path, roll, lift and posture. The putter is adjusted, stroke recommendations are made, and grip alignment and size are checked.",
              "categories": [ { "name": "Sport Specific", "display_name": "Sport Specific", "weight": "4" } ],
              "dates": [
                {
                  "id": 79537,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "007C1922-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-10",
                  "capacity_end_date": "2019-09-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79286,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "0092F368-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79535,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "00BE6009-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-08",
                  "capacity_end_date": "2019-09-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79288,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "032EDB87-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79536,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "04339E15-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-09",
                  "capacity_end_date": "2019-09-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78993,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "04E77357-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-15",
                  "capacity_end_date": "2019-05-15",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79152,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "05B3752F-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-21",
                  "capacity_end_date": "2019-06-21",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79472,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "07ADE980-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-28",
                  "capacity_end_date": "2019-08-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79349,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "09EF0B5A-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-05",
                  "capacity_end_date": "2019-08-05",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 78997,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "0A162CBE-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-19",
                  "capacity_end_date": "2019-05-19",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79413,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "0C25561F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-20",
                  "capacity_end_date": "2019-08-20",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79477,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "0CA9C7BE-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-02",
                  "capacity_end_date": "2019-09-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80096,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "0E26D584-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-08",
                  "capacity_end_date": "2019-08-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79159,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "108AC6F7-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-19",
                  "capacity_end_date": "2019-06-19",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79601,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "14E6F8B5-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-22",
                  "capacity_end_date": "2019-09-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79608,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "14F87A12-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-29",
                  "capacity_end_date": "2019-09-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79221,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "152593DC-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79729,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "155A0752-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-23",
                  "capacity_end_date": "2019-10-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79154,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "16622042-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79602,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "17284FC2-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-23",
                  "capacity_end_date": "2019-09-23",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79117,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "1750E647-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-12",
                  "capacity_end_date": "2019-06-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79470,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "181C2A68-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-26",
                  "capacity_end_date": "2019-08-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79341,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "1AF852E4-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79057,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "1D0EB3E7-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-30",
                  "capacity_end_date": "2019-05-30",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 78995,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "1DC8FC87-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-17",
                  "capacity_end_date": "2019-05-17",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79282,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "1E182738-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-15",
                  "capacity_end_date": "2019-07-15",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79223,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "1E21D9EE-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-09",
                  "capacity_end_date": "2019-07-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79669,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "203FEEBD-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-12",
                  "capacity_end_date": "2019-10-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79287,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2122AC7B-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-20",
                  "capacity_end_date": "2019-07-20",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79469,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2286205C-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-25",
                  "capacity_end_date": "2019-08-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79541,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2338A153-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-14",
                  "capacity_end_date": "2019-09-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79534,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "23B9B3FC-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-07",
                  "capacity_end_date": "2019-09-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79343,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "27ECE802-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-30",
                  "capacity_end_date": "2019-07-30",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79158,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2BD7A5DF-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-18",
                  "capacity_end_date": "2019-06-18",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79342,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2D8B96F6-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-29",
                  "capacity_end_date": "2019-07-29",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79059,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2DA8F423-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-01",
                  "capacity_end_date": "2019-06-01",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79226,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "2F39760D-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-12",
                  "capacity_end_date": "2019-07-12",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79611,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3241F93C-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-02",
                  "capacity_end_date": "2019-10-02",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79605,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3261B5ED-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-26",
                  "capacity_end_date": "2019-09-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79217,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "326B3CB1-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-03",
                  "capacity_end_date": "2019-07-03",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79026,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3370FE24-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-23",
                  "capacity_end_date": "2019-05-23",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79029,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "340D407A-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-26",
                  "capacity_end_date": "2019-05-26",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 78998,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "357CC5D6-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-20",
                  "capacity_end_date": "2019-05-20",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79090,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "357D44F9-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-09",
                  "capacity_end_date": "2019-06-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79727,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "36BB8633-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-21",
                  "capacity_end_date": "2019-10-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79471,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "386FB674-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-27",
                  "capacity_end_date": "2019-08-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79292,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "39339CB9-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-25",
                  "capacity_end_date": "2019-07-25",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79665,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3939FF86-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-08",
                  "capacity_end_date": "2019-10-08",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79347,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3D0EF33A-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 80758,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3D17BDEE-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-21",
                  "capacity_end_date": "2019-05-21",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79402,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "3FE27791-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-09",
                  "capacity_end_date": "2019-08-09",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79213,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "408FAC85-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79156,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "40F4305A-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-25",
                  "capacity_end_date": "2019-06-25",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 80070,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4314DE19-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79726,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "461E5227-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-20",
                  "capacity_end_date": "2019-10-20",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79604,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "46D87FE1-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-25",
                  "capacity_end_date": "2019-09-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79345,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "49424622-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-01",
                  "capacity_end_date": "2019-08-01",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79732,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4944F576-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-26",
                  "capacity_end_date": "2019-10-26",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79118,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4A900260-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 10,
                  "capacity_price": 150
                },
                {
                  "id": 79671,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4AB5F6DC-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-14",
                  "capacity_end_date": "2019-10-14",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 80275,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4C64B466-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-26",
                  "capacity_end_date": "2019-06-26",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79543,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4DB4186C-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-16",
                  "capacity_end_date": "2019-09-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79603,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "4F46ABCE-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-24",
                  "capacity_end_date": "2019-09-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79289,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "53339894-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-22",
                  "capacity_end_date": "2019-07-22",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79215,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "5421789E-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-01",
                  "capacity_end_date": "2019-07-01",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79028,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "5510B255-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-25",
                  "capacity_end_date": "2019-05-25",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79344,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "57AB440F-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-31",
                  "capacity_end_date": "2019-07-31",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79468,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "593AF04F-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-24",
                  "capacity_end_date": "2019-08-24",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79219,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "5975F5C3-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79211,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "5C0D4273-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-27",
                  "capacity_end_date": "2019-06-27",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79725,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "5C50CD1A-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-19",
                  "capacity_end_date": "2019-10-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79058,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "5C91B705-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-31",
                  "capacity_end_date": "2019-05-31",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79609,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6019A124-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-30",
                  "capacity_end_date": "2019-09-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79214,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "67AA2192-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79410,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "67DDFAF9-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-17",
                  "capacity_end_date": "2019-08-17",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79346,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "68CAD12E-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-02",
                  "capacity_end_date": "2019-08-02",
                  "capacity_available": 16,
                  "capacity_price": 150
                },
                {
                  "id": 79606,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6933D8F9-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-27",
                  "capacity_end_date": "2019-09-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79539,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6980F73A-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-12",
                  "capacity_end_date": "2019-09-12",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79479,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6A5D1BD7-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-04",
                  "capacity_end_date": "2019-09-04",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79348,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6BA7DB4D-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79088,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6D7933C9-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-07",
                  "capacity_end_date": "2019-06-07",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79116,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "6F32792F-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-11",
                  "capacity_end_date": "2019-06-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79664,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "77AF087B-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-07",
                  "capacity_end_date": "2019-10-07",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79087,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "78A0F9B0-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-06",
                  "capacity_end_date": "2019-06-06",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79157,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "791694C7-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-17",
                  "capacity_end_date": "2019-06-17",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79412,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "7B6D2013-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-19",
                  "capacity_end_date": "2019-08-19",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79153,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "7B79C43B-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79406,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "804C62C8-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-13",
                  "capacity_end_date": "2019-08-13",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79086,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "81816C92-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-05",
                  "capacity_end_date": "2019-06-05",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79060,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "81D17643-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-02",
                  "capacity_end_date": "2019-06-02",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79084,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "827EA55B-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-03",
                  "capacity_end_date": "2019-06-03",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79403,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "82D2F69D-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 82852,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8303C937-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-22",
                  "capacity_end_date": "2019-08-22",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79730,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "83793F5E-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-24",
                  "capacity_end_date": "2019-10-24",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79546,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8427EE90-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-19",
                  "capacity_end_date": "2019-09-19",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79085,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "89202F7A-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-04",
                  "capacity_end_date": "2019-06-04",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79291,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "89FF84AD-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-24",
                  "capacity_end_date": "2019-07-24",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79284,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8A614D50-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-17",
                  "capacity_end_date": "2019-07-17",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79404,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8BAC1BAA-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-11",
                  "capacity_end_date": "2019-08-11",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79414,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8E277B2B-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-21",
                  "capacity_end_date": "2019-08-21",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79290,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8ED054A1-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 80276,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "8F6B76AF-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-16",
                  "capacity_end_date": "2019-06-16",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79728,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "912EA145-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-22",
                  "capacity_end_date": "2019-10-22",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79672,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "924429E9-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-15",
                  "capacity_end_date": "2019-10-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79668,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "95DCAEB1-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-11",
                  "capacity_end_date": "2019-10-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79670,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "97346CD0-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-13",
                  "capacity_end_date": "2019-10-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79731,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "9942AC6A-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-25",
                  "capacity_end_date": "2019-10-25",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79351,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "9958A072-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79285,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "998C865C-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-18",
                  "capacity_end_date": "2019-07-18",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79055,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "9A0321B1-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-28",
                  "capacity_end_date": "2019-05-28",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79220,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "9D066ED0-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-06",
                  "capacity_end_date": "2019-07-06",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79662,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "A39F5662-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-05",
                  "capacity_end_date": "2019-10-05",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79666,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "A3E27D99-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-09",
                  "capacity_end_date": "2019-10-09",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79473,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "A3FF418D-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-29",
                  "capacity_end_date": "2019-08-29",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79350,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "A4655C66-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-06",
                  "capacity_end_date": "2019-08-06",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79409,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "AA57ECED-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-16",
                  "capacity_end_date": "2019-08-16",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79030,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "AB3B7792-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-27",
                  "capacity_end_date": "2019-05-27",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79224,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "ABA1E1FA-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-10",
                  "capacity_end_date": "2019-07-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79544,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "AC929F78-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-17",
                  "capacity_end_date": "2019-09-17",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79027,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "AE9F7A3D-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-24",
                  "capacity_end_date": "2019-05-24",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79405,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "AF4225BC-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-12",
                  "capacity_end_date": "2019-08-12",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79408,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "AF698EE1-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-15",
                  "capacity_end_date": "2019-08-15",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79600,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "B1F4FCA9-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-21",
                  "capacity_end_date": "2019-09-21",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79225,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "B309ED00-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-11",
                  "capacity_end_date": "2019-07-11",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79733,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "B6278F83-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-27",
                  "capacity_end_date": "2019-10-27",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79155,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "B7A4164E-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-24",
                  "capacity_end_date": "2019-06-24",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79218,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "BA4AE5BD-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-04",
                  "capacity_end_date": "2019-07-04",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 80071,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "BD95E625-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 14,
                  "capacity_price": 150
                },
                {
                  "id": 79411,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "BDD7AF06-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-18",
                  "capacity_end_date": "2019-08-18",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79222,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "C042B8E8-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-08",
                  "capacity_end_date": "2019-07-08",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79293,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "C46CEFCB-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-26",
                  "capacity_end_date": "2019-07-26",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79025,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "CA74DA0C-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-22",
                  "capacity_end_date": "2019-05-22",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 78994,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "CAF4DF6F-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-16",
                  "capacity_end_date": "2019-05-16",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79212,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D19FAE7F-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 20,
                  "capacity_price": 150
                },
                {
                  "id": 79056,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D323ADCF-4302-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-29",
                  "capacity_end_date": "2019-05-29",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79467,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D62BF643-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-23",
                  "capacity_end_date": "2019-08-23",
                  "capacity_available": 31,
                  "capacity_price": 150
                },
                {
                  "id": 79120,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D66C5190-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-15",
                  "capacity_end_date": "2019-06-15",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79115,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D73F6517-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-10",
                  "capacity_end_date": "2019-06-10",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79673,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D79262F5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-16",
                  "capacity_end_date": "2019-10-16",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79478,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D822EECA-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-03",
                  "capacity_end_date": "2019-09-03",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78996,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "D86A0DA0-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-18",
                  "capacity_end_date": "2019-05-18",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79545,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "DC3CAA84-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-18",
                  "capacity_end_date": "2019-09-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79089,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "DC4A2BE1-4402-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-08",
                  "capacity_end_date": "2019-06-08",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79160,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "DFD7D015-4602-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-20",
                  "capacity_end_date": "2019-06-20",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79724,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "E129480E-4C02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-18",
                  "capacity_end_date": "2019-10-18",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79538,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "E6384B2E-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-11",
                  "capacity_end_date": "2019-09-11",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79407,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "E81018D5-4802-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-14",
                  "capacity_end_date": "2019-08-14",
                  "capacity_available": 25,
                  "capacity_price": 150
                },
                {
                  "id": 79607,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "E88B1006-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-28",
                  "capacity_end_date": "2019-09-28",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79476,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "EAB379B2-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-01",
                  "capacity_end_date": "2019-09-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79475,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "EBC526A6-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-31",
                  "capacity_end_date": "2019-08-31",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 78992,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "EC851639-4202-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-05-14",
                  "capacity_end_date": "2019-05-14",
                  "capacity_available": 30,
                  "capacity_price": 150
                },
                {
                  "id": 79610,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "ECF0C930-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-01",
                  "capacity_end_date": "2019-10-01",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79119,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "ECF11878-4502-E911-80E8-001DD8B71D85",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-06-14",
                  "capacity_end_date": "2019-06-14",
                  "capacity_available": 12,
                  "capacity_price": 150
                },
                {
                  "id": 79216,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "EFA0A9A4-4602-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-02",
                  "capacity_end_date": "2019-07-02",
                  "capacity_available": 11,
                  "capacity_price": 150
                },
                {
                  "id": 79667,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "EFAA8FA5-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-10",
                  "capacity_end_date": "2019-10-10",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79542,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "F085C15F-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-15",
                  "capacity_end_date": "2019-09-15",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79340,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "F20A10D8-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-27",
                  "capacity_end_date": "2019-07-27",
                  "capacity_available": 15,
                  "capacity_price": 150
                },
                {
                  "id": 79540,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "F2CF3347-4A02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-09-13",
                  "capacity_end_date": "2019-09-13",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79663,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "F5DF946E-4B02-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-10-06",
                  "capacity_end_date": "2019-10-06",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79474,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "FDC57D99-4902-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-08-30",
                  "capacity_end_date": "2019-08-30",
                  "capacity_available": 32,
                  "capacity_price": 150
                },
                {
                  "id": 79283,
                  "is_package": 1,
                  "name": "Putter Fitting - 1 Hour",
                  "capacity_id": "FF903744-4702-E911-80E6-00155D042567",
                  "package_product_id": "2D406CA7-A818-E711-80D1-005056B31B92",
                  "capacity_start_date": "2019-07-16",
                  "capacity_end_date": "2019-07-16",
                  "capacity_available": 14,
                  "capacity_price": 150
                }
              ]
            }
          ]
        };
        
        return dispatch(getCatalogGearUpsellNew(testData || data),);
      },
      res404: () => console.log('Api.getCatalogGearUpsellNew() => 404'),
      reject: console.error,
      apiCallParams: {
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
  }
};

export function stepFiveIncreaseItemsPerPage() {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREASE_ITEMS_PER_PAGE,
  };
};

export function stepFiveRemoveGearItem(id) {
  return {
    type: stepFiveTypes.STEP_FIVE_REMOVE_GEAR_ITEM,
    payload: id,
  };
};

export function stepFiveUpdateGearItem(id) {
  return {
    type: stepFiveTypes.STEP_FIVE_UPDATE_GEAR_ITEM,
    payload: id,
  };
};

export function stepFiveSetParticipantProductId({ participantProductId, productId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_PARTICIPANT_PRODUCT_ID,
    payload: { participantProductId, productId },
  };
};

export function postCartCartIdParticipantParticipantIdProductRequest({ attributes, quantity, cartId, participantId, productId, type, product }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      apiCallParams: { attributes, cartId, quantity, participantId, product, productId, type },
      res200: (data) => {
        const { participant_product_id, cart } = data;
        dispatch( updateCart(cart), );
        dispatch( stepFiveSetGear(productId), );
        dispatch( stepFiveSetParticipantProductId({ participantProductId: participant_product_id, productId }), );
        return Promise.resolve();
      },
      res404: () => console.log('Api.postCartCartIdParticipantIdProduct() => 404'),
      reject: console.error,
    });
  }
};

export function deleteCartCartIdParticipantParticipantIdProductIdRequest({ cartId, participantId, productId, participantProductId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId: participantProductId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveRemoveGearItem(productId), );
      },
      res404: () => console.log('Api.deleteCartCartIdParticipantParticipantIdProductId() => 404'),
      reject: console.error,
    });
  }
};

export function putCartCartIdParticipantParticipantIdProductIdRequest({ cartId, participantId, productId, participantProductId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId: participantProductId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveUpdateGearItem(productId), );
        
        return Promise.resolve();
      },
      res404: () => console.log('Api.putCartCartIdParticipantParticipantIdProductId() => 404'),
      reject: console.error,
    });
  }
};

export function stepFiveSetUpsellGearItemDate({ cardId, dateId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_UPSELL_GEAR_ITEM_DATE,
    payload: { cardId, dateId },
  };
};

export function stepFiveSetUpsellGearItem(id) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_UPSELL_GEAR_ITEM,
    payload: id,
  };
};

export function stepFiveUpdateUpsellGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_UPDATE_UPSELL_GEAR_ITEM,
    payload: { cardId },
  };
}

export function stepFiveIncreaseUpsellItemsPerPage() {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREASE_UPSELL_ITEMS_PER_PAGE,
  };
}

export function stepFiveSetUpsellGearItemRequest({ cartId, participantId, product, quantity, productId, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      apiCallParams: { cartId, participantId, product, quantity, productId, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveSetUpsellGearItem({ cardId, productId: data.participant_product_id }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveUpdateUpsellGearItemRequest({ cartId, participantId, productId, product, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId, product, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( stepFiveUpdateUpsellGearItem({ cardId }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function deleteUpsellGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_DELETE_UPSELL_GEAR_ITEM,
    payload: { cardId },
  };
}

export function stepFiveDeleteUpsellGearItemRequest({ cartId, participantId, productId, cardId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( deleteUpsellGearItem({ cardId }), );
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

function stepFiveGetCatalogExcursionsNew(data) {
  return {
    type: stepFiveTypes.STEP_FIVE_GET_CATALOG_EXCURSIONS_NEW,
    payload: data,
  };
};

export function stepFiveGetCatalogExcursionsNewRequest({ startDate, endDate }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogExcursionsNew,
      apiCallParams: { startDate, endDate },
      res200: data => {
        const tempData = {
          "timezone": "UTC",
          "total": 37,
          "starting_price": 99,
          "results": [
            {
              "name": "Off Campus Trip - Busch Gardens Tampa",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/busch-gardens.png",
              "weight": 0,
              "description": "Visit one of America's largest zoological institutions and theme parks. With over 335 acres, more than 2,700 animals and dozens of rides and shows you're guaranteed to have a good time!",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80104,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa",
                  "capacity_id": "18B547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "45C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 197,
                  "capacity_price": 225
                },
                {
                  "id": 80106,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa",
                  "capacity_id": "3300C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "45C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 192,
                  "capacity_price": 225
                },
                {
                  "id": 80108,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa",
                  "capacity_id": "4F37EAED-9F22-E911-80E6-00155D042567",
                  "package_product_id": "45C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 199,
                  "capacity_price": 225
                },
                {
                  "id": 80103,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa",
                  "capacity_id": "6DDFE8CE-9F22-E911-80E6-00155D042567",
                  "package_product_id": "45C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 184,
                  "capacity_price": 225
                },
                {
                  "id": 80105,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa",
                  "capacity_id": "8DD344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "45C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 183,
                  "capacity_price": 225
                },
                {
                  "id": 80107,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa",
                  "capacity_id": "952BEDE7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "45C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 199,
                  "capacity_price": 225
                }
              ]
            },
            {
              "name": "Off Campus Trip - Busch Gardens Tampa VIA",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/busch-gardens.png",
              "weight": 0,
              "description": "For ages 12 and under, visit one of America's largest zoological institutions and theme parks. With over 335 acres, more than 2,700 animals and dozens of rides and shows you're guaranteed to have a good time!",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80110,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa VIA",
                  "capacity_id": "21B547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "47C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-30",
                  "capacity_end_date": "2019-06-30",
                  "capacity_available": 197,
                  "capacity_price": 245
                },
                {
                  "id": 80111,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa VIA",
                  "capacity_id": "2D00C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "47C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-14",
                  "capacity_end_date": "2019-07-14",
                  "capacity_available": 183,
                  "capacity_price": 245
                },
                {
                  "id": 80112,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa VIA",
                  "capacity_id": "3500C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "47C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-21",
                  "capacity_end_date": "2019-07-21",
                  "capacity_available": 192,
                  "capacity_price": 245
                },
                {
                  "id": 80114,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa VIA",
                  "capacity_id": "5137EAED-9F22-E911-80E6-00155D042567",
                  "package_product_id": "47C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-10",
                  "capacity_end_date": "2019-08-10",
                  "capacity_available": 199,
                  "capacity_price": 245
                },
                {
                  "id": 80109,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa VIA",
                  "capacity_id": "6FDFE8CE-9F22-E911-80E6-00155D042567",
                  "package_product_id": "47C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-22",
                  "capacity_end_date": "2019-06-22",
                  "capacity_available": 184,
                  "capacity_price": 245
                },
                {
                  "id": 80113,
                  "is_package": 1,
                  "name": "Off Campus Trip - Busch Gardens Tampa VIA",
                  "capacity_id": "972BEDE7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "47C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-04",
                  "capacity_end_date": "2019-08-04",
                  "capacity_available": 199,
                  "capacity_price": 245
                }
              ]
            },
            {
              "name": "Off Campus Trip - Tampa Bay Rays Game",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/rays.png",
              "weight": 0,
              "description": "We're lucky enough to have a Major League Baseball team right up the street. Enjoy a day at the old ballpark and see how some of today's professional athletes perform on a day-to-day basis.",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80126,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game",
                  "capacity_id": "0FB547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D56D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 195,
                  "capacity_price": 99
                },
                {
                  "id": 80128,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game",
                  "capacity_id": "2F00C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D56D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 196,
                  "capacity_price": 99
                },
                {
                  "id": 80129,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game",
                  "capacity_id": "3700C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D56D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 197,
                  "capacity_price": 99
                },
                {
                  "id": 80130,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game",
                  "capacity_id": "4B37EAED-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D56D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 197,
                  "capacity_price": 99
                },
                {
                  "id": 80127,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game",
                  "capacity_id": "60D344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D56D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 191,
                  "capacity_price": 99
                },
                {
                  "id": 80125,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game",
                  "capacity_id": "D7EC8AC7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D56D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 196,
                  "capacity_price": 99
                }
              ]
            },
            {
              "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/rays.png",
              "weight": 0,
              "description": "For ages 12 and under. We're lucky enough to have a Major League Baseball team right up the street. Enjoy a day at the old ballpark and see how some of today's professional athletes perform on a day-to-day basis.",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80132,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
                  "capacity_id": "11B547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D76D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-28",
                  "capacity_end_date": "2019-06-28",
                  "capacity_available": 195,
                  "capacity_price": 119
                },
                {
                  "id": 80134,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
                  "capacity_id": "3100C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D76D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-19",
                  "capacity_end_date": "2019-07-19",
                  "capacity_available": 196,
                  "capacity_price": 119
                },
                {
                  "id": 80135,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
                  "capacity_id": "3900C5E1-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D76D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-23",
                  "capacity_end_date": "2019-07-23",
                  "capacity_available": 197,
                  "capacity_price": 119
                },
                {
                  "id": 80136,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
                  "capacity_id": "4D37EAED-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D76D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-07",
                  "capacity_end_date": "2019-08-07",
                  "capacity_available": 197,
                  "capacity_price": 119
                },
                {
                  "id": 80133,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
                  "capacity_id": "67D344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D76D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-05",
                  "capacity_end_date": "2019-07-05",
                  "capacity_available": 191,
                  "capacity_price": 119
                },
                {
                  "id": 80131,
                  "is_package": 1,
                  "name": "Off Campus Trip - Tampa Bay Rays Game VIA",
                  "capacity_id": "67DFE8CE-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D76D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-13",
                  "capacity_end_date": "2019-06-13",
                  "capacity_available": 196,
                  "capacity_price": 119
                }
              ]
            },
            {
              "name": "Off Campus Trip - Disney's Magic Kingdom VIA",
              "image_url": "http://cdn.imgacademy.com/creative/Logos/Disney%20Logo.png",
              "weight": 0,
              "description": "For ages 12 and under, conquer mountains, cruise down an exotic jungle river and brave a ghostly mansion. With hundreds of rides, attractions and entertainment options Disney's Magic Kingdom promises you a trip of a lifetime.",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80117,
                  "is_package": 1,
                  "name": "Off Campus Trip - Disney's Magic Kingdom VIA",
                  "capacity_id": "7DD344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "C86D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 190,
                  "capacity_price": 255
                },
                {
                  "id": 80118,
                  "is_package": 1,
                  "name": "Off Campus Trip - Disney's Magic Kingdom VIA",
                  "capacity_id": "8F2BEDE7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "C86D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 193,
                  "capacity_price": 255
                },
                {
                  "id": 80397,
                  "is_package": 1,
                  "name": "Off Campus Trip - Disney's Magic Kingdom VIA",
                  "capacity_id": "ACD80A0D-CD2B-E911-80E6-00155D042567",
                  "package_product_id": "C86D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-16",
                  "capacity_end_date": "2019-06-16",
                  "capacity_available": 200,
                  "capacity_price": 255
                }
              ]
            },
            {
              "name": "Off Campus Trip - Sea World Orlando",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/sea-world.png",
              "weight": 0,
              "description": "Experience rides, shows and get up close and personal with all the creatures of the sea. Maybe now is your chance to swim with the dolphins. Sign up for a trip to Sea World and have an underwater adventure.",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80119,
                  "is_package": 1,
                  "name": "Off Campus Trip - Sea World Orlando",
                  "capacity_id": "0BB547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "CE6D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 195,
                  "capacity_price": 235
                },
                {
                  "id": 80120,
                  "is_package": 1,
                  "name": "Off Campus Trip - Sea World Orlando",
                  "capacity_id": "82D344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "CE6D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 188,
                  "capacity_price": 235
                },
                {
                  "id": 80121,
                  "is_package": 1,
                  "name": "Off Campus Trip - Sea World Orlando",
                  "capacity_id": "912BEDE7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "CE6D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 197,
                  "capacity_price": 235
                }
              ]
            },
            {
              "name": "Off Campus Trip - Sea World Orlando VIA",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/sea-world.png",
              "weight": 0,
              "description": "For ages 12 and under, experience rides, shows and get up close and personal with all the creatures of the sea. Maybe now is your chance to swim with the dolphins. Sign up for a trip to Sea World and have an underwater adventure.",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80122,
                  "is_package": 1,
                  "name": "Off Campus Trip - Sea World Orlando VIA",
                  "capacity_id": "0DB547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D16D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-23",
                  "capacity_end_date": "2019-06-23",
                  "capacity_available": 195,
                  "capacity_price": 255
                },
                {
                  "id": 80123,
                  "is_package": 1,
                  "name": "Off Campus Trip - Sea World Orlando VIA",
                  "capacity_id": "87D344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D16D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-13",
                  "capacity_end_date": "2019-07-13",
                  "capacity_available": 188,
                  "capacity_price": 255
                },
                {
                  "id": 80124,
                  "is_package": 1,
                  "name": "Off Campus Trip - Sea World Orlando VIA",
                  "capacity_id": "932BEDE7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "D16D668E-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-08-03",
                  "capacity_end_date": "2019-08-03",
                  "capacity_available": 197,
                  "capacity_price": 255
                }
              ]
            },
            {
              "name": "Off Campus Trip - Disney's Magic Kingdom",
              "image_url": "http://cdn.imgacademy.com/creative/Logos/Disney%20Logo.png",
              "weight": 0,
              "description": "Conquer mountains, cruise down an exotic jungle river and brave a ghostly mansion. With hundreds of rides, attractions and entertainment options Disney's Magic Kingdom promises you a trip of a lifetime.",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80115,
                  "is_package": 1,
                  "name": "Off Campus Trip - Disney's Magic Kingdom",
                  "capacity_id": "76D344DB-9F22-E911-80E6-00155D042567",
                  "package_product_id": "4DC7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-07",
                  "capacity_end_date": "2019-07-07",
                  "capacity_available": 190,
                  "capacity_price": 235
                },
                {
                  "id": 80116,
                  "is_package": 1,
                  "name": "Off Campus Trip - Disney's Magic Kingdom",
                  "capacity_id": "8D2BEDE7-9F22-E911-80E6-00155D042567",
                  "package_product_id": "4DC7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-07-28",
                  "capacity_end_date": "2019-07-28",
                  "capacity_available": 193,
                  "capacity_price": 235
                }
              ]
            },
            {
              "name": "Off Campus Trip - Adventure Island Busch Gardens",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/adventure-island.png",
              "weight": 0,
              "description": "Let's face it. We're in Florida and it can get hot here. Adventure Island offers the perfect opportunity for you to cool off and have some fun. Waterslides, pools, volleyball and great food, all just a short drive away!",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80101,
                  "is_package": 1,
                  "name": "Off Campus Trip - Adventure Island Busch Gardens",
                  "capacity_id": "13B547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "41C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 193,
                  "capacity_price": 225
                }
              ]
            },
            {
              "name": "Off Campus Trip - Adventure Island Busch Gardens VIA",
              "image_url": "https://www.imgacademy.com/sites/default/files/excursion-logos/adventure-island.png",
              "weight": 0,
              "description": "For ages 12 and under. Let's face it. We're in Florida and it can get hot here. Adventure Island offers the perfect opportunity for you to cool off and have some fun. Waterslides, pools, volleyball and great food, all just a short drive away!",
              "categories": [ { "name": "Trips", "display_name": "Trips", "weight": "" } ],
              "dates": [
                {
                  "id": 80102,
                  "is_package": 1,
                  "name": "Off Campus Trip - Adventure Island Busch Gardens VIA",
                  "capacity_id": "15B547D5-9F22-E911-80E6-00155D042567",
                  "package_product_id": "43C7EF87-6DF9-E811-80E6-00155D042567",
                  "capacity_start_date": "2019-06-29",
                  "capacity_end_date": "2019-06-29",
                  "capacity_available": 193,
                  "capacity_price": 245
                }
              ]
            }
          ]
        };
        
        return dispatch(stepFiveGetCatalogExcursionsNew(tempData || data),);
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function setExcursionGearItemDate({ dateId, cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_EXCURSION_GEAR_ITEM_DATE,
    payload: { dateId, cardId },
  };
};

export function selectExcursionGearItem({ productId, cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_SELECT_EXCURSION_GEAR_ITEM,
    payload: { productId, cardId },
  };
};

export function updateExcursionGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_UPDATE_EXCURSION_GEAR_ITEM,
    payload: { cardId },
  };
};

export function deleteExcursionGearItem({ cardId }) {
  return {
    type: stepFiveTypes.STEP_FIVE_DELETE_EXCURSION_GEAR_ITEM,
    payload: { cardId },
  };
};

export function stepFiveSetExcursionGearItemRequest({ cartId, participantId, product, quantity, productId, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      apiCallParams: { cartId, participantId, product, quantity, productId, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( selectExcursionGearItem({ cardId, productId: data.participant_product_id }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveUpdateExcursionGearItemRequest({ cartId, participantId, productId, product, type, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.putCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId, product, type },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( updateExcursionGearItem({ cardId }) );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveDeleteExcursionGearItemRequest({ cartId, participantId, productId, cardId }) {
  return async function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      apiCallParams: { cartId, participantId, productId },
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        dispatch( deleteExcursionGearItem({ cardId }), );
        return Promise.resolve();
      },
      res404: console.log,
      reject: console.error,
    });
  }
};

export function stepFiveIncreaseExcursionsItemsPerPage() {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREASE_EXCURSION_ITEMS_PER_PAGE,
  };
};
