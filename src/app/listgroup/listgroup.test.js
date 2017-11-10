require('../../main.module');
import { URLS } from '../constants';

describe('listGroupModule', function(){
    beforeEach(angular.mock.module('mainModule'));
    beforeEach(angular.mock.module('listGroupModule'));

    describe('Controller', function(){
        let $httpBackend, ctrl, servise;

        beforeEach(inject(function($controller, _$httpBackend_, $injector){
            $httpBackend = _$httpBackend_;
            ctrl = $controller('listGroupController');
            servise = $injector.get('localStorageService');
        }));

        it('exists and gets data from LS', function() {
            expect(ctrl).toBeDefined();
                it('exists and gets data from LS', function() {
                    expect(servise.get('listGroups')).not.toBeNull();
                });
        });   
       
        it("can get data from server", function(){
            $httpBackend.expect('GET', URLS.listGroupURL).respond(200);
        });

        it("listgroup data exists", function(){
            expect(ctrl.listGroups).not.toBeNull();
        });
    });
});