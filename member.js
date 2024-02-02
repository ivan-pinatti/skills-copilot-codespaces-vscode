function skillsMember(){
    return{
        restrict: 'E',
        templateUrl: 'modules/skill/view/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}
