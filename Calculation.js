class Calculation extends CurriculumCalculator {
    calcStudyLimits(){
        this.studyLowerLimit = (this.universityAttendance * 30) * 0.5;
        $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + this.studyLowerLimit + " EAP");
        this.fullStudyLoadLowerLimit = this.universityAttendance * 22.5;
        $("#full_study_load_limit_result").html("Vajalik alampiir õpingute jätkamiseks täiskoormuses: " + this.fullStudyLoadLowerLimit + " EAP");
    }

    calcStudyLoad(){
        if(this.ectsCount < this.fullStudyLoadLowerLimit){
            this.studyLoad = "Osakoormus";
            $("#study_load").html("Õppekoormus: " + this.studyLoad);
        } else {
            this.studyLoad = "Täiskoormus";
            $("#study_load").html("Õppekoormus: " + this.studyLoad);
        }
    }

    calcScenario(){
        if(this.ectsCount >= this.fullStudyLoadLowerLimit){
            $("#scenario").html("Jätkad täiskoormusel õppimist.");
        }
        if(this.ectsCount <= this.fullStudyLoadLowerLimit){
            $("#scenario").html("Langed õpingutega osakoormusele.");
        }
        if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
            $("#scenario").html("<b>Oled eksmatrikuleerimisohus, kuna EAP-de arv on väiksem kui õppes jätkamise alampiir!</b>");
        }

        // ERIJUHTUMID
        if(this.degree = "masters" && this.universityAttendance == 4 && this.ectsCount == 96){
            $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
            $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel magistri lõputöö.");
        }
        if(this.degree = "bachelors" && this.universityAttendance == 6 && this.ectsCount == 168){
            $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
            $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel bakalaureuse lõputöö.");
        }
        if($("input[name='currently_studying_abroad']:checked").val() == "yes"){
            $("#scenario").html("<b>Viibid hetkel välisõppes/välispraktikal.</b>");
        }
    }

    checkCurriculumDegree(){
        for(let i=0; i<this.mastersCurriculums.length; i++){
            if(this.mastersCurriculums[i] == this.curriculumChoice){
                this.degree = "masters";
                break;
            } else {
                this.degree = "bachelors";
            }
        }
    }
}
