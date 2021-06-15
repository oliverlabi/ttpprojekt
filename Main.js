class CurriculumCalculator{
    constructor(language){
        this.ectsFee = 30;
        this.Url;
        this.fullStudyLoadMinimumConfig;
        this.partTimeStudyLoadMinimumConfig;
        this.currentSabbaticalLeave = 0;
        this.currentAbroadStudies = 0;
        this.curriculumChoice = $("#curriculum_dropdown :selected").text();
        this.bachelorsCurriculums = ["Informaatika", "Infoteadus (BA)", "Matemaatika, majandusmatemaatika ja andmeanalüüs"];
        this.mastersCurriculums = ["Haridustehnoloogia", "Infotehnoloogia juhtimine", "Infoteadus (MA)", "Informaatikaõpetaja", "Avatud ühiskonna tehnoloogiad", "Digitaalsed õpimängud", "Inimese ja arvuti interaktsioon", "Interaktsioonidisain"];
        this.bachelorsCurriculumsEng = ["Computer Science", "Information Science (BA)", "Mathematics, Mathematical Economics and Data Analysis"];
        this.mastersCurriculumsEng = ["Educational Technology", "Management of Information Technology", "Information Science (MA)", "Teacher of Computer Science", "Open Society Technologies", "Digital Learning Games", "Human-Computer Interaction", "Interaction Design"];
        this.fullStudyLoadLowerLimit = 0;
        this.payLoad = $('input[name="pay_load"]:checked').val();
        this.studiedEstonianSemesterCount = $("#studied_estonian_ects_count").val();
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
        this.error = "";
        this.lang = language;
        this.feeType = 0;
        this.fullStudyLoadFreeLimit = 0;
        this.init();
    }

    init(){
        //if(Validation.prototype.removeSpecialChars.call(this) == 1){
            //this.loadConfig();
            Validation.prototype.checkCurriculumDegree.call(this);
            if(Validation.prototype.inputValidation.call(this) == 1){
                this.feeType = 0;
                Validation.prototype.checkInDepthStudy.call(this);
                $("#error").html("");
                $("#result_error").html("");
                $("#input_area_buttons").css("display", "none");
                $("#result_area_buttons").css("display", "block");
                $("#error").css("display", "none");
                $("#result_error").css("display", "block");
                Calculation.prototype.calcAbroadStudies.call(this);
                Calculation.prototype.calcStudyLimits.call(this);
                this.drawResultBox();
                this.draw_graph();
            }
            $("#new_calculation_button").on("click", ()=>{this.pageReload();});
            $("#en").on("click", ()=>{
                this.lang = 1;
                this.draw_graph();
                Calculation.prototype.calcScenario.call(this);
                Calculation.prototype.calcFees.call(this);
            });
            $("#ee").on("click", ()=>{
                this.lang = 0;
                this.draw_graph();
                Calculation.prototype.calcScenario.call(this);
                Calculation.prototype.calcFees.call(this);
            });
            
            
            
        //}
        
    }

    /*loadConfig(){
        fetch("config.txt")
            .then(response => response.text())
            .then(data => {
                let rawData = data.split(",");
                //let tukeldatud = andmed.split(":");
                //console.log(tukeldatud);
                let splitted, value;
                var configurationArray = [];
                for (var i = 0; i < rawData.length; i++) {
                    if(i == 1){
                        splitted = rawData[i].split(":");
                        value = splitted[1] + splitted[2];
                    } else{
                        splitted = rawData[i].split(":");
                        value = splitted[1];
                    }
                    configurationArray.push(value);
                }
                for(var i = 0; i <= configurationArray.length; i++){
                    if(i == 0){
                        this.ectsFee = configurationArray[0];
                    } else if(i == 1){
                        this.Url = configurationArray[1];
                    } else if(i == 2){
                        this.fullStudyLoadMinimumConfig = configurationArray[2] / 2;
                    } else if(i == 3){
                        this.partTimeStudyLoadMinimumConfig = configurationArray[3] / 2;
                    }
                }
                console.log(this.ectsFee + " " + this.partTimeStudyLoadMinimum);
            });
    }*/

    pageReload(){
        location.reload();
    }

    draw_graph(){
		Graphic.prototype.clear_canvas.call(this);
		Graphic.prototype.draw_base.call(this);
		if(this.payLoad == "free"){
			Graphic.prototype.draw_freeMargins.call(this);
		} 
		if(this.payLoad == "paid"){
			Graphic.prototype.draw_paidMargins.call(this);
		}
		Graphic.prototype.draw_data.call(this);
		Graphic.prototype.draw_student.call(this);
		
	}

    drawResultBox(){
        if(this.error == ""){
            $("#curriculum_result").html("Sinu õppekava: " + this.curriculumChoice);
            $("#ects_result").html("Sinu ainepunktide arv: " + this.ectsCount + " EAP");
            $("#result_padding").css("display", "block");
            $("#results").css("display", "block");
            $("#footer").css("margin-top", "50px");
            Calculation.prototype.calcScenario.call(this);
            Calculation.prototype.calcFees.call(this);
        }
    }
}

let lang = 0;
let calculated = 0;

$("#curriculum_dropdown").change(function() {
    var dropdown = document.getElementById('curriculum_dropdown');
    console.log(dropdown.value);
    if (dropdown.value == "interaction_design" || dropdown.value == "digital_study_games" || dropdown.value == "open_society_technologies" || dropdown.value == "human_and_computer_interaction") {
        $('input[id="free"]').prop("checked", false);
        $('input[id="free"]').prop("disabled", true);
        $('input[id="paid"]').prop("checked", true);
    } else{
        $('input[id="free"]').prop("checked", true);
        $('input[id="free"]').prop("disabled", false);
        $('input[id="paid"]').prop("checked", false);
    }
});

$("#abroad_yes").on("click", function(){
    $("#abroad_input_area").css("display", "block");
    $("#footer").css("margin-top", "50px");
})

$("#abroad_no").on("click", function(){
    $("#abroad_input_area").css("display", "none");
})

$("#estonian_yes").on("click", function(){
    $("#studied_estonian_input_area").css("display", "block");
})

$("#estonian_no").on("click", function(){
    $("#studied_estonian_input_area").css("display", "none");
})

$("#continue_button").on("click", function(){
    if($("#curriculum_dropdown :selected").text() == "Vali õppekava..."){
        swal({
            width: "1000px",
            title: "Viga!",
            text: "Vali rippmenüüst õppekava!",
            icon: "error",
            button: "OK",
            className: "errorMsg",
        });
        //$("#error").html("Vali õppekava!");
    } else if($("#curriculum_dropdown :selected").text() == "Choose a curriculum..."){
        swal({
            width: "1000px",
            title: "Error!",
            text: "Choose a curriculum from drop-down menu!",
            icon: "error",
            button: "OK",
            className: "errorMsg",
        });
        //$("#error").html("Select curriculum!");
    } else {
        $("#error").html("");
        $("#curriculum_choice_area").css("display", "none");
        $("#curriculum_choice_area_buttons").css("display", "none");
        $("#input_area").css("display", "block");
        $("#input_area_buttons").css("display", "block");
    }
    
})

$("#en").on("click", function(){
    $("#en").css("color", "rgb(16, 16, 16)");
    $("#en").css("font-decoration", "none");
    $("#ee").css("color", "rgb(160, 206, 200)");
    $("#ee").css("font-decoration", "underline");
})

$("#ee").on("click", function(){
    $("#ee").css("color", "rgb(16, 16, 16)");
    $("#en").css("color", "rgb(160, 206, 200)");
    $("#ee").css("font-decoration", "none");
    $("#en").css("font-decoration", "underline");
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

$(document).ready(function(){
    var $temp = $("<input>");
    var $url = $(location).attr('href');
    $('#clipboard_copy_button').click(function() {
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    if(lang == 1){
        //alert("Link copied!");
        swal({
            title: "Link copied!",
            icon: "success",
            button: "OK",
        });
    } else {
        //alert("Link kopeeritud!");
        swal({
            title: "Link kopeeritud!",
            icon: "success",
            button: "OK",
        });
    }
    });
})

$("#calculate_button").click(function(){
    let calculation = new CurriculumCalculator(lang);
    calculated = 1;
    if(lang == 1){
        ResultToEng();
    }
})

$("#result_calculate_button").click(function(){
    let calculation = new CurriculumCalculator(lang);
    if(lang == 1){
        ResultToEng();
    }
})

function CalculatorToEng() {
    if(lang == 0 && calculated == 0){
        lang = 1;
    } else {
        lang = 1;
    }
    $('#heading').html("Curriculum completion calculator");
    $('#info_text').html("Study data can be found in TU Study Information System under student performance records");
    $('#mainpage').html("Back to mainpage");
    $('#mainpage').css({"margin-right": "333px"});
    $('#curriculum_dropdown_label').html("Choose a curriculum: ");
    $('#select_curriculum').html("Choose a curriculum...");
    $('#computer_science').html("Computer Science");
    $('#info_science_bd').html("Information Science (BA)");
    $('#info_science_md').html("Information Science (MA)");
    $('#mathematics').html("Mathematics, Mathematical Economics and Data Analysis");
    $('#education_technology').html("Educational Technology");
    $('#computer_science_business').html("Management of Information Technology");
    $('#computer_science_teacher').html("Teacher of Computer Science");
    $('#open_society_technologies').html("Open Society Technologies");
    $('#digital_study_games').html("Digital Learning Games");
    $('#human_and_computer_interaction').html("Human-Computer Interaction");
    $('#interaction_design').html("Interaction Design");
    $('#free_label').html("Free");
    $('#paid_label').html("Paid");
    $('#continue_button').html("Next");
    $('#curriculum_attendance_label').html("Number of semesters studied at TU");
    $('#sabbatical_leave_label').html("Number of semesters on academic leave");
    $('#ects_count_label').html("ECTS to be taken into account in the completion of the curriculum");
    $('#studied_abroad_label').html("Have you done abroad studies or abroad traineeships?");
    $('#currently_studying_abroad_label').html("Are you currently doing abroad studies or abroad internships?");
    $('#abroad_semester_count_label').html("Number of semesters studied in abroad studies");
    $('#abroad_ects_count_label').html("Number of ECTS completed in abroad studies");
    $('#studied_estonian_label').html("Have you been assigned and completed additional Estonian language modules?");
    $('#studied_estonian_ects_count_label').html("Number of taken semesters in Estonian language module");
    $('#current_sabbatical_leave_label').html("Are you currently on academic leave?");
    $('#back_button').html("Back");
    $('#calculate_button').html("Calculate");
    $('#first_help_txt').html("Includes all semesters studied at Tallinn University (incl. academic leave, abroad studies, etc.)");
    $('#first_help_txt').css({"width": "240px"});
    $('#first_help_txt').css({"top": "-15px"});
    $('#second_help_txt').css({"width": "194px"});
    $('#second_help_txt').css({"top": "-15px"});
    $('#third_help_txt').css({"top": "-15px"});
    $('#fourth_help_txt').css({"width": "220px"});
    $('#fourth_help_txt').css({"top": "-15px"});
    $('#second_help_txt').html('TU Study Information System box "incl. on academic leave"');
    $('#third_help_txt').html('TU Study Information System box "ECTS credits credited to the account of load calculations"');
    $('#fourth_help_txt').html("The completion of the additional Estonian language module is mandatory only for students of Estonian language curricula whose Estonian language level does not meet the C1 requirement established by the university and who are assigned by the TU, on the basis of a placement test, to complete the additional Estonian language module.");
    $('#result_heading').html("Result");
    $('#new_calculation_button').html("New calculation");
    $('#result_calculate_button').html("Calculate");
    $('#pdf_save_button').html("Save as PDF");
    $('#clipboard_copy_button').html("Copy to clipboard");
    $('#infosystem').html("Study Information System: ");
    
    $(".yes_label").each(function(){
        $(this).html('Yes');
    });
 
    $(".no_label").each(function(){
        $(this).html('No');
    });

    ResultToEng(); 
}


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
}

function CalculatorToEst() {
    if(lang == 1 && calculated == 0){
        lang = 0;
    } else {
        lang = 0;
    }
    $('#heading').html("Õppekava täitmise kalkulaator");
    $('#info_text').html("Õppeandmed leiab õppeinfosüsteemist õppetulemuste alt");
    $('#mainpage').html("Tagasi pealehele");
    $('#mainpage').css({"margin-right": "340px"});
    $('#curriculum_dropdown_label').html("Vali õppekava: ");
    $('#select_curriculum').html("Vali õppekava...");
    $('#computer_science').html("Informaatika");
    $('#info_science_bd').html("Infoteadus (BA)");
    $('#info_science_md').html("Infoteadus (MA)");
    $('#mathematics').html("Matemaatika, majandusmatemaatika ja andmeanalüüs");
    $('#education_technology').html("Haridustehnoloogia");
    $('#computer_science_business').html("Infotehnoloogia juhtimine");
    $('#open_society_technologies').html("Avatud ühiskonna tehnoloogiad");
    $('#digital_study_games').html("Digitaalsed õpimängud");
    $('#human_and_computer_interaction').html("Inimese ja arvuti interaktsioon");
    $('#interaction_design').html("Interaktsioonidisain");
    $('#free_label').html("Tasuta");
    $('#paid_label').html("Tasuline");
    $('#continue_button').html("Edasi");
    $('#curriculum_attendance_label').html("TLÜs viibitud semestrite arv");
    $('#sabbatical_leave_label').html("Akadeemilisel puhkusel viibitud semestrite arv");
    $('#ects_count_label').html("Õppekava täitmisel arvesse minevad EAP-d");
    $('#studied_abroad_label').html("Kas oled viibinud välisõppes või välispraktikal?");
    $('#currently_studying_abroad_label').html("Kas sa viibid hetkel välisõppel või välispraktikal?");
    $('#abroad_semester_count_label').html("Välisõppes viibitud semestrite arv");
    $('#abroad_ects_count_label').html("Välisõppes sooritatud ainepunktide arv");
    $('#studied_estonian_label').html("Kas sulle on määratud ja oled edukalt täitnud riigikeele süvaõppe kõrvaleriala?");
    $('#current_sabbatical_leave_label').html("Kas viibid hetkel akadeemilisel puhkusel?");
    $('#back_button').html("Tagasi");
    $('#calculate_button').html("Kalkuleeri");
    $('#first_help_txt').html("Sisaldab kõiki Tallinna Ülikoolis viibitud semestreid (k.a akadeemilisel puhkusel, välisõppes jne)");
    $('#first_help_txt').css({"width": "300px"});
    $('#first_help_txt').css({"top": "-15px"});
    $('#second_help_txt').css({"width": "150px"});
    $('#second_help_txt').css({"top": "-15px"});
    $('#third_help_txt').css({"width": "165px"});
    $('#third_help_txt').css({"top": "-15px"});
    $('#fourth_help_txt').css({"width": "192px"});
    $('#fourth_help_txt').css({"top": "-15px"});
    $('#second_help_txt').html('Õppeinfosüsteemi lahter "sh akadeemiliselt"');
    $('#third_help_txt').html('Õppeinfosüsteemi lahter "Koormusarvutusel arvesse minevad EAP-d sügissemestri ja õppeaasta lõpu seisuga"');
    $('#fourth_help_txt').html("Süvaõppe mooduli täitmine on kohustuslik vaid eestikeelsete õppekavade üliõpilastele, kelle eesti keele tase ei vasta ülikoolis kehtestatud C1-nõudele ja kes on TLÜ poolt, paigutustesti alusel, määratud süvaõppe moodulit täitma.");
    $('#result_heading').html("Tulemus");
    $('#new_calculation_button').html("Alusta uuesti");
    $('#result_calculate_button').html("Kalkuleeri");
    $('#pdf_save_button').html("Salvesta PDFina");
    $('#clipboard_copy_button').html("Kopeeri link");
    $('#infosystem').html("Õppeinfosüsteem: ");

    $(".yes_label").each(function(){
        $(this).html('Jah');
    });
 
    $(".no_label").each(function(){
        $(this).html('Ei');
    });

    ResultToEst(); 
}

function ResultToEst(){
    $("#curriculum_result").html("Sinu õppekava: " + $("#curriculum_dropdown :selected").text());
    $("#ects_result").html("Sinu ainepunktide arv: " + $("#ects_count").val() + " EAP");
    if($("#ects_count").val() < ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#study_load").html("Õppekoormus: Täiskoormus");
    } else {
        $("#study_load").html("Õppekoormus: Osakoormus");
    }
    $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5) + " ECTS");
    $("#full_study_load_limit_result").html("Alampiir õpingute jätkamiseks täiskoormuses: " + (($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5) + " ECTS");
}
