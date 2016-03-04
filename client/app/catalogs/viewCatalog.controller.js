(function(){
    'use strict';
    angular.module('metaqrcodeApp')
        .controller('ViewCatalogCtrl',ViewCatalogCtrl);

    ViewCatalogCtrl.$inject=['dataservice','$stateParams','ModalService','$rootScope'];
    function ViewCatalogCtrl(dataservice,$stateParams,ModalService,$rootScope){
        var vm=this;
        vm.catalog=null;
        vm.userLogged=false;
        vm.showModalVote=showModalVote;

        activate();
        ////////////////////////////////////////////////////////////////////////////////////////
        function activate(){
            dataservice.getCatalog($stateParams.id)
                .then(function(response){
                    vm.catalog=response.catalogEntry;
                    dataservice.downloadCatalog(vm.catalog.id)
                        .then(function(response, textStatus, jqXHR){
                            vm.catalog.text=jqXHR.responseText;
                        }, function (jqXHR, textStatus, errorThrown) {
                        	vm.dataLoading = false;
                        	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                                return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                        	} else {
                                return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                        	}
                        });
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                	}
                });
            vm.userLogged=$rootScope.globals.metaqrcodeUser==null?"":$rootScope.globals.metaqrcodeUser.email;
        }
        
        function showModalVote(activeCatalog){
        	if (!vm.userLogged) return;
            ModalService.showModal({
                templateUrl: "app/catalogs/catalogVote.html",
                controller: "CatalogsModalVoteCtrl",
                inputs: {
                    title: "Vote this XSD catalog",
                    activeCatalog:activeCatalog
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                $("#jRate").jRate({
                	startColor: '#FC6000',
            		endColor: '#FC6000',
            		backgroundColor: 'rgb(221, 221, 221)',
            		precision: 1,
            		min: 0,
            		max: 5,
//            		strokeColor: '#FC6000',
//            		backgroundColor: '#FC6000',
        			onSet: function(rating) {
        				$('#stars').val(rating);
        			}
        		});
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.catalog.name) {
                        vm.newCatalog = result.catalog;
                        vm.catalogs.push(vm.newCatalog);
                        vm.newCatalog = {};
                    }
                }, function (jqXHR, textStatus, errorThrown) {
                	vm.dataLoading = false;
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                        return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
                	} else {
                        return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
                	}
                });
            }, function (jqXHR, textStatus, errorThrown) {
            	vm.dataLoading = false;
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                    return vm.error = "" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason;
            	} else {
                    return vm.error=textStatus + " : " + errorThrown.toLocaleString();;
            	}
            });
        }

    }
})();
