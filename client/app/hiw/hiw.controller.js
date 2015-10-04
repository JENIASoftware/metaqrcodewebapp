(function(){
    'use strict';

    angular.module('metaqrcodeApp')
        .controller('HiwCtrl',HiwCtrl);

    function HiwCtrl(){
        var vm=this;
        vm.model=null;

        activate();

        function activate(){
            vm.model=getModel();
        }
        function getModel(){
            var model=[
                {
                    title:'Put metadata in the real world!',
                    img:'assets/images/put_xml.jpg',
                    text:'Using METAQRCODE you can create your own XML metadata and put it in inside a QRCode.'+
                        'Reading QRCode you will have original metadata in XML format.'+
                        'Having XML metadata you can process it in a robust and efficient way; no semantic analysis.'+
                        'But how does it work?'
                },
                {
                    title:'Create your own XML metadata and upload it to METAQRCODE',
                    img:'assets/images/create_xml.jpg',
                    text:'METAQRCODE provides an XML schema (XSD) catalog that define metadata formats. You can use an existing XSD or upload a new one. When you upload your XML metadata METAQRCODE will validate XML and create your QRCode'
                },
                {
                    title:'Put the QRCode in the real world!',
                    img:'assets/images/use_qrcode.jpg',
                    text:'METAQRCODE has generated a QRCode for you. You can print your QRCode and use it in the real word. You can print it as a sticker, into a document, on some strange stuff as a bracelet, card... You can put your QRCode everywhere.XML metadata loaded into the METAQRCODE can describe the thing in the rear of the QRCode. There is no limit on the XML metadata you can put into the QRCode. XML metadata can refer to many XSD at the same time'
                },
                {
                    title:'Everyone can read METAQRCODE',
                    img:'assets/images/readqrcode.jpg',
                    text:'Reading QRCode is easy. You can do it in various way and using various technologies. QRCode technology is solid and robust. Use a mobile phone, a barcode gun, a scanner, a MFP, a custom app...'
                },
                {
                    title:'Do you already have a barcode?',
                    img:'assets/images/bind.jpg',
                    text:'Once you created your own METAQRCODE, you can bind it to an existing unique barcode (by ie EAN-13). So if your product is already delivered and you can not print a QRCode on it, you can still use your old unique barcode (or QRCode) and all METAQRCODE users can access metadata using an old barcode'
                },
                {
                    title:'Statistics, reports, compare and more...',
                    img:'assets/images/easy.jpg',
                    text:'Metadata about METAQRCODE are stored on server side. METAQRCODE API provide you a way to retrieve many information about saved metadata. These data can be used for many purposes : statistics, reports, compare, ranking, analysis...'
                }
            ];
            return model;
        }
    }


})();

