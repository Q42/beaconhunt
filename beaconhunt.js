const Beacons = new Mongo.Collection('beacons');
if (Meteor.isServer) {
  Beacons.remove({});
  Meteor.startup(() => {
    if (Beacons.find().count() != 1) {
      console.log('Reinserting beacons in db');
      Beacons.remove({});
      Beacons.insert({
        uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
        // major: 38008,
        // minor: 37725,
        identifier: "Kevin"
      });
    }
  });
}

if (Meteor.isCordova) {
  Meteor.startup(() => {
    Meteor.setTimeout(function() {
      Beacons.find().forEach((myBeacon, i) => {
        var myBeaconProps = _.pick(myBeacon, 'uuid', 'major', 'minor', 'identifier');
        console.log('Searching for beacon', myBeaconProps);
        let reactiveBeaconRegion = new ReactiveBeaconRegion(myBeaconProps);
        Tracker.autorun(function () {
          if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
            var beaconRegion = reactiveBeaconRegion.getBeaconRegion();
            console.log('found', beaconRegion);
            Beacons.update({_id:myBeacon._id}, {$set: { found: beaconRegion }})
          }
        });
      });
    }, 1000);
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
