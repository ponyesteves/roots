(function(){$.fn.gridPrepDatos=function(n,t,e,i){var r,a,o,f,d,u,h,l,s,c;if("index"===$("#action_name").val()){for(r=[],u=function(n){return r.push($.isArray(n)?{name:n[0],type:n[1]}:{name:n})},h=0,s=n.length;s>h;h++)f=n[h],u(f);for(a=[],l=0,c=t.length;c>l;l++)o=t[l],d=void 0!==o[2]?o[2]:o[0],a.push({text:d,datafield:o[0].toLowerCase(),width:o[1]});return $.fn.gridInit(r,a,e,i)}}}).call(this);