Beacons = new Mongo.Collection(null);
Kevin = '38008.37725'; // mine purple
description = 'His name is Kevin, he\'s pretty big and looks a little purple :s';

// Kevin = '59685.38452'; // evening
// description = 'His name is Kevin, he\'s pretty big and looks a little green :s';

// Kevin = ''; // JJ
// description = 'His name is Kevin, he\'s pretty big and broke his glasses last week.';

lookingForBeacons = [
  {
    // uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d', // mine purple
    // uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8', // theirs
    uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d', // evening
    // uuid: '', // JJ
    // major: 38008,
    // minor: 37725
    identifier: 'kevins',
  }
]

Beacons.helpers({
  range() {
    return this.found.rssi < -100 ? 10 : Math.floor(this.found.rssi * -1 / 10);
  },
  accuracy() {
    // android
    return Math.floor(this.found.accuracy * 10);
  },
  proximity() {
    return Math.max(this.range(), 0);
    //return this.found.proximity;
  }
});

foundBeacons = function(beacons) {
  beacons.forEach((foundBeacon) => {
    var version = foundBeacon.major + '.' + foundBeacon.minor;
    Beacons.upsert({_id:foundBeacon.uuid + version}, {$set:{
      identifier: version,
      found:foundBeacon,
      isKevin: version == Kevin,
      timestamp: Date.now()
    }});
  });
}


if (Meteor.isCordova) {
  Meteor.startup(function() {
    console.log('Looking for beacons', lookingForBeacons);
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
