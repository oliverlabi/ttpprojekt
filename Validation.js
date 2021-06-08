class Validation extends CurriculumCalculator {
    inputValidation(){
        if($("#curriculum_dropdown :selected").text() != "Vali õppekava..." && $("#curriculum_attendance").val() > 0 && $("#sabbatical_leave").val() >= 0 && $("#ects_count").val() > 0){
            if(this.checkRadioInputs() == 1){
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    checkRadioInputs(){
        let k1, k2, k3 = 0;
        if($("input[name='studied_abroad']:checked").val() == "yes"){
            k1 = this.checkStudiedAbroadInputs();
        } else if($("input[name='studied_abroad']:checked").val() == "no"){
            k1 = 1;
        }
        if($("input[name='studied_estonian']:checked").val() == "yes"){
            k2 = 1;
        } else if($("input[name='studied_estonian']:checked").val() == "no"){
            k2 = 1;
        }
        if($("input[name='current_sabbatical_leave']:checked").val() == "yes"){
            this.scenarioText = "Viibid hetkel akadeemilisel puhkusel.";
            this.currentSabbaticalLeave = 1;
            k3 = 1;
        } else if($("input[name='current_sabbatical_leave']:checked").val() == "no"){
            k3 = 1;
        }

        if(k1 == 1 && k2 == 1 && k3 == 1){
            return 1;
        } else {
            return 0;
        }
    }

    checkStudiedAbroadInputs(){
        if($("input[name='currently_studying_abroad']:checked").val() == "yes"){
            this.currentAbroadStudies = 1;
            return 1;
        } else if(this.abroadSemesterCount > 0 && this.abroadEctsCount > 0){
            return 1;
        } else {
            return 0;
        }
    }
}
