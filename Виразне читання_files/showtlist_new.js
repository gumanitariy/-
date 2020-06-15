var trans = [];
for (var i = 0x410; i <= 0x44F; i++)
  trans[i] = i - 0x350; // А-Яа-я

trans[0x401] = 0xA8;    // Ё 
trans[0x451] = 0xB8;    // ё
trans[0x457] = 0xBF;    // ї
trans[0x407] = 0xAF;    // Ї
trans[0x456] = 0xB3;    // і
trans[0x406] = 0xB2;    // І
trans[0x404] = 0xBA;    // є
trans[0x454] = 0xAA;    // Є



function urlencode(str)
{
  var res="";
  //Составляем массив кодов символов, попутно переводим кириллицу
  for (var i = 0; i < str.length; i++)
  {
    var n = str.charCodeAt(i);
    if (typeof trans[n] != 'undefined') {
      n = trans[n];
      res=res+escape(String.fromCharCode(n));
    }
    else
    {
      n = str.charAt(i);
      res=res+n;
    }

  }
  return res;
}

var width=0;
var bshowTlist=0;

function showtlist(viewinf,codepg,param,lang,domen,p,w,tdttlID)
{
  bShowtlist=1;
  var id,n;
  
  var strdivtlist="<table width='100%'>";
  var othertowns="";
  
  var i=1;
  
  var infselectlist=document.getElementById("infselectlist");
  
  
  while (true) {
  		 var divInf=document.getElementById("informer"+i);
  		 if  (divInf) {
  		 		if (infselectlist==divInf.lastChild)
  		 			divInf.removeChild(divInf.lastChild);
  		 }
  		 else break;	
  		 i++; 		
    }
  
  infselectlist=document.createElement("div");
  infselectlist.setAttribute("id", "infselectlist");
 
  
  var obj=document.getElementById("informer"+viewinf);
  if (!obj) obj=document.getElementById("informer");
  obj.appendChild(infselectlist);
  
  infselectlist.style.position="absolute";
  //infselectlist.style.top=document.getElementById("gmtdttl"+viewinf).offsetHeight+4-obj.offsetHeight+"px"; 
  el=document.getElementById("gmtdttl"+viewinf);
  infselectlist.style.top =  getPos(el,"Top")+el.offsetHeight+"px";
  infselectlist.style.left =  getPos(el,"Left");
  infselectlist.style.width=document.getElementById("gmtbl"+viewinf).offsetWidth-5+"px";
  
  for (var i=9; i<arguments.length; i++) {
  	var re=/[\d+]/g;
  	tn=arguments[i].replace(re, "");
  	var k=1;
  	for (var j=8; j<arguments.length; j++) {
  		if (j!=i) { 
  			othertowns+="&city"+k+"="+arguments[j];
  			k++;
  		}
  	}
  	strdivtlist+='<tr><td id=city'+(i-1)+' class=gmtdselectlist '+ 
  							 'onmouseover="color_on('+(i-1)+');"'+ 
  							 'onmouseout="color_off('+(i-1)+');"'+
  							 'onClick=updateInf2('+(arguments.length-8)+',"'+encodeURI(arguments[i])+'","'+encodeURI(othertowns)+'","'+codepg+'",'+viewinf+','+param+','+'"'+lang+'","'+domen+'",'+p+','+w+');'+
  							 '>&nbsp;&nbsp;'+tn.replace("_", " ");+'&nbsp;&nbsp;</td></tr>';
  }
  
  strdivtlist+="</table>";
  
  document.getElementById("infselectlist").innerHTML=strdivtlist;
  
  document.getElementById("infselectlist").style.height=(document.getElementById("infselectlist").style.fontSize+22)*(k-1)+"px";
  
  document.getElementById("infselectlist").style.visibility ="visible";
  
}

function getPos(el,sProp) {
	var iPos = 0;
	while (el!=null) {
		iPos+=el["offset" + sProp]
		el = el.offsetParent;
	}
	return iPos
}


function color_on(num) {
	document.getElementById("city"+num).style.backgroundColor="#e0e0e0";
}

function color_off(num) {
	document.getElementById("city"+num).style.backgroundColor="";
}

function updateInf2(counttown,town,othertowns,codepg,vieinf,param,lang,domen,p,w)
{
  var tlist="&city0="+town;
  LoadScript("http://informer.gismeteo.ru/html/getinformer_new.php?tnumber="+counttown+tlist+othertowns+"&par="+param+"&codepg="+codepg+"&inflang="+lang+"&domen="+domen+"&vieinf="+vieinf+"&p="+p+"&w="+w+"&tblstl=gmtbl&tdttlstl=gmtdttl&tdtext=gmtdtext&tdtextb=gmtdtextb&new_scheme=1", vieinf+"");
}

function LoadScript(URL, viewinf)
{
	if (typeof(vieinf)=="undefined") vieinf="";
	
	var obj= document.getElementById("informer"+viewinf);
	if (!obj) obj= document.getElementById("informer");
	if (obj) {
		var srcobj = document.createElement("script");
		srcobj.obj = obj;
		srcobj.onload=function() {
			this.obj.innerHTML=responseText;
		}
		srcobj.onreadystatechange= function(response) {
			// if(this.readyState=='complete') { eval(response.responseText); obj.innerHTML=responseText; }
			// if(typeof(responseText)!=null) this.obj.innerHTML=responseText;
		}
		document.getElementsByTagName("head")[0].appendChild(srcobj);  	
		if(srcobj.setAttribute) srcobj.setAttribute("src",URL);
		else srcobj.src=URL; 	
	}
}

document.onclick= hideList;

function hideList(evt) {
	if (document.getElementById("infselectlist"))
		if (document.getElementById("infselectlist").style.visibility == "visible")
			if (!bShowtlist) document.getElementById("infselectlist").style.visibility = "hidden";
	bShowtlist=0;}