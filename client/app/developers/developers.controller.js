(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('DevelopersCtrl', DevelopersCtrl);

    function DevelopersCtrl(){
        var vm=this;
        vm.services=[];
        vm.qrcodeRepoUrl=null;
        vm.serviceText=null;
        activate();

        function activate(){
            /* activate sidebar */
            $('#sidebar').affix({
                offset: {
                    top: 235
                }
            });

            /* activate scrollspy menu */
            var $body   = $(document.body);
            var navHeight = $('.navbar').outerHeight(true)+10;

            $body.scrollspy({
                target: '#leftCol',
                offset: navHeight
            });

            /* smooth scrolling sections */
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 50
                        }, 1000);
                        return false;
                    }
                }
            });
            vm.qrcodeRepoUrl='http://www.metaqrcode.com/api/qr/22';
            vm.services.push(
                {
                    id:'sec0',
                    title:'Catalog Search',
                    url:'www.metaqrcode.com/api/rest/json/catalog/search',
                    accessToken:false,
                    parameters:[
                        {
                            name:'pageNumber',
                            type:'int',
                            description:'Current page',
                            required:false
                        },
                        {
                            name:'rowPerPage',
                            type:'int',
                            description:'Number of rows per page',
                            required:false
                        },
                        {
                            name:'nameLike',
                            type:'string',
                            description:'name query',
                            required:false
                        },
                        {
                            name:'descriptionLike',
                            type:'string',
                            description:'description query',
                            required:false
                        }
                    ],
                    method:'POST',
                    example:'function searchCatalog() { $.ajax(type:\"POST\",url:\"www.metaqrcode.com/api/rest/json/catalog/search\",data:{ pageNumber:0, rowPerPage:10, nameLike:\"\").done(function(response){ if(response.data.returnCode>0 { console.log(response.data.result);}})}'
                },
                {
                    id:'sec1',
                    title:'Catalog Upload',
                    url:'www.metaqrcode.com/api/rest/json/catalog/upload',
                    accessToken:true,
                    parameters:[
                        {
                            name:'xs',
                            type:'blob',
                            description:'file content',
                            required:true
                        },
                        {
                            name:'name',
                            type:'string',
                            description:'catalog name',
                            required:true
                        },
                        {
                            name: 'description',
                            type: 'string',
                            description: 'catalog description',
                            required: true
                        }
                    ],
                    method:'POST'
                },
                {
                    id:'sec2',
                    title:'Catalog Download',
                    url:'www.metaqrcode.com/api/rest/json/catalog/download',
                    accessToken:true,
                    parameters:[{
                        name:'id',
                        type:'string',
                        description:'catalog id',
                        required: true
                    }],
                    method:'POST'
                }
            );
            vm.serviceText=JSON.stringify(vm.services, null, 2);
        }
    }
})();
