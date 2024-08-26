import{EventDispatcher as e,MOUSE as t,Quaternion as n,Spherical as o,TOUCH as a,Vector2 as i,Vector3 as r,Plane as c,Ray as s,MathUtils as l}from"three";let _changeEvent={type:"change"},_startEvent={type:"start"},_endEvent={type:"end"},_ray=new s,_plane=new c,TILT_LIMIT=Math.cos(70*l.DEG2RAD);class OrbitControls extends e{constructor(e,c){super(),this.object=e,this.domElement=c,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new r,this.cursor=new r,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:t.ROTATE,MIDDLE:t.DOLLY,RIGHT:t.PAN},this.touches={ONE:a.ROTATE,TWO:a.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return p.phi},this.getAzimuthalAngle=function(){return p.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener("keydown",eb),this._domElementKeyEvents=e},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",eb),this._domElementKeyEvents=null},this.saveState=function(){s.target0.copy(s.target),s.position0.copy(s.object.position),s.zoom0=s.object.zoom},this.reset=function(){s.target.copy(s.target0),s.object.position.copy(s.position0),s.object.zoom=s.zoom0,s.object.updateProjectionMatrix(),s.dispatchEvent(_changeEvent),s.update(),m=l.NONE},this.update=function(){let t=new r,o=new n().setFromUnitVectors(e.up,new r(0,1,0)),a=o.clone().invert(),i=new r,c=new n,g=new r,E=2*Math.PI;return function n(f=null){let y=s.object.position;t.copy(y).sub(s.target),t.applyQuaternion(o),p.setFromVector3(t),s.autoRotate&&m===l.NONE&&R(x(f)),s.enableDamping?(p.theta+=d.theta*s.dampingFactor,p.phi+=d.phi*s.dampingFactor):(p.theta+=d.theta,p.phi+=d.phi);let $=s.minAzimuthAngle,_=s.maxAzimuthAngle;isFinite($)&&isFinite(_)&&($<-Math.PI?$+=E:$>Math.PI&&($-=E),_<-Math.PI?_+=E:_>Math.PI&&(_-=E),$<=_?p.theta=Math.max($,Math.min(_,p.theta)):p.theta=p.theta>($+_)/2?Math.max($,p.theta):Math.min(_,p.theta)),p.phi=Math.max(s.minPolarAngle,Math.min(s.maxPolarAngle,p.phi)),p.makeSafe(),!0===s.enableDamping?s.target.addScaledVector(b,s.dampingFactor):s.target.add(b),s.target.sub(s.cursor),s.target.clampLength(s.minTargetRadius,s.maxTargetRadius),s.target.add(s.cursor);let T=!1;if(s.zoomToCursor&&w||s.object.isOrthographicCamera)p.radius=H(p.radius);else{let v=p.radius;p.radius=H(p.radius*h),T=v!=p.radius}if(t.setFromSpherical(p),t.applyQuaternion(a),y.copy(s.target).add(t),s.object.lookAt(s.target),!0===s.enableDamping?(d.theta*=1-s.dampingFactor,d.phi*=1-s.dampingFactor,b.multiplyScalar(1-s.dampingFactor)):(d.set(0,0,0),b.set(0,0,0)),s.zoomToCursor&&w){let O=null;if(s.object.isPerspectiveCamera){let L=t.length();O=H(L*h);let A=L-O;s.object.position.addScaledVector(j,A),s.object.updateMatrixWorld(),T=!!A}else if(s.object.isOrthographicCamera){let N=new r(P.x,P.y,0);N.unproject(s.object);let k=s.object.zoom;s.object.zoom=Math.max(s.minZoom,Math.min(s.maxZoom,s.object.zoom/h)),s.object.updateProjectionMatrix(),T=k!==s.object.zoom;let Y=new r(P.x,P.y,0);Y.unproject(s.object),s.object.position.sub(Y).add(N),s.object.updateMatrixWorld(),O=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),s.zoomToCursor=!1;null!==O&&(this.screenSpacePanning?s.target.set(0,0,-1).transformDirection(s.object.matrix).multiplyScalar(O).add(s.object.position):(_ray.origin.copy(s.object.position),_ray.direction.set(0,0,-1).transformDirection(s.object.matrix),Math.abs(s.object.up.dot(_ray.direction))<TILT_LIMIT?e.lookAt(s.target):(_plane.setFromNormalAndCoplanarPoint(s.object.up,s.target),_ray.intersectPlane(_plane,s.target))))}else if(s.object.isOrthographicCamera){let I=s.object.zoom;s.object.zoom=Math.max(s.minZoom,Math.min(s.maxZoom,s.object.zoom/h)),I!==s.object.zoom&&(s.object.updateProjectionMatrix(),T=!0)}return h=1,w=!1,!!(T||i.distanceToSquared(s.object.position)>u||8*(1-c.dot(s.object.quaternion))>u||g.distanceToSquared(s.target)>u)&&(s.dispatchEvent(_changeEvent),i.copy(s.object.position),c.copy(s.object.quaternion),g.copy(s.target),!0)}}(),this.dispose=function(){s.domElement.removeEventListener("contextmenu",ef),s.domElement.removeEventListener("pointerdown",er),s.domElement.removeEventListener("pointercancel",es),s.domElement.removeEventListener("wheel",eu),s.domElement.removeEventListener("pointermove",ec),s.domElement.removeEventListener("pointerup",es);let e=s.domElement.getRootNode();e.removeEventListener("keydown",ed,{capture:!0}),null!==s._domElementKeyEvents&&(s._domElementKeyEvents.removeEventListener("keydown",eb),s._domElementKeyEvents=null)};let s=this,l={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},m=l.NONE,u=1e-6,p=new o,d=new o,h=1,b=new r,g=new i,E=new i,f=new i,y=new i,$=new i,_=new i,T=new i,v=new i,O=new i,j=new r,P=new i,w=!1,L=[],A={},N=!1;function x(e){return null!==e?2*Math.PI/60*s.autoRotateSpeed*e:2*Math.PI/60/60*s.autoRotateSpeed}function k(e){return Math.pow(.95,s.zoomSpeed*Math.abs(.01*e))}function R(e){d.theta-=e}function Y(e){d.phi-=e}let I=function(){let e=new r;return function t(n,o){e.setFromMatrixColumn(o,0),e.multiplyScalar(-n),b.add(e)}}(),C=function(){let e=new r;return function t(n,o){!0===s.screenSpacePanning?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(s.object.up,e)),e.multiplyScalar(n),b.add(e)}}(),S=function(){let e=new r;return function t(n,o){let a=s.domElement;if(s.object.isPerspectiveCamera){let i=s.object.position;e.copy(i).sub(s.target);let r=e.length();I(2*n*(r*=Math.tan(s.object.fov/2*Math.PI/180))/a.clientHeight,s.object.matrix),C(2*o*r/a.clientHeight,s.object.matrix)}else s.object.isOrthographicCamera?(I(n*(s.object.right-s.object.left)/s.object.zoom/a.clientWidth,s.object.matrix),C(o*(s.object.top-s.object.bottom)/s.object.zoom/a.clientHeight,s.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),s.enablePan=!1)}}();function D(e){s.object.isPerspectiveCamera||s.object.isOrthographicCamera?h/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),s.enableZoom=!1)}function z(e){s.object.isPerspectiveCamera||s.object.isOrthographicCamera?h*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),s.enableZoom=!1)}function K(e,t){if(!s.zoomToCursor)return;w=!0;let n=s.domElement.getBoundingClientRect(),o=e-n.left,a=t-n.top,i=n.width,r=n.height;P.x=o/i*2-1,P.y=-(2*(a/r))+1,j.set(P.x,P.y,1).unproject(s.object).sub(s.object.position).normalize()}function H(e){return Math.max(s.minDistance,Math.min(s.maxDistance,e))}function X(e){g.set(e.clientX,e.clientY)}function Z(e){K(e.clientX,e.clientX),T.set(e.clientX,e.clientY)}function F(e){y.set(e.clientX,e.clientY)}function U(e){E.set(e.clientX,e.clientY),f.subVectors(E,g).multiplyScalar(s.rotateSpeed);let t=s.domElement;R(2*Math.PI*f.x/t.clientHeight),Y(2*Math.PI*f.y/t.clientHeight),g.copy(E),s.update()}function M(e){v.set(e.clientX,e.clientY),O.subVectors(v,T),O.y>0?D(k(O.y)):O.y<0&&z(k(O.y)),T.copy(v),s.update()}function V(e){$.set(e.clientX,e.clientY),_.subVectors($,y).multiplyScalar(s.panSpeed),S(_.x,_.y),y.copy($),s.update()}function G(e){K(e.clientX,e.clientY),e.deltaY<0?z(k(e.deltaY)):e.deltaY>0&&D(k(e.deltaY)),s.update()}function W(e){let t=!1;switch(e.code){case s.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?Y(2*Math.PI*s.rotateSpeed/s.domElement.clientHeight):S(0,s.keyPanSpeed),t=!0;break;case s.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?Y(-2*Math.PI*s.rotateSpeed/s.domElement.clientHeight):S(0,-s.keyPanSpeed),t=!0;break;case s.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?R(2*Math.PI*s.rotateSpeed/s.domElement.clientHeight):S(s.keyPanSpeed,0),t=!0;break;case s.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?R(-2*Math.PI*s.rotateSpeed/s.domElement.clientHeight):S(-s.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),s.update())}function B(e){if(1===L.length)g.set(e.pageX,e.pageY);else{let t=ev(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);g.set(n,o)}}function q(e){if(1===L.length)y.set(e.pageX,e.pageY);else{let t=ev(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);y.set(n,o)}}function Q(e){let t=ev(e),n=e.pageX-t.x,o=e.pageY-t.y;T.set(0,Math.sqrt(n*n+o*o))}function J(e){s.enableZoom&&Q(e),s.enablePan&&q(e)}function ee(e){s.enableZoom&&Q(e),s.enableRotate&&B(e)}function et(e){if(1==L.length)E.set(e.pageX,e.pageY);else{let t=ev(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);E.set(n,o)}f.subVectors(E,g).multiplyScalar(s.rotateSpeed);let a=s.domElement;R(2*Math.PI*f.x/a.clientHeight),Y(2*Math.PI*f.y/a.clientHeight),g.copy(E)}function en(e){if(1===L.length)$.set(e.pageX,e.pageY);else{let t=ev(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);$.set(n,o)}_.subVectors($,y).multiplyScalar(s.panSpeed),S(_.x,_.y),y.copy($)}function eo(e){let t=ev(e),n=e.pageX-t.x,o=e.pageY-t.y;v.set(0,Math.sqrt(n*n+o*o)),O.set(0,Math.pow(v.y/T.y,s.zoomSpeed)),D(O.y),T.copy(v);let a=(e.pageX+t.x)*.5,i=(e.pageY+t.y)*.5;K(a,i)}function ea(e){s.enableZoom&&eo(e),s.enablePan&&en(e)}function ei(e){s.enableZoom&&eo(e),s.enableRotate&&et(e)}function er(e){!1!==s.enabled&&(0===L.length&&(s.domElement.setPointerCapture(e.pointerId),s.domElement.addEventListener("pointermove",ec),s.domElement.addEventListener("pointerup",es)),e_(e)||(ey(e),"touch"===e.pointerType?eg(e):el(e)))}function ec(e){!1!==s.enabled&&("touch"===e.pointerType?eE(e):em(e))}function es(e){switch(e$(e),L.length){case 0:s.domElement.releasePointerCapture(e.pointerId),s.domElement.removeEventListener("pointermove",ec),s.domElement.removeEventListener("pointerup",es),s.dispatchEvent(_endEvent),m=l.NONE;break;case 1:let t=L[0],n=A[t];eg({pointerId:t,pageX:n.x,pageY:n.y})}}function el(e){let n;switch(e.button){case 0:n=s.mouseButtons.LEFT;break;case 1:n=s.mouseButtons.MIDDLE;break;case 2:n=s.mouseButtons.RIGHT;break;default:n=-1}switch(n){case t.DOLLY:if(!1===s.enableZoom)return;Z(e),m=l.DOLLY;break;case t.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===s.enablePan)return;F(e),m=l.PAN}else{if(!1===s.enableRotate)return;X(e),m=l.ROTATE}break;case t.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===s.enableRotate)return;X(e),m=l.ROTATE}else{if(!1===s.enablePan)return;F(e),m=l.PAN}break;default:m=l.NONE}m!==l.NONE&&s.dispatchEvent(_startEvent)}function em(e){switch(m){case l.ROTATE:if(!1===s.enableRotate)return;U(e);break;case l.DOLLY:if(!1===s.enableZoom)return;M(e);break;case l.PAN:if(!1===s.enablePan)return;V(e)}}function eu(e){!1!==s.enabled&&!1!==s.enableZoom&&m===l.NONE&&(e.preventDefault(),s.dispatchEvent(_startEvent),G(ep(e)),s.dispatchEvent(_endEvent))}function ep(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!N&&(n.deltaY*=10),n}function ed(e){if("Control"===e.key){N=!0;let t=s.domElement.getRootNode();t.addEventListener("keyup",eh,{passive:!0,capture:!0})}}function eh(e){if("Control"===e.key){N=!1;let t=s.domElement.getRootNode();t.removeEventListener("keyup",eh,{passive:!0,capture:!0})}}function eb(e){!1!==s.enabled&&!1!==s.enablePan&&W(e)}function eg(e){switch(eT(e),L.length){case 1:switch(s.touches.ONE){case a.ROTATE:if(!1===s.enableRotate)return;B(e),m=l.TOUCH_ROTATE;break;case a.PAN:if(!1===s.enablePan)return;q(e),m=l.TOUCH_PAN;break;default:m=l.NONE}break;case 2:switch(s.touches.TWO){case a.DOLLY_PAN:if(!1===s.enableZoom&&!1===s.enablePan)return;J(e),m=l.TOUCH_DOLLY_PAN;break;case a.DOLLY_ROTATE:if(!1===s.enableZoom&&!1===s.enableRotate)return;ee(e),m=l.TOUCH_DOLLY_ROTATE;break;default:m=l.NONE}break;default:m=l.NONE}m!==l.NONE&&s.dispatchEvent(_startEvent)}function eE(e){switch(eT(e),m){case l.TOUCH_ROTATE:if(!1===s.enableRotate)return;et(e),s.update();break;case l.TOUCH_PAN:if(!1===s.enablePan)return;en(e),s.update();break;case l.TOUCH_DOLLY_PAN:if(!1===s.enableZoom&&!1===s.enablePan)return;ea(e),s.update();break;case l.TOUCH_DOLLY_ROTATE:if(!1===s.enableZoom&&!1===s.enableRotate)return;ei(e),s.update();break;default:m=l.NONE}}function ef(e){!1!==s.enabled&&e.preventDefault()}function ey(e){L.push(e.pointerId)}function e$(e){delete A[e.pointerId];for(let t=0;t<L.length;t++)if(L[t]==e.pointerId){L.splice(t,1);return}}function e_(e){for(let t=0;t<L.length;t++)if(L[t]==e.pointerId)return!0;return!1}function eT(e){let t=A[e.pointerId];void 0===t&&(t=new i,A[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ev(e){let t=e.pointerId===L[0]?L[1]:L[0];return A[t]}s.domElement.addEventListener("contextmenu",ef),s.domElement.addEventListener("pointerdown",er),s.domElement.addEventListener("pointercancel",es),s.domElement.addEventListener("wheel",eu,{passive:!1});let eO=s.domElement.getRootNode();eO.addEventListener("keydown",ed,{passive:!0,capture:!0}),this.update()}}export{OrbitControls};