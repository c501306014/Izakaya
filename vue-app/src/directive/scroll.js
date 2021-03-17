import Vue from 'vue';

Vue.directive('scroll', {
    inserted: function(el, binding){
        let f = function(evt){
            if(binding.value(evt, el)){
                removeEventListener('scroll', f);
            }
        }
        addEventListener('scroll', f);
    }
});