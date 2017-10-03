import listGroupModule from './listgroup.module';
import listGroupTemplate from './listgroup.templ.html';

export default listGroupModule
    .component('listGroupComponent', {
        bindings: {
            // state: '@'
            onEdit: '&',
            onDelete: '&'
        },
        template: listGroupTemplate,
        controller: 'listGroupController'
    });