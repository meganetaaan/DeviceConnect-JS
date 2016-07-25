module('RemoteControllerProfileNormalTest', {
  setup: function() {
    init();
  }
});

/**
 * RemoteControllerプロファイルの正常系テストを行うクラス。
 * @class
 */
var RemoteControllerProfileNormalTest = {};

/**
 * 赤外線情報を取得するテストを行う。
 * <h3>【HTTP通信】</h3>
 * <p id="test">
 * Method: GET<br/>
 * Path: /remotecontroller?serviceId=xxx&accessToken=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id="expected">
 * ・resultに0が返ってくること。<br/>
 * ・messageとして赤外線情報が取得できること。<br/>
 * </p>
 */
RemoteControllerProfileNormalTest.remoteControllerNormalTest001 = function(assert) {
  searchTestService(function(accessToken, serviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('remotecontroller');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    var uri = builder.build();
    dConnect.get(uri, null, function(json) {
      assert.ok(true, 'result=' + json.result);
      assert.ok(json.message !== undefined, 'message: ' + json.message);
      QUnit.start();
    }, function(errorCode, errorMessage) {
      assert.ok(checkErrorCode(errorCode),
          'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(false,
        'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('remoteControllerNormalTest001',
    RemoteControllerProfileNormalTest.remoteControllerNormalTest001);

/**
 * 赤外線情報を送信するテストを行う。
 * <h3>【HTTP通信】</h3>
 * <p id="test">
 * Method: POST<br/>
 * Path: /remotecontroller?serviceId=xxx&accessToken=xxx&message=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id="expected">
 * ・resultに0が返ってくること。<br/>
 * </p>
 */
RemoteControllerProfileNormalTest.remoteControllerNormalTest002 = function(assert) {
  searchTestService(function(accessToken, serviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('remotecontroller');
    builder.setServiceId(serviceId);
    builder.addParameter('message',
        '{\"format\":\"raw\",\"freq\":38,\"data\":' +
        '[58076,65535,0,34665,6424,3341,735,2537,735,1037,735,1037,735,' +
        '1037,735,1037,735,1037,735,1037,735,1037,735,1037,735,1037,735,' +
        '1037,735,1037,735,2537,735,1037,735,1037,735,1037,735,1037,735,' +
        '1037,735,1037,735,1037,735,1037,735,1037,735,1037,735,1037,735,' +
        '1037,735,1037,735,1037,735,1037,735,1037,735,1037,735,2451,787,' +
        '1002,787,2451,787,2451,787,2451,787,2451,787,2451,787,2451,787,' +
        '1002,787,2451,787,2451,787,2451,787,2451,787,2451,787,2451,787,' +
        '2451,787,2451,787,2451,787,1002,787,1002,787,1002,787,1002,787,' +
        '1002,787,1002,787,1002,787,1002,787,1002,787,1002,787,2451,787,' +
        '2451,787,1002,787,1002,787,2451,787,2451,787,2451,787,2451,787,' +
        '1002,787,1002,787,2451,787,2451,787,1002,787,1002,787,1002,787,' +
        '2451,787,1002,787,1002,787,2451,787,1002,787,1002,787,2451,787,' +
        '2451,787,1002,787,2451,787,2451,787,1002,787,2451,787,2451,787,' +
        '1002,787,2451,787,2451,787,1002,787,1002,787,2451,787,1002,787,' +
        '1002,787,1002,787,1002,787,1002,787,2451,787,2451,787,1002,787,' +
        '2451,787,2451,787,2451,787,1002,787,1002,787,1002,787,2451,787,' +
        '1002,787,2451,787,2451,787,1002,787,2451,787,2451,787,2451,787,' +
        '1002,787,2451,787,1002,787,1002,787,2451,787,1002,787,1002,787,' +
        '1002,787,1002,787,1002,787,1002,787,1002,787,1002,787,2451,787,' +
        '2451,787,2451,787,2451,787,2451,787,2451,787,2451,787,2451,787,' +
        '935,815,935,815,935,815,935,815,935,815,935,815,935,815,935,815,' +
        '2451,815,2451,815,2451,815,2451,815,2451,815,2451,815,2451,815,' +
        '2451,815,935,815,935,815,935,815,935,815,935,815,935,815,935,' +
        '815,935,815,2451,843,2451,843,2451,843,2451,843,2451,843,2451,' +
        '843,2451,843,2451,843,935,815,935,815,935,815,935,815,935,815,' +
        '935,815,935,815,935,815,2451,843,2451,843,2451,843,2451,843,' +
        '2451,843,2451,843,2451,843,2451,843,935,815,935,815,935,815,935,' +
        '815,935,815,935,815,935,815,935,815,2451,843,2451,843,2451,843,' +
        '2451,843,2451,843,2451,843,2451,843,2451,843,2451,843,2451,843,' +
        '935,815,935,815,2451,843,935,843,2451,843,935,843,935,843,935,' +
        '843,2451,843,2451,843,935,843,2451,843,935,843,2451,843,2451,' +
        '843,935,843,935,843,935,843,935,843,2451,843,2451,843,2451,843,' +
        '935,843,2451,843,2451,843,2451,843,2451,843,935,843,935,843,935,' +
        '843,935,843,935,843,935,843,935,843,935,843,935,843,935,843,935,' +
        '843,2451,843,2451,843,2451,843,2451,843,2451,843,2451,843,2451,' +
        '843,2451,843,935,843,935,843,935,843,935,843,935,843,935,843,' +
        '935,843,935,843,2451,843,2451,843,2451,843,2451,843,2451,843,' +
        '2451,843,2451,843,2451,843,935,843,935,843,935,843,935,843,935,' +
        '843,935,843,935,843,2451,843,2451,843,2451,843,2451,843,2451,' +
        '843,2451,843,2451,843,2451,843,935,843,935,843,935,843,935,843,' +
        '935,43,935,843,935,843,935,843,935,843,2451,873,2451,873,2451,' +
        '873,2451,873,2451,873,2451,873,2451,873,2451,873,2451,873,873,' +
        '873,873,873,873,873,873,873,873,873,873,873,873,873,873,873,' +
        '2451,873,2451,873,2451,873,2451,873,2451,873,2451,873,2451,873,' +
        '873,873,873,873,873,873,2451,873,873,873,873,873,873,873,2451,' +
        '873,2451,873,2451,873,2451,873,873,873,2451,873,2451,873,2451,' +
        '873,873,873,873,873,873,873,873,873,873,873,873,873,873,873,873,' +
        '873,873,873,2451,873,2451,873,2451,873,2451,873,2451,873,2451,' +
        '873,2451,873,2451,873,873,873,873,873,873,873,873,873,873,873,' +
        '873,873,873,873,873,873,2451,873,2451,873,2451,873,2451,873,' +
        '2451,873,2451,873,2451,873,2451,873,2451,873,2451,873,2451,873,' +
        '2451,873,2451,873,2451,873,2451,873,2451,873,873,873,873,873,' +
        '873,873,873,873,873,873,873,873,873,873,873,873,2451,873,2451,' +
        '873,2451,873,2451,873,2451,873,2451,873,2451,873,2451,873,873,' +
        '873,873,873,873,873,873,873,873,873,873,873,873,873,968,815,' +
        '2451,815,2451,735,2537,735,2537,735,2537,735,2537,735,2537,735,' +
        '2537,735,1037,735,1037,735,1037,735,1037,735,1037,735,1037,735,' +
        '1037,735,1037,735,2537,735,2537,735,2537,735,2537,735,2537,735,' +
        '2537,735,2537,735,2537,735,1037,735,1037,735,1037,735,1037,735,' +
        '1037,735,1037,735,1037,735,1037,735]}');
    builder.setAccessToken(accessToken);
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(true, 'result=' + json.result);
      QUnit.start();
    }, function(errorCode, errorMessage) {
      assert.ok(checkErrorCode(errorCode),
          'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(false,
        'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('remoteControllerNormalTest002',
    RemoteControllerProfileNormalTest.remoteControllerNormalTest002);
