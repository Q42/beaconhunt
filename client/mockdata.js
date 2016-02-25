if (!Meteor.isCordova) {
  const mock = [
    [{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38832,"minor":57643,"proximity":"ProximityNear","rssi":-82,"tx":-74,"accuracy":1.52}],
    // [{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":9593,"minor":19403,"proximity":"ProximityNear","rssi":-88,"tx":-74,"accuracy":2.13},{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38008,"minor":37725,"proximity":"ProximityNear","rssi":-73,"tx":-74,"accuracy":0.97},{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38832,"minor":57643,"proximity":"ProximityNear","rssi":-83,"tx":-74,"accuracy":1.52}],
    // [{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":9593,"minor":19403,"proximity":"ProximityNear","rssi":-88,"tx":-74,"accuracy":2.13},{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38008,"minor":37725,"proximity":"ProximityNear","rssi":-73,"tx":-74,"accuracy":0.97},{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38832,"minor":57643,"proximity":"ProximityNear","rssi":-83,"tx":-74,"accuracy":1.52}],
    [{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":9593,"minor":19403,"proximity":"ProximityNear","rssi":-88,"tx":-74,"accuracy":1.95},{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38832,"minor":57643,"proximity":"ProximityNear","rssi":-87,"tx":-74,"accuracy":1.57},{"uuid":"b9407f30-f5f8-466e-aff9-25556b57fe6d","major":38008,"minor":37725,"proximity":"ProximityNear","rssi":-73,"tx":-74,"accuracy":0.87}],
  ];

  let counter = 0;
  Meteor.setInterval(function() {
    foundBeacons(mock[counter]);
    counter = counter >= mock.length-1 ? 0 : counter+1;
  }, 2000);
}
