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
            vm.qrcodeRepoUrl='http://www.metaqrcode.com/api/qr/22';
            var catalogChilds=[
                {
                    id:'sec0-1',
                    title:'Search',
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
                    id:'sec0-2',
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
                    method:'POST',
                    example:'function searchCatalog() { $.ajax(type:\"POST\",url:\"www.metaqrcode.com/api/rest/json/catalog/search\",data:{ pageNumber:0, rowPerPage:10, nameLike:\"\").done(function(response){ if(response.data.returnCode>0 { console.log(response.data.result);}})}'
                },
                {
                    id:'sec0-3',
                    title:'Catalog Download',
                    url:'www.metaqrcode.com/api/rest/json/catalog/download',
                    accessToken:true,
                    parameters:[{
                        name:'id',
                        type:'string',
                        description:'catalog id',
                        required: true
                    }],
                    method:'POST',
                    example:'function searchCatalog() { $.ajax(type:\"POST\",url:\"www.metaqrcode.com/api/rest/json/catalog/search\",data:{ pageNumber:0, rowPerPage:10, nameLike:\"\").done(function(response){ if(response.data.returnCode>0 { console.log(response.data.result);}})}'
                }
            ];
            var repositoryChilds=[
                {
                    id:'sec1-1',
                    title:'Search',
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
                    id:'sec1-2',
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
                    method:'POST',
                    example:'function searchCatalog() { $.ajax(type:\"POST\",url:\"www.metaqrcode.com/api/rest/json/catalog/search\",data:{ pageNumber:0, rowPerPage:10, nameLike:\"\").done(function(response){ if(response.data.returnCode>0 { console.log(response.data.result);}})}'
                },
                {
                    id:'sec1-3',
                    title:'Catalog Download',
                    url:'www.metaqrcode.com/api/rest/json/catalog/download',
                    accessToken:true,
                    parameters:[{
                        name:'id',
                        type:'string',
                        description:'catalog id',
                        required: true
                    }],
                    method:'POST',
                    example:'function searchCatalog() { $.ajax(type:\"POST\",url:\"www.metaqrcode.com/api/rest/json/catalog/search\",data:{ pageNumber:0, rowPerPage:10, nameLike:\"\").done(function(response){ if(response.data.returnCode>0 { console.log(response.data.result);}})}'
                }
            ];
            vm.services.push(
                {
                    id:'sec0',
                    title:'Catalogs',
                    childs:catalogChilds
                },
                {
                    id:'sec1',
                    title:'Repositories',
                    childs:repositoryChilds
                }
            );
            vm.serviceText=JSON.stringify(vm.services, null, 2);
        }
    }
})();
