!function(){function e(e){return e.type==CKEDITOR.NODE_TEXT&&0<e.getLength()&&(!o||!e.isReadOnly())}function t(e){return!(e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary(CKEDITOR.tools.extend({},CKEDITOR.dtd.$empty,CKEDITOR.dtd.$nonEditable)))}function n(n,s){function l(n,o){var a=this,i=new CKEDITOR.dom.walker(n);i.guard=o?t:function(e){!t(e)&&(a._.matchBoundary=!0)},i.evaluator=e,i.breakOnFalse=1,n.startContainer.type==CKEDITOR.NODE_TEXT&&(this.textNode=n.startContainer,this.offset=n.startOffset-1),this._={matchWord:o,walker:i,matchBoundary:!1}}function c(e,t){var o=n.createRange();return o.setStart(e.textNode,t?e.offset:e.offset+1),o.setEndAt(n.editable(),CKEDITOR.POSITION_BEFORE_END),o}function u(e){var t=n.getSelection().getRanges()[0],o=n.editable();return t&&!e?(e=t.clone(),e.collapse(!0)):(e=n.createRange(),e.setStartAt(o,CKEDITOR.POSITION_AFTER_START)),e.setEndAt(o,CKEDITOR.POSITION_BEFORE_END),e}var d=new CKEDITOR.style(CKEDITOR.tools.extend({attributes:{"data-cke-highlight":1},fullMatch:1,ignoreReadonly:1,childRule:function(){return 0}},n.config.find_highlight,!0));l.prototype={next:function(){return this.move()},back:function(){return this.move(!0)},move:function(e){var t=this.textNode;if(null===t)return a.call(this);if(this._.matchBoundary=!1,t&&e&&0<this.offset)this.offset--;else if(t&&this.offset<t.getLength()-1)this.offset++;else{for(t=null;!(t||(t=this._.walker[e?"previous":"next"].call(this._.walker),this._.matchWord&&!t||this._.walker._.end)););this.offset=(this.textNode=t)&&e?t.getLength()-1:0}return a.call(this)}};var p=function(e,t){this._={walker:e,cursors:[],rangeLength:t,highlightRange:null,isMatched:0}};p.prototype={toDomRange:function(){var e=n.createRange(),t=this._.cursors;if(1>t.length){var o=this._.walker.textNode;if(!o)return null;e.setStartAfter(o)}else o=t[0],t=t[t.length-1],e.setStart(o.textNode,o.offset),e.setEnd(t.textNode,t.offset+1);return e},updateFromDomRange:function(e){var t=new l(e);this._.cursors=[];do e=t.next(),e.character&&this._.cursors.push(e);while(e.character);this._.rangeLength=this._.cursors.length},setMatched:function(){this._.isMatched=!0},clearMatched:function(){this._.isMatched=!1},isMatched:function(){return this._.isMatched},highlight:function(){if(!(1>this._.cursors.length)){this._.highlightRange&&this.removeHighlight();var e=this.toDomRange(),t=e.createBookmark();d.applyToRange(e,n),e.moveToBookmark(t),this._.highlightRange=e,t=e.startContainer,t.type!=CKEDITOR.NODE_ELEMENT&&(t=t.getParent()),t.scrollIntoView(),this.updateFromDomRange(e)}},removeHighlight:function(){if(this._.highlightRange){var e=this._.highlightRange.createBookmark();d.removeFromRange(this._.highlightRange,n),this._.highlightRange.moveToBookmark(e),this.updateFromDomRange(this._.highlightRange),this._.highlightRange=null}},isReadOnly:function(){return this._.highlightRange?this._.highlightRange.startContainer.isReadOnly():0},moveBack:function(){var e=this._.walker.back(),t=this._.cursors;return e.hitMatchBoundary&&(this._.cursors=t=[]),t.unshift(e),t.length>this._.rangeLength&&t.pop(),e},moveNext:function(){var e=this._.walker.next(),t=this._.cursors;return e.hitMatchBoundary&&(this._.cursors=t=[]),t.push(e),t.length>this._.rangeLength&&t.shift(),e},getEndCharacter:function(){var e=this._.cursors;return 1>e.length?null:e[e.length-1].character},getNextCharacterRange:function(e){var t,n;return n=this._.cursors,n=(t=n[n.length-1])&&t.textNode?new l(c(t)):this._.walker,new p(n,e)},getCursors:function(){return this._.cursors}};var h=function(e,t){var n=[-1];t&&(e=e.toLowerCase());for(var o=0;o<e.length;o++)for(n.push(n[o]+1);0<n[o+1]&&e.charAt(o)!=e.charAt(n[o+1]-1);)n[o+1]=n[n[o+1]-1]+1;this._={overlap:n,state:0,ignoreCase:!!t,pattern:e}};h.prototype={feedCharacter:function(e){for(this._.ignoreCase&&(e=e.toLowerCase());;){if(e==this._.pattern.charAt(this._.state))return this._.state++,this._.state==this._.pattern.length?(this._.state=0,2):1;if(!this._.state)return 0;this._.state=this._.overlap[this._.state]}},reset:function(){this._.state=0}};var m=/[.,"'?!;: \u0085\u00a0\u1680\u280e\u2028\u2029\u202f\u205f\u3000]/,f=function(e){if(!e)return!0;var t=e.charCodeAt(0);return 9<=t&&13>=t||8192<=t&&8202>=t||m.test(e)},g={searchRange:null,matchRange:null,find:function(e,t,o,a,i,r){this.matchRange?(this.matchRange.removeHighlight(),this.matchRange=this.matchRange.getNextCharacterRange(e.length)):this.matchRange=new p(new l(this.searchRange),e.length);for(var s=new h(e,!t),d=0,m="%";null!==m;){for(this.matchRange.moveNext();(m=this.matchRange.getEndCharacter())&&(d=s.feedCharacter(m),2!=d);)this.matchRange.moveNext().hitMatchBoundary&&s.reset();if(2==d){if(o){var g=this.matchRange.getCursors(),v=g[g.length-1],g=g[0],E=n.createRange();if(E.setStartAt(n.editable(),CKEDITOR.POSITION_AFTER_START),E.setEnd(g.textNode,g.offset),g=E,v=c(v),g.trim(),v.trim(),g=new l(g,!0),v=new l(v,!0),!f(g.back().character)||!f(v.next().character))continue}return this.matchRange.setMatched(),!1!==i&&this.matchRange.highlight(),!0}}return this.matchRange.clearMatched(),this.matchRange.removeHighlight(),!(!a||r)&&(this.searchRange=u(1),this.matchRange=null,arguments.callee.apply(this,Array.prototype.slice.call(arguments).concat([!0])))},replaceCounter:0,replace:function(e,t,a,i,r,s,l){if(o=1,e=0,this.matchRange&&this.matchRange.isMatched()&&!this.matchRange._.isReplaced&&!this.matchRange.isReadOnly()){if(this.matchRange.removeHighlight(),t=this.matchRange.toDomRange(),a=n.document.createText(a),!l){var c=n.getSelection();c.selectRanges([t]),n.fire("saveSnapshot")}t.deleteContents(),t.insertNode(a),l||(c.selectRanges([t]),n.fire("saveSnapshot")),this.matchRange.updateFromDomRange(t),l||this.matchRange.highlight(),this.matchRange._.isReplaced=!0,this.replaceCounter++,e=1}else e=this.find(t,i,r,s,!l);return o=0,e}},v=n.lang.find;return{title:v.title,resizable:CKEDITOR.DIALOG_RESIZE_NONE,minWidth:350,minHeight:170,buttons:[CKEDITOR.dialog.cancelButton(n,{label:n.lang.common.close})],contents:[{id:"find",label:v.find,title:v.find,accessKey:"",elements:[{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtFindFind",label:v.findWhat,isChanged:!1,labelLayout:"horizontal",accessKey:"F"},{type:"button",id:"btnFind",align:"left",style:"width:100%",label:v.find,onClick:function(){var e=this.getDialog();g.find(e.getValueOf("find","txtFindFind"),e.getValueOf("find","txtFindCaseChk"),e.getValueOf("find","txtFindWordChk"),e.getValueOf("find","txtFindCyclic"))||alert(v.notFoundMsg)}}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(v.findOptions),style:"margin-top:29px",children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"txtFindCaseChk",isChanged:!1,label:v.matchCase},{type:"checkbox",id:"txtFindWordChk",isChanged:!1,label:v.matchWord},{type:"checkbox",id:"txtFindCyclic",isChanged:!1,"default":!0,label:v.matchCyclic}]}]}]},{id:"replace",label:v.replace,accessKey:"M",elements:[{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtFindReplace",label:v.findWhat,isChanged:!1,labelLayout:"horizontal",accessKey:"F"},{type:"button",id:"btnFindReplace",align:"left",style:"width:100%",label:v.replace,onClick:function(){var e=this.getDialog();g.replace(e,e.getValueOf("replace","txtFindReplace"),e.getValueOf("replace","txtReplace"),e.getValueOf("replace","txtReplaceCaseChk"),e.getValueOf("replace","txtReplaceWordChk"),e.getValueOf("replace","txtReplaceCyclic"))||alert(v.notFoundMsg)}}]},{type:"hbox",widths:["230px","90px"],children:[{type:"text",id:"txtReplace",label:v.replaceWith,isChanged:!1,labelLayout:"horizontal",accessKey:"R"},{type:"button",id:"btnReplaceAll",align:"left",style:"width:100%",label:v.replaceAll,isChanged:!1,onClick:function(){var e=this.getDialog();for(g.replaceCounter=0,g.searchRange=u(1),g.matchRange&&(g.matchRange.removeHighlight(),g.matchRange=null),n.fire("saveSnapshot");g.replace(e,e.getValueOf("replace","txtFindReplace"),e.getValueOf("replace","txtReplace"),e.getValueOf("replace","txtReplaceCaseChk"),e.getValueOf("replace","txtReplaceWordChk"),!1,!0););g.replaceCounter?(alert(v.replaceSuccessMsg.replace(/%1/,g.replaceCounter)),n.fire("saveSnapshot")):alert(v.notFoundMsg)}}]},{type:"fieldset",label:CKEDITOR.tools.htmlEncode(v.findOptions),children:[{type:"vbox",padding:0,children:[{type:"checkbox",id:"txtReplaceCaseChk",isChanged:!1,label:v.matchCase},{type:"checkbox",id:"txtReplaceWordChk",isChanged:!1,label:v.matchWord},{type:"checkbox",id:"txtReplaceCyclic",isChanged:!1,"default":!0,label:v.matchCyclic}]}]}]}],onLoad:function(){var e,t=this,n=0;this.on("hide",function(){n=0}),this.on("show",function(){n=1}),this.selectPage=CKEDITOR.tools.override(this.selectPage,function(o){return function(a){o.call(t,a);var s,l=t._.tabs[a];if(s="find"===a?"txtFindWordChk":"txtReplaceWordChk",e=t.getContentElement(a,"find"===a?"txtFindFind":"txtFindReplace"),t.getContentElement(a,s),l.initialized||(CKEDITOR.document.getById(e._.inputId),l.initialized=!0),n){var c;a="find"===a?1:0;var u,l=1-a,d=r.length;for(u=0;u<d;u++)s=this.getContentElement(i[a],r[u][a]),c=this.getContentElement(i[l],r[u][l]),c.setValue(s.getValue())}}})},onShow:function(){g.searchRange=u();var e=this.getParentEditor().getSelection().getSelectedText(),t=this.getContentElement(s,"find"==s?"txtFindFind":"txtFindReplace");t.setValue(e),t.select(),this.selectPage(s),this[("find"==s&&this._.editor.readOnly?"hide":"show")+"Page"]("replace")},onHide:function(){var e;g.matchRange&&g.matchRange.isMatched()&&(g.matchRange.removeHighlight(),n.focus(),(e=g.matchRange.toDomRange())&&n.getSelection().selectRanges([e])),delete g.matchRange},onFocus:function(){return"replace"==s?this.getContentElement("replace","txtFindReplace"):this.getContentElement("find","txtFindFind")}}}var o,a=function(){return{textNode:this.textNode,offset:this.offset,character:this.textNode?this.textNode.getText().charAt(this.offset):null,hitMatchBoundary:this._.matchBoundary}},i=["find","replace"],r=[["txtFindFind","txtFindReplace"],["txtFindCaseChk","txtReplaceCaseChk"],["txtFindWordChk","txtReplaceWordChk"],["txtFindCyclic","txtReplaceCyclic"]];CKEDITOR.dialog.add("find",function(e){return n(e,"find")}),CKEDITOR.dialog.add("replace",function(e){return n(e,"replace")})}();