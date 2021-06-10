class Validation extends CurriculumCalculator {
    /*removeSpecialChars(){
        let check = 0;
        for(var i = 0; i< this.bachelorsCurriculums.length;){
            if($("curriculum_dropdown").val() != this.bachelorsCurriculums[i]){
                i++;
            } else {
                check++;
                break;
            }
        }
        if(check < 1){
            for(var i = 0; i < this.mastersCurriculums.length;){
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

    checkCurriculumDegree(){
        for(let i=0; i<this.mastersCurriculums.length; i++){
            if(this.mastersCurriculums[i] == this.curriculumChoice){
                this.degree = "masters";
                break;
            } else if (this.bachelorsCurriculums[i] == this.curriculumChoice){
                this.degree = "bachelors";
            }
        }
    }

    inputValidation(){
        let k1 = 0;
        let k2 = 0;
        let k3 = 0;
        let k4 = 0;
        let k5 = 0;
        let k6 = 0;
        if($("#curriculum_attendance").val() > 0){
            if(this.degree == "masters" && this.universityAttendance <= 8){
                k1 = 1;
            } else if (this.degree == "bachelors" && this.universityAttendance <= 12){
                k1 = 1;
            }
        }
        if($("#sabbatical_leave").val() >= 0 || $("#sabbatical_leave").val() <= $("#curriculum_attendance").val()){
            k2 = 1;
        }
        if($("#ects_count").val() > 0){
            if(this.degree == "masters" && $("#ects_count").val() <= 120){
                k3 = 1;
            } else if (this.degree == "bachelors" && $("#ects_count").val() <= 180){
                k3 = 1;
            }
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
        if($("input[name='current_sabbatical_leave']:checked").val() == "yes" && $("input[name='currently_studying_abroad']:checked").val() == "yes"){
            k6 = 0;
        } else {
            k6 = 1;
        }
        if(k1+k2+k3+k4+k5+k6 != 6){
            Validation.prototype.errorMessages(k1, k2, k3, k4, k5, k6);
            return 0;
        } else {
            return 1;
        }
        
    }

    errorMessages(k1, k2, k3, k4, k5, k6){
        if(k1 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters spent at TU must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of semesters spent at TU must not be 0!\n");
            $("#result_error").append("\nThe number of semesters spent at TU must not be 0!\n");*/
            k1 = 1;
        }
        if(k1 == 0){
            swal({
                title: "Viga!",
                text: "TLÜs viibitud semestrite arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");
            $("#result_error").append("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");*/
            k1 = 1;
        }
        if(k2 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters spent on academic leave must not exceed the number of semesters spent at TU!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of semesters spent on academic leave must not exceed the number of semesters spent at TU!\n");
            $("#result_error").append("\nThe number of semesters spent on academic leave must not exceed the number of semesters spent at TU!\n");*/
            k2 = 1;
        }
        if(k2 == 0){
            swal({
                title: "Viga!",
                text: "Akadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");
            $("#result_error").append("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");*/
            k2 = 1;
        }
        if(k3 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of credits to be taken into account for the completion of the curriculum must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of credits to be taken into account for the completion of the curriculum must not be 0!\n");
            $("#result_error").append("\nThe number of credits to be taken into account for the completion of the curriculum must not be 0!\n");*/
            k3 = 1;
        }
        if(k3 == 0){
            swal({
                title: "Viga!",
                text: "Õppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");
            $("#result_error").append("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");*/
            k3 = 1;
        }
        if(k4 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters spent studying abroad must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of semesters spent studying abroad must not be 0!\n");
            $("#result_error").append("\nThe number of semesters spent studying abroad must not be 0!\n");*/
            k4 = 1;
        }
        if(k4 == 0){
            swal({
                title: "Viga!",
                text: "Välisõppes viibitud semestrite arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");
            $("#result_error").append("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");*/
            k4 = 1;
        }
        if(k5 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of credits spent abroad must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of credits spent abroad must not be 0!\n");
            $("#result_error").append("\nThe number of credits spent abroad must not be 0!\n");*/
            k5 = 1;
        }
        if(k5 == 0){
            swal({
                title: "Viga!",
                text: "Välisõppes viibitud ainepunktide arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");
            $("#result_error").append("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");*/
            k5 = 1;
        }
        if(k6 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "Academic leave and study abroad cannot be taken at the same time!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAcademic leave and study abroad cannot be taken at the same time!");
            $("#result_error").append("\nAcademic leave and study abroad cannot be taken at the same time!");*/
            k6 = 1;
        }
        if(k6 == 0){
            swal({
                title: "Viga!",
                text: "Akadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");
            $("#result_error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");*/
            k6 = 1;
        }
    }
}

