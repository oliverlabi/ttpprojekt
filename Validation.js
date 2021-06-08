class Validation extends CurriculumCalculator {
    /*removeSpecialChars(){
        let check = 0;
        for(var i = 0; i< this.bachelorsCurriculums.length();){
            if($("curriculum_dropdown").val() != this.bachelorsCurriculums[i]){
                i++;
            } else {
                check++;
                break;
            }
        }
        if(check < 1){
            for(var i = 0; i < this.mastersCurriculums.length();){
                if($("curriculum_dropdown").val() != this.mastersCurriculums[i]){
                    i++;
                } else {
                    check++;
                    break;   
                }
            }
        }
        if(check == 0){
            return 0;
        } else {
            return 1;
        }
            
    }*/
    
    inputValidation(check){
        let k1 = 0;
        let k2 = 0;
        let k3 = 0;
        let k4 = 0;
        let k5 = 0;
        if($("#curriculum_attendance").val() > 0){
            k1 = 1;
        }
        if($("#sabbatical_leave").val() < 0 || $("#sabbatical_leave").val() < $("#curriculum_attendance").val()){
            k2 = 1;
        }
        if($("#ects_count").val() > 0){
            k3 = 1;
        }
        if($("input[name='studied_abroad']:checked").val() == "yes"){
            if($("#abroad_semester_count").val() > 0){
                k4 = 1;
            }
            if($("#abroad_ects_count").val() > 0){
                k5 = 1;
            }
        } else {
            k4 = 1;
            k5 = 1;
        }
        if(k1+k2+k3+k4+k5 != 5){
            Validation.prototype.errorMessages(k1, k2, k3, k4, k5);
            return 0;
        } else {
            return 1;
        }
        
    }

    errorMessages(k1, k2, k3, k4, k5){
        if(k1 == 0){
            $("#error").html("");
            $("#error").append("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");
            $("#result_error").html("");
            $("#result_error").append("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");
            console.log("siin");
            k1 = 1;
        }
        if(k2 == 0){
            $("#error").html("");
            $("#error").append("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");
            $("#result_error").html("");
            $("#result_error").append("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");
            k2 = 1;
        }
        if(k3 == 0){
            $("#error").html("");
            $("#error").append("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");
            $("#result_error").html("");
            $("#result_error").append("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");
            k3 = 1;
        }
        if(k4 == 0){
            $("#error").html("");
            $("#error").append("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");
            $("#result_error").html("");
            $("#result_error").append("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");
            k4 = 1;
        }
        if(k5 == 0){
            $("#error").html("");
            $("#error").append("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");
            $("#result_error").html("");
            $("#result_error").append("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");
            k5 = 1;
        }
    }
}

