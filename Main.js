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
        this.currentSabbaticalLeave = 0;
        this.currentAbroadStudies = 0;
        this.curriculumChoice = $("#curriculum_dropdown :selected").text();
        this.bachelorsCurriculums = ["Informaatika", "Infoteadus", "Matemaatika, majandusmatemaatika ja andmeanalüüs"];
        this.mastersCurriculums = ["Haridustehnoloogia", "Infotehnoloogia juhtimine", "Infoteadus", "Informaatikaõpetaja", "Matemaatikaõpetaja", "Avatud ühiskonna tehnoloogiad", "Digitaalsed õpimängud", "Inimese ja arvuti interaktsioon", "Interaktsioonidisain"];
        this.fullStudyLoadLowerLimit = 0;
        this.studyLowerLimit = 0;
        this.scenarioText = "";
        this.studyLoad = "";
        this.attendanceCount = $("#curriculum_attendance").val();
        this.sabbaticalCount = $("#sabbatical_leave").val();
        this.ectsCount = $("#ects_count").val();
        this.abroadSemesterCount = $("#abroad_semester_count").val();
        this.abroadEctsCount = $("#abroad_ects_count").val();
        this.degree = "none";
        this.universityAttendance = this.attendanceCount - this.sabbaticalCount;
        this.init();
    }

    init(){
        if(Validation.prototype.inputValidation() == 1){
            $("#error").html("");
            $("#result_error").html("");
            $("#input_area_buttons").css("display", "none");
            $("#result_area_buttons").css("display", "block");
            $("#error").css("display", "none");
            $("#result_error").css("display", "block");
            Calculation.prototype.calcStudyLimits.call(this);
            Calculation.prototype.calcStudyLoad.call(this);
            Calculation.prototype.checkCurriculumDegree.call(this);
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
		let url = new URL("http://greeny.cs.tlu.ee/~karlkor/projekt/index.html?sel=Informaatika&cur=2&ect=98&sab=0&abr=0&ectsabr=0&cursab=0&curabr=0");
		let search_params = url.searchParams;
		search_params.set("sel",this.curriculumChoice);
		search_params.set("cur",this.attendanceCount);
		search_params.set("ect",this.ectsCount);
		search_params.set("sab",this.sabbaticalCount);
		search_params.set("abr",this.abroadSemesterCount);
		search_params.set("ectabr",this.abroadEctsCount);
		search_params.set("cursab",this.currentSabbaticalLeave);
		search_params.set("curabr",this.currentAbroadStudies);
		
		url.search = search_params.toString();
		let new_url = url.toString();
		
		let queryParams = new URLSearchParams(window.location.search);
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

    drawResultBox(){
        if($("#error").html("")){
            $("#curriculum_result").html("Sinu õppekava: " + this.curriculumChoice);
            $("#ects_result").html("Sinu ainepunktide arv: " + this.ectsCount + " EAP");
            $("#result_padding").css("display", "block");
            $("#results").css("display", "block");
            Calculation.prototype.calcScenario.call(this);
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
        $("#time_on_page").css("display", "block");
    }
    
})

$("#back_button").on("click", function(){
    $("#curriculum_choice_area").css("display", "block");
    $("#curriculum_choice_area_buttons").css("display", "block");
    $("#input_area").css("display", "none");
    $("#input_area_buttons").css("display", "none");
    $("#time_on_page").css("display", "none");
})


$("#calculate_button").click(function(){
    
    let calculation = new CurriculumCalculator;
})

$("#result_calculate_button").click(function(){
    let calculation = new CurriculumCalculator;
})

window.onload = (event) => {
  getParameter();
};
