(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{G8AK:function(l,n,u){"use strict";u.r(n),u.d(n,"ProductsModuleNgFactory",function(){return sl});var t=u("8Y7J");class e{}var i=u("pMnS"),o=u("4BU0"),r=u("VYMa"),s=u("Z+H9"),d=u("zy28"),c=u("SVse"),a=u("iInd");class p{constructor(){}ngOnInit(){}}var g=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,13,"a",[["class","list-group-item clearfix"],["routerlinkActive","active"],["style","cursor: pointer;"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t["\u0275nov"](l,1).onClick(u.button,u.ctrlKey,u.shiftKey,u.altKey,u.metaKey)&&e),e},null,null)),t["\u0275did"](1,671744,null,0,a.r,[a.o,a.a,c.j],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](2,1),(l()(),t["\u0275eld"](3,0,null,null,8,"div",[["class","pull-left"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"h4",[["class","list-group-item-heading"]],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["PRODUCT ID : ",""])),(l()(),t["\u0275eld"](6,0,null,null,1,"p",[["class","list-group-item-text"]],null,null,null,null,null)),(l()(),t["\u0275ted"](7,null,["Name : ",""])),(l()(),t["\u0275eld"](8,0,null,null,1,"p",[["class","list-group-item-text"]],null,null,null,null,null)),(l()(),t["\u0275ted"](9,null,["Description : ",""])),(l()(),t["\u0275eld"](10,0,null,null,1,"p",[["class","list-group-item-text"]],null,null,null,null,null)),(l()(),t["\u0275ted"](11,null,["Price : ",""])),(l()(),t["\u0275eld"](12,0,null,null,1,"span",[["class","pull-right"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,0,"img",[["class","img-responsive"],["style","height: 120px;width: 120px;"]],[[8,"src",4],[8,"alt",0]],null,null,null,null))],function(l,n){var u=l(n,2,0,n.component.product.id);l(n,1,0,u)},function(l,n){var u=n.component;l(n,0,0,t["\u0275nov"](n,1).target,t["\u0275nov"](n,1).href),l(n,5,0,u.product.id),l(n,7,0,u.product.name),l(n,9,0,u.product.description),l(n,11,0,u.product.price),l(n,13,0,t["\u0275inlineInterpolate"](1,"",u.product.imagePath,""),t["\u0275inlineInterpolate"](1,"",u.product.name,""))})}var h=u("abRS"),m=u("xkgV"),f=u("0Hjp");class b{constructor(l,n,u){this.router=l,this.route=n,this.store=u,this.isLoading=!1,this.error=null,this.productsVisibility=!0,this.page=1,this.count=0,this.tableSize=4}ngOnInit(){this.store.dispatch(new f.m),this.products||this.store.dispatch(new f.l({pgNo:0,item_count:4})),this.sub_fetchCount=this.store.select("products").subscribe(l=>{this.count=l.prod_total_count,this.products=l.products,this.productsVisibility=l.visibility,this.table_config={id:"basicPaginate",itemsPerPage:this.tableSize,currentPage:this.page,totalItems:this.count}})}onShow(){this.productsVisibility=!0,this.store.dispatch(new f.m),this.store.dispatch(new f.l({pgNo:0,item_count:this.tableSize})),this.sub_fetchCount=this.store.select("products").subscribe(l=>{this.count=l.prod_total_count,this.products=l.products,this.productsVisibility=l.visibility,this.error=l.prodError,this.isLoading=l.prodLoading}),this.reloadCurrentRoute()}reloadCurrentRoute(){let l=this.router.url;this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>{this.router.navigate([l])})}onHide(){this.productsVisibility=!1,this.store.dispatch(new f.v(!1))}onNew(){this.productsVisibility=!1,this.store.dispatch(new f.v(!1)),this.router.navigate(["new"],{relativeTo:this.route})}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe(),this.pre_subscription&&this.pre_subscription.unsubscribe(),this.sub_fetchCount&&this.sub_fetchCount.unsubscribe()}onTableDataChange(l){this.store.dispatch(new f.l({pgNo:l-1,item_count:this.tableSize})),this.store.select("products").subscribe(n=>{this.products=n.products,this.table_config={id:"basicPaginate",itemsPerPage:this.tableSize,currentPage:l,totalItems:this.count}})}onHandleError(){this.store.dispatch(new f.d)}}var C=u("tqRt"),w=t["\u0275crt"]({encapsulation:0,styles:[[".grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;grid-gap:10px}.btn_c[_ngcontent-%COMP%]{display:flex;justify-content:center}"]],data:{}});function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-alert",[],null,[[null,"close"]],function(l,n,u){var t=!0;return"close"===n&&(t=!1!==l.component.onHandleError()&&t),t},o.c,o.b)),t["\u0275did"](1,49152,null,0,r.a,[],{message:[0,"message"]},{close:"close"})],function(l,n){l(n,1,0,n.component.error)},null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["style","text-align: center;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"app-loading-spinner",[],null,null,null,s.b,s.a)),t["\u0275did"](2,49152,null,0,d.a,[],null,null)],null,null)}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"app-product-item",[],null,null,null,v,g)),t["\u0275did"](2,114688,null,0,p,[],{product:[0,"product"]},null)],function(l,n){l(n,2,0,n.context.$implicit)},null)}function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","d-flex justify-content-center"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"pagination-controls",[["autoHide","true"],["directionLinks","true"],["id","basicPaginate"],["nextLabel","Next"],["previousLabel","Prev"],["responsive","true"],["screenReaderPaginationLabel","Pagination"]],null,[[null,"pageChange"]],function(l,n,u){var t=!0;return"pageChange"===n&&(t=!1!==l.component.onTableDataChange(u)&&t),t},h.b,h.a)),t["\u0275did"](3,49152,null,0,m.c,[],{id:[0,"id"],directionLinks:[1,"directionLinks"],autoHide:[2,"autoHide"],responsive:[3,"responsive"],previousLabel:[4,"previousLabel"],nextLabel:[5,"nextLabel"],screenReaderPaginationLabel:[6,"screenReaderPaginationLabel"]},{pageChange:"pageChange"}),(l()(),t["\u0275eld"](4,0,null,null,3,"div",[["class","grid"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,2,null,I)),t["\u0275did"](6,278528,null,0,c.l,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](0,m.b,[m.e])],function(l,n){var u=n.component;l(n,3,0,"basicPaginate","true","true","true","Prev","Next","Pagination"),l(n,6,0,t["\u0275unv"](n,6,0,t["\u0275nov"](n,7).transform(u.products,u.table_config)))},null)}function R(l){return t["\u0275vid"](0,[(l()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](1,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](3,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,9,"div",[["class","row-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,2,"div",[["class","col-xs-4 btn_c"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,1,"button",[["class","btn btn-success"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onShow()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Show Products"])),(l()(),t["\u0275eld"](8,0,null,null,2,"div",[["class","col-xs-4 btn_c"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,1,"button",[["class","btn btn-danger"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onHide()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Hide Products"])),(l()(),t["\u0275eld"](11,0,null,null,2,"div",[["class","col-xs-4 btn_c"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-success"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onNew()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["New Product"])),(l()(),t["\u0275eld"](14,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](16,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](18,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,1,0,u.error),l(n,3,0,u.isLoading),l(n,18,0,u.productsVisibility)},null)}class _{constructor(l){this.store=l,this.isLoading=!1,this.error=null}ngOnInit(){this.store.select("products").subscribe(l=>{this.flag=!!l.products,this.error=l.prodError}),this.store.dispatch(new f.v(this.flag))}onHandleError(){this.store.dispatch(new f.d)}}var k=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function E(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-alert",[],null,[[null,"close"]],function(l,n,u){var t=!0;return"close"===n&&(t=!1!==l.component.onHandleError()&&t),t},o.c,o.b)),t["\u0275did"](1,49152,null,0,r.a,[],{message:[0,"message"]},{close:"close"})],function(l,n){l(n,1,0,n.component.error)},null)}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["style","text-align: center;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"app-loading-spinner",[],null,null,null,s.b,s.a)),t["\u0275did"](2,49152,null,0,d.a,[],null,null)],null,null)}function T(l){return t["\u0275vid"](0,[(l()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](1,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](3,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t["\u0275did"](5,212992,null,0,a.t,[a.b,t.ViewContainerRef,t.ComponentFactoryResolver,[8,null],t.ChangeDetectorRef],null,null),(l()(),t["\u0275eld"](6,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"app-product-list",[],null,null,null,R,w)),t["\u0275did"](8,245760,null,0,b,[a.o,a.a,C.l],null,null)],function(l,n){var u=n.component;l(n,1,0,u.error),l(n,3,0,u.isLoading),l(n,5,0),l(n,8,0)},null)}function L(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-products",[],null,null,null,T,k)),t["\u0275did"](1,114688,null,0,_,[C.l],null,null)],function(l,n){l(n,1,0)},null)}var O=t["\u0275ccf"]("app-products",_,L,{},{},[]);class V{constructor(){}ngOnInit(){}}var D=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function N(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"h3",[["style","color: snow; text-align: center;"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Manage Your Products"]))],null,null)}function F(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-product-start",[],null,null,null,N,D)),t["\u0275did"](1,114688,null,0,V,[],null,null)],function(l,n){l(n,1,0)},null)}var M=t["\u0275ccf"]("app-product-start",V,F,{},{},[]),j=u("s7LF"),H=u("Kj3r"),z=u("/uUt"),U=u("lJxs");class q{constructor(l,n,u){this.route=l,this.router=n,this.store=u,this.editMode=!1}ngOnDestroy(){this.storeSub&&this.storeSub.unsubscribe()}ngOnInit(){this.route.params.subscribe(l=>{this.id=+l.id,this.editMode=null!=l.id,this.initForm()}),this.productForm.get("price").valueChanges.pipe(Object(H.a)(500),Object(z.a)()).subscribe(l=>{l<0?(this.store.dispatch(new f.n("Price cannot be Negative Value.")),this.productForm.get("price").setErrors({incorrect:!0})):this.productForm.get("price").setErrors(null)})}onSubmit(){this.store.dispatch(this.editMode?new f.x({index:this.id,newProduct:this.productForm.value}):new f.b(this.productForm.value)),this.router.navigate(["../"],{relativeTo:this.route})}onCancel(){this.router.navigate(["../"],{relativeTo:this.route})}initForm(){let l=0,n="",u="",t="",e=null;this.editMode&&(this.storeSub=this.store.select("products").pipe(Object(U.a)(l=>(localStorage.setItem("productsState",JSON.stringify(l)),l.products.find((l,n)=>l.id===this.id)))).subscribe(i=>{l=i.id,n=i.name,t=i.imagePath,u=i.description,e=i.price})),this.productForm=new j.j({id:new j.g(l),name:new j.g(n,j.z.required),description:new j.g(u,j.z.required),imagePath:new j.g(t,j.z.required),price:new j.g(e,j.z.required)})}}var A=t["\u0275crt"]({encapsulation:0,styles:[["input.ng-invalid.ng-touched[_ngcontent-%COMP%], textarea.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}label[_ngcontent-%COMP%]{color:snow}"]],data:{}});function J(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,9,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,1,"label",[["for","id"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["ID : "])),(l()(),t["\u0275eld"](5,0,null,null,5,"input",[["class","form-control"],["formControlName","id"],["id","id"],["type","text"]],[[8,"readOnly",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t["\u0275nov"](l,6)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,6).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,6)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,6)._compositionEnd(u.target.value)&&e),e},null,null)),t["\u0275did"](6,16384,null,0,j.d,[t.Renderer2,t.ElementRef,[2,j.a]],null,null),t["\u0275prd"](1024,null,j.o,function(l){return[l]},[j.d]),t["\u0275did"](8,671744,null,0,j.i,[[3,j.c],[8,null],[8,null],[6,j.o],[2,j.C]],{name:[0,"name"]},null),t["\u0275prd"](2048,null,j.p,null,[j.i]),t["\u0275did"](10,16384,null,0,j.q,[[4,j.p]],null,null)],function(l,n){l(n,8,0,"id")},function(l,n){l(n,5,0,!0,t["\u0275nov"](n,10).ngClassUntouched,t["\u0275nov"](n,10).ngClassTouched,t["\u0275nov"](n,10).ngClassPristine,t["\u0275nov"](n,10).ngClassDirty,t["\u0275nov"](n,10).ngClassValid,t["\u0275nov"](n,10).ngClassInvalid,t["\u0275nov"](n,10).ngClassPending)})}function K(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,62,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,61,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,60,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,u){var e=!0,i=l.component;return"submit"===n&&(e=!1!==t["\u0275nov"](l,4).onSubmit(u)&&e),"reset"===n&&(e=!1!==t["\u0275nov"](l,4).onReset()&&e),"ngSubmit"===n&&(e=!1!==i.onSubmit()&&e),e},null,null)),t["\u0275did"](3,16384,null,0,j.E,[],null,null),t["\u0275did"](4,540672,null,0,j.k,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),t["\u0275prd"](2048,null,j.c,null,[j.k]),t["\u0275did"](6,16384,null,0,j.r,[[4,j.c]],null,null),(l()(),t["\u0275and"](16777216,null,null,1,null,J)),t["\u0275did"](8,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](9,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,9,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"label",[["for","name"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Name"])),(l()(),t["\u0275eld"](14,0,null,null,5,"input",[["class","form-control"],["formControlName","name"],["id","name"],["placeholder","Enter Product's Name"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t["\u0275nov"](l,15)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,15).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,15)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,15)._compositionEnd(u.target.value)&&e),e},null,null)),t["\u0275did"](15,16384,null,0,j.d,[t.Renderer2,t.ElementRef,[2,j.a]],null,null),t["\u0275prd"](1024,null,j.o,function(l){return[l]},[j.d]),t["\u0275did"](17,671744,null,0,j.i,[[3,j.c],[8,null],[8,null],[6,j.o],[2,j.C]],{name:[0,"name"]},null),t["\u0275prd"](2048,null,j.p,null,[j.i]),t["\u0275did"](19,16384,null,0,j.q,[[4,j.p]],null,null),(l()(),t["\u0275eld"](20,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,9,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,1,"label",[["for","description"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Description"])),(l()(),t["\u0275eld"](25,0,null,null,5,"textarea",[["class","form-control"],["formControlName","description"],["id","description"],["placeholder","Enter Description"],["rows","6"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t["\u0275nov"](l,26)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,26).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,26)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,26)._compositionEnd(u.target.value)&&e),e},null,null)),t["\u0275did"](26,16384,null,0,j.d,[t.Renderer2,t.ElementRef,[2,j.a]],null,null),t["\u0275prd"](1024,null,j.o,function(l){return[l]},[j.d]),t["\u0275did"](28,671744,null,0,j.i,[[3,j.c],[8,null],[8,null],[6,j.o],[2,j.C]],{name:[0,"name"]},null),t["\u0275prd"](2048,null,j.p,null,[j.i]),t["\u0275did"](30,16384,null,0,j.q,[[4,j.p]],null,null),(l()(),t["\u0275eld"](31,0,null,null,10,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,9,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](33,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](34,0,null,null,1,"label",[["for","imagePath"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Image URL"])),(l()(),t["\u0275eld"](36,0,[["imagePath",1]],null,5,"input",[["class","form-control"],["formControlName","imagePath"],["id","imagePath"],["placeholder","Enter Image Path"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t["\u0275nov"](l,37)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,37).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,37)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,37)._compositionEnd(u.target.value)&&e),e},null,null)),t["\u0275did"](37,16384,null,0,j.d,[t.Renderer2,t.ElementRef,[2,j.a]],null,null),t["\u0275prd"](1024,null,j.o,function(l){return[l]},[j.d]),t["\u0275did"](39,671744,null,0,j.i,[[3,j.c],[8,null],[8,null],[6,j.o],[2,j.C]],{name:[0,"name"]},null),t["\u0275prd"](2048,null,j.p,null,[j.i]),t["\u0275did"](41,16384,null,0,j.q,[[4,j.p]],null,null),(l()(),t["\u0275eld"](42,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](43,0,null,null,1,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](44,0,null,null,0,"img",[["class","img-responsive"]],[[8,"src",4]],null,null,null,null)),(l()(),t["\u0275eld"](45,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](46,0,null,null,10,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](47,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](48,0,null,null,1,"label",[["for","price"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Price"])),(l()(),t["\u0275eld"](50,0,null,null,6,"input",[["class","form-control"],["formControlName","price"],["id","price"],["min","0"],["placeholder","Enter Price Amount"],["step","1"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t["\u0275nov"](l,51)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,51).onTouched()&&e),"compositionstart"===n&&(e=!1!==t["\u0275nov"](l,51)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t["\u0275nov"](l,51)._compositionEnd(u.target.value)&&e),"input"===n&&(e=!1!==t["\u0275nov"](l,52).onChange(u.target.value)&&e),"blur"===n&&(e=!1!==t["\u0275nov"](l,52).onTouched()&&e),e},null,null)),t["\u0275did"](51,16384,null,0,j.d,[t.Renderer2,t.ElementRef,[2,j.a]],null,null),t["\u0275did"](52,16384,null,0,j.v,[t.Renderer2,t.ElementRef],null,null),t["\u0275prd"](1024,null,j.o,function(l,n){return[l,n]},[j.d,j.v]),t["\u0275did"](54,671744,null,0,j.i,[[3,j.c],[8,null],[8,null],[6,j.o],[2,j.C]],{name:[0,"name"]},null),t["\u0275prd"](2048,null,j.p,null,[j.i]),t["\u0275did"](56,16384,null,0,j.q,[[4,j.p]],null,null),(l()(),t["\u0275eld"](57,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](58,0,null,null,4,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](59,0,null,null,1,"button",[["class","btn btn-success"],["type","submit"]],[[8,"disabled",0]],null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Save"])),(l()(),t["\u0275eld"](61,0,null,null,1,"button",[["class","btn btn-danger"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onCancel()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancel"]))],function(l,n){var u=n.component;l(n,4,0,u.productForm),l(n,8,0,u.editMode),l(n,17,0,"name"),l(n,28,0,"description"),l(n,39,0,"imagePath"),l(n,54,0,"price")},function(l,n){var u=n.component;l(n,2,0,t["\u0275nov"](n,6).ngClassUntouched,t["\u0275nov"](n,6).ngClassTouched,t["\u0275nov"](n,6).ngClassPristine,t["\u0275nov"](n,6).ngClassDirty,t["\u0275nov"](n,6).ngClassValid,t["\u0275nov"](n,6).ngClassInvalid,t["\u0275nov"](n,6).ngClassPending),l(n,14,0,t["\u0275nov"](n,19).ngClassUntouched,t["\u0275nov"](n,19).ngClassTouched,t["\u0275nov"](n,19).ngClassPristine,t["\u0275nov"](n,19).ngClassDirty,t["\u0275nov"](n,19).ngClassValid,t["\u0275nov"](n,19).ngClassInvalid,t["\u0275nov"](n,19).ngClassPending),l(n,25,0,t["\u0275nov"](n,30).ngClassUntouched,t["\u0275nov"](n,30).ngClassTouched,t["\u0275nov"](n,30).ngClassPristine,t["\u0275nov"](n,30).ngClassDirty,t["\u0275nov"](n,30).ngClassValid,t["\u0275nov"](n,30).ngClassInvalid,t["\u0275nov"](n,30).ngClassPending),l(n,36,0,t["\u0275nov"](n,41).ngClassUntouched,t["\u0275nov"](n,41).ngClassTouched,t["\u0275nov"](n,41).ngClassPristine,t["\u0275nov"](n,41).ngClassDirty,t["\u0275nov"](n,41).ngClassValid,t["\u0275nov"](n,41).ngClassInvalid,t["\u0275nov"](n,41).ngClassPending),l(n,44,0,t["\u0275nov"](n,36).value),l(n,50,0,t["\u0275nov"](n,56).ngClassUntouched,t["\u0275nov"](n,56).ngClassTouched,t["\u0275nov"](n,56).ngClassPristine,t["\u0275nov"](n,56).ngClassDirty,t["\u0275nov"](n,56).ngClassValid,t["\u0275nov"](n,56).ngClassInvalid,t["\u0275nov"](n,56).ngClassPending),l(n,59,0,!u.productForm.valid)})}function B(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-product-edit",[],null,null,null,K,A)),t["\u0275did"](1,245760,null,0,q,[a.a,a.o,C.l],null,null)],function(l,n){l(n,1,0)},null)}var Y=t["\u0275ccf"]("app-product-edit",q,B,{},{},[]),$=u("3V6w"),G=u("eIep");class X{constructor(l,n,u,t){this.router=l,this.route=n,this.store=u,this.eRef=t,this.error=null,this.click_flag=!1}clickout(l){this.eRef.nativeElement.contains(l.target)||l.target.classList.contains("list-group-item")||l.target.classList.contains("list-group-item-heading")||l.target.classList.contains("list-group-item-text")||l.target.classList.contains("img-responsive")||l.target.classList.contains("pull-left")||(this.click_flag&&this.onCancelEditing(),this.click_flag=!0)}ngOnInit(){this.click_flag=!1,this.route.params.pipe(Object(U.a)(l=>+l.id),Object(G.a)(l=>(this.id=l,this.store.select("products"))),Object(U.a)(l=>l.products.filter((l,n)=>{if(this.id===l.id)return l}))).subscribe(l=>{this.product=l[0],window.scroll(0,0)}),this.store.dispatch(new f.s(this.product)),this.store.select("products").subscribe(l=>{this.error=l.prodError,localStorage.setItem("productsState",JSON.stringify(l))})}onAddToShoppingList(){}onEditProduct(){this.router.navigate(["edit"],{relativeTo:this.route})}onDeleteProduct(){this.store.dispatch(new f.f(this.product.id)),this.store.select("products").subscribe(l=>{this.error=l.prodError}),this.router.navigate(["../"],{relativeTo:this.route})}onCancelEditing(){this.router.navigate(["../"],{relativeTo:this.route})}onHandleError(){this.store.dispatch(new f.d)}}var Z=t["\u0275crt"]({encapsulation:0,styles:[["h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%]{color:snow}"]],data:{}});function Q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-alert",[],null,[[null,"close"]],function(l,n,u){var t=!0;return"close"===n&&(t=!1!==l.component.onHandleError()&&t),t},o.c,o.b)),t["\u0275did"](1,49152,null,0,r.a,[],{message:[0,"message"]},{close:"close"})],function(l,n){l(n,1,0,n.component.error)},null)}function W(l){return t["\u0275vid"](0,[(l()(),t["\u0275and"](16777216,null,null,1,null,Q)),t["\u0275did"](1,16384,null,0,c.m,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](2,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,2,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["ID : ",""])),(l()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,0,"img",[["class","img-responsive"],["style","max-height: 300px;"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,4,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t["\u0275ted"](12,null,["Name : ",""])),(l()(),t["\u0275eld"](13,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t["\u0275ted"](14,null,["Price : ",""])),(l()(),t["\u0275eld"](15,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](16,0,null,null,2,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,1,"button",[["class","btn btn-danger"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onCancelEditing()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Close Editing"])),(l()(),t["\u0275eld"](19,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,16,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,15,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,14,"div",[["appDropdown",""],["class","btn-group"]],[[2,"open",null]],[["document","click"]],function(l,n,u){var e=!0;return"document:click"===n&&(e=!1!==t["\u0275nov"](l,23).toggleOpen(u)&&e),e},null,null)),t["\u0275did"](23,16384,null,0,$.a,[t.ElementRef],null,null),(l()(),t["\u0275eld"](24,0,null,null,2,"button",[["class","btn btn-primary dropdown-toggle"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" Manage Product "])),(l()(),t["\u0275eld"](26,0,null,null,0,"span",[["class","caret"]],null,null,null,null,null)),(l()(),t["\u0275eld"](27,0,null,null,9,"ul",[["class","dropdown-menu"]],null,null,null,null,null)),(l()(),t["\u0275eld"](28,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t["\u0275eld"](29,0,null,null,1,"a",[["style","cursor: pointer;"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onAddToShoppingList()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["To shopping list"])),(l()(),t["\u0275eld"](31,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,1,"a",[["style","cursor: pointer;"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onEditProduct()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Edit Product"])),(l()(),t["\u0275eld"](34,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t["\u0275eld"](35,0,null,null,1,"a",[["style","cursor: pointer;"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.onDeleteProduct()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Delete Product"]))],function(l,n){l(n,1,0,n.component.error)},function(l,n){var u=n.component;l(n,5,0,u.product.id),l(n,8,0,u.product.imagePath,t["\u0275inlineInterpolate"](1,"",u.product.name,"")),l(n,12,0,u.product.name),l(n,14,0,u.product.price),l(n,22,0,t["\u0275nov"](n,23).isOpen)})}function ll(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-product-detail",[],null,[["document","click"]],function(l,n,u){var e=!0;return"document:click"===n&&(e=!1!==t["\u0275nov"](l,1).clickout(u)&&e),e},W,Z)),t["\u0275did"](1,114688,null,0,X,[a.o,a.a,C.l,t.ElementRef],null,null)],function(l,n){l(n,1,0)},null)}var nl=t["\u0275ccf"]("app-product-detail",X,ll,{},{},[]),ul=u("PCNd"),tl=u("P+IX"),el=u("IzEk"),il=u("7bNT");let ol=(()=>{class l{constructor(l,n){this.store=l,this.actions$=n}resolve(l,n){return this.store.select("products").pipe(Object(el.a)(1),Object(U.a)(l=>l.products))}}return l.\u0275prov=t["\u0275\u0275defineInjectable"]({factory:function(){return new l(t["\u0275\u0275inject"](C.l),t["\u0275\u0275inject"](il.a))},token:l,providedIn:"root"}),l})();class rl{}var sl=t["\u0275cmf"](e,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,o.a,O,M,Y,nl]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,c.o,c.n,[t.LOCALE_ID]),t["\u0275mpd"](4608,j.f,j.f,[]),t["\u0275mpd"](4608,j.B,j.B,[]),t["\u0275mpd"](4608,m.e,m.e,[]),t["\u0275mpd"](1073742336,a.s,a.s,[[2,a.y],[2,a.o]]),t["\u0275mpd"](1073742336,c.b,c.b,[]),t["\u0275mpd"](1073742336,ul.a,ul.a,[]),t["\u0275mpd"](1073742336,j.A,j.A,[]),t["\u0275mpd"](1073742336,j.w,j.w,[]),t["\u0275mpd"](1073742336,rl,rl,[]),t["\u0275mpd"](1073742336,m.a,m.a,[]),t["\u0275mpd"](1073742336,e,e,[]),t["\u0275mpd"](1024,a.m,function(){return[[{path:"",component:_,canActivate:[tl.a],children:[{path:"",component:V},{path:"new",component:q},{path:":id",component:X,resolve:[ol]},{path:":id/edit",component:q,resolve:[ol]}]}]]},[])])})}}]);