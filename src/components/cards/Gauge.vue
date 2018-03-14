<template>
  <div>
    <div style="display:table;justify-content:flex-start;width:100px;">
      <div class="set-size charts-container">
        <div class="pie-wrapper progress-outer style-2" data-percent="90" data-color="#01c1ad">
          <span class="label">
            8.5<small>h</small><br>
            <span class="smaller">-3.4% <!-- -|▲|▼ -->▼</span>
          </span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <div class="shadow"></div>
        </div>
        <div class="pie-wrapper pie-inside progress-inner style-1" data-percent="55" data-color="#bde1db">
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <div class="shadow"></div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
// $('.pie-wrapper').each(function() {
//   var percent = parseInt($(this).data('percent')),
//     deg = 360*percent/100
//    var color = $(this).data('color')
//   //styling
//   $(this).find('.pie .half-circle').css('border-color',color)
//   $(this).find('.pie .left-side').css('transform','rotate('+deg+'deg)')
//
//   //check slicer
//   if(percent > 50){
//     $(this).find('.pie .right-side').css('transform','rotate('+180+'deg)')
//     $(this).find('.pie').css('clip','rect(auto, auto, auto, auto)')
//   }else{
//     $(this).find('.pie right-side').css('display','none')
//   }
// })
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:700);

*,
*:before,
*:after {
  box-sizing: border-box;
}
// html,
// body {
//   background: white;
//   color: #444;
//   font-family: 'Lato', Tahoma, Geneva, sans-serif;
//   font-size: 16px;
//   padding: 0px;
// }

.set-size {
  font-size: 12em;
}

.charts-container {
  position: relative;
}

.pie-wrapper {
  height: 1em;
  width: 1em;
  float: left;
  margin: 15px;
  position: relative;
}

.pie-inside{
  position:absolute;
}

.pie-wrapper:nth-child(3n+1) {
  clear: both;
}

.pie-wrapper .pie {
  height: 100%;
  width: 100%;
  clip: rect(0, 1em, 1em, 0.5em);
  left: 0;
  position: absolute;
  top: 0;
}

.pie-wrapper .pie .half-circle {
  height: 100%;
  width: 100%;
  border: 0.1em solid #3498db;
  border-radius: 50%;
  clip: rect(0, 0.5em, 1em, 0);
  left: 0;
  position: absolute;
  top: 0;
}

.pie-wrapper .label {
  background: #34495e;
  border-radius: 50%;
  bottom: 0.4em;
  color: #ecf0f1;
  cursor: default;
  display: block;
  font-size: 0.25em;
  left: 0.4em;
  line-height: 0.67em;
  position: absolute;
  right: 0.4em;
  text-align: center;
  top: 1.33em;
}

.pie-wrapper .label .smaller {
  color: #bdc3c7;
  font-size: .45em;
  padding-bottom: 20px;
  vertical-align: super;
}

.pie-wrapper .shadow {
  height: 100%;
  width: 100%;
  border: 0.1em solid #f5f5f5;
  border-radius: 50%;
}

.pie-wrapper.style-1 {
  -webkit-transform: scale(0.81);
          transform: scale(0.81);
}

.pie-wrapper.style-1 .label {
  background: none;
  color: #7f8c8d;
}

.pie-wrapper.style-1 .label .smaller {
  color: #bdc3c7;
}

.pie-wrapper.style-2 .label {
  background: none;
  color: #7f8c8d;
}

.pie-wrapper.style-2 .label .smaller {
  color: #d87f7f;
}

</style>
