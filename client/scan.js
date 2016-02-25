if (Meteor.isCordova) {
  Meteor.startup(function() {
    lookingForBeacons.forEach(function(myBeacon) {
      var reactiveBeaconRegion = new ReactiveBeaconRegion({
        identifier: myBeacon.identifier,
        uuid: myBeacon.uuid
      });
      Tracker.autorun(function () {
        if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
          foundBeacons(reactiveBeaconRegion.getBeaconRegion().beacons);
        }
      });
    });
  });
}
