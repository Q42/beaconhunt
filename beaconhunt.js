const Beacons = new Mongo.Collection('beacons');
if (Meteor.isServer) {
  if (Beacons.find().count() != 1) {
    console.log('Reinserting beacons in db');
    Beacons.remove({});
    Beacons.insert({
      uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
      major: 38008,
      minor: 37725,
      name: "Kevin 38008.37725"
    });
  }
}

if (Meteor.isCordova) {
  Meteor.startup(() => {
    Beacons.find().forEach((myBeacon, i) => {
      var reactiveBeaconRegion = new cordova.plugins.locationManager.BeaconRegion(
        myBeacon.name, myBeacon.uuid, myBeacon.major, myBeacon.minor
      );
      Tracker.autorun(function () {
        var beaconRegion = reactiveBeaconRegion.getBeaconRegion();
        if (beaconRegion) {
          Beacons.update({_id:myBeacon._id}, {$set: { found: beaconRegion }})
          console.log('found in region:', beaconRegion.inRegion);
        }
      });
    });
  });
}

if (Meteor.isClient) {
  Template.beacons.helpers({
    beacons: function () {
      return Beacons.find();
    },
    json: function(val) {
      return JSON.stringify(val);
    }
  });

  Template.beacons.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}
