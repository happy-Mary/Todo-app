import listModule from './list.module';
import listTemplate from './list.templ.html';

export default listModule
    .component('listComp', {
        bindings: {
            filterId: '<',
            onEdit: '&',
            onDelete: '&',
            onContextMenu: '&'
        },
        controller: 'listController',
        template: listTemplate
    });