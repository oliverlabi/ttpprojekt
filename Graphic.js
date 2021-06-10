class Graphic extends CurriculumCalculator {
	clear_canvas(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "white";
		ctx.beginPath();
			ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.closePath();
		ctx.fill();
	}

	draw_base(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		//kasti suurust muuta ainult siit graphX ja graphY juurest ning teha seda igas funktsioonis
		ctx.strokeStyle = "rgba(112, 203, 188, 1)";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(graphX, graphY, canvas.width - 2*graphX, canvas.height - 2*graphY);
		ctx.closePath();
		ctx.stroke();
	}

	draw_freeMargins(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(graphX+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)*1/3) - graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "orange";
		ctx.fillStyle = "orange";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(((canvas.width-2*graphX)*1/3)+graphX, graphY+graphBorderWidth, (((canvas.width)-2*graphX)/2)*(2/3)- graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "yellow";
		ctx.fillStyle = "yellow";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth),graphY+graphBorderWidth, (((canvas.width)-2*graphX)/2)*(3/6)- graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		ctx.strokeStyle = "green";
		ctx.fillStyle = "green";
		ctx.lineWidth = graphBorderWidth;
		ctx.beginPath();
			ctx.rect(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), graphY+graphBorderWidth, (((canvas.width)-2*graphX)/2)*(1/6)- graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}

	draw_paidMargins(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		ctx.lineWidth = graphBorderWidth;
		console.log(this.universityAttendance);
		console.log(this.degree);
		ctx.beginPath();
		if(this.degree == "masters" && this.universityAttendance < 4){
			ctx.rect(graphX+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/3) - graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));

		} else if (this.degree == "bachelors" && this.universityAttendance < 6){
			ctx.rect(graphX+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/3) - graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		} else {
			ctx.rect(graphX+graphBorderWidth, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/2) - graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		if(this.degree == "masters" && this.universityAttendance < 4){
			ctx.strokeStyle = "limegreen";
			ctx.fillStyle = "limegreen";
			ctx.lineWidth = graphBorderWidth;
			ctx.beginPath();
				ctx.rect(((canvas.width - 2*graphX)/3)+graphX, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/3), ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
			ctx.closePath();
			ctx.stroke();
			ctx.fill();

			ctx.strokeStyle = "green";
			ctx.fillStyle = "green";
			ctx.lineWidth = graphBorderWidth;
			ctx.beginPath();
				ctx.rect(((canvas.width - 2*graphX)*(2/3))+graphX, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/3)-graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		} else if(this.degree == "bachelors" && this.universityAttendance < 6){
			ctx.strokeStyle = "limegreen";
			ctx.fillStyle = "limegreen";
			ctx.lineWidth = graphBorderWidth;
			ctx.beginPath();
				ctx.rect(((canvas.width - 2*graphX)/3)+graphX, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/3), ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
			ctx.closePath();
			ctx.stroke();
			ctx.fill();

			ctx.strokeStyle = "green";
			ctx.fillStyle = "green";
			ctx.lineWidth = graphBorderWidth;
			ctx.beginPath();
				ctx.rect(((canvas.width - 2*graphX)*(2/3))+graphX, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/3)-graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		} else {
			ctx.strokeStyle = "green";
			ctx.fillStyle = "green";
			ctx.lineWidth = graphBorderWidth;
			ctx.beginPath();
				ctx.rect(((canvas.width - 2*graphX)/2)+graphX, graphY+graphBorderWidth, ((canvas.width - 2*graphX)/2)-graphBorderWidth, ((canvas.height - 2*graphY)-(2*graphBorderWidth)));
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		
	}

	draw_data(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		let fullTimeEdu = this.fullStudyLoadLowerLimit;
		let partTimeEdu = (this.universityAttendance* 15); //siia panna +15 pärast??
		let freeFullEduLimit = this.fullStudyLoadFreeLimit;
		let payload = this.payLoad;
		let EAPScaleText = "";
		let partTimeText_1 ="";
		let partTimeText_2 ="";
		let fullTimeText_1 ="";
		let fullTimeText_2 ="";
		let freeFullTimeText_1 = "";
		let freeFullTimeText_2 = "";
		if(this.lang == 0){
			EAPScaleText = "EAP-de alampiiride skaala:";
			partTimeText_1 ="Õppes jätkamise";
			partTimeText_2 ="alampiir";
			fullTimeText_1 ="Täiskoormuse";
			fullTimeText_2 ="alampiir";
			freeFullTimeText_1 = "Tasuta õppe";
			freeFullTimeText_2 = "puhverruum";
		} else {
			EAPScaleText = "EAP lower limit scale:";
			partTimeText_1 ="Part-time";
			partTimeText_2 ="lower limit";
			fullTimeText_1 ="Full-time";
			fullTimeText_2 ="lower limit";
			freeFullTimeText_1 = "Free full-time";
			freeFullTimeText_2 = "lower limit";
		}
		
		ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineWidth = 2;
			if(this.degree == "masters" && this.universityAttendance < 4){
				ctx.moveTo(((canvas.width-2*graphX)*1/3)+graphX, graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			} else if(this.degree == "bachelors" && this.universityAttendance < 6){
				ctx.moveTo(((canvas.width-2*graphX)*1/3)+graphX, graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();

			} else if(payload == "free"){
				ctx.moveTo(((canvas.width-2*graphX)*1/3)+graphX, graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			} else {
				ctx.moveTo(((canvas.width-2*graphX)/2)+graphX, graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width-2*graphX)/2)+graphX, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			}
			ctx.font = "20px arial";
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.fillText(0, graphX+graphBorderWidth, graphY - graphBorderWidth*2);
			if(this.degree == "masters" && this.universityAttendance < 4){
				ctx.fillText(partTimeEdu, ((canvas.width-2*graphX)*1/3)+graphX, graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText(partTimeText_1, ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText(partTimeText_2, ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*9);
			} else if(this.degree == "bachelors" && this.universityAttendance < 6){
				ctx.fillText(partTimeEdu, ((canvas.width-2*graphX)*1/3)+graphX, graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText(partTimeText_1, ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText(partTimeText_2, ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*9);
			} else if(payload == "free"){
				ctx.fillText(partTimeEdu, ((canvas.width-2*graphX)*1/3)+graphX, graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText(partTimeText_1, ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText(partTimeText_2, ((canvas.width-2*graphX)*1/3)+graphX, (canvas.height - graphY) + graphBorderWidth*9);
			} else {
				ctx.fillText(partTimeEdu, ((canvas.width-2*graphX)/2)+graphX, graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText(partTimeText_1, ((canvas.width-2*graphX)/2)+graphX, (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText(partTimeText_2, ((canvas.width-2*graphX)/2)+graphX, (canvas.height - graphY) + graphBorderWidth*9);
			}
				
			ctx.font = "16px arial";
			ctx.textAlign = "left";
			ctx.fillText(EAPScaleText, graphX, graphY - graphBorderWidth*4 -20);
		ctx.closePath();
		
			if(this.degree == "masters" && this.universityAttendance < 4){
				ctx.beginPath();
					ctx.strokeStyle = "black";
					ctx.lineWidth = 2;
					ctx.moveTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY+(graphBorderWidth/2));
					ctx.lineTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY)-(graphBorderWidth/2));
					ctx.stroke();
					ctx.font = "20px arial";
					ctx.fillStyle = "black";
					ctx.textAlign = "center";		
					ctx.fillText(fullTimeEdu, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY - graphBorderWidth*2);
					ctx.font = "12px arial";
					ctx.fillText(fullTimeText_1, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*5);
					ctx.fillText(fullTimeText_2, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*9);
				ctx.closePath();
			} else if(this.degree == "bachelors" && this.universityAttendance < 6){
				ctx.beginPath();
					ctx.strokeStyle = "black";
					ctx.lineWidth = 2;
					ctx.moveTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY+(graphBorderWidth/2));
					ctx.lineTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY)-(graphBorderWidth/2));
					ctx.stroke();
					ctx.font = "20px arial";
					ctx.fillStyle = "black";
					ctx.textAlign = "center";		
					ctx.fillText(fullTimeEdu, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY - graphBorderWidth*2);
					ctx.font = "12px arial";
					ctx.fillText(fullTimeText_1, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*5);
					ctx.fillText(fullTimeText_2, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*9);
				ctx.closePath();
			} else if(payload == "free"){
				ctx.beginPath();
					ctx.strokeStyle = "black";
					ctx.lineWidth = 2;
					ctx.moveTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY+(graphBorderWidth/2));
					ctx.lineTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY)-(graphBorderWidth/2));
					ctx.stroke();
					ctx.font = "20px arial";
					ctx.fillStyle = "black";
					ctx.textAlign = "center";		
					ctx.fillText(fullTimeEdu, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), graphY - graphBorderWidth*2);
					ctx.font = "12px arial";
					ctx.fillText(fullTimeText_1, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*5);
					ctx.fillText(fullTimeText_2, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(1/3)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*9);
				ctx.closePath();
			}
			

		if(payload == "free"){
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 2;
				ctx.moveTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), graphY+(graphBorderWidth/2));
				ctx.lineTo(((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
				ctx.font = "20px arial";
				ctx.fillStyle = "black";
				ctx.textAlign = "center";		
				ctx.fillText(freeFullEduLimit, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), graphY - graphBorderWidth*2);
				ctx.font = "12px arial";
				ctx.fillText(freeFullTimeText_1, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*5);
				ctx.fillText(freeFullTimeText_2, ((canvas.width / 2)+graphBorderWidth) + ((((canvas.width)-2*graphX)/2)*(5/6)- graphBorderWidth), (canvas.height - graphY) + graphBorderWidth*9);
			ctx.closePath();
		}
	}

	draw_student(){
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let graphX = 10;
		let graphY = 45;
		let graphBorderWidth = 3;
		let fullTimeEdu = this.fullStudyLoadLowerLimit;
		let partTimeEdu = (this.universityAttendance* 15); //siia panna +15 pärast??
		let freeFullEduLimit = this.fullStudyLoadFreeLimit;
		let XLength;
		let XPosition;
		let arrowX;
		let legendText;
		if(this.lang == 0){
			legendText = " Sina oled siin";
		} else {
			legendText = " You are here"
		}
		if(this.ectsCount < partTimeEdu){
			XLength = (canvas.width-2*graphX)/2;
			XPosition = (this.ectsCount/partTimeEdu)*XLength;
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo(graphX + graphBorderWidth + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo(graphX + graphBorderWidth + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = graphX + graphBorderWidth + XPosition;
		} else if(this.ectsCount >= partTimeEdu && this.ectsCount < fullTimeEdu){
			XLength = ((canvas.width-2*graphX)/2)*(1/3);
			XPosition = ((this.ectsCount - partTimeEdu)/(fullTimeEdu - partTimeEdu))*XLength;
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo((canvas.width / 2) + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2) + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = (canvas.width / 2) + XPosition;
		} else if(this.ectsCount >= fullTimeEdu && this.ectsCount < freeFullEduLimit){
			XLength = ((canvas.width-2*graphX)/2)*(3/6);
			XPosition = ((this.ectsCount - fullTimeEdu)/(freeFullEduLimit - fullTimeEdu))*XLength;
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(1/3)) + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(1/3)) + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = (canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(1/3)) + XPosition;
		} else if(this.ectsCount >= freeFullEduLimit){
			XLength = ((canvas.width-2*graphX)/2)*(1/6);
			if(this.ectsCount >= (this.universityAttendance*30)){
				XPosition = 1 * XLength;
			} else {
			XPosition = ((this.ectsCount - freeFullEduLimit)/((this.universityAttendance*30) - freeFullEduLimit))*XLength;
			}
			ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 4;
				ctx.moveTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(5/6)) + XPosition, graphY+(graphBorderWidth/2));
				ctx.lineTo((canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(5/6)) + XPosition, (canvas.height - graphY)-(graphBorderWidth/2));
				ctx.stroke();
			ctx.closePath();
			arrowX = (canvas.width / 2) + ((((canvas.width)-2*graphX)/2)*(5/6)) + XPosition;
		}
		ctx.fillStyle = "black";
		ctx.strokeStyle = 1;
		//legendi muutuja
		let legendX = (canvas.width * (4/5));
		if((arrowX-graphX-graphBorderWidth)<(graphBorderWidth*3)){
			ctx.beginPath();
				ctx.moveTo(arrowX+graphBorderWidth*3, (canvas.height/2)-2*graphBorderWidth);
				ctx.lineTo(arrowX+graphBorderWidth*3, (canvas.height/2)+2*graphBorderWidth);
				ctx.lineTo(arrowX+graphBorderWidth, canvas.height/2); 
				ctx.fill();
			ctx.closePath();
			ctx.beginPath();
				ctx.moveTo(legendX+graphBorderWidth*3, (canvas.height/12)-2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth*3, (canvas.height/12)+2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth, canvas.height/12); 
				ctx.fill();
			ctx.closePath();
		} else {
			ctx.beginPath();
				ctx.moveTo(arrowX-graphBorderWidth*3, (canvas.height/2)-2*graphBorderWidth);
				ctx.lineTo(arrowX-graphBorderWidth*3, (canvas.height/2)+2*graphBorderWidth);
				ctx.lineTo(arrowX-graphBorderWidth, canvas.height/2); 
				ctx.fill();
			ctx.closePath();
			ctx.beginPath();
				ctx.moveTo(legendX+graphBorderWidth, (canvas.height/12)-2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth, (canvas.height/12)+2*graphBorderWidth);
				ctx.lineTo(legendX+graphBorderWidth*3, canvas.height/12); 
				ctx.fill();
			ctx.closePath();
		}	
			ctx.beginPath();
				ctx.fillStyle = "black";
				ctx.textAlign = "left";		
				ctx.font = "12px arial";
				ctx.fillText(legendText, legendX+graphBorderWidth*4, canvas.height/12+graphBorderWidth*1.5);
			ctx.closePath();
	}
}