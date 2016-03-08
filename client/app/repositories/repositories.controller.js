(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('RepositoriesCtrl',RepositoriesCtrl);

    RepositoriesCtrl.$inject=['dataservice','$stateParams','ModalService','NgTableParams','$location','logger'];

    function RepositoriesCtrl(dataservice,$stateParams,ModalService,NgTableParams, $location, logger){
        var vm=this;
        vm.repositories = [];
        vm.activeRepository;
        vm.newRepository={};
        vm.searchCriteria=null;
        vm.activeFormat=null;
        vm.totalPages=totalPages;
        vm.showModal=showModal;
        vm.setActiveRepository = setActiveRepository;
        vm.search=search;
        vm.changeTextFormat=changeTextFormat;
        vm.deleteRepository=deleteRepository;
        vm.tableParams=null;

        activate();
        /////////////////////////////////////////////////////////////////////////////////
        function activate() {
            vm.searchCriteria={
                rowPerPage:5,
                currentPage:0,
                totalPages:0
            };
            search($stateParams.catalogEntryId);
        }
        function totalPages(){
            var ret=[];
            if(!vm.searchCriteria.totalPages) return 0;
            for(var i= 0;i<vm.searchCriteria.totalPages;i++){
                ret.push(i);
            }
            return ret;
        }
        function search(catalogEntryId){
            vm.tableParams=new NgTableParams({count:vm.searchCriteria.rowPerPage}, {
                counts: [5, 10, 20],
                getData: function(params) {
                    return dataservice.getRepositories(params.page()-1,params.count(),catalogEntryId).then(function(data){
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
        function deleteRepository(activeRepository){
            ModalService.showModal({
                templateUrl: "app/yesno/yesno.html",
                controller: "YesNoController",
                inputs: {
                    title: "Please confirm",
                    body: "Are you sure do you want to delete this XML Repository?"
                }
            }).then(function(modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();
                modal.close.then(function(result) {
                	if (result) {
	                	dataservice.deleteRepository(activeRepository.id).then(function(data){
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
        function setActiveRepository(repository) {
            vm.activeFormat='xml';
            dataservice.downloadRepository(repository.id)
                .then(function(response, textStatus, jqXHR){
                    vm.activeRepository.text=jqXHR.responseText;
                    vm.activeRepository = repository;
                }, function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });

        }
        function changeTextFormat(format){
            dataservice.downloadRepository(vm.activeRepository.id,format)
                .then(function(response, textStatus, jqXHR){
                    vm.activeRepository.text=format=='json'?JSON.stringify(jqXHR.responseText, null, 2): jqXHR.responseText;
                    vm.activeFormat=format;
                }, function (jqXHR, textStatus, errorThrown) {
                	if (jqXHR.responseJSON!=null && jqXHR.responseJSON.returnCode!=null) {
                		logger.error("" + jqXHR.responseJSON.returnCode + " : " + jqXHR.responseJSON.reason);
                	} else {
                        logger.error(textStatus + " : " + errorThrown.toLocaleString());
                	}
                });
        }
        function showModal(){
            ModalService.showModal({
                templateUrl: "app/repositories/repositoryModalForm.html",
                controller: "RepositoryModalCtrl",
                inputs: {
                    title: "Add a new XML repository",
                    action:'create',
                    repository:{}
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if(result.repository.qrcodeGet) {
                        vm.newRepository = result.repository;
                        vm.repositories.push(vm.newRepository);
                        vm.newRepository = {};
                        $location.path('/repositories/'+result.repository.id+'/view');
//                        angular.element(document.body).injector().get('AuthenticationService')
//                    	viewRepository({id:result.repository.id});
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
    }
})();


