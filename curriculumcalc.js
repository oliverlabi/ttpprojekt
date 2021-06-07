function getParameter(){
    let url = window.location.href;
    let parameters = url.split("?").pop();
	if(parameters != ""){
		let splitParam = new URLSearchParams(parameters);
        let incrementValue = 0;
		splitParam.forEach(function(value, key) {
            incrementValue = incrementValue + 1;
		});	
        if(incrementValue == 8){
            let paramCalculation = new CurriculumCalculator(1);
        }							
	}
}

class CurriculumCalculator{
    constructor(parameterCheck){
        this.parameterCheck = parameterCheck;
        this.bachelorsCurriculums = ["Informaatika", "Infoteadus", "Matemaatika, majandusmatemaatika ja andmeanalüüs"];
        this.mastersCurriculums = ["Haridustehnoloogia", "Infotehnoloogia juhtimine", "Infoteadus", "Informaatikaõpetaja", "Matemaatikaõpetaja", "Avatud ühiskonna tehnoloogiad", "Digitaalsed õpimängud", "Inimese ja arvuti interaktsioon", "Interaktsioonidisain"];
        this.attendanceCount = $("#curriculum_attendance").val();
        this.sabbaticalCount = $("#sabbatical_leave").val();
        this.ectsCount = $("#ects_count").val();
        this.abroadSemesterCount = $("#abroad_semester_count").val();
        this.abroadEctsCount = $("#abroad_ects_count").val();
        this.currentSabbaticalLeave = 0;
        this.currentAbroadStudies = 0;
        this.scenarioText = "";
        this.studyLowerLimit = 0;
        this.fullStudyLoadLowerLimit = 0;
        this.studyLoad = "";
        this.curriculumChoice = $("#curriculum_dropdown :selected").text();
        this.degree = "none";
        this.checkParameters(this.parameterCheck);
        this.init();
    }

    init(){
        if(this.inputValidation() == 1){
            $("#error").html("");
            $("#result_error").html("");
            $("#input_area_buttons").css("display", "none");
            $("#result_area_buttons").css("display", "block");
            $("#error").css("display", "none");
            $("#result_error").css("display", "block");
            this.calcStudyLimits();
            this.checkStudyLoad();
            this.checkCurriculumDegree();
            this.drawResultBox();
            this.setParameters();
        } else {
            $("#error").html("Kontrollige üle sisestuslahtrid!");
            $("#result_error").html("Kontrollige üle sisestuslahtrid!");
        }
        $("#new_calculation_button").on("click", ()=>{this.pageReload();});
    }
	
    checkParameters(){ 
        if(this.parameterCheck == 1){ 
            let url = window.location.href;
            let parameters = url.split("?").pop();
	        if(parameters != ""){
		        let splitParam = new URLSearchParams(parameters);
                let incrementValue = 0;
                let values = [];
		        splitParam.forEach(function(value, key) {
                    values[incrementValue] = value;
                    incrementValue = incrementValue + 1;
		        });
                for(let i=0; i<values.length; i++){
                    if(i == 0){
                        this.curriculumChoice = values[i];
                    } else if(i == 1){
                        this.attendanceCount = values[i];
                    } else if(i == 2){
                        this.ectsCount = values[i];
                    } else if(i == 3){
                        this.sabbaticalCount = values[i];
                    } else if(i == 4){
                        this.abroadSemesterCount = values[i];
                    } else if(i == 5){
                        this.abroadEctsCount = values[i];
                    } else if(i == 6){
                        this.currentSabbaticalLeave = values[i];
                    } else if(i == 7){
                        this.currentAbroadStudies = values[i];
                    }
                }
                $("#curriculum_choice_area").css("display", "none");
                $("#curriculum_choice_area_buttons").css("display", "none");
                $("#input_area").css("display", "block");
                $("#curriculum_dropdown :selected").text(this.curriculumChoice);
                $("#curriculum_attendance").val(this.attendanceCount);
                $("#sabbatical_leave").val(this.sabbaticalCount);
                $("#ects_count").val(this.ectsCount);
                $("#abroad_semester_count").val(this.abroadSemesterCount);
            }
        }
    }

	setParameters(){
		var url = new URL("http://greeny.cs.tlu.ee/~karlkor/projekt/curriculumcalc.html?sel=Informaatika&cur=2&ect=98&sab=0&abr=0&ectsabr=0&cursab=0&curabr=0");
		var search_params = url.searchParams;
		search_params.set("sel",this.curriculumChoice);
		search_params.set("cur",this.attendanceCount);
		search_params.set("ect",this.ectsCount);
		search_params.set("sab",this.sabbaticalCount);
		search_params.set("abr",this.abroadSemesterCount);
		search_params.set("ectabr",this.abroadEctsCount);
		search_params.set("cursab",this.currentSabbaticalLeave);
		search_params.set("curabr",this.currentAbroadStudies);
		
		url.search = search_params.toString();
		var new_url = url.toString();
		
		var queryParams = new URLSearchParams(window.location.search);
		queryParams.set("sel",this.curriculumChoice);
		queryParams.set("cur",this.attendanceCount);
		queryParams.set("ect",this.ectsCount);
		queryParams.set("sab",this.sabbaticalCount);
		queryParams.set("abr",this.abroadSemesterCount);
		queryParams.set("ectabr",this.abroadEctsCount);
		queryParams.set("cursab",this.currentSabbaticalLeave);
		queryParams.set("curabr",this.currentAbroadStudies);
		history.pushState(null, null, "?"+queryParams.toString());
	}

    pageReload(){
        location.reload();
    }

    inputValidation(){
        if(this.curriculumChoice != "Vali õppekava..." && this.attendanceCount > 0 && this.sabbaticalCount >= 0 && this.ectsCount > 0){
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


    calcStudyLimits(){
        this.studyLowerLimit = (this.attendanceCount * 30) * 0.5;
        $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + this.studyLowerLimit + " EAP");
        this.fullStudyLoadLowerLimit = this.attendanceCount * 22.5;
        $("#full_study_load_limit_result").html("Vajalik alampiir õpingute jätkamiseks täiskoormuses: " + this.fullStudyLoadLowerLimit + " EAP");
    }

    checkStudyLoad(){
        if(this.ectsCount < this.fullStudyLoadLowerLimit){
            this.studyLoad = "Osakoormus";
            $("#study_load").html("Õppekoormus: " + this.studyLoad);
        } else {
            this.studyLoad = "Täiskoormus";
            $("#study_load").html("Õppekoormus: " + this.studyLoad);
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

    drawResultBox(){
        if($("#error").html("")){
            $("#curriculum_result").html("Sinu õppekava: " + this.curriculumChoice);
            $("#ects_result").html("Sinu ainepunktide arv: " + this.ectsCount + " EAP");
            $("#result_padding").css("display", "block");
            $("#results").css("display", "block");
            this.calcScenario();
        }
    }

    calcScenario(){
        if(this.ectsCount >= this.fullStudyLoadLowerLimit){
            $("#scenario").html("Jätkad täiskoormusel õppimist.");
        }
        if(this.ectsCount <= this.fullStudyLoadLowerLimit){
            $("#scenario").html("Langed õpingutega osakoormusele.");
        }
        if(this.attendanceCount % 2 == 0 && this.ectsCount < this.studyLowerLimit){
            $("#scenario").html("<b>Oled eksmatrikuleerimisohus, kuna EAP-de arv on väiksem kui õppes jätkamise alampiir!</b>");
        }

        // ERIJUHTUMID
        if(this.degree = "masters" && this.attendanceCount == 4 && this.ectsCount == 96){
            $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
            $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel magistri lõputöö.");
        }
        if(this.degree = "bachelors" && this.attendanceCount == 6 && this.ectsCount == 168){
            $("#scenario").html("<b>Käesolev semester on viimane võimalus oma õpingud lõpetada!</b><br>");
            $("#scenario").append("Oled sooritanud kõik õppekavajärgsed ained, kuid esitamist-kaitsmist ootab veel bakalaureuse lõputöö.");
        }
        if($("input[name='currently_studying_abroad']:checked").val() == "yes"){
            $("#scenario").html("<b>Viibid hetkel välisõppes/välispraktikal.</b>");
        }
    }
}

$("#abroad_yes").on("click", function(){
    $("#abroad_input_area").css("display", "block");
})

$("#abroad_no").on("click", function(){
    $("#abroad_input_area").css("display", "none");
})

$("#continue_button").on("click", function(){
    if($("#curriculum_dropdown :selected").text() == "Vali õppekava..."){
        $("#error").html("Vali õppekava!");
    } else {
        $("#error").html("");
        $("#curriculum_choice_area").css("display", "none");
        $("#curriculum_choice_area_buttons").css("display", "none");
        $("#input_area").css("display", "block");
        $("#input_area_buttons").css("display", "block");
    }
    
})

$("#back_button").on("click", function(){
    $("#curriculum_choice_area").css("display", "block");
    $("#curriculum_choice_area_buttons").css("display", "block");
    $("#input_area").css("display", "none");
    $("#input_area_buttons").css("display", "none");
})

$("#calculate_button").click(function(){
    let calculation = new CurriculumCalculator(0);
})

$("#result_calculate_button").click(function(){
    let calculation = new CurriculumCalculator(0);
})

window.onload = (event) => {
  getParameter();
};
















