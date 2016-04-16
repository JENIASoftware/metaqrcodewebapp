(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('FaqCtrl',FaqCtrl);

    function FaqCtrl(){
        var vm=this;
        vm.model=null;

        activate();

        function activate(){
            vm.model=getModel();
        }
        function getModel(){
            var model=[
                {
                    question:'How can i test METAQRCODE?',
                    answer:'We provide a test user : <br/>' +
                    		'email : test@test.it<br/>' +
                    		'password : test.it<br/>' +
                    		'<b>Note that XSD and XML uploaded with these credential will be periodically deleted</b>'
                },
                {
                    question:'Where can i use generated qrcode?',
                    answer:'There is no limit about qrcode usage. You can download and print generated qrcode everyware and anytime.'
                },
                {
                    question:'How can i read the qrcode?',
                    answer:'Generated qrcode is standard, you can use your preferred qrcode library or software to read it. <br/>'+
                    		'For example you can use <a href="https://github.com/zxing/zxing">zxing</a>.<br/>' +
                    		'You can find sample java code using zxing to read qrcode here : <a href="https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-scanner">https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-scanner</a>'
                },
                {
                    question:'Why i need to sign up?',
                    answer:'We do not accept XML metadata uploading or XSD catalog configuration by anonymous users.<br/>'+
                    		'If you need to upload XSD or XML you have to be signed into METAQRCODE. If you only need to read METAQRCODE content (XML) no login is needed.'
                },
                {
                    question:'Which login method are supported?',
                    answer:'There are three way to login into METAQRCODE : openid connect, google login or REST API.<br/>'+
                    		'Whether you use openid connect, google or REST API, you allwayis need a userid and a password and, also, you need a clientid and a clientsecret.<br/>'+
                    		'Preferred way to signin is openid connect but REST API are simplest.'
                },
                {
                    question:'Everyone can read my XML metadata?',
                    answer:'When you upload XML metadata you can specify if it is private (personal) or public. If you upload XML metadata as public (not personal) everyone is reading qrcode can access your XML metadata.<br/>'+
                    	   'If your metadata are private (personal), then you need to be logged in to read it.'
                },
                {
                    question:'There are limitation about XML metadata i can upload?',
                    answer:'The only limitation is that XML metadata have to comply with a given XSD.'
                },
                {
                    question:'There are limitation about XSD catalog i can upload?',
                    answer:'There are no limitation about XSD uploaded into METAQRCODE, the only thing to pay attention is to use allwayis URL references.<br/>' +
                    		'The best way to understand this point is to see some examples. You can fine that here : <br/>' +
                    		'<a href="https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-catalog/src/main/resources">https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-catalog/src/main/resources</a>'
                },
                {
                    question:'How can i upload XML metadata and generate qrcode?',
                    answer:'All services are provided as REST service. You can find all provided url here : <br/><a href="https://github.com/JENIASoftware/metaqrcode#user-content-7-rest-api-descriptors">https://github.com/JENIASoftware/metaqrcode#user-content-7-rest-api-descriptors</a>.<br/>'+
                    		'You can find html/javascript sample code here : <br/><a href="https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-js/src/main/webapp">https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-js/src/main/webapp</a>.<br/>'+
                    		'You can find java sample code here : <br/><a href="https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-java">https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-client/metaqrcode-client-java</a>.<br/>'+
                    		'DTO used by REST services are described as java code in this project : <br/><a href="https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-dto">https://github.com/JENIASoftware/metaqrcode/tree/master/metaqrcode-dto</a>'
                    		
                },
                {
                    question:'I have to pay anytime i print the qrcode?',
                    answer:'No, <a href="/#/pricing">pricing policy</a> are referrred to XML metadata upload, not to qrcode download and/or print.'
                },
                {
                    question:'METAQRCODE is available only as a service?',
                    answer:'No, if your organization need to use metaqrcode as an own service, we can provide you a server installation. Pleas <a href="mailto:info@jenia.it?subject=[METAQRCODE] More info needed">contact us</a> to have more info.'
                },
                {
                    question:'Where can i find privacy policy?',
                    answer:'You can find our privacy policy <a href="#/privacy">here</a>.'
                },
                {
                    question:'Where can i find METAQRCODE terms of services?',
                    answer:'You can find our terms of services <a href="#/termsConditions">here</a>.'
                }
            ];
            return model;
        }
    }


})();

