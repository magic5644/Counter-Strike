!function(){class t extends THREE.DataTextureLoader{constructor(t){super(t),this.type=THREE.HalfFloatType}parse(t){const e=function(t,e){switch(t){case 1:console.error("THREE.RGBELoader Read Error: "+(e||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(e||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(e||""));break;default:console.error("THREE.RGBELoader: Error: "+(e||""))}return-1},r=function(t,e,r){e=e||1024;let a=t.pos,n=-1,o=0,s="",i=String.fromCharCode.apply(null,new Uint16Array(t.subarray(a,a+128)));for(;0>(n=i.indexOf("\n"))&&o<e&&a<t.byteLength;)s+=i,o+=i.length,a+=128,i+=String.fromCharCode.apply(null,new Uint16Array(t.subarray(a,a+128)));return-1<n&&(!1!==r&&(t.pos+=o+n+1),s+i.slice(0,n))},a=function(t,e,r,a){const n=t[e+3],o=Math.pow(2,n-128)/255;r[a+0]=t[e+0]*o,r[a+1]=t[e+1]*o,r[a+2]=t[e+2]*o,r[a+3]=1},n=function(t,e,r,a){const n=t[e+3],o=Math.pow(2,n-128)/255;r[a+0]=THREE.DataUtils.toHalfFloat(Math.min(t[e+0]*o,65504)),r[a+1]=THREE.DataUtils.toHalfFloat(Math.min(t[e+1]*o,65504)),r[a+2]=THREE.DataUtils.toHalfFloat(Math.min(t[e+2]*o,65504)),r[a+3]=THREE.DataUtils.toHalfFloat(1)},o=new Uint8Array(t);o.pos=0;const s=function(t){const a=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,n=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*FORMAT=(\S+)\s*$/,s=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,i={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let l,c;if(t.pos>=t.byteLength||!(l=r(t)))return e(1,"no header found");if(!(c=l.match(/^#\?(\S+)/)))return e(3,"bad initial token");for(i.valid|=1,i.programtype=c[1],i.string+=l+"\n";l=r(t),!1!==l;)if(i.string+=l+"\n","#"!==l.charAt(0)){if((c=l.match(a))&&(i.gamma=parseFloat(c[1])),(c=l.match(n))&&(i.exposure=parseFloat(c[1])),(c=l.match(o))&&(i.valid|=2,i.format=c[1]),(c=l.match(s))&&(i.valid|=4,i.height=parseInt(c[1],10),i.width=parseInt(c[2],10)),2&i.valid&&4&i.valid)break}else i.comments+=l+"\n";return 2&i.valid?4&i.valid?i:e(3,"missing image size specifier"):e(3,"missing format specifier")}(o);if(-1!==s){const t=s.width,r=s.height,i=function(t,r,a){const n=r;if(n<8||n>32767||2!==t[0]||2!==t[1]||128&t[2])return new Uint8Array(t);if(n!==(t[2]<<8|t[3]))return e(3,"wrong scanline width");const o=new Uint8Array(4*r*a);if(!o.length)return e(4,"unable to allocate buffer space");let s=0,i=0;const l=4*n,c=new Uint8Array(4),E=new Uint8Array(l);let f=a;for(;f>0&&i<t.byteLength;){if(i+4>t.byteLength)return e(1);if(c[0]=t[i++],c[1]=t[i++],c[2]=t[i++],c[3]=t[i++],2!=c[0]||2!=c[1]||(c[2]<<8|c[3])!=n)return e(3,"bad rgbe scanline format");let r,a=0;for(;a<l&&i<t.byteLength;){r=t[i++];const n=r>128;if(n&&(r-=128),0===r||a+r>l)return e(3,"bad scanline data");if(n){const e=t[i++];for(let t=0;t<r;t++)E[a++]=e}else E.set(t.subarray(i,i+r),a),a+=r,i+=r}const p=n;for(let t=0;t<p;t++){let e=0;o[s]=E[t+e],e+=n,o[s+1]=E[t+e],e+=n,o[s+2]=E[t+e],e+=n,o[s+3]=E[t+e],s+=4}f--}return o}(o.subarray(o.pos),t,r);if(-1!==i){let e,o,l;switch(this.type){case THREE.FloatType:l=i.length/4;const t=new Float32Array(4*l);for(let e=0;e<l;e++)a(i,4*e,t,4*e);e=t,o=THREE.FloatType;break;case THREE.HalfFloatType:l=i.length/4;const r=new Uint16Array(4*l);for(let t=0;t<l;t++)n(i,4*t,r,4*t);e=r,o=THREE.HalfFloatType;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type)}return{width:t,height:r,data:e,header:s.string,gamma:s.gamma,exposure:s.exposure,type:o}}}return null}setDataType(t){return this.type=t,this}load(t,e,r,a){return super.load(t,(function(t,r){switch(t.type){case THREE.FloatType:case THREE.HalfFloatType:t.encoding=THREE.LinearEncoding,t.minFilter=THREE.LinearFilter,t.magFilter=THREE.LinearFilter,t.generateMipmaps=!1,t.flipY=!0}e&&e(t,r)}),r,a)}}THREE.RGBELoader=t}();