Template.beacons.helpers({
  beacons() {
    return Beacons.find({timestamp:{$gte: Chronos.currentTime().getTime()-2000}});
  }
});
