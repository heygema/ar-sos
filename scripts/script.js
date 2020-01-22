import {HEADLINES} from './fixtures';

const Scene = require('Scene');
const Time = require('Time');
const Materials = require('Materials');
const CameraInfo = require('CameraInfo');

let redFace = Scene.root.find('redFace');
let red_mat = Materials.get('red_mat');
let black_mat = Materials.get('black_mat');
let headlineText = Scene.root.find('headlineText');

/*
// NOTE: the other way is to hide and show interchangeably.
 let currentDisplay = true;
*/
/*
// NOTE: the other way is to hide and show interchangeably.
   redFace.material = redFace.material === red_mat ? black_mat : red_mat;
   currentDisplay = !currentDisplay;
   redFace.hidden = currentDisplay;
  */

let currentFacepaint = red_mat;
let wordsInterval = null;

function randomize(range) {
  return Math.floor(Math.random() * range);
}

Time.setInterval(() => {
  currentFacepaint = currentFacepaint === red_mat ? black_mat : red_mat;
  redFace.material = currentFacepaint;
}, 120);

CameraInfo.isRecordingVideo
  .monitor()
  .subscribeWithSnapshot(
    {isRecordingVideo: CameraInfo.isRecordingVideo},
    snapshot => {
      if (snapshot.newValue === true && snapshot.oldValue === false) {
        let wordsInterval = Time.setInterval(() => {
          headlineText.text =
            String(HEADLINES[randomize(HEADLINES.length)]).toUpperCase() ||
            'WORD OF MOUTH';
        }, 500);
      }
    }
  );
