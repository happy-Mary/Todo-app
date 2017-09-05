import listModule from './list.module';

export default listModule
.directive('toggleMenu', function(){
    return {
        // link: function(scope, elm){
        //     elm.on('click', function(ev){
        //         let elemArray = document.querySelector('.folders').querySelectorAll('.active-list');
        //         elemArray.forEach(function(item){
        //             item.classList.remove('active-list');
        //         });

        //         elm.addClass('active-list');              
        //     });
        // }
    };
});