import fileModule from './file.module';
import fileTemplate from './file.template.html';

export default fileModule.component('fileComp', {
    bindings: {
        file: '<'
    },
    template: fileTemplate,
    controller: 'fileController'
});