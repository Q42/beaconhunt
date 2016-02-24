Beacons = new Mongo.Collection('beacons');
Kevin = '38008.37725';
lookingForBeacons = [
  {
    uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
    // uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8',
    identifier: 'kevins'
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