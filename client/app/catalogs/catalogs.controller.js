
(function () {
'use strict';

angular.module('metaqrcodeApp')
    .controller('CatalogsCtrl', CatalogsCtrl);

	CatalogsCtrl.$inject=['dataservice','ModalService','$rootScope','NgTableParams','logger'];
    
    /* @ngInject */
    function CatalogsCtrl(dataservice,ModalService,$rootScope,NgTableParams,logger) {
        var vm = this;
        vm.catalogs = [];
        vm.activeCatalog=null;
        vm.newCatalog={};
        vm.userLogged=false;
        vm.searchCriteria=null;
        vm.tableParams=null;
        vm.mine=false;

        vm.search=search;
        vm.showModal=showModal;
        vm.showModalVote=showModalVote;
        vm.showModalDetail=showModalDetail;
        vm.showMine=showMine;
        vm.showAll=showAll;
        vm.deleteCatalog=deleteCatalog;

        activate();

        /////////////////////////////////////////////////////////////////////////////////////////////////
        function activate() {
            vm.searchCriteria={
                rowPerPage:10,
                currentPage:0,
                totalPages:0,
                query:''
            };
            search();


            vm.userLogged=$rootScope.globals.metaqrcodeUser==null?"":$rootScope.globals.metaqrcodeUser.email;
        }
        function search(){
            vm.tableParams=new NgTableParams({count:vm.searchCriteria.rowPerPage}, {
                counts: [10, 30, 50],
                getData: function(params) {
                    return dataservice.getCatalogs(params.page()-1,params.count(),vm.searchCriteria.query,vm.mine).then(function(data){
                        params.total(data.rowTotal); // recal. page nav controls
                        return data.result;
                    }, function (jqXHR, textStatus, errorThrown) {
                    	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                    		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                    	} else {
                            logger.error(textStatus + " : " + errorThrown.toLocaleString());
                    	}
                    });
                }
            });
        }
        function deleteCatalog(activeCatalog){
        	if (!vm.userLogged) return;
            ModalService.showModal({
                templateUrl: "app/yesno/yesno.html",
                controller: "YesNoController",
                inputs: {
                    title: "Please confirm",
                    body: "Are you sure do you want to delete this XSD Catalog?"
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                	if (result) {
	                	dataservice.deleteCatalog(activeCatalog.id).then(function(data){
	                    	search();
	                    }, function (jqXHR, textStatus, errorThrown) {
	                    	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
	                    		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
	                    	} else {
	                            logger.error(textStatus + " : " + errorThrown.toLocaleString());
	                    	}
	                    });
                	}
                }, function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });
            }, function (jqXHR, textStatus, errorThrown) {
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
            	} else {
                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
            	}
            });
        }
        function showMine(){
        	vm.mine=true;
        	search();
        }
        function showAll(){
        	vm.mine=false;
        	search();
        }
        function showModal(){
            ModalService.showModal({
                templateUrl: "app/catalogs/catalogForm.html",
                controller: "CatalogsModalCtrl",
                inputs: {
                    title: "Add a new XSD catalog"
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.catalog.name) {
                        vm.newCatalog = result.catalog;
                        vm.catalogs.push(vm.newCatalog);
                        vm.newCatalog = {};
                    }
                }, function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });
            }, function (jqXHR, textStatus, errorThrown) {
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
            	} else {
                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
            	}
            });
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
                }, function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });
            }, function (jqXHR, textStatus, errorThrown) {
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
            	} else {
                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
            	}
            });
        }
        function showModalDetail(activeCatalog){
            ModalService.showModal({
                templateUrl: "app/catalogs/catalogDetail.html",
                controller: "CatalogsModalDetailCtrl",
                inputs: {
                    title: "XSD catalog detail",
                    activeCatalog:activeCatalog
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                }, function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });
            }, function (jqXHR, textStatus, errorThrown) {
            	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
            		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
            	} else {
                    logger.error(textStatus + " : " + errorThrown.toLocaleString());
            	}
            });
        }
    }
})();