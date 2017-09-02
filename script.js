/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function adjust_volume() {
    var volume_slider = document.getElementsByClassName('ytp-volume-panel')[0];
    var valuetext = volume_slider.getAttribute('aria-valuetext');

    var muted = valuetext.indexOf('muted') != -1;
    var current_percentage = parseInt(valuetext.substr(0, 3)) / 100;

    var video = document.getElementsByTagName('video')[0];

    var rect = video.getBoundingClientRect();
    
    var new_volume = current_percentage * (muted ? 0 : 1);

    if (rect.bottom < 0) {
        var base = screen.height * 4;
        new_volume *= (base + rect.bottom) / base;

        if (new_volume < 0.02) {
            new_volume = 0.02;
        }

        video.volume = new_volume;
    }

    video.volume = new_volume;
}

window.onscroll = adjust_volume;

var volume_slider = document.getElementsByClassName('ytp-volume-panel')[0];

var observer = new MutationObserver(function(mutations) {
  adjust_volume();
});


observer.observe(volume_slider, { 
  attributes: true, 
  attributeFilter: ['aria-valuenow', 'aria-valuetext'] });

volume_slider.dataset.selectContentVal = 1;