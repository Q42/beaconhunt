if (Meteor.isCordova) {
  Meteor.startup(function() {
    lookingForBeacons.forEach(function(myBeacon) {
      var reactiveBeaconRegion = new ReactiveBeaconRegion({
        identifier: myBeacon.identifier,
        uuid: myBeacon.uuid
      });
      Tracker.autorun(function () {
        if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
          var foundBeacons = reactiveBeaconRegion.getBeaconRegion().beacons;
          foundBeacons.forEach(function(foundBeacon) {
            var version = foundBeacon.major + '.' + foundBeacon.minor;
            Beacons.upsert({_id:foundBeacon.uuid + version}, {$set:{
              identifier: version, found:foundBeacon, isKevin: version == Kevin
            }})
          });
        }
      });
    });
  });
}
