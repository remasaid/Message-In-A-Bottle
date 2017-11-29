import React,{Component} from 'react';
import {TweenMax, TimelineMax, Linear, Sine} from "gsap";

class bottle extends Component {

    

    render() {
        let id = this.props.id;
        console.log(id);
        setTimeout(function(){
            var container = document.querySelector('.container_' + id),waveTop = document.querySelector('.waveTop_'+id),waveMid = document.querySelector('.waveMid_'+id),waveBot = document.querySelector('.waveBot_' + id), bottle = document.querySelector('.bottle_'+id), bottleMask = document.querySelector('.bottleMask_' + id)
            
            
            
            
            TweenMax.set(container, {
              
            })
            
            var waveTl = new TimelineMax({repeat:-1});
            waveTl.timeScale(3)
            var waveTopTween = TweenMax.to([waveTop,bottleMask],6, {
              x:-600,
              repeat:-1,
              ease:Linear.easeNone
            })
            
            var waveMidTween = TweenMax.to(waveMid,6, {
              x:-600,
              repeat:-1,
              ease:Linear.easeNone
            })
            
            var waveBotTween = TweenMax.to(waveBot,6, {
              x:-600,
              repeat:-1,
              ease:Linear.easeNone
            })
            
            waveTl.add(waveTopTween, 0)
            waveTl.add(waveMidTween, 0)
            waveTl.add(waveBotTween,0)
            
            var bottleBob = TweenMax.to(bottle, 2, {
              y:30,
              repeat:-1,
              ease:Sine.easeInOut,
              yoyo:true
            })
            var bottleDrift = TweenMax.to(bottle, 9, {
              x:-130,
              repeat:-1,
              ease:Sine.easeInOut,
              yoyo:true
            })
            
            var bottleRotation = new TimelineMax({repeat:-1});
            bottleRotation.to(bottle, 12, {
              rotation:23,
              ease:Sine.easeInOut,
              transformOrigin:'50% 80%'
            })
            .to(bottle, 4, {
              rotation:33,
              ease:Sine.easeInOut,
              transformOrigin:'50% 80%'
            })
            
            .to(bottle, 8, {
              rotation:12,
              ease:Sine.easeInOut,
              transformOrigin:'50% 80%'
            })
            .to(bottle, 8, {
              rotation:-12,
              delay:2,
              ease:Sine.easeInOut,
              transformOrigin:'50% 80%'
            })
            
            .to(bottle, 6, {
              rotation:-6,
              ease:Sine.easeInOut,
              transformOrigin:'50% 80%'
            })
            
            
            .to(bottle, 6, {
              rotation:0,
              ease:Sine.easeInOut,
              transformOrigin:'50% 80%'
            })
            
            
            var mainTimeline = new TimelineMax();
            mainTimeline.timeScale(2)
            //mainTimeline.add(waveTl, 0)
            mainTimeline.add(bottleRotation, 0)
            mainTimeline.add(bottleBob, 0)
            mainTimeline.add(bottleDrift, 0)
        }, 1000);
        

        
        let color = "#859193"
        if(this.props.tone.toLowerCase() === "anger"){
            color = "#ff6868"
        }
        else if(this.props.tone.toLowerCase() === "joy"){
            color = "#fff682"
        }
        else if(this.props.tone.toLowerCase() === "sadness"){
            color = "#7dd0f4"
        }
        else if(this.props.tone.toLowerCase() === "disgust"){
            color = "#45c6a7"
        }
        else if(this.props.tone.toLowerCase() === "happy"){
          color = "#ffe2e2"
      }

        return (
<div class={"container_" + this.props.id }>
<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg"	 x="0px" y="0px" width="200" height="200" viewBox="0 0 600 600" >
<defs>
  <mask id={"bottleMask_" + this.props.id}>
<path class={"bottleMask_" + this.props.id}  fill="#FFFFFF" d="M0,0v254.5v1v39c72,0,107,10.7,144.1,22.1c38.3,11.7,77.9,23.9,155.9,23.9
	c78,0,117.6-12.1,155.9-23.9C493,305.2,528,294.5,600,294.5c72,0,107,10.7,144.1,22.1c38.3,11.7,77.9,23.9,155.9,23.9
	s117.6-12.1,155.9-23.9c37.1-11.4,72.1-22.1,144.1-22.1v-39v-1V0H0z"/>
  </mask>
</defs>

<path class={"waveBot_"+ this.props.id} fill="none" stroke={color} stroke-width="40" stroke-miterlimit="10" d="M0,519c150,0,150,46,300,46
	c150,0,150-46,300-46c150,0,150,46,300,46s150-46,300-46"/>
<path class={"waveMid_"+ this.props.id} fill="none" stroke={color} stroke-width="40" stroke-miterlimit="10" d="M0,437c150,0,150,46,300,46
	c150,0,150-46,300-46c150,0,150,46,300,46s150-46,300-46"/>
<path class={"waveTop_"+ this.props.id} fill="none" stroke={color} stroke-width="40" stroke-miterlimit="10" d="M0,355c150,0,150,46,300,46
	c150,0,150-46,300-46c150,0,150,46,300,46s150-46,300-46"/>
<g mask={"url(#bottleMask_"+ this.props.id + ")"}>
<g class={"bottle_" + this.props.id}>
	<path fill="none" d="M244,308v137.4c40-4.8,80-4.8,120,0V308C324,303.2,284,303.2,244,308z"/>
	<path fill={color} d="M318.2,38c0.9-9,1.9-17.2,2.8-25.6c-11.4-3.3-23-3.1-34.4,0.4c1.1,8.3,2.1,16.3,3.2,25.3H318.2z"/>
	<path fill={color} d="M382,529V360.5c0-65.5-20.7-106.1-20.7-106c-27.3-54.3-31.7-111.1-31.7-111.3c-0.9-24.6-1.9-49.1-2.8-73.7
		c0-4.8,3.2-6.1,3.2-6.1V46.8c-1-0.8-1.8-1.8-2.9-2.8h-45.9c-1.1,1-2.2,2-3.2,2.8v16.6c0,0,3.3,1.3,3.3,6.1
		c-0.9,24.6-1.8,49.1-2.6,73.7c0,0.2-4.4,57-31.7,111.3c0-0.1-20.9,40.4-20.9,106V529c0,0-0.1,15.8,13.5,17.6c0,0.4,18.3,1.5,64.7,1
		c46.4,0.5,64.5-0.6,64.5-1C382.3,544.8,382,529,382,529z M364,445.4c-40-4.8-80-4.8-120,0V308c40-4.8,80-4.8,120,0V445.4z"/>
</g>
  </g>

</svg>
  
</div>
        )
    }

}

export default bottle;