var polys = document.querySelectorAll('polygon,polyline');
console.log("polys",polys);
[].forEach.call(polys,convertPolyToPath);


function convertPolyToPath(poly){
    console.log("start converting polygon");
    var svgNS = poly.ownerSVGElement.namespaceURI;
    var path = document.createElementNS(svgNS,'path');
    var pathdata = 'M '+poly.getAttribute('points');
    if (poly.tagName=='polygon') pathdata+='z';
    path.setAttribute('d',pathdata);

    poly.parentNode.replaceChild(path,poly);
    console.log("poly converted");
}
