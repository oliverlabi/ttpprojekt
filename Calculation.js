class Calculation extends CurriculumCalculator {
    calcStudyLimits(){
        if(this.degree == "masters"){
            this.studyLowerLimit = (this.universityAttendance * 30) * 0.5;
            this.fullStudyLoadLowerLimit = this.universityAttendance * 22.5;
            if((this.universityAttendance) > 4){
                this.payLoad = "paid";
            }
            this.fullStudyLoadFreeLimit = (this.universityAttendance * 30) - 6;
            if(this.universityAttendance >= 4){
                this.fullStudyLoadFreeLimit = 120;
            }
        } else {
            this.studyLowerLimit = (this.universityAttendance * 30) * 0.5;
            if(this.universityAttendance <= 6){
                this.fullStudyLoadLowerLimit = this.universityAttendance * 22.5;
            }
            if((this.universityAttendance) > 6){
                this.payLoad = "paid";
            }
            this.fullStudyLoadFreeLimit = (this.universityAttendance * 30) - 6;
            if(this.universityAttendance >= 6){
                this.fullStudyLoadFreeLimit = 180;
            }
        }
    }

    calcAbroadStudies(){
        /*for(var i=0; i<this.abroadSemesterCount; i++){
            var avgAbroadEctsCount = this.abroadEctsCount / this.abroadSemesterCount;
            if(avgAbroadEctsCount <= 15){
                this.universityAttendance -= 1;
           }
        }*/
        if(this.abroadEctsCount/this.abroadSemesterCount >= 15){
            this.universityAttendance -= this.abroadSemesterCount;
        } else if(this.abroadEctsCount >= 15 && this.abroadSemesterCount ){
            this.universityAttendance -= 1;
        }
       
    }

    calcScenario(){
        //vahejuhtum taiskoormuse ning tasuta oppe puhverruumi vahel tegemata!
        if($("input[name='currently_studying_abroad']:checked").val() == "yes"){
            $("#scenario").html("<b>Viibid hetkel välisõppes/välispraktikal.</b>");
        }
        else if($("input[name='current_sabbatical_leave']:checked").val() == "yes"){
            $("#scenario").html("<b>Viibid hetkel akadeemilisel puhkusel.</b>");
        } else {
            if(this.payLoad == "free"){ //tasuta õpe
                if(this.degree == "bachelors"){ //bakalaureuse kraad
                    if(this.universityAttendance == 6 && this.ectsCount == 180){
                        $("#scenario").html("<b>Kool on edukalt läbitud!</b><br>");
                    } else if(this.universityAttendance == 6 && this.ectsCount == 168){
                        $("#scenario").html("<b>Järgnev semester on viimane võimalus oma õpingud täiskoormusega lõpetada!</b><br>");
                        $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel bakalaureuse lõputöö.");
                        this.payLoad = "free";
                    } else if(this.universityAttendance == 6 && this.ectsCount == 162){
                        $("#scenario").html("<b>Järgnev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
                        $("#scenario").append("Sooritamata on üks 6 EAPiline aine ning esitamist-kaitsmist ootab veel bakalaureuse lõputöö. Pead tasuma trahviraha ning saad järgmine kooliaasta täiskoormuses lõpetada oma ained ning esitada-kaitsta lõputöö.");
                    } else {
                        if(this.ectsCount >= (this.fullStudyLoadFreeLimit + 6) && this.universityAttendance < 6){
                            $("#scenario").html("<b>Oled täitnud õppekava nõutud semestrimahu ning jätkad täiskoormusel õppes.</b><br>"); 
                            $("#scenario").append("Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist.");
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance == 1){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Vastavalt õppekorralduse eeskirjale oleksid sa õpingute jätkamiseks pidanud esimese semestri jooksul sooritama minimaalselt 15 EAP õppekavajärgseid aineid. Kahjuks pole sa nimetatud nõuet täitnud.");
                        } else if(this.ectsCount >= this.fullStudyLoadFreeLimit && this.universityAttendance < 6 && this.ectsCount < (this.fullStudyLoadFreeLimit + 6)){
                            $("#scenario").html("<b>Jätkad õpinguid täiskoormusel.</b><br> "); 
                            $("#scenario").append("Oled sooritanud õppekava nõutud semestrimahust (30 EAPst) vähem ainepunkte, kuid lubatud võlgnevuse (6 EAP) piires. Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist. \nArvesta, et pead järgmistel semestritel kompenseerima hetkel vähem sooritatud EAP-d.");
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1 && this.universityAttendance < 6 && this.fullStudyLoadLowerLimit > this.ectsCount){
                            $("#scenario").html("<b>Pärast trahvi tasumist saad jätkata täiskoormusel õppes, kuid pead saama järgmisel semestril täiskoormuse alampiiri täidetud.</b><br>");
                            $("#scenario").append("Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma " + ((this.universityAttendance + 1) * 30) + " EAP-d õppekavajärgseid aineid. Et sa ei peaks trahvi maksma, siis minimaalselt " + ((this.universityAttendance + 1) * 30 - 6) + " EAP.");
                        } else if(this.ectsCount <= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0 && this.ectsCount > this.studyLowerLimit){
                            $("#scenario").html("<b>Langed õpingutega osakoormusele.</b><br>");
                            $("#scenario").append("Kahjuks ei ole sa täitnud täiskoormusel õppe nõuet ehk sooritanud kumulatiivselt vähemalt 22,5 EAP õppekavajärgseid aineid semestri kohta. Osakoormuse nõudeks on kumulatiivselt vähemalt 15 EAP õppekavajärgsete ainete sooritamine iga õppetööst osavõetud semestri kohta.");
                        } else if(this.ectsCount < (this.universityAttendance-1)*15 && this.universityAttendance % 2 == 1){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleerimisohus.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid kui ka eksmatrikuleerimist ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma vähemalt " +((this.universityAttendance+1)*15) + " EAP-d õppekavajärgseid aineid, et püsida osakoormusel.");
                        } else if(this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance < 6 && this.ectsCount < this.fullStudyLoadFreeLimit){
                            $("#scenario").html("<b>Jätkad täiskoormusel õppimist, kuid pead maksma trahviraha.</b> Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d.");
                        }
                    }
                } else if(this.degree == "masters"){
                    if(this.universityAttendance == 4 && this.ectsCount == 120){
                        $("#scenario").html("<b>Kool on edukalt läbitud!</b><br>");
                    } else if(this.universityAttendance == 4 && this.ectsCount == 96){
                        $("#scenario").html("<b>Järgnev semester on viimane võimalus oma õpingud täiskoormusega lõpetada!</b><br>");
                        $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel magistri lõputöö.");
                        this.payLoad = "free";
                    } else if(this.universityAttendance == 4 && this.ectsCount == 90){
                        $("#scenario").html("<b>Järgnev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
                        $("#scenario").append("Sooritamata on üks 6 EAPiline aine ning esitamist-kaitsmist ootab veel magistri lõputöö. Pead tasuma trahviraha ning saad järgmine kooliaasta täiskoormuses lõpetada oma ained ning esitada-kaitsta lõputöö.");
                    } else {
                        if(this.ectsCount >= (this.fullStudyLoadFreeLimit + 6) && this.universityAttendance < 4){
                            $("#scenario").html("<b>Oled täitnud õppekava nõutud semestrimahu ning jätkad täiskoormusel õppes.</b><br>"); 
                            $("#scenario").append("Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist.");
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance == 1){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Vastavalt õppekorralduse eeskirjale oleksid sa õpingute jätkamiseks pidanud esimese semestri jooksul sooritama minimaalselt 15 EAP õppekavajärgseid aineid. Kahjuks pole sa nimetatud nõuet täitnud.");
                        } else if(this.ectsCount >= this.fullStudyLoadFreeLimit && this.universityAttendance < 4 && this.ectsCount < (this.fullStudyLoadFreeLimit + 6)){
                            $("#scenario").html("<b>Jätkad õpinguid täiskoormusel.</b><br> "); 
                            $("#scenario").append("Oled sooritanud õppekava nõutud semestrimahust (30 EAPst) vähem ainepunkte, kuid lubatud võlgnevuse (6 EAP) piires. Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist. \nArvesta, et pead järgmistel semestritel kompenseerima hetkel vähem sooritatud EAP-d.");
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1 && this.universityAttendance < 4 && this.fullStudyLoadLowerLimit > this.ectsCount){
                            $("#scenario").html("<b>Pärast trahvi tasumist saad jätkata täiskoormusel õppes, kuid pead saama järgmisel semestril täiskoormuse alampiiri täidetud.</b><br>");
                            $("#scenario").append("Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma " + ((this.universityAttendance + 1) * 30) + " EAP-d õppekavajärgseid aineid. Et sa ei peaks trahvi maksma, siis minimaalselt " + ((this.universityAttendance + 1) * 30 - 6) + " EAP.");
                        } else if(this.ectsCount <= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0 && this.ectsCount > this.studyLowerLimit){
                            $("#scenario").html("<b>Langed õpingutega osakoormusele.</b><br>");
                            $("#scenario").append("Kahjuks ei ole sa täitnud täiskoormusel õppe nõuet ehk sooritanud kumulatiivselt vähemalt 22,5 EAP õppekavajärgseid aineid semestri kohta. Osakoormuse nõudeks on kumulatiivselt vähemalt 15 EAP õppekavajärgsete ainete sooritamine iga õppetööst osavõetud semestri kohta.");
                        } else if(this.ectsCount < (this.universityAttendance-1)*15 && this.universityAttendance % 2 == 1){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleerimisohus.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid kui ka eksmatrikuleerimist ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma vähemalt " +((this.universityAttendance+1)*15) + " EAP-d õppekavajärgseid aineid, et püsida osakoormusel.");
                        } else if(this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance < 4 && this.ectsCount < this.fullStudyLoadFreeLimit){
                            $("#scenario").html("<b>Jätkad täiskoormusel õppimist, kuid pead maksma trahviraha.</b> Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d.");
                        }
                    }
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
                        $("#scenario").html("<b>Järgnev, ehk 12. semester, on viimane võimalus oma õpingud lõpetada!</b><br>"); //juhtumid vahemikus 12-11 lõppevad
                    } else {
                        console.log(this.studyLowerLimit);
                        if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance >= 6){
                            $("#scenario").html("Jätkad osakoormusel õppimist.");
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance >= 6 && this.universityAttendance % 2 == 0){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.ectsCount < (this.universityAttendance-1)*15 && this.universityAttendance % 2 == 1){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleerimisohus.</b><br>" + (this.universityAttendance + 1 ) * 15 + " koormusarvutusel arvesse minevat EAPi omandama, et jätkata osakoormusel õppimist.");
                            $("#scenario").append("Pead järgneval semestril vähemalt.");
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 6 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html("Jätkad õpingutega käesoleval ning järgneval semestril osakoormusel.");
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 6 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html("Jätkad õpingutega osakoormusel. Kui on soovi minna õpingutega üle täiskoormusele, siis pead omandama järgneva semestriga " +(this.universityAttendance+1)*22.5 + " EAPi");
                        } else if(this.universityAttendance < 6 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html("<b>Jätkad õpingutega hetkel osakoormusel, kuid oled ületanud täiskoormuse lävendi.</b><br>");
                            $("#scenario").append("Kui oled järgmine semester jätkuvalt üle nimetatud alampiiri, siis viiakse sind üle täiskoormusele.");
                        } else if(this.universityAttendance < 6 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html("<b>Jätkad õpinguid täiskoormusel.</b><br>");
                            $("#scenario").append("Kui oled järgmine semester jätkuvalt üle nimetatud alampiiri, siis viiakse sind üle täiskoormusele.");
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        }
                    }
                } else if(this.degree = "masters"){
                    if(this.universityAttendance == 8){ //juhtumid vahemikus 8-7
                        if(this.ectsCount == 120){
                            $("#scenario").html("<b>Kool on edukalt läbitud!</b><br>");
                        } else if(this.ectsCount < 120){
                            $("#scenario").html("<b>Kahjuks on viimane võimalus magistri tööd esitada-kaitsta mööda läinud ning oled koolist eksmatrikuleeritud.</b><br>");
                        } else {
                            $("#scenario").html("<b>ERROR!</b><br>");
                        }
                    } else if(this.universityAttendance == 7 && this.ectsCount >= 96){
                        $("#scenario").html("<b>Järgnev, ehk 8. semester, on viimane võimalus oma õpingud lõpetada!</b><br>"); //juhtumid vahemikus 12-11 lõppevad
                        this.studyLowerLimit = 96;
                    } else {
                        console.log(this.studyLowerLimit);
                        if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance >= 4){
                            $("#scenario").html("Jätkad osakoormusel õppimist.");
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance >= 4 && this.universityAttendance % 2 == 0){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.ectsCount < (this.universityAttendance-1)*15 && this.universityAttendance % 2 == 1){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleerimisohus.</b> Pead järgneval semestril vähemalt " + (this.universityAttendance + 1 ) * 15 + " koormusarvutusel arvesse minevat EAPi omandama, et jätkata osakoormusel õppimist.");
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 4 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html("Jätkad õpingutega käesoleval ning järgneval semestril osakoormusel.");
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 4 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html("Jätkad õpingutega osakoormusel. Kui on soovi minna õpingutega üle täiskoormusele, siis pead omandama järgneva semestriga " +(this.universityAttendance+1)*22.5 + " EAPi");
                        } else if(this.universityAttendance < 4 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html("<b>Jätkad õpingutega hetkel osakoormusel, kuid oled ületanud täiskoormuse lävendi.</b><br>");
                            $("#scenario").append("Kui oled järgmine semester jätkuvalt üle nimetatud alampiiri, siis viiakse sind üle täiskoormusele.");
                        } else if(this.universityAttendance < 4 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html("<b>Jätkad õpinguid täiskoormusel.</b><br>");
                            $("#scenario").append("Kui oled järgmine semester jätkuvalt üle nimetatud alampiiri, siis viiakse sind üle täiskoormusele.");
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html("<b>Kahjuks oled eksmatrikuleeritud.</b><br>");
                            $("#scenario").append("Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ");
                        }
                    }
                }
            }
        }
    }
}
