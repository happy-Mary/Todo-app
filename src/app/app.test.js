require('../main.module');

describe('window', function() {
  it('contains jasmine', function() {
    expect(typeof jasmine).toBe('object');
  });
  it('contains angular', function() {
    expect(typeof angular).toBe('object');
  });
  it('contains angular mock', function() {
    expect(typeof angular.mock).toBe('object');
  });
});

describe('mainModule', function(){
  beforeEach(angular.mock.module('mainModule'));

  let controller, createService;

  beforeEach(inject(function($controller){
    controller = $controller('AppController');
  }));

  beforeEach(inject(function($injector) {
    createService = function() {
    return $injector.get('localStorageService');        
    };
  }));

  it('has main controller', function(){
    expect(controller).toBeDefined();
  });

  it('service has get and set methods', function() {
    var service = createService();
    expect(service.get).toBeDefined();
    expect(service.set).toBeDefined();
  });
          
});