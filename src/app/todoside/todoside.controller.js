import todosideModule from './todoside.module';
import '../../sass/todoside.scss';

export default todosideModule.controller('todosideController', ['$state', 'todoService', function todosideController($state, todoService) {
    const self = this;
    self.task = todoService.getTodo($state.params.todoid);

    self.changeTodo = todoService.update;

    self.changeTodoTitle = (event) => {
        const currEl = angular.element(event.target);
        self.task.title = currEl.html();
        todoService.update();
    }

    self.handleEnterTitle = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }

    self.redirectToParent = () => {
        $state.go('^');
    }

}]);