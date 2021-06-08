class CurriculumCalculator{
    constructor(language){
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
        this.lang = language;
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
        } else {
            $("#error").html("Kontrollige üle sisestuslahtrid!");
            $("#result_error").html("Kontrollige üle sisestuslahtrid!");
        }
        $("#new_calculation_button").on("click", ()=>{this.pageReload();});
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

let lang = 0;

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

$("#pdf_save_button").on("click", function(){
    html2canvas($("#whole_page_area"), {
        onrendered: function(canvas) {         
            var imgData = canvas.toDataURL(
                "image/png");              
            var doc = new jsPDF("p", "mm");
            doc.addImage(imgData, "PNG", 10, 10);
            doc.save("TLU_calculation.pdf");
        }
    });
})

$("#calculate_button").click(function(){
    let calculation = new CurriculumCalculator;
    if(lang == 1){
        ResultToEng();
    }
})

$("#result_calculate_button").click(function(){
    let calculation = new CurriculumCalculator;
    if(lang == 1){
        ResultToEng();
    }
})

function ResultToEng(){
    $("#curriculum_result").html("Your curriculum: " + $("#curriculum_dropdown :selected").text());
    $("#ects_result").html("Your number of ECTS: " + $("#ects_count").val() + " ECTS");
    if($("#ects_count").val() < ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#study_load").html("Study load: Part time");
    } else {
        $("#study_load").html("Study load: Full time");
    }
    $("#study_lower_limit_result").html("The lower limit for continuing learning: " + ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5) + " ECTS");
    $("#full_study_load_limit_result").html("Minimum required for full-time studies: " + (($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5) + " ECTS");
    
    if($("#ects_count").val() >= ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#scenario").html("You will continue to study full-time.");
    }
    if($("#ects_count").val() <= ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#scenario").html("You fall to part-time studies.");
    }
    if(($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) % 2 == 0 && $("#ects_count").val() < ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5)){
        $("#scenario").html("<b>You are at risk of expulsion because the number of ECTS is lower than the minimum number of continuing studies</b>");
    }
}

function CalculatorToEng() {
    if(lang == 0){
        lang = 1;
    } else {
        lang = 0;
    }
    document.getElementById('heading').innerHTML = "Curriculum scenario calculator";
    document.getElementById('info_text').innerHTML = "Study data can be found in the study information system under study results (ÕIS)";
    document.getElementById('curriculum_dropdown_label').innerHTML = "Choose a curriculum";
    document.getElementById('select_curriculum').innerHTML = "Choose a curriculum...";
    document.getElementById('computer_science').innerHTML = "informatics";
    document.getElementById('info_science').innerHTML = "Information science";
    document.getElementById('mathematics').innerHTML = "Mathematics, economic mathematics and data analysis";
    document.getElementById('education_technology').innerHTML = "Educational technology";
    document.getElementById('computer_science_business').innerHTML = "Information technology management";
    document.getElementById('computer_science_teacher').innerHTML = "Informatics teacher";
    document.getElementById('mathematics_teacher').innerHTML = "Math teacher";
    document.getElementById('open_society_technologies').innerHTML = "Open society technologies";
    document.getElementById('digital_study_games').innerHTML = "Digital learning games";
    document.getElementById('human_and_computer_interaction').innerHTML = "Human and computer interaction";
    document.getElementById('interaction_design').innerHTML = "Interaction design";
    document.getElementById('free_label').innerHTML = "Free";
    document.getElementById('paid_label').innerHTML = "Paid";
    document.getElementById('continue_button').innerHTML = "Next";
    document.getElementById('curriculum_attendance_label').innerHTML = "Number of semesters spent at TU";
    document.getElementById('sabbatical_leave_label').innerHTML = "Number of semesters on academic leave";
    document.getElementById('ects_count_label').innerHTML = "ECTS to be taken into account in the completion of the curriculum";
    document.getElementById('studied_abroad_label').innerHTML = "Have you been in foreign studies or foreign traineeships?";
    document.getElementById('currently_studying_abroad_label').innerHTML = "Are you currently in foreign studies or foreign internships?";
    document.getElementById('abroad_semester_count_label').innerHTML = "Number of semesters spent in foreign studies";
    document.getElementById('abroad_ects_count_label').innerHTML = "Number of ECTS completed in foreign studies";
    document.getElementById('studied_estonian_label').innerHTML = "Have you been assigned and completed the in-depth study of the national language?";
    document.getElementById('current_sabbatical_leave_label').innerHTML = "Are you currently on academic leave?";
    document.getElementById('back_button').innerHTML = "Back";
    document.getElementById('calculate_button').innerHTML = "Calculate";
    document.getElementById('first_help_txt').innerHTML = "Includes all semesters spent at Tallinn University (incl. academic leave, foreign studies, etc.)";
    document.getElementById('first_help_txt').style.width = "240px";
    document.getElementById('second_help_txt').style.width = "190px";
    document.getElementById('fourth_help_txt').style.top = "0.5px";
    document.getElementById('second_help_txt').innerHTML = 'Study information system (Õis) box "including academically"';
    document.getElementById('third_help_txt').innerHTML = 'Study information system (Õis) box "ECTS to be taken into account in the load calculation as of the end of the autumn semester and academic year""';
    document.getElementById('fourth_help_txt').innerHTML = "The completion of the in-depth study module is mandatory only for students of Estonian-language curricula whose Estonian language level does not meet the C1 requirement established by the university and who are assigned by the TU, on the basis of a placement test, to complete the in-depth study module.";
    document.getElementById('result_heading').innerHTML = "Result";
    document.getElementById('new_calculation_button').innerHTML = "New calculation";
    document.getElementById('result_calculate_button').innerHTML = "Calculate";
    document.getElementById('pdf_save_button').innerHTML = "Save as PDF";

    var x = document.getElementsByClassName("yes_label");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML = "Yes";
    }
    var y = document.getElementsByClassName("no_label");
    var j;
    for (j = 0; j < y.length; j++) {
        y[j].innerHTML = "No";
    }
    
}
