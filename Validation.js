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
            if(this.mastersCurriculums[i] == this.curriculumChoice || (this.mastersCurriculumsEng[i] == this.curriculumChoice && lang == 1)){
                this.degree = "masters";
                break;
            } else if (this.bachelorsCurriculums[i] == this.curriculumChoice || (this.bachelorsCurriculumsEng[i] == this.curriculumChoice && lang == 1)){
                this.degree = "bachelors";
            }
        }
    }

    checkInDepthStudy(){
        if(this.studiedEstonianSemesterCount == 1){
            this.universityAttendance -= 1;
        } else if(this.studiedEstonianSemesterCount == 2){
            this.universityAttendance -= 2;
        }
    }

    inputValidation(){
        this.k1 = 0;
        this.k2 = 0;
        this.k3 = 0;
        this.k4 = 0;
        this.k5 = 0;
        this.k6 = 0;
        this.k7 = 0;
        if($("#curriculum_attendance").val() > 0){
            if(this.degree == "masters" && this.universityAttendance <= 8){
                this.k1 = 1;
            } else if (this.degree == "bachelors" && this.universityAttendance <= 12){
                this.k1 = 1;
            }
        }
        
        if($("#sabbatical_leave").val() >= 0){
            if($("#sabbatical_leave").val() < this.attendanceCount){
                this.k2 = 1;
            }
        }

        if($("#ects_count").val() > 0){
            if(this.degree == "masters" && $("#ects_count").val() <= 120){
                this.k3 = 1;
            } else if (this.degree == "bachelors" && $("#ects_count").val() <= 180){
                this.k3 = 1;
            }
        }
        if($("input[name='studied_abroad']:checked").val() == "yes"){
            if($("#abroad_semester_count").val() > 0 && parseInt($("#abroad_semester_count").val()) <= 2){
                this.k4 = 1;
            }
            if($("#abroad_ects_count").val() > 0){
                this.k5 = 1;
            }
        } else {
            this.k4 = 1;
            this.k5 = 1;
        }
        if($("input[name='current_sabbatical_leave']:checked").val() == "yes" && $("input[name='currently_studying_abroad']:checked").val() == "yes"){
            this.k6 = 0;
        } else {
            this.k6 = 1;
        }
        if($("input[name='studied_estonian']:checked").val() == "yes"){
            if(this.universityAttendance - $("#studied_estonian_ects_count").val() < 1){
                this.k7 = -1;
            } else if($("#studied_estonian_ects_count").val() > this.universityAttendance){
                this.k7 = -2;
            } else if($("#studied_estonian_ects_count").val() > this.attendanceCount){
                this.k7 = -3;
            } else if($("#studied_estonian_ects_count").val() == 0){
                this.k7 = 0;
            } else {
                this.k7 = 1;
            }
        } else {
            this.k7 = 1;
        }

        if(this.k1+this.k2+this.k3+this.k4+this.k5+this.k6+this.k7 != 7){
            console.log(this.k1, this.k2, this.k3, this.k4, this.k5, this.k6, this.k7);
            Validation.prototype.errorMessages.call(this);
            return 0;
        } else {
            return 1;
        }
        
    }

    errorMessages(){
        //Validation.prototype.checkCurriculumDegree.call(this);
        if(this.k1 == 0 && lang == 1){
            if(this.degree == "masters" && this.universityAttendance > 8){
                swal({
                    title: "Error!",
                    text: "Masters curriculum semester count must not be higher than 8!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.degree == "bachelors" && this.universityAttendance > 12){
                swal({
                    title: "Error!",
                    text: "Bachelors curriculum semester count must not be higher than 12!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.universityAttendance == 0){
                swal({
                    title: "Error!",
                    text: "The number of semesters spent at TU must not be 0!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.universityAttendance < 0){
                swal({
                    title: "Error!",
                    text: "The number of semesters spent at TU must not be below 0!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }

            /*$("#error").append("\nThe number of semesters spent at TU must not be 0!\n");
            $("#result_error").append("\nThe number of semesters spent at TU must not be 0!\n");*/
            this.k1 = 1;
        }
        if(this.k1 == 0){
            if(this.degree == "masters" && this.universityAttendance > 8){
                swal({
                    title: "Viga!",
                    text: "Magistri õppekava semestrite arv ei tohi olla suurem kui 8!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.degree == "bachelors" && this.universityAttendance > 12){
                swal({
                    title: "Viga!",
                    text: "Bakalaureuse õppekava semestrite arv ei tohi olla suurem kui 12!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.universityAttendance == 0) {
                swal({
                    title: "Viga!",
                    text: "TLÜs viibitud semestrite arv ei tohi olla 0!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.universityAttendance < 0){
                swal({
                    title: "Viga!",
                    text: "TLÜs viibitud semestrite arv ei tohi olla väiksem kui 0!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            
            /*$("#error").append("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");
            $("#result_error").append("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");*/
            this.k1 = 1;
        }
        if(this.k2 == 0 && lang == 1){
            if(parseInt(this.attendanceCount) < parseInt(this.sabbaticalCount)){
                swal({
                    title: "Error!",
                    text: "The number of semesters spent on academic leave must not exceed the number of semesters spent at TU!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if(parseInt(this.attendanceCount) == parseInt(this.sabbaticalCount)){
                swal({
                    title: "Error!",
                    text: "The number of semesters spent on academic leave must not equal with the number of semesters spent at TU!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            /*$("#error").append("\nThe number of semesters spent on academic leave must not exceed the number of semesters spent at TU!\n");
            $("#result_error").append("\nThe number of semesters spent on academic leave must not exceed the number of semesters spent at TU!\n");*/
            this.k2 = 1;
        }
        if(this.k2 == 0){
            if(parseInt(this.attendanceCount) < parseInt(this.sabbaticalCount)){
                swal({
                    title: "Viga!",
                    text: "Akadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if(parseInt(this.attendanceCount) == parseInt(this.sabbaticalCount)){
                swal({
                    title: "Viga!",
                    text: "Akadeemilisel puhkusel viibitud semestrite arv ei tohi olla võrdne TLÜs viibitud semestrite arvust!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }

            /*$("#error").append("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");
            $("#result_error").append("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");*/
            this.k2 = 1;
        }
        if(this.k3 == 0 && lang == 1){
            if(this.degree == "masters" && $("#ects_count").val() > 120){
                swal({
                    title: "Error!",
                    text: "The number of credits to be taken into account for the completion of the Masters curriculum must not be higher than 120!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            } 
            if (this.degree == "bachelors" && $("#ects_count").val() > 180){
                swal({
                    title: "Error!",
                    text: "The number of credits to be taken into account for the completion of the Bachelors curriculum must not be higher than 180!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            } 
            if ($("#ects_count").val() == 0){
                swal({
                    title: "Error!",
                    text: "The number of credits to be taken into account for the completion of the curriculum must not be 0!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            /*$("#error").append("\nThe number of credits to be taken into account for the completion of the curriculum must not be 0!\n");
            $("#result_error").append("\nThe number of credits to be taken into account for the completion of the curriculum must not be 0!\n");*/
            this.k3 = 1;
        }
        if(this.k3 == 0){
            if(this.degree == "masters" && $("#ects_count").val() > 120){
                swal({
                    title: "Viga!",
                    text: "Magistri õppekava täitmisel arvesse minevate EAP-de arv ei tohi olla suurem kui 120!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if (this.degree == "bachelors" && $("#ects_count").val() > 180){
                swal({
                    title: "Viga!",
                    text: "Bakalaureuse õppekava täitmisel arvesse minevate EAP-de arv ei tohi olla suurem kui 180!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }
            if ($("#ects_count").val() == 0){
                swal({
                    title: "Viga!",
                    text: "Õppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!",
                    icon: "error",
                    button: "OK",
                    className: "errorMsg",
                });
            }

            /*$("#error").append("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");
            $("#result_error").append("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");*/
            this.k3 = 1;
        }
        if(this.k4 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters spent studying abroad must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of semesters spent studying abroad must not be 0!\n");
            $("#result_error").append("\nThe number of semesters spent studying abroad must not be 0!\n");*/
            this.k4 = 1;
        }
        if(this.k4 == 0){
            swal({
                title: "Viga!",
                text: "Välisõppes viibitud semestrite arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");
            $("#result_error").append("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");*/
            this.k4 = 1;
        }
        if(this.k5 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of credits spent abroad must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nThe number of credits spent abroad must not be 0!\n");
            $("#result_error").append("\nThe number of credits spent abroad must not be 0!\n");*/
            this.k5 = 1;
        }
        if(this.k5 == 0){
            swal({
                title: "Viga!",
                text: "Välisõppes viibitud ainepunktide arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");
            $("#result_error").append("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");*/
            this.k5 = 1;
        }
        if(this.k6 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "Academic leave and study abroad cannot be taken at the same time!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAcademic leave and study abroad cannot be taken at the same time!");
            $("#result_error").append("\nAcademic leave and study abroad cannot be taken at the same time!");*/
            this.k6 = 1;
        }
        if(this.k6 == 0){
            swal({
                title: "Viga!",
                text: "Akadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");
            $("#result_error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");*/
            this.k6 = 1;
        }
        if(this.k7 == 0 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters to be taken into account for the completion of the Estonian language module must not be 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAcademic leave and study abroad cannot be taken at the same time!");
            $("#result_error").append("\nAcademic leave and study abroad cannot be taken at the same time!");*/
            this.k7 = 1;
        }
        if(this.k7 == 0){
            swal({
                title: "Viga!",
                text: "Riigikeele süvaõppe eriala täitmisel arvesse minevate semestrite arv ei tohi olla 0!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");
            $("#result_error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");*/
            this.k7 = 1;
        }
        if(this.k7 == -1 && lang == 1){
            swal({
                title: "Error!",
                text: "The subtraction of overall semesters and the number of semesters to be taken into account for the completion of the Estonian language module must not be lower than 1!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAcademic leave and study abroad cannot be taken at the same time!");
            $("#result_error").append("\nAcademic leave and study abroad cannot be taken at the same time!");*/
            this.k7 = 1;
        }
        if(this.k7 == -1){
            swal({
                title: "Viga!",
                text: "Üldsemestrite ning riigikeele süvaõppe eriala täitmisel arvesse minevate semestrite arvu vahe ei tohi olla väiksem kui 1!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");
            $("#result_error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");*/
            this.k7 = 1;
        }
        if(this.k7 == -2 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters to be taken into account for the completion of the Estonian language module must not be higher than overall semesters!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAcademic leave and study abroad cannot be taken at the same time!");
            $("#result_error").append("\nAcademic leave and study abroad cannot be taken at the same time!");*/
            this.k7 = 1;
        }
        if(this.k7 == -2){
            swal({
                title: "Viga!",
                text: "Riigikeele süvaõppe eriala täitmisel arvesse minevate semestrite arv ei tohi olla suurem üldsemestrite arvust!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");
            $("#result_error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");*/
            this.k7 = 1;
        }
        if(this.k7 == -3 && lang == 1){
            swal({
                title: "Error!",
                text: "The number of semesters to be taken into account for the completion of the Estonian language module must not be higher than semesters studied at TU!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAcademic leave and study abroad cannot be taken at the same time!");
            $("#result_error").append("\nAcademic leave and study abroad cannot be taken at the same time!");*/
            this.k7 = 1;
        }
        if(this.k7 == -3){
            swal({
                title: "Viga!",
                text: "Riigikeele süvaõppe eriala täitmisel arvesse minevate semestrite arv ei tohi olla suurem TLÜs viibitud semestrite arvust!",
                icon: "error",
                button: "OK",
                className: "errorMsg",
            });
            /*$("#error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");
            $("#result_error").append("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!");*/
            this.k7 = 1;
        }
        
    }
}