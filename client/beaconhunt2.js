const step = new ReactiveVar('welcome');
const imageWidth = 3300;
const imageHeight = 2550;

let screenWidth = 980;
let screenHeight = 1543;

Template.layout.helpers({
  stepIsWelcome() {
    return step.get() == 'welcome';
  }
});

Template.welcomeTemplate.events({
  'click button'() {
    step.set('find');
    Meteor.setTimeout(() => {
      screenWidth = $('#waldocontainer').width();
      screenHeight = $('#waldocontainer').height();
      const left2 = imageWidth - screenWidth;
      const top2 = imageHeight - screenHeight;
      console.log('scrolling to', top2, left2);
      $('#waldocontainer').animate({
        scrollTop: top2,
        scrollLeft: left2}, 3000, () => {
          const left = imageWidth / 2 - screenWidth / 2;
          const top = imageHeight / 2 - screenHeight / 2;
          console.log('scrolling to', top, left);
          $('#waldocontainer').animate({
            scrollLeft: left,
            scrollTop: top
          }, 1500);
      });
    }, 1000)
  }
})

Template.beacons.helpers({
  beacons() {
    return Beacons.find({timestamp:{$gte: Chronos.currentTime().getTime()-2000}});
  }
});
