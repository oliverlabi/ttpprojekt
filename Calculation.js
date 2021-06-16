class Calculation extends CurriculumCalculator {
    calcStudyLimits(){
        if(this.degree == "masters"){
            this.studyLowerLimit = (this.universityAttendance * this.partTimeStudyLoadMinimumConfig) * 0.5;
            this.fullStudyLoadLowerLimit = this.universityAttendance * (this.fullStudyLoadMinimumConfig/2);
            if((this.universityAttendance) > 4){
                this.payLoad = "paid";
            }
            this.fullStudyLoadFreeLimit = (this.universityAttendance * this.partTimeStudyLoadMinimumConfig) - 6;
            if(this.universityAttendance >= 4){
                this.fullStudyLoadFreeLimit = 120;
            }
        } else {
            this.studyLowerLimit = (this.universityAttendance * this.partTimeStudyLoadMinimumConfig) * 0.5;
            if(this.universityAttendance <= 6){
                this.fullStudyLoadLowerLimit = this.universityAttendance * (this.fullStudyLoadMinimumConfig/2);
            }
            if((this.universityAttendance) > 6){
                this.payLoad = "paid";
            }
            this.fullStudyLoadFreeLimit = (this.universityAttendance * this.partTimeStudyLoadMinimumConfig) - 6;
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

    calcFees(){
        let exmNb2, ectsFee, feeBack, partTimeFees, partTimeFee_1, partTimeFee_2, partTimeFee_3, partTimeFee_4, finishEctsFee, finishNextSemFee, finishLastChance, exmFees, exmEctsFee, exmNb;
        if(lang == 0){
            ectsFee = "Iga vähemsooritatud ainepunkti eest pead vastavalt õppekorralduse eeskirjale § 10 lg 2 p 1 tasuma nn trahviraha valemi 1 EAP = " + this.ectsFee + " eurot alusel. <br>";
            feeBack = "<b>NB!</b> Kui lõpetad nominaalajaga, siis on sul õigus taotleda ülikoolilt makstud trahviraha tagasi avalduse alusel 30 kalendripäeva jooksul pärast lõputöö kaitsmist.";
            partTimeFees = "Osakoormusega õppes tuleb, vastavalt õppekorralduse eeskirjale § 10 lg 2 p 3, uuel semestril tasuda:</b><br>";
            partTimeFee_1 = "* semestri õpingukavasse registreeritud õppeainete eest ainepunktitasu alusel - tasumäär sõltub millise instituudi poolt on aine kureeritav, DT ainete ainepunkti maksumuseks on 40 eurot;<br>";
            partTimeFee_2 = "* juhendamistasu 266 eurot,mis annab õiguse saada juhendamist 2 semestri vältel;<br>";
            partTimeFee_3 = "* lõputöötasu 266 eurot, mis tuleb maksta lõputöö kaitsmisele esitamisel;<br>";
            partTimeFee_4 = "* administreerimistasu 73 eurot semestritel, millal ükski eelpool nimetatud tasudest ei rakendu.";
            finishEctsFee = "Pead tasuma trahvi nominaalajal sooritamata jäänud ainete eest valemi 1 EAP = " + this.ectsFee + " eurot alusel. Lõputöö eest trahvi ei nõuta.<br>";
            finishNextSemFee = "Juhul kui sa järgmise semestri jooksul õpinguid ei lõpeta, siis semestri lõpus esitatakse sulle uus trahviraha arve sooritamata ainete eest. <br>";
            finishLastChance = "<b>NB!</b> See on sinu viimane võimalus õpingute tasuta lõpetamiseks.<br>";
            exmFees = "Sul tuleb vastavalt õppekorralduse eeskirjale § 10 lg 2 p 1 tasuda nn trahviraha iga ainepunkti eest, mis sul on tasuta õppe nõudest (30 EAP´d semestris) ja lubatud võlgnevusest (6 EAPst) vähem sooritatud. <br>";
            exmEctsFee = "Ehk iga " + this.fullStudyLoadFreeLimit + " EAPst vähem sooritatud ainepunkti eest, valemi “1 vähem sooritatud EAP = " + this.ectsFee + " eurot trahvi” alusel.<br>";
            exmNb = "<b>NB!</b> Eksmatrikuleerimine ei vabasta sind trahviraha tasumisest. Trahviraha arvuta välja oma sooritamata deklareeritud ainetest.<br>";
            exmNb2 = "<b>NB!</b> Eksmatrikuleerimine ei vabasta sind trahviraha tasumisest.";
        } else{
            ectsFee = "For each less completed credit point, you have to pay the so-called penalty fee according to the Study Regulations § 10(2) p 1 based on the formula 1 ECTS = " + this.ectsFee +" EUR. <br>";
            feeBack = "<b>NB!</b> If you graduate with a nominal period, you have the right to request a refund of the fine paid to the university on application within 30 calendar days of the protection of the graduation.";
            partTimeFees = "In part-time study, according to the Study Regulations § 10(2) p 3, the following shall be paid in next semester:</b><br>";
            partTimeFee_1 = "* for the subjects registered in the study program for a semester, based on the credit point fee - the fee rate depends on which institute curates the subject, the cost of the DT subjects is 40 EUR;<br>";
            partTimeFee_2 = "* an instructional fee of 266 EUR, which entitles to receive instructions for 2 semesters;<br>";
            partTimeFee_3 = "* final remuneration 266 EUR to be paid when submitting the final work;<br>";
            partTimeFee_4 = "* an administration fee of 73 EUR per semester, when none of the above fees apply.";
            finishEctsFee = "You will have to pay a penalty for substances not performed at the nominal time based on the formula 1 ECTS = " + this.ectsFee +". No penalty is required for the thesis.<br>";
            finishNextSemFee = "If you do not complete your studies in the next semester, you will be charged a new penalty payment at the end of the semester for not invoiced subjects. <br>";
            finishLastChance = "<b>NB!</b> This is your last chance to complete your studies for free.<br>";
            exmFees = "According to the Study Regulations § 10(2) p 1, you must pay a penalty fee for each credit point that you have completed less than the study requirement (30 ECTS per semester) and the allowable debt (6 ECTS). <br>";
            exmEctsFee = "I.e. for every credit point less than " + this.fullStudyLoadFreeLimit + " ECTS, based on the formula 1 less ECTS = " + this.ectsFee + "EUR fine.<br>";
            exmNb = "<b>NB!</b> Exmatriculation does not relieve you from the payment of a fine. Calculate your payment from non-performed declared subjects.<br>";
            exmNb2 = "<b>NB!</b> Exmatriculation does not relieve you from the payment of a fine.";
        }
        if(this.feeType == 1){ //trahviraha, kui tasuta õppe puhverruumist alla
            $("#fees").html(ectsFee);
            $("#fees").append(feeBack);
        } else if(this.feeType == 2){ //osakoormuse maksed
            $("#fees").html(partTimeFees);
            $("#fees").append(partTimeFee_1);
            $("#fees").append(partTimeFee_2);
            $("#fees").append(partTimeFee_3);
            $("#fees").append(partTimeFee_4);
        } else if(this.feeType == 3){//lõpetamise trahiraha, kui on 90-96 eap või 162-168 eap.
            $("#fees").html(finishEctsFee);
            $("#fees").append(finishNextSemFee);
            $("#fees").append(finishLastChance);
        } else if(this.feeType == 4){ //täiskoormusest kukub eksmatti
            $("#fees").html(exmFees);
            $("#fees").append(exmEctsFee);
            $("#fees").append(exmNb2);
        } else {
            $("#fees").html("");
        }
    }

    calcScenario(){
        let bfScenario3_2, abroadScenario, sabbaticalLeaveScenario, errorScenario, feeScenario1, exmatriculateScenario, exmatriculateDangerScenario, exmatriculateDangerScenario_1, exmatriculateScenario_2, exmatriculateScenario_1, schoolOverScenario, impossibleScenario, bfScenario1, bfScenario1_1, bfScenario2, bfScenario2_1, bfScenario3, bfScenario3_1, bfScenario4, bfScenario4_1, bfScenario5, bfScenario5_1, bfScenario6, bfScenario6_1, bpScenario1, bpScenario2, bpScenario3_1, bpScenario4, bpScenario5, bpScenario5_1, bpScenario6, bpScenario6_1, bpScenario7, bpScenario7_1, mfScenario1, mfScenario2, mfScenario2_1, mfScenario3_1, mfScenario4_1, mfScenario5_1, mfScenario6_1, mfScenario7_1, mpScenario1, mpScenario2, mpScenario3, bLastSemesterScenario;
        if(lang == 0){
            schoolOverScenario = "<b>Kool on edukalt läbitud!</b><br>";
            bfScenario1 = "<b>Järgnev semester on viimane võimalus oma õpingud täiskoormusega lõpetada!</b><br>";
            bfScenario1_1 = "Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel bakalaureuse lõputöö.";
            bfScenario2 = "<b>Järgnev semester on viimane võimalus oma õpingud lõpetada!</b><br></br>";
            bfScenario2_1 = "Sooritamata on üks 6 EAPiline aine ning esitamist-kaitsmist ootab veel bakalaureuse lõputöö. Saad järgmine semester pärast trahvi tasumist kooliaasta täiskoormuses lõpetada oma ained ning esitada-kaitsta lõputöö.";
            impossibleScenario = "<b>Võimatu olukord!</b><br>";
            bfScenario3 = "<b>Oled täitnud õppekava nõutud semestrimahu ning jätkad täiskoormusel õppes.</b><br>";
            bfScenario3_1 = "Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist.";
            bfScenario3_2 = "Kui oled ülikooli immatrikuleeritud tasuta õppekohale, ning saad järgmine semester üle tasuta õppe puhverruumi, siis jätkad tasuta õppimist.";
            exmatriculateScenario = "<b>Kahjuks oled eksmatrikuleeritud.</b><br>";
            exmatriculateScenario_1 = "Vastavalt õppekorralduse eeskirjale oleksid sa õpingute jätkamiseks pidanud esimese semestri jooksul sooritama minimaalselt 15 EAP õppekavajärgseid aineid. Kahjuks pole sa nimetatud nõuet täitnud.";
            bfScenario4 = "<b>Jätkad õpinguid täiskoormusel.</b><br> ";
            bfScenario4_1 = "Oled sooritanud õppekava nõutud semestrimahust (30 EAPst) vähem ainepunkte, kuid lubatud võlgnevuse (6 EAP) piires. Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist. \nArvesta, et pead järgmistel semestritel kompenseerima hetkel vähem sooritatud EAP-d.";
            bfScenario5 = "<b>Pärast trahvi tasumist saad jätkata täiskoormusel õppes, kuid pead saama järgmisel semestril täiskoormuse alampiiri täidetud.</b><br>";
            bfScenario5_1 = "Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma " + ((this.universityAttendance + 1) * 30) + " EAP-d õppekavajärgseid aineid. Et sa ei peaks trahvi maksma, siis minimaalselt " + ((this.universityAttendance + 1) * 30 - 6) + " EAP.";
            bfScenario6 = "<b>Langed õpingutega osakoormusele.</b><br>";
            bfScenario6_1 = "Kahjuks ei ole sa täitnud täiskoormusel õppe nõuet ehk sooritanud kumulatiivselt vähemalt 22,5 EAP õppekavajärgseid aineid semestri kohta. Osakoormuse nõudeks on kumulatiivselt vähemalt 15 EAP õppekavajärgsete ainete sooritamine iga õppetööst osavõetud semestri kohta.";
            exmatriculateScenario_2 = "Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. ";
            exmatriculateDangerScenario = "<b>Kahjuks oled eksmatrikuleerimisohus.</b><br>";
            exmatriculateDangerScenario_1 = "Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid kui ka eksmatrikuleerimist ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma vähemalt " +((this.universityAttendance+1)*15) + " EAP-d õppekavajärgseid aineid, et püsida osakoormusel.";
            feeScenario1 = "<b>Jätkad täiskoormusel õppimist, kuid pead maksma trahviraha.</b> Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d.";
            mfScenario1 = "Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel magistri lõputöö.";
            mfScenario2 = "<b>Järgnev semester on viimane võimalus oma õpingud lõpetada!</b><br>";
            mfScenario2_1 = "Sooritamata on üks 6 EAPiline aine ning esitamist-kaitsmist ootab veel magistri lõputöö. Pärast trahviraha tasumist saad järgmine kooliaasta täiskoormuses lõpetada oma ained ning esitada-kaitsta lõputöö.";
            mfScenario3_1 = "Oled sooritanud õppekava nõutud semestrimahust (30 EAPst) vähem ainepunkte, kuid lubatud võlgnevuse (6 EAP) piires. Kui oled ülikooli immatrikuleeritud tasuta õppekohale, siis jätkad tasuta õppimist. \nArvesta, et pead järgmistel semestritel kompenseerima hetkel vähem sooritatud EAP-d.";
            mfScenario4_1 = "Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma " + ((this.universityAttendance + 1) * 30) + " EAP-d õppekavajärgseid aineid. Et sa ei peaks trahvi maksma, siis minimaalselt " + ((this.universityAttendance + 1) * 30 - 6) + " EAP.";
            mfScenario5_1 = "Kahjuks ei ole sa täitnud täiskoormusel õppe nõuet ehk sooritanud kumulatiivselt vähemalt 22,5 EAP õppekavajärgseid aineid semestri kohta. Osakoormuse nõudeks on kumulatiivselt vähemalt 15 EAP õppekavajärgsete ainete sooritamine iga õppetööst osavõetud semestri kohta.";
            mfScenario6_1 = "Sa ei ole täitnud osakoormusel õppe nõuet ehk sooritanud minimaalselt 15 EAP õppekavajärgseid aineid semestris. Õnneks muudetakse vastavalt eeskirjale õppekoormuseid kui ka eksmatrikuleerimist ainult paarisarvulistel semestritel. Järgmise semestri lõpuks peaksid koguma vähemalt " +((this.universityAttendance+1)*15) + " EAP-d õppekavajärgseid aineid, et püsida osakoormusel.";
            mfScenario7_1 = "<b>Jätkad täiskoormusel õppimist, kuid pead maksma trahviraha.</b> Semestri lõpuks oleksid pidanud koguma " + (this.universityAttendance*30) + " EAP. Lubatud võlgnevus on kokku 6 EAPi. Kahjuks oled kogunud vähem kui " + (this.fullStudyLoadFreeLimit) + " EAP-d.";
            bpScenario1 = "<b>Kahjuks on viimane võimalus bakalaureuse tööd esitada-kaitsta mööda läinud ning oled koolist eksmatrikuleeritud.</b><br>";
            errorScenario = "<b>ERROR!</b><br>";
            bLastSemesterScenario = "<b>Järgnev, ehk 12. semester, on viimane võimalus oma õpingud lõpetada!</b><br>";
            bpScenario2 = "<b>Jätkad osakoormusel õppimist.</b><br>";
            bpScenario3_1 = "Pead järgneval semestril vähemalt " + (this.universityAttendance + 1 ) * 15 + " koormusarvutusel arvesse minevat EAPi omandama, et jätkata osakoormusel õppimist.";
            bpScenario4 = "<b>Jätkad õpingutega käesoleval ning järgneval semestril osakoormusel.</b><br>";
            bpScenario5 = "<b>Jätkad õpingutega osakoormusel.</b><br>";
            bpScenario5_1 = "Kui on soovi minna õpingutega üle täiskoormusele, siis pead omandama järgneva semestriga " +(this.universityAttendance+1)*22.5 + " EAPi";
            bpScenario6 = "<b>Jätkad õpingutega hetkel osakoormusel, kuid oled ületanud täiskoormuse lävendi.</b><br>";
            bpScenario6_1 = "Kui oled järgmine semester jätkuvalt üle nimetatud alampiiri, siis viiakse sind üle täiskoormusele.";
            bpScenario7 = "<b>Jätkad õpinguid täiskoormusel.</b><br>";
            bpScenario7_1 = "Oled täitnud täiskoormusel õppe nõude ehk sooritanud kumulatiivselt vähemalt 22,5 EAP õppekavajärgseid aineid semestri kohta.";
            mpScenario1 = "<b>Kahjuks on viimane võimalus magistri tööd esitada-kaitsta mööda läinud ning oled koolist eksmatrikuleeritud.</b><br>";
            mpScenario2 = "<b>Järgnev, ehk 8. semester, on viimane võimalus oma õpingud lõpetada!</b><br>";
            mpScenario3 = "<b>Jätkad õpingutega osakoormusel.</b><br>";
            abroadScenario = "<b>Viibid hetkel välisõppes/välispraktikal.</b>";
            sabbaticalLeaveScenario = "<b>Viibid hetkel akadeemilisel puhkusel.</b>";
        } else {
            schoolOverScenario = "<b>School successfully completed!</b><br>";
            bfScenario1 = "<b>The next semester is your last chance to finish your studies full-time!</b><br>";
            bfScenario1_1 = "You have passed all the post-curricular subjects, but you still have to submit your bachelor thesis.";
            bfScenario2 = "<b>The next semester is your last chance to finish your studies!</b><br></br>";
            bfScenario2_1 = "There is one 6 ECTS subject still to be completed as well as bachelor thesis still to be submitted and defended. After paying the penalty for substances not performed at the nominal time you will be able to complete your subjects full-time next school year and submit your thesis.";
            impossibleScenario = "<b>An impossible situation!</b><br>";
            bfScenario3 = "<b>You have completed the required number of semesters of the curriculum and will continue to study full-time.</b><br>";
            bfScenario3_1 = "If you are enrolled on a free place at university, you will continue to study for free.";
            bfScenario3_2 = "If you are enrolled on a free place at university and you get enough ECTS points over free full-time lower limit the next semester, you will continue to study for free.";
            exmatriculateScenario = "<b>Unfortunately, you are exmatriculated.</b><br>";
            exmatriculateScenario_1 = "According to the study regulations, you would have had to complete a minimum of 15 ECTS credits of post-curricular subjects during the first semester in order to continue your studies. Unfortunately, you have not fulfilled this requirement.";
            bfScenario4 = "<b>You will continue your studies full-time.</b><br> ";
            bfScenario4_1 = "You have completed fewer credits than the required number of credits (30 ECTS), but within the allowed number of credits (6 ECTS). If you are enrolled on a free place at the university, you will continue to study free of charge. \nExpect that you will have to make up the ECTS currently taken in the following semesters.";
            bfScenario5 = "<b>After the fine will be paid, you can continue to study full-time, but you will need to complete the minimum full-time limit the following semester.</b><br>";
            bfScenario5_1 = "By the end of the semester you should have accumulated " + (this.universityAttendance*30) + " ECTS. The total amount of debt allowed is 6 ECTS. Unfortunately, you have accumulated less than " + (this.fullStudyLoadFreeLimit) + " ECTS. Fortunately, according to the rules, the study load is only changed in even-numbered semesters. By the end of the next semester, you should have accumulated " + ((this.universityAttendance + 1) * 30) + " ECTS in post-study subjects. So that you don't have to pay a penalty, you should accumulate at least " + ((this.universityAttendance + 1) * 30 - 6) + " ECTS.";
            bfScenario6 = "<b>You fall to part time studies</b><br>";
            bfScenario6_1 = "Unfortunately, you have not fulfilled the full-time study requirement, i.e. have passed at least 22.5 ECTS of post-curricular subjects per semester. The part-time requirement is a cumulative total of at least 15 ECTS credits of post-curricular subjects per semester of part-time study.";
            exmatriculateScenario_2 = "You have not fulfilled the part-time study requirement, i.e. have completed a minimum of 15 ECTS credits of post-curricular subjects per semester. ";
            exmatriculateDangerScenario = "<b>Unfortunately, you're at risk of exmatriculation.</b><br>";
            exmatriculateDangerScenario_1 = "You have not fulfilled the part-time study requirement, i.e. have completed a minimum of 15 ECTS credits of post-curricular subjects per semester. Fortunately, according to the rules, both the course load and dismission are only changed in semesters with even numbers. By the end of the next semester, you should have accumulated at least " +((this.universityAttendance+1)*15) + " ECTS in post-curricular subjects in order to remain in part-time studies.";
            feeScenario1 = "<b>You will continue full-time studies but have to pay a fine.</b> By the end of the semester you should have accumulated " + (this.universityAttendance*30) + " ECTS. The total amount of debt allowed is 6 ECTS. Unfortunately, you have accumulated less than " + (this.fullStudyLoadFreeLimit) + " ECTS.";
            mfScenario1 = "You have passed all the post-curricular subjects, but you still have to submit and defend your master's thesis.";
            mfScenario2 = "<b>The next semester is your last chance to finish your studies!</b><br>";
            mfScenario2_1 = "There is one 6 ECTS subject still to be completed as well as master's thesis still to be submitted and defended. After paying the penalty you will be able to complete your subjects and submit your thesis in full time the following school year.";
            mfScenario3_1 = "You have completed fewer credits than the required number of credits (30 ECTS), but within the allowed number of credits (6 ECTS). If you are enrolled on a free place at the university, you will continue to study free of charge. \nExpect that you will have to make up the ECTS currently taken in the following semesters.";
            mfScenario4_1 = "By the end of the semester you should have accumulated " + (this.universityAttendance*30) + " ECTS. The total amount of debt allowed is 6 ECTS. Unfortunately, you have accumulated less than " + (this.fullStudyLoadFreeLimit) + " ECTS. Fortunately, according to the rules, the study load is only changed in even-numbered semesters. By the end of the next semester, you should have accumulated " + ((this.universityAttendance + 1) * 30) + " ECTS in post-study subjects. So that you don't have to pay a penalty, you should accumulate at least " + ((this.universityAttendance + 1) * 30 - 6) + " ECTS.";
            mfScenario5_1 = "Unfortunately, you have not fulfilled the full-time study requirement, i.e. have passed at least 22.5 ECTS of post-curricular subjects per semester. The part-time requirement is a cumulative total of at least 15 ECTS credits of post-curricular subjects per semester of part-time study.";
            mfScenario6_1 = "You have not fulfilled the part-time study requirement, i.e. have completed a minimum of 15 ECTS credits of post-curricular subjects per semester. Fortunately, according to the rules, both the course load and dismission are only changed in semesters with even numbers. By the end of the next semester, you should have accumulated at least " +((this.universityAttendance+1)*15) + " ECTS in post-curricular subjects in order to remain in part-time studies.";
            mfScenario7_1 = "<b>You will continue full-time studies but have to pay a fine.</b> By the end of the semester you should have accumulated " + (this.universityAttendance*30) + " ECTS. The total amount of debt allowed is 6 ECTS. Unfortunately, you have accumulated less than " + (this.fullStudyLoadFreeLimit) + " ECTS.";
            bpScenario1 = "<b>Unfortunately, the last chance to submit your bachelor thesis has passed and you've been exmatriculated from school.</b><br>";
            errorScenario = "<b>ERROR!</b><br>";
            bLastSemesterScenario = "<b>The next, or 12th semester, is your last chance to finish your studies!</b><br>";
            bpScenario2 = "You will continue studying part-time.";
            bpScenario3_1 = "You must accumulate at least " + (this.universityAttendance + 1 ) * 15 + " ECTS in the following semester to continue studying part-time.";
            bpScenario4 = "You will continue your studies part-time this and following semester.";
            bpScenario5 = "You will continue your studies part-time. ";
            bpScenario5_1 = "If you wish to switch to full-time studies, you will need to acquire " + (this.universityAttendance + 1) * 22.5 + " ECTS in the following semester.";
            bpScenario6 = "<b>You are currently studying part-time but have exceeded the full-time threshold.</b><br>";
            bpScenario6_1 = "If you continue to exceed this minimum limit in the following semester, you will be transferred to full-time.";
            bpScenario7 = "<b>You will continue your studies full-time.</b><br>";
            bpScenario7_1 = "You have fulfilled the full-time study requirement, i.e. have completed at least 22.5 ECTS of post-curricular subjects per semester.";
            mpScenario1 = "<b>Unfortunately, the last chance to submit your master's thesis has passed and you've been dismissed from school.</b><br>";
            mpScenario2 = "<b>The next, or 8th semester, is your last chance to finish your studies!</b><br>";
            mpScenario3 = "You will continue your studies part-time.";
            abroadScenario = "<b>You are currently studying/interning abroad.</b>";
            sabbaticalLeaveScenario = "<b>You are currently on academic leave.</b>";

        }
    
        if($("input[name='currently_studying_abroad']:checked").val() == "yes"){
            $("#scenario").html(abroadScenario);
        }
        else if($("input[name='current_sabbatical_leave']:checked").val() == "yes"){
            $("#scenario").html(sabbaticalLeaveScenario);
        } else {
            if(this.payLoad == "free"){
                if(this.degree == "bachelors"){
                    if(this.ectsCount == 180){
                        $("#scenario").html(schoolOverScenario);
                    } else if(this.ectsCount > 162 && this.ectsCount < 180 && this.ectsCount != 168){
                        $("#scenario").html(impossibleScenario);
                    } else if(this.universityAttendance == 6 && this.ectsCount == 168){
                        $("#scenario").html(bfScenario1);
                        $("#scenario").append(bfScenario1_1);
                        this.payLoad = "free";
                    } else if(this.universityAttendance == 6 && this.ectsCount == 162){
                        $("#scenario").html(bfScenario2);
                        $("#scenario").append(bfScenario2_1);
                        this.feeType = 3;
                    } else if(this.universityAttendance == 6 && this.ectsCount < 162 && this.ectsCount > this.studyLowerLimit){
                        $("#scenario").html(bfScenario6);
                        $("#scenario").append(bfScenario6_1);
                        this.payLoad = "paid";
                        this.feeType = 2;
                    } else if(this.ectsCount == 168 && this.universityAttendance < 6){
                        $("#scenario").html(bfScenario3); 
                        $("#scenario").append(bfScenario3_1 + "<br>");
                        $("#scenario").append(bfScenario1_1);
                        this.payLoad = "free";
                    
                    } else {
                        if(this.ectsCount >= (this.fullStudyLoadFreeLimit + 6) && this.universityAttendance < 6){
                            $("#scenario").html(bfScenario3); 
                            $("#scenario").append(bfScenario3_1);
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_1);
                            this.feeType = 4;
                        } else if(this.ectsCount >= this.fullStudyLoadFreeLimit && this.universityAttendance < 6 && this.ectsCount < (this.fullStudyLoadFreeLimit + 6)){
                            $("#scenario").html(bfScenario4); 
                            $("#scenario").append(bfScenario4_1);
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1 && this.universityAttendance < 6 && this.fullStudyLoadLowerLimit > this.ectsCount){
                            $("#scenario").html(bfScenario5);
                            $("#scenario").append(bfScenario5_1);
                            this.feeType = 1;
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0 && this.ectsCount >= this.studyLowerLimit){
                            $("#scenario").html(bfScenario6);
                            $("#scenario").append(bfScenario6_1);
                            this.feeType = 2;
                        } else if(this.ectsCount < (this.universityAttendance-1)*(this.partTimeStudyLoadMinimumConfig/2) && this.universityAttendance % 2 == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.feeType = 4;
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.feeType = 4;
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateDangerScenario);
                            $("#scenario").append(exmatriculateDangerScenario_1);
                        } else if(this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance < 6 && this.ectsCount < this.fullStudyLoadFreeLimit){
                            $("#scenario").html(feeScenario1);
                            this.feeType = 1;
                        }
                    }
                } else if(this.degree == "masters"){
                    if(this.ectsCount == 120){
                        $("#scenario").html(schoolOverScenario);
                    } else if(this.ectsCount > 90 && this.ectsCount < 120 && this.ectsCount != 96){
                        $("#scenario").html(impossibleScenario);
                    } else if(this.universityAttendance == 4 && this.ectsCount == 96){
                        $("#scenario").html(bfScenario1);
                        $("#scenario").append(mfScenario1);
                        this.payLoad = "free";
                    } else if(this.universityAttendance == 4 && this.ectsCount == 90){
                        $("#scenario").html(mfScenario2);
                        $("#scenario").append(mfScenario2_1);
                        this.feeType = 3;
                    } else if(this.ectsCount == 96 && this.universityAttendance < 4){
                        $("#scenario").html(bfScenario3); 
                        $("#scenario").append(bfScenario3_1 + "<br>");
                        $("#scenario").append(mfScenario1);
                        this.payLoad = "free";
                    } else {
                        if(this.ectsCount >= (this.fullStudyLoadFreeLimit + 6) && this.universityAttendance < 4){
                            $("#scenario").html(bfScenario3); 
                            $("#scenario").append(bfScenario3_1);
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_1);
                            this.feeType = 4;
                        } else if(this.ectsCount >= this.fullStudyLoadFreeLimit && this.universityAttendance < 4 && this.ectsCount < (this.fullStudyLoadFreeLimit + 6)){
                            $("#scenario").html(bfScenario4); 
                            $("#scenario").append(mfScenario3_1);
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1 && this.universityAttendance < 4 && this.fullStudyLoadLowerLimit > this.ectsCount){
                            $("#scenario").html(bfScenario5);
                            $("#scenario").append(mfScenario4_1);
                            this.feeType = 1;
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0 && this.ectsCount >= this.studyLowerLimit){
                            $("#scenario").html(bfScenario6);
                            $("#scenario").append(mfScenario5_1);
                            this.feeType = 2;
                        } else if(this.ectsCount < (this.universityAttendance-1)*(this.partTimeStudyLoadMinimumConfig/2) && this.universityAttendance % 2 == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.feeType = 4;
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.feeType = 4;
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateDangerScenario);
                            $("#scenario").append(mfScenario6_1);
                        } else if(this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance < 4 && this.ectsCount < this.fullStudyLoadFreeLimit){
                            $("#scenario").html(mfScenario7_1);
                            this.feeType = 1;
                        }
                    }
                }
            } else if(this.payLoad == "paid"){
                if(this.degree == "bachelors"){
                    if(this.ectsCount == 180){
                        $("#scenario").html(schoolOverScenario);
                    } else if(this.ectsCount > 162 && this.ectsCount < 180 && this.ectsCount != 168){
                        $("#scenario").html(impossibleScenario);
                    } else if(this.universityAttendance == 12){
                        if(this.ectsCount == 180){
                            $("#scenario").html(schoolOverScenario);
                        } else if(this.ectsCount < 180){
                            $("#scenario").html(bpScenario1);
                        } else {
                            $("#scenario").html(errorScenario);
                        }
                    } else if(this.universityAttendance == 11 && this.ectsCount >= 165){
                        $("#scenario").html(bLastSemesterScenario);
                        this.feeType = 2;
                    } else {
                        if(this.universityAttendance == 6 && this.ectsCount == 168){
                            $("#scenario").html(bfScenario1);
                            $("#scenario").append(bfScenario1_1 + "<br>");
                            $("#scenario").append(bfScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance < 6 && this.ectsCount == 168 && this.universityAttendance % 2 == 0){
                            $("#scenario").html(bfScenario3);
                            $("#scenario").append(bfScenario1_1  + "<br>");
                            $("#scenario").append(bfScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance < 6 && this.ectsCount == 168 && this.universityAttendance % 2 == 1){
                            $("#scenario").html(bpScenario6);
                            $("#scenario").append(bfScenario1_1  + "<br>");
                            $("#scenario").append(bfScenario3_2);
                            this.payLoad = "free";
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance >= 6){
                            $("#scenario").html(bpScenario2);
                            this.feeType = 2;
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_1);
                            this.payLoad = "free";
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance >= 6 && this.universityAttendance % 2 == 0){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                        } else if(this.ectsCount < (this.universityAttendance-1)*(this.partTimeStudyLoadMinimumConfig/2) && this.universityAttendance % 2 == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit && this.universityAttendance < 6){
                            $("#scenario").html(exmatriculateDangerScenario);
                            $("#scenario").append(bpScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateDangerScenario);
                            $("#scenario").append(bpScenario3_1);
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 6 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html(bpScenario4);
                            this.feeType = 2;
                            this.payLoad = "free";
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 6 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html(bpScenario5);
                            $("#scenario").append(bpScenario5_1);
                            this.feeType = 2;
                            this.payLoad = "free";
                        } else if(this.universityAttendance < 6 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html(bpScenario6);
                            $("#scenario").append(bpScenario6_1);
                            this.feeType = 2;
                            this.payLoad = "free";
                        } else if(this.universityAttendance < 6 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html(bpScenario7);
                            $("#scenario").append(bpScenario7_1);
                            $("#scenario").append(bfScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit && this.universityAttendance < 6){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                        }
                    }
                } else if(this.degree = "masters"){
                    if(this.ectsCount == 120){
                        $("#scenario").html(schoolOverScenario);
                    } else if(this.ectsCount > 90 && this.ectsCount < 120 && this.ectsCount != 96){
                        $("#scenario").html(impossibleScenario);
                    } else if(this.universityAttendance == 8){
                        if(this.ectsCount == 120){
                            $("#scenario").html(schoolOverScenario);
                        } else if(this.ectsCount < 120){
                            $("#scenario").html(mpScenario1);
                        } else {
                            $("#scenario").html(errorScenario);
                        }
                    } else if(this.universityAttendance == 7 && this.ectsCount >= 96){
                        $("#scenario").html(mpScenario2);
                        this.feeType = 2;
                    } else {
                        if(this.universityAttendance == 4 && this.ectsCount == 96){
                            $("#scenario").html(bfScenario1);
                            $("#scenario").append(mfScenario1 + "<br>");
                            $("#scenario").append(bfScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance < 4 && this.ectsCount == 96 && this.universityAttendance % 2 == 0){
                            $("#scenario").html(bfScenario3);
                            $("#scenario").append(mfScenario1  + "<br>");
                            $("#scenario").append(bfScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance < 4 && this.ectsCount == 96 && this.universityAttendance % 2 == 1){
                            $("#scenario").html(bpScenario6);
                            $("#scenario").append(mfScenario1  + "<br>");
                            $("#scenario").append(bfScenario3_2);
                            this.payLoad = "free";
                        } else if(this.ectsCount >= this.studyLowerLimit && this.universityAttendance >= 4){
                            $("#scenario").html(bpScenario2);
                            this.feeType = 2;
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_1);
                            this.payLoad = "free";
                        } else if(this.ectsCount < this.studyLowerLimit && this.universityAttendance >= 4 && this.universityAttendance % 2 == 0){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                        } else if(this.ectsCount < (this.universityAttendance-1)*(this.partTimeStudyLoadMinimumConfig/2) && this.universityAttendance % 2 == 1){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit && this.universityAttendance < 4){
                            $("#scenario").html(exmatriculateDangerScenario);
                            $("#scenario").append(bpScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 1 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateDangerScenario);
                            $("#scenario").append(bpScenario3_1);
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 4 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html(bpScenario4);
                            this.payLoad = "free";
                            this.feeType = 2;
                        } else if(this.ectsCount < this.fullStudyLoadLowerLimit && this.universityAttendance < 4 && this.ectsCount >= this.studyLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html(mpScenario3);
                            $("#scenario").append(bpScenario5_1);
                            this.payLoad = "free";
                            this.feeType = 2;
                        } else if(this.universityAttendance < 4 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 1){
                            $("#scenario").html(bpScenario6);
                            $("#scenario").append(bpScenario6_1);
                            this.payLoad = "free";
                            this.feeType = 2;
                        } else if(this.universityAttendance < 4 && this.ectsCount >= this.fullStudyLoadLowerLimit && this.universityAttendance % 2 == 0){
                            $("#scenario").html(bpScenario7);
                            $("#scenario").append(bpScenario7_1);
                            $("#scenario").append(bfScenario3_1);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit && this.universityAttendance < 4){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                            this.payLoad = "free";
                        } else if(this.universityAttendance % 2 == 0 && this.ectsCount < this.studyLowerLimit){
                            $("#scenario").html(exmatriculateScenario);
                            $("#scenario").append(exmatriculateScenario_2);
                        }
                    }
                }
            }
        }
    }
}
