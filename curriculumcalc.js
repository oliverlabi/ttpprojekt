class CurriculumCalculator{
    constructor(){
        this.bachelorsCurriculums = ["Informaatika", "Infoteadus", "Matemaatika, majandusmatemaatika ja andmeanalüüs"];
        this.mastersCurriculums = ["Haridustehnoloogia", "Infotehnoloogia juhtimine", "Infoteadus", "Informaatikaõpetaja", "Matemaatikaõpetaja", "Avatud ühiskonna tehnoloogiad", "Digitaalsed õpimängud", "Inimese ja arvuti interaktsioon", "Interaktsioonidisain"];
        this.attendanceCount = $("#curriculum_attendance").val();
        this.sabbaticalCount = $("#sabbatical_leave").val();
        this.universityAttendance = this.attendanceCount - this.sabbaticalCount;
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
        }else {
            $("#error").html("Kontrollige üle sisestuslahtrid!");
            $("#result_error").html("Kontrollige üle sisestuslahtrid!");
        }
        $("#new_calculation_button").on("click", ()=>{this.pageReload();});
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
        this.studyLowerLimit = (this.universityAttendance * 30) * 0.5;
        $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + this.studyLowerLimit + " EAP");
        this.fullStudyLoadLowerLimit = this.universityAttendance * 22.5;
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
}

$("#abroad_yes").on("click", function(){
    $("#abroad_input_area").css("display", "block");
})

$("#abroad_no").on("click", function(){
    $("#abroad_input_area").css("display", "none");
})


/*var seconds = 0; //OOP eksami osa
var interval;
$("#continue_button").click( function(){
    interval = setInterval(function(){
        seconds += 1;
        console.log("siin");
        $("#time_on_page").html(seconds);
    }, 1000);
});
$("#calculate_button").click( function(){
    clearInterval(interval);
    seconds = 0;
});*/

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
    /*clearInterval(interval); //OOP eksami osa
    seconds = 0;
    $("#time_on_page").html(seconds);*/
})


$("#calculate_button").click(function(){
    
    let calculation = new CurriculumCalculator;
})

$("#result_calculate_button").click(function(){
    let calculation = new CurriculumCalculator;
})

function CalculatorToEng() {
    document.getElementById('heading').innerHTML = "Curriculum scenario calculator";
    document.getElementById('info_text').innerHTML = "Study data can be found in Õis under study results";
    document.getElementById('curriculum_dropdown_label').innerHTML = "Curriculum";
    document.getElementById('select_curriculum').innerHTML = "Choose a curriculum";
    document.getElementById('computer_science').innerHTML = "Computer science";
    document.getElementById('info_science').innerHTML = "Info science";
    document.getElementById('mathematics').innerHTML = "Mathematics";
    document.getElementById('education_technology').innerHTML = "Education technology";
    document.getElementById('computer_science_business').innerHTML = "Computer science business";
    document.getElementById('computer_science_teacher').innerHTML = "Computer science teacher";
    document.getElementById('mathematics_teacher').innerHTML = "Mathematics teacher";
    document.getElementById('open_society_technologies').innerHTML = "Open society technologies";
    document.getElementById('digital_study_games').innerHTML = "Digital study games";
    document.getElementById('human_and_computer_interaction').innerHTML = "Human and computer interaction";
    document.getElementById('interaction_design').innerHTML = "Interaction design";
    document.getElementById('free_label').innerHTML = "Free";
    document.getElementById('paid_label').innerHTML = "Paid";
    document.getElementById('continue_button').innerHTML = "Next";
    document.getElementById('curriculum_attendance_label').innerHTML = "Number of semesters spent at TU";
    document.getElementById('sabbatical_leave_label').innerHTML = "Number of semesters spent on academic leave";
    document.getElementById('ects_count_label').innerHTML = "EAPs taken into account when completing the curriculum";
    document.getElementById('studied_abroad_label').innerHTML = "Have you studied abroad or on internship?";
    document.getElementById('currently_studying_abroad_label').innerHTML = "Are you currently studying abroad or on internship?";
    document.getElementById('abroad_semester_count_label').innerHTML = "Number of semesters spent abroad";
    document.getElementById('abroad_ects_count_label').innerHTML = "Number of EAP completed in abroad study";
    document.getElementById('studied_estonian_label').innerHTML = "Have you been assigned and completed the minor specialization in the state language?";
    document.getElementById('current_sabbatical_leave_label').innerHTML = "Are you currently on academic leave?";
    document.getElementById('back_button').innerHTML = "Back";
    document.getElementById('calculate_button').innerHTML = "Calculate";
    document.getElementById('calculate_button').style.marginLeft = "483px";
    document.getElementById('first_help_txt').innerHTML = "Includes all semesters spent at Tallinn University (including academic leave, study abroad, etc.)";
    document.getElementById('second_help_txt').innerHTML = 'Õis information system box "including academically"';
    document.getElementById('third_help_txt').innerHTML = 'Õis information system box "ECTS taken into account in load calculation as of the end of the autumn semester and the academic year"';
    document.getElementById('fourth_help_txt').innerHTML = "Completion of the in-depth study module is obligatory only for students of Estonian-language curricula whose Estonian language level does not meet the C1 requirement established at the university and who are assigned by TU, on the basis of a placement test, to complete the in-depth study module.";
    document.getElementById('fourth_help_txt').style.marginTop = "10px";
    document.getElementById('result_heading').innerHTML = "Result";
    $("#curriculum_result").html("Your curriculum: " + $("#curriculum_dropdown :selected").text());
    $("#ects_result").html("Your number of EAP: " + $("#ects_count").val() + " EAP");
    if($("#ects_count").val() < ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#study_load").html("Study load: Part time");
    } else {
        $("#study_load").html("Study load: Full time");
    }
    $("#study_lower_limit_result").html("The lower limit for continuing learning: " + ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5) + " EAP");
    $("#full_study_load_limit_result").html("Minimum required for full-time studies: " + (($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5) + " EAP");
    document.getElementById('new_calculation_button').innerHTML = "New calculation";
    document.getElementById('result_calculate_button').innerHTML = "Calculate";
    document.getElementById('result_calculate_button').style.marginLeft = "416px";

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
