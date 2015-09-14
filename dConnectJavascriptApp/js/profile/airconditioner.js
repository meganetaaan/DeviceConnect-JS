/**
 airconditioner.js
 Copyright (c) 2015 NTT DOCOMO,INC.
 Released under the MIT license
 http://opensource.org/licenses/mit-license.php
 */

var PowerStatus = null;

var PowerSaving = null;

var OperationMode = null;

var RoomTemperature = null;

var TemperatureMin = 0;
var TemperatureMax = 50;
var Temperature = 25;

var AirFlowMin = 0;
var AirFlowMax = 100;
var AirFlow = 0;
var AirFlowAuto = "false";


/**
 * Air Conditioner
 */
function showAirConditioner(serviceId) {
  initAll();
  setTitle('AirConditioner Profile');

  var sessionKey = currentClientId;
  var btnStr = getBackButton('Device Top', 'doAirConditionerBack', serviceId,
                 sessionKey);
  reloadHeader(btnStr);
  reloadFooter(btnStr);
  
  getAirConditionerTemperatureValueStatus(serviceId);
  getAirConditionerPowerStatus(serviceId);
  getAirConditionerPowerSavingStatus(serviceId);
  getAirConditionerOperationModeSettingStatus(serviceId);
  getAirConditionerRoomTemperatureStatus(serviceId);
  getAirConditionerAirFlowValueStatus(serviceId);
  
  var str = '';
  str += '<form name="AirConditionerForm">';
  
  str += '<div>';
  str += '<label for="idPowerState">Power Status:</label>';
  str += '<input type="text" id="idPowerState" width="100%" value="'+ PowerStatus + '" readonly>';
  str += '<input type="button" onclick="doAirConditionerOnOff(\'' +
  serviceId + '\', \'ON\');" value="ON" name="ON" >';
  str += '<input type="button" onclick="doAirConditionerOnOff(\'' +
  serviceId + '\', \'OFF\');" value="OFF" name="OFF" >';
  str += '</div>';

  str += '<div>';
  str += '<label for="idPowerSavingStatus">Power Saving:</label>';
  str += '<input type="text" id="idPowerSavingStatus" width="100%" value="'+ PowerSaving + '" readonly>';
  str += '<input type="button" onclick="doAirConditionerPowerSavingOnOff(\'' + serviceId + '\', \'Normal\');" value="Normal" name="Normal" >';
  str += '<input type="button" onclick="doAirConditionerPowerSavingOnOff(\'' + serviceId + '\', \'PowerSaving\');" value="PowerSaving" name="PowerSaving" >';
  str += '</div>';

  str += '<div>';
  str += '<label for="idOperationModeStatus">Operation Mode:</label>';
  str += '<input type="text" id="idOperationModeStatus" width="100%" value="'+ OperationMode + '" readonly>';
  str += '<input type="button" onclick="doAirConditionerOperationModeSettingSet(\'' +
  serviceId + '\', \'Automatic\');" value="Automatic" name="Automatic" >';
  str += '<input type="button" onclick="doAirConditionerOperationModeSettingSet(\'' +
  serviceId + '\', \'AirCirculator\');" value="AirCirculator" name="AirCirculator" >';
  str += '<input type="button" onclick="doAirConditionerOperationModeSettingSet(\'' +
  serviceId + '\', \'Cooling\');" value="Cooling" name="Cooling" >';
  str += '<input type="button" onclick="doAirConditionerOperationModeSettingSet(\'' +
  serviceId + '\', \'Heating\');" value="Heating" name="Heating" >';
  str += '<input type="button" onclick="doAirConditionerOperationModeSettingSet(\'' +
  serviceId + '\', \'Dehumidification\');" value="Dehumidification" name="Dehumidification" >';
  str += '<input type="button" onclick="doAirConditionerOperationModeSettingSet(\'' +
  serviceId + '\', \'Other\');" value="Other" name="Other" >';
  str += '</div>';

  str += '<div>';
  str += '<label for="idRoomTemperatureStatus">Room Temperature (℃):</label>';
  str += '<input type="text" id="idRoomTemperatureStatus" width="100%" readonly>';
  str += '<input type="button" onclick="getAirConditionerRoomTemperatureStatus(\'' + serviceId + '\');" value="Get Room Temperature Value" >';
  str += '</div>';

  str += '<div>';
  str += '<label for="idTemperatureValueStatus">Temperature Value (℃):</label>';
  str += '<input type="text" id="idTemperatureValueStatus" width="100%" value="'+ Temperature + '" readonly>';
  str += '<input id="idTemperatureValue" name="idTemperatureValue" type="range" min="' +
           TemperatureMin + '" max="' + TemperatureMax + 
           '" step="1" onchange="showTemperatureValue()" value="'+ Temperature + '" />';
  str += '<input type="button" onclick="doAirConditionerTemperatureValueSet(\'' + serviceId + '\');" value="Set Temperature Value" >';
  str += '</div>';

  str += '<div>';
  str += '<label for="idAirFlowValueStatus">Air Flow Value:';
  str += '<input type="text" id="idAirFlowValueStatus" width="100%" value="'+ AirFlow + '" readonly /></label>';
  str += '</div>';

  str += '<div>';
  str += '<br>';
  str += '<input type="checkbox" id="idAirFlowValueAutoCheck" name="AirFlowAutoCheck" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air Flow Automatic';
  str += '<br>';
  str += '</div>';

  str += '<div>';
  str += '<input id="idAirFlowValue" name="idAirFlowValue" type="range" min="' +
           AirFlowMin + '" max="' + AirFlowMax + 
           '" step="1" onchange="showAirFlowValue()" value="'+ AirFlow + '" />';
  str += '<input type="button" onclick="doAirConditionerAirFlowValueSet(\'' + serviceId + '\');" value="Set Air Flow Value" >';
  str += '</div>';

  str += '<div>';
  str += '<li><a href="javascript:showENLControl(\'' + serviceId +
           '\');" >ECHONET Lite Property Control</a></li>';
  str += '</div>';

  str += '</form>';


  reloadList(str);
}

function showTemperatureValue() {
  console.log('showTemperatureValue: ', $('#idTemperatureValue').val());
  Temperature = $('#idTemperatureValue').val();
}

function showAirFlowValue() {
  console.log('showAirFlowValue: ', $('#idAirFlowValue').val());
  AirFlow = $('#idAirFlowValue').val();
}

/**
 * Show ECHONET Lite Property Get
 *
 * @param {String}serviceId サービスID
 */
function showENLGet(serviceId) {
  initAll();
  setTitle('Get ECHONETLite Property');

  var sessionKey = currentClientId;

  var btnStr = getBackButton('AirConditioner Top', 'doENLGetBack', serviceId,
                 sessionKey);
  reloadHeader(btnStr);
  reloadFooter(btnStr);

  var str = '';
  str += '<form name="ENLGetForm">';
  str += 'ECHONETLite Property Get<br>';

  str += '<label for="airconditonerENLGetEPC">EPC:</label>';
  str += '<input type="text" id="idGetEPC" width="100%">';

  str += '<input type="button" name="getButton" id="getButton" value="Get"' +
           ' onclick="doGetENLEPC(\'' + serviceId + '\');"/>';

  str += '<label for="airconditonerENLGetValue">Value:</label>';
  str += '<input type="text" id="idGetValue" width="100%">';
  str += '</form>';
  reloadContent(str);
}

/**
 * Show ECHONET Lite Property Set
 *
 * @param {String}serviceId Service ID
 */
function showENLSet(serviceId) {
  initAll();
  setTitle('Set ECHONETLite Property');

  var sessionKey = currentClientId;

  var btnStr = getBackButton('AirConditioner Top', 'doENLSetBack', serviceId,
                 sessionKey);
  reloadHeader(btnStr);
  reloadFooter(btnStr);

  var str = '';
  str += '<form name="ENLSetForm">';
  str += 'ECHONETLite Property Set<br>';

  str += '<label for="airconditonerENLSetEPC">EPC:</label>';
  str += '<input type="text" id="idSetEPC" width="100%">';
  str += '<label for="airconditonerENLSetValue">EDT:</label>';
  str += '<input type="text" id="idSetValue" width="100%">';

  str += '<input type="button" name="setButton" id="setButton" value="Set"' +
           ' onclick="doSetENLEPC(\'' + serviceId + '\');"/>';

  str += '<label for="airconditonerENLSetResult">Result:</label>';
  str += '</form>';
  reloadContent(str);
}

/**
 * Back button
 *
 * serviceId service ID
 * sessionKey session KEY
 */
function doAirConditionerBack(serviceId, sessionKey) {
  searchSystem(serviceId);
}

/**
 * Back button
 *
 * serviceId Service ID
 * sessionKey Session KEY
 */
function doENLGetBack(serviceId, sessionKey) {
  showAirConditioner(serviceId);
}

/**
 * Back button
 *
 * serviceId Service ID
 * sessionKey Session KEY
 */
function doENLSetBack(serviceId, sessionKey) {
  showAirConditioner(serviceId);
}

/**
 * Get Air Conditioner power state.
 * @param {String} serviceId Service ID.
 */
function getAirConditionerPowerStatus(serviceId) {
  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += json.powerstatus;
    $('#idPowerState').val(str);
    PowerStatus = str;
  }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idPowerState').val(str);
    PowerStatus = str;
  });
}

/**
 * Power On/Off.
 * @param {String} serviceId service ID
 * @param {String} isSwitch On / Off
 */
function doAirConditionerOnOff(serviceId, isSwitch) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);

  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  var successCallback = function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }

    closeLoading();
    getAirConditionerPowerStatus(serviceId);
  };

  var errorCallback = function(errorCode, errorMessage) {
    closeLoading();
    showError('PowerOnOff Air Conditioner', errorCode, errorMessage);
    getAirConditionerPowerStatus(serviceId);
  };

  if (isSwitch == 'ON') {
    dConnect.put(uri, null, null, successCallback, errorCallback);
  } else {
    dConnect.delete(uri, null, successCallback, errorCallback);
  }

}

/**
 * Get Air Conditioner power saving status.
 * @param {String} serviceId Service ID.
 */
function getAirConditionerPowerSavingStatus(serviceId) {
  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('operationpowersaving');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += json.operationpowersaving;
    $('#idPowerSavingStatus').val(str);
    PowerSaving = str;
  }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idPowerSavingStatus').val(str);
    PowerSaving = str;
  });
}

/**
 * Power Saving On/Off.
 * @param {String} serviceId service ID
 * @param {String} isSwitch On / Off
 */
function doAirConditionerPowerSavingOnOff(serviceId, isSwitch) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('operationpowersaving');
  builder.setServiceId(serviceId);
  builder.addParameter('operationpowersaving', isSwitch);
  builder.setAccessToken(accessToken);

  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  var successCallback = function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }

    closeLoading();
    getAirConditionerPowerSavingStatus(serviceId);
  };

  var errorCallback = function(errorCode, errorMessage) {
    closeLoading();
    showError('PowerSavingOnOff Air Conditioner', errorCode, errorMessage);
    getAirConditionerPowerSavingStatus(serviceId);
  };

  dConnect.put(uri, null, null, successCallback, errorCallback);

}

/**
 * Get Air Conditioner operation mode setting status.
 * @param {String} serviceId Service ID.
 */
function getAirConditionerOperationModeSettingStatus(serviceId) {
  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('operationmodesetting');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += json.operationmodesetting;
    $('#idOperationModeStatus').val(str);
    OperationMode = str;
  }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idOperationModeStatus').val(str);
    OperationMode = str;
  });
}

/**
 * Set Operation Mode Setting.
 * @param {String} serviceId service ID
 * @param {String} mode Operation Mode
 */
function doAirConditionerOperationModeSettingSet(serviceId, mode) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('operationmodesetting');
  builder.setServiceId(serviceId);
  builder.addParameter('operationmodesetting', mode);
  builder.setAccessToken(accessToken);

  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  var successCallback = function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }

    closeLoading();
    getAirConditionerOperationModeSettingStatus(serviceId);
  };

  var errorCallback = function(errorCode, errorMessage) {
    closeLoading();
    showError('OperationModeSettingSet Air Conditioner', errorCode, errorMessage);
    getAirConditionerOperationModeSettingStatus(serviceId);
  };

  dConnect.put(uri, null, null, successCallback, errorCallback);

}

/**
 * Get Air Conditioner room temperature status.
 * @param {String} serviceId Service ID.
 */
function getAirConditionerRoomTemperatureStatus(serviceId) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('roomtemperature');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += json.roomtemperature;
    $('#idRoomTemperatureStatus').val(str);
    RoomTemperature = str;
  }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idRoomTemperatureStatus').val(str);
    RoomTemperature = str;
  });
}

/**
 * Get Air Conditioner temperature value status.
 * @param {String} serviceId Service ID.
 */
function getAirConditionerTemperatureValueStatus(serviceId) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('temperaturevalue');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += json.temperaturevalue;
    $('#idTemperatureValueStatus').val(str);
    $('#idTemperatureValue').val(str);
    Temperature = str;
  }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idTemperatureValueStatus').val(str);
    Temperature = str;
  });
}

/**
 * Set Temperature Value.
 * @param {String} serviceId service ID
 * @param {String} value Temperature Value
 */
function doAirConditionerTemperatureValueSet(serviceId) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('temperaturevalue');
  builder.setServiceId(serviceId);
  builder.addParameter('temperaturevalue', Temperature);
  builder.setAccessToken(accessToken);

  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  var successCallback = function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }

    closeLoading();
    getAirConditionerTemperatureValueStatus(serviceId);
  };

  var errorCallback = function(errorCode, errorMessage) {
    closeLoading();
    showError('TemperatureValueSet Air Conditioner', errorCode, errorMessage);
    getAirConditionerTemperatureValueStatus(serviceId);
  };

  dConnect.put(uri, null, null, successCallback, errorCallback);

}

/**
 * Get Air Conditioner air flow value status.
 * @param {String} serviceId Service ID.
 */
function getAirConditionerAirFlowValueStatus(serviceId) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('airflowvalue');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += (json.airflowvalue) * 100;
    $('#idAirFlowValueStatus').val(str);
    $('#idAirFlowValue').val(str).slider('refresh');
    AirFlow = str;
    if (json.airflowauto === ("true")) {
      AirFlowAuto = true;
      document.AirConditionerForm.elements["idAirFlowValueAutoCheck"].checked = true;
      $('#idAirFlowValueStatus').val("Automatic");
    } else {
      AirFlowAuto = false;
      document.AirConditionerForm.elements["idAirFlowValueAutoCheck"].checked = false;
    }
   }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idAirFlowValueStatus').val(str);
    AirFlow = str;
  });
}

/**
 * Set Air Flow Value.
 * @param {String} serviceId service ID
 */
function doAirConditionerAirFlowValueSet(serviceId) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('airflowvalue');
  builder.setServiceId(serviceId);
  builder.setAccessToken(accessToken);
  
  var AirFlow = Number($('#idAirFlowValue').val());
  console.log('AirFlow: ', AirFlow);

  if ($('#idAirFlowValueAutoCheck:checked').val()) {
    builder.addParameter('airflowauto', "true");
  } else {
    builder.addParameter('airflowauto', "false");
    if (AirFlow == 0) {
      builder.addParameter('airflowvalue', 0);
    } else {
      builder.addParameter('airflowvalue', AirFlow/100);
    }
  }

  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  var successCallback = function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }

    closeLoading();
    getAirConditionerAirFlowValueStatus(serviceId);
  };

  var errorCallback = function(errorCode, errorMessage) {
    closeLoading();
    showError('AirFlowValueSet Air Conditioner', errorCode, errorMessage);
    getAirConditionerAirFlowValueStatus(serviceId);
  };

  dConnect.put(uri, null, null, successCallback, errorCallback);

}

/**
 * Get Air Conditioner ECHONETLite Property.
 * @param {String} serviceId Service ID.
 * @param {String} epc Property number.
 */
function getAirConditionerECHONETLiteProperty(serviceId, epc) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('enlproperty');
  builder.setServiceId(serviceId);
  builder.addParameter('epc', epc);
  builder.setAccessToken(accessToken);
  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  dConnect.get(uri, null, function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }
    closeLoading();

    var str = '';
    str += json.value;
    $('#idGetEDT').val(str);
  }, function(errorCode, errorMessage) {
    closeLoading();
    var str = '';
    str += 'Unknown';
    $('#idGetEDT').val(str);
  });
}

/**
 * Set ECHONET Lite Property.
 * @param {String} serviceId service ID
 * @param {String} epc Property Number.
 * @param {String} value Property Value
 */
function doAirConditionerECHONETLitePropertySet(serviceId, epc, value) {

  var builder = new dConnect.URIBuilder();
  builder.setProfile('airconditioner');
  builder.setAttribute('enlproperty');
  builder.setServiceId(serviceId);
  builder.addParameter('epc', epc);
  builder.addParameter('value', value);
  builder.setAccessToken(accessToken);

  var uri = builder.build();
  if (DEBUG) {
    console.log('Uri: ' + uri);
  }

  closeLoading();
  showLoading();

  var successCallback = function(json) {
    if (DEBUG) {
      console.log('Response: ', json);
    }

    closeLoading();
    $('#idSetResult').val(json.result);
  };

  var errorCallback = function(errorCode, errorMessage) {
    closeLoading();
    showError('ECHONETLitePropertySet Air Conditioner', errorCode, errorMessage);
    $('#idSetResult').val(json.result);
  };

  dConnect.put(uri, null, null, successCallback, errorCallback);

}

/* Show ECHONET Lite page */
function showENLControl(serviceId) {
  initAll();
  setTitle('ECHONET Lite Control (GET)');

  var sessionKey = currentClientId;
  var btnStr = getBackButton('AirCoditioner Top', 'doENLGetBack', serviceId,
                 sessionKey);
  reloadHeader(btnStr);
  reloadFooter(btnStr);
  
  var str = '';
  str += '<form name="ECHONETLiteForm">';
  
  str += '<div>';
  str += '<label>Get ECHONET Lite Property:</label>';
  str += '<label for="idGetEPC">ECHONET Property (EPC):</label>';
  str += '<input type="text" id="idGetEPC" width="100%" value="" />';
  str += '<input type="button" name="getButton" id="getButton" value="Get"' +
           ' onclick="doGetENLEPC(\'' + serviceId + '\');"/>';
  str += '<label for="idGetEDT">ECHONET Property Data (EDT):</label>';
  str += '<input type="text" id="idGetEDT" width="100%" value="" readonly />';
  str += '</div>';
  str += '<br>';
  str += '<hr>';
  str += '<br>';
  str += '<div>';
  str += '<label>Set ECHONET Lite Property:</label>';
  str += '<label for="idSetEPC">ECHONET Property (EPC):</label>';
  str += '<input type="text" id="idSetEPC" width="100%" value="" />';
  str += '<label for="idSetEDT">ECHONET Property Data (EDT):</label>';
  str += '<input type="text" id="idSetEDT" width="100%" value="" />';
  str += '<input type="button" name="setButton" id="setButton" value="Set"' +
           ' onclick="doSetENLEPC(\'' + serviceId + '\');"/>';
  str += '<label for="idSetResult">Result:</label>';
  str += '<input type="text" id="idSetResult" width="100%" value="" readonly />';
  str += '</div>';

  str += '</form>';

  reloadList(str);
}

/**
 * Get ECHONET Lite value.
 * @param {String} serviceId service ID
 */
function doGetENLEPC(serviceId) {

  var epc = $('#idGetEPC').val();
      console.log('epc: ', epc);
  getAirConditionerECHONETLiteProperty(serviceId, epc);

}

/**
 * Set ECHONET Lite value.
 * @param {String} serviceId service ID
 */
function doSetENLEPC(serviceId) {

  var epc = $('#idSetEPC').val();
  var edt = $('#idSetEDT').val();
      console.log('epc: ', epc);
      console.log('edt: ', edt);
  doAirConditionerECHONETLitePropertySet(serviceId, epc, edt);

}


