class Calculation extends CurriculumCalculator {
    calcStudyLimits(){
        if(this.degree == "masters"){
            this.studyLowerLimit = (this.universityAttendance * 30) * 0.5;
            $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + this.studyLowerLimit + " EAP");
            this.fullStudyLoadLowerLimit = this.universityAttendance * 22.5;
            if((this.universityAttendance) > 4){
                this.payLoad = "paid";
            }
            $("#full_study_load_limit_result").html("Vajalik alampiir õpingute jätkamiseks täiskoormuses: " + this.fullStudyLoadLowerLimit + " EAP");
            this.fullStudyLoadFreeLimit = (this.universityAttendance * 30) - 6;
            if(this.universityAttendance >= 4){
                this.fullStudyLoadFreeLimit = 120;
            }
        } else {
            this.studyLowerLimit = (this.universityAttendance * 30) * 0.5;
            $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + this.studyLowerLimit + " EAP");
            if(this.universityAttendance <= 6){
                this.fullStudyLoadLowerLimit = this.universityAttendance * 22.5;
            }
            if((this.universityAttendance) > 6){
                this.payLoad = "paid";
            }
            $("#full_study_load_limit_result").html("Vajalik alampiir õpingute jätkamiseks täiskoormuses: " + this.fullStudyLoadLowerLimit + " EAP");
            this.fullStudyLoadFreeLimit = (this.universityAttendance * 30) - 6;
            if(this.universityAttendance >= 6){
                this.fullStudyLoadFreeLimit = 180;
            }
        }
        
    }

    calcStudyLoad(){
       /* if(this.ectsCount < this.fullStudyLoadLowerLimit){
            this.studyLoad = "Osakoormus";
            $("#study_load").html("Õppekoormus: " + this.studyLoad);
        } else {
            this.studyLoad = "Täiskoormus";
            $("#study_load").html("Õppekoormus: " + this.studyLoad);
        }*/
    }

    calcScenario(){
        if($("input[name='currently_studying_abroad']:checked").val() == "yes"){
            $("#scenario").html("<b>Viibid hetkel välisõppes/välispraktikal.</b>");
        }
        else if($("input[name='current_sabbatical_leave']:checked").val() == "yes"){
            $("#scenario").html("<b>Viibid hetkel akadeemilisel puhkusel.</b>");
        } else {
            if(this.payLoad == "free"){ //tasuta õpe
                if(this.degree == "bachelors"){ //bakalaureuse kraad
                    if(this.universityAttendance == 6 && this.ectsCount == 180){ //juhtumid vahemikus 6-5
                        $("#scenario").html("<b>Kool on edukalt läbitud!</b><br>");
                    } else if(this.universityAttendance == 6 && this.ectsCount == 168){
                        $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud täiskoormusega lõpetada!</b><br>");
                        $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel bakalaureuse lõputöö.");
                    } else if(this.universityAttendance == 6 && this.ectsCount == 162){
                        $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
                        $("#scenario").append("Sooritamata on üks 6 EAPiline aine ning esitamist-kaitsmist ootab veel bakalaureuse lõputöö. Pead tasuma trahviraha ning saad järgmine kooliaasta täiskoormuses lõpetada oma ained ning esitada-kaitsta lõputöö.");
                    } else {
                        console.log(this.studyLowerLimit);
                        if(this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance < 6){
                            $("#scenario").html("Jätkad täiskoormusel õppimist.");
                        //} else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance >= 6){
                        //    $("#scenario").html("Jätkad osakoormusel õppimist.");
                        //} else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance >= 6){
                        //    $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b>");
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1 && this.universityAttendance < 6){
                            $("#scenario").html("<b>Käesoleval semestril peate saama üle " + (this.universityAttendance+1)*22.5 + " EAPi, et jätkata täiskoormusel.</b> Vastasel juhul langete osakoormusesse.");
                        } else if(this.ectsCount <= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0 && this.ectsCount > this.studyLowerLimit){
                            $("#scenario").html("<b>Langed õpingutega osakoormusele.</b>");
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b>");
                        }
                    }
                } else if(this.degree == "masters"){
                    /*if(this.degree == "masters" && this.universityAttendance == 4 && this.ectsCount == 96){
                        $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
                        $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel magistri lõputöö.");
                    } else if(this.degree == "masters" && this.universityAttendance == 4 && this.ectsCount == 96){
        
                    } */
                }
            } else if(this.payLoad == "paid"){
                if(this.degree == "bachelors"){ //bakalaureuse kraad
                    if(this.universityAttendance == 12){ //juhtumid vahemikus 12-11
                        if(this.ectsCount == 180){
                            $("#scenario").html("<b>Kool on edukalt läbitud!</b><br>");
                        } else if(this.ectsCount < 180){
                            $("#scenario").html("<b>Kahjuks on viimane võimalus bakalaureuse tööd esitada-kaitsta mööda läinud ning oled koolist eksmatrikuleeritud.</b><br>");
                        } else {
                            $("#scenario").html("<b>ERROR!</b><br>");
                        }
                    } else if(this.universityAttendance == 11 && this.ectsCount >= 165){
                        $("#scenario").html("<b>Käesolev, ehk 12. semester, on viimane võimalus oma õpingud lõpetada!</b><br>"); //juhtumid vahemikus 12-11 lõppevad
                    } else if(this.universityAttendance == 6 && this.ectsCount == 180){ //juhtumid vahemikus 6-5
                        $("#scenario").html("<b>Kool on edukalt läbitud!</b><br>");
                    } else if(this.universityAttendance == 6 && this.ectsCount == 168){
                        $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud täiskoormusega lõpetada!</b><br>");
                        $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel bakalaureuse lõputöö.");
                    } else if(this.universityAttendance == 6 && this.ectsCount == 162){
                        $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
                        $("#scenario").append("Sooritamata on üks 6 EAPiline aine ning esitamist-kaitsmist ootab veel bakalaureuse lõputöö. Pead tasuma trahviraha ning saad järgmine kooliaasta täiskoormuses lõpetada oma ained ning esitada-kaitsta lõputöö.");
                    } else {
                        console.log(this.studyLowerLimit);
                        if(this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance < 6){
                            $("#scenario").html("Jätkad täiskoormusel õppimist.");
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance >= 6){
                            $("#scenario").html("Jätkad osakoormusel õppimist.");
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance >= 6){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b>");
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1 && this.universityAttendance < 6){
                            $("#scenario").html("<b>Käesoleval semestril peate saama üle " + (this.universityAttendance+1)*22.5 + " EAPi, et jätkata täiskoormusel.</b> Vastasel juhul langete osakoormusesse.");
                        } else if(this.ectsCount <= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0 && this.ectsCount > this.studyLowerLimit){
                            $("#scenario").html("<b>Langed õpingutega osakoormusele.</b>");
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b>");
                        }
                    }
                }
            }
           
            
            
    
            
        }
    }
}