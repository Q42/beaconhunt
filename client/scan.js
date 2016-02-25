if (Meteor.isCordova) {
  Meteor.startup(function() {
    lookingForBeacons.forEach(function(myBeacon) {
      var reactiveBeaconRegion = new ReactiveBeaconRegion({
        identifier: myBeacon.identifier,
        uuid: myBeacon.uuid,
        major: myBeacon.major,
        minor: myBeacon.minor
      });
      Tracker.autorun(function () {
        if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
          foundBeacons(reactiveBeaconRegion.getBeaconRegion().beacons);
        }
      });
    });
  });
}
