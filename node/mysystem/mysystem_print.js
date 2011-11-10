/*
 * Raphael 1.2.2 - JavaScript Vector Library
 *
 * Copyright (c) 2008 - 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
window.Raphael=(function(){var a=/[, ]+/,D=document,aj=window,k={was:"Raphael" in aj,is:aj.Raphael},af=function(){if(af.is(arguments[0],"array")){var e=arguments[0],E=s[aI](af,e.splice(0,3+af.is(e[0],ad))),aM=E.set();for(var S=0,aN=e[l];S<aN;S++){var R=e[S]||{};({circle:1,rect:1,path:1,ellipse:1,text:1,image:1})[J](R.type)&&aM[d](E[R.type]().attr(R));}return aM;}return s[aI](af,arguments);},az="appendChild",aI="apply",aF="concat",ai="",y=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup"],J="hasOwnProperty",ab=/^\[object\s+|\]$/gi,an="join",l="length",aK="prototype",aL=String[aK].toLowerCase,f=Math.max,aw=Math.min,ad="number",ao="toString",al=Object[aK][ao],aD={},aA=Math.pow,d="push",aG=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+)['"]?\)$/i,H=Math.round,ae=" ",r="setAttribute",u="split",N=parseFloat,z=parseInt,aB=String[aK].toUpperCase,h={"clip-rect":"0 0 10e9 10e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},Q={"clip-rect":"csv",cx:ad,cy:ad,fill:"colour","fill-opacity":ad,"font-size":ad,height:ad,opacity:ad,path:"path",r:ad,rotation:"csv",rx:ad,ry:ad,scale:"csv",stroke:"colour","stroke-opacity":ad,"stroke-width":ad,translation:"csv",width:ad,x:ad,y:ad},aC="replace";af.version="1.2.2";af.type=(aj.SVGAngle||D.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");af.svg=!(af.vml=af.type=="VML");af._id=0;af._oid=0;af.fn={};af.is=function(i,e){e=aL.call(e);return((e=="object"||e=="undefined")&&typeof i==e)||(i==null&&e=="null")||aL.call(al.call(i)[aC](ab,ai))==e;};af.setWindow=function(e){aj=e;D=aj.document;};var aq=function(E){if(af.vml){var e=/^\s+|\s+$/g;aq=aa(function(aM){var aN;aM=(aM+ai).replace(e,ai);try{var i=new ActiveXObject("htmlfile");i.write("<body>");i.close();aN=i.body;}catch(aP){aN=createPopup().document.body;}var S=aN.createTextRange();try{aN.style.color=aM;var aO=S.queryCommandValue("ForeColor");aO=((aO&255)<<16)|(aO&65280)|((aO&16711680)>>>16);return"#"+("000000"+aO[ao](16)).slice(-6);}catch(aP){return"none";}});}else{var R=D.createElement("i");R.className="Rapha\xebl Colour Picker";R.style.cssText="display:none";D.body[az](R);aq=aa(function(i){R.style.color=i;return D.defaultView.getComputedStyle(R,ai).getPropertyValue("color");});}return aq(E);};af.hsb2rgb=aa(function(aQ,aO,aU){if(af.is(aQ,"object")&&"h" in aQ&&"s" in aQ&&"b" in aQ){aU=aQ.b;aO=aQ.s;aQ=aQ.h;}var S,aM,aV;if(aU==0){return{r:0,g:0,b:0,hex:"#000"};}if(aQ>1||aO>1||aU>1){aQ/=255;aO/=255;aU/=255;}var aN=~~(aQ*6),aR=(aQ*6)-aN,R=aU*(1-aO),E=aU*(1-(aO*aR)),aW=aU*(1-(aO*(1-aR)));S=[aU,E,R,R,aW,aU,aU][aN];aM=[aW,aU,aU,E,R,R,aW][aN];aV=[R,R,aW,aU,aU,E,R][aN];S*=255;aM*=255;aV*=255;var aS={r:S,g:aM,b:aV},e=(~~S)[ao](16),aP=(~~aM)[ao](16),aT=(~~aV)[ao](16);e=e[aC](aG,"0");aP=aP[aC](aG,"0");aT=aT[aC](aG,"0");aS.hex="#"+e+aP+aT;return aS;},af);af.rgb2hsb=aa(function(e,i,aO){if(af.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){aO=e.b;i=e.g;e=e.r;}if(af.is(e,"string")){var aQ=af.getRGB(e);e=aQ.r;i=aQ.g;aO=aQ.b;}if(e>1||i>1||aO>1){e/=255;i/=255;aO/=255;}var aN=f(e,i,aO),E=aw(e,i,aO),S,R,aM=aN;if(E==aN){return{h:0,s:0,b:aN};}else{var aP=(aN-E);R=aP/aN;if(e==aN){S=(i-aO)/aP;}else{if(i==aN){S=2+((aO-e)/aP);}else{S=4+((e-i)/aP);}}S/=6;S<0&&S++;S>1&&S--;}return{h:S,s:R,b:aM};},af);var ar=/,?([achlmqrstvxz]),?/gi;af._path2string=function(){return this.join(",")[aC](ar,"$1");};function aa(R,i,e){function E(){var S=Array[aK].slice.call(arguments,0),aN=S[an]("\u25ba"),aM=E.cache=E.cache||{},aO=E.count=E.count||[];if(aM[J](aN)){return e?e(aM[aN]):aM[aN];}aO[l]>=1000&&delete aM[aO.shift()];aO[d](aN);aM[aN]=R[aI](i,S);return e?e(aM[aN]):aM[aN];}return E;}af.getRGB=aa(function(e){if(!e||!!((e+ai).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1};}e=e+ai;if(e=="none"){return{r:-1,g:-1,b:-1,hex:"none"};}!({hs:1,rg:1})[J](e.substring(0,2))&&(e=aq(e));var aM,E,R,aP,aN=e.match(/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i);if(aN){if(aN[2]){aP=z(aN[2].substring(5),16);R=z(aN[2].substring(3,5),16);E=z(aN[2].substring(1,3),16);}if(aN[3]){aP=z(aN[3].substring(3)+aN[3].substring(3),16);R=z(aN[3].substring(2,3)+aN[3].substring(2,3),16);E=z(aN[3].substring(1,2)+aN[3].substring(1,2),16);}if(aN[4]){aN=aN[4][u](/\s*,\s*/);E=N(aN[0]);R=N(aN[1]);aP=N(aN[2]);}if(aN[5]){aN=aN[5][u](/\s*,\s*/);E=N(aN[0])*2.55;R=N(aN[1])*2.55;aP=N(aN[2])*2.55;}if(aN[6]){aN=aN[6][u](/\s*,\s*/);E=N(aN[0]);R=N(aN[1]);aP=N(aN[2]);return af.hsb2rgb(E,R,aP);}if(aN[7]){aN=aN[7][u](/\s*,\s*/);E=N(aN[0])*2.55;R=N(aN[1])*2.55;aP=N(aN[2])*2.55;return af.hsb2rgb(E,R,aP);}aN={r:E,g:R,b:aP};var i=(~~E)[ao](16),S=(~~R)[ao](16),aO=(~~aP)[ao](16);i=i[aC](aG,"0");S=S[aC](aG,"0");aO=aO[aC](aG,"0");aN.hex="#"+i+S+aO;return aN;}return{r:-1,g:-1,b:-1,hex:"none",error:1};},af);af.getColor=function(i){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:i||0.75},e=this.hsb2rgb(E.h,E.s,E.b);E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b});}return e.hex;};af.getColor.reset=function(){delete this.start;};af.parsePathString=aa(function(e){if(!e){return null;}var E={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},i=[];if(af.is(e,"array")&&af.is(e[0],"array")){i=ak(e);}if(!i[l]){(e+ai)[aC](/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,function(S,R,aO){var aN=[],aM=aL.call(R);aO[aC](/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,function(aQ,aP){aP&&aN[d](+aP);});while(aN[l]>=E[aM]){i[d]([R][aF](aN.splice(0,E[aM])));if(!E[aM]){break;}}});}i[ao]=af._path2string;return i;});var L=aa(function(aR){if(!aR){return{x:0,y:0,width:0,height:0};}aR=A(aR);var aO=0,aN=0,R=[],E=[];for(var S=0,aQ=aR[l];S<aQ;S++){if(aR[S][0]=="M"){aO=aR[S][1];aN=aR[S][2];R[d](aO);E[d](aN);}else{var aM=ap(aO,aN,aR[S][1],aR[S][2],aR[S][3],aR[S][4],aR[S][5],aR[S][6]);R=R[aF](aM.min.x,aM.max.x);E=E[aF](aM.min.y,aM.max.y);}}var e=aw[aI](0,R),aP=aw[aI](0,E);return{x:e,y:aP,width:f[aI](0,R)-e,height:f[aI](0,E)-aP};}),ak=function(aN){var R=[];if(!af.is(aN,"array")||!af.is(aN&&aN[0],"array")){aN=af.parsePathString(aN);}for(var E=0,S=aN[l];E<S;E++){R[E]=[];for(var e=0,aM=aN[E][l];e<aM;e++){R[E][e]=aN[E][e];}}R[ao]=af._path2string;return R;},V=aa(function(S){if(!af.is(S,"array")||!af.is(S&&S[0],"array")){S=af.parsePathString(S);}var aR=[],aT=0,aS=0,aW=0,aV=0,R=0;if(S[0][0]=="M"){aT=S[0][1];aS=S[0][2];aW=aT;aV=aS;R++;aR[d](["M",aT,aS]);}for(var aO=R,aX=S[l];aO<aX;aO++){var e=aR[aO]=[],aU=S[aO];if(aU[0]!=aL.call(aU[0])){e[0]=aL.call(aU[0]);switch(e[0]){case"a":e[1]=aU[1];e[2]=aU[2];e[3]=aU[3];e[4]=aU[4];e[5]=aU[5];e[6]=+(aU[6]-aT).toFixed(3);e[7]=+(aU[7]-aS).toFixed(3);break;case"v":e[1]=+(aU[1]-aS).toFixed(3);break;case"m":aW=aU[1];aV=aU[2];default:for(var aN=1,aP=aU[l];aN<aP;aN++){e[aN]=+(aU[aN]-((aN%2)?aT:aS)).toFixed(3);}}}else{e=aR[aO]=[];if(aU[0]=="m"){aW=aU[1]+aT;aV=aU[2]+aS;}for(var aM=0,E=aU[l];aM<E;aM++){aR[aO][aM]=aU[aM];}}var aQ=aR[aO][l];switch(aR[aO][0]){case"z":aT=aW;aS=aV;break;case"h":aT+=+aR[aO][aQ-1];break;case"v":aS+=+aR[aO][aQ-1];break;default:aT+=+aR[aO][aQ-2];aS+=+aR[aO][aQ-1];}}aR[ao]=af._path2string;return aR;},0,ak),p=aa(function(S){if(!af.is(S,"array")||!af.is(S&&S[0],"array")){S=af.parsePathString(S);}var aQ=[],aS=0,aR=0,aV=0,aU=0,R=0;if(S[0][0]=="M"){aS=+S[0][1];aR=+S[0][2];aV=aS;aU=aR;R++;aQ[0]=["M",aS,aR];}for(var aO=R,aW=S[l];aO<aW;aO++){var e=aQ[aO]=[],aT=S[aO];if(aT[0]!=aB.call(aT[0])){e[0]=aB.call(aT[0]);switch(e[0]){case"A":e[1]=aT[1];e[2]=aT[2];e[3]=aT[3];e[4]=aT[4];e[5]=aT[5];e[6]=+(aT[6]+aS);e[7]=+(aT[7]+aR);break;case"V":e[1]=+aT[1]+aR;break;case"H":e[1]=+aT[1]+aS;break;case"M":aV=+aT[1]+aS;aU=+aT[2]+aR;default:for(var aN=1,aP=aT[l];aN<aP;aN++){e[aN]=+aT[aN]+((aN%2)?aS:aR);}}}else{for(var aM=0,E=aT[l];aM<E;aM++){aQ[aO][aM]=aT[aM];}}switch(e[0]){case"Z":aS=aV;aR=aU;break;case"H":aS=e[1];break;case"V":aR=e[1];break;default:aS=aQ[aO][aQ[aO][l]-2];aR=aQ[aO][aQ[aO][l]-1];}}aQ[ao]=af._path2string;return aQ;},null,ak),aJ=function(i,R,e,E){return[i,R,e,E,e,E];},ay=function(i,R,aN,S,e,E){var aM=1/3,aO=2/3;return[aM*i+aO*aN,aM*R+aO*S,aM*e+aO*aN,aM*E+aO*S,e,E];},C=function(aW,bq,a5,a3,aX,aR,aM,aV,bp,aY){var S=Math.PI,a2=S*120/180,e=S/180*(+aX||0),a9=[],a6,bm=aa(function(br,bu,i){var bt=br*Math.cos(i)-bu*Math.sin(i),bs=br*Math.sin(i)+bu*Math.cos(i);return{x:bt,y:bs};});if(!aY){a6=bm(aW,bq,-e);aW=a6.x;bq=a6.y;a6=bm(aV,bp,-e);aV=a6.x;bp=a6.y;var E=Math.cos(S/180*aX),aT=Math.sin(S/180*aX),bb=(aW-aV)/2,ba=(bq-bp)/2;a5=f(a5,Math.abs(bb));a3=f(a3,Math.abs(ba));var R=a5*a5,be=a3*a3,bg=(aR==aM?-1:1)*Math.sqrt(Math.abs((R*be-R*ba*ba-be*bb*bb)/(R*ba*ba+be*bb*bb))),a0=bg*a5*ba/a3+(aW+aV)/2,aZ=bg*-a3*bb/a5+(bq+bp)/2,aQ=Math.asin((bq-aZ)/a3),aP=Math.asin((bp-aZ)/a3);aQ=aW<a0?S-aQ:aQ;aP=aV<a0?S-aP:aP;aQ<0&&(aQ=S*2+aQ);aP<0&&(aP=S*2+aP);if(aM&&aQ>aP){aQ=aQ-S*2;}if(!aM&&aP>aQ){aP=aP-S*2;}}else{aQ=aY[0];aP=aY[1];a0=aY[2];aZ=aY[3];}var aU=aP-aQ;if(Math.abs(aU)>a2){var a1=aP,a4=aV,aS=bp;aP=aQ+a2*(aM&&aP>aQ?1:-1);aV=a0+a5*Math.cos(aP);bp=aZ+a3*Math.sin(aP);a9=C(aV,bp,a5,a3,aX,0,aM,a4,aS,[aP,a1,a0,aZ]);}aU=aP-aQ;var aO=Math.cos(aQ),bo=Math.sin(aQ),aN=Math.cos(aP),bn=Math.sin(aP),bc=Math.tan(aU/4),bf=4/3*a5*bc,bd=4/3*a3*bc,bl=[aW,bq],bk=[aW+bf*bo,bq-bd*aO],bj=[aV+bf*bn,bp-bd*aN],bh=[aV,bp];bk[0]=2*bl[0]-bk[0];bk[1]=2*bl[1]-bk[1];if(aY){return[bk,bj,bh][aF](a9);}else{a9=[bk,bj,bh][aF](a9)[an](",")[u](",");var a7=[];for(var bi=0,a8=a9[l];bi<a8;bi++){a7[bi]=bi%2?bm(a9[bi-1],a9[bi],e).y:bm(a9[bi],a9[bi+1],e).x;}return a7;}},F=aa(function(i,e,aZ,aX,aM,S,aO,aN,aT){var aR=aA(1-aT,3)*i+aA(1-aT,2)*3*aT*aZ+(1-aT)*3*aT*aT*aM+aA(aT,3)*aO,aP=aA(1-aT,3)*e+aA(1-aT,2)*3*aT*aX+(1-aT)*3*aT*aT*S+aA(aT,3)*aN,aV=i+2*aT*(aZ-i)+aT*aT*(aM-2*aZ+i),aU=e+2*aT*(aX-e)+aT*aT*(S-2*aX+e),aY=aZ+2*aT*(aM-aZ)+aT*aT*(aO-2*aM+aZ),aW=aX+2*aT*(S-aX)+aT*aT*(aN-2*S+aX),aS=(1-aT)*i+aT*aZ,aQ=(1-aT)*e+aT*aX,R=(1-aT)*aM+aT*aO,E=(1-aT)*S+aT*aN;return{x:aR,y:aP,m:{x:aV,y:aU},n:{x:aY,y:aW},start:{x:aS,y:aQ},end:{x:R,y:E}};}),ap=aa(function(i,e,R,E,aX,aW,aT,aQ){var aV=(aX-2*R+i)-(aT-2*aX+R),aS=2*(R-i)-2*(aX-R),aP=i-R,aN=(-aS+Math.sqrt(aS*aS-4*aV*aP))/2/aV,S=(-aS-Math.sqrt(aS*aS-4*aV*aP))/2/aV,aR=[e,aQ],aU=[i,aT],aO=F(i,e,R,E,aX,aW,aT,aQ,aN>0&&aN<1?aN:0),aM=F(i,e,R,E,aX,aW,aT,aQ,S>0&&S<1?S:0);aU=aU[aF](aO.x,aM.x);aR=aR[aF](aO.y,aM.y);aV=(aW-2*E+e)-(aQ-2*aW+E);aS=2*(E-e)-2*(aW-E);aP=e-E;aN=(-aS+Math.sqrt(aS*aS-4*aV*aP))/2/aV;S=(-aS-Math.sqrt(aS*aS-4*aV*aP))/2/aV;aO=F(i,e,R,E,aX,aW,aT,aQ,aN>0&&aN<1?aN:0);aM=F(i,e,R,E,aX,aW,aT,aQ,S>0&&S<1?S:0);aU=aU[aF](aO.x,aM.x);aR=aR[aF](aO.y,aM.y);return{min:{x:aw[aI](0,aU),y:aw[aI](0,aR)},max:{x:f[aI](0,aU),y:f[aI](0,aR)}};}),A=aa(function(aW,aR){var S=p(aW),aS=aR&&p(aR),aT={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},aN=function(aX,aY){var i,aZ;if(!aX){return["C",aY.x,aY.y,aY.x,aY.y,aY.x,aY.y];}!(aX[0] in {T:1,Q:1})&&(aY.qx=aY.qy=null);switch(aX[0]){case"M":aY.X=aX[1];aY.Y=aX[2];break;case"A":aX=["C"][aF](C[aI](0,[aY.x,aY.y][aF](aX.slice(1))));break;case"S":i=aY.x+(aY.x-(aY.bx||aY.x));aZ=aY.y+(aY.y-(aY.by||aY.y));aX=["C",i,aZ][aF](aX.slice(1));break;case"T":aY.qx=aY.x+(aY.x-(aY.qx||aY.x));aY.qy=aY.y+(aY.y-(aY.qy||aY.y));aX=["C"][aF](ay(aY.x,aY.y,aY.qx,aY.qy,aX[1],aX[2]));break;case"Q":aY.qx=aX[1];aY.qy=aX[2];aX=["C"][aF](ay(aY.x,aY.y,aX[1],aX[2],aX[3],aX[4]));break;case"L":aX=["C"][aF](aJ(aY.x,aY.y,aX[1],aX[2]));break;case"H":aX=["C"][aF](aJ(aY.x,aY.y,aX[1],aY.y));break;case"V":aX=["C"][aF](aJ(aY.x,aY.y,aY.x,aX[1]));break;case"Z":aX=["C"][aF](aJ(aY.x,aY.y,aY.X,aY.Y));break;}return aX;},E=function(aX,aY){if(aX[aY][l]>7){aX[aY].shift();var aZ=aX[aY];while(aZ[l]){aX.splice(aY++,0,["C"][aF](aZ.splice(0,6)));}aX.splice(aY,1);aU=f(S[l],aS&&aS[l]||0);}},R=function(a3,a0,aY,aX,aZ){if(a3&&a0&&a3[aZ][0]=="M"&&a0[aZ][0]!="M"){a0.splice(aZ,0,["M",aX.x,aX.y]);aY.bx=0;aY.by=0;aY.x=a3[aZ][1];aY.y=a3[aZ][2];aU=f(S[l],aS&&aS[l]||0);}};for(var aP=0,aU=f(S[l],aS&&aS[l]||0);aP<aU;aP++){S[aP]=aN(S[aP],aT);E(S,aP);aS&&(aS[aP]=aN(aS[aP],e));aS&&E(aS,aP);R(S,aS,aT,e,aP);R(aS,S,e,aT,aP);var aO=S[aP],aV=aS&&aS[aP],aM=aO[l],aQ=aS&&aV[l];aT.x=aO[aM-2];aT.y=aO[aM-1];aT.bx=N(aO[aM-4])||aT.x;aT.by=N(aO[aM-3])||aT.y;e.bx=aS&&(N(aV[aQ-4])||e.x);e.by=aS&&(N(aV[aQ-3])||e.y);e.x=aS&&aV[aQ-2];e.y=aS&&aV[aQ-1];}return aS?[S,aS]:S;},null,ak),n=aa(function(aQ){var aP=[];for(var aM=0,aR=aQ[l];aM<aR;aM++){var e={},aO=aQ[aM].match(/^([^:]*):?([\d\.]*)/);e.color=af.getRGB(aO[1]);if(e.color.error){return null;}e.color=e.color.hex;aO[2]&&(e.offset=aO[2]+"%");aP[d](e);}for(var aM=1,aR=aP[l]-1;aM<aR;aM++){if(!aP[aM].offset){var E=N(aP[aM-1].offset||0),R=0;for(var S=aM+1;S<aR;S++){if(aP[S].offset){R=aP[S].offset;break;}}if(!R){R=100;S=aR;}R=N(R);var aN=(R-E)/(S-aM+1);for(;aM<S;aM++){E+=aN;aP[aM].offset=E+"%";}}}return aP;}),ag=function(){var E,i,S,R,e;if(af.is(arguments[0],"string")||af.is(arguments[0],"object")){if(af.is(arguments[0],"string")){E=D.getElementById(arguments[0]);}else{E=arguments[0];}if(E.tagName){if(arguments[1]==null){return{container:E,width:E.style.pixelWidth||E.offsetWidth,height:E.style.pixelHeight||E.offsetHeight};}else{return{container:E,width:arguments[1],height:arguments[2]};}}}else{if(af.is(arguments[0],ad)&&arguments[l]>3){return{container:1,x:arguments[0],y:arguments[1],width:arguments[2],height:arguments[3]};}}},au=function(e,E){var i=this;for(var R in E){if(E[J](R)&&!(R in e)){switch(typeof E[R]){case"function":(function(S){e[R]=e===i?S:function(){return S[aI](i,arguments);};})(E[R]);break;case"object":e[R]=e[R]||{};au.call(this,e[R],E[R]);break;default:e[R]=E[R];break;}}}},ac=function(e,i){e==i.top&&(i.top=e.prev);e==i.bottom&&(i.bottom=e.next);e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next);},P=function(e,i){ac(e,i);e.next=null;e.prev=i.top;i.top.next=e;i.top=e;},j=function(e,i){ac(e,i);e.next=i.bottom;e.prev=null;i.bottom.prev=e;i.bottom=e;},v=function(i,e,E){ac(i,E);e==E.top&&(E.top=i);e.next&&(e.next.prev=i);i.next=e.next;i.prev=e;e.next=i;},ah=function(i,e,E){ac(i,E);e==E.bottom&&(E.bottom=i);e.prev&&(e.prev.next=i);i.prev=e.prev;e.prev=i;i.next=e;};if(af.svg){aD.svgns="http://www.w3.org/2000/svg";aD.xlink="http://www.w3.org/1999/xlink";var H=function(e){return +e+(~~e===e)*0.5;},M=function(aM){for(var E=0,R=aM[l];E<R;E++){if(aL.call(aM[E][0])!="a"){for(var e=1,S=aM[E][l];e<S;e++){aM[E][e]=H(aM[E][e]);}}else{aM[E][6]=H(aM[E][6]);aM[E][7]=H(aM[E][7]);}}return aM;},ax=function(E,e){if(e){for(var i in e){if(e[J](i)){E[r](i,e[i]);}}}else{return D.createElementNS(aD.svgns,E);}};af[ao]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version;};var o=function(e,R){var i=ax("path");R.canvas&&R.canvas[az](i);var E=new am(i,R);E.type="path";T(E,{fill:"none",stroke:"#000",path:e});return E;};var b=function(R,aU,e){var aR="linear",aO=0.5,aM=0.5,aW=R.style;aU=(aU+ai)[aC](/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,function(aX,i,aY){aR="radial";if(i&&aY){aO=N(i);aM=N(aY);if(aA(aO-0.5,2)+aA(aM-0.5,2)>0.25){aM=Math.sqrt(0.25-aA(aO-0.5,2))+0.5;}}return ai;});aU=aU[u](/\s*\-\s*/);if(aR=="linear"){var aN=aU.shift();aN=-N(aN);if(isNaN(aN)){return null;}var S=[0,0,Math.cos(aN*Math.PI/180),Math.sin(aN*Math.PI/180)],aT=1/(f(Math.abs(S[2]),Math.abs(S[3]))||1);S[2]*=aT;S[3]*=aT;if(S[2]<0){S[0]=-S[2];S[2]=0;}if(S[3]<0){S[1]=-S[3];S[3]=0;}}var aQ=n(aU);if(!aQ){return null;}var E=ax(aR+"Gradient");E.id="r"+(af._id++)[ao](36);aR=="radial"?ax(E,{fx:aO,fy:aM}):ax(E,{x1:S[0],y1:S[1],x2:S[2],y2:S[3]});e.defs[az](E);for(var aP=0,aV=aQ[l];aP<aV;aP++){var aS=ax("stop");ax(aS,{offset:aQ[aP].offset?aQ[aP].offset:!aP?"0%":"100%","stop-color":aQ[aP].color||"#fff"});E[az](aS);}ax(R,{fill:"url(#"+E.id+")",opacity:1,"fill-opacity":1});aW.fill=ai;aW.opacity=1;aW.fillOpacity=1;return 1;};var G=function(i){var e=i.getBBox();ax(i.pattern,{patternTransform:af.format("translate({0},{1})",e.x,e.y)});};var T=function(aT,a2){var aW={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},aY=aT.node,aU=aT.attrs,aQ=aT.rotate(),aM=function(a9,a8){a8=aW[aL.call(a8)];if(a8){var a6=a9.attrs["stroke-width"]||"1",a4={round:a6,square:a6,butt:0}[a9.attrs["stroke-linecap"]||a2["stroke-linecap"]]||0,a7=[];var a5=a8[l];while(a5--){a7[a5]=a8[a5]*a6+((a5%2)?1:-1)*a4;}ax(aY,{"stroke-dasharray":a7[an](",")});}};a2[J]("rotation")&&(aQ=a2.rotation);var aP=(aQ+ai)[u](a);if(!(aP.length-1)){aP=null;}else{aP[1]=+aP[1];aP[2]=+aP[2];}N(aQ)&&aT.rotate(0,true);for(var aX in a2){if(a2[J](aX)){if(!h[J](aX)){continue;}var aV=a2[aX];aU[aX]=aV;switch(aX){case"rotation":aT.rotate(aV,true);break;case"href":case"title":case"target":var a0=aY.parentNode;if(aL.call(a0.tagName)!="a"){var R=ax("a");a0.insertBefore(R,aY);R[az](aY);a0=R;}a0.setAttributeNS(aT.paper.xlink,aX,aV);break;case"cursor":aY.style.cursor=aV;break;case"clip-rect":var i=(aV+ai)[u](a);if(i[l]==4){aT.clip&&aT.clip.parentNode.parentNode.removeChild(aT.clip.parentNode);var E=ax("clipPath"),aZ=ax("rect");E.id="r"+(af._id++)[ao](36);ax(aZ,{x:i[0],y:i[1],width:i[2],height:i[3]});E[az](aZ);aT.paper.defs[az](E);ax(aY,{"clip-path":"url(#"+E.id+")"});aT.clip=aZ;}if(!aV){var a1=D.getElementById(aY.getAttribute("clip-path")[aC](/(^url\(#|\)$)/g,ai));a1&&a1.parentNode.removeChild(a1);ax(aY,{"clip-path":ai});delete aT.clip;}break;case"path":if(aV&&aT.type=="path"){aU.path=M(p(aV));ax(aY,{d:aU.path});}break;case"width":aY[r](aX,aV);if(aU.fx){aX="x";aV=aU.x;}else{break;}case"x":if(aU.fx){aV=-aU.x-(aU.width||0);}case"rx":if(aX=="rx"&&aT.type=="rect"){break;}case"cx":aP&&(aX=="x"||aX=="cx")&&(aP[1]+=aV-aU[aX]);aY[r](aX,H(aV));aT.pattern&&G(aT);break;case"height":aY[r](aX,aV);if(aU.fy){aX="y";aV=aU.y;}else{break;}case"y":if(aU.fy){aV=-aU.y-(aU.height||0);}case"ry":if(aX=="ry"&&aT.type=="rect"){break;}case"cy":aP&&(aX=="y"||aX=="cy")&&(aP[2]+=aV-aU[aX]);aY[r](aX,H(aV));aT.pattern&&G(aT);break;case"r":if(aT.type=="rect"){ax(aY,{rx:aV,ry:aV});}else{aY[r](aX,aV);}break;case"src":if(aT.type=="image"){aY.setAttributeNS(aT.paper.xlink,"href",aV);}break;case"stroke-width":aY.style.strokeWidth=aV;aY[r](aX,aV);if(aU["stroke-dasharray"]){aM(aT,aU["stroke-dasharray"]);}break;case"stroke-dasharray":aM(aT,aV);break;case"translation":var aN=(aV+ai)[u](a);if(aP){aP[1]+=+aN[0];aP[2]+=+aN[1];}q.call(aT,(+aN[0]+1||2)-1,(+aN[1]+1||2)-1);break;case"scale":var aN=(aV+ai)[u](a);aT.scale(+aN[0]||1,+aN[1]||+aN[0]||1,+aN[2]||null,+aN[3]||null);break;case"fill":var S=(aV+ai).match(c);if(S){var E=ax("pattern"),aS=ax("image");E.id="r"+(af._id++)[ao](36);ax(E,{x:0,y:0,patternUnits:"userSpaceOnUse"});ax(aS,{x:0,y:0});aS.setAttributeNS(aT.paper.xlink,"href",S[1]);E[az](aS);var a3=D.createElement("img");a3.style.cssText="position:absolute;left:-9999em;top-9999em";a3.onload=function(){ax(E,{width:this.offsetWidth,height:this.offsetHeight});ax(aS,{width:this.offsetWidth,height:this.offsetHeight});D.body.removeChild(this);aD.safari();};D.body[az](a3);a3.src=S[1];aT.paper.defs[az](E);aY.style.fill="url(#"+E.id+")";ax(aY,{fill:"url(#"+E.id+")"});aT.pattern=E;aT.pattern&&G(aT);break;}if(!af.getRGB(aV).error){delete a2.gradient;delete aU.gradient;!af.is(aU.opacity,"undefined")&&af.is(a2.opacity,"undefined")&&ax(aY,{opacity:aU.opacity});!af.is(aU["fill-opacity"],"undefined")&&af.is(a2["fill-opacity"],"undefined")&&ax(aY,{"fill-opacity":aU["fill-opacity"]});}else{if((({circle:1,ellipse:1})[J](aT.type)||(aV+ai).charAt()!="r")&&b(aY,aV,aT.paper)){aU.gradient=aV;aU.fill="none";break;}}case"stroke":aY[r](aX,af.getRGB(aV).hex);break;case"gradient":(({circle:1,ellipse:1})[J](aT.type)||(aV+ai).charAt()!="r")&&b(aY,aV,aT.paper);break;case"opacity":case"fill-opacity":if(aU.gradient){var e=D.getElementById(aY.getAttribute("fill")[aC](/^url\(#|\)$/g,ai));if(e){var aO=e.getElementsByTagName("stop");aO[aO[l]-1][r]("stop-opacity",aV);}break;}default:aX=="font-size"&&(aV=z(aV,10)+"px");var aR=aX[aC](/(\-.)/g,function(a4){return aB.call(a4.substring(1));});aY.style[aR]=aV;aY[r](aX,aV);break;}}}x(aT,a2);if(aP){aT.rotate(aP.join(ae));}else{N(aQ)&&aT.rotate(aQ,true);}};var g=1.2;var x=function(e,S){if(e.type!="text"||!(S[J]("text")||S[J]("font")||S[J]("font-size")||S[J]("x")||S[J]("y"))){return;}var aQ=e.attrs,E=e.node,aS=E.firstChild?z(D.defaultView.getComputedStyle(E.firstChild,ai).getPropertyValue("font-size"),10):10;if(S[J]("text")){aQ.text=S.text;while(E.firstChild){E.removeChild(E.firstChild);}var R=(S.text+ai)[u]("\n");for(var aM=0,aR=R[l];aM<aR;aM++){if(R[aM]){var aO=ax("tspan");aM&&ax(aO,{dy:aS*g,x:aQ.x});aO[az](D.createTextNode(R[aM]));E[az](aO);}}}else{var R=E.getElementsByTagName("tspan");for(var aM=0,aR=R[l];aM<aR;aM++){aM&&ax(R[aM],{dy:aS*g,x:aQ.x});}}ax(E,{y:aQ.y});var aN=e.getBBox(),aP=aQ.y-(aN.y+aN.height/2);aP&&isFinite(aP)&&ax(E,{y:aQ.y+aP});};var am=function(i,e){var R=0,E=0;this[0]=i;this.id=af._oid++;this.node=i;i.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;e.top&&(e.top.next=this);e.top=this;this.next=null;};am[aK].rotate=function(i,e,R){if(this.removed){return this;}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][an](ae);}return this._.rt.deg;}var E=this.getBBox();i=(i+ai)[u](a);if(i[l]-1){e=N(i[1]);R=N(i[2]);}i=N(i[0]);if(e!=null){this._.rt.deg=i;}else{this._.rt.deg+=i;}(R==null)&&(e=null);this._.rt.cx=e;this._.rt.cy=R;e=e==null?E.x+E.width/2:e;R=R==null?E.y+E.height/2:R;if(this._.rt.deg){this.transformations[0]=af.format("rotate({0} {1} {2})",this._.rt.deg,e,R);this.clip&&ax(this.clip,{transform:af.format("rotate({0} {1} {2})",-this._.rt.deg,e,R)});}else{this.transformations[0]=ai;this.clip&&ax(this.clip,{transform:ai});}ax(this.node,{transform:this.transformations[an](ae)});return this;};am[aK].hide=function(){!this.removed&&(this.node.style.display="none");return this;};am[aK].show=function(){!this.removed&&(this.node.style.display="");return this;};am[aK].remove=function(){if(this.removed){return;}ac(this,this.paper);this.node.parentNode.removeChild(this.node);for(var e in this){delete this[e];}this.removed=true;};am[aK].getBBox=function(){if(this.removed){return this;}if(this.type=="path"){return L(this.attrs.path);}if(this.node.style.display=="none"){this.show();var R=true;}var aO={};try{aO=this.node.getBBox();}catch(aM){}finally{aO=aO||{};}if(this.type=="text"){aO={x:aO.x,y:Infinity,width:0,height:0};for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var aN=this.node.getExtentOfChar(E);(aN.y<aO.y)&&(aO.y=aN.y);(aN.y+aN.height-aO.y>aO.height)&&(aO.height=aN.y+aN.height-aO.y);(aN.x+aN.width-aO.x>aO.width)&&(aO.width=aN.x+aN.width-aO.x);}}R&&this.hide();return aO;};am[aK].attr=function(){if(this.removed){return this;}if(arguments[l]==1&&af.is(arguments[0],"string")){if(arguments[0]=="translation"){return q.call(this);}if(arguments[0]=="rotation"){return this.rotate();}if(arguments[0]=="scale"){return this.scale();}return this.attrs[arguments[0]];}if(arguments[l]==1&&af.is(arguments[0],"array")){var e={};for(var i in arguments[0]){if(arguments[0][J](i)){e[arguments[0][i]]=this.attrs[arguments[0][i]];}}return e;}if(arguments[l]==2){var E={};E[arguments[0]]=arguments[1];T(this,E);}else{if(arguments[l]==1&&af.is(arguments[0],"object")){T(this,arguments[0]);}}return this;};am[aK].toFront=function(){if(this.removed){return this;}this.node.parentNode[az](this.node);var e=this.paper;e.top!=this&&P(this,e);return this;};am[aK].toBack=function(){if(this.removed){return this;}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);j(this,this.paper);var e=this.paper;}return this;};am[aK].insertAfter=function(i){if(this.removed){return this;}var e=this.paper,E=i.node;if(E.nextSibling){E.parentNode.insertBefore(this.node,E.nextSibling);}else{E.parentNode[az](this.node);}v(this,i,this.paper);return this;};am[aK].insertBefore=function(e){if(this.removed){return this;}var i=e.node;i.parentNode.insertBefore(this.node,i);ah(this,e,this.paper);return this;};var I=function(i,e,aM,S){e=H(e);aM=H(aM);var R=ax("circle");i.canvas&&i.canvas[az](R);var E=new am(R,i);E.attrs={cx:e,cy:aM,r:S,fill:"none",stroke:"#000"};E.type="circle";ax(R,E.attrs);return E;};var at=function(E,e,aO,i,aM,aN){e=H(e);aO=H(aO);var S=ax("rect");E.canvas&&E.canvas[az](S);var R=new am(S,E);R.attrs={x:e,y:aO,width:i,height:aM,r:aN||0,rx:aN||0,ry:aN||0,fill:"none",stroke:"#000"};R.type="rect";ax(S,R.attrs);return R;};var Z=function(i,e,aN,aM,S){e=H(e);aN=H(aN);var R=ax("ellipse");i.canvas&&i.canvas[az](R);var E=new am(R,i);E.attrs={cx:e,cy:aN,rx:aM,ry:S,fill:"none",stroke:"#000"};E.type="ellipse";ax(R,E.attrs);return E;};var m=function(E,aN,e,aO,i,aM){var S=ax("image");ax(S,{x:e,y:aO,width:i,height:aM,preserveAspectRatio:"none"});S.setAttributeNS(E.xlink,"href",aN);E.canvas&&E.canvas[az](S);var R=new am(S,E);R.attrs={x:e,y:aO,width:i,height:aM,src:aN};R.type="image";return R;};var O=function(i,e,aM,S){var R=ax("text");ax(R,{x:e,y:aM,"text-anchor":"middle"});i.canvas&&i.canvas[az](R);var E=new am(R,i);E.attrs={x:e,y:aM,"text-anchor":"middle",text:S,font:h.font,stroke:"none",fill:"#000"};E.type="text";T(E,E.attrs);return E;};var aH=function(i,e){this.width=i||this.width;this.height=e||this.height;this.canvas[r]("width",this.width);this.canvas[r]("height",this.height);return this;};var s=function(){var R=ag[aI](null,arguments),E=R&&R.container,i=R.x,aO=R.y,S=R.width,e=R.height;if(!E){throw new Error("SVG container not found.");}aD.canvas=ax("svg");var aN=aD.canvas;aD.width=S||512;aD.height=e||342;aN[r]("width",aD.width);aN[r]("height",aD.height);if(E==1){aN.style.cssText="position:absolute;left:"+i+"px;top:"+aO+"px";D.body[az](aN);}else{if(E.firstChild){E.insertBefore(aN,E.firstChild);}else{E[az](aN);}}E={canvas:aN};for(var aM in aD){if(aD[J](aM)){E[aM]=aD[aM];}}E.bottom=E.top=null;au.call(E,E,af.fn);E.clear();E.raphael=af;return E;};aD.clear=function(){var e=this.canvas;while(e.firstChild){e.removeChild(e.firstChild);}this.bottom=this.top=null;(this.desc=ax("desc"))[az](D.createTextNode("Created with Rapha\xebl"));e[az](this.desc);e[az](this.defs=ax("defs"));};aD.remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this){delete this[e];}};}if(af.vml){var av=function(aV){var aS=/[ahqtv]/ig,aN=p;(aV+ai).match(aS)&&(aN=A);aS=/[clmz]/g;if(aN==p&&!(aV+ai).match(aS)){var E={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},S=/([clmz]),?([^clmz]*)/gi,aM=/-?[^,\s-]+/g;var aR=(aV+ai)[aC](S,function(aW,aY,i){var aX=[];i[aC](aM,function(aZ){aX[d](H(aZ));});return E[aY]+aX;});return aR;}var aT=aN(aV),R,aR=[],e;for(var aP=0,aU=aT[l];aP<aU;aP++){R=aT[aP];e=aL.call(aT[aP][0]);e=="z"&&(e="x");for(var aO=1,aQ=R[l];aO<aQ;aO++){e+=H(R[aO])+(aO!=aQ-1?",":ai);}aR[d](e);}return aR[an](ae);};af[ao]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version;};var o=function(e,aM){var R=Y("group");R.style.cssText="position:absolute;left:0;top:0;width:"+aM.width+"px;height:"+aM.height+"px";R.coordsize=aM.coordsize;R.coordorigin=aM.coordorigin;var E=Y("shape"),i=E.style;i.width=aM.width+"px";i.height=aM.height+"px";E.coordsize=this.coordsize;E.coordorigin=this.coordorigin;R[az](E);var S=new am(E,R,aM);S.isAbsolute=true;S.type="path";S.path=[];S.Path=ai;e&&T(S,{fill:"none",stroke:"#000",path:e});aM.canvas[az](R);return S;};var T=function(aQ,aV){aQ.attrs=aQ.attrs||{};var aT=aQ.node,aW=aQ.attrs,aN=aT.style,R,a0=aQ;for(var aO in aV){if(aV[J](aO)){aW[aO]=aV[aO];}}aV.href&&(aT.href=aV.href);aV.title&&(aT.title=aV.title);aV.target&&(aT.target=aV.target);aV.cursor&&(aN.cursor=aV.cursor);if(aV.path&&aQ.type=="path"){aW.path=aV.path;aT.path=av(aW.path);}if(aV.rotation!=null){aQ.rotate(aV.rotation,true);}if(aV.translation){R=(aV.translation+ai)[u](a);q.call(aQ,R[0],R[1]);if(aQ._.rt.cx!=null){aQ._.rt.cx+=+R[0];aQ._.rt.cy+=+R[1];aQ.setBox(aQ.attrs,R[0],R[1]);}}if(aV.scale){R=(aV.scale+ai)[u](a);aQ.scale(+R[0]||1,+R[1]||+R[0]||1,+R[2]||null,+R[3]||null);}if("clip-rect" in aV){var e=(aV["clip-rect"]+ai)[u](a);if(e[l]==4){e[2]=+e[2]+(+e[0]);e[3]=+e[3]+(+e[1]);var aP=aT.clipRect||D.createElement("div"),aZ=aP.style,aM=aT.parentNode;aZ.clip=af.format("rect({1}px {2}px {3}px {0}px)",e);if(!aT.clipRect){aZ.position="absolute";aZ.top=0;aZ.left=0;aZ.width=aQ.paper.width+"px";aZ.height=aQ.paper.height+"px";aM.parentNode.insertBefore(aP,aM);aP[az](aM);aT.clipRect=aP;}}if(!aV["clip-rect"]){aT.clipRect&&(aT.clipRect.style.clip=ai);}}if(aQ.type=="image"&&aV.src){aT.src=aV.src;}if(aQ.type=="image"&&aV.opacity){aT.filterOpacity=" progid:DXImageTransform.Microsoft.Alpha(opacity="+(aV.opacity*100)+")";aN.filter=(aT.filterMatrix||ai)+(aT.filterOpacity||ai);}aV.font&&(aN.font=aV.font);aV["font-family"]&&(aN.fontFamily='"'+aV["font-family"][u](",")[0][aC](/^['"]+|['"]+$/g,ai)+'"');aV["font-size"]&&(aN.fontSize=aV["font-size"]);aV["font-weight"]&&(aN.fontWeight=aV["font-weight"]);aV["font-style"]&&(aN.fontStyle=aV["font-style"]);if(aV.opacity!=null||aV["stroke-width"]!=null||aV.fill!=null||aV.stroke!=null||aV["stroke-width"]!=null||aV["stroke-opacity"]!=null||aV["fill-opacity"]!=null||aV["stroke-dasharray"]!=null||aV["stroke-miterlimit"]!=null||aV["stroke-linejoin"]!=null||aV["stroke-linecap"]!=null){aT=aQ.shape||aT;var aU=(aT.getElementsByTagName("fill")&&aT.getElementsByTagName("fill")[0]),aX=false;!aU&&(aX=aU=Y("fill"));if("fill-opacity" in aV||"opacity" in aV){var i=((+aW["fill-opacity"]+1||2)-1)*((+aW.opacity+1||2)-1);i<0&&(i=0);i>1&&(i=1);aU.opacity=i;}aV.fill&&(aU.on=true);if(aU.on==null||aV.fill=="none"){aU.on=false;}if(aU.on&&aV.fill){var E=aV.fill.match(c);if(E){aU.src=E[1];aU.type="tile";}else{aU.color=af.getRGB(aV.fill).hex;aU.src=ai;aU.type="solid";if(af.getRGB(aV.fill).error&&(a0.type in {circle:1,ellipse:1}||(aV.fill+ai).charAt()!="r")&&b(a0,aV.fill)){aW.fill="none";aW.gradient=aV.fill;}}}aX&&aT[az](aU);var S=(aT.getElementsByTagName("stroke")&&aT.getElementsByTagName("stroke")[0]),aY=false;!S&&(aY=S=Y("stroke"));if((aV.stroke&&aV.stroke!="none")||aV["stroke-width"]||aV["stroke-opacity"]!=null||aV["stroke-dasharray"]||aV["stroke-miterlimit"]||aV["stroke-linejoin"]||aV["stroke-linecap"]){S.on=true;}(aV.stroke=="none"||S.on==null||aV.stroke==0||aV["stroke-width"]==0)&&(S.on=false);S.on&&aV.stroke&&(S.color=af.getRGB(aV.stroke).hex);var i=((+aW["stroke-opacity"]+1||2)-1)*((+aW.opacity+1||2)-1),aR=(N(aV["stroke-width"])||1)*0.75;i<0&&(i=0);i>1&&(i=1);aV["stroke-width"]==null&&(aR=aW["stroke-width"]);aV["stroke-width"]&&(S.weight=aR);aR&&aR<1&&(i*=aR)&&(S.weight=1);S.opacity=i;aV["stroke-linejoin"]&&(S.joinstyle=aV["stroke-linejoin"]||"miter");S.miterlimit=aV["stroke-miterlimit"]||8;aV["stroke-linecap"]&&(S.endcap=aV["stroke-linecap"]=="butt"?"flat":aV["stroke-linecap"]=="square"?"square":"round");if(aV["stroke-dasharray"]){var aS={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};S.dashstyle=aS[J](aV["stroke-dasharray"])?aS[aV["stroke-dasharray"]]:ai;}aY&&aT[az](S);}if(a0.type=="text"){var aN=a0.paper.span.style;aW.font&&(aN.font=aW.font);aW["font-family"]&&(aN.fontFamily=aW["font-family"]);aW["font-size"]&&(aN.fontSize=aW["font-size"]);aW["font-weight"]&&(aN.fontWeight=aW["font-weight"]);aW["font-style"]&&(aN.fontStyle=aW["font-style"]);a0.node.string&&(a0.paper.span.innerHTML=(a0.node.string+ai)[aC](/</g,"&#60;")[aC](/&/g,"&#38;")[aC](/\n/g,"<br>"));a0.W=aW.w=a0.paper.span.offsetWidth;a0.H=aW.h=a0.paper.span.offsetHeight;a0.X=aW.x;a0.Y=aW.y+H(a0.H/2);switch(aW["text-anchor"]){case"start":a0.node.style["v-text-align"]="left";a0.bbx=H(a0.W/2);break;case"end":a0.node.style["v-text-align"]="right";a0.bbx=-H(a0.W/2);break;default:a0.node.style["v-text-align"]="center";break;}}};var b=function(e,aO){e.attrs=e.attrs||{};var aP=e.attrs,aR=e.node.getElementsByTagName("fill"),aM="linear",aN=".5 .5";e.attrs.gradient=aO;aO=(aO+ai)[aC](/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,function(aT,aU,i){aM="radial";if(aU&&i){aU=N(aU);i=N(i);if(aA(aU-0.5,2)+aA(i-0.5,2)>0.25){i=Math.sqrt(0.25-aA(aU-0.5,2))+0.5;}aN=aU+ae+i;}return ai;});aO=aO[u](/\s*\-\s*/);if(aM=="linear"){var E=aO.shift();E=-N(E);if(isNaN(E)){return null;}}var S=n(aO);if(!S){return null;}e=e.shape||e.node;aR=aR[0]||Y("fill");if(S[l]){aR.on=true;aR.method="none";aR.type=(aM=="radial")?"gradientradial":"gradient";aR.color=S[0].color;aR.color2=S[S[l]-1].color;var aS=[];for(var R=0,aQ=S[l];R<aQ;R++){S[R].offset&&aS[d](S[R].offset+ae+S[R].color);}aR.colors.value=aS[l]?aS[an](","):"0% "+aR.color;if(aM=="radial"){aR.focus="100%";aR.focussize=aN;aR.focusposition=aN;}else{aR.angle=(270-E)%360;}}return 1;};var am=function(S,aN,e){var aM=0,E=0,i=0,R=1;this[0]=S;this.id=af._oid++;this.node=S;S.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=aN;this.paper=e;this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;e.top&&(e.top.next=this);e.top=this;this.next=null;};am[aK].rotate=function(i,e,E){if(this.removed){return this;}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][an](ae);}return this._.rt.deg;}i=(i+ai)[u](a);if(i[l]-1){e=N(i[1]);E=N(i[2]);}i=N(i[0]);if(e!=null){this._.rt.deg=i;}else{this._.rt.deg+=i;}E==null&&(e=null);this._.rt.cx=e;this._.rt.cy=E;this.setBox(this.attrs,e,E);this.Group.style.rotation=this._.rt.deg;return this;};am[aK].setBox=function(aM,aN,S){if(this.removed){return this;}var E=this.Group.style,aO=(this.shape&&this.shape.style)||this.node.style;aM=aM||{};for(var aP in aM){if(aM[J](aP)){this.attrs[aP]=aM[aP];}}aN=aN||this._.rt.cx;S=S||this._.rt.cy;var aS=this.attrs,aV,aU,aW,aR;switch(this.type){case"circle":aV=aS.cx-aS.r;aU=aS.cy-aS.r;aW=aR=aS.r*2;break;case"ellipse":aV=aS.cx-aS.rx;aU=aS.cy-aS.ry;aW=aS.rx*2;aR=aS.ry*2;break;case"rect":case"image":aV=+aS.x;aU=+aS.y;aW=aS.width||0;aR=aS.height||0;break;case"text":this.textpath.v=["m",H(aS.x),", ",H(aS.y-2),"l",H(aS.x)+1,", ",H(aS.y-2)][an](ai);aV=aS.x-H(this.W/2);aU=aS.y-this.H/2;aW=this.W;aR=this.H;break;case"path":if(!this.attrs.path){aV=0;aU=0;aW=this.paper.width;aR=this.paper.height;}else{var aQ=L(this.attrs.path);aV=aQ.x;aU=aQ.y;aW=aQ.width;aR=aQ.height;}break;default:aV=0;aU=0;aW=this.paper.width;aR=this.paper.height;break;}aN=(aN==null)?aV+aW/2:aN;S=(S==null)?aU+aR/2:S;var R=aN-this.paper.width/2,aT=S-this.paper.height/2;if(this.type=="path"||this.type=="text"){(E.left!=R+"px")&&(E.left=R+"px");(E.top!=aT+"px")&&(E.top=aT+"px");this.X=this.type=="text"?aV:-R;this.Y=this.type=="text"?aU:-aT;this.W=aW;this.H=aR;(aO.left!=-R+"px")&&(aO.left=-R+"px");(aO.top!=-aT+"px")&&(aO.top=-aT+"px");}else{(E.left!=R+"px")&&(E.left=R+"px");(E.top!=aT+"px")&&(E.top=aT+"px");this.X=aV;this.Y=aU;this.W=aW;this.H=aR;(E.width!=this.paper.width+"px")&&(E.width=this.paper.width+"px");(E.height!=this.paper.height+"px")&&(E.height=this.paper.height+"px");(aO.left!=aV-R+"px")&&(aO.left=aV-R+"px");(aO.top!=aU-aT+"px")&&(aO.top=aU-aT+"px");(aO.width!=aW+"px")&&(aO.width=aW+"px");(aO.height!=aR+"px")&&(aO.height=aR+"px");var aX=(+aM.r||0)/(aw(aW,aR));if(this.type=="rect"&&this.arcsize!=aX&&(aX||this.arcsize)){var e=Y(aX?"roundrect":"rect");e.arcsize=aX;this.Group[az](e);this.node.parentNode.removeChild(this.node);this.node=e;this.arcsize=aX;this.attr(this.attrs);}}};am[aK].hide=function(){!this.removed&&(this.Group.style.display="none");return this;};am[aK].show=function(){!this.removed&&(this.Group.style.display="block");return this;};am[aK].getBBox=function(){if(this.removed){return this;}if(this.type=="path"){return L(this.attrs.path);}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H};};am[aK].remove=function(){if(this.removed){return;}ac(this,this.paper);this.node.parentNode.removeChild(this[0]);this.Group.parentNode.removeChild(this.Group);this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e];}this.removed=true;};am[aK].attr=function(){if(this.removed){return this;}if(arguments[l]==1&&af.is(arguments[0],"string")){if(arguments[0]=="translation"){return q.call(this);}if(arguments[0]=="rotation"){return this.rotate();}if(arguments[0]=="scale"){return this.scale();}return this.attrs[arguments[0]];}if(this.attrs&&arguments[l]==1&&af.is(arguments[0],"array")){var e={};for(var E=0,R=arguments[0][l];E<R;E++){e[arguments[0][E]]=this.attrs[arguments[0][E]];}return e;}var S;if(arguments[l]==2){S={};S[arguments[0]]=arguments[1];}arguments[l]==1&&af.is(arguments[0],"object")&&(S=arguments[0]);if(S){if(S.text&&this.type=="text"){this.node.string=S.text;}T(this,S);if(S.gradient&&(({circle:1,ellipse:1})[J](this.type)||(S.gradient+ai).charAt()!="r")){b(this,S.gradient);}(this.type!="path"||this._.rt.deg)&&this.setBox(this.attrs);}return this;};am[aK].toFront=function(){!this.removed&&this.Group.parentNode[az](this.Group);this.paper.top!=this&&P(this,this.paper);return this;};am[aK].toBack=function(){if(this.removed){return this;}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);j(this,this.paper);}return this;};am[aK].insertAfter=function(e){if(this.removed){return this;}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling);}else{e.Group.parentNode[az](this.Group);}v(this,e,this.paper);return this;};am[aK].insertBefore=function(e){if(this.removed){return this;}e.Group.parentNode.insertBefore(this.Group,e.Group);ah(this,e,this.paper);return this;};var I=function(i,e,aO,aM){var S=Y("group"),aN=Y("oval"),E=aN.style;S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";S.coordsize=i.coordsize;S.coordorigin=i.coordorigin;S[az](aN);var R=new am(aN,S,i);R.type="circle";T(R,{stroke:"#000",fill:"none"});R.attrs.cx=e;R.attrs.cy=aO;R.attrs.r=aM;R.setBox({x:e-aM,y:aO-aM,width:aM*2,height:aM*2});i.canvas[az](S);return R;};var at=function(i,aO,aN,aP,R,e){var S=Y("group"),E=Y(e?"roundrect":"rect"),aQ=(+e||0)/(aw(aP,R));E.arcsize=aQ;S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";S.coordsize=i.coordsize;S.coordorigin=i.coordorigin;S[az](E);var aM=new am(E,S,i);aM.type="rect";T(aM,{stroke:"#000"});aM.arcsize=aQ;aM.setBox({x:aO,y:aN,width:aP,height:R,r:+e});i.canvas[az](S);return aM;};var Z=function(e,aP,aO,E,i){var S=Y("group"),R=Y("oval"),aN=R.style;S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";S.coordsize=e.coordsize;S.coordorigin=e.coordorigin;S[az](R);var aM=new am(R,S,e);aM.type="ellipse";T(aM,{stroke:"#000"});aM.attrs.cx=aP;aM.attrs.cy=aO;aM.attrs.rx=E;aM.attrs.ry=i;aM.setBox({x:aP-E,y:aO-i,width:E*2,height:i*2});e.canvas[az](S);return aM;};var m=function(i,e,aP,aO,aQ,R){var S=Y("group"),E=Y("image"),aN=E.style;S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";S.coordsize=i.coordsize;S.coordorigin=i.coordorigin;E.src=e;S[az](E);var aM=new am(E,S,i);aM.type="image";aM.attrs.src=e;aM.attrs.x=aP;aM.attrs.y=aO;aM.attrs.w=aQ;aM.attrs.h=R;aM.setBox({x:aP,y:aO,width:aQ,height:R});i.canvas[az](S);return aM;};var O=function(i,aP,aO,aQ){var S=Y("group"),R=Y("shape"),aN=R.style,aR=Y("path"),e=aR.style,E=Y("textpath");S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";S.coordsize=i.coordsize;S.coordorigin=i.coordorigin;aR.v=af.format("m{0},{1}l{2},{1}",H(aP),H(aO),H(aP)+1);aR.textpathok=true;aN.width=i.width;aN.height=i.height;E.string=aQ+ai;E.on=true;R[az](E);R[az](aR);S[az](R);var aM=new am(E,S,i);aM.shape=R;aM.textpath=aR;aM.type="text";aM.attrs.text=aQ;aM.attrs.x=aP;aM.attrs.y=aO;aM.attrs.w=1;aM.attrs.h=1;T(aM,{font:h.font,stroke:"none",fill:"#000"});aM.setBox();i.canvas[az](S);return aM;};var aH=function(E,e){var i=this.canvas.style;this.width=N(E||this.width);this.height=N(e||this.height);i.width=this.width+"px";i.height=this.height+"px";i.clip="rect(0 "+this.width+"px "+this.height+"px 0)";this.coordsize=this.width+ae+this.height;var R=this.bottom;while(R){R.Group.coordsize=this.coordsize;R.attr(R.attrs);R=R.next;}return this;};D.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!D.namespaces.rvml&&D.namespaces.add("rvml","urn:schemas-microsoft-com:vml");var Y=function(e){return D.createElement("<rvml:"+e+' class="rvml">');};}catch(X){var Y=function(e){return D.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');};}var s=function(){var R=ag[aI](null,arguments),i=R.container,aQ=R.height,aR,E=R.width,aP=R.x,aO=R.y;if(!i){throw new Error("VML container not found.");}var aM={},aN=aM.canvas=D.createElement("div"),S=aN.style;E=N(E)||512;aQ=N(aQ)||342;aM.width=E;aM.height=aQ;aM.coordsize=E+ae+aQ;aM.coordorigin="0 0";aM.span=D.createElement("span");aM.span.style.cssText="position:absolute;left:-9999px;top:-9999px;padding:0;margin:0;line-height:1;display:inline;";aN[az](aM.span);S.cssText=af.format("width:{0}px;height:{1}px;position:absolute;clip:rect(0 {0}px {1}px 0)",E,aQ);if(i==1){D.body[az](aN);S.left=aP+"px";S.top=aO+"px";i={style:{width:E,height:aQ}};}else{i.style.width=E;i.style.height=aQ;if(i.firstChild){i.insertBefore(aN,i.firstChild);}else{i[az](aN);}}for(var e in aD){if(aD[J](e)){aM[e]=aD[e];}}au.call(aM,aM,af.fn);aM.top=aM.bottom=null;aM.raphael=af;return aM;};aD.clear=function(){this.canvas.innerHTML=ai;this.bottom=this.top=null;};aD.remove=function(){this.canvas.parentNode.removeChild(this.canvas);for(var e in this){delete this[e];}};}if({"Apple Computer, Inc.":1,"Google Inc.":1}[navigator.vendor]){aD.safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);setTimeout(function(){e.remove();});};}else{aD.safari=function(){};}var W=(function(){if(D.addEventListener){return function(S,E,i,e){var R=function(aM){return i.call(e,aM);};S.addEventListener(E,R,false);return function(){S.removeEventListener(E,R,false);return true;};};}else{if(D.attachEvent){return function(aM,R,E,i){var S=function(aN){return E.call(i,aN||aj.event);};aM.attachEvent("on"+R,S);var e=function(){aM.detachEvent("on"+R,S);return true;};if(R=="mouseover"){aM.attachEvent("onmouseenter",S);return function(){aM.detachEvent("onmouseenter",S);return e();};}else{if(R=="mouseout"){aM.attachEvent("onmouseleave",S);return function(){aM.detachEvent("onmouseleave",S);return e();};}}return e;};}}})();for(var U=y[l];U--;){(function(e){am[aK][e]=function(i){if(af.is(i,"function")){this.events=this.events||{};this.events[e]=this.events[e]||{};this.events[e][i]=this.events[e][i]||[];this.events[e][i][d](W(this.shape||this.node,e,i,this));}return this;};am[aK]["un"+e]=function(i){var E=this.events;E&&E[e]&&E[e][i]&&E[e][i][l]&&E[e][i].shift()()&&!E[e][i][l]&&delete E[e][i];return this;};})(y[U]);}am[aK].hover=function(i,e){return this.mouseover(i).mouseout(e);};aD.circle=function(e,E,i){return I(this,e||0,E||0,i||0);};aD.rect=function(e,S,i,E,R){return at(this,e||0,S||0,i||0,E||0,R||0);};aD.ellipse=function(e,R,E,i){return Z(this,e||0,R||0,E||0,i||0);};aD.path=function(e){e&&!af.is(e,"string")&&!af.is(e[0],"array")&&(e+=ai);return o(af.format[aI](af,arguments),this);};aD.image=function(R,e,S,i,E){return m(this,R||"about:blank",e||0,S||0,i||0,E||0);};aD.text=function(e,E,i){return O(this,e||0,E||0,i||ai);};aD.set=function(e){arguments[l]>1&&(e=Array[aK].splice.call(arguments,0,arguments[l]));return new K(e);};aD.setSize=aH;am[aK].scale=function(aW,aV,R,E){if(aW==null&&aV==null){return{x:this._.sx,y:this._.sy,toString:function(){return this.x+ae+this.y;}};}aV=aV||aW;!+aV&&(aV=aW);var a0,aY,aZ,aX,bd=this.attrs;if(aW!=0){var aT=this.getBBox(),aQ=aT.x+aT.width/2,aM=aT.y+aT.height/2,bc=aW/this._.sx,ba=aV/this._.sy;R=(+R||R==0)?R:aQ;E=(+E||E==0)?E:aM;var aS=~~(aW/Math.abs(aW)),aP=~~(aV/Math.abs(aV)),a3=this.node.style,bf=R+(aQ-R)*aS*bc,be=E+(aM-E)*aP*ba;switch(this.type){case"rect":case"image":var aR=bd.width*aS*bc,a2=bd.height*aP*ba,aU=bd.r*aw(bc,ba),aO=bf-aR/2,S=be-a2/2;this.attr({width:aR,height:a2,x:aO,y:S,r:aU});break;case"circle":case"ellipse":this.attr({rx:bd.rx*bc,ry:bd.ry*ba,r:bd.r*aw(bc,ba),cx:bf,cy:be});break;case"path":var a5=V(bd.path),a6=true;for(var a8=0,a1=a5[l];a8<a1;a8++){var a4=a5[a8],aN=aB.call(a4[0]);if(aN=="M"&&a6){continue;}else{a6=false;}if(af.svg&&aN=="A"){a4[a5[a8][l]-2]*=bc;a4[a5[a8][l]-1]*=ba;a4[1]*=bc;a4[2]*=ba;a4[5]=+(aS+aP?!!+a4[5]:!+a4[5]);}else{for(var a7=1,a9=a4[l];a7<a9;a7++){a4[a7]*=(a7%2&&aN!="V")?bc:ba;}}}var e=L(a5),a0=bf-e.x-e.width/2,aY=be-e.y-e.height/2;a5[0][1]+=a0;a5[0][2]+=aY;this.attr({path:a5});break;}if(this.type in {text:1,image:1}&&(aS!=1||aP!=1)){if(this.transformations){this.transformations[2]="scale("[aF](aS,",",aP,")");this.node[r]("transform",this.transformations[an](ae));a0=(aS==-1)?-bd.x-(aR||0):bd.x;aY=(aP==-1)?-bd.y-(a2||0):bd.y;this.attr({x:a0,y:aY});bd.fx=aS-1;bd.fy=aP-1;}else{this.node.filterMatrix=" progid:DXImageTransform.Microsoft.Matrix(M11="[aF](aS,", M12=0, M21=0, M22=",aP,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");a3.filter=(this.node.filterMatrix||ai)+(this.node.filterOpacity||ai);}}else{if(this.transformations){this.transformations[2]=ai;this.node[r]("transform",this.transformations[an](ae));bd.fx=0;bd.fy=0;}else{this.node.filterMatrix=ai;a3.filter=(this.node.filterMatrix||ai)+(this.node.filterOpacity||ai);}}bd.scale=[aW,aV,R,E][an](ae);this._.sx=aW;this._.sy=aV;}return this;};af.easing_formulas={linear:function(e){return e;},"<":function(e){return aA(e,3);},">":function(e){return aA(e-1,3)+1;},"<>":function(e){e=e*2;if(e<1){return aA(e,3)/2;}e-=2;return(aA(e,3)+2)/2;},backIn:function(i){var e=1.70158;return i*i*((e+1)*i-e);},backOut:function(i){i=i-1;var e=1.70158;return i*i*((e+1)*i+e)+1;},elastic:function(E){if(E==0||E==1){return E;}var i=0.3,e=i/4;return aA(2,-10*E)*Math.sin((E-e)*(2*Math.PI)/i)+1;},bounce:function(R){var i=7.5625,E=2.75,e;if(R<(1/E)){e=i*R*R;}else{if(R<(2/E)){R-=(1.5/E);e=i*R*R+0.75;}else{if(R<(2.5/E)){R-=(2.25/E);e=i*R*R+0.9375;}else{R-=(2.625/E);e=i*R*R+0.984375;}}}return e;}};var B={length:0},aE=function(){var aP=+new Date;for(var a0 in B){if(a0!="length"&&B[J](a0)){var a5=B[a0];if(a5.stop){delete B[a0];B[l]--;continue;}var aN=aP-a5.start,aY=a5.ms,aX=a5.easing,a1=a5.from,aU=a5.diff,R=a5.to,aT=a5.t,aW=a5.prev||0,aO=a5.el,S=a5.callback,aV={},E;if(aN<aY){var aM=af.easing_formulas[aX]?af.easing_formulas[aX](aN/aY):aN/aY;for(var aZ in a1){if(a1[J](aZ)){switch(Q[aZ]){case"number":E=+a1[aZ]+aM*aY*aU[aZ];break;case"colour":E="rgb("+[w(H(a1[aZ].r+aM*aY*aU[aZ].r)),w(H(a1[aZ].g+aM*aY*aU[aZ].g)),w(H(a1[aZ].b+aM*aY*aU[aZ].b))][an](",")+")";break;case"path":E=[];for(var a3=0,aS=a1[aZ][l];a3<aS;a3++){E[a3]=[a1[aZ][a3][0]];for(var a2=1,a4=a1[aZ][a3][l];a2<a4;a2++){E[a3][a2]=+a1[aZ][a3][a2]+aM*aY*aU[aZ][a3][a2];}E[a3]=E[a3][an](ae);}E=E[an](ae);break;case"csv":switch(aZ){case"translation":var aR=aU[aZ][0]*(aN-aW),aQ=aU[aZ][1]*(aN-aW);aT.x+=aR;aT.y+=aQ;E=aR+ae+aQ;break;case"rotation":E=+a1[aZ][0]+aM*aY*aU[aZ][0];a1[aZ][1]&&(E+=","+a1[aZ][1]+","+a1[aZ][2]);break;case"scale":E=[+a1[aZ][0]+aM*aY*aU[aZ][0],+a1[aZ][1]+aM*aY*aU[aZ][1],(2 in R[aZ]?R[aZ][2]:ai),(3 in R[aZ]?R[aZ][3]:ai)][an](ae);break;case"clip-rect":E=[];var a3=4;while(a3--){E[a3]=+a1[aZ][a3]+aM*aY*aU[aZ][a3];}break;}break;}aV[aZ]=E;}}aO.attr(aV);aO._run&&aO._run.call(aO);}else{(aT.x||aT.y)&&aO.translate(-aT.x,-aT.y);R.scale&&(R.scale=R.scale+ai);aO.attr(R);delete B[a0];B[l]--;aO.in_animation=null;af.is(S,"function")&&S.call(aO);}a5.prev=aN;}}af.svg&&aD.safari();B[l]&&setTimeout(aE);},w=function(e){return e>255?255:(e<0?0:e);},q=function(e,E){if(e==null){return{x:this._.tx,y:this._.ty};}this._.tx+=+e;this._.ty+=+E;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+E+this.attrs.cy});break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+E+this.attrs.y});break;case"path":var i=V(this.attrs.path);i[0][1]+=+e;i[0][2]+=+E;this.attr({path:i});break;}return this;};am[aK].animateWith=function(i,E,e,S,R){B[i.id]&&(E.start=B[i.id].start);return this.animate(E,e,S,R);};am[aK].onAnimation=function(e){this._run=e||null;return this;};am[aK].animate=function(R,e,aR,aX){if(af.is(aR,"function")||!aR){aX=aR||null;}var aS={},aT={},aU={};for(var aQ in R){if(R[J](aQ)){if(Q[J](aQ)){aS[aQ]=this.attr(aQ);(aS[aQ]==null)&&(aS[aQ]=h[aQ]);aT[aQ]=R[aQ];switch(Q[aQ]){case"number":aU[aQ]=(aT[aQ]-aS[aQ])/e;break;case"colour":aS[aQ]=af.getRGB(aS[aQ]);var aO=af.getRGB(aT[aQ]);aU[aQ]={r:(aO.r-aS[aQ].r)/e,g:(aO.g-aS[aQ].g)/e,b:(aO.b-aS[aQ].b)/e};break;case"path":var E=A(aS[aQ],aT[aQ]);aS[aQ]=E[0];aT[aQ]=E[1];aU[aQ]=[];for(var aN=0,aW=aS[aQ][l];aN<aW;aN++){aU[aQ][aN]=[0];for(var S=1,aP=aS[aQ][aN][l];S<aP;S++){aU[aQ][aN][S]=(aT[aQ][aN][S]-aS[aQ][aN][S])/e;}}break;case"csv":var aV=(R[aQ]+ai)[u](a),aM=(aS[aQ]+ai)[u](a);switch(aQ){case"translation":aS[aQ]=[0,0];aU[aQ]=[aV[0]/e,aV[1]/e];break;case"rotation":aS[aQ]=(aM[1]==aV[1]&&aM[2]==aV[2])?aM:[0,aV[1],aV[2]];aU[aQ]=[(aV[0]-aS[aQ][0])/e,0,0];break;case"scale":R[aQ]=aV;aS[aQ]=(aS[aQ]+ai)[u](a);aU[aQ]=[(aV[0]-aS[aQ][0])/e,(aV[1]-aS[aQ][1])/e,0,0];break;case"clip-rect":aS[aQ]=(aS[aQ]+ai)[u](a);aU[aQ]=[];var aN=4;while(aN--){aU[aQ][aN]=(aV[aN]-aS[aQ][aN])/e;}break;}aT[aQ]=aV;}}}}this.stop();this.in_animation=1;B[this.id]={start:R.start||+new Date,ms:e,easing:aR,from:aS,diff:aU,to:aT,el:this,callback:aX,t:{x:0,y:0}};++B[l]==1&&aE();return this;};am[aK].stop=function(){B[this.id]&&B[l]--;delete B[this.id];return this;};am[aK].translate=function(e,i){return this.attr({translation:e+" "+i});};am[aK][ao]=function(){return"Rapha\xebl\u2019s object";};af.ae=B;var K=function(e){this.items=[];this[l]=0;if(e){for(var E=0,R=e[l];E<R;E++){if(e[E]&&(e[E].constructor==am||e[E].constructor==K)){this[this.items[l]]=this.items[this.items[l]]=e[E];this[l]++;}}}};K[aK][d]=function(){var S,e;for(var E=0,R=arguments[l];E<R;E++){S=arguments[E];if(S&&(S.constructor==am||S.constructor==K)){e=this.items[l];this[e]=this.items[e]=S;this[l]++;}}return this;};K[aK].pop=function(){delete this[this[l]--];return this.items.pop();};for(var t in am[aK]){if(am[aK][J](t)){K[aK][t]=(function(e){return function(){for(var E=0,R=this.items[l];E<R;E++){this.items[E][e][aI](this.items[E],arguments);}return this;};})(t);}}K[aK].attr=function(E,aN){if(E&&af.is(E,"array")&&af.is(E[0],"object")){for(var e=0,aM=E[l];e<aM;e++){this.items[e].attr(E[e]);}}else{for(var R=0,S=this.items[l];R<S;R++){this.items[R].attr[aI](this.items[R],arguments);}}return this;};K[aK].animate=function(aM,E,aP,aO){(af.is(aP,"function")||!aP)&&(aO=aP||null);var e=this.items[l],R=e,aN=this,S;aO&&(S=function(){!--e&&aO.call(aN);});this.items[--R].animate(aM,E,aP||S,S);while(R--){this.items[R].animateWith(this.items[e-1],aM,E,aP||S,S);}return this;};K[aK].insertAfter=function(E){var e=this.items[l];while(e--){this.items[e].insertAfter(E);}};K[aK].getBBox=function(){var e=[],aN=[],E=[],S=[];for(var R=this.items[l];R--;){var aM=this.items[R].getBBox();e[d](aM.x);aN[d](aM.y);E[d](aM.x+aM.width);S[d](aM.y+aM.height);}e=aw[aI](0,e);aN=aw[aI](0,aN);return{x:e,y:aN,width:f[aI](0,E)-e,height:f[aI](0,S)-aN};};af.registerFont=function(i){if(!i.face){return i;}this.fonts=this.fonts||{};var R={w:i.w,face:{},glyphs:{}},E=i.face["font-family"];for(var aN in i.face){if(i.face[J](aN)){R.face[aN]=i.face[aN];}}if(this.fonts[E]){this.fonts[E][d](R);}else{this.fonts[E]=[R];}if(!i.svg){R.face["units-per-em"]=z(i.face["units-per-em"],10);for(var S in i.glyphs){if(i.glyphs[J](S)){var aM=i.glyphs[S];R.glyphs[S]={w:aM.w,k:{},d:aM.d&&"M"+aM.d[aC](/[mlcxtrv]/g,function(aO){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[aO]||"M";})+"z"};if(aM.k){for(var e in aM.k){if(aM[J](e)){R.glyphs[S].k[e]=aM.k[e];}}}}}}return i;};aD.getFont=function(aP,aQ,E,S){S=S||"normal";E=E||"normal";aQ=+aQ||{normal:400,bold:700,lighter:300,bolder:800}[aQ]||400;var aM=af.fonts[aP];if(!aM){var R=new RegExp("(^|\\s)"+aP[aC](/[^\w\d\s+!~.:_-]/g,ai)+"(\\s|$)","i");for(var e in af.fonts){if(af.fonts[J](e)){if(R.test(e)){aM=af.fonts[e];break;}}}}var aN;if(aM){for(var aO=0,aR=aM[l];aO<aR;aO++){aN=aM[aO];if(aN.face["font-weight"]==aQ&&(aN.face["font-style"]==E||!aN.face["font-style"])&&aN.face["font-stretch"]==S){break;}}}return aN;};aD.print=function(aR,aQ,aO,E,aV){var aM=this.set(),aP=(aO+ai)[u](ai),e=0,aU=ai,S;af.is(E,"string")&&(E=this.getFont(E));if(E){S=(aV||16)/E.face["units-per-em"];for(var aN=0,aS=aP[l];aN<aS;aN++){var R=aN&&E.glyphs[aP[aN-1]]||{},aT=E.glyphs[aP[aN]];e+=aN?(R.w||E.w)+(R.k&&R.k[aP[aN]]||0):0;aT&&aT.d&&aM[d](this.path(aT.d).attr({fill:"#000",stroke:"none",translation:[e,0]}));}aM.scale(S,S,0,aQ).translate(aR,(aV||16)/2);}return aM;};af.format=function(E){var i=af.is(arguments[1],"array")?[0][aF](arguments[1]):arguments,e=/\{(\d+)\}/g;E&&af.is(E,"string")&&i[l]-1&&(E=E[aC](e,function(S,R){return i[++R]==null?ai:i[R];}));return E||ai;};af.ninja=function(){var E=aj.Raphael,i;if(k.was){aj.Raphael=k.is;}else{try{delete aj.Raphael;}catch(R){aj.Raphael=i;}}return E;};af.el=am[aK];return af;})();
(function() {


  /*
   * INPUT:
   * obj: object to clone
   * shallow: if true, clone will return a shallow copy
   *
   * OUTPUT:
   * returns a cloned object
   */

  /*
  clone = function(obj, shallow) {
      console.log('clone obj=' + obj + ' type=' + typeof obj);
      if(obj == null || typeof(obj) != 'object') {
          return obj;
      }
      var temp = new obj.constructor();
      for(var key in obj) {
          if (shallow) {
            temp[key] = obj[key];
          }
          else {
            temp[key] = clone(obj[key]);
          }
      }
      return temp;
  };
  */

  /*
   * A destructive operation that merges fromObj into toObj with a shallow copy
   * Attributes of toObj gets overwritten with those of fromObj.
   * Attributes of toObj that doesn't exist in fromObj remains intact.
   */

  /*
  update = function(toObj, fromObj) {
    for (var key in fromObj) {
      if (typeof fromObj[key] != 'function') {
        toObj[key] = clone(fromObj[key], true);
      }
    }
  };
  */

  /**
  *
  */
  /*
  debug = function(message) {
    window.console && console.log && console.log(message);
  };
  */


  periodicallyCall = function(_fun,context,intervalms) {
      setTimeout(function() {
        _fun.call(context);
        periodicallyCall(_fun,context,args,intervalms);
      }, intervalms);
  };

  /**
  *
  */
  createCookie = function(name,value,days) {
    if (!days) {
      days = 14;
    }
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
  };


  /**
  *
  */
  readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  };


  /**
  *
  */
  eraseCookie = function (name) {
    createCookie(name,"",-1);
  };


  /**
  *
  */
  if (window.WireIt && window.WireIt.Layer) {
    WireIt.Layer.prototype.setOptions = function(options) {
      this.options = {
        className: 'WireIt-Layer',
        parentEl: document.body,
        containers: [],
        wires: [],
        layerMap: false,
        enableMouseEvents: true
      };
      for (var key in options) {
        this.options[key] = options[key];
      }
      //debug("loaded defaults for wire-it layer");
      //debug(this.options.parentEl);
    };
  }

  /**
  * Wraps buffer to selected number of characters using string break char
  * Modified from: http://phpjs.org/functions/wordwrap (License: MIT || GPL)
  * @method wordWrap(m,b,c)
  * @args
  *   wrap_width = how many characters to wrap at,
  *   break_character = character to use for line breaks.
  *   cut_words = whether to allow splitting of words. (does this work)
  *
  */
  String.prototype.wordWrap = function(wrap_width, break_character, cut_words) {
      var m = ((arguments.length >= 1) ? arguments[0] : 75   );
      var b = ((arguments.length >= 3) ? arguments[1] : "\n" );
      var c = ((arguments.length >= 4) ? arguments[2] : false);

      var i, j, s, r = this.split("\n");
      if (m > 0) {
          for (i in r) {
              for (s = r[i], r[i] = ""; s.length > m;) {
                  j = c ? m : (j = s.substr(0, m).match(/\S*$/)).input.length - j[0].length || m;
                  r[i] += s.substr(0, j) + ((s = s.substr(j)).length ? b : "");
              }
              r[i] += s;
          }
      }
      return r.join("\n");
  };


})();
(function () {

  MySystem = typeof(MySystem) != 'undefined' ? MySystem : function() {};

  MySystem.defaultFont = {
    "font-weight": 'bold',
    "font-family": 'helvetica, arial, sans-serif',
    fill: '#000000',
    opacity: 1
  }


  Raphael.fn.zoomIn = function(x,y,size) {
    var strokeSize = size * 0.2;
    var radius = size / 2.0;
    strokeSize = strokeSize < 1 ? 1 : strokeSize;
    var attributes = {
      fill: "#EEFFEE",
      stroke: "#004400",
      "stroke-width": strokeSize,
      opacity: 0.7,
      cx: x,
      cy: y
    }
    var lineExtent = radius - (strokeSize);
    lineExtent = lineExtent < 1 ? 1 : lineExtent;
    var zoom = this.set();
    zoom.push(this.circle(x,y,radius));
    zoom.push(   this.path("M" + x      + " " + (y+lineExtent)  + "L" +  x     + " " + (y-lineExtent )));
    zoom.push(   this.path("M" + (x+lineExtent)  + " " +  y     + "L" + (x-lineExtent)  + " " +  y   ));
    zoom.attr(attributes);
    return zoom;
  };

  Raphael.fn.zoomOut = function(x,y,size) {
    var strokeSize = size * 0.2;
    var radius = size / 2.0;
    strokeSize = strokeSize < 1 ? 1 : strokeSize;
    var attributes = {
      fill: "#EEFFEE",
      stroke: "#004400",
      "stroke-width": strokeSize,
      opacity: 0.7,
      cx: x,
      cy: y
    }
    var lineExtent = radius - (strokeSize);
    lineExtent = lineExtent < 1 ? 1 : lineExtent;
    var zoom = this.set();
    zoom.push(this.circle(x,y,radius));
    zoom.push(   this.path("M" + (x+lineExtent)  + " " +  y     + "L" + (x-lineExtent)  + " " +  y   ));
    zoom.attr(attributes);
    return zoom;
  };


  MySystem.arrow_path = function(startx,starty,endx,endy,len,angle) {
    var theta = Math.atan2((endy-starty),(endx-startx));
    var baseAngleA = theta + angle * Math.PI/180;
    var baseAngleB = theta - angle * Math.PI/180;
    var tipX = endx + len * Math.cos(theta);
    var tipY = endy + len * Math.sin(theta);
    var baseAX = endx - len * Math.cos(baseAngleA);
    var baseAY = endy - len * Math.sin(baseAngleA);
    var baseBX = endx - len * Math.cos(baseAngleB);
    var baseBY = endy - len * Math.sin(baseAngleB);
    var pathData = " M " + tipX      + " " + tipY +
                   " L " + baseAX  + " " + baseAY +
                   " L " + baseBX  + " " + baseBY +
                   " Z ";
    return pathData;
  };


  Raphael.fn.wire = function (wire, scale) {
      var line;
      var obj1 = wire.sourceNode.rep;
      var obj2 = wire.targetNode.rep;
      var name = wire.name;
      if (wire.rep && wire.rep.from && wire.rep.to) {
          line = wire.rep;
          obj1 = line.from;
          obj2 = line.to;
      }
      var bb1 = obj1.nodeImage.getBBox();
      var bb2 = obj2.nodeImage.getBBox();
      var border = 10;
      var p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
          {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + border},
          {x: bb1.x - border, y: bb1.y + bb1.height / 2},
          {x: bb1.x + bb1.width + border, y: bb1.y + bb1.height / 2},
          {x: bb2.x + bb2.width / 2, y: bb2.y - border},
          {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + border},
          {x: bb2.x - border, y: bb2.y + bb2.height / 2},
          {x: bb2.x + bb2.width + border, y: bb2.y + bb2.height / 2}];
      var d = {}, dis = [];
      for (var i = 0; i < 4; i++) {
          for (var j = 4; j < 8; j++) {
              var dx = Math.abs(p[i].x - p[j].x),
                  dy = Math.abs(p[i].y - p[j].y);
              if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                  dis.push(dx + dy);
                  d[dis[dis.length - 1]] = [i, j];
              }
          }
      }
      var res=[0,0];
      if (dis.length == 0) {
          res = [0, 4];
      } else {
          res = d[Math.min.apply(Math, dis)];
          if (!res) {
            res = [0,4];
          }
      }
      var x1 = p[res[0]].x,
          y1 = p[res[0]].y,
          x4 = p[res[1]].x,
          y4 = p[res[1]].y,
          dx = Math.max(Math.abs(x1 - x4) / 2, 10),
          dy = Math.max(Math.abs(y1 - y4) / 2, 10),
          x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
          y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
          x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
          y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
      var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");

      if (line && line.line) {
          var lineWidth = line.lineWidth * scale;
          line.arrow.attr({path: MySystem.arrow_path(x3,y3,x4,y4, lineWidth * 1.5,50)});
          line.line.attr({path: path, "stroke-width": lineWidth, fill: "none"});
          var fontSize = 10 * scale;
          line.label.attr({x: (x1 + x4)/2, y: (y1 + y4)/2, "font-size": fontSize + "px"});
          var centerX = (x1 + x4)/2;
          var centerY = (y1 + y4)/2;
          var wordWidth = name.length * fontSize;
          var textBoxX = centerX - wordWidth / 2;
          var textBoxY = centerY;
          line.textBox.attr({x: textBoxX, y: textBoxY - fontSize, width: wordWidth, height: fontSize*2})
      } else {
          var color = typeof line == "string" ? line : "#000";
          var stroke_width = (wire.width || 3)* scale;
          var fontSize = 10 * scale;

          var arrow_path = MySystem.arrow_path(x3,y3,x4,y4, stroke_width * 1.5,50);
          var line = this.path(path).attr({stroke: wire.color, fill: "none","stroke-width": stroke_width});
          var arrow = this.path(arrow_path).attr({fill: wire.color, stroke: "none"});
          var centerX = (x1 + x4)/2;
          var centerY = (y1 + y4)/2;
          var wordWidth = name.length * fontSize;
          var textBoxX = centerX - wordWidth / 2;
          var textBoxY = centerY;
          var textBox = this.rect(textBoxX,textBoxY - fontSize, wordWidth, fontSize*2);
          textBox.attr({fill: "#FFFFFF", stroke: "none", opacity: 0.65});
          var label = this.text((x1 + x4)/2,(y1 + y4)/2, name).attr({"font-size": fontSize + "px"})
          label.attr(MySystem.defaultFont);
          return {
              line: line,
              arrow: arrow,
              label: label,
              textBox: textBox,
              lineWidth: stroke_width,
              from: obj1,
              to: obj2
          };
      }
  };




  Raphael.fn.Node = function (node, scale) {
    var label;
    var nodeImage;
    var offsetX = 0;
    var offsetY = 0;
    if (node.rep) {
      var nodeImage = node.rep.nodeImage;
      var label = node.rep.label;
      offsetX = node.rep.offsetX;
      offsetY = node.rep.offsetY;
    }
    else {
      node.border = node.border ? node.border : 5;
      if (!node.loaded) {
        var image = new Image();
        image.src = node.icon;
        node.width = image.width;
        node.height = image.height;
        node.loaded = true;
      }
      var nodeImage = this.image(node.icon,node.x,node.y,node.width || 30,node.height || 30);
      nodeImage.mouseDown = function(e) {
        node.rep.offsetX = e.clientX;
        node.rep.offsetY = e.clientY;
        e.preventDefault && e.preventDefault();
      }
      var label = this.text(node.x,node.y,node.name).attr({fill: '#004400',opacity: 0.8});
      label.attr(MySystem.defaultFont);
    }

    var imageY =  (node.y * scale) + offsetY;
    var imageX =  (node.x * scale) + offsetX;
    var labelY =  imageY + (node.height * scale) +  (node.border * scale);
    var labelX =  imageX + (node.width  *scale / 2.0);
    nodeImage.scale(scale,scale);
    nodeImage.attr({x:imageX, y:imageY});
    var fontSize = 12 * scale;
    label.attr({x: labelX, y:labelY, "font-size": fontSize + "px"});
    return {
        nodeImage: nodeImage,
        label: label,
        offsetX: offsetX,
        offsetY: offsetY
    };
  };



  MySystem.Node = function() {
    this.terminals = [];
    this.icon = [];
    this.x = 0;
    this.y = 0;
  };


  MySystem.Node.prototype.terminal = function(name) {
    var returnVal = null;
    for (var terminal_index=0; terminal_index < this.terminals.length; terminal_index++) {
      var term = this.terminals[terminal_index];
      if (term.name == name) {
        returnVal = term;
      }
    }
    return returnVal;
  };


  MySystem.Node.importJson = function(jsonText,contentBaseUrl) {
    var objs = eval(jsonText);
    var nodes = [];
    var wires = [];
    var containers = objs[0].containers;
    if (objs) {
      for (var container_index=0; container_index < containers.length;container_index++) {
        var container = containers[container_index];
        var node = new MySystem.Node();
        if (typeof(contentBaseUrl) != 'undefined') {
          node.icon = contentBaseUrl + "/" + container.icon;
        }
        else {
          node.icon = container.icon;
        }
        node.x = (container.position[0].replace("px","")) / 1;
        node.y = (container.position[1].replace("px","")) / 1;
        node.name = container.name;

        node.terminals = container.terminals;
        nodes.push(node);
      }
    }
    return nodes;
  };



  MySystem.Wire = function() {
    this.source = null;
    this.target = null;
    this.x = 0;
    this.y = 0;
  };

  MySystem.Wire.importJson = function(jsonText,nodes) {
    var objs = eval(jsonText);
    var _wires = objs[0].wires;
    var wires = [];
    if (_wires) {
      for (var wire_index=0; wire_index < _wires.length; wire_index++) {
        var w = _wires[wire_index];
        var wire = new MySystem.Wire();
        wire.src = w.src;
        wire.sourceNode = nodes[w.src.moduleId];
        wire.sourceTerminal = wire.sourceNode.terminal(w.src.terminal);

        wire.tgt = w.tgt;
        wire.targetNode = nodes[w.tgt.moduleId];
        wire.targetTerminal = wire.targetNode.terminal(w.tgt.terminal);

        wire.options = w.options;
        wire.fields = w.options.fields;
        wire.width = wire.fields.width;
        wire.name = wire.fields.name;
        wire.color = w.options.color;
        wire.color.name = wire.fields.color;

        wires.push(wire);
      }
    }
    return wires;
  };


  MySystemPrint = function(_json,dom_id,contentBaseUrl) {
    this.data = _json;
    this.name = "my print";
    this.domId = dom_id;
    this.container = $("#" + this.domId);
    this.scale = typeof(scale_factor) != 'undefined' ? scale_factor : 1;
    this.width = this.container.width;
    this.height = this.container.height;

    this.nodes = MySystem.Node.importJson(_json,contentBaseUrl);
    this.wires = MySystem.Wire.importJson(_json,this.nodes);

    this.autoscale();

    this.graphics = Raphael(this.domId,this.width,this.height);

    var self = this;

    this.sizeChangeDetector = function() {
      var width = self.container.width();
      var height = self.container.height();
      if (width != self.width || height != self.height) {
        self.redraw();
      }
    };
    self.redrawInterval = setInterval(self.sizeChangeDetector, 1150);

    for (var node_index=0;node_index < self.nodes.length;node_index++) {
      var node = self.nodes[node_index];
      self.drawNode(node);
    }

    for (var wire_index=0;wire_index< self.wires.length;wire_index++) {
      var wire = self.wires[wire_index];
      self.drawWire(wire);
    }


    this.container.mouseup( function(e){
      self.mouse_down = false;
    });

    this.container.mousedown( function(e){
      self.mouse_down = true;
      self.last_x = e.clientX;
      self.last_y = e.clientY;
    });

    this.container.mousemove( function(e){
      if (self.mouse_down) {
        var dx = e.clientX - self.last_x;
        var dy = e.clientY- self.last_y;
        for (var node_index=0;node_index < self.nodes.length;node_index++) {
          var node = self.nodes[node_index];
          node.rep.offsetX += dx;
          node.rep.offsetY += dy;
          self.redraw();
        }
        self.last_x = e.clientX;
        self.last_y = e.clientY;
      }
    });


    this.zoomIn = this.graphics.zoomIn(20,20,18);
    this.zoomOut = this.graphics.zoomOut(48,20,18);

    this.zoomIn.mouseover(function(e) {
      self.zoomIn.scale(1.25,1.25);
    });
    this.zoomIn.mouseout(function(e) {
      self.zoomIn.scale(1,1);
    });
    this.zoomIn.click(function(e) {
      self.scale = self.scale + 0.2;
      self.redraw();
    });

    this.zoomOut.mouseover(function(e) {
      self.zoomOut.scale(1.25,1.25);
    });
    this.zoomOut.mouseout(function(e) {
      self.zoomOut.scale(1,1);
    });
    this.zoomOut.click(function(e) {
      self.scale = self.scale - 0.2;
      self.scale = self.scale > 0 ? self.scale : 0.05;
      self.redraw();
    });
    self.redraw();
  };


  MySystemPrint.prototype.graphDimensions = function() {
    var maxX = 0;
    var maxY = 0;
    for (var node_index=0;node_index< this.nodes.length; node_index++) {
      var node = this.nodes[node_index];
      maxX = maxX < node.x ? node.x : maxX;
      maxY = maxY < node.y ? node.y : maxY;
    }
    return {
      width: maxX,
      height: maxY
    };
  };


  MySystemPrint.prototype.autoscale = function() {
    var container = this.contianer;
    var width = this.container.width();
    var height = this.container.height();
    var graphDimensions = this.graphDimensions();
    var self = this;
    var margin = 80;
    self.width = graphDimensions.width + margin;
    self.height = graphDimensions.height + margin;
    self.scale = 1;
    if (self.width) {
      var widthRatio = width / self.width;
      var widthDiff = Math.abs(width - self.width);
      var heightRatio = height / self.height;
      var heightDiff = Math.abs(height - self.height);
      var scalar = heightDiff > widthDiff ? widthRatio : heightRatio;
      self.scale = self.scale * scalar;
    }
    self.width = width;
    self.height = height;
  };

  MySystemPrint.prototype.redraw = function() {
    var container = this.container;
    if (typeof container == "undefined" || container == null) {
      clearInterval(this.redrawInterval);
      return;
    }
    var width = container.width();
    var height = container.height();
    var self = this;
    if (self.width) {
      var widthRatio = width / self.width;
      var widthDiff = Math.abs(width - self.width);
      var heightRatio = height / self.height;
      var heightDiff = Math.abs(height - self.height);
      var scalar = heightDiff > widthDiff ? widthRatio : heightRatio;
      self.scale = self.scale * scalar;
    }
    self.width = width;
    self.height = height;
    this.graphics.setSize(width, height);
    for (var node_index=0;node_index< this.nodes.length;node_index++) {
      var node = this.nodes[node_index];
      self.graphics.Node(node,self.scale);
    }
    for (var wire_index=0;wire_index< this.wires.length;wire_index++) {
      var wire = this.wires[wire_index];
      self.graphics.wire(wire,self.scale);
    }
  };

  MySystemPrint.prototype.drawNode = function(node) {
    node.rep = this.graphics.Node(node,this.scale);
  };

  MySystemPrint.prototype.drawWire = function(wire) {
    wire.rep = this.graphics.wire(wire,this.scale);
  };


}());

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/mysystem/mysystem_print.js');
};