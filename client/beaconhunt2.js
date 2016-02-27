const step = new ReactiveVar('welcome');
const imageWidth = 3300;
const imageHeight = 2550;
const gpsTopleft = [28.150085, -15.430711]; // coworking
const gpsBottomright = [28.149517, -15.429799]; // coworking
// const gpsTopleft = [28.138081, -15.437219]; // hostel
// const gpsBottomright = [28.137953, -15.437022]; // hostel

let screenWidth = 980;
let screenHeight = 1543;

convertToPixels = function(latlng) {
  (2550 - 567) / (28.137901 - 28.137975)
  const pxHeight = (imageHeight - screenHeight) / (gpsTopleft[0] - gpsBottomright[0]);
  const pxWidth = (imageWidth - screenWidth) / (gpsBottomright[1] - gpsTopleft[1]);

  var pxTop = imageHeight - ((latlng.lat - gpsBottomright[0]) * pxHeight);
  var pxLeft = (latlng.lng - gpsTopleft[1]) * pxWidth;

  return [pxLeft, pxTop];
}

Meteor.startup(() => {
  Geolocation.latLng();
})

Template.layout.helpers({
  stepIsWelcome() {
    return step.get() == 'welcome';
  },
  stepIsFound() {
    return step.get() == 'found';
  }
});

var prevPx = {};
moveMap = function() {
  var px = convertToPixels(Geolocation.latLng());
  if (px[0] == prevPx[0] && px[1] == prevPx[1]) {
    console.log('same location', px);
    Meteor.setTimeout(moveMap, 1500);
    return;
  }
  prevPx = px;
  console.log('scrolling to', px);
  // px = [100,1700];
  var isKevinInScreen = px[1] > 1600 && px[0] < 200;
  console.log('kevininsc', isKevinInScreen);
  $('#waldocontainer').animate({
    scrollLeft: px[0],
    scrollTop: px[1]
  }, 1500, 'linear', isKevinInScreen ? win : moveMap);
}

win = function() {
  step.set('found');
}

Template.welcomeTemplate.helpers({
  description() {
    return description;
  }
});

Template.welcomeTemplate.events({
  'click button'() {
    step.set('find');
    $('#waldocontainer').animate({opacity:'1.0'}, 400, 'linear', () => {
      screenWidth = $('#waldocontainer').width();
      screenHeight = $('#waldocontainer').height();
      const left2 = imageWidth - screenWidth;
      const top2 = imageHeight - screenHeight;
      $('#waldocontainer').animate({
        scrollTop: top2,
        scrollLeft: left2}, 3000, moveMap);
    })
  }
})

Template.beacons.helpers({
  beacons() {
    return Beacons.find({timestamp:{$gte: Chronos.currentTime().getTime()-2000}});
  },
  kevin() {
    return Beacons.findOne({
      isKevin: true,
      timestamp:{$gte: Chronos.currentTime().getTime()-2000}
    });
  }
});

Template.waldoTemplate.helpers({
  location() {
    var latlng = Geolocation.latLng();
    // console.log(latlng);
    return JSON.stringify(latlng);
  }
});
