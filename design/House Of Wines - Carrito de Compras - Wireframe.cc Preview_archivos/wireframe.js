function setNewParent(e,a,t){if(liDropped=1,e){var i=app.pages[e].parent;if(0!==i&&($.observable(app.pages[i].children).remove(app.pages[i].children.indexOf(e),1),0===app.pages[i].children.length&&$.observable(app.pages[i]).removeProperty("children")),0===a)$.observable(app.pages[e]).setProperty("parent",0),0===i?reorderPages(e,a,t):$.observable(app.pagesOrder).insert(app.pagesOrder.indexOf(t.ref.toString())+t.after,e),$("#"+e).removeAttr("data-parent-id");else{$("#"+e).attr("data-parent-id",a),app.pages[e].parent=a,app.pages[a].hidden&&app.toggleActivepageVisibility(null,null,e,!0);var s=0;if(app.pages[a].children){if(t)if(t.ref===a)s=app.pages[a].children.length||0;else{if($.isEmptyObject(t)){var s=$("[data-pageid="+a+"] > ol li").index($(".dd-filler"));return void $.observable(app.pages[a].children).insert(s,e.toString())}s=app.pages[a].children.indexOf(t.ref.toString())+t.after,0>s&&(s=0)}else s=app.pages[a].children.length||0;$.observable(app.pages[a].children).insert(s,e.toString())}else $.observable(app.pages[a]).setProperty("children",[e]);0===i&&$.observable(app.pagesOrder).remove(app.pagesOrder.indexOf(e))}}}function abortReordering(){var e=app.pagesOrder.slice().reverse().reverse();$.observable(app.pagesOrder).refresh([]).refresh(e)}function reorderPages(e,a,t){if($.isEmptyObject(t))return void abortReordering();var i=app.pagesOrder.indexOf(e.toString()),s=app.pagesOrder.indexOf(t.ref.toString())+t.after;if(s>i&&(s-=1),i==s)return void abortReordering();$.observable(app.pagesOrder).move(i,s,1);$.map(app.pagesOrder,function(e,a){return app.pages[e].name})}function insert_page(e,a,t){e=escapeHtml(e);var i=parseInt(+new Date*Math.random()*100).toString(36).slice(-8),s=activepage.data("template");$("#canvas").append($("<div>").addClass("page").attr({id:i,"data-pagename":e,"data-page-height":$canvaswrap.height(),"data-page-width":$canvaswrap.width(),"data-template":s,"data-hidden":"false"}))}function removePageById(e){if(e){var a=app.pages[e].parent;if($("#"+e).remove(),$canvas.find("[data-link="+e+"]").removeAttr("data-link"),app.pages[e].children){var t=0;$.each(app.pages[e].children,function(e,a){t+=1,removePageById(a)})}$.observable(app.pagesOrder).remove(app.pagesOrder.indexOf(e.toString())),a&&(app.pages[a].children.length>1?$.observable(app.pages[a].children).remove(app.pages[a].children.indexOf(e.toString())):$.observable(app.pages[a]).removeProperty("children")),$.observable(app.pages).removeProperty(e),$.observable(app.activepage.position).setProperty("top",0)}}function removeAppliedMaster(e,a){a.each(function(a){if("all"===e)return $(this).removeAttr("data-applied-master"),!1;var t=$(this).attr("data-applied-master");t=t.split(",");var i=$.inArray(e,t);i>-1&&(t.splice(i,1),$(this).attr("data-applied-master",t.toString())),t.length||pagelist.find("[data-pageid="+$(this).attr("id")+"] > .dd-handle").removeAttr("data-master-indicator")})}function applyMasterIndicator(e,a){var t=$("[data-pageid="+e+"]").find(".master-indicator").show();if("undefined"==typeof t.attr("data-hint"))var i=[];else var i=t.attr("data-hint"),i=i.split(",");-1===$.inArray(a,i)&&i.push(a),t.attr("data-hint",i.toString())}function make_page_active(e,a,t,i){if(activepage.add("#canvas > .masterpage").find("[data-snap-mark-h] , [data-snap-mark-v]").removeAttr("data-snap-mark-h").removeAttr("data-snap-mark-v"),e){deselectMaster(),$("#"+app.activepage.id).removeClass("active"),t?$.observable(app.activepage).setProperty("prevPage",app.activepage.id):$.observable(app.activepage).removeProperty("prevPage"),app.activepage.editable&&e!==app.activepage.id&&$.observable(app.activepage).removeProperty("editable"),$(".masterpage.ui-draggable").draggable("destroy"),removeGuides(activepage.find(" > .wire")),removeGuides($("#canvas > .master-on").find(" > .wire")),quill&&blurRTE();var s=app.masterpages[e]?"masterpages":"pages";$.observable(app.activepage).setProperty({id:e,type:s}),deselectAll(),activepage.hide(),activepage=$("#"+e),activepage.show().addClass("active").siblings(".page").hide(),"masterpages"===s&&($(".masterpage.ui-draggable").draggable("destroy"),activepage.removeClass("master-on").css({top:"0",left:"0"})),wirepanel.hide();var p=activepage.attr("data-page-width")||$canvaswrap.width(),r=activepage.attr("data-page-height")||$canvaswrap.height(),n=activepage.hasClass("masterpage")?"none":activepage.attr("data-template"),o=activepage.hasClass("masterpage")?"false":activepage.attr("data-orientation");applyTemplate(n,o),$canvaswrap.css({width:p+"px",height:r+"px"});var p=parseInt($canvaswrap.width(),10)+250;if(p<$(window).width()&&(p=$(window).width()),supercanvas.css({width:p+"px",height:parseInt(r,10)+750+"px"}),cwidth=p,$("#canvas").show(),updateCanvasInput(p,r),$canvaswrap.center(),previewMode?(pLiArr.indexOf(e)==pLiArr.length-1?$("#next").addClass("inactive"):$("#next").removeClass("inactive"),0==pLiArr.indexOf(e)?$("#prev").addClass("inactive"):$("#prev").removeClass("inactive")):(computeGuides(activepage.find(" > .wire")),computeGuides("canvas"),useboxer()),a&&$.observable(app.activepage.position).setProperty({top:a,id:e}),"undefined"==typeof activepage.attr("data-applied-master"))var d=[];else{var d=activepage.attr("data-applied-master");d=d.split(",")}if(app.pages[e]){$canvas.find(".masterpage").removeClass("master-on");var l=app.pages[e].masterPages.slice(0),g=l.splice(l.indexOf(e));g.shift();var c=l;$.each(c.reverse(),function(a,t){var i=a>0?c[a-1]:e;$("#"+t).insertBefore($("#"+i)),showMasterpage(e,t)}),$.each(g,function(a,t){var i=a>0?g[a-1]:e;$("#"+t).insertAfter($("#"+i)),showMasterpage(e,t)})}computeGuides(),makeShareUrl(),i||$container.scrollTop(0).scrollLeft(0).perfectScrollbar("update")}}function blueSitemapInput(){app.activepage["new"]&&$.observable(app[app.activepage.type+"Order"]).insert(app.activepage.id),""===app[app.activepage.type][app.activepage.id].name&&$.observable(app[app.activepage.type][app.activepage.id]).setProperty("name",app.activepage.existingName||"Page"),app.activepage.existingName=!1,$.observable(app.activepage).removeProperty("editable").removeProperty("new")}function showMasterpage(e,a){$("#"+a).addClass("master-on").show().css({top:$("#"+e).attr("data-m-pos-y-"+a)?$("#"+e).attr("data-m-pos-y-"+a)+"px":"0",left:$("#"+e).attr("data-m-pos-x-"+a)?$("#"+e).attr("data-m-pos-x-"+a)+"px":"0",width:$("#"+a).attr("data-page-width"),height:$("#"+a).attr("data-page-height")}).find(".wire").draggable("destroy").resizable("destroy").off().end().data("masterId",a)}function selectMaster(e,a,t){$guidesHV.hide();var i=a||$(e).parents(".master-on").attr("id");$canvas.data("drawing-in-progress")||($canvas.find(".master-on.ui-draggable").length||($.observable(app.activepage).setProperty("masterpageSelected",i),deselectAll()),$canvaswrap.data("master-dragged",!0).addClass("master-selected"),activepage.add("#canvas > .master-on").find("[data-snap-mark-h] , [data-snap-mark-v]").removeAttr("data-snap-mark-h").removeAttr("data-snap-mark-v"),$("#"+i).hasClass("ui-draggable")||$("#"+i).draggable({snap:"#canvas",snapTolerance:10,start:function(e,a){$canvaswrap.addClass("draggingInProgress"),$.observable(app.activepage).removeProperty("contextMenuPos")},stop:function(e,a){var t="data-m-pos-x-"+$(this).data("masterId"),i="data-m-pos-y-"+$(this).data("masterId"),s={};s[t]=a.position.left,s[i]=a.position.top,activepage.attr(s),computeGuides($(this).find(" > .wire")),$canvaswrap.removeClass("draggingInProgress")}}).on("click",function(){$.observable(app.activepage).removeProperty("contextMenuPos")}))}function deselectMaster(){$canvas.find(".master-on.ui-draggable").draggable("destroy").off(),$canvaswrap.data("master-dragged",!1).removeClass("master-selected"),$.observable(app.activepage).removeProperty("masterpageSelected").removeProperty("contextMenuPos")}function getPagesOrder(e){return liArr=$("#sitemaplist").find(".dd-item").toArray(),pLiArr=$.map(liArr,function(a,t){return"true"!==liArr[t].dataset.hidden||e?liArr[t].dataset.pageid:void 0})}function findFirstVisiblePage(){for(var e,a=(app.pagesOrder[0],0);a<pLiArr.length;a++)if(!app.pages[pLiArr[a]].hidden){e=pLiArr[a];break}return e}function findNextVisiblePage(e){var a,t=app.activepage.id||app.pagesOrder[0],i=pLiArr.slice(0);e&&i.reverse();for(var s=i.indexOf(t)+1;s<i.length;s++)if(!app.pages[i[s]].hidden){a=i[s];break}return a}function movePage(e,a){function t(e){$.each(app.pages[e].children,function(e,a){s=s.add($canvas.find("#"+a)),app.pages[a].children&&t(a)})}e=e.toString();var i=$canvas.find("#"+e),s=$();if(app.pages[e].children&&t(e),i=i.add(s),previPgId=a.ref||-1,-1===previPgId){if($canvas.find(".page").first().is("#"+e))return;$canvas.find(".page").first().before(i)}else a.after?$canvas.find("#"+previPgId).after(i):$canvas.find("#"+previPgId).before(i)}function setLiParent(e,a){$canvas.find("#"+e).attr("data-parent-id",a)}var app={windowData:{height:$(window).height(),width:$(window).width()},activepage:{id:"1",type:"pages",position:{top:0},masterpageSelected:0,name:null},pages:{},pagesOrder:new Array,masterpagesOrder:$canvaswrap.attr("data-master-pages-order")?$canvaswrap.attr("data-master-pages-order").split(","):new Array,masterpages:{},getMasterPageName:function(e){return e in this.masterpages?this.masterpages[e].name:void 0},getPageObjById:function(e){if(e in this.pages||e in this.masterpages){var a={};return a[e]=this.pages[e]||this.masterpages[e],a}},getChildObjById:function(e){if(e in this.pages||e in this.masterpages){var a={};return a[e]=this.pages[e]||this.masterpages[e],a}},getThisObj:function(){return this.masterpages},getActivepageName:function(){var e=this.activepage.id;return this[this.activepage.type]&&this[this.activepage.type][e]?this[this.activepage.type][e].name:void 0},ifMasterAppliedToActivepage:function(e){return app.activepage.position.top?this[this.activepage.type][this.activepage.id].masterPages&&this[this.activepage.type][this.activepage.id].masterPages.includes(e):void 0},toggleActivepageVisibility:function(e,a,t,i){if(t=t||this.activepage.id,void 0===i)var i=!this.pages[t].hidden||!1;if($.observable(app.pages[t]).setProperty({hidden:i}),$("#"+t).attr("data-hidden",i),this.pages[t].hasOwnProperty("children")){var s=this;$.each(this.pages[t].children,function(e,a){s.toggleActivepageVisibility(null,null,a,i)})}},getShowBtnVis:function(){return this.pages[this.activepage.id].parent&&this.pages[this.pages[this.activepage.id].parent].hidden?1:0},handleMasterWithActivepage:function(e){this.ifMasterAppliedToActivepage(e)?this.removeMasterFromPage(e):this.applyMasterToPage(e)},applyMasterAttr:function(e){e=e||this.activepage.id;var a=this.pages[e].masterPages;a=a.join()||!1,a?$("#"+e).attr("data-applied-master",a):$("#"+e).removeAttr("data-applied-master")},applyMasterToPage:function(e,a,t){if(a=a||this.activepage.id,this.pages[a].masterPages||(this.pages[a].masterPages=new Array),!this.pages[a].masterPages.includes(e)){if($.observable(app.pages[a].masterPages).insert(e),$.observable(app.pages[a]).setProperty("hasMaster",app.pages[a].hasMaster+1),this.applyMasterAttr(a),t&&void 0!==this.pages[a].children){var i=this;$.each(this.pages[a].children,function(a,t){i.applyMasterToPage(e,t,!0)})}showMasterpage(a,e)}},removeMasterFromPage:function(e,a,t){a=a||this.activepage.id,$.observable(app.pages[a].masterPages).remove(app.pages[a].masterPages.indexOf(e));var i=app.pages[a].masterPages,s=i.length;if(i=i.join()||!1,i?($("#"+a).attr("data-applied-master",i),$.observable(app.pages[a]).setProperty("hasMaster",s)):($("#"+a).removeAttr("data-applied-master"),$.observable(app.pages[a]).setProperty("hasMaster",0)),$("#"+a).removeAttr("data-m-pos-y-"+e+" data-m-pos-x-"+e),removeGuides($("#"+e+" > .wire")),t&&this.pages[a].hasOwnProperty("children")){var p=this;$.each(this.pages[a].children,function(a,t){p.removeMasterFromPage(e,t,!0)})}},getContextMenuPos:function(){var e,a="pages"===app.activepage.type,t=a?216:148,i=this.activepage.position.top+t;return e=i>this.windowData.height?this.windowData.height-t-(a?60:50):this.activepage.position.top-60},getContextSubMenuPos:function(){var e=this.getContextMenuPos(),a=e+212+28*Object.keys(this.masterpages).length;return a>this.windowData.height?-(a-this.windowData.height+36):0},getMasterContextMenuPos:function(e){var a=this.activepage.contextMenuPos.y+206,t=this.activepage.contextMenuPos.x+232;return{x:t>this.windowData.width?this.activepage.contextMenuPos.x-(t-this.windowData.width+20):this.activepage.contextMenuPos.x,y:a>this.windowData.height?this.activepage.contextMenuPos.y-(a-this.windowData.height+20):this.activepage.contextMenuPos.y}},inArr:function(e,a){return-1!==$.inArray(e,a)},getPagesArr:function(){return this.pagesOrder},getSelMasterName:function(){return this.activepage.masterpageSelected?this.masterpages[this.activepage.masterpageSelected].name:void 0},showMasterContextMenu:function(e){app.activepage.contextMenuPos||$.observable(app.activepage).setProperty({contextMenuPos:{x:e.clientX-30,y:50}})}},helpers={applyMasterToAll:function(){app.pages[app.activepage.id]||($.each(app.pages,function(e,a){a.id&&app.pages[a.id.toString()]&&-1==app.pages[a.id.toString()].masterPages.indexOf(app.activepage.id)&&app.applyMasterToPage(app.activepage.id,a.id.toString(),!1)}),helpers.hideContextMenu())},removeMasterFromAll:function(){app.pages[app.activepage.id]||($.each(app.pagesOrder,function(e,a){app.pages[a.toString()]&&0===app.pages[a.toString()].parent&&app.removeMasterFromPage(app.activepage.id,a.toString(),!0)}),helpers.hideContextMenu())},editSelMaster:function(){make_page_active(app.activepage.masterpageSelected,null,!0),$.observable(app.activepage).removeProperty("masterpageSelected")},deSelMaster:function(){deselectMaster()},addNewPage:function(e,a){if(!app.activepage["new"]){a.stopPropagation();var t="masterpages"===e,i=parseInt(+new Date*Math.random()*100).toString(36).slice(-8),s=activepage.data("template"),p=t?"New masterpage"+cntm++:"New page"+cntp++;app.activepage.existingName=p;var r=t&&$("#canvas .masterpage").length?$("#canvas .masterpage").last().attr("id"):app.pagesOrder[app.pagesOrder.length-1];$("#"+r).after($("<div>").addClass(function(){var e="page";return t&&(e+=" masterpage"),e}).attr({id:i,"data-pagename":p,"data-page-height":$canvaswrap.height(),"data-page-width":$canvaswrap.width(),"data-template":s,"data-hidden":!1,"data-orientation":$canvaswrap.attr("data-orientation")})),$.observable(app[e]).setProperty(i,{id:i,name:p,hidden:!1,parent:0,childrenCount:0,masterPages:[i],hasMaster:0,"page-height":$canvaswrap.height(),"page-width":$canvaswrap.width(),template:s,orientation:$canvaswrap.attr("data-orientation")}),$.observable(app.activepage).setProperty({type:e,id:i,"new":1}),make_page_active(i),$("input#new-page").focus().select()}},deletePage:function(){if($(".sitemap li").length>1){if(window.confirm("Are you sure that you want to delete this page? If it contains any nested pages, they will be removed as well.")){removePageById(app.activepage.id);var e=$("#sitemaplist").find("li").eq(0).attr("data-pageid");make_page_active(e)}}else alert("You can't delete the only page in the project")},deleteMasterPage:function(){if(window.confirm("Are you sure that you want to delete this masterpage?")){helpers.removeMasterFromAll(),$.observable(app.masterpages).removeProperty(app.activepage.id),$.observable(app.masterpagesOrder).remove(app.masterpagesOrder.indexOf(app.activepage.id));var e=app.masterpages,a=e[Object.keys(e)[0]].id||app.pagesOrder[0];helpers.hideContextMenu(),make_page_active(a)}},renamePage:function(){helpers.hideContextMenu(),$.observable(app.activepage).setProperty({editable:!0}),app.activepage.existingName=$(this).attr("title"),$("#sitemap-wrap").find("input[type=text]").select()},duplicatePage:function(){if(!app.activepage["new"]){var e=parseInt(+new Date*Math.random()*100).toString(36).slice(-8);marr=app.pages[app.activepage.id].masterPages.slice(0);var a=marr.indexOf(app.activepage.id);-1!==a&&(marr[a]=e);var t=$.extend({},app.pages[app.activepage.id],{id:e,masterPages:marr,name:app.pages[app.activepage.id].name+" Copy",childrenCount:0});delete t.children,$.observable(app.pages).setProperty(e,t);var i=activepage.clone();i.attr({id:e,"data-pagename":t.name,"data-applied-master":e}),prevId=app.activepage.id,$("#"+prevId).after(i),$.observable(app.pagesOrder).insert(app.pagesOrder.indexOf(this.activepage.id)+1,e),this.pages[e].parent&&$.observable(app.pages[app.pages[app.activepage.id].parent].children).insert(app.pages[app.pages[app.activepage.id].parent].children.indexOf(app.activepage.id)+1,e),make_page_active(e,!1),$.observable(app.activepage.position).setProperty("top",0)}},hideContextMenu:function(){$.observable(app.activepage.position).setProperty("top",0)},backToPrev:function(){activepage.add("#canvas > .master-on").find("[data-snap-mark-h] , [data-snap-mark-v]").removeAttr("data-snap-mark-h").removeAttr("data-snap-mark-v");var e=app.activepage.id;make_page_active(app.activepage.prevPage),selectMaster(null,e)},convertToMaster:function(){var e=app.activepage.id;if(app.pages[e]){var a=app.pages[e];if(app.pages[e].parent){var t=app.pages[e].parent;$.observable(app.pages[t].children).remove(app.pages[t].children.indexOf(e)),0===app.pages[t].children.length&&$.observable(app.pages[t]).removeProperty("children")}app.pages[e].children&&app.pages[e].children.length&&($.each(app.pages[e].children,function(a,t){app.pages[t].parent=0;var i=app.pagesOrder.indexOf(e)>=0?app.pagesOrder.indexOf(e):app.pagesOrder.length;$.observable(app.pagesOrder).insert(i,t)}),delete a.children),a.parent=0,delete a.masterPages,$.observable(app.masterpages).setProperty(e,a),$.observable(app.pages).removeProperty(e),$.observable(app.activepage).setProperty("type","masterpages"),$.observable(app.pagesOrder).remove(app.pagesOrder.indexOf(e)),$.observable(app.masterpagesOrder).insert(e),helpers.hideContextMenu(),$("#"+e).addClass("masterpage").off().insertAfter("#"+app.masterpagesOrder[app.masterpagesOrder.length-2]),$("#canvas .masterpage").hide(),make_page_active(e)}},applyAllMasterpagesToPage:function(e){e.stopPropagation(),$.each(app.masterpagesOrder,function(e,a){app.applyMasterToPage(a.toString(),app.activepage.id,0)}),helpers.refreshContextMenuMasterpagesList()},removeAllMasterpagesToPage:function(e){e.stopPropagation();var a=app.pages[app.activepage.id].masterPages.slice(0);$.each(a,function(e,a){a&&a!==app.activepage.id&&app.removeMasterFromPage(a.toString(),app.activepage.id,0)}),helpers.refreshContextMenuMasterpagesList()},refreshContextMenuMasterpagesList:function(){var e=app.activepage.position.top;$.observable(app.activepage.position).setProperty("top",0),$.observable(app.activepage.position).setProperty("top",e)},arrangeMaster:function(e){var a,t=app.pages[app.activepage.id].masterPages,i=t.indexOf(app.activepage.masterpageSelected),s=app.activepage.masterpageSelected;switch(e){case"0":a=0;break;case"1":case"-1":a=i+parseInt(e);break;default:a=app.activepage.masterpageSelected.length}$.observable(app.pages[app.activepage.id].masterPages).move(i,a),make_page_active(app.activepage.id,!1,!1,1),app.applyMasterAttr(app.activepage.id),helpers.hideMasterContextMenu(),selectMaster(null,s)},hideMasterContextMenu:function(){$.observable(app.activepage).removeProperty("contextMenuPos")},changePageType:function(e,a){$("#sitemap-wrap").attr("data-pagetype",e),blueSitemapInput()}},cntp=1,cntm=1;app.getContextMenuPos.depends=["activepage.position.top","windowData.height"],app.getMasterContextMenuPos.depends=["activepage.contextMenuPos","windowData.height",,"windowData.width"],app.getSelMasterName.depends=["activepage.masterpageSelected"],app.getContextSubMenuPos.depends=["activepage.position.top","masterpages","windowData.height"],app.ifMasterAppliedToActivepage.depends=["activepage.position.top","pages"],app.getPageObjById.depends=["pages"],app.getActivepageName.depends=["activepage.id","activepage.type","activepage.name"],app.getShowBtnVis.depends=["activepage.id","pagesOrder"],$.link(!0,$("#pagenametop"),app),function(e,a,t,i){function s(a,i){this.w=e(t),this.el=e(a),this.options=e.extend({},r,i),this.init()}var p=function(){var e=t.createElement("div"),i=t.documentElement;if(!("pointerEvents"in e.style))return!1;e.style.pointerEvents="auto",e.style.pointerEvents="x",i.appendChild(e);var s=a.getComputedStyle&&"auto"===a.getComputedStyle(e,"").pointerEvents;return i.removeChild(e),!!s}(),r={listNodeName:"ol",itemNodeName:"li",rootClass:"dd",listClass:"dd-list",itemClass:"dd-item",dragClass:"dd-dragel",handleClass:"dd-handle",collapsedClass:"dd-collapsed",placeClass:"dd-placeholder",fillClass:"dd-filler",noDragClass:"dd-nodrag",emptyClass:"dd-empty",parentClass:"dd-parent",expandBtnHTML:'<button data-action="expand" type="button">x</button>',collapseBtnHTML:'<button data-action="collapse" type="button">x</button>',group:0,maxDepth:16,threshold:1},n=e("#sitemaplist");s.prototype={init:function(){var a=this;a.reset(),a.el.data("nestable-group",this.options.group),a.placeEl=e('<div class="'+a.options.placeClass+'"/>'),a.fillEl=e('<li class="'+a.options.fillClass+'"/>'),e.each(this.el.find(a.options.itemNodeName),function(t,i){a.setParent(e(i))}),a.el.delegate("button","click",function(t){if(t.stopPropagation(),t.preventDefault(),!a.dragEl){var i=e(t.target),s=i.data("action"),p=i.parent(a.options.itemNodeName);"collapse"===s&&a.collapseItem(p),"expand"===s&&a.expandItem(p)}});var t,i,s,p=function(a){if(a.stopPropagation(),!e(a.target).is("button, .hidepage, .more-page-actions, .overlay, input, #context-menu-overlay, ol")&&!liDropped){var t=e(a.target).parent();t.is("li")&&t.data("pageid")!=app.activepage.id&&make_page_active(t.data("pageid"))}},r=function(t){var i=e(t.target);if(!i.hasClass(a.options.handleClass)){if(i.closest("."+a.options.noDragClass).length)return;i=i.closest("."+a.options.handleClass)}i.length&&!a.dragEl&&(a.isTouch=/^touch/.test(t.type),a.isTouch&&1!==t.touches.length||(t.preventDefault(),a.dragStart(t.touches?t.touches[0]:t)))},o=function(e){a.dragEl&&(e.preventDefault(),a.dragMove(e.touches?e.touches[0]:e))},d=!1,l=function(e){a.dragEl&&!d&&(e.preventDefault(),a.dragStop(e.touches?e.touches[0]:e))},g=!1;n.bind("mousedown",function(e){3!==e.which&&(t=!1,g=!0,liDropped=!1,i=e.clientY,s=e.clientX)}),n.bind("mousemove",function(e){var a=Math.round(Math.sqrt(Math.pow(i-e.clientY,2)+Math.pow(s-e.clientX,2)));!g||previewMode||5>a||(t||r(e),t=!0,o(e))}),n.add(".overlay,.pane-t .addpage-wrap, .sitemap, .pane-b .addpage-wrap, .slide-right #top").bind("mouseup",function(e){var a=t;t=!1,a||liDropped?l(e):(e.stopPropagation(),p(e)),g=!1})},serialize:function(){var a,t=0,i=this;return step=function(a,t){var s=[],p=a.children(i.options.itemNodeName);return p.each(function(){var a=e(this),p=e.extend({},a.data()),r=a.children(i.options.listNodeName);r.length&&(p.children=step(r,t+1)),s.push(p)}),s},a=step(i.el.find(i.options.listNodeName).first(),t)},serialise:function(){return this.serialize()},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0},this.isTouch=!1,this.moving=!1,this.dragEl=null,this.dragRootEl=null,this.dragDepth=0,this.hasNewRoot=!1,this.pointEl=null,this.data={}},expandItem:function(a){a.removeClass(this.options.collapsedClass),e("#"+a.attr("data-pageid")).removeClass("tree-collapsed"),a.children('[data-action="expand"]').hide(),a.children('[data-action="collapse"]').show(),a.children(this.options.listNodeName).show()},collapseItem:function(a){var t=a.children(this.options.listNodeName);t.length&&(a.addClass(this.options.collapsedClass),e("#"+a.attr("data-pageid")).addClass("tree-collapsed"),a.children('[data-action="collapse"]').hide(),a.children('[data-action="expand"]').show(),a.children(this.options.listNodeName).hide())},expandAll:function(){var a=this;a.el.find(a.options.itemNodeName).each(function(){a.expandItem(e(this))})},collapseAll:function(){var a=this;a.el.find(a.options.itemNodeName).each(function(){a.collapseItem(e(this))})},setParent:function(a){a.children(this.options.listNodeName).length&&(a.find("button").length||(a.prepend(e(this.options.expandBtnHTML)),a.prepend(e(this.options.collapseBtnHTML))),a.addClass(this.options.parentClass)),a.children('[data-action="expand"]').hide()},unsetParent:function(e){e.removeClass(this.options.collapsedClass).removeClass(this.options.parentClass),e.children("[data-action]").remove(),e.children(this.options.listNodeName).remove()},dragStart:function(a){var s=this.mouse,p=e(a.target),r=p.closest(this.options.itemNodeName);r.parents(".dd-parent").addClass("li-sorting"),this.fillEl.css({height:r.height()}).html(r.html()),r.hasClass(this.options.parentClass)?this.fillEl.addClass(this.options.parentClass):this.fillEl.removeClass(this.options.parentClass),r.hasClass(this.options.collapsedClass)?this.fillEl.addClass(this.options.collapsedClass):this.fillEl.removeClass(this.options.collapsedClass),this.placeEl.css("height",0).hide(),s.offsetX=a.offsetX!==i?a.offsetX:a.pageX-p.offset().left,s.offsetY=a.offsetY!==i?a.offsetY:a.pageY-p.offset().top,s.startX=s.lastX=a.pageX,s.startY=s.lastY=a.pageY,this.dragRootEl=this.el,this.dragEl=e(t.createElement(this.options.listNodeName)).addClass(this.options.listClass+" "+this.options.dragClass),this.dragEl.css("width",r.width()),r.after(this.fillEl),r.after(this.placeEl),r[0].parentNode.removeChild(r[0]),r.appendTo(this.dragEl),e(t.body).append(this.dragEl),this.dragEl.css({left:a.pageX-s.offsetX,top:a.pageY-s.offsetY});var n,o,d=this.dragEl.find(this.options.itemNodeName);for(n=0;n<d.length;n++)o=e(d[n]).parents(this.options.listNodeName).length,o>this.dragDepth&&(this.dragDepth=o)},dragStop:function(a){this.el.find(".li-sorting").removeClass("li-sorting");var t=this.data,i=this.dragEl.children(this.options.itemNodeName).first();e("#sitemaplist .li-highlight").removeClass("li-highlight"),this.lastHoveredLi=null,p&&p.data("hidden")&&(i.attr("data-hidden",!0),e("#"+i.data("pageid")).attr("data-hidden",!0)),this.hasNewRoot,1!=n.find("ol:empty").length||this.revert||(this.unsetParent(e("#sitemaplist ol:empty").parent()),this.fillEl.parent("ol").remove());{var s=e("#sitemaplist li").index(i);s>0?e("#sitemaplist li").eq(s-1).data("pageid"):-1}if(this.append){if(!this.pointEl)return void(this.append=!1);var p=this.pointEl.parent("li"),r=this.options,o=p.attr("data-pageid");list=p.find(r.listNodeName).last(),depth=this.placeEl.parents(r.listNodeName).length,depth+this.dragDepth<=r.maxDepth&&setNewParent(i.data("pageid"),p.attr("data-pageid")),this.append=!1}else{var o=this.placeEl.parents("li").first().attr("data-pageid")||0;setNewParent(i.data("pageid"),o,t)}this.fillEl.remove(),this.placeEl.remove(),this.dragEl.remove(),this.reset(),e.isEmptyObject(t)||movePage(i.data("pageid"),t)},dragMove:function(i){var s,r,n=this.options,o=this.mouse;this.revert=!1,this.dragEl.css({left:i.pageX-o.offsetX,top:i.pageY-o.offsetY}),o.lastX=o.nowX,o.lastY=o.nowY,o.nowX=i.pageX,o.nowY=i.pageY,o.distX=o.nowX-o.lastX,o.distY=o.nowY-o.lastY,o.lastDirX=o.dirX,o.lastDirY=o.dirY,o.dirX=0===o.distX?0:o.distX>0?1:-1,o.dirY=0===o.distY?0:o.distY>0?1:-1;var d=Math.abs(o.distX)>Math.abs(o.distY)?1:0;if(!o.moving)return o.dirAx=d,void(o.moving=!0);o.dirAx!==d?(o.distAxX=0,o.distAxY=0):(o.distAxX+=Math.abs(o.distX),0!==o.dirX&&o.dirX!==o.lastDirX&&(o.distAxX=0),o.distAxY+=Math.abs(o.distY),0!==o.dirY&&o.dirY!==o.lastDirY&&(o.distAxY=0)),o.dirAx=d;var l=!1;if(p||(this.dragEl[0].style.visibility="hidden"),this.pointEl=e(t.elementFromPoint(i.pageX-t.body.scrollLeft,i.pageY-(a.pageYOffset||t.documentElement.scrollTop))),p||(this.dragEl[0].style.visibility="visible"),this.pointEl.hasClass(n.emptyClass))l=!0;else if(!this.pointEl.length)return;var g=this.pointEl.closest("."+n.rootClass),c=this.dragRootEl.data("nestable-id")!==g.data("nestable-id");if(this.pointEl.hasClass(n.handleClass)){if(this.lastHoveredLi=this.pointEl.parent("li"),this.pointEl.parent("li").find("."+n.fillClass).length)return;this.pointEl.parent("li").is("li")&&!this.pointEl.parents(".dd-filler").length?(this.pointEl.addClass("li-highlight"),this.placeEl.hide()):(this.placeEl.show(),e("#sitemaplist .li-highlight").removeClass("li-highlight")),r=this.pointEl.parent("li"),r.hasClass(n.collapsedClass)?this.append=!1:(this.append=!0,c=!0,r.addClass("li-highlight"))}else{if(this.pointEl.hasClass(n.fillClass))return void this.placeEl.hide();if(this.append=!1,e("#sitemaplist .li-highlight").removeClass("li-highlight"),this.pointEl.is("li")&&(this.lastHoveredLi=this.pointEl),!this.lastHoveredLi||this.lastHoveredLi.parents(".dd-filler").length)return;var h=i.pageY<this.lastHoveredLi.offset().top+this.lastHoveredLi.height()/2&&o.distY<0,v=i.pageY>this.lastHoveredLi.offset().top+this.lastHoveredLi.height()/2&&o.distY>0;if(s=this.placeEl.parent(),this.lastHoveredLi.hasClass(n.fillClass)&&(!this.lastHoveredLi.siblings("li").length||this.fillEl.is(":last-child")))return this.placeEl.hide(),void(this.revert=!0);if(h&&!this.lastHoveredLi.prev(":visible").hasClass(n.fillClass))this.lastHoveredLi.before(this.placeEl),this.placeEl.show(),this.data={ref:this.lastHoveredLi.attr("data-pageid"),after:0};else{if(!v||this.lastHoveredLi.next(":visible").hasClass(n.fillClass)){if(!v&&!h)return;return void this.placeEl.hide()}this.lastHoveredLi.after(this.placeEl),this.placeEl.show(),this.data={ref:this.lastHoveredLi.attr("data-pageid"),after:1}}}}},e.fn.nestable=function(a){var t=this,i=this;return t.each(function(){var t=e(this).data("nestable");t?"string"==typeof a&&"function"==typeof t[a]&&(i=t[a]()):(e(this).data("nestable",new s(this,a)),e(this).data("nestable-id",(new Date).getTime()))}),i||t}}(window.jQuery||window.Zepto,window,document);var liDropped=!1;$("#collapse-expand").on("click",function(e){var a=$(e.target),t=a.data("action");"expand-all"===t&&$(".sitemap").nestable("expandAll"),"collapse-all"===t&&$(".sitemap").nestable("collapseAll"),a.hide().siblings().show()});var pagelist=$("#sitemaplist"),$masterpagelist=$("#masterpages-list"),masterTools=$("#mastertools"),pageTools=$("#pagetools");$body=$("body");var pageListTmpl=$.templates("#pageListTmpl"),masterpageLiTmpl=$.templates("#masterpageLiTmpl");if(multipaged){pagelist.empty(),$("#canvas .page").each(function(e){var a=$(this);a[0].hasAttribute("data-hidden")||a.attr("data-hidden",0);var t=a.attr("data-parent-id")||0;"0"===t&&(t=0);var i,s=a.attr("id").toString();if(a[0].hasAttribute("data-applied-master")){var p=a.attr("data-applied-master");i=p.split(","),i.includes(s)||i.unshift(s);var r=i.indexOf("false");-1!==r&&(i.splice(r,1),mAttrF=i.join()||!1,mAttrF?$("#"+s).attr("data-applied-master",mAttrF):$("#"+s).removeAttr("data-applied-master"))}else i=[s];var n=a.hasClass("masterpage");n||0!==t||app.pagesOrder.push(s);var o={id:s,name:a.attr("data-pagename"),hidden:"true"==a.attr("data-hidden"),parent:t,masterPages:i,hasMaster:i.length,"page-height":a.attr("data-page-height")||$canvaswrap.height(),"page-width":a.attr("data-page-width")||$canvaswrap.width(),template:a.attr("data-template"),orientation:a.attr("data-orientation")||"false"};if(t&&0!==t&&"0"!==t&&(t in app.pages||(app.pages[t]={}),app.pages[t].children=app.pages[t].children||new Array,app.pages[t].children.push(s)),n)var d="masterpages";else var d="pages";s in app.pages?$.extend(app[d][s],o):app[d][s]=o;var l=0!=t?pagelist.find("[data-pageid="+t+"]"):pagelist;n&&(l=$masterpagelist),0==t||l.find("ol").length||l.addClass("dd-parent").append("<ol>").addClass("dd-list"),0!=t&&(l=l.find("ol").first()),a.data("hidden")&&previewMode}),masterpageLiTmpl.link("#masterpagelist-wrap",app),pageListTmpl.link(pagelist,app),$("#sitemap-wrap").on("click",".more-actions",function(e){e.stopPropagation();var a=$(this).parents("li").attr("data-pageid"),t=void 0!==app.pages[a]?"pages":"masterpages";$.observable(app.activepage).setProperty({type:t,id:a,"position.top":$(this).offset().top}),make_page_active(a,$(this).offset().top)}).on("contextmenu",".dd-handle",function(e){
e.preventDefault(),e.stopPropagation();var a=$(this).parents("li").attr("data-pageid"),t=void 0!==app.pages[a]?"pages":"masterpages";$.observable(app.activepage).setProperty({type:t,id:a,"position.top":$(this).offset().top})});var pagesContextMenuTmpl=$.templates("#pagesContextMenuTmpl");pagesContextMenuTmpl.link("#pagesContextMenu-wrap",app,helpers),$.templates("#pagenameTmpl").link("#pagenametop",app,helpers),previewMode&&!pagelist.find("li").length&&pagelist.append("No published pages."),$(".sitemap").nestable().perfectScrollbar({handlers:["click-rail","drag-scrollbar","keyboard","wheel"]}),$(".share-export").perfectScrollbar({handlers:["click-rail","drag-scrollbar","keyboard","wheel"]}),$(".options").perfectScrollbar({handlers:["click-rail","drag-scrollbar","keyboard","wheel"]}),previewMode&&pagelist.find(".dd-parent").each(function(e,a){$(a).find("> ol li:not([data-hidden=true])").length||$(a).removeClass("dd-parent").find(" > ol, button").remove()}),pagelist.find(".tree-collapsed button[data-action=collapse]").click()}else{$(".options").perfectScrollbar({handlers:["click-rail","drag-scrollbar","keyboard","wheel"]});var w=parseInt($canvaswrap.width(),10)+250;w<$(window).width()&&(w=$(window).width()),supercanvas.css({width:w+"px",height:parseInt($canvaswrap.height(),10)+750+"px"})}$("#context-menu-overlay").on("click contextmenu",function(e){e.stopPropagation(),e.preventDefault(),$.observable(app.activepage.position).setProperty({top:0})}),$(".pagelist-btn").bind("click",function(){$("body").toggleClass("show-sitemap")}),$(".delete-page").click(function(){}),$("#masterpagelist-wrap").perfectScrollbar({handlers:["click-rail","drag-scrollbar","keyboard","wheel"]}).on("click","li",function(e){if(!$(e.target).hasClass("more-actions")){var a=$(e.target).parents("li").attr("data-pageid");$(e.target).is("input")||$(e.target).is(".overlay")||app.activepage.id==a||make_page_active(a)}}),window.addEventListener("resize",$.throttle(800,function(){$.observable(app.windowData).setProperty({height:$(this).height(),width:$(this).width()})})),$("#sitemap-wrap").on("click","li.li-activepage .dd-handle",function(e){$.observable(app.activepage).setProperty({editable:!0}),app.activepage.existingName=$(this).attr("title"),$("#sitemap-wrap").find("input[type=text]").select()}).on("keydown","input[type=text]",function(e){(13===e.keyCode||27===e.keyCode)&&blueSitemapInput()}).on("click","ol .overlay",function(e){blueSitemapInput()}),$("#mastertools, #addpagebtn, #addmasterpagebtn, #delete-master-page, .has-helper").link(!0,app,helpers),$("#delete-master-page").on("click",helpers.deleteMasterPage),$.observable(app.pages).observeAll(function(e,a){a&&"name"==a.path&&($("#"+app.activepage.id).attr("data-pagename",a.value),$.observable(app.activepage).setProperty("name",a.value)),a&&"hasMaster"==a.path&&make_page_active(app.activepage.id)}),$.observable(app.masterpages).observeAll(function(e,a){"name"==a.path&&($("#"+app.activepage.id).attr("data-pagename",a.value),$.observable(app.activepage).setProperty("name",a.value))}),$.observable(app.masterpagesOrder).observeAll(function(e,a){var t=app.masterpagesOrder;t=t.join()||!1,t?$canvaswrap.attr("data-master-pages-order",t):$canvaswrap.removeAttr("data-master-pages-order")}),$("#masterpages-context-menu").on("click","li",function(e){e.stopPropagation()}),$(".pane-b").on("contextmenu",function(e){e.preventDefault()}),previewMode||$canvaswrap.on("mouseup",".master-on",function(e){draggingInProgress||previewMode||selectMaster(e.target,null,e)}).on("contextmenu",".master-on",function(e){$guidesHV.hide(),$.observable(app.activepage).setProperty({contextMenuPos:{x:e.clientX,y:e.clientY},masterpageSelected:$(e.target).attr("id")})}).on("dblclick",".master-on",function(e){$.observable(app.activepage).removeProperty("masterpageSelected"),$canvaswrap.removeClass("master-selected"),make_page_active($(e.target).attr("id"),null,!0)}),$.templates("#selectedMasterToolbarTmpl").link("#selected-master-toolbar",app,helpers),$("#next").click(function(){var e;e=findNextVisiblePage(),e.length&&make_page_active(e)}),$("#prev").click(function(){var e=findNextVisiblePage(1);e&&make_page_active(e)});var liArr,pLiArr;pLiArr=getPagesOrder(),multipaged||(make_page_active("#canvas"),supercanvas.css({height:$(this).height(),width:$(this).width()})),$.link(!0,"#sel-master-page",app);